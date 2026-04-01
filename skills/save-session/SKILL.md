---
name: save-session
description: Use when the user wants to save current session state to resume later on a different machine. Triggers on "세션 저장해줘", "저장해줘", "다른 노트북에서 이어할게", "save-session". Also triggers when resuming: "저장된 세션 이어서 해줘", "세션 불러와줘", "어디까지 했더라".
---

# Save Session

현재 대화/작업 상태를 파일로 저장하거나, 저장된 상태를 불러와서 이어서 작업한다.

## 저장 (save)

현재 대화 맥락에서 다음을 파악해서 `~/.claude/memory/session-save.md`에 저장:

```markdown
# Session Save
저장일시: YYYY-MM-DD HH:MM

## 작업 목표
[무엇을 하려고 했는지]

## 현재 상태
- 워크플로우: [dev Phase 1/2/3 또는 기타 작업]
- 진행률: [몇 단계까지 완료됐는지]

## 완료된 것
- [완료 항목들]

## 남은 것
- [남은 항목들]

## 관련 파일
- PLAN.md: [경로 (있을 경우)]
- 수정 중인 파일: [파일 목록]
- 브랜치: [브랜치명 (있을 경우)]

## 다음에 할 일
[재개 시 바로 시작할 내용]

## 참고사항
[놓치면 안 되는 결정사항, 주의점]
```

저장 후: "저장 완료. 새 노트북에서 '세션 불러와줘' 하면 이어서 작업할 수 있어요."

## 불러오기 (resume)

`~/.claude/memory/session-save.md` 읽고:

1. 작업 목표와 현재 상태 사용자에게 요약해서 보여주기
2. "여기서 이어서 할까요?" 확인
3. 승인 시 → 남은 작업부터 바로 시작

dev 워크플로우 중이었다면 해당 Phase부터 재개 (처음부터 X)

## 참고

- 저장 파일은 git에 자동 동기화됨 (auto-sync 훅)
- 새 노트북에서 `git pull` 후 바로 불러오기 가능
- 이전 저장 파일은 덮어씌워짐 (하나만 유지)
