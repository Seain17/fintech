# Claude Code 작업 지침

## 모델 정보
- **사용 모델**: Claude Opus 4.6

## 부팅 순서
1. 새 세션 시작 시 **README.md를 먼저 읽을 것** (서비스 개요, 기능, 구조 파악)
2. PowerShell 종료 시 대화 내용 초기화됨 - 매 세션마다 README.md 참조 필요
3. 프로젝트 경로: `C:\Users\cyunr\OneDrive\Desktop\바이브코딩`

## AI 도구 사용
- **Claude Code (메인)**: 주 작업 도구 - 코딩, 분석, 문서 작성 등
- **OpenAI Codex CLI (보조)**: 코드 리뷰 요청 시에만 사용 (무료 요금제 - 제한적 사용)
  - 사용법: `codex exec "리뷰 요청 내용"` 또는 `codex review`

## 작업 방식
1. 작업 시작 시 계획과 예상 토큰 사용량을 먼저 알려줄 것
2. 이후 사용자가 제지하기 전까지 권한/확인 묻지 않고 작업 계속 진행
3. 필요한 판단은 스스로 하고 진행

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

## 디자인 컬러
- Primary: #1a2e71 (네이비)
- Finance Primary: #8A2BE2 (퍼플)
- Background: #f7f8fa
- Card: #ffffff
- Accent: #e8def8 (라벤더)
