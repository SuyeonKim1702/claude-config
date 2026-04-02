#!/usr/bin/env node
/**
 * Claude Code Statusline — configurable, enterprise-ready usage tracker
 *
 * Configurable elements: Model | Version | Git | Context | Usage | Cost | Lines
 *
 * Enterprise: shows session cost instead of 5h/7d limits.
 * Subscription: shows 5h and 7d usage limits with reset timers.
 *
 * Cross-platform: macOS, Linux, Windows.
 * Reads OAuth token from:
 *   1. CLAUDE_CODE_OAUTH_TOKEN env var
 *   2. macOS Keychain (macOS only)
 *   3. Windows Credential Manager via native CredRead API (Windows only)
 *   4. ~/.claude/.credentials.json (all platforms)
 * No external dependencies — Node.js stdlib only.
 */

import { readFileSync, writeFileSync, existsSync, openSync, closeSync, copyFileSync } from "fs";
import { join } from "path";
import { homedir, platform } from "os";
import { execFileSync, spawn } from "child_process";
import http2 from "http2";
import { fileURLToPath } from "url";
import readline from "readline";

const IS_WIN = platform() === "win32";
const HOME = homedir();
const CLAUDE_DIR = join(HOME, ".claude");
const CACHE_FILE = join(CLAUDE_DIR, "statusline_cache.json");
const BACKOFF_FILE = join(CLAUDE_DIR, "statusline_backoff.json");
const CONFIG_FILE = join(CLAUDE_DIR, "statusline_config.json");
const SETTINGS_FILE = join(CLAUDE_DIR, "settings.json");
const CREDS_FILE = join(CLAUDE_DIR, ".credentials.json");
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const PKG_VERSION = "1.5.1";

// --- Element definitions ---
const ELEMENTS = [
  { id: "model",   label: "모델명",      example: "Opus 4.6",  defaultOn: true },
  { id: "version", label: "CC 버전",     example: "v1.0.80",   defaultOn: true },
  { id: "git",     label: "Git 브랜치",  example: "main*",     defaultOn: true },
  { id: "context", label: "컨텍스트",    example: "20k/200k",  defaultOn: true },
  { id: "usage",   label: "사용량 제한", example: "5h/7d",     defaultOn: true },
  { id: "cost",    label: "세션 비용",   example: "$0.12",     defaultOn: false },
  { id: "lines",   label: "변경 라인",   example: "+156 -23",  defaultOn: false },
];
const DEFAULT_ELEMENTS = ELEMENTS.filter(e => e.defaultOn).map(e => e.id);

// --- Windows UTF-8 setup ---
if (IS_WIN) {
  try {
    execFileSync("chcp.com", ["65001"], { stdio: "ignore", windowsHide: true });
  } catch {}
}

// --- Colors ---
function supportsColor() {
  if (!IS_WIN) return true;
  return !!(process.env.WT_SESSION || process.env.TERM_PROGRAM || process.env.ConEmuANSI === "ON" || process.env.COLORTERM);
}

const USE_COLOR = supportsColor();
const rgb = (r, g, b) => USE_COLOR ? `\x1b[38;2;${r};${g};${b}m` : "";
const RST = USE_COLOR ? "\x1b[0m" : "";
const DIM = rgb(108, 112, 134);
const TEXT = rgb(205, 214, 244);
const BRANCH = rgb(137, 180, 250);
const DIRTY = rgb(250, 179, 135);
const GREEN = rgb(166, 227, 161);
const YELLOW = rgb(249, 226, 175);
const RED = rgb(243, 139, 168);
const PURPLE = rgb(203, 166, 247);

const pcolor = (p) => (p < 50 ? GREEN : p < 90 ? YELLOW : RED);

