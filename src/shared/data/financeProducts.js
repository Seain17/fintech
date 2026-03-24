/**
 * 금융 상품 Mock 데이터
 * 추후 API 연동 시 이 파일의 데이터를 API 응답으로 대체
 */

// ============================================
// 카드 상품 데이터
// ============================================
export const cardProducts = [
  {
    id: 1,
    name: '신한 Deep Dream 카드',
    company: '신한카드',
    logo: '신한',
    benefit: '모든 가맹점 0.7% 적립',
    benefitPoints: 5000,
    color: '#0046ff',
    category: 'all',
  },
  {
    id: 2,
    name: '삼성 taptap O 카드',
    company: '삼성카드',
    logo: '삼성',
    benefit: '편의점/카페 10% 적립',
    benefitPoints: 15000,
    color: '#1428a0',
    category: 'food',
  },
  {
    id: 3,
    name: '현대 M BOOST 카드',
    company: '현대카드',
    logo: '현대',
    benefit: 'M포인트 최대 3% 적립',
    benefitPoints: 12000,
    color: '#000000',
    category: 'shopping',
  },
  {
    id: 4,
    name: 'KB국민 My WE:SH 카드',
    company: 'KB국민카드',
    logo: 'KB',
    benefit: '쇼핑/배달 5% 할인',
    benefitPoints: 8000,
    color: '#ffb300',
    category: 'shopping',
  },
  {
    id: 5,
    name: '하나 원큐 카드',
    company: '하나카드',
    logo: '하나',
    benefit: '대중교통/통신 10% 할인',
    benefitPoints: 10000,
    color: '#009688',
    category: 'transport',
  },
];

// ============================================
// 대출 상품 데이터
// ============================================
export const loanProducts = [
  {
    id: 1,
    name: '토스 마이너스통장',
    company: '토스뱅크',
    logo: '토스',
    category: 'credit',
    interestRate: 3.5,
    maxInterestRate: 14.9,
    maxLimit: 10000,
    color: '#0064ff',
  },
  {
    id: 2,
    name: 'KB국민 직장인신용대출',
    company: 'KB국민은행',
    logo: 'KB',
    category: 'credit',
    interestRate: 3.5,
    maxInterestRate: 12.5,
    maxLimit: 15000,
    color: '#ffb300',
  },
  {
    id: 3,
    name: '카카오뱅크 비상금대출',
    company: '카카오뱅크',
    logo: '카카오',
    category: 'credit',
    interestRate: 3.69,
    maxInterestRate: 19.9,
    maxLimit: 5000,
    color: '#fee500',
  },
  {
    id: 4,
    name: '하나 원큐신용대출',
    company: '하나은행',
    logo: '하나',
    category: 'credit',
    interestRate: 4.2,
    maxInterestRate: 15.0,
    maxLimit: 20000,
    color: '#009688',
  },
  {
    id: 5,
    name: 'KB국민 주택담보대출',
    company: 'KB국민은행',
    logo: 'KB',
    category: 'mortgage',
    interestRate: 3.2,
    maxInterestRate: 5.5,
    maxLimit: 100000,
    color: '#ffb300',
  },
  {
    id: 6,
    name: '신한 주담대 플러스',
    company: '신한은행',
    logo: '신한',
    category: 'mortgage',
    interestRate: 3.4,
    maxInterestRate: 5.8,
    maxLimit: 80000,
    color: '#0046ff',
  },
  {
    id: 7,
    name: '신한 자동차대출',
    company: '신한은행',
    logo: '신한',
    category: 'car',
    interestRate: 4.5,
    maxInterestRate: 9.9,
    maxLimit: 8000,
    color: '#0046ff',
  },
];

