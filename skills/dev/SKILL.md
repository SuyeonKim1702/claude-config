---
name: dev
description: Use when the user starts a development task from scratch. Triggers on feature requests, bug descriptions, Jira issue numbers (e.g. WMONE-1234), or when wiki/figma/spec is provided. Runs Plan → Execute → Publish pipeline with user checkpoints between each phase.
---

# Dev Workflow

## Overview
Plan → Execute → Publish 3단계 자동화 워크플로우.
각 단계 사이에만 사용자가 검토하고, 나머지는 자동으로 진행.

## 입력 파싱

요청에서 다음을 감지:

| 감지 항목 | 예시 | 처리 |
|-----------|------|------|
| Jira 이슈 번호 | `WMONE-1234`, `WMAPP-5678` | Jira API로 이슈 조회 |
| 위키 URL | `wiki.navercorp.com/...` | curl로 내용 읽기 |
| 피그마 이미지 | 첨부 이미지 | 이미지 직접 분석 |
| 말로 된 요청 | "로그인 버튼 색상 변경" | 텍스트로 처리 |

---

## Phase 1 — Plan

### 1-1. 병렬 탐색
`superpowers:dispatching-parallel-agents` 를 사용해 동시에 탐색:

- **항상 실행**: 현재 작업 중인 프로젝트 디렉토리(`pwd`) 코드 탐색 (관련 파일/컴포넌트 파악)
- **Jira 번호 있을 때**: Jira 이슈 상세 + 연결된 이슈 조회
- **위키 URL 있을 때**: curl로 위키 페이지 읽기
- **피그마 이미지 있을 때**: 이미지 분석하여 UI 스펙 파악

```bash
# Jira 조회 예시
bash -c 'curl -s -H "Authorization: Bearer $JIRA_TOKEN" \
  -H "Accept: application/json" \
  "$JIRA_URL/rest/api/2/issue/ISSUE-KEY"'
```

### 1-2. 계획 수립
탐색 결과를 바탕으로 `superpowers:writing-plans` 로 PLAN.md 생성.

PLAN.md에 포함할 내용:
- 작업 목적 및 요약
- 수정 필요 파일 목록
- 단계별 TODO (의존성 포함)
- 주의사항 / 엣지케이스

### ⏸ 체크포인트 #1
PLAN.md를 사용자에게 보여주고 승인 대기.
- 승인 → Phase 2 진행
- 수정 요청 → PLAN.md 수정 후 재확인

---

## Phase 2 — Execute

### 2-0. 브랜치 생성
코드 작업 전 브랜치를 생성한다.

**브랜치명 규칙:**

| 상황 | 형식 | 예시 |
|------|------|------|
| Jira 버그/태스크 | `fix/{VERSION}/{JIRA-KEY}` | `fix/4.6/WMONE-1234` |
| Jira 신규 기능 | `feature/{VERSION}/{JIRA-KEY}` | `feature/4.6/WMAPP-5678` |
| 말로 된 버그 수정 | `fix/{VERSION}/{짧은설명}` | `fix/4.6/login-button-color` |
| 말로 된 신규 기능 | `feature/{VERSION}/{짧은설명}` | `feature/4.6/stamp-keyboard` |

**VERSION**: Jira fixVersions에서 추출. 없으면 사용자에게 물어본다.

**애매한 경우 반드시 사용자에게 확인:**
- fix vs feature 구분이 불명확할 때
- VERSION을 알 수 없을 때
- 브랜치명 키워드가 너무 길거나 모호할 때

```bash
git checkout -b {브랜치명}
```

### 2-1. 코드 구현
`superpowers:subagent-driven-development` 로 PLAN.md의 TODO 순서대로 구현.
- 의존성 없는 TODO는 병렬 처리
- 각 TODO 완료 후 다음 진행

### 2-2. 검증 (순서대로)
1. **SwiftLint**: `swiftlint lint` 실행 → 경고/에러 자동 수정 시도
2. **Xcode 빌드**: `xcodebuild` 로 빌드 확인 → 실패 시 자동 수정 (최대 3회)
3. **코드 리뷰**: `superpowers:code-reviewer` 에이전트로 리뷰

빌드/린트 3회 실패 시 → 사용자에게 상황 보고 후 대기

### ⏸ 체크포인트 #2
구현 결과 요약을 사용자에게 보여주고 승인 대기.
- 변경된 파일 목록
- 빌드/린트/리뷰 결과 요약
- 승인 → Phase 3 진행
- 수정 요청 → 해당 부분 재작업

---

## Phase 3 — Publish

`commit-pr` 스킬 실행:
- 브랜치명에서 Jira 이슈 번호 추출
- Jira 정보로 PR 제목/라벨/마일스톤 자동 채우기
- 커밋 메시지 + PR 본문 초안 작성

### ⏸ 체크포인트 #3
커밋 메시지와 PR 내용을 사용자에게 보여주고 최종 확인.
- 승인 → 커밋 → 푸시 → OSS PR 생성
- 수정 요청 → 내용 수정 후 재확인

---

## 실패 처리

| 상황 | 처리 |
|------|------|
| 빌드/린트 자동 수정 실패 (3회) | 사용자에게 보고, 수동 개입 요청 |
| Jira 토큰 없음 | Jira 단계 스킵, 계속 진행 |
| 위키 접근 실패 | 스킵하고 사용자에게 알림 |
| 코드 리뷰 이슈 발견 | 자동 수정 후 재리뷰 |

---

## 참고: 활용 스킬/슈퍼파워

- `superpowers:dispatching-parallel-agents` — Plan 병렬 탐색
- `superpowers:writing-plans` — PLAN.md 생성
- `superpowers:subagent-driven-development` — 코드 구현
- `superpowers:code-reviewer` — 코드 리뷰 에이전트
- `commit-pr` — 커밋 + PR 생성
