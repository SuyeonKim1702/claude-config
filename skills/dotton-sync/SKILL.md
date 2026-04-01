---
name: dotton-sync
description: Use when the user says "dotton 메모리 업데이트", "dotton sync", "/dotton-sync", "작업 내용 저장", "메모리 업데이트", or asks to update/save the Dotton project memory after a session. ONLY trigger in the Dotton project context (/Users/user/Desktop/Dotton).
---

# Dotton Memory Sync

이번 세션에서 작업한 내용을 Dotton 프로젝트 메모리에 반영한다.

## 메모리 파일 경로

```
~/.claude/projects/-Users-user-Desktop-Dotton/memory/
├── MEMORY.md              — 인덱스 (건드리지 않아도 됨)
├── project_progress.md    — Phase 진행 현황, 다음 작업
├── code_patterns.md       — TCA/SwiftUI 패턴, 금지사항, 폰트/색상
└── architecture.md        — 파일 구조, 주요 타입 인터페이스
```

## 업데이트 절차

### 1. 현재 메모리 읽기

3개 파일을 모두 읽는다.

### 2. 이번 세션 변경사항 파악

대화 내용에서 다음을 추출한다:
- 완료된 기능/수정사항
- 새로 추가된 파일 또는 타입
- 변경된 코드 패턴, 인터페이스
- 다음 세션에서 이어할 작업

### 3. 각 파일 업데이트

변경이 있는 파일만 수정한다:

- **project_progress.md**: 완료된 Phase/기능 추가, 다음 작업 업데이트
- **code_patterns.md**: 새로 발견된 패턴, 금지사항, 버그 수정 방법 추가
- **architecture.md**: 새 파일/타입/인터페이스 추가, 기존 내용 수정

### 4. 변경 요약 출력

어떤 내용이 어느 파일에 반영됐는지 간단히 출력한다.

## 작성 규칙

- 이미 기록된 내용은 중복 추가하지 않는다
- 코드 스니펫은 핵심 인터페이스만 (전체 구현 X)
- 삭제/변경된 내용은 기존 항목을 수정하고 오래된 내용은 제거한다
