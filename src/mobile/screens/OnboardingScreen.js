import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingScreen.css';

const OnboardingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="screen onboarding-screen">
      <div className="onboarding-content">
        <div className="onboarding-visual">
          <div className="onboarding-points-card">
            <div className="onboarding-points-label">숨어있는 내 포인트</div>
            <div className="onboarding-points-value">3,500 P</div>
            <div className="onboarding-points-sub">에이닉에서 찾았어요!</div>
          </div>

          <h1 className="onboarding-title">
            잠자고 있는 포인트를
            <br />
            확인해보세요
          </h1>
          <p className="onboarding-desc">
            제휴사 포인트를 한 곳에 모아
            <br />
            손쉽게 출금하고 사용하세요.
          </p>
        </div>
        <div className="onboarding-actions">
          <button className="btn-primary" onClick={() => navigate('/login')}>
            처음이신가요? (시작하기)
          </button>
          <button className="btn-secondary" onClick={() => navigate('/login')}>
            이미 계정이 있어요
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
