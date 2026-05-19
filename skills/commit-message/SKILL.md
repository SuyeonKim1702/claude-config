---
name: commit-message
description: Use when the user wants a commit message drafted from the current changeset — staged or unstaged — without actually committing. Triggers on "스커메" (= staged 커밋 메시지), "언스커메" (= unstaged 커밋 메시지), "커밋 msg", "커밋 메시지", "커밋 메시지 작성해줘", "메시지만 써줘", "스테이지 커밋 메시지", "언스테이지 커밋 메시지", "commit msg", "write commit message", "draft commit message". Reads the diff, surveys recent commit style, outputs a message ready to paste into `git commit -m`. Does NOT run `git commit`. For full commit + PR flow on OSS use `commit-pr` instead.
---

# Commit Message Writer

## Overview

Drafts a commit message for the current working tree. Decides scope (staged vs unstaged), reads that diff, matches the repo's existing commit style, and outputs a paste-ready message.

**Strict scope: this skill never runs `git commit`.** Writing the message is the deliverable. Actually committing is a separate, user-initiated step.

Works in any git repo. Project-specific conventions (Jira ticket format, prefix vocabulary, language) are detected at runtime from `git log` and any `AGENTS.md` / `CLAUDE.md` / `.gitmessage` / `CONTRIBUTING.md` in the repo root.

## Workflow

### 1. Survey state

```bash
git status --short
git diff --staged --stat
git diff --stat
```

### 2. Pick the changeset

| State | Action |
|---|---|
| Only staged has changes | Use staged |
| Only unstaged has changes | Use unstaged |
| Both have changes | **Ask the user** which to summarize (or "both as one message") — they may be unrelated |
| Nothing | Tell the user there's nothing to summarize and stop |

If the user's request already specifies ("스테이지에 있는…", "언스테이지…", "방금 add한 거", etc.), honor that and skip the question.

**Shortcut triggers — area is implicit, never ask:**

| Shortcut | Meaning | Action |
|---|---|---|
| `스커메` | 스테이지 커밋 메시지 | Use staged only (`git diff --staged`). If staged is empty, report that and stop — do NOT fall back to unstaged. |
| `언스커메` | 언스테이지 커밋 메시지 | Use unstaged only (`git diff`). If unstaged is empty, report that and stop — do NOT fall back to staged. |

### 3. Read the diff

```bash
git diff --staged          # staged
git diff                   # unstaged
```

If the diff is huge (>500 lines or many files), don't try to read every line:
- Read `--stat` first to see file counts and line deltas
- Spot-check the most-changed files
- Note file-group themes (e.g. "3 files in Stamp/ — DI refactor", "package.json + lockfile — dep bump")

### 4. Detect conventions

Always do both:

```bash
git log -10 --format="%s" --no-merges
```

And check for in-repo style guides — read whichever exist (top 1–2 levels):
- `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md` (look for commit / PR title rules)
- `.gitmessage` (template), `.commitlintrc*`, `commitlint.config.*`

Detect:
- **Jira / issue ticket prefix** pattern (e.g. `[WMAPP-1234]`, `WMONE-1234:`, `(#123)`)
- **Conventional commit prefix** vocabulary used (`feat:` / `fix:` / `ref:` / `refactor:` / `chore:` / `docs:` / `test:` / `style:` / `perf:` / `build:` / `ci:` — every repo picks a subset)
- **Language** — Korean / English / mixed?
- **Special prefixes** for releases, version bumps, merges, etc.
- **Body style** — bullet points? numbered? prose paragraphs?
- **Subject length limit** — most repos cap around 50–72 chars; match observed habit

If a project has explicit rules in `AGENTS.md`/`CLAUDE.md`, those override observed log style.

### 5. Draft the message

Apply detected conventions. Defaults below if nothing detected.

### 6. Output

Print the message as a fenced code block, ready to paste. Then a one-line note explaining:
- which changeset you summarized (staged / unstaged / both)
- whether you'd recommend splitting (if the diff has unrelated concerns)

