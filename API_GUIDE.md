# 공공데이터 API 연동 가이드

## 📋 목차
1. [공공데이터포털 API 신청 방법](#1-공공데이터포털-api-신청-방법)
2. [React 앱에 API 연동하기](#2-react-앱에-api-연동하기)
3. [실전 예제](#3-실전-예제)
4. [자주 사용하는 공공데이터 API](#4-자주-사용하는-공공데이터-api)
5. [트러블슈팅](#5-트러블슈팅)

---

## 1. 공공데이터포털 API 신청 방법

### 1.1 회원가입 및 로그인
1. [공공데이터포털](https://www.data.go.kr) 접속
2. 회원가입 (또는 카카오/네이버 소셜 로그인)
3. 로그인 완료

### 1.2 API 검색 및 신청
1. 메인 페이지 검색창에 원하는 API 검색
   - 예: "한국관광공사_국문 관광정보 서비스", "공공데이터포털_금융위원회_예금은행 목록", "식품의약품안전처_건강기능식품 정보"
2. 원하는 API 클릭
3. **"활용신청"** 버튼 클릭
4. 이용약관 동의 후 신청
5. **승인 대기** (보통 1시간~24시간 소요)

### 1.3 API 키 확인
1. 로그인 후 **마이페이지** → **오픈API** → **개발계정**
2. **일반 인증키(Encoding)** 또는 **일반 인증키(Decoding)** 확인
3. API마다 Encoding/Decoding 중 어떤 키를 사용해야 하는지 상세페이지에서 확인

---

## 2. React 앱에 API 연동하기

### 2.1 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:

```env
# .env
REACT_APP_PUBLIC_API_KEY=your_api_key_here
REACT_APP_API_BASE_URL=http://apis.data.go.kr/B551011/KorService
```

**⚠️ 주의사항:**
- `.env` 파일은 Git에 커밋하지 말 것!
- `.gitignore`에 `.env` 추가

```
# .gitignore
.env
.env.local
```

### 2.2 API 모듈 생성

`src/api/publicData.js` 파일 생성:

```javascript
// src/api/publicData.js

const API_KEY = process.env.REACT_APP_PUBLIC_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * 공공데이터 API 호출 공통 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {object} params - 추가 파라미터
 * @returns {Promise<object>} API 응답 데이터
 */
export const fetchPublicData = async (endpoint, params = {}) => {
  try {
    // URL 파라미터 구성
    const queryParams = new URLSearchParams({
      serviceKey: API_KEY,
      numOfRows: 10,
      pageNo: 1,
      MobileOS: 'ETC',
      MobileApp: 'Anick',
      _type: 'json',
      ...params,
    });

    const url = `${BASE_URL}${endpoint}?${queryParams}`;

    console.log('API 호출:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // API 에러 체크
    if (data.response?.header?.resultCode !== '0000') {
      throw new Error(
        data.response?.header?.resultMsg || 'API 호출 실패'
      );
    }

    return data.response.body;
  } catch (error) {
    console.error('공공데이터 API 호출 실패:', error);
    throw error;
  }
};

/**
 * 관광 정보 조회 (예제)
 */
export const getTouristInfo = async (areaCode, page = 1) => {
  return fetchPublicData('/areaBasedList', {
    areaCode,
    pageNo: page,
    numOfRows: 20,
  });
};

/**
 * 은행 목록 조회 (예제)
 */
export const getBankList = async () => {
  return fetchPublicData('/bankList', {
    numOfRows: 100,
  });
};
```

### 2.3 컴포넌트에서 사용

```javascript
// src/screens/ExampleScreen.js
import React, { useEffect, useState } from 'react';
import { getTouristInfo } from '../api/publicData';

const ExampleScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await getTouristInfo(1); // 서울 지역 코드
        setData(result.items?.item || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div>
      <h1>관광 정보</h1>
      <ul>
        {data.map((item) => (
          <li key={item.contentid}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleScreen;
```

---

## 3. 실전 예제

### 3.1 출금 화면에 실제 은행 목록 API 연동

```javascript
// src/screens/WithdrawDetailScreen.js
import React, { useState, useEffect } from 'react';
import { getBankList } from '../api/publicData';

const WithdrawDetailScreen = ({ userPoints, showToast }) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const result = await getBankList();
        const bankNames = result.items?.item?.map(b => b.bankName) || [];
        setBanks(['은행 선택', ...bankNames]);
      } catch (error) {
        console.error('은행 목록 로드 실패:', error);
        // 실패 시 기본 목록 사용
        setBanks([
          '은행 선택',
          '국민은행',
          '신한은행',
          '우리은행',
          '하나은행',
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadBanks();
  }, []);

  // 나머지 코드...
};
```

### 3.2 쇼핑 적립 화면에 실제 제휴사 정보 API 연동

```javascript
// src/api/publicData.js
export const getPartnerShops = async () => {
  return fetchPublicData('/partnerList', {
    category: 'shopping',
    numOfRows: 50,
  });
};

// src/screens/ShoppingScreen.js
import React, { useEffect, useState } from 'react';
import { getPartnerShops } from '../api/publicData';

const ShoppingScreen = ({ showToast }) => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const loadShops = async () => {
      try {
        const result = await getPartnerShops();
        const shopList = result.items?.item?.map(shop => ({
          id: shop.partnerId,
          name: shop.partnerName,
          icon: shop.iconUrl,
          desc: shop.description,
          reward: `최대 ${shop.rewardRate}% 적립`,
        })) || [];
        setShops(shopList);
      } catch (error) {
        console.error('제휴사 로드 실패:', error);
        // 기본 목록 사용
        setShops(defaultShops);
      }
    };

    loadShops();
  }, []);

  // 나머지 코드...
};
```

### 3.3 포인트 내역에 실제 거래 내역 API 연동

```javascript
// src/api/publicData.js
export const getPointHistory = async (userId, startDate, endDate) => {
  return fetchPublicData('/pointHistory', {
    userId,
    startDate,
    endDate,
    numOfRows: 100,
  });
};

// src/screens/PointHistoryScreen.js
import React, { useEffect, useState } from 'react';
import { getPointHistory } from '../api/publicData';

const PointHistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];

        const result = await getPointHistory(userId, startDate, endDate);
        const history = result.items?.item?.map(item => ({
          id: item.transactionId,
          type: item.transactionType, // 'earn', 'use', 'expire'
          source: item.sourceName,
          amount: item.amount,
          date: item.transactionDate,
          balance: item.balanceAfter,
        })) || [];

        setHistoryData(history);
      } catch (error) {
        console.error('포인트 내역 로드 실패:', error);
      }
    };

    loadHistory();
  }, []);

  // 나머지 코드...
};
```

---

## 4. 자주 사용하는 공공데이터 API

### 4.1 금융/핀테크 관련

#### 금융위원회_예금은행 목록
- **용도**: 출금 화면 은행 선택
- **URL**: `http://apis.data.go.kr/1160100/service/GetBankListService/getBankList`
- **파라미터**: `serviceKey`, `numOfRows`, `pageNo`

#### 한국은행_환율 정보
- **용도**: 외화 포인트 환산
- **URL**: `http://ecos.bok.or.kr/api/StatisticSearch`
- **파라미터**: `serviceKey`, `STAT_CODE`, `ITEM_1`

### 4.2 쇼핑/상품 관련

#### 식품의약품안전처_건강기능식품 정보
- **용도**: 건강식품 쇼핑 적립
- **URL**: `http://apis.data.go.kr/1471000/FoodNtrIrdntInfoService`

#### 공정거래위원회_사업자등록 정보
- **용도**: 제휴사 검증
- **URL**: `http://apis.data.go.kr/1130000/MllBs_1Service`

### 4.3 위치/지역 관련

#### 행정안전부_주소 검색
- **용도**: 배송지 주소 입력
- **URL**: `http://www.juso.go.kr/addrlink/addrLinkApi.do`

---

## 5. 트러블슈팅

### 5.1 CORS 에러 발생 시

**문제**: `Access to fetch has been blocked by CORS policy`

**해결 방법 1**: Proxy 설정

`package.json`에 추가:
```json
{
  "proxy": "http://apis.data.go.kr"
}
```

**해결 방법 2**: 백엔드 프록시 서버 사용

Node.js 간단한 프록시 서버:
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/api/proxy', async (req, res) => {
  try {
    const { url, ...params } = req.query;
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Proxy running on :3001'));
```

React에서 호출:
```javascript
const response = await fetch(
  `http://localhost:3001/api/proxy?url=${encodeURIComponent(apiUrl)}&...params`
);
```

### 5.2 인증키 오류

**문제**: `SERVICE_KEY_IS_NOT_REGISTERED_ERROR`

**원인**:
- 승인 대기 중 (최대 24시간)
- 잘못된 키 사용 (Encoding/Decoding 혼동)

**해결**:
1. 마이페이지에서 승인 상태 확인
2. API 상세페이지에서 Encoding/Decoding 중 어떤 키를 사용해야 하는지 확인
3. 키 복사 시 공백 포함 여부 확인

### 5.3 요청 횟수 제한

**문제**: `LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR`

**원인**: 일일/시간당 트래픽 초과

**해결**:
1. 캐싱 구현
```javascript
// 간단한 메모리 캐시
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5분

export const fetchWithCache = async (key, fetchFn) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
};
```

2. LocalStorage 캐싱
```javascript
export const fetchWithLocalCache = async (key, fetchFn, ttl = 300000) => {
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < ttl) {
      return data;
    }
  }

  const data = await fetchFn();
  localStorage.setItem(
    key,
    JSON.stringify({ data, timestamp: Date.now() })
  );
  return data;
};
```

### 5.4 XML 응답 처리

일부 API는 JSON 대신 XML로 응답합니다.

**해결**: xml2js 라이브러리 사용

```bash
npm install xml2js
```

```javascript
import { parseString } from 'xml2js';

const parseXML = (xmlString) => {
  return new Promise((resolve, reject) => {
    parseString(xmlString, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const fetchXMLData = async (url) => {
  const response = await fetch(url);
  const xmlText = await response.text();
  const jsonData = await parseXML(xmlText);
  return jsonData;
};
```

---

## 📚 참고 자료

- [공공데이터포털](https://www.data.go.kr)
- [Open API 가이드](https://www.data.go.kr/ugs/selectPublicDataUseGuideView.do)
- [React 환경 변수 문서](https://create-react-app.dev/docs/adding-custom-environment-variables/)

---

## 💡 팁

1. **개발 초기에는 Mock 데이터 사용**
   - API 승인 대기 중에도 개발 가능
   - 트래픽 제한 걱정 없음

2. **에러 처리 철저히**
   - API 장애에 대비한 폴백 데이터 준비
   - 사용자에게 친절한 에러 메시지 제공

3. **환경 분리**
   - `.env.development` - 개발용
   - `.env.production` - 배포용

4. **로깅 구현**
   - API 호출 시 로그 남기기
   - 디버깅 시 유용

---

이제 공공데이터 API를 React 앱에 통합할 준비가 완료되었습니다! 🎉
