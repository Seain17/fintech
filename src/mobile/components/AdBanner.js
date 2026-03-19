import React from 'react';
import './AdBanner.css';

// iPad Pro 배너 (공통)
export const iPadProBanner = () => (
  <div className="ad-banner ipad-pro">
    <div className="ad-banner-content">
      <div className="ad-banner-logo">iPad Pro</div>
      <div className="ad-banner-text">
        <span className="ad-banner-title">초강력 iPad 라인업</span>
        <span className="ad-banner-desc">어떤 일이든 손쉽게 척척</span>
      </div>
    </div>
    <div className="ad-banner-image">
      <div className="ipad-placeholder">📱</div>
    </div>
  </div>
);

// 삼성화재 배너 (홈, 금융)
export const SamsungFireBanner = () => (
  <div className="ad-banner samsung-fire">
    <div className="ad-banner-content">
      <span className="ad-banner-small">삼성화재 다이렉트 자동차보험으로</span>
      <span className="ad-banner-highlight">확인하고 핀크머니 9천원 받기</span>
    </div>
    <div className="ad-banner-icon">🚗</div>
  </div>
);

// G마켓 배너 (혜택탭 캐러셀용)
export const GmarketBanner = () => (
  <div className="ad-banner gmarket">
    <div className="ad-banner-content">
      <div className="gmarket-logo">Gmarket</div>
      <span className="ad-banner-small">매일매일 새롭게 오픈되는</span>
      <span className="ad-banner-title gmarket-title">G마켓</span>
      <span className="ad-banner-highlight">오늘의 <strong>초강력 DEAL!</strong></span>
    </div>
  </div>
);

export default { iPadProBanner, SamsungFireBanner, GmarketBanner };