function ftok(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.floor(n / 1000)}k`;
  return String(n);
}

const osc8 = (url, text) =>
  USE_COLOR ? `\x1b]8;;${url}\x07${text}\x1b]8;;\x07` : text;

function getTermCols() {
  if (process.stdout.columns) return process.stdout.columns;
  if (process.stderr.columns) return process.stderr.columns;
  if (process.env.COLUMNS) return parseInt(process.env.COLUMNS) || 0;
  if (!IS_WIN) {
    let fd;
    try {
      fd = openSync("/dev/tty", "r");
      const size = execFileSync("stty", ["size"], {
        encoding: "utf8",
        timeout: 500,
        stdio: [fd, "pipe", "pipe"],
      }).trim();
      const cols = parseInt(size.split(" ")[1]);
      if (cols > 0) return cols;
    } catch {} finally {
      if (fd != null) try { closeSync(fd); } catch {}
    }
  }
  return 0;
}

function loadJson(path) {
  try { return JSON.parse(readFileSync(path, "utf8")); } catch { return {}; }
}


const SEP = ` ${DIM}|${RST} `;
const fmtCost = (v) => v != null
  ? `${DIM}$${TEXT}${v.toFixed(2)}${RST}`
  : `${DIM}$${TEXT}--${RST}`;
const fmtEntUsage = (util, rem) => {
  const pc = util != null ? pcolor(util) : TEXT;
  const us = util != null ? `${Math.round(util)}%` : "--%";
  const rs = rem != null ? ftok(rem) : "--";
  return `${DIM}mo ${pc}${us}${RST} ${DIM}(rem ${TEXT}${rs}${DIM})${RST}`;
};

function exec(cmd, args, cwd) {
  try {
    return execFileSync(cmd, args, {
      cwd,
      encoding: "utf8",
      timeout: 2000,
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    }).trim();
  } catch {
    return "";
  }
}

function gitInfo(cwd) {
  let br = exec("git", ["branch", "--show-current"], cwd);
  if (!br) br = exec("git", ["rev-parse", "--short", "HEAD"], cwd).slice(0, 7);
  if (!br) return { branch: "", dirty: false, remote: "" };

  const dirty = exec("git", ["status", "--porcelain"], cwd).length > 0;
  let url = exec("git", ["remote", "get-url", "origin"], cwd);
  if (url.startsWith("git@github.com:"))
    url = url.replace("git@github.com:", "https://github.com/");
  if (url.endsWith(".git")) url = url.slice(0, -4);

  return { branch: br, dirty, remote: url };
}

// --- Token retrieval ---
function getToken() {
  if (process.env.CLAUDE_CODE_OAUTH_TOKEN)
    return process.env.CLAUDE_CODE_OAUTH_TOKEN;

  if (platform() === "darwin") {
    // Find all "Claude Code-credentials*" keychain entries and pick the active one.
    // Claude Code stores per-account tokens with a suffix (e.g. "-eb165e85").
    // Prefer the entry whose token matches the currently active Claude Code session
    // by checking which service name is used by the running process, falling back to
    // the most-recently-modified entry.
    try {
      const dump = execFileSync(
        "security",
        ["dump-keychain"],
        { encoding: "utf8", timeout: 3000, stdio: ["pipe", "pipe", "pipe"] }
      );
      const serviceNames = [...dump.matchAll(/"svce"<blob>="(Claude Code-credentials[^"]*)"/g)]
        .map(m => m[1]);

      // Prefer suffix entries over the bare name (suffix = account-specific)
      const suffixed = serviceNames.filter(s => s !== "Claude Code-credentials");
      const ordered = [...suffixed, ...serviceNames.filter(s => s === "Claude Code-credentials")];

      for (const svc of ordered) {
        try {
          const raw = execFileSync(
            "security",
            ["find-generic-password", "-s", svc, "-w"],
            { encoding: "utf8", timeout: 3000, stdio: ["pipe", "pipe", "pipe"] }
          ).trim();
          const parsed = JSON.parse(raw)?.claudeAiOauth;
          if (parsed?.accessToken) return parsed.accessToken;
        } catch {}
      }
    } catch {}
  }

  if (IS_WIN) {
    try {
      const ps = `
