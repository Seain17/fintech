# 에이핀 (APIN) - 통합 포인트 핀테크 앱

React 기반의 모바일 포인트 통합 관리 플랫폼 프로토타입입니다.

## 📌 서비스 개요

### 서비스 컨셉
- **타겟**: 흩어진 포인트를 통합 관리하고 싶은 사용자
- **핵심 가치**: 다양한 제휴사 포인트를 "에이핀"으로 통합 → 현금 출금 가능
- **수익 모델**: 쇼핑 경유 수수료, 광고(오퍼월), 금융상품 제휴

### 주요 기능 요약
| 기능 | 설명 |
|------|------|
| 포인트 통합 | 네이버페이, 카카오페이, 토스 등 제휴 포인트 → 에이핀 전환 |
| 포인트 적립 | 출석체크, 만보기, 퀴즈, 게임, 쇼핑 경유, 래플 응모 |
| 현금 출금 | 에이핀 → 계좌 입금 (5만원 초과 시 22% 제세공과금) |
| 금융 혜택 | 카드/보험/대출 추천 (예정) |

### 앱 구성
- **모바일 앱** (`/`): 유저용 - 22개+ 화면
- **어드민** (`/admin`): 운영자용 - 대시보드, 회원/출금/혜택 관리 등 8개 페이지

### 배포 정보
- **플랫폼**: Vercel
- **Git**: 버전 관리 연동

## 🎯 주요 기능

### 📱 완성된 화면 (19개)

#### 기본 화면
- ✅ **스플래시** - 앱 로딩 화면
- ✅ **온보딩** - 앱 소개 및 시작 화면
- ✅ **로그인** - 소셜 로그인 (카카오/네이버/구글/애플)
- ✅ **홈** - 포인트 현황, 퀵메뉴, 이벤트 배너
- ✅ **미션** - 데일리 미션 화면
- ✅ **쇼핑 적립** - 제휴 쇼핑몰 목록
- ✅ **혜택** - 래플/오퍼월 이벤트
- ✅ **금융** - 대출 비교/카드/대출 추천 (3단 구조)
- ✅ **마이페이지** - 프로필, 포인트 관리

#### 상세 화면 (요청 사항 모두 구현 완료 ✨)
- ✅ **출금 신청 상세**
  - 은행 선택 드롭다운
  - 계좌번호 입력
  - 예금주 확인
  - 💡 5만원 초과 시 주민번호 입력 (세금 신고용)
  - 💡 제세공과금 22% 자동 계산
  - 실 수령액 계산 표시

- ✅ **포인트 이용 내역**
  - 적립/사용/소멸 탭 필터
  - 날짜별 필터 (전체/1주일/1개월/3개월)
  - 적립처 구분 표시 (컬러 배지)
  - 잔액 표시

- ✅ **래플 상세 정보**
  - 상품 상세 이미지
  - 응모 기간, 당첨자 발표일 표시
  - [응모하기] 버튼 클릭 시 포인트 차감 팝업
  - 유의사항 명시

- ✅ **쇼핑 경유 브릿지 페이지**
  - "쿠팡으로 이동 중입니다..." 화면
  - 카운트다운 애니메이션
  - 💡 유의사항 명시 (적립 제외 대상, 취소/반품 정책)

- ✅ **설정**
  - 마케팅 수신 동의 (Push/SMS/Email) ON/OFF 토글
  - 💡 회원 탈퇴 시 유의사항 (포인트 소멸) 안내 팝업

- ✅ **게임 플레이 화면**
  - 🎰 룰렛 게임 (실제 회전 애니메이션)
  - 🃏 카드 뒤집기 게임 (플립 애니메이션)

- ✅ **금융 탭** (자가평가서 기준 구현)
  - 📱 3단 구조: 계산기 | 카드 | 대출
  - 🔍 **계산기 탭** (Search & Algorithm)
    - 금융소비자보호법 준수 정렬 (금리 낮은 순 → 한도 높은 순)
    - 대출 카테고리 선택 (신용대출/주택담보/자동차)
    - 금리 범위, 대출 한도 필터 기능
    - 수수료로 인한 검색 왜곡 없음
  - 💳 **카드 탭** (Curation)
    - 에이핀 포인트 적립순 정렬
    - 카테고리 필터 (전체/쇼핑/외식/교통)
    - "제휴" 뱃지로 광고 구분
  - 💰 **대출 탭** (Curation)
    - 포인트순/금리순 정렬 전환
    - "AD" 뱃지로 광고 구분

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
cd "C:\Users\cyunr\OneDrive\Desktop\바이브코딩"
npm install
```

### 2. 개발 서버 실행
```bash
npm start
```

브라우저가 자동으로 열리며 `http://localhost:3000` 에서 앱을 확인할 수 있습니다.

