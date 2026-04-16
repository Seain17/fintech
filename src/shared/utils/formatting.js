/**
 * 포맷팅 유틸리티 함수
 * 숫자, 날짜, 금액 등의 표시 형식 통일
 */

/**
 * 숫자를 천 단위 콤마로 포맷팅
 * @param {number} num - 포맷팅할 숫자
 * @returns {string} 포맷팅된 문자열
 * @example formatNumber(12345) => '12,345'
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return num.toLocaleString('ko-KR');
};

/**
 * 포인트 포맷팅 (핀 단위)
 * @param {number} points - 포인트 양
 * @param {boolean} [showUnit=true] - 단위 표시 여부
 * @returns {string} 포맷팅된 포인트 문자열
 * @example formatPoints(12345) => '12,345핀'
 */
export const formatPoints = (points, showUnit = true) => {
  const formatted = formatNumber(points);
  return showUnit ? `${formatted}핀` : formatted;
};

/**
 * 금액 포맷팅 (원화)
 * @param {number} amount - 금액
 * @param {boolean} [showSymbol=true] - 원화 기호 표시 여부
 * @returns {string} 포맷팅된 금액 문자열
 * @example formatCurrency(50000) => '₩ 50,000'
 */
export const formatCurrency = (amount, showSymbol = true) => {
  const formatted = formatNumber(amount);
  return showSymbol ? `₩ ${formatted}` : formatted;
};

/**
 * 금액을 만원 단위로 축약
 * @param {number} amount - 금액 (원 단위)
 * @returns {string} 만원 단위로 축약된 문자열
 * @example formatCurrencyShort(150000000) => '1.5억'
 */
export const formatCurrencyShort = (amount) => {
  if (amount >= 100000000) {
    return `${(amount / 100000000).toFixed(1).replace(/\.0$/, '')}억`;
  }
  if (amount >= 10000) {
    return `${(amount / 10000).toFixed(0)}만`;
  }
  return formatNumber(amount);
};

/**
 * 날짜 포맷팅
 * @param {Date|string} date - Date 객체 또는 날짜 문자열
 * @param {string} [format='YYYY-MM-DD'] - 출력 형식
 * @returns {string} 포맷팅된 날짜 문자열
 * @example formatDate(new Date()) => '2026-01-25'
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d.getTime())) return '';

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * 상대 시간 표시 (몇 분 전, 몇 시간 전 등)
 * @param {Date|string} date - Date 객체 또는 날짜 문자열
 * @returns {string} 상대 시간 문자열
 * @example formatRelativeTime(new Date(Date.now() - 3600000)) => '1시간 전'
 */
export const formatRelativeTime = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  if (days < 30) return `${Math.floor(days / 7)}주 전`;
  if (days < 365) return `${Math.floor(days / 30)}개월 전`;
  return `${Math.floor(days / 365)}년 전`;
};

/**
 * 퍼센트 포맷팅
 * @param {number} value - 값 (0~1 또는 0~100)
 * @param {number} [decimals=1] - 소수점 자릿수
 * @param {boolean} [isRatio=false] - true면 0~1 범위, false면 0~100 범위
 * @returns {string} 포맷팅된 퍼센트 문자열
 * @example formatPercent(0.156, 1, true) => '15.6%'
 */
export const formatPercent = (value, decimals = 1, isRatio = false) => {
  const percent = isRatio ? value * 100 : value;
  return `${percent.toFixed(decimals)}%`;
};

/**
 * 이자율 범위 포맷팅
 * @param {number} minRate - 최저 금리
 * @param {number} maxRate - 최고 금리
 * @returns {string} 포맷팅된 이자율 범위
 * @example formatInterestRange(3.5, 14.9) => '연 3.5% ~ 14.9%'
 */
export const formatInterestRange = (minRate, maxRate) => {
  return `연 ${minRate.toFixed(1)}% ~ ${maxRate.toFixed(1)}%`;
};

/**
 * 전화번호 포맷팅 (하이픈 추가)
 * @param {string} phone - 전화번호 (숫자만)
 * @returns {string} 포맷팅된 전화번호
 * @example formatPhoneNumber('01012345678') => '010-1234-5678'
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};