Add-Type -Namespace Win32 -Name Cred -MemberDefinition @'
  [DllImport("advapi32.dll", SetLastError=true, CharSet=CharSet.Unicode)]
  public static extern bool CredRead(string target, int type, int flags, out IntPtr cred);
  [DllImport("advapi32.dll")] public static extern void CredFree(IntPtr cred);
  [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]
  public struct CREDENTIAL {
    public int Flags; public int Type; public string TargetName; public string Comment;
    public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten;
    public int CredentialBlobSize; public IntPtr CredentialBlob;
    public int Persist; public int AttributeCount; public IntPtr Attributes;
    public string TargetAlias; public string UserName;
  }
'@
foreach($key in @("Claude Code-credentials","Claude Code","claude-code")){
  $ptr=[IntPtr]::Zero
  if([Win32.Cred]::CredRead($key,1,0,[ref]$ptr)){
    $c=[System.Runtime.InteropServices.Marshal]::PtrToStructure($ptr,[type][Win32.Cred+CREDENTIAL])
    if($c.CredentialBlobSize -gt 0){
      [System.Runtime.InteropServices.Marshal]::PtrToStringUni($c.CredentialBlob,$c.CredentialBlobSize/2)
      [Win32.Cred]::CredFree($ptr)
      break
    }
    [Win32.Cred]::CredFree($ptr)
  }
}`.trim();
      const raw = execFileSync(
        "powershell",
        ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", ps],
        { encoding: "utf8", timeout: 8000, stdio: ["pipe", "pipe", "pipe"], windowsHide: true }
      ).trim();
      if (raw) {
        const token = JSON.parse(raw)?.claudeAiOauth?.accessToken;
        if (token) return token;
      }
    } catch {}
  }

  const credPaths = [CREDS_FILE];
  if (IS_WIN) {
    const appdata = process.env.APPDATA || "";
    const localappdata = process.env.LOCALAPPDATA || "";
    if (appdata) {
      credPaths.push(join(appdata, "Claude", ".credentials.json"));
      credPaths.push(join(appdata, "claude-code", ".credentials.json"));
    }
    if (localappdata) {
      credPaths.push(join(localappdata, "Claude", ".credentials.json"));
    }
  }
  for (const p of credPaths) {
    try {
      if (existsSync(p)) {
        const token = JSON.parse(readFileSync(p, "utf8"))
          ?.claudeAiOauth?.accessToken;
        if (token) return token;
      }
    } catch {}
  }

  return null;
}

// --- Usage fetch (HTTP/2) — detects enterprise plan ---
function doFetchRequest(token) {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => { if (done) return; done = true; clearTimeout(timer); resolve(); };
    const timer = setTimeout(() => { finish(); try { client.close(); } catch {} }, 15000);

    const client = http2.connect("https://api.anthropic.com");
    client.on("error", () => { try { client.close(); } catch {} finish(); });

    const req = client.request({
      ":method": "GET",
      ":path": "/api/oauth/usage",
      authorization: `Bearer ${token}`,
      "anthropic-beta": "oauth-2025-04-20",
      "anthropic-version": "2023-06-01",
      "user-agent": `@hongjun-bae/cc-statusline/${PKG_VERSION}`,
      accept: "*/*",
    });

    let body = "";
    req.on("data", (d) => (body += d));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (data.error) {
          const bf = loadJson(BACKOFF_FILE);
          const count = (bf.count || 0) + 1;
          const delaySec = Math.min(300 * Math.pow(2, count - 1), 3600);
          writeFileSync(BACKOFF_FILE, JSON.stringify({ count, retry_after: new Date(Date.now() + delaySec * 1000).toISOString() }));
          try { client.close(); } catch {} finish(); return;
        }
        try { writeFileSync(BACKOFF_FILE, "{}"); } catch {}

        const cache = { cached_at: new Date().toISOString() };

        // Detect plan type from API response
        const hasFiveHour = data.five_hour && data.five_hour.utilization != null;
        const hasSevenDay = data.seven_day && data.seven_day.utilization != null;
        const hasExtraUsage = data.extra_usage && data.extra_usage.is_enabled === true;
        if (hasFiveHour || hasSevenDay) cache.plan_type = "subscription";
        else if (hasExtraUsage) cache.plan_type = "enterprise";
        else cache.plan_type = "unknown";

        for (const key of ["five_hour", "seven_day", "extra_usage"]) {
          if (data[key]) cache[key] = data[key];
        }
        writeFileSync(CACHE_FILE, JSON.stringify(cache));
      } catch {}
      try { client.close(); } catch {}
      finish();
    });
    req.on("error", () => { try { client.close(); } catch {} finish(); });
    req.end();
  });
}

function fetchUsage() {
  spawn(process.execPath, [SCRIPT_PATH, "--fetch-only"], {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  }).unref();
}

async function fetchOnly() {
  const token = getToken();
  if (!token) process.exit(1);
  await doFetchRequest(token);
}

// --- Interactive setup ---
function generatePreview(selectedIds, planType) {
  const parts = [];
  const els = new Set(selectedIds);

  if (els.has("model"))   parts.push(`${TEXT}Opus 4.6${RST}`);
  if (els.has("version")) parts.push(`${DIM}v1.0.80${RST}`);
  if (els.has("git"))     parts.push(`${BRANCH}main${RST}`);
  if (els.has("context")) parts.push(`${GREEN}██░░░░░░░░ 20%${DIM} (20k/200k)${RST}`);
  if (els.has("usage")) {
    if (planType === "enterprise") {
      parts.push(fmtEntUsage(null, null));
    } else {
      parts.push(`${DIM}5h ${TEXT}--${RST}`);
      parts.push(`${DIM}7d ${TEXT}--${RST}`);
    }
  }
  if (els.has("cost"))  parts.push(fmtCost(0));
  if (els.has("lines")) parts.push(`${GREEN}+0${RST} ${RED}-0${RST}`);

  return parts.join(SEP) || `${DIM}(요소를 선택하세요)${RST}`;
}

async function interactiveSetup() {
  const config = loadJson(CONFIG_FILE);
  const cache = loadJson(CACHE_FILE);
  const planType = cache.plan_type || "unknown";

  // Smart defaults based on plan type
  let defaultIds;
  if (Array.isArray(config.elements) && config.elements.length > 0) {
    defaultIds = config.elements;
  } else if (planType === "enterprise") {
    defaultIds = ["model", "version", "git", "context", "cost"];
  } else {
    defaultIds = DEFAULT_ELEMENTS;
  }

  const selected = new Set(defaultIds);
  let cursor = 0;

  const draw = () => {
    process.stdout.write("\x1b[H\x1b[2J");
    process.stdout.write(`\n  ${TEXT}Claude Code Statusline 설정${RST}  ${DIM}v${PKG_VERSION}${RST}\n`);
    if (planType === "enterprise") {
      process.stdout.write(`  ${PURPLE}Enterprise 플랜 감지${RST} ${DIM}— 5h/7d 제한 없음, 월 사용량 기반 과금${RST}\n`);
    } else if (planType === "subscription") {
      process.stdout.write(`  ${BRANCH}Subscription 플랜 감지${RST} ${DIM}— 5h/7d 사용량 제한${RST}\n`);
    }
    process.stdout.write(`\n  ${DIM}↑↓ 이동  Space 선택/해제  Enter 확인  Ctrl+C 취소${RST}\n\n`);

    ELEMENTS.forEach((el, i) => {
      const active = i === cursor;
      const checked = selected.has(el.id);
      const arrow = active ? `${TEXT} ▸ ${RST}` : "   ";
      const check = checked ? `${GREEN}✔${RST}` : `${DIM}○${RST}`;
      const name = (active || checked ? TEXT : DIM) + el.id.padEnd(10) + RST;
      const desc = `${DIM}${el.label} (예: ${el.example})${RST}`;
      process.stdout.write(`${arrow}${check} ${name}${desc}\n`);
    });

    process.stdout.write(`\n  ${DIM}미리보기:${RST}\n`);
    process.stdout.write(`  ${generatePreview([...selected], planType)}\n\n`);
  };

  process.stdout.write("\x1b[?25l"); // Hide cursor
  draw();

  return new Promise((resolve) => {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    process.stdin.resume();

    const cleanup = () => {
      process.stdout.write("\x1b[?25h");
      if (process.stdin.isTTY) process.stdin.setRawMode(false);
      process.stdin.pause();
    };

    const handler = (_str, key) => {
      if (!key) return;
      if (key.ctrl && key.name === "c") { cleanup(); process.exit(0); }

      switch (key.name) {
        case "up":    cursor = cursor > 0 ? cursor - 1 : ELEMENTS.length - 1; break;
        case "down":  cursor = cursor < ELEMENTS.length - 1 ? cursor + 1 : 0; break;
        case "space": {
          const id = ELEMENTS[cursor].id;
          selected.has(id) ? selected.delete(id) : selected.add(id);
          break;
        }
        case "return": {
          process.stdin.removeListener("keypress", handler);
          cleanup();
          // Maintain canonical order
          const ordered = ELEMENTS.filter(e => selected.has(e.id)).map(e => e.id);
          resolve(ordered);
          return;
        }
      }
      draw();
    };

    process.stdin.on("keypress", handler);
  });
}

// --- Main ---
async function main() {
  if (process.argv.includes("--fetch-only")) {
    await fetchOnly();
    return;
  }

  // Interactive setup mode (TTY — direct terminal run)
  if (process.stdin.isTTY) {
    const selectedElements = await interactiveSetup();

    // Save element config
    writeFileSync(CONFIG_FILE, JSON.stringify({ elements: selectedElements }, null, 2));

    // Copy script to ~/.claude/ for fast direct execution (npx is ~2s, node is ~0.08s)
    const localScript = join(CLAUDE_DIR, "statusline.mjs");
    copyFileSync(SCRIPT_PATH, localScript);

    // Update Claude Code settings — use node directly, not npx
    const settings = loadJson(SETTINGS_FILE);
    settings.statusLine = { type: "command", command: `node ${localScript}` };
    writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));

    const cache = loadJson(CACHE_FILE);

    process.stdout.write("\x1b[H\x1b[2J");
    console.log();
    console.log(`  ${GREEN}✔${RST} ${TEXT}설정 완료!${RST}`);
    console.log();
    console.log(`  ${DIM}선택된 요소:${RST} ${selectedElements.join(", ")}`);
    console.log(`  ${DIM}스크립트:${RST}   ${localScript}`);
    console.log(`  ${DIM}설정 파일:${RST}   ${CONFIG_FILE}`);
    console.log();
    console.log(`  ${generatePreview(selectedElements, cache.plan_type || "unknown")}`);
    console.log();
    console.log(`  ${YELLOW}⚠ Claude Code를 재시작해야 적용됩니다.${RST}`);
    console.log();
    return;
  }

  // --- Statusline render mode (piped stdin from Claude Code) ---
  let data;
  try {
    const input = readFileSync(0, "utf-8").trim();
    if (!input) { console.log("No data"); return; }
    data = JSON.parse(input);
  } catch { console.log("No data"); return; }

  // Load config — fall back to defaults if missing
  const { elements: cfgEls } = loadJson(CONFIG_FILE);
  const elements = new Set(
    Array.isArray(cfgEls) && cfgEls.length > 0 ? cfgEls : DEFAULT_ELEMENTS
  );

  // Cache: read first, output immediately, background refresh if stale
  const cache = loadJson(CACHE_FILE);
  const planType = cache.plan_type || "unknown";
  const CACHE_TTL_MS = planType === "enterprise" ? 3_600_000 : 300_000;
  const cacheAge = cache.cached_at
    ? Date.now() - new Date(cache.cached_at).getTime()
    : Infinity;
  if (cacheAge > CACHE_TTL_MS) {
    const bf = loadJson(BACKOFF_FILE);
    const retryAfter = bf.retry_after ? new Date(bf.retry_after).getTime() : 0;
    if (Date.now() >= retryAfter) fetchUsage();
  }
  const parts = [];

  // --- Model ---
  if (elements.has("model")) {
    const model = data.model || {};
    const name = (model.display_name || model.id || "?").replace("Claude ", "");
    parts.push(`${TEXT}${name}${RST}`);
  }

  // --- Version ---
  if (elements.has("version") && data.version) {
    parts.push(`${DIM}v${data.version}${RST}`);
  }

  // --- Git branch ---
  if (elements.has("git")) {
    const cwd = data.workspace?.current_dir || process.cwd();
    const { branch, dirty, remote } = gitInfo(cwd);
    if (branch) {
      const bd = dirty ? `${branch}*` : branch;
      const bc = dirty ? DIRTY : BRANCH;
      parts.push(
        remote ? `${bc}${osc8(remote, bd)}${RST}` : `${bc}${bd}${RST}`
      );
    }
  }

  // --- Context window ---
  if (elements.has("context")) {
    const ctx = data.context_window || {};
    const cs = ctx.context_window_size || 200000;
    const cp = ctx.used_percentage || 0;
    const ut = Math.floor((cs * cp) / 100);
    const BAR_WIDTH = 10;
    const filled = Math.round((cp / 100) * BAR_WIDTH);
    const bar = "█".repeat(filled) + "░".repeat(BAR_WIDTH - filled);
    const pc = pcolor(cp);
    parts.push(`${pc}${bar} ${Math.round(cp)}%${DIM} (${ftok(ut)}/${ftok(cs)})${RST}`);
  }

  // Mark where secondary (wrap-able) parts begin
  const usageStart = parts.length;

  // --- Usage (adaptive: subscription → 5h/7d, enterprise → cost fallback) ---
  if (elements.has("usage")) {
    if (planType === "enterprise") {
      // Enterprise: show monthly extra_usage with remaining tokens
      const eu = cache.extra_usage;
      if (eu && eu.is_enabled) {
        const rem = eu.monthly_limit != null && eu.used_credits != null
          ? eu.monthly_limit - eu.used_credits : null;
        parts.push(fmtEntUsage(eu.utilization, rem));
      } else if (!elements.has("cost")) {
        parts.push(fmtCost(data.cost?.total_cost_usd));
      }
    } else if (planType === "unknown") {
      // Unknown: fall back to cost if available
      if (!elements.has("cost")) {
        parts.push(fmtCost(data.cost?.total_cost_usd));
      }
    } else {
      // Subscription: show 5h / 7d limits with reset timer
      const now = Date.now();
      for (const [label, key] of [["5h", "five_hour"], ["7d", "seven_day"]]) {
        const period = cache[key] || {};
        const util = period.utilization;
        const resetsAt = period.resets_at;
        if (util != null) {
          let txt = `${DIM}${label} ${pcolor(util)}${Math.round(util)}%`;
          if (resetsAt) {
            const secs = Math.max(0, Math.floor((new Date(resetsAt).getTime() - now) / 1000));
            const h = Math.floor(secs / 3600);
            const m = Math.floor((secs % 3600) / 60);
            if (h > 24) txt += ` ${DIM}(${Math.floor(h / 24)}d${h % 24}h)`;
            else if (h > 0) txt += ` ${DIM}(${h}h${m}m)`;
            else txt += ` ${DIM}(${m}m)`;
          }
          parts.push(`${txt}${RST}`);
        } else {
          parts.push(`${DIM}${label} ${TEXT}--${RST}`);
        }
      }
    }
  }

  // --- Session cost (explicit, always available regardless of plan) ---
  if (elements.has("cost")) {
    parts.push(fmtCost(data.cost?.total_cost_usd));
  }

  // --- Lines changed ---
  if (elements.has("lines")) {
    const added = data.cost?.total_lines_added;
    const removed = data.cost?.total_lines_removed;
    if (added != null || removed != null) {
      parts.push(`${GREEN}+${added || 0}${RST} ${RED}-${removed || 0}${RST}`);
    }
  }

  // --- Output with auto line-wrap ---
  const strip = (s) => s.replace(/\x1b(?:\[[0-9;]*m|\]8;;[^\x07]*\x07)/g, "");
  const fmt = (s) => "\x1b[0m" + s.replace(/ /g, "\u00A0");
  const fullLine = parts.join(SEP);
  const cols = getTermCols();

  if (cols > 0 && strip(fullLine).length > cols) {
    console.log(fmt(parts.slice(0, usageStart).join(SEP)));
    console.log(fmt(parts.slice(usageStart).join(SEP)));
  } else {
    console.log(fmt(fullLine));
  }
}

main();
