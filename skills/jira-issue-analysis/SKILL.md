---
name: jira-issue-analysis
description: Use when the user provides a Jira issue number and wants root cause analysis or fix suggestions. Triggers on issue numbers like "WMONE-1234", "이슈 분석해줘", "이 버그 원인이 뭐야", or "어떻게 고치면 돼".
---

# Jira Issue Analysis

## Overview
Jira 이슈 번호만 받아서 내용을 분석하고, 원인과 수정 방향을 제안합니다.

## Prerequisites
- `JIRA_TOKEN` 환경변수 설정
- `JIRA_URL` 환경변수 설정 (예: `https://jira.navercorp.com`)

## Process

1. 이슈 상세 정보 조회
2. 댓글/첨부 파일 확인
3. 이슈 유형 파악 (버그/기능/태스크)
4. 관련 코드 탐색 (이슈에 파일명/컴포넌트 언급 시)
5. 분석 결과 출력

## Implementation

### 이슈 조회
```bash
# 항상 bash -c '...' 로 감싸서 변수 확장 방지
bash -c 'curl -s -H "Authorization: Bearer $JIRA_TOKEN" -H "Accept: application/json" "$JIRA_URL/rest/api/2/issue/ISSUE-KEY"'
```

### 댓글 조회
```bash
bash -c 'curl -s -H "Authorization: Bearer $JIRA_TOKEN" -H "Accept: application/json" "$JIRA_URL/rest/api/2/issue/ISSUE-KEY/comment"'
```

### 연결된 이슈 조회
```bash
bash -c 'curl -s -H "Authorization: Bearer $JIRA_TOKEN" -H "Accept: application/json" "$JIRA_URL/rest/api/2/issue/ISSUE-KEY?fields=issuelinks,subtasks"'
```

## Output Format

### 버그 이슈
```
## 이슈 요약
[이슈 제목 및 핵심 내용]

## 예상 원인
[근본 원인 분석 - 코드/로직/환경 등]

## 영향 범위
- 어떤 기능이 영향받는지
- 관련 컴포넌트/모듈

## 수정 방향
1. [구체적인 수정 방법]
2. [추가 고려사항]

## 관련 파일
- `path/to/file`: 수정이 필요한 이유
```

### 기능/태스크 이슈
```
## 요구사항 요약
[무엇을 만들어야 하는지]

## 구현 방향
[어떻게 접근할지]

## 단계별 작업
1. [작업 항목]
2. [작업 항목]

## 고려사항
- 의존성, 리스크, 주의사항
```

## Notes
- 이슈 키 형식: `PROJECT-NUMBER` (예: `WMONE-1234`, `WMOAND-5678`)
- 이슈에 파일명/클래스명이 언급되면 실제 코드도 탐색해서 분석에 포함
- 분석 후 구현이 필요하면 `superpowers:writing-plans` 스킬로 이어서 계획 작성