### 3. 빌드 (배포용)
```bash
npm run build
```

빌드된 파일은 `build/` 폴더에 생성됩니다.

## 📂 프로젝트 구조

```
바이브코딩/
├── package.json              # 프로젝트 설정 및 의존성
├── public/
│   └── index.html           # HTML 엔트리 포인트
└── src/
    ├── index.js             # React 앱 엔트리
    ├── App.js               # 메인 앱 컴포넌트 (라우팅, 상태 관리)
    ├── styles/
    │   └── global.css       # 전역 스타일 (변수, 공통 스타일)
    ├── components/
    │   ├── BottomNav.js     # 하단 네비게이션 바
    │   └── Toast.js         # 토스트 알림
    └── screens/             # 모든 화면 컴포넌트
        ├── SplashScreen.js
        ├── OnboardingScreen.js
        ├── LoginScreen.js
        ├── HomeScreen.js
        ├── MissionScreen.js
        ├── ShoppingScreen.js
        ├── BenefitsScreen.js
        ├── MypageScreen.js
        ├── WithdrawDetailScreen.js      # 출금 상세
        ├── PointHistoryScreen.js        # 포인트 내역
        ├── RaffleDetailScreen.js        # 래플 상세
        ├── ShoppingBridgeScreen.js      # 쇼핑 경유
        ├── SettingsScreen.js            # 설정
        └── GamePlayScreen.js            # 게임 플레이
```

## 🎨 기술 스택

- **React 18.2** - UI 라이브러리
- **React Router DOM 6.20** - 라우팅
- **CSS3** - 스타일링 (CSS 변수, 그라디언트, 애니메이션)
- **Google Fonts** - Noto Sans KR, Outfit

## 💡 주요 구현 사항

### 상태 관리
- App.js에서 전역 상태 관리
  - `userPoints` - 사용자 포인트
  - `isLoggedIn` - 로그인 상태
  - `showToast` - 알림 표시 함수
  - `updatePoints` - 포인트 업데이트 함수

### 라우팅 구조
- **비로그인 상태**: 온보딩 → 로그인
- **로그인 상태**: 모든 화면 접근 가능
- **하단 네비게이션**: 홈/미션/쇼핑/혜택/마이

### 애니메이션
- 룰렛 회전 (4초 ease-out)
- 카드 플립 (0.5초)
- 모달 팝업 (scale + opacity)
- 토스트 슬라이드업

### 폼 유효성 검사
- 출금 신청: 은행, 계좌번호, 예금주, 금액, 주민번호(5만원 초과 시)
- 실시간 에러 메시지 표시
- 제세공과금 자동 계산 (22%)

## 🔌 공공데이터 API 연동 방법

