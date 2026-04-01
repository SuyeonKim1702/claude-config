---
name: claude-sync
description: Use when the user wants to sync Claude config - upload current settings/skills to remote or download latest from remote. Triggers on "설정 올려줘", "설정 받아와", "동기화", "claude-sync", "최신 버전 업로드", "최신 버전 받아와".
---

# Claude Config Sync

Claude Code 설정(스킬, 메모리, CLAUDE.md 등)을 OSS 레포와 동기화한다.

## 업로드 (현재 → 원격)

변경된 내용을 OSS에 푸시:

```bash
cd ~/.claude
git add CLAUDE.md skills/ memory/ settings.json .gitignore
git status
```

변경사항 확인 후:

```bash
git commit -m "$(date '+%Y-%m-%d') config update"
git push origin main
```

## 다운로드 (원격 → 현재)

최신 설정을 가져오기:

```bash
cd ~/.claude
git pull origin main
```

## 충돌 발생 시

두 노트북에서 같은 파일을 수정한 경우:

```bash
cd ~/.claude
git status        # 충돌 파일 확인
git diff          # 내용 비교
```

→ 내용 확인 후 사용자에게 어떤 버전을 쓸지 물어본다.

## 참고

- 레포: https://oss.navercorp.com/soooyeon-kim/claude-config
- 올라가는 것: CLAUDE.md, skills/, memory/, settings.json
- 올라가지 않는 것: 캐시, 히스토리, 토큰 등 민감 정보 (.gitignore 처리)
