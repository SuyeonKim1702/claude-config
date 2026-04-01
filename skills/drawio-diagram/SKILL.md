---
name: drawio-diagram
description: Create draw.io diagram XML files that make visual arguments. Use when the user wants to visualize workflows, architectures, or concepts.
---

# draw.io Diagram Creator

Generate `.drawio` XML files that **argue visually**, not just display information.

**Setup:** If the user asks you to set up this skill (renderer, dependencies, etc.), see `README.md` for instructions.

## Customization

**All colors and brand-specific styles live in one file:** `references/color-palette.md`. Read it before generating any diagram and use it as the single source of truth for all color choices — shape fills, strokes, text colors, evidence artifact backgrounds, everything.

To make this skill produce diagrams in your own brand style, edit `color-palette.md`. Everything else in this file is universal design methodology and draw.io best practices.

---

## Core Philosophy

**Diagrams should ARGUE, not DISPLAY.**

A diagram isn't formatted text. It's a visual argument that shows relationships, causality, and flow that words alone can't express. The shape should BE the meaning.

**The Isomorphism Test**: If you removed all text, would the structure alone communicate the concept? If not, redesign.

**The Education Test**: Could someone learn something concrete from this diagram, or does it just label boxes? A good diagram teaches—it shows actual formats, real event names, concrete examples.

---

## Depth Assessment (Do This First)

Before designing, determine what level of detail this diagram needs:

### Simple/Conceptual Diagrams
Use abstract shapes when:
- Explaining a mental model or philosophy
- The audience doesn't need technical specifics
- The concept IS the abstraction (e.g., "separation of concerns")

### Comprehensive/Technical Diagrams
Use concrete examples when:
- Diagramming a real system, protocol, or architecture
- The diagram will be used to teach or explain (e.g., YouTube video)
- The audience needs to understand what things actually look like
- You're showing how multiple technologies integrate

**For technical diagrams, you MUST include evidence artifacts** (see below).

---

## Research Mandate (For Technical Diagrams)

**Before drawing anything technical, research the actual specifications.**

If you're diagramming a protocol, API, or framework:
1. Look up the actual JSON/data formats
2. Find the real event names, method names, or API endpoints
3. Understand how the pieces actually connect
4. Use real terminology, not generic placeholders

Bad: "Protocol" → "Frontend"
Good: "AG-UI streams events (RUN_STARTED, STATE_DELTA, A2UI_UPDATE)" → "CopilotKit renders via createA2UIMessageRenderer()"

**Research makes diagrams accurate AND educational.**

---

## Evidence Artifacts

Evidence artifacts are concrete examples that prove your diagram is accurate and help viewers learn. Include them in technical diagrams.

