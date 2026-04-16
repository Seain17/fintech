import React from 'react';
import './AppLogo.css';

/**
 * A-Fin 앱 로고 컴포넌트
 * @param {Object} props
 * @param {string} [props.className] - 추가 CSS 클래스
 * @param {string} [props.size] - 로고 크기 ('small' | 'medium' | 'large')
 */
const AppLogo = ({ className = '', size = 'medium' }) => {
  return (
    <div
      className={`app-logo app-logo--${size} ${className}`}
      role="img"
      aria-label="A-Fin 로고"
    >
      <span className="logo-a" aria-hidden="true">A</span>
      <span className="logo-dot" aria-hidden="true">-</span>
      <span className="logo-fin" aria-hidden="true">Fin</span>
    </div>
  );
};

export default AppLogo;
