# Session Save
저장일시: 2026-03-30

## 작업 목표
추천 스탬프 바(StampSuggestionBar)를 iOS WOInputOverlayStampSuggestionView 스펙 기준으로 재구현
- 기존 LazyRow 단순 리스트 → 2행 × N열 그리드 + HorizontalPager + 설정 버튼

## 현재 상태
- 워크플로우: 구현 완료, 아직 커밋 안 된 상태 (unstaged)
- 브랜치: `feature/4.6/stamp-suggestion-keyboard`

## 완료된 것
- StampSuggestionBar.kt: LazyRow → 2행 그리드 + HorizontalPager 전면 개편
  - 셀 50dp, 배경 background_scrim_5023, 마지막 위치에 설정 버튼 고정
  - 페이지 인디케이터(dots), 1페이지면 미표시
  - 스탬프 이미지 로딩 인디케이터 추가
- ColorScheme.kt: background_scrim_5023 색상 추가 (Light: #000 50%, Dark: #000 70%)
- StampKeyboardViewModel.kt: SelectSuggestionStamp 시 hideSuggestion() 먼저 호출
- StampRepository.kt: suggestion 초기화 시 _suggestionTagAndKeywordUrlFlow emit 추가
- ChatScreen.kt: onSettingsClick 연결, 새 StampSuggestionBar 시그니처 반영
- common_24_setting_fill.xml drawable 추가 (untracked)

## 남은 것
- 변경사항 커밋
- 실기기/에뮬레이터 빌드 후 동작 확인
- PR 올리기 (베이스 브랜치: feature/4.6/add-keyboard-view)

## 관련 파일
- PLAN.md: `/Users/user/Desktop/one_stamp/docs/superpowers/plans/2026-03-27-stamp-suggestion-keyboard.md`
- 수정 중인 파일:
  - `stamp-ui/src/commonMain/kotlin/.../keyboard/suggestion/StampSuggestionBar.kt`
  - `stamp-ui/src/commonMain/kotlin/.../keyboard/StampKeyboardViewModel.kt`
  - `stamp-ui/src/commonMain/kotlin/.../resources/color/ColorScheme.kt`
  - `stamp/src/commonMain/kotlin/.../repository/StampRepository.kt`
  - `sample/androidApp/.../ui/screens/ChatScreen.kt`
  - `stamp-ui/src/commonMain/composeResources/drawable/common_24_setting_fill.xml` (untracked)
- 브랜치: `feature/4.6/stamp-suggestion-keyboard`

## 다음에 할 일
변경사항 커밋 후 빌드 테스트, 이후 PR 올리기 (commit-pr 스킬 사용)
- 베이스 브랜치: feature/4.6/add-keyboard-view
- 커밋 메시지 prefix: [Suggestion]

## 참고사항
- iOS 스펙: 셀 50×50pt, 간격 0, 2행×N열, 설정 버튼은 마지막 페이지 우측 하단 고정
- numPages 계산식: (stamps.size + itemsPerPage) / itemsPerPage (정수 나눗셈으로 ceil 효과)
- pages/pagerState는 BoxWithConstraints 안에서 구성 (maxWidth 기반 itemsPerRow 동적 계산)
- SelectSuggestionStamp: hideSuggestion() → selectStamp() 순서 중요
- 미완료: debounce 없음 (키 입력마다 검색 호출), ViewModel 테스트 없음