Do **not** run any git command after this. Stop.

## Default drafting rules (when no project convention detected)

Use conventional-commit-style prefixes:

| Prefix | When |
|---|---|
| `feat:` | New feature / capability for users |
| `fix:` | Bug fix |
| `refactor:` (or `ref:` if repo uses that) | Behavior-preserving code change |
| `chore:` | Build, deps, tooling, CI, lockfiles |
| `docs:` | Documentation only |
| `test:` | Test-only changes |
| `style:` | Formatting, whitespace |
| `perf:` | Performance change |

- Subject **≤ 70 chars**
- Subject in imperative ("Add X", "Fix Y") or Korean 동사형 ("X 추가", "Y 수정")
- Describe what the **diff actually does**, not what the user originally asked for — the two may diverge
- If the diff spans multiple concerns, write a body with `-` bullets after one blank line:
  ```
  refactor: Migrate StampManager settingViewModel to DI

  - StampManager: replace computed property with getSettingViewModel(serviceType:, buddyType:, stampType:)
  - StampSettingViewCoordinator: receive context via init
  - StampKeyboardCoordinator: retain context, forward on settings open
  ```
- Lockfile-only commits — call out the version transition explicitly: `chore: bump <package> to <version>`
- **Do NOT include `Co-Authored-By` by default.** If the user wants it (e.g. "Claude랑 같이 작업했으니 trailer 넣어줘"), add at the end after a blank line. Otherwise omit.

## Approval policy

Read-only. No approval needed for any step. The skill never mutates repo state.

## Red flags — STOP

| Thought | Reality |
|---|---|
| "I'll go ahead and run `git commit -m '...'`" | NO. Output only. Committing is the user's call. |
| "Both staged and unstaged exist, I'll just merge them mentally" | Ask. They might be unrelated and want separate commits. |
| "The user said they fixed bug X, so the message is about bug X" | Read the diff. The diff might also contain refactor / formatting / unrelated changes. |
| "Diff is 2000 lines, I'll write a generic 'misc updates'" | Use `--stat`, group by theme, spot-check. Generic messages erase information. |
| "I'll add `Co-Authored-By: Claude` to every message" | No. Default off. Only if user asks. |
| "Recent style is `feat:`, my message must be `feat:`" | Match the *type of change*, not blindly copy the last prefix. A refactor is `refactor:` even if the previous commit was `feat:`. |
| "I'll combine 4 unrelated changes into one message" | Suggest splitting in the note instead. |
| "No AGENTS.md/CLAUDE.md, so I'll just guess style from one recent commit" | Read 10 messages, not one. One commit isn't a pattern. |

## Common mistakes

- **Describing intent over content** — the message must reflect the diff, not the conversation. A "fix bug" task might also include an unrelated refactor; the message must mention both, or you should suggest splitting.
- **Skipping the `git log` and repo-doc style check** — every repo has dialect. Don't guess.
- **Listing every file changed** — group by theme. "Updates 12 files in src/" is useless; "Refactor X to receive Y via DI" is information.
- **Auto-adding Co-Author trailer** — default off.
- **Actually running `git commit`** — this skill writes; it does not commit.
- **Picking a prefix the repo doesn't use** — if recent log only shows `feat`/`fix`/`chore`, don't invent `style:` or `build:` for this repo just because conventional-commits permits them.

## Example output shape

```
refactor: Migrate StampManager settingViewModel to DI

- Remove `settingViewModel` computed property (hardcoded service type)
- Add `getSettingViewModel(serviceType:, buddyType:, stampType:)` mirroring sibling factories
- StampSettingViewCoordinator: receive context via init, forward in present()
- StampKeyboardCoordinator: retain serviceType/buddyType, forward in onOpenSettings()
```

Note: covers staged refactor only. Lockfile / SPM-resolved changes still in working tree — those belong in a separate `chore:` commit.
