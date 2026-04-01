# draw.io 다이어그램 스킬

[excalidraw-diagram](https://github.com/coleam00/excalidraw-diagram-skill) 스킬을 draw.io 용으로 포팅한 버전입니다.

자연어 설명으로부터 아름답고 실용적인 draw.io 다이어그램을 생성하는 코딩 에이전트 스킬입니다. 단순한 박스와 화살표가 아닌, **시각적으로 논증하는** 다이어그램을 만듭니다.

스킬을 지원하는 모든 코딩 에이전트에서 사용 가능합니다. `.claude/skills/`에서 스킬을 읽는 에이전트([Claude Code](https://docs.anthropic.com/en/docs/claude-code) 등)라면, 해당 디렉토리에 넣기만 하면 바로 사용할 수 있습니다.

## 이 스킬만의 차별점

- **보여주기만 하는 게 아니라, 논증하는 다이어그램.** 모든 도형이 개념을 반영합니다 — 일대다 관계는 팬아웃으로, 순차 흐름은 타임라인으로, 다중 행위자 흐름은 스윔레인으로 표현합니다.
- **증거가 담긴 산출물.** 기술 다이어그램에 실제 코드 스니펫과 데이터 페이로드가 포함됩니다 — 라벨만 붙은 박스가 아닙니다.
- **시각적 검증 내장.** Playwright 기반 렌더링 파이프라인(`viewer-static.min.js` from diagrams.net 사용)으로 에이전트가 자신의 출력을 직접 확인하고, 레이아웃 문제를 발견하여 전달 전에 수정할 수 있습니다.
- **draw.io 앱 설치 불필요.** 로컬 HTTP 서버 + 헤드리스 Chromium으로 diagrams.net CDN 뷰어를 로드합니다 — Playwright만 설치하면 됩니다.
- **브랜드 커스터마이징 가능.** 모든 색상이 하나의 파일(`references/color-palette.md`)에 있습니다. 파일만 교체하면 모든 다이어그램이 새 팔레트를 따릅니다.

## 설치

이 저장소를 클론하거나 다운로드한 뒤, 프로젝트의 `.claude/skills/` 디렉토리에 복사합니다:

```bash
git clone https://github.com/your-org/drawio-diagram-skill.git
cp -r drawio-diagram-skill .claude/skills/drawio-diagram
```

## 설정

이 스킬에는 에이전트가 다이어그램을 시각적으로 검증할 수 있는 렌더링 파이프라인이 포함되어 있습니다.

**방법 A: 코딩 에이전트에게 맡기기 (가장 간편)**

에이전트에게 다음과 같이 요청하세요: *"README.md의 안내에 따라 draw.io 다이어그램 스킬 렌더러를 설정해 줘."* 에이전트가 명령을 대신 실행합니다.

**방법 B: 수동 설정**

```bash
cd .claude/skills/drawio-diagram/references
uv sync
uv run playwright install chromium
```

**설정 확인:**

```bash
cd .claude/skills/drawio-diagram/references
uv run python render_drawio.py --check
```

## 사용법

코딩 에이전트에게 다이어그램 생성을 요청하세요:

> "AG-UI 프로토콜이 AI 에이전트에서 프론트엔드 UI로 이벤트를 스트리밍하는 과정을 보여주는 draw.io 다이어그램을 만들어 줘"

스킬이 나머지를 처리합니다 — 개념 매핑, 레이아웃, XML 생성, 렌더링, 시각적 검증까지 자동으로 수행됩니다.

## 색상 커스터마이징

`references/color-palette.md`를 수정하여 브랜드에 맞게 변경하세요. 그 외 나머지는 범용적인 디자인 방법론입니다.

## 파일 구조

```
drawio-diagram/
  SKILL.md                          # 디자인 방법론 + 워크플로우
  README.md                         # 이 파일
  references/
    color-palette.md                # 브랜드 색상 (커스터마이징용)
    element-templates.md            # 각 요소 유형별 XML 템플릿
    xml-schema.md                   # draw.io XML 포맷 레퍼런스
    render_drawio.py                # .drawio를 PNG로 렌더링 (Playwright 기반)
    render_template.html            # draw.io 뷰어를 사용하는 브라우저 템플릿
    pyproject.toml                  # Python 의존성 (playwright)
```

## 렌더링 동작 원리

이 스킬은 diagrams.net의 mxGraph 라이브러리와 함께 **Playwright + 헤드리스 Chromium**을 사용합니다:

1. `render_template.html`을 제공하기 위해 로컬 HTTP 서버가 시작됩니다 (`file://`은 외부 스크립트 로딩을 차단하므로 필요)
2. 템플릿이 `https://viewer.diagrams.net/js/viewer-static.min.js`에서 `viewer-static.min.js`를 로드합니다
3. mxGraph `Graph` + `mxCodec` API를 사용하여 다이어그램 XML을 디코딩합니다 (헤드리스 모드에서 불안정한 `GraphViewer` API 대신 사용)
4. 렌더링된 SVG를 스크린샷으로 PNG 파일을 생성합니다

이것이 의미하는 바:
- draw.io 데스크톱 앱 설치가 필요 없습니다
- CI/CD 및 원격 서버에서 동작합니다
- 공식 draw.io 편집기와 동일한 mxGraph 렌더링 엔진을 사용합니다

### 문제 해결

| 증상 | 원인 | 해결 방법 |
|------|------|-----------|
| `viewer-static.min.js failed to load` | 네트워크 / CDN 문제 | 인터넷 연결을 확인하세요 |
| `Chromium not installed` | 최초 설정이 필요합니다 | `uv run playwright install chromium`을 실행하세요 |
| `mxGraph globals not available` | 스크립트는 로드되었으나 전역 변수가 없음 | CDN이 변경되었을 수 있음; URL이 유효한 JS를 반환하는지 확인하세요 |
