# Plan: 집중 캘린더 섹션 구현

## Context
StatisticsView의 "집중 캘린더" 섹션에 월간 캘린더를 추가한다.
데이터 연결은 사용자가 직접 하므로, UI 구조와 월 네비게이션 State만 구성한다.

## 수정 파일
- `ggaebiz/ggaebiz/Statistics/StatisticsFeature.swift`
- `ggaebiz/ggaebiz/Statistics/StatisticsView.swift`

---

## StatisticsFeature 변경

**State 추가**
```swift
var displayedMonth: Date = Date()        // 현재 표시 중인 월
var focusedDates: Set<DateComponents> = [] // 집중한 날짜 (사용자가 추후 연결)
```

**Action 추가**
```swift
case prevMonthTapped
case nextMonthTapped
```

**Reducer 처리**
- `prevMonthTapped`: `displayedMonth`을 Calendar로 한 달 빼기
- `nextMonthTapped`: `displayedMonth`을 Calendar로 한 달 더하기

---

## StatisticsView 변경

"집중 캘린더" 섹션의 `EmptyView()` → `calendarView`로 교체

**calendarView 구성 (private extension)**

```
VStack(spacing: 16)
├── 월 헤더
│   HStack
│   ├── Button(chevron.left)  → prevMonthTapped
│   ├── Text("2025년 3월")    → pretendard semiBold600 16 coolGray900
│   └── Button(chevron.right) → nextMonthTapped
├── 요일 헤더
│   LazyVGrid(7열)
│   └── 일 월 화 수 목 금 토  → pretendard medium500 12 coolGray400
└── 날짜 그리드
    LazyVGrid(7열)
    └── 각 셀: 숫자 or 빈 셀
        - focusedDates 포함 시: orange500 원형 배경, white 텍스트
        - 오늘 날짜: coolGray900 원형 배경, white 텍스트
        - 일반: coolGray800 텍스트
        - 텍스트: pretendard medium500 14
```

**날짜 그리드 계산 헬퍼 (private)**
- `calendarDays(for month: Date) -> [Int?]`: 월의 첫 요일 오프셋 + 해당 월 일수를 `[Int?]` 배열로 반환 (빈 칸은 nil)
- `Calendar.current` 사용, 주 시작은 일요일
