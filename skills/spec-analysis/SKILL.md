---
name: spec-analysis
description: Use when the user provides wiki URLs and/or Figma screenshots/images to analyze a spec. Triggers on "스펙 분석", "기획 분석", "위키 보고 설계해줘", "피그마 보고 어떻게 만들지", "어디 수정해야 해", or when wiki links and design files are shared together.
---

# Spec Analysis

## Overview
위키 문서와 피그마 이미지를 분석해서 스펙을 이해하고, 설계 방향과 단계별 구현 계획을 제시합니다.

## Input Types

| 입력 | 접근 방법 |
|------|-----------|
| 위키 URL | `curl` + `CONFLUENCE_TOKEN` |
| 피그마 링크 | ❌ 직접 접근 불가 — 스크린샷 또는 이미지 파일로 제공 필요 |
| 피그마 이미지/스크린샷 | ✅ Claude가 직접 분석 가능 |
| 피그마 Dev Mode 스펙 | ✅ 텍스트로 붙여넣기 |

## Process

1. 위키 내용 읽기 (URL 제공 시)
2. 피그마 이미지 분석 (이미지 제공 시)
3. 현재 코드베이스 탐색 (관련 파일 파악)
4. 스펙 요약 및 설계 방향 제시
5. 단계별 구현 계획 출력

## Implementation

### 위키 페이지 읽기
```bash
# Page ID로 조회
bash -c 'curl -s -H "Authorization: Bearer $CONFLUENCE_TOKEN" "$CONFLUENCE_URL/rest/api/content/PAGE_ID?expand=body.storage"'
```

### 위키 검색
```bash
bash -c 'curl -s -H "Authorization: Bearer $CONFLUENCE_TOKEN" "${CONFLUENCE_URL}/rest/api/content/search?cql=text%20~%20%22키워드%22&limit=10"'
```

### 위키 URL에서 Page ID 추출
위키 URL 형식: `.../pages/12345678/페이지제목` → Page ID는 숫자 부분

## Output Format

```
## 스펙 요약
[기능의 목적, 핵심 요구사항]

## 주요 화면 / 컴포넌트
- [화면 1]: 설명
- [화면 2]: 설명

## 설계 방향
- 아키텍처 결정사항
- 컴포넌트/모듈 구조
- API 인터페이스 변경 필요 여부

## 수정 필요 파일
| 파일 | 변경 내용 |
|------|-----------|
| `path/to/file` | 이유 |

## 단계별 구현 계획
1. **[단계명]**: 상세 내용
2. **[단계명]**: 상세 내용
...

## 주의사항 / 리스크
- 의존성, 엣지케이스, 고려사항
```

## Notes
- 스펙 분석 후 구현 계획이 필요하면 `superpowers:writing-plans` 스킬로 이어서 plan 파일 작성
- 피그마 이미지가 없으면 위키만으로도 분석 가능하지만, UI 관련 판단은 제한적
- 위키에 여러 페이지가 연결된 경우 하위 페이지도 순차적으로 읽을 것