### 1. API 키 발급
공공데이터포털(https://www.data.go.kr)에서 원하는 API 신청

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일 생성:
```env
REACT_APP_API_KEY=your_api_key_here
REACT_APP_API_URL=https://api.example.go.kr
```

### 3. API 호출 예제
```javascript
// src/api/publicData.js
export const fetchPublicData = async () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = process.env.REACT_APP_API_URL;

  try {
    const response = await fetch(
      `${API_URL}/endpoint?serviceKey=${API_KEY}&numOfRows=10`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    return null;
  }
};
```

### 4. 컴포넌트에서 사용
```javascript
import { useEffect, useState } from 'react';
import { fetchPublicData } from '../api/publicData';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchPublicData();
      setData(result);
    };
    loadData();
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

### 5. CORS 이슈 해결
개발 환경에서 CORS 문제 발생 시 `package.json`에 proxy 추가:
```json
{
  "proxy": "https://api.example.go.kr"
}
```

또는 `src/setupProxy.js` 생성:
```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.example.go.kr',
      changeOrigin: true,
    })
  );
};
```

## 📱 화면별 기능 상세

### 출금 신청 (`/withdraw`)
- 최소 출금 금액: 5,000원
- 환율: 10P = 1원
- 5만원 초과 시 자동으로 주민번호 입력 폼 표시
- 제세공과금 22% 자동 차감
- 매주 수요일 일괄 입금 안내

### 포인트 내역 (`/point-history`)
- 필터: 전체/적립/사용/소멸
- 날짜 필터: 전체/1주일/1개월/3개월
- 각 항목에 적립처, 날짜, 금액, 잔액 표시

### 래플 응모 (`/raffle/:id`)
- 상품 이미지, 설명
- 응모 기간, 발표일
- 응모 시 포인트 차감 확인 팝업
- 유의사항 (취소 불가, 중복 응모 등)

### 쇼핑 경유 (`/shopping/bridge/:shopId`)
- 3초 카운트다운
- 자동으로 외부 쇼핑몰 링크 오픈
- 적립 유의사항 표시

### 게임 (`/game/:gameType`)
- `roulette`: 룰렛 게임 (8개 섹션, 5P~100P)
- `card`: 카드 뒤집기 (6장, 랜덤 보상)

## 🎯 Mock 데이터

현재 API 연동 없이 하드코딩된 Mock 데이터 사용 중:
- 사용자 포인트: 26,350P
- 포인트 내역: 10개 샘플 데이터
- 래플 상품: 에어팟 프로 2
- 쇼핑몰: 쿠팡/네이버/11번가

## 🔧 커스터마이징

### 색상 변경
`src/styles/global.css`의 CSS 변수 수정:
```css
:root {
  --primary: #3182F6;        /* 메인 컬러 */
  --accent: #FF6B35;         /* 강조 컬러 */
  --success: #20C997;        /* 성공 (적립) */
  --error: #FF5252;          /* 에러 (소멸) */
}
```

### 포인트 초기값 변경
`src/App.js`:
```javascript
const [userPoints, setUserPoints] = useState(26350); // 원하는 값으로 변경
```

## ⚖️ 금융 자가평가서 준수 현황

온라인 대출모집법인 이해상충 방지를 위한 알고리즘 자가평가서 기준 충족:

| 구분 | 평가 항목 | 충족 여부 |
|------|----------|----------|
| 1. 일반 | 대출 종류 명확 구분 (신용/담보/자동차) | ✅ |
| 1. 일반 | 정보 수집·이용·제공 동의 절차 | 📋 예정 |
| 1. 일반 | 금융소비자에 유리한 조건 순 배열 | ✅ |
| 2. 선택가능성 | 이자율/한도 등 조건 선택 검색 | ✅ |
| 2. 선택가능성 | 수수료로 인한 검색 왜곡 없음 | ✅ |
| 3. 배열기준 | 금리 낮은 상품 상단 배치 | ✅ |
| 4. 광고금지 | 관련 없는 광고 금지 | ✅ (탭 분리) |

### 구현 방식
- **계산기 탭**: 법규 준수 영역 (Search & Algorithm)
  - 순수 금리 기준 정렬, 수수료 미반영
- **카드/대출 탭**: 큐레이션 영역 (광고)
  - "AD/제휴" 뱃지로 광고 명시

## 📝 TODO (향후 개선 사항)

- [ ] 실제 백엔드 API 연동
- [ ] 사용자 인증 (JWT)
- [ ] 포인트 내역 페이지네이션
- [ ] 이미지 업로드 (프로필, 신분증)
- [ ] 푸시 알림 연동
- [ ] 출석체크 캘린더
- [ ] 미션 상세 화면 구현
- [ ] 오퍼월 통합 (애드게이트, 모비온 등)
- [ ] 금융 정보 수집·이용·제공 동의 모달 구현
- [ ] 실제 금융상품 API 연동 (금융결제원 등)

## 🐛 알려진 이슈

- Windows 경로 이슈: 현재 절대 경로 사용 중, 상대 경로로 변경 필요
- 일부 화면(MissionScreen)은 기본 구조만 구현됨
- 실제 API 없이 Mock 데이터 사용

## 📄 라이선스

프로토타입 프로젝트 - 개인/교육 목적 사용

## 👨‍💻 개발자

바이브코딩 프로젝트팀

---

## 🎉 완성!

요청하신 모든 상세 페이지가 구현되었습니다:
- ✅ 출금 (은행, 계좌, 주민번호, 세금 계산)
- ✅ 포인트 내역 (필터링)
- ✅ 래플 (응모 팝업)
- ✅ 쇼핑 경유 (유의사항)
- ✅ 설정 (알림, 회원탈퇴)
- ✅ 게임 (룰렛, 카드)

이제 `npm install` → `npm start` 하시면 앱이 실행됩니다! 🚀
