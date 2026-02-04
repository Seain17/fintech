import React from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin }) => {
  const handleSocialLogin = (provider) => {
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div className="screen login-screen">
      <div className="login-content">
        <div className="login-header">
          <div className="login-logo-wrap">
            <span className="login-logo">A</span>
          </div>
          <h1 className="login-title">에이핀 시작하기</h1>
          <p className="login-subtitle">로그인 후 포인트를 통합 관리하세요</p>
        </div>

        <div className="social-login-section">
          <button className="social-btn kakao" onClick={() => handleSocialLogin('kakao')}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.463 2 10.731c0 2.727 1.818 5.127 4.548 6.5-.148.548-.95 3.534-.982 3.761 0 0-.02.166.088.229.108.063.235.015.235.015.31-.044 3.592-2.34 4.158-2.737.636.092 1.296.14 1.953.14 5.523 0 10-3.463 10-7.731S17.523 3 12 3z" />
            </svg>
            카카오로 시작하기
          </button>

          <button className="social-btn naver" onClick={() => handleSocialLogin('naver')}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
            </svg>
            네이버로 시작하기
          </button>

          <button className="social-btn google" onClick={() => handleSocialLogin('google')}>
            <svg viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google로 시작하기
          </button>

          <button className="social-btn apple" onClick={() => handleSocialLogin('apple')}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Apple로 시작하기
          </button>
        </div>

        <div className="login-divider">또는</div>

        <div className="login-terms">
          계속 진행하시면 에이핀의 <a href="#">서비스 이용약관</a> 및<br />
          <a href="#">개인정보 처리방침</a>에 동의하는 것으로 간주됩니다.
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
