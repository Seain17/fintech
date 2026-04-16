import { useState, useCallback } from 'react';
import { APP_DEFAULTS } from '../constants';

/**
 * 포인트 관리 훅
 * @param {number} [initialPoints] - 초기 포인트 값
 * @returns {Object} 포인트 상태와 업데이트 함수들
 */
const usePoints = (initialPoints = APP_DEFAULTS.INITIAL_POINTS) => {
  const [points, setPoints] = useState(initialPoints);

  /**
   * 포인트 업데이트 (양수: 적립, 음수: 차감)
   * @param {number} amount - 변경할 포인트 양
   */
  const updatePoints = useCallback((amount) => {
    setPoints(prev => Math.max(0, prev + amount));
  }, []);

  /**
   * 포인트 적립
   * @param {number} amount - 적립할 포인트 양
   */
  const addPoints = useCallback((amount) => {
    if (amount > 0) {
      setPoints(prev => prev + amount);
    }
  }, []);

  /**
   * 포인트 차감
   * @param {number} amount - 차감할 포인트 양
   * @returns {boolean} 차감 성공 여부
   */
  const deductPoints = useCallback((amount) => {
    if (amount <= 0) return false;

    let success = false;
    setPoints(prev => {
      if (prev >= amount) {
        success = true;
        return prev - amount;
      }
      return prev;
    });
    return success;
  }, []);

  /**
   * 포인트 충분 여부 확인
   * @param {number} amount - 필요한 포인트 양
   * @returns {boolean} 충분 여부
   */
  const hasEnoughPoints = useCallback((amount) => {
    return points >= amount;
  }, [points]);

  /**
   * 포인트 리셋
   * @param {number} [value] - 리셋할 값 (기본: 초기값)
   */
  const resetPoints = useCallback((value = initialPoints) => {
    setPoints(value);
  }, [initialPoints]);

  return {
    points,
    updatePoints,
    addPoints,
    deductPoints,
    hasEnoughPoints,
    resetPoints,
  };
};

export default usePoints;
