import React from 'react';
import './Loading.css';

/**
 * 로딩 스피너 컴포넌트
 * @param {Object} props
 * @param {string} [props.size] - 스피너 크기 ('small' | 'medium' | 'large')
 * @param {string} [props.message] - 로딩 메시지
 * @param {boolean} [props.fullScreen] - 전체 화면 로딩 여부
 */
const Loading = ({ size = 'medium', message = '', fullScreen = false }) => {
  const content = (
    <div className={`loading loading--${size}`}>
      <div className="loading-spinner">
        <div className="loading-spinner-circle" />
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="loading-fullscreen">{content}</div>;
  }

  return content;
};

/**
 * 페이지 로딩용 컴포넌트 (Suspense fallback용)
 */
export const PageLoading = () => (
  <div className="page-loading">
    <Loading size="large" message="로딩 중..." />
  </div>
);

export default Loading;