// ============================================
// 보험 상품 데이터
// ============================================
export const insuranceProducts = [
  {
    id: 1,
    name: '삼성생명 건강보험',
    company: '삼성생명',
    logo: '삼성',
    category: 'health',
    monthlyPremium: 35000,
    coverage: '암/뇌/심장 진단금 최대 1억',
    benefitPoints: 20000,
    color: '#1428a0',
  },
  {
    id: 2,
    name: '한화생명 종신보험',
    company: '한화생명',
    logo: '한화',
    category: 'life',
    monthlyPremium: 50000,
    coverage: '사망보험금 최대 3억',
    benefitPoints: 25000,
    color: '#ff6b00',
  },
  {
    id: 3,
    name: '현대해상 운전자보험',
    company: '현대해상',
    logo: '현대',
    category: 'driver',
    monthlyPremium: 15000,
    coverage: '교통사고 벌금/변호사 비용 보장',
    benefitPoints: 12000,
    color: '#00a651',
  },
  {
    id: 4,
    name: 'DB손해보험 실손보험',
    company: 'DB손해보험',
    logo: 'DB',
    category: 'health',
    monthlyPremium: 25000,
    coverage: '실제 의료비 90% 보장',
    benefitPoints: 15000,
    color: '#003d7d',
  },
  {
    id: 5,
    name: '메리츠화재 펫보험',
    company: '메리츠화재',
    logo: '메리츠',
    category: 'pet',
    monthlyPremium: 20000,
    coverage: '반려동물 의료비 70% 보장',
    benefitPoints: 10000,
    color: '#e31837',
  },
];

// ============================================
// 증권 상품 데이터
// ============================================
export const stockProducts = [
  {
    id: 1,
    name: '삼성증권 주식계좌',
    company: '삼성증권',
    logo: '삼성',
    category: 'stock',
    benefit: '국내주식 수수료 0.01%',
    benefitPoints: 30000,
    color: '#1428a0',
  },
  {
    id: 2,
    name: '미래에셋 CMA계좌',
    company: '미래에셋증권',
    logo: '미래',
    category: 'cma',
    benefit: 'CMA 연 3.5% 이자',
    benefitPoints: 25000,
    color: '#ff6b00',
  },
  {
    id: 3,
    name: 'NH투자증권 나무',
    company: 'NH투자증권',
    logo: 'NH',
    category: 'stock',
    benefit: '해외주식 수수료 무료',
    benefitPoints: 20000,
    color: '#00a651',
  },
  {
    id: 4,
    name: '키움증권 영웅문',
    company: '키움증권',
    logo: '키움',
    category: 'stock',
    benefit: '국내주식 수수료 0.015%',
    benefitPoints: 15000,
    color: '#e31837',
  },
  {
    id: 5,
    name: '토스증권 주식계좌',
    company: '토스증권',
    logo: '토스',
    category: 'stock',
    benefit: '소수점 주식 거래 가능',
    benefitPoints: 18000,
    color: '#0064ff',
  },
  {
    id: 6,
    name: 'KB증권 M-able',
    company: 'KB증권',
    logo: 'KB',
    category: 'isa',
    benefit: 'ISA 비과세 혜택',
    benefitPoints: 22000,
    color: '#ffb300',
  },
];

// ============================================
// 카테고리 데이터
// ============================================
export const loanCategories = [
  { id: 'credit', label: '신용대출', icon: '💳' },
  { id: 'mortgage', label: '주택담보', icon: '🏠' },
  { id: 'car', label: '자동차', icon: '🚗' },
];

export const insuranceCategories = [
  { id: 'health', label: '건강/실손', icon: '🏥' },
  { id: 'life', label: '종신/저축', icon: '💰' },
  { id: 'driver', label: '운전자', icon: '🚗' },
  { id: 'pet', label: '펫보험', icon: '🐕' },
];

export const stockCategories = [
  { id: 'stock', label: '주식', icon: '📈' },
  { id: 'cma', label: 'CMA', icon: '💵' },
  { id: 'isa', label: 'ISA', icon: '🏦' },
];
