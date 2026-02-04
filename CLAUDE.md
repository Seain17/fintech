# Project: 에이닉 (Anick) - 핀테크 앱 프로토타입

## 1. 프로젝트 컨텍스트
- **목표:** 금융 서비스 프로토타입의 기획 구체화 및 핵심 기능 구현
- **현재 단계:** MVP (최소 기능 제품) 개발 중
- **작업 환경:** Windows PowerShell (명령어 제안 시 호환성 필수)
- **작업 기본 경로:** `C:\Users\cyunr\OneDrive\Desktop\바이브코딩`
  - 서버 실행, 파일 수정, Git 업데이트 등 모든 작업은 이 경로를 기점으로 진행
- **접속 URL:**
  - 모바일 앱: `http://localhost:3000/`
  - 관리자 페이지: `http://localhost:3000/admin`

## 2. 기술 스택
- **Frontend:** React 18 + React Router DOM 6
- **Build:** Create React App (CRA)
- **Styling:** CSS (모바일: global.css, 관리자: admin.css)

## 3. 프로젝트 구조
```
src/
├── App.js              # 라우팅 (모바일 vs Admin 분기)
├── AdminApp.js         # Admin 앱 진입점
├── mobile/             # 모바일 사용자 앱
│   ├── components/     # BottomNav, Toast
│   ├── screens/        # 각 화면 (Home, Benefits, Finance, Mypage 등)
│   └── styles/         # global.css
├── admin/              # 관리자 페이지
│   ├── components/     # Sidebar, Header, Card, Badge, Button, Table, Tabs, Toggle
│   ├── pages/          # Dashboard, Members, Sales, Stats, Withdrawals, CMS, Benefits, CustomerService
│   ├── layouts/        # AdminLayout
│   └── styles/         # admin.css
└── shared/             # 공유 데이터
    └── data/           # exchangeRate.json
```

## 4. 핵심 규칙 (Rules)

### ⚠️ 작업 전 필수 확인 (중요!)
**모든 작업을 시작하기 전에 반드시:**
1. 무엇을 할 것인지 계획을 먼저 설명
2. 사용자 확인을 받은 후 진행
3. 확인 없이 코드 수정 금지

- **PM/기획 관점:** 단순 코드 구현을 넘어, '비즈니스 로직(예: 송금 프로세스, 데이터 흐름)'의 타당성을 함께 체크할 것.
- **데이터 정확성:** 핀테크 앱 특성상 숫자(금액) 처리와 데이터 무결성을 최우선으로 고려.
- **코드 스타일:** 프로토타입이므로 과도한 추상화보다는 직관적이고 수정이 쉬운 구조 선호.
- **PowerShell 호환:** 리눅스(Bash) 전용 명령어(예: `export`, `&&`) 대신 PowerShell 호환 명령어 제안 (예: `$env:`, `;`).

### 작업 범위 구분 (중요!)
사용자가 언급하는 키워드에 따라 수정 대상이 다름:

| 키워드 | 대상 파일 |
|--------|-----------|
| **"앱"** | `src/mobile/` 폴더 (프로토타입 모바일 앱) |
| **"어드민"** | `src/admin/` 폴더 (관리자 페이지) |
| **"사과나무"** | `apple_game_sample.html` (사과 흔들기 게임) |

- 각 키워드 언급 시 해당 파일만 수정할 것
- 다른 영역에 영향 주지 않도록 주의

## 5. 기능 정의 (없는 기능 주의)
### ❌ 없는 기능 (구현하지 않음)
- 친구 초대 기능

### ✅ 있는 기능
- **포인트 관리:** 출금 신청, 출금 내역, 포인트 내역, 계좌 관리
- **혜택:** 래플 내역 (응모+당첨 통합), 쇼핑적립 내역, 제휴 혜택
- **고객지원:** 1:1 문의, FAQ, 공지사항
- **설정:** 앱 설정, 알림 설정, 이용약관, 개인정보처리방침
- **제휴 포인트:** 하나페이, 신한카드, 페이북 등 제휴사 포인트 전환

## 6. Git 업로드 규칙

### fintech 리포지토리 대상
| 대상 | Push/Commit |
|------|-------------|
| **앱** (src/mobile/) | ✅ 허용 |
| **어드민** (src/admin/) | ✅ 허용 |
| **사과나무** (apple_game_sample.html) | ❌ 제외 |

- Git push/commit 요청 시 앱, 어드민 관련 파일만 fintech 리포지토리에 업로드
- 사과나무 게임 파일은 별도 관리 (fintech 리포지토리에 포함하지 않음)

## 7. 커뮤니케이션 설정
- **형식:** 인삿말 등 불필요한 서론 생략, 즉시 본론/코드 제시.
- **설명:** 코드를 제안할 때는 "어느 파일"의 "어디 부분"을 고쳐야 하는지 명확히 명시.
- **언어:** 한국어 진행.
