# Session Save
저장일시: 2026-03-27 (세션명: stamp-suggestion-loading-ui)

## 작업 목표
oneapp_ios의 스탬프 추천 로직을 KMP로 이식 (텍스트→키워드 추출, 재귀검색, 정렬, 캐싱, 추천 스탬프 UI)

## 현재 상태
- 워크플로우: 구현 완료, UI 마무리 단계
- 진행률: 코드 구현 완료, PR 미작성

## 완료된 것
- StampSuggestionHelper: extractKeyword, sortResults, convertKeyword (SuggestionParser에서 이동)
- StampSuggestionHelperTest: 17개 단위 테스트
- StampManager.getSuggestionResult: 캐시(packageStampCache + recentCache) + 재귀 폴백 검색
- stamp-ui: State/Config/DataSource/ViewModel에 suggestion 이벤트 처리 추가
- StampSuggestionBar: 2행 × N열 HorizontalPager 그리드, 설정 셀(마지막 페이지 우측하단), 로딩 인디케이터
- ChatScreen: TextFieldValue 연동, UpdateSuggestion 이벤트 디스패치, StampSuggestionBar 독립 배치
- StampRepository 버그 수정: 1차 sync에서 item + tag/keyword 모두 다운로드 (기존은 2차 sync 필요)
- SelectSuggestionStamp: 추천 바 닫힘 후 프리뷰 표시
- ColorScheme에 background_scrim_5023 추가 (light: #000 50%, dark: #000 70%)
- common_24_setting_fill.xml drawable 추가

## 관련 파일
- PLAN.md: `/Users/user/Desktop/one_stamp/docs/superpowers/plans/2026-03-27-stamp-suggestion-keyboard.md`
- 브랜치: `feature/4.6/stamp-suggestion-keyboard` (베이스: feature/4.6/add-keyboard-view)
- 주요 수정 파일:
  - `stamp/src/commonMain/kotlin/.../suggestion/StampSuggestionHelper.kt` (신규)
  - `stamp/src/commonMain/kotlin/.../StampManager.kt`
  - `stamp/src/commonMain/kotlin/.../repository/StampRepository.kt`
  - `stamp/src/commonMain/kotlin/.../util/SuggestionParser.kt`
  - `stamp-ui/src/commonMain/kotlin/.../keyboard/StampKeyboardViewModel.kt`
  - `stamp-ui/src/commonMain/kotlin/.../keyboard/StampKeyboardState.kt`
  - `stamp-ui/src/commonMain/kotlin/.../keyboard/StampKeyboardDataSource.kt`
  - `stamp-ui/src/commonMain/kotlin/.../keyboard/StampKeyboardConfig.kt`
  - `stamp-ui/src/commonMain/kotlin/.../keyboard/suggestion/StampSuggestionBar.kt` (신규)
  - `stamp-ui/src/commonMain/kotlin/.../resources/color/ColorScheme.kt`
  - `sample/androidApp/.../ui/screens/ChatScreen.kt`

## 다음에 할 일
PR 올리기 (commit-pr 스킬 사용)
- 베이스 브랜치: feature/4.6/add-keyboard-view
- 모든 커밋 메시지 prefix: [Suggestion]

## 참고사항
- StampSuggestionBar 설정 셀: 마지막 페이지에만 표시, 항상 우측 하단(패딩+SettingsCell로 위치 고정)
- 추천 작동 조건: SyncScreen에서 sync 필요 (최초 1회로 충분, 버그 수정됨)
- StampSuggestionBar는 StampKeyboardScreen 내부가 아닌 ChatScreen에 독립 배치
- SelectSuggestionStamp: hideSuggestion() → selectStamp() 순서 (추천 바 닫힘 후 프리뷰)
- 미완료: debounce 없음 (키 입력마다 검색 호출), ViewModel 테스트 없음
