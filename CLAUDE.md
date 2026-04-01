# CLAUDE.md

## Global Memory
항상 대화 시작 시 아래 파일들을 읽어서 컨텍스트를 유지할 것:
- `~/.claude/memory/MEMORY.md` — 사용자 기본 정보 및 현재 관심사
- `~/.claude/memory/ai-study-list.md` — AI 공부 리스트
- `~/.claude/memory/ai-learnings.md` — 배운 내용 누적 정리

## Weekly Work Log

대화 중 아래 작업이 완료되면 **자동으로** 해당 주 로그 파일에 기록:
- PR 작성 / 리뷰 완료
- Jira 이슈 작업
- 스킬 생성 / 설정 변경
- 기타 주요 작업

로그 파일 경로: `~/.claude/memory/weekly/YYYY-WXX.md` (예: `2026-W13.md`)

포맷 예시:
```
# 2026-W13 (3/23 ~ 3/27)

## 수 (3/25)
- PR #102 리뷰: wmone/one_stamp - 스탬프 키보드뷰 Session 5
- week-summary 스킬 생성
```

기록 방법: `echo "- <내용>" >> ~/.claude/memory/weekly/$(date +%Y-W%V).md`

## Local Repositories

다른 레포 분석이 필요할 때 **반드시 서브에이전트(Task tool)로 탐색**할 것. 메인 컨텍스트 직접 탐색 금지.

| 이름 | 경로 |
|------|------|
| oneapp_ios | `~/Desktop/oneapp_ios` |
| one_stamp | `~/StudioProjects/one_stamp` |
| WORichEditor | `~/Desktop/WORichEditor` |

사용 예시: "oneapp_ios의 UserAPI 인터페이스 알아봐줘" → Task(Explore) 서브에이전트로 `~/Desktop/oneapp_ios` 탐색 후 결과 요약 반환

## Naver Internal Tools

- `oss.navercorp.com` : Use `gh` CLI (GHES)
- `wiki.navercorp.com`, `jira.navercorp.com` : **NEVER WebFetch, ALWAYS use `curl` with TOKEN**
  - **IMPORTANT: ALWAYS wrap curl commands with `bash -c '...'` to prevent variable expansion issues**
  - Wiki Search: `bash -c 'curl -H "Authorization: Bearer $CONFLUENCE_TOKEN" "${CONFLUENCE_URL}/rest/api/content/search?cql=text%20~%20%22keyword%22&limit=10"'`
  - Jira Search: `bash -c 'curl -H "Authorization: Bearer $JIRA_TOKEN" -H "Accept: application/json" "${JIRA_URL}/rest/api/2/search?jql=text%20~%20%22keyword%22&maxResults=20"'`

@RTK.md
