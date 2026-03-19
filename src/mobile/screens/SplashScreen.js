import React from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <span className="splash-logo">A</span>
        </div>
        <div className="splash-title">에이핀</div>
        <div className="splash-subtitle">자산을 만드는 새로운 습관</div>
      </div>
      <div className="splash-bottom">
        <img
          src="/images/banners/ad_splash.png"
          alt="광고"
          className="splash-ad-banner"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
