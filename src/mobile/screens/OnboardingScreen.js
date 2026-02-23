import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingScreen.css';

const slides = [
  {
    emoji: '💰',
    badge: '스마트 자산',
    title: '내 일상에 변화를 만드는\n기분 좋은 금융',
    desc: '매일 쌓이는 핀이 진짜 자산이 됩니다.\n현금 출금부터 다양한 금융 혜택까지!',
  },
  {
    emoji: '📈',
    badge: '자산 성장',
    title: '작은 습관이 만드는\n큰 자산의 시작',
    desc: '출석, 걷기, 퀴즈 하나하나가\n당신의 자산을 키워갑니다.',
  },
  {
    emoji: '🏦',
    badge: '새로운 금융',
    title: '누구나 시작할 수 있는\n일상 속 자산 관리',
    desc: '복잡한 금융은 잊으세요.\n에이핀이 쉽고 똑똑한 방법을 알려드릴게요.',
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
          <div className="btn-primary-wrap">
            <span className="btn-welcome-badge">지금 가입하면 웰컴 1,000핀!</span>
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              바로 시작하기
            </button>
          </div>
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
