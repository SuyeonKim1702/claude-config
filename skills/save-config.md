# save-config

Claude Code 설정과 프로젝트 히스토리를 GitHub에 백업합니다.

## 실행 절차

1. `~/.claude/` 디렉토리로 이동
2. 변경된 파일을 스테이징: `git add -A`
3. 커밋 메시지는 현재 날짜 포함: `git commit -m "backup: $(date '+%Y-%m-%d %H:%M')"`
4. push: `git push origin main`
5. 완료 메시지 출력

## 주의사항

- git 저장소가 없으면 사용자에게 알려줄 것
- push 실패 시 에러 메시지를 사용자에게 보여줄 것
- 변경사항이 없으면 "변경사항 없음" 이라고 알려줄 것