**Types of evidence artifacts** (choose what's relevant to your diagram):

| Artifact Type | When to Use | How to Render |
|---------------|-------------|---------------|
| **Code snippets** | APIs, integrations, implementation details | Dark rectangle + monospace text (see color palette) |
| **Data/JSON examples** | Data formats, schemas, payloads | Dark rectangle + colored text (see color palette) |
| **Event/step sequences** | Protocols, workflows, lifecycles | Timeline pattern (line + dots + labels) |
| **UI mockups** | Showing actual output/results | Nested rectangles mimicking real UI |
| **Real input content** | Showing what goes IN to a system | Rectangle with sample content visible |
| **API/method names** | Real function calls, endpoints | Use actual names from docs, not placeholders |

The key principle: **show what things actually look like**, not just what they're called.

---

## Multi-Zoom Architecture

Comprehensive diagrams operate at multiple zoom levels simultaneously.

### Level 1: Summary Flow
A simplified overview showing the full pipeline or process at a glance.
*Example*: `Input → Processing → Output`

### Level 2: Section Boundaries
Labeled regions grouping related components. draw.io swimlanes and dashed-border containers are ideal.
*Example*: Grouping by responsibility (Backend / Frontend), by phase (Setup / Execution / Cleanup).

### Level 3: Detail Inside Sections
Evidence artifacts, code snippets, and concrete examples within each section.

**For comprehensive diagrams, aim to include all three levels.**

---

## Container vs. Free-Floating Text

**Not every piece of text needs a shape around it.** Default to free-floating text. Add containers only when they serve a purpose.

| Use a Container When... | Use Free-Floating Text When... |
|------------------------|-------------------------------|
| It's the focal point of a section | It's a label or description |
| It needs visual grouping with other elements | It's supporting detail or metadata |
| Arrows need to connect to it | It describes something nearby |
| The shape itself carries meaning (decision diamond, etc.) | Typography alone creates sufficient hierarchy |

**Typography as hierarchy**: Use font size and color to create visual hierarchy without boxes.

---

## Design Process (Do This BEFORE Generating XML)

### Step 0: Assess Depth Required
- **Simple/Conceptual**: Abstract shapes, labels, relationships
- **Comprehensive/Technical**: Concrete examples, code snippets, real data

**If comprehensive**: Do research first.

### Step 1: Understand Deeply
For each concept, ask:
- What does this concept **DO**? (not what IS it)
- What relationships exist between concepts?
- **What would someone need to SEE to understand this?**

### Step 2: Map Concepts to Patterns

| If the concept... | Use this pattern |
|-------------------|------------------|
| Spawns multiple outputs | **Fan-out** (radial arrows from center) |
| Combines inputs into one | **Convergence** (funnel, arrows merging) |
| Has hierarchy/nesting | **Tree** (orthogonal edges, no boxes needed) |
| Is a sequence of steps | **Timeline** (line + dots + free-floating labels) |
| Loops or improves continuously | **Cycle** (arrow returning to start) |
| Transforms input to output | **Assembly line** (before → process → after) |
| Compares two things | **Side-by-side** (parallel with contrast) |
| Separates into phases | **Swimlane** (draw.io native lanes) |

### Step 3: Ensure Variety
For multi-concept diagrams: **each major concept must use a different visual pattern**. No uniform cards or grids.

### Step 4: Sketch the Flow
Before XML, mentally trace how the eye moves through the diagram. There should be a clear visual story.

### Step 5: Generate XML
Only now create the draw.io XML. **See below for how to handle large diagrams.**

### Step 6: Render & Validate (MANDATORY)
After generating the XML, you MUST run the render-view-fix loop until the diagram looks right. See the **Render & Validate** section below.

---

## Large / Comprehensive Diagram Strategy

**For comprehensive or technical diagrams, build the XML one section at a time.**

### The Section-by-Section Workflow

**Phase 1: Build each section**

1. **Create the base file** with the `<mxGraphModel>` wrapper, root cells (`id="0"` and `id="1"`), and the first section of elements.
2. **Add one section per edit.** Each section gets its own dedicated pass.
3. **Use descriptive string IDs** (e.g., `"trigger_rect"`, `"arrow_fan_left"`) so cross-section references are readable.
4. **Namespace IDs by section** (e.g., section 1: `"s1_rect"`, section 2: `"s2_box"`) to avoid collisions.
5. **Update cross-section edges** as you go — when a new section's edge connects to an element from a previous section, set `source` and `target` correctly.

**Phase 2: Review the whole**

After all sections are in place, read the complete XML and check:
- Are cross-section edges referencing correct cell IDs?
- Is spacing balanced?
- Do all `source`/`target` references point to existing cells?

**Phase 3: Render & validate**

Now run the render-view-fix loop.

---

## Visual Pattern Library

### Fan-Out (One-to-Many)
Central shape with arrows radiating to multiple targets. Use for: sources, hubs, root causes.
```
        ○
       ↗
  □ → ○
       ↘
        ○
```

### Convergence (Many-to-One)
Multiple inputs merging via arrows to single output. Use for: aggregation, funnels.
```
  ○ ↘
  ○ → □
  ○ ↗
```

### Timeline (Sequence)
Vertical or horizontal line with small dots at intervals, free-floating labels beside each dot.
```
  ●─── Step 1
  │
  ●─── Step 2
  │
  ●─── Step 3
```

### Swimlane (Phase Separation)
draw.io's native swimlane container (`shape=swimlane`) groups elements by phase, team, or responsibility.
Ideal for multi-actor workflows.

### Cycle (Loop)
Elements in sequence with arrow returning to start. Use for: feedback loops, iterations.
```
  □ → □
  ↑     ↓
  □ ← □
```

### Tree (Hierarchy)
Parent-child edges with `edgeStyle=orthogonalEdgeStyle`. Lines + free-floating text (no boxes needed for leaves).

---

## Shape Meaning

| Concept Type | Style / Shape | Why |
|--------------|---------------|-----|
| Labels, descriptions | free-floating text (`fillColor=none;strokeColor=none;`) | Typography creates hierarchy |
| Start, trigger, input | `ellipse;` | Soft, origin-like |
| End, output, result | `ellipse;` | Completion, destination |
| Decision, condition | `rhombus;` | Classic decision symbol |
| Process, action, step | `rounded=1;` rectangle | Contained action |
| External system | `shape=cylinder3;` | Visually distinct |
| Group/Region | `swimlane;` or dashed rectangle | Visual boundary |
| Small marker/dot | small ellipse (20×20) | Visual anchor on timeline |
| Code snippet / evidence | dark rectangle + monospace text | Shows actual content |

**Rule**: Default to no border/fill for text. Add shapes only when they carry meaning.

---

## draw.io XML Format

### File Structure

```xml
<mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1"
              tooltips="1" connect="1" arrows="1" fold="1"
              page="0" pageScale="1" pageWidth="1654" pageHeight="1169"
              math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <!-- All diagram cells go here as children of cell id="1" -->
  </root>
</mxGraphModel>
```

**Rules:**
- `id="0"` and `id="1"` cells are always required and must come first
- All top-level shape cells have `parent="1"`
- Cells inside a container have `parent="container_id"`
- `page="0"` removes the page border from exports (cleaner output)

### Shape (Vertex) Cell

```xml
<mxCell id="shape1" value="Label Text" style="STYLE_STRING" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="160" height="80" as="geometry" />
</mxCell>
```

### Edge (Arrow) Cell

```xml
<mxCell id="edge1" value="" style="EDGE_STYLE" edge="1" source="shape1" target="shape2" parent="1">
  <mxGeometry relative="1" as="geometry" />
</mxCell>
```

### Free-Floating Text Cell

```xml
<mxCell id="text1" value="Section Title" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=20;fontStyle=1;fontColor=#1e40af;" vertex="1" parent="1">
  <mxGeometry x="100" y="80" width="300" height="30" as="geometry" />
</mxCell>
```

### Style String Format

Styles are semicolon-separated `key=value` pairs:
```
rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#374151;fontSize=14;strokeWidth=2;
```

**Key style properties:**

| Property | Values | Description |
|----------|--------|-------------|
| `fillColor` | `#hex` or `none` | Background fill |
| `strokeColor` | `#hex` or `none` | Border color |
| `fontColor` | `#hex` | Text color |
| `fontSize` | number | Text size in pixels |
| `fontStyle` | bitmask | 1=bold, 2=italic, 4=underline |
| `align` | `left`, `center`, `right` | Horizontal text alignment |
| `verticalAlign` | `top`, `middle`, `bottom` | Vertical text alignment |
| `strokeWidth` | number | Border thickness |
| `rounded` | `0` or `1` | Rounded corners |
| `ellipse` | (flag) | Ellipse shape |
| `rhombus` | (flag) | Diamond shape |
| `dashed` | `0` or `1` | Dashed border |
| `opacity` | 0-100 | Shape opacity |
| `whiteSpace` | `wrap` | Enable text wrapping |
| `html` | `1` | Enable HTML in labels |

**Text-only cell (no border/fill):**
```
text;html=1;strokeColor=none;fillColor=none;
```

---

## Edge Styles

| Style | Description |
|-------|-------------|
| `edgeStyle=orthogonalEdgeStyle;` | Right-angle routing (most common) |
| `edgeStyle=elbowEdgeStyle;` | Single elbow routing |
| `curved=1;` | Curved edges |
| `exitX=1;exitY=0.5;exitDx=0;exitDy=0;` | Force exit point (right-middle) |
| `entryX=0;entryY=0.5;entryDx=0;entryDy=0;` | Force entry point (left-middle) |

**Arrowhead styles** (append to edge style):
```
endArrow=block;endFill=1;      ← filled block (default)
endArrow=open;                  ← open arrowhead
endArrow=none;                  ← no arrowhead
startArrow=block;startFill=1;  ← arrow at start too
```

---

## Color as Meaning

Colors encode information, not decoration. Every color choice should come from `references/color-palette.md`.

**Key principles:**
- Each semantic purpose (start, end, decision, AI, error, etc.) has a fill/stroke/font color triple
- Free-floating text uses `fontColor` for hierarchy
- Evidence artifacts (code snippets, JSON) use dark backgrounds + colored text
- Always pair a darker stroke with a lighter fill for contrast

**Do not invent new colors.** Use the palette's semantic categories.

---

## Modern Aesthetics

### Rounded vs. Sharp
- `rounded=1;arcSize=10;` — Slightly rounded. Professional, modern.
- `rounded=0;` — Sharp corners. Technical/engineering diagrams.

**Default to `rounded=1`** for most diagrams.

### Stroke Width
- `strokeWidth=1;` — Thin. Good for dividers, subtle borders.
- `strokeWidth=2;` — Standard. Good for primary shapes.
- `strokeWidth=3;` — Bold. Use sparingly for emphasis.

### Opacity
**Always use `opacity=100` for all elements.** Use color, size, and stroke width to create hierarchy instead of transparency.

---

## Layout Principles

### Hierarchy Through Scale
- **Hero**: 300×120 — visual anchor, most important
- **Primary**: 180×80
- **Secondary**: 120×60
- **Small**: 60×30

### Whitespace = Importance
The most important element has the most empty space around it (150px+).

### Flow Direction
Guide the eye: typically left→right or top→bottom for sequences, radial for hub-and-spoke.

### Connections Required
Position alone doesn't show relationships. If A relates to B, there must be an edge.

---

## Text in draw.io

Use `html=1;` in the style to enable HTML formatting in labels:
- `<b>bold</b>` — bold text
- `<br>` — line break
- `<font color="#hex">text</font>` — inline color

**Font sizes:**
- Section title: 20-24px (`fontStyle=1` for bold)
- Primary label: 14-16px
- Secondary/detail: 11-13px

---

## Render & Validate (MANDATORY)

You cannot judge a diagram from XML alone. After generating or editing the draw.io XML, you MUST render it to PNG, view the image, and fix what you see — in a loop until it's right. This is a core part of the workflow, not a final check.

### How It Works

The renderer uses Playwright + headless Chromium to:
1. Start a local HTTP server (required — `file://` cannot load external scripts)
2. Load `viewer-static.min.js` from `viewer.diagrams.net` CDN
3. Use the mxGraph `Graph` + `mxCodec` API to render the diagram XML into SVG
4. Take a screenshot of the rendered result

### How to Render

```bash
cd .claude/skills/drawio-diagram/references && uv run python render_drawio.py <path-to-file.drawio>
```

This outputs a PNG next to the `.drawio` file. Then use the **Read tool** on the PNG to actually view it.

### Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `viewer-static.min.js failed to load` | Network / CDN issue | Check internet connectivity; the CDN URL is `https://viewer.diagrams.net/js/viewer-static.min.js` |
| `Chromium not installed` | First-time setup needed | Run first-time setup below |
| `mxGraph globals not available` | Script loaded but globals missing | CDN may have changed; verify URL returns valid JS |

### The Loop

After generating the initial XML, run this cycle:

**1. Render & View** — Run the render script, then Read the PNG.

**2. Audit against your original vision** — Before looking for bugs, compare the rendered result to what you designed in Steps 1-4. Ask:
- Does the visual structure match the conceptual structure you planned?
- Does each section use the pattern you intended (fan-out, swimlane, timeline, etc.)?
- Does the eye flow through the diagram in the order you designed?
- Is the visual hierarchy correct — hero elements dominant, supporting elements smaller?
- For technical diagrams: are the evidence artifacts readable and properly placed?

**3. Check for visual defects:**
- Text clipped by or overflowing its container
- Text or shapes overlapping other elements
- Arrows crossing through elements instead of routing around them
- Arrows landing on the wrong element or pointing into empty space
- Labels floating ambiguously (not clearly anchored to what they describe)
- Uneven spacing between elements that should be evenly spaced
- Text too small to read at the rendered size
- Overall composition feels lopsided or unbalanced

**4. Fix** — Edit the XML to address everything you found. Common fixes:
- Widen containers when text is clipped (increase `width` in `<mxGeometry>`)
- Adjust `x`/`y` in `<mxGeometry>` to fix spacing and alignment
- Change `edgeStyle` or add waypoints to `<Array as="points">` for better arrow routing
- Add `exitX`/`exitY`/`entryX`/`entryY` to edges to force connection points

**5. Re-render & re-view** — Run the render script again and Read the new PNG.

**6. Repeat** — Keep cycling until the diagram passes both the vision check and the defect check. Typically takes 2-4 iterations. Don't stop after one pass just because there are no critical bugs — if the composition could be better, improve it.

### When to Stop

The loop is done when:
- The rendered diagram matches the conceptual design from your planning steps
- No text is clipped, overlapping, or unreadable
- Arrows route cleanly and connect to the right elements
- Spacing is consistent and the composition is balanced
- You'd be comfortable showing it to someone without caveats

### First-Time Setup

```bash
cd .claude/skills/drawio-diagram/references
uv sync
uv run playwright install chromium
```

Verify with:
```bash
cd .claude/skills/drawio-diagram/references && uv run python render_drawio.py --check
```

---

## Quality Checklist

### Depth & Evidence (Check First for Technical Diagrams)
1. **Research done**: Did you look up actual specs, formats, event names?
2. **Evidence artifacts**: Are there code snippets, JSON examples, or real data?
3. **Multi-zoom**: Does it have summary flow + section boundaries + detail?
4. **Concrete over abstract**: Real content shown, not just labeled boxes?
5. **Educational value**: Could someone learn something concrete from this?

### Conceptual
6. **Isomorphism**: Does each visual structure mirror its concept's behavior?
7. **Argument**: Does the diagram SHOW something text alone couldn't?
8. **Variety**: Does each major concept use a different visual pattern?
9. **No uniform containers**: Avoided card grids and equal boxes?

### Container Discipline
10. **Minimal containers**: Could any boxed element work as free-floating text instead?
11. **Lines as structure**: Are tree/timeline patterns using lines + text rather than boxes?
12. **Typography hierarchy**: Are font size and color creating visual hierarchy?

### Structural
13. **Connections**: Every relationship has an edge
14. **Flow**: Clear visual path for the eye to follow
15. **Hierarchy**: Important elements are larger/more isolated

### Technical (draw.io Specific)
16. **Root cells present**: `id="0"` and `id="1"` cells always exist and come first
17. **Parent references valid**: All `parent` attributes reference existing cells
18. **Source/target valid**: All edge `source`/`target` attributes reference existing vertex cells
19. **html=1 set**: All cells with multi-line or styled text have `html=1` in style
20. **page="0"**: Set in `<mxGraphModel>` for clean exports (no page border)

### Visual Validation (Render Required)
21. **Rendered to PNG**: Diagram has been rendered and visually inspected
22. **No text overflow**: All text fits within its container
23. **No overlapping elements**: Shapes and text don't overlap unintentionally
24. **Even spacing**: Similar elements have consistent spacing
25. **Arrows land correctly**: Arrows connect to intended elements without crossing others
26. **Readable at export size**: Text is legible in the rendered PNG
27. **Balanced composition**: No large empty voids or overcrowded regions
