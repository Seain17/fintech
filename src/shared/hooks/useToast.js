import { useState, useCallback } from 'react';
import { TIMING } from '../constants';

/**
 * Toast 메시지 관리 훅
 * @returns {Object} toast 상태와 showToast 함수
 */
const useToast = () => {
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = useCallback((message, duration = TIMING.TOAST_DURATION) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    setToast({ show: false, message: '' });
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
};

export default useToast;
