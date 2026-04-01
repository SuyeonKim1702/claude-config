# 새 노트북 Claude Code 세팅 가이드

## 1. Claude Code 설치

```bash
npm install -g @anthropic-ai/claude-code
```

---

## 2. 설정 가져오기

```bash
git clone https://oss.navercorp.com/soooyeon-kim/claude-config.git ~/.claude
```

포함되는 것들:
- `CLAUDE.md` — 전역 설정, 레포 경로, 내부 툴 설정
- `skills/` — 커스텀 스킬 (dev, commit-pr, jira-issue-analysis 등)
- `memory/` — AI 학습 노트, 주간 로그
- `settings.json` — Claude Code 설정
- `hooks/auto-sync.sh` — 자동 git 동기화 훅
- `statusline.mjs` + `statusline_config.json` — 상태바

---

## 3. 환경변수 설정

`~/.zshrc` 에 추가:

```bash
export JIRA_TOKEN="<Jira Personal Access Token>"
export JIRA_URL="https://jira.navercorp.com"
export CONFLUENCE_TOKEN="<Confluence Personal Access Token>"
export CONFLUENCE_URL="https://wiki.navercorp.com"
```

토큰 발급:
- Jira: `jira.navercorp.com` → 우측 상단 프로필 → Personal Access Tokens
- Confluence: `wiki.navercorp.com` → 우측 상단 프로필 → Personal Access Tokens

---

## 4. OSS gh 인증

```bash
GH_HOST=oss.navercorp.com gh auth login
```

- Protocol: HTTPS 선택
- 토큰으로 인증

---

## 5. 플러그인 설치

터미널에서 직접 실행:

```bash
# superpowers (마켓플레이스 등록 후 설치)
claude plugin marketplace add obra/superpowers-marketplace
claude plugin install superpowers@superpowers-marketplace

# swift-lsp (claude-plugins-official은 기본 내장)
claude plugin install swift-lsp@claude-plugins-official
```

> settings.json의 `enabledPlugins`는 활성화만 할 뿐, 자동 설치가 아님
> 위 CLI 명령어로 직접 설치해야 실제로 동작함
> 설치 후 Claude Code 재시작 필요

---

## 6. Claude Code 실행

```bash
claude
```

---

## 설치 후 확인 체크리스트

- [ ] `claude` 실행 시 상태바 표시 (model, git, context, usage, cost)
- [ ] `/dev`, `/commit-pr` 등 스킬 동작
- [ ] Jira 이슈 조회 동작 (`jira-issue-analysis` 스킬)
- [ ] superpowers 스킬 동작 (`brainstorming`, `writing-plans` 등)
- [ ] OSS PR 생성 가능

---

## 동기화 (이후)

```bash
# 최신 설정 받아오기
cd ~/.claude && git pull origin main

# 또는 Claude Code에서
"설정 받아와"  →  claude-sync 스킬 실행
```
