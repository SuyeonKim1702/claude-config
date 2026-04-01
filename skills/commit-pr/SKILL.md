---
name: commit-pr
description: Use when the user wants to commit changes and create a PR on OSS (oss.navercorp.com). Triggers on "커밋하고 PR 올려줘", "PR 올려줘", "commit-pr".
---

# Commit & PR

현재 변경사항을 커밋하고 OSS에 PR을 생성한다.

## 실행 순서

### 1. Git 상태 확인

```bash
git status
git diff --stat
```

### 2. Jira 이슈 파악

브랜치명에서 이슈 번호 추출 (없으면 사용자에게 확인):

```bash
BRANCH=$(git branch --show-current)
# 예: feature/4.6/WMAPP-5703-stamp-keyboard → WMAPP-5703
ISSUE_KEY=$(echo $BRANCH | grep -oE 'WMAPP-[0-9]+')
echo "이슈 키: $ISSUE_KEY"
```

이슈 정보 조회:

```bash
bash -c 'curl -s -H "Authorization: Bearer $JIRA_TOKEN" \
  -H "Accept: application/json" \
  "${JIRA_URL}/rest/api/2/issue/${ISSUE_KEY}?fields=summary,issuetype,fixVersions"'
```

응답에서 추출:
- `fields.summary` → PR 제목에 사용
- `fields.issuetype.name` → 라벨 결정 (Story/Feature → Feature, 나머지 → BTS)
- `fields.fixVersions[].name` → 마일스톤 결정 (예: "4.6" → "v4.6")

### 3. 커밋

```bash
git add -p  # 변경사항 선택적 스테이징 (또는 git add <files>)
git commit -m "<커밋 메시지>"
```

커밋 메시지는 PR 제목과 동일하게 작성.

### 4. 브랜치 푸시

```bash
git push -u origin $(git branch --show-current)
```

### 5. PR 생성

**PR 제목 형식:**
- Jira 이슈 있을 때: `[WMAPP-이슈번호] 이슈 제목`
- Jira 이슈 없을 때: 작업 내용 요약

**라벨 결정:**

| 조건 | 라벨 |
|------|------|
| 항상 | `common` |
| Jira 이슈 타입이 Story / Feature / 신규개발 | `common`, `Feature` |
| Jira 이슈 타입이 Bug / Task / 기타 | `common`, `BTS` |

**마일스톤:** Jira fixVersions에서 버전 번호 추출 → `v4.5`, `v4.6` 형식으로 매핑

```bash
GH_PAGER= GH_HOST=oss.navercorp.com gh pr create \
  --title "[WMAPP-XXXX] 이슈 제목" \
  --body "$(cat <<'EOF'
## Jira
- [WMAPP-XXXX](https://jira.navercorp.com/browse/WMAPP-XXXX)

## Issue
<해결하는 문제 또는 작업 배경>

## Changes
- <변경 내용 1>
- <변경 내용 2>

## Note
<리뷰어에게 전달할 참고사항, 없으면 생략>
EOF
)" \
  --assignee "@me" \
  --label "common" \
  --label "Feature" \
  --milestone "v4.6"
```

> **주의:** `--reviewer`는 지정하지 않는다.

## PR Body 작성 가이드

| 섹션 | 내용 |
|------|------|
| **Jira** | Jira 이슈 링크. 없으면 섹션 생략 |
| **Issue** | 왜 이 작업을 했는지 배경/문제 설명 |
| **Changes** | 무엇을 변경했는지 bullet로 나열 |
| **Note** | 리뷰어 참고사항, 특이사항. 없으면 섹션 생략 |

## 체크리스트

- [ ] 커밋 완료
- [ ] 푸시 완료
- [ ] PR 제목 형식 확인 (`[WMAPP-XXXX] ...`)
- [ ] Assignee = @me
- [ ] Reviewer 없음
- [ ] 라벨: Common + (Feature 또는 BTS)
- [ ] 마일스톤 설정
