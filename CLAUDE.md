# Claude Code 작업 지침

## 모델 정보
- **사용 모델**: Claude Opus 4.6

## 하네스 문서 체계 (Harness Engineering)
| 파일 | 역할 | 확인 시점 |
|------|------|----------|
| `CLAUDE.md` | 규칙, 금지사항 (Constrain) | 세션 시작 |
| `progress.md` | 진행상황, 할 일 (Verify) | 작업 전/후 |
| `architecture.md` | 시스템 구조 (Inform) | 작업 시작 전 |

## 부팅 순서
1. `/start` 명령어 또는 세션 시작 시:
   - **progress.md** → 현재 상황 파악
   - **architecture.md** → 시스템 구조 파악
   - **CLAUDE.md** → 규칙 확인
2. 작업 완료 후 **progress.md** 업데이트
3. PowerShell 종료 시 대화 내용 초기화됨
4. 프로젝트 경로: `C:\Users\cyunr\OneDrive\Desktop\바이브코딩`

## AI 도구 사용
- **Claude Code (메인)**: 주 작업 도구 - 코딩, 분석, 문서 작성 등
- **OpenAI Codex CLI (보조)**: 코드 리뷰 요청 시에만 사용 (무료 요금제 - 제한적 사용)
  - 사용법: `codex exec "리뷰 요청 내용"` 또는 `codex review`

## 작업 방식
1. 작업 시작 시 계획과 예상 토큰 사용량을 먼저 알려줄 것
2. 이후 사용자가 제지하기 전까지 권한/확인 묻지 않고 작업 계속 진행
3. 필요한 판단은 스스로 하고 진행

## 데이터 및 출처 규칙
- **확인되지 않은 데이터에 출처를 붙이지 말 것**
- 추정치/가정 수치는 "예시", "추정" 등으로 명시
- 공식 출처(환경부, 통계청 등)를 표기할 경우 반드시 실제 데이터인지 확인 필요
- 불확실한 경우 사용자에게 먼저 확인 요청

## 프로젝트 정보
- React 18 + React Router DOM 6
- CSS 변수는 global.css 참조
- 모바일 우선 디자인 (390px 기준)
- 피그마 MCP 연동됨 (아이콘/폰트 에셋 활용 가능)

## 금융탭 (FinanceScreen) 구조
- **3단 구조**: 계산기 | 카드 | 대출
- **계산기 탭** (Search & Algorithm)
  - 금융소비자보호법 준수: 금리 낮은 순 → 한도 높은 순 정렬
  - 자가평가서 기준 충족 (이해상충 방지)
- **카드/대출 탭** (Curation)
  - 에이핀 포인트 적립순 정렬
  - "AD/제휴" 뱃지로 광고 구분

## 자가평가서 관련
- 파일: `[회사명_서비스명]5_자가평가서점검결과_회사명.pdf`
- 온라인 대출모집법인 이해상충 방지 알고리즘 자가평가서
- 계산기 탭은 법규 준수, 카드/대출 탭은 큐레이션(광고) 영역으로 분리

## 폰트
- Roboto, Noto Sans KR (기본)
- Outfit (숫자)
- Righteous (영문 강조)

## 디자인 컬러 (블루톤 통일)
- Primary: #1a2e71 (네이비)
- Secondary: #2d4a8c (블루)
- Gradient: `linear-gradient(135deg, #1a2e71 0%, #2d4a8c 100%)`
- Background: #f7f8fa
- Card: #ffffff

## 배포
- **Production URL**: https://fintechprototype.vercel.app
- **Git Repository**: https://github.com/Seain17/fintech.git
- **배포 명령어**: `npx vercel --prod`

## 주의사항
- Vercel CI에서 ESLint 경고가 에러로 처리됨
- 필요시 `// eslint-disable-next-line` 주석으로 처리
- 모달/오버레이는 `position: absolute`로 모바일 프레임 내 고정
- 버튼 하단 고정 시 부모에 `display: flex; flex-direction: column; height: 100%` 적용

## 모바일 레이아웃 가이드라인

### 중요: position: fixed 사용 금지
- `phone-frame`이 `position: relative` + `overflow: hidden`으로 설정되어 있음
- `position: fixed`는 viewport 기준이므로 phone-frame을 벗어남
- **반드시 `position: absolute`를 사용할 것**

### 고정 버튼 (Bottom Button)
하단 고정 버튼 사용 시:

```css
/* 부모 screen에 position: relative 필수 */
.detail-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;  /* 필수! */
}

/* 하단 버튼은 absolute로 */
.bottom-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  background: #fff;
  z-index: 50;
}
```

### 스크롤 컨텐츠 영역
고정 버튼이 있는 화면의 스크롤 영역:

```css
.scroll-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 100px;  /* 고정 버튼 높이만큼 여백 */
  -webkit-overflow-scrolling: touch;
}
```

### 모달/팝업
모바일 프레임 내에서 표시되어야 하는 모달:

```css
/* 해당 screen 클래스 명시하여 scope 제한 */
.detail-screen .modal {
  position: absolute;  /* fixed 아님! */
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
```

### 헤더 (Sticky Header)
스크롤 시 고정되는 헤더 (sticky는 사용 가능):

```css
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
}
```

### 주요 체크리스트
- [ ] **`position: fixed` 절대 사용 금지** → `position: absolute` 사용
- [ ] 부모 screen에 `position: relative` 추가
- [ ] 고정 버튼 있는 화면은 콘텐츠에 `padding-bottom` 추가
- [ ] 모달은 해당 screen 클래스로 scope 제한

## 보안 주의사항

### axios 사용 금지
- **axios 라이브러리 설치/사용 금지**
- npm 패키지 공급망 공격 이슈 (타이포스쿼팅, 악성코드 주입)
- 일부 버전 SSRF 취약점 발견
- 데이터 유출 및 악성 바이러스 감염 위험

### 대안: 내장 fetch API 사용
```javascript
// fetch로 API 호출 (외부 의존성 없음)
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
const result = await response.json();
```

### npm 패키지 설치 시 주의
- 공식 패키지인지 확인 (다운로드 수, 게시자)
- 유사 이름 패키지 주의 (타이포스쿼팅)
- 외부 의존성 최소화
