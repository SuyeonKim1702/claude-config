---
name: open-md
description: Use when the user wants to open, view, or read a markdown file. Triggers on "열어줘", "보여줘", "확인해줘", "읽어줘" when referring to a .md file or a known memory/skill file path.
---

# Open Markdown in VS Code

## 동작

1. 파일 경로 파악 (명시적 경로 또는 대화 맥락에서 추론)
2. VS Code로 파일 열기
3. Markdown 미리보기 실행

## 구현

```bash
# 파일 열기 (filepath는 절대경로)
code <filepath>
```

파일 열린 후 사용자에게 안내: **`Cmd+Shift+V`** 로 미리보기 열기

## 자주 쓰는 경로 참고

| 설명 | 경로 |
|------|------|
| 워크플로우 설계 문서 | `~/.claude/memory/2026-03-25-dev-workflow-design.md` |
| dev 스킬 | `~/.claude/skills/dev/SKILL.md` |
| AI 학습 노트 | `~/.claude/memory/ai-learnings.md` |
| 메모리 | `~/.claude/memory/MEMORY.md` |

## 참고

- Mermaid 다이어그램 렌더링은 VS Code 익스텐션 필요: `Markdown Preview Mermaid Support`
- `code` CLI가 없으면 VS Code에서 `Cmd+Shift+P` → `Shell Command: Install 'code' command in PATH` 실행
