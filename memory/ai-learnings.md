# AI 배운 내용

## Claude Code 기본

- **Claude Code vs Claude API**
  - Claude Code = AI가 내 컴퓨터에서 코딩해주는 도구
  - Claude API = 내 서비스/앱에 AI를 직접 넣는 도구

- **settings.json** = Claude Code 동작 방식 커스터마이징 파일
  - permissions: 도구 자동 허용/거부 설정
  - hooks: 특정 이벤트에 자동 실행할 스크립트
  - model: 사용할 Claude 모델 지정

## 스킬(Skill)

- 스킬 = Claude에게 특정 일을 잘 할 수 있도록 미리 써놓은 방법서
- `~/.claude/skills/` 폴더에 마크다운 파일로 저장
- `/skill-name` 으로 직접 호출하거나, Claude가 상황 판단해서 자동 호출

- **superpowers 스킬** = 고급 워크플로우 모음
  - `brainstorming` — 구현 전 아이디어 탐색
  - `writing-plans` — 구현 계획 작성
  - `systematic-debugging` — 체계적인 버그 분석
  - `test-driven-development` — TDD 방식 코딩
  - `verification-before-completion` — 완료 전 검증

## 에이전트(Agent)

- **에이전트 = LLM + 도구(Tools) + 반복 실행 루프**
  - 단순 답변이 아니라 목표를 주면 스스로 계획 → 도구 실행 → 결과 확인 → 반복
- **오케스트레이터 + 서브에이전트** 구조
  - Main Agent가 Task 도구로 서브에이전트를 소환
  - 서브에이전트는 독립된 컨텍스트에서 실행 → 메인 컨텍스트 오염 방지
- **병렬 탐색** = 독립적인 여러 서브에이전트가 동시에 다른 곳을 탐색
  - 순차 대비 시간 대폭 단축
  - `superpowers:dispatching-parallel-agents` 스킬로 관리

## 스킬 vs 에이전트

| | 스킬 | 에이전트 |
|--|------|---------|
| 실행 방식 | Claude 본인이 지침 읽고 행동 | 별도 프로세스로 소환 |
| 컨텍스트 | 현재 대화에 쌓임 | 독립된 컨텍스트 |
| 시점 | 작업 전/중 | 작업 후 또는 병렬 |
| 비유 | 레시피 | 요리사에게 일 맡기기 |

- 스킬이 에이전트를 "부르는" 게 아니라, **스킬을 읽은 Claude가 에이전트를 호출**

## 워크플로우

- `brainstorming` → `writing-plans` → `executing-plans` 순서가 기본 흐름
- **brainstorming**: 일반 대화(edit mode), 요구사항 명확화
- **writing-plans**: plan mode 진입, 코드베이스 탐색 + PLAN.md 작성
- **executing-plans**: edit mode, 계획 단계별 실행 + 체크포인트 리뷰
- `/plan` 직접 입력도 가능하지만, 스킬이 자동으로 모드 전환해줌

## Local MCP + 멀티레포 탐색

- Local MCP 또는 CLAUDE.md에 레포 경로 등록 → Claude가 다른 레포 탐색 가능
- 다른 레포 탐색은 **반드시 서브에이전트로** (메인 컨텍스트 직접 탐색 금지)
- 등록된 레포: `oneapp_ios` → `~/Desktop/oneapp_ios`

## Plan Mode vs 스킬

- **Plan Mode** = 파일 수정을 물리적으로 제한, 사용자 승인 후 실행 (안전장치)
- **스킬** = Claude가 더 체계적으로 생각하게 하는 워크플로우
- 둘은 보완 관계: 스킬은 "어떻게 생각할지", Plan Mode는 "언제 실행할지"
- Plan Mode 안에서도 스킬 사용 가능 (오히려 잘 맞음)

## Memory 시스템

- Memory = 대화 간 기억장치 (대화 끝나면 Claude는 다 잊음)
- `MEMORY.md` = 대화 시작 시 항상 자동 로드 (200줄 제한)
- 별도 md 파일 = 직접 열어야 읽힘, 상세 내용 저장용
- MEMORY.md에는 핵심 요약 + "어디를 보면 되는지" 링크만
- **프로젝트별** vs **전역**: `~/.claude/CLAUDE.md`에 지시 추가하면 어디서든 로드
