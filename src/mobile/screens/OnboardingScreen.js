import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingScreen.css';

const slides = [
  {
    emoji: '☕️',
    badge: '생활 혜택',
    title: '내 일상에 보탬이 되는\n기분 좋은 금융',
    desc: '차곡차곡 모은 포인트로\n현금 출금부터 기프티콘 교환까지!',
  },
  {
    emoji: '👟',
    badge: '데일리 루틴',
    title: '매일매일 성장하는\n자산 관리 습관',
    desc: '걷기, 퀴즈, 출석체크로 시작하세요.\n건강한 습관이 자산이 됩니다.',
  },
  {
    emoji: '🚀',
    badge: '간편한 시작',
    title: '누구나 쉽게 시작하는\n똑똑한 재테크',
    desc: '복잡한 절차 없이 지금 바로,\n에이핀과 함께 가치를 만들어보세요.',
  },
];

const OnboardingScreen = ({ onGuest }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('next');
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx) => {
    setDirection(idx > current ? 'next' : 'prev');
    setCurrent(idx);
  };

  const slide = slides[current];

  return (
    <div className="screen onboarding-screen">
      {/* 배경 장식 */}
      <div className="onboarding-bg-circle onboarding-bg-circle-1" />
      <div className="onboarding-bg-circle onboarding-bg-circle-2" />

      <div className="onboarding-content">
        {/* 상단 로고 */}
        <div className="onboarding-logo-area">
          <div className="onboarding-logo-box">
            <span className="onboarding-logo">A</span>
          </div>
          <span className="onboarding-logo-text">에이핀</span>
        </div>

        {/* 슬라이드 영역 */}
        <div className="onboarding-slide-area">
          <div className={`onboarding-slide onboarding-slide-${direction}`} key={current}>
            <div className="onboarding-card">
              <div className="onboarding-card-emoji">{slide.emoji}</div>
              <div className="onboarding-card-badge">{slide.badge}</div>
            </div>

            <h1 className="onboarding-title">
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p className="onboarding-desc">
              {slide.desc.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
          </div>
        </div>

        {/* 인디케이터 */}
        <div className="onboarding-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`onboarding-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* 하단 버튼 */}
        <div className="onboarding-actions">
          <button className="btn-primary" onClick={() => navigate('/signup')}>
            바로 시작하기
          </button>
          <button className="btn-secondary" onClick={() => navigate('/login')}>
            이미 계정이 있어요
          </button>
          <button className="btn-guest" onClick={onGuest}>
            둘러볼게요
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
