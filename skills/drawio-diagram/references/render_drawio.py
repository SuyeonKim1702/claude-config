"""Render draw.io XML to PNG using Playwright + headless Chromium.

Loads viewer-static.min.js from the diagrams.net CDN via a local HTTP
server (file:// cannot load external scripts), then uses the mxGraph
Graph/mxCodec API to render the diagram and takes a screenshot.

Usage:
    cd .claude/skills/drawio-diagram/references
    uv run python render_drawio.py <path-to-file.drawio> [--output path.png] [--scale 2] [--width 1920]

First-time setup:
    cd .claude/skills/drawio-diagram/references
    uv sync
    uv run playwright install chromium

Check setup:
    uv run python render_drawio.py --check
"""

from __future__ import annotations

import argparse
import functools
import http.server
import json
import sys
import threading
import xml.etree.ElementTree as ET
from pathlib import Path


def check_setup() -> None:
    """Verify that Playwright and Chromium are available."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("ERROR: playwright not installed.", file=sys.stderr)
        print(
            "Run: cd .claude/skills/drawio-diagram/references && uv sync && uv run playwright install chromium",
            file=sys.stderr,
        )
        sys.exit(1)

    with sync_playwright() as p:
        try:
            browser = p.chromium.launch(headless=True)
            browser.close()
            print("OK: Playwright + Chromium are ready.")
        except Exception as e:
            if "Executable doesn't exist" in str(e) or "browserType.launch" in str(e):
                print("ERROR: Chromium not installed for Playwright.", file=sys.stderr)
                print(
                    "Run: cd .claude/skills/drawio-diagram/references && uv run playwright install chromium",
                    file=sys.stderr,
                )
                sys.exit(1)
            raise


def validate_drawio(xml_string: str) -> list[str]:
    """Validate draw.io XML structure. Returns list of errors (empty = valid)."""
    errors: list[str] = []

    try:
        root = ET.fromstring(xml_string)
    except ET.ParseError as e:
        errors.append(f"Invalid XML: {e}")
        return errors

    if root.tag != "mxGraphModel":
        errors.append(f"Expected root element 'mxGraphModel', got '{root.tag}'")
        return errors

    xml_root = root.find("root")
    if xml_root is None:
        errors.append("Missing <root> element inside <mxGraphModel>")
        return errors

    cells = xml_root.findall("mxCell")
    if len(cells) < 2:
        errors.append("Missing required cells: id='0' and id='1' must be present")
        return errors

    ids = {c.get("id") for c in cells}
    if "0" not in ids:
        errors.append("Missing required mxCell with id='0'")
    if "1" not in ids:
        errors.append("Missing required mxCell with id='1'")

    all_ids = [c.get("id") for c in cells if c.get("id")]
    if len(all_ids) != len(set(all_ids)):
        from collections import Counter
        dupes = [i for i, c in Counter(all_ids).items() if c > 1]
        errors.append(f"Duplicate cell IDs: {dupes}")

    vertex_ids = {c.get("id") for c in cells if c.get("vertex") == "1"}
    for cell in cells:
        if cell.get("edge") == "1":
            src = cell.get("source")
            tgt = cell.get("target")
            if src and src not in ids:
                errors.append(f"Edge '{cell.get('id')}' references unknown source '{src}'")
            if tgt and tgt not in ids:
                errors.append(f"Edge '{cell.get('id')}' references unknown target '{tgt}'")

    return errors


def compute_bounding_box(xml_string: str) -> tuple[float, float, float, float]:
    """Compute bounding box (min_x, min_y, max_x, max_y) from mxGeometry elements."""
    min_x = float("inf")
    min_y = float("inf")
    max_x = float("-inf")
    max_y = float("-inf")

    root = ET.fromstring(xml_string)
    xml_root = root.find("root")
    if xml_root is None:
        return (0, 0, 800, 600)

    for cell in xml_root.findall("mxCell"):
        geo = cell.find("mxGeometry")
        if geo is None:
            continue
        try:
            x = float(geo.get("x", 0))
            y = float(geo.get("y", 0))
            w = abs(float(geo.get("width", 0)))
            h = abs(float(geo.get("height", 0)))
        except (ValueError, TypeError):
            continue

        if w == 0 and h == 0:
            continue

        min_x = min(min_x, x)
        min_y = min(min_y, y)
        max_x = max(max_x, x + w)
        max_y = max(max_y, y + h)

    if min_x == float("inf"):
        return (0, 0, 800, 600)

    return (min_x, min_y, max_x, max_y)


class _QuietHTTPHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP handler that suppresses access log output."""

    def __init__(self, *args, directory: str | None = None, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

    def log_message(self, format, *args):
        pass


def _start_local_server(serve_dir: Path) -> tuple[http.server.HTTPServer, int]:
    """Start a local HTTP server on a random port. Returns (server, port)."""
    handler = functools.partial(_QuietHTTPHandler, directory=str(serve_dir))
    httpd = http.server.HTTPServer(("127.0.0.1", 0), handler)
    port = httpd.server_address[1]
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    return httpd, port


def render(
    drawio_path: Path,
    output_path: Path | None = None,
    scale: int = 2,
    max_width: int = 1920,
) -> Path:
    """Render a .drawio file to PNG. Returns the output PNG path."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("ERROR: playwright not installed.", file=sys.stderr)
        print(
            "Run: cd .claude/skills/drawio-diagram/references && uv sync && uv run playwright install chromium",
            file=sys.stderr,
        )
        sys.exit(1)

    xml_string = drawio_path.read_text(encoding="utf-8").strip()

    errors = validate_drawio(xml_string)
    if errors:
        print("ERROR: Invalid draw.io file:", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        sys.exit(1)

    min_x, min_y, max_x, max_y = compute_bounding_box(xml_string)
    padding = 80
    diagram_w = max_x - min_x + padding * 2
    diagram_h = max_y - min_y + padding * 2

    vp_width = min(int(diagram_w), max_width)
    vp_height = max(int(diagram_h), 600)

    if output_path is None:
        output_path = drawio_path.with_suffix(".png")

    template_path = Path(__file__).parent / "render_template.html"
    if not template_path.exists():
        print(f"ERROR: Template not found at {template_path}", file=sys.stderr)
        sys.exit(1)

    httpd, port = _start_local_server(template_path.parent)
    template_url = f"http://127.0.0.1:{port}/{template_path.name}"

    try:
        with sync_playwright() as p:
            try:
                browser = p.chromium.launch(headless=True)
            except Exception as e:
                if "Executable doesn't exist" in str(e) or "browserType.launch" in str(e):
                    print("ERROR: Chromium not installed for Playwright.", file=sys.stderr)
                    print(
                        "Run: cd .claude/skills/drawio-diagram/references && uv run playwright install chromium",
                        file=sys.stderr,
                    )
                    sys.exit(1)
                raise

            page = browser.new_page(
                viewport={"width": vp_width, "height": vp_height},
                device_scale_factor=scale,
            )

            page.goto(template_url)

            page.wait_for_function("window.__moduleReady === true", timeout=30000)

            load_error = page.evaluate("window.__viewerLoadError")
            if load_error:
                print(
                    "ERROR: viewer-static.min.js failed to load from CDN. "
                    "Check network connectivity.",
                    file=sys.stderr,
                )
                browser.close()
                sys.exit(1)

            result = page.evaluate(f"window.renderDiagram({json.dumps(xml_string)})")

            if not result or not result.get("success"):
                error_msg = (
                    result.get("error", "Unknown render error")
                    if result
                    else "renderDiagram returned null"
                )
                print(f"ERROR: Render failed: {error_msg}", file=sys.stderr)
                browser.close()
                sys.exit(1)

            page.wait_for_function("window.__renderComplete === true", timeout=15000)

            page.wait_for_selector("#root svg", state="attached", timeout=10000)

            root_el = page.query_selector("#root")
            if root_el is None:
                print("ERROR: No rendered element found.", file=sys.stderr)
                browser.close()
                sys.exit(1)

            root_el.screenshot(path=str(output_path))
            browser.close()
    finally:
        httpd.shutdown()

    return output_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Render draw.io XML to PNG")
    parser.add_argument(
        "input",
        type=Path,
        nargs="?",
        help="Path to .drawio XML file",
    )
    parser.add_argument(
        "--output", "-o",
        type=Path,
        default=None,
        help="Output PNG path (default: same name with .png)",
    )
    parser.add_argument(
        "--scale", "-s",
        type=int,
        default=2,
        help="Device scale factor (default: 2)",
    )
    parser.add_argument(
        "--width", "-w",
        type=int,
        default=1920,
        help="Max viewport width (default: 1920)",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Check that Playwright + Chromium are installed and exit",
    )
    args = parser.parse_args()

    if args.check:
        check_setup()
        return

    if args.input is None:
        parser.error("input file is required (or use --check to verify setup)")

    if not args.input.exists():
        print(f"ERROR: File not found: {args.input}", file=sys.stderr)
        sys.exit(1)

    png_path = render(args.input, args.output, args.scale, args.width)
    print(str(png_path))


if __name__ == "__main__":
    main()
