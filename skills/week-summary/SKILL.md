---
name: week-summary
description: Use when the user says "주간보고 작성해줘", "주간보고", "이번 주 요약", or asks for a weekly work summary.
---

# Week Summary

이번 주(월~금) 작업을 **3가지 소스**에서 자동 수집 후 정해진 포맷으로 요약한다.

## 데이터 수집 순서

### 1. 주간 로그 파일 읽기

이번 주 로그 파일을 먼저 읽는다:

```bash
# 이번 주 파일 경로 계산 (ISO week)
WEEK=$(date +%Y-W%V)
cat ~/.claude/memory/weekly/${WEEK}.md 2>/dev/null || echo "(로그 없음)"
```

### 2. OSS PR 수집

이번 주 월요일 이후 생성하거나 리뷰한 PR을 수집:

```bash
MONDAY=$(date -v-$(( $(date +%u) - 1 ))d +%Y-%m-%d)

# 내가 만든 PR
GH_PAGER= GH_HOST=oss.navercorp.com gh search prs \
  --author=@me --owner=wmone --state=all \
  --json number,title,repository,createdAt \
  --created=">=${MONDAY}"

# 내가 리뷰한 PR
GH_PAGER= GH_HOST=oss.navercorp.com gh search prs \
  --reviewed-by=@me --owner=wmone --state=open \
  --json number,title,repository,updatedAt
```

### 3. Jira 이슈 수집

이번 주 업데이트된 내 이슈 조회:

```bash
bash -c 'curl -s -H "Authorization: Bearer $JIRA_TOKEN" \
  -H "Accept: application/json" \
  "${JIRA_URL}/rest/api/2/search?jql=assignee%3DcurrentUser()%20AND%20updated%3E%3DstartOfWeek()%20ORDER%20BY%20updated%20DESC&maxResults=30&fields=summary,status,issuetype,priority"'
```

## 분류 기준

| 분류 | 포함 내용 |
|------|-----------|
| **서비스 과제** | 4.5, 4.6 등 버전 기반 feature 개발, 관련 PR 작성·리뷰, 버그 수정 |
| **개발 과제** | KMP 모듈, 공통 컴포넌트, 아키텍처 개선 등 서비스 외 개발 업무 |
| **기타** | 휴가, 건강검진, 교육, 행정, **Claude Code/AI 공부/AI 툴 세팅**, 기타 비개발 항목 — 날짜 `(M/DD)` 표기 |

## 출력 포맷

```
# 요약
- <핵심 작업 1~3줄>

# 서비스 과제
- <항목>
  - <세부 내용>

# 개발 과제
- <항목>
  - <세부 내용>

# 기타
- <항목 (날짜)>
```

## 작성 규칙

- **내용 없는 섹션은 타이틀 포함 전체 생략**
- 날짜가 명확한 항목은 `(M/DD)` 형식으로 표기
- 수집된 데이터가 부족하면 "(데이터 부족 — 수동 보완 필요)" 표기

## 주간 로그 파일 정리

보고서 생성 후 **2주 이전 파일 자동 삭제**:

```bash
find ~/.claude/memory/weekly/ -name "*.md" -mtime +14 -delete
```
