# 점점 (Dotton) 앱 개발 계획

## Context
iOS 감성 다이어리 앱. 매일 기록 시 달력의 해당 날짜 원이 채워지고, 한 달이 완성되면 픽셀 아트 이미지 + 문장 하나가 완성된다. 현재는 Xcode 기본 Hello World 상태이며, 기술 스택 확정 후 화면 단위로 개발한다.

## 화면 구조 및 네비게이션
- 탭 바 없음. 메인 화면이 루트.
- 메인 상단 우측 버튼 → 통계 화면 (push 또는 sheet)
- 메인 상단 우측 버튼 → 공유 기능
- 원 탭 → 일기 작성 화면 (sheet)

---

## Phase 0: 기술 스택 확정

### 확정 내용

| 항목 | 결정 | 이유 |
|---|---|---|
| 아키텍처 | TCA 1.17+ (`@Reducer` 매크로) | 최신 Swift Concurrency 패턴, 보일러플레이트 최소 |
| 로컬 저장 | **SwiftData** | 날짜 기반 구조적 쿼리 필요, UserDefaults는 부적합 |
| 차트 | Swift Charts (네이티브) | 서드파티 불필요 |
| 픽셀 아트 v1 | 이진(채워짐/비어있음) 방식 | 단순, 추후 컬러 확장 가능 |

### SPM 패키지 추가 (Xcode에서 직접)
- TCA: `https://github.com/pointfreeco/swift-composable-architecture` → `1.17.0` 이상

---

## Phase 1: Foundation (기반 세팅)

**수정 파일:**
- `Dotton/DottonApp.swift` — Store, ModelContainer, MainView 연결
- `Dotton/ContentView.swift` — MainView로 교체

**생성 파일:**
```
Dotton/
├── Core/
│   ├── Models/
│   │   ├── Diary.swift           (@Model: id, date, achievementAnswer, gratitudeAnswer, freeAnswer, keywords, createdAt)
│   │   ├── MonthlyTheme.swift    (struct: month, pictureKeyword, imageName, sentence, primaryColor, secondaryColor, pixelArtCells)
│   │   └── PixelArtCell.swift    (struct: gridIndex, backgroundColor, textColor, text?, imageName?)
│   ├── Clients/
│   │   └── DiaryClient.swift     (TCA @DependencyClient: fetch/save/delete)
│   └── Extensions/
│       └── Date+Helpers.swift    (startOfMonth, daysInMonth, firstWeekdayOffset 등)
│
└── Features/
    └── AppFeature/
        ├── AppFeature.swift      (Root Reducer — MainFeature를 직접 감싸는 최소 구조)
        └── AppView.swift         (NavigationStack 루트)
```

**Enum 정의:**
- `DiscoveryKeyword`: 15개 키워드 (raw value: String)
- `DiscoverySection`: 성장/성취, 연결, 자기돌봄

---

## Phase 2: 메인 화면 (Main Screen)

**기능:**
- 월별 서클 그리드 (7×5 or 7×6)
- 원 탭 → 일기 작성 (미기록) / 일기 보기 (기록됨)
- 월 이동 (이전/다음)
- 상단 우측: 통계 버튼, 공유 버튼

**파일:**
```
Features/Main/
├── MainFeature.swift
└── MainView.swift
UI/Components/
├── DotCircle.swift      (채워진/빈 원 컴포넌트)
└── CalendarGrid.swift   (7컬럼 그리드, firstWeekdayOffset 기반 배치)
```

**MainFeature State 핵심:**
```swift
var currentMonth: Date
var diaries: [Diary]
@Presents var diaryWrite: DiaryWriteFeature.State?
@Presents var completion: CompletionFeature.State?
@Presents var statistics: StatisticsFeature.State?
var snackBarMessage: String?
```

---

## Phase 3: 일기 작성 화면 (Diary Write)

**기능:**
- 단계별 질문 3개 (achievementAnswer, gratitudeAnswer, freeAnswer)
- 발견한 나의 모습 키워드 다중 선택
- 저장 → SwiftData 기록, Main에 delegate 전달

**파일:**
```
Features/DiaryWrite/
├── DiaryWriteFeature.swift
└── DiaryWriteView.swift
```

**DiaryWriteFeature State 핵심:**
```swift
var date: Date
var currentStep: Int             // 0~3 (질문 3개 + 키워드 선택)
var achievementAnswer: String
var gratitudeAnswer: String
var freeAnswer: String
var selectedKeywords: Set<DiscoveryKeyword>
var existingDiary: Diary?        // 수정 모드일 때
```

---

## Phase 4: 그림 완성 바텀시트 (Completion Sheet)

**트리거:** DiaryWrite 저장 후 해당 월 모든 날짜 기록 완료 감지 (MainFeature에서)
**기능:** 픽셀아트 이미지 + 완성 문장 표시, 공유 버튼

**파일:**
```
Features/CompletionSheet/
├── CompletionFeature.swift
└── CompletionView.swift
```

---

## Phase 5: 통계 화면 (Statistics)

**진입:** 메인 상단 우측 버튼
**기능:** 월별 기록 현황, 기록일 수, 연속 기록 streak, 키워드/카테고리 순위
**차트:** Swift Charts 사용
**이달의 문장:** MonthlyTheme에서 가져옴 (저장 안 함)

**파일:**
```
Features/Statistics/
├── StatisticsFeature.swift
└── StatisticsView.swift
```

---

## Phase 6: 폴리시 (Polish)

- **CoachMark** (`UI/Components/CoachMark.swift`): 첫 실행 온보딩, UserDefaults로 표시 여부 관리
- **SnackBar** (`UI/Components/SnackBar.swift`): 저장 후 하단 자동 사라지는 알림, TCA Effect + Task.sleep(2초)

---

## Phase 7: Firebase Analytics

- SPM 추가: `https://github.com/firebase/firebase-ios-sdk` → `FirebaseAnalytics` 제품만
- `AnalyticsClient.swift` (TCA @DependencyClient로 래핑)
- 이벤트: diary_saved, month_completed, statistics_viewed

---

## 개발 순서 요약

| 단계 | 작업 |
|---|---|
| 1 | SPM으로 TCA 추가 |
| 2 | Diary SwiftData 모델, MonthlyTheme/PixelArtCell struct |
| 3 | DiaryClient 구현 |
| 4 | AppFeature + AppView (NavigationStack 루트) |
| 5 | CalendarGrid + DotCircle 컴포넌트 |
| 6 | MainFeature + MainView |
| 7 | DiaryWriteFeature + DiaryWriteView |
| 8 | CompletionFeature + CompletionView |
| 9 | StatisticsFeature + StatisticsView |
| 10 | CoachMark, SnackBar |
| 11 | Firebase Analytics |

---

## 주요 파일 (현재 존재)

- `Dotton/DottonApp.swift` — 첫 번째로 수정할 진입점
- `Dotton/ContentView.swift` — MainView로 교체될 플레이스홀더
- `CLAUDE.md` — 결정 사항 반영하여 업데이트
