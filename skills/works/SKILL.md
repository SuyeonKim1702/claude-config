---
name: works
version: 1.0.0
author: k-oh
tags:
  - guide
  - document
  - manual
  - wiki
  - platform
description: |
  Works Mobile(라인웍스) 서비스 사용 및 관리자 가이드. 메시지, 메일, 캘린더, 드라이브, 멤버 관리,
  보안 설정 등 Works Mobile의 모든 기능을 references 문서를 기반으로 안내.
  TRIGGER: 사용자가 Works Mobile(라인웍스) 서비스 사용법, 관리자 설정, 멤버/그룹 관리,
  메시지 봇 연동, 보안 설정, 서비스별 관리(메일/캘린더/드라이브 등) 관련 작업을 요청할 때.
tools: Read, Glob, Grep
---

# Works Mobile(라인웍스) 가이드

Works Mobile(라인웍스)은 네이버의 기업용 협업 플랫폼입니다. 메시지, 메일, 캘린더, 드라이브, 멤버 관리 등 업무에 필요한 기능을 통합 제공합니다.

## 참조 문서 위치

모든 참조 문서는 `references/` 하위에 있습니다.

| 카테고리 | 경로 | 주요 내용 |
|---|---|---|
| 시작하기 | `references/getting-started-guides/` | 가입, 멤버 합류 |
| 메시지 사용 | `references/use-guides/message/` | 메시지 전송, 메시지룸, 그룹폴더, 노트, 봇 |
| 홈 화면 | `references/use-guides/home/` | 홈 화면 사용법 |
| 설정 | `references/use-guides/settings/` | 알림, 개인 설정, 보안, 기기 설정 |
| 관리자 - 멤버 관리 | `references/admin-guides/manage-members/` | 멤버, 그룹, 조직 관리 |
| 관리자 - 서비스 관리 | `references/admin-guides/manage-service/` | 메일, 캘린더, 드라이브, 메시지, 게시판 등 |
| 관리자 - 앱 관리 | `references/admin-guides/apps/` | 앱 설정 |
| 관리자 - 보안 | `references/admin-guides/security/` | 보안 정책, 권한, 모바일 보안 |
| 관리자 - 설정 | `references/admin-guides/settings/` | 도메인, 커스터마이즈 |
| 관리자 - 통계 | `references/admin-guides/statistics/` | 서비스별 이용 통계 |
| 관리자 - 모니터링 | `references/admin-guides/monitoring/` | 모니터링 |
| 관리자 - 감사 | `references/admin-guides/audit/` | 감사 로그 |
| 관리자 - 구매/보관 | `references/admin-guides/purchase-management/` `references/admin-guides/archive/` | 구매, 보관 |

## 워크플로우

### 1단계: 요청 파악

사용자가 묻는 것이 **일반 사용자 가이드**인지 **관리자 가이드**인지 파악합니다.

**사용자 가이드 (use-guides):**
- **메시지 전송/수신** → `references/use-guides/message/send-message/`
- **메시지룸 관리** → `references/use-guides/message/message-room/`
- **그룹폴더** → `references/use-guides/message/group-folder/`
- **노트 작성** → `references/use-guides/message/note/`
- **봇 사용** → `references/use-guides/message/bot/` 또는 `references/use-guides/message/store-bot/`
- **그룹 일정** → `references/use-guides/message/group-schedule/`
- **그룹 할 일** → `references/use-guides/message/group-task/`
- **알림/개인 설정** → `references/use-guides/settings/`

**관리자 가이드 (admin-guides):**
- **멤버 추가/관리** → `references/admin-guides/manage-members/members/`
- **그룹 관리** → `references/admin-guides/manage-members/groups/`
- **조직도 관리** → `references/admin-guides/manage-members/organizations/`
- **메일 서비스 관리** → `references/admin-guides/manage-service/mail/`
- **캘린더 서비스 관리** → `references/admin-guides/manage-service/calendar/`
- **드라이브 서비스 관리** → `references/admin-guides/manage-service/drive/`
- **메시지 서비스 관리** → `references/admin-guides/manage-service/message/`
- **게시판 관리** → `references/admin-guides/manage-service/board/`
- **보안 정책** → `references/admin-guides/security/`
- **통계 조회** → `references/admin-guides/statistics/`
- **감사 로그** → `references/admin-guides/audit/`

### 2단계: 문서 참조 및 가이드 제공

파악된 카테고리의 문서를 읽고 단계별로 안내합니다.

**Works Mobile 처음 시작 시 권장 참조 순서:**
1. `references/getting-started-guides/` — 가입 및 시작
2. `references/use-guides/message/send-message/` — 메시지 사용법
3. `references/use-guides/settings/personal/` — 개인 설정

**관리자 초기 설정 시 권장 참조 순서:**
1. `references/admin-guides/manage-members/members/` — 멤버 초대
2. `references/admin-guides/manage-members/groups/` — 그룹 구성
3. `references/admin-guides/security/` — 보안 정책 설정
4. `references/admin-guides/settings/` — 도메인/커스터마이즈

**봇 연동 시 권장 참조 순서:**
1. `references/use-guides/message/bot/` — 봇 기본 사용
2. `references/use-guides/message/store-bot/` — 스토어 봇

### 3단계: 추가 기능 안내 (선택)

- 통계/리포트 → `references/admin-guides/statistics/`
- 모바일 보안 → `references/admin-guides/security/mobile-security/`
- 감사 로그 → `references/admin-guides/audit/`
