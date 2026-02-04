import React from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="splash-logo-wrap">
        <span className="splash-logo">A</span>
      </div>
      <div className="splash-title">에이핀</div>
      <div className="splash-subtitle">통합 포인트의 새로운 시작</div>
      <div className="splash-loading">
        <div className="splash-loading-bar"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
