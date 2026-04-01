#!/bin/bash

cd ~/.claude || exit 0

# 추적 대상 파일만 스테이징
git add CLAUDE.md skills/ memory/ settings.json .gitignore hooks/ statusline.mjs statusline_config.json 2>/dev/null

# 변경사항 있을 때만 커밋 + 푸시
if ! git diff --staged --quiet; then
  git commit -m "auto: $(date '+%Y-%m-%d %H:%M')" --quiet
  git pull --rebase origin main --quiet 2>/dev/null
  git push origin main --quiet 2>/dev/null
fi

exit 0
