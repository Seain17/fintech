/**
 * A-Fin 앱 전역 상수
 * 하드코딩된 값들을 중앙 집중화하여 관리
 */

// ============================================
// 타이밍 관련 상수 (ms)
// ============================================
export const TIMING = {
  TOAST_DURATION: 2500,
  SPLASH_DURATION: 2500,
  AD_MODAL_DELAY: 500,
  ANIMATION_SHORT: 300,
  ANIMATION_MEDIUM: 500,
  ANIMATION_LONG: 2000,
};

// ============================================
// 앱 초기값
// ============================================
export const APP_DEFAULTS = {
  INITIAL_POINTS: 51250,
  INITIAL_UNREAD_COUNT: 3,
  WELCOME_BONUS_POINTS: 1000,
};

// ============================================
// 네비게이션 설정
// ============================================
export const NAVIGATION = {
  // 하단 네비게이션을 숨길 경로
  HIDE_NAV_PATHS: [
    '/withdraw',
    '/withdraw-history',
    '/point-history',
    '/raffle-history',
    '/shopping-history',
    '/quiz',
    '/attendance',
    '/settings',
    '/inquiry',
    '/faq',
    '/notice',
    '/notifications',
    '/walking',
    '/nickname-edit',
    '/exchange',
    '/my-coupons',
  ],
  // 하단 네비게이션을 숨길 경로 프리픽스
  HIDE_NAV_PREFIXES: ['/raffle/', '/shopping/', '/notification/'],
};

// ============================================
// 스토리지 키
// ============================================
export const STORAGE_KEYS = {
  HOME_AD_MODAL_SHOWN: 'homeAdModalShown',
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
};

// ============================================
// 출석 체크 마일스톤
// ============================================
export const ATTENDANCE_MILESTONES = {
  7: { icon: '🎟️', img: '/images/icons/img-ticket-03-off.png', imgOn: '/images/icons/img-ticket-03-on.png', label: '응모권', title: '응모권 획득!' },
  14: { icon: '💰', img: '/images/icons/img-point-03-on.png', label: '3핀', title: '3핀 적립!' },
  21: { icon: '💰', img: '/images/icons/img-point-03-on.png', label: '3핀', title: '3핀 적립!' },
  28: { icon: '💎', img: '/images/icons/img-point-03-on.png', label: '10핀', title: '10핀 적립!' },
};

// ============================================
// 출석 체크 게임 설정
// ============================================
export const ATTENDANCE_CONFIG = {
  MAX_POWER: 6,
};

// ============================================
// 브랜드 컬러
// ============================================
export const BRAND_COLORS = {
  // 카드사/은행 브랜드 컬러
  SHINHAN: '#0046ff',
  SAMSUNG: '#1428a0',
  HYUNDAI: '#000000',
  KB: '#ffb300',
  HANA: '#009688',
  TOSS: '#0064ff',
  KAKAO: '#fee500',
  HANWHA: '#ff6b00',
  HYUNDAI_MARINE: '#00a651',

  // 앱 메인 컬러
  PRIMARY: '#4A90D9',
  SECONDARY: '#FFD700',
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#F44336',
};

// ============================================
// 대출 카테고리
// ============================================
export const LOAN_CATEGORIES = [
  { id: 'credit', label: '신용대출', icon: '💳' },
  { id: 'mortgage', label: '주택담보', icon: '🏠' },
  { id: 'car', label: '자동차', icon: '🚗' },
];

// ============================================
// 보험 카테고리
// ============================================
export const INSURANCE_CATEGORIES = [
  { id: 'health', label: '건강보험', icon: '🏥' },
  { id: 'life', label: '종신보험', icon: '💝' },
  { id: 'driver', label: '운전자보험', icon: '🚗' },
  { id: 'travel', label: '여행자보험', icon: '✈️' },
];

// ============================================
// API 엔드포인트 (추후 백엔드 연동 시 사용)
// ============================================
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || '/api',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/user/profile',
    POINTS: '/user/points',
  },
  PRODUCTS: {
    CARDS: '/products/cards',
    LOANS: '/products/loans',
    INSURANCE: '/products/insurance',
  },
};

// ============================================
// 유효성 검사 규칙
// ============================================
export const VALIDATION = {
  NICKNAME_MIN_LENGTH: 2,
  NICKNAME_MAX_LENGTH: 10,
  PASSWORD_MIN_LENGTH: 8,
  PHONE_PATTERN: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// ============================================
// 페이지네이션
// ============================================
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
};
