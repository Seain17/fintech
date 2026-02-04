import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingScreen.css';

const slides = [
  {
    emoji: '💰',
    badge: '숨어있는 내 포인트',
    title: '잠자고 있는 포인트를\n확인해보세요',
    desc: '카드사·통신사·쇼핑몰에 흩어진\n포인트를 한눈에 모아볼 수 있어요.',
    points: '3,500 P',
    pointsSub: '에이핀에서 찾았어요!',
  },
  {
    emoji: '🏦',
    badge: '간편 출금',
    title: '모은 포인트를\n현금으로 출금하세요',
    desc: '1,000P부터 내 계좌로\n바로 출금할 수 있어요.',
    points: '즉시 출금',
    pointsSub: '수수료 없이 내 계좌로',
  },
  {
    emoji: '🎁',
    badge: '다양한 혜택',
    title: '매일 포인트를\n더 모을 수 있어요',
    desc: '출석체크, 퀴즈, 미니게임으로\n매일 포인트가 쌓여요.',
    points: '매일 최대 500P',
    pointsSub: '놓치지 마세요!',
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
              <div className="onboarding-card-points">{slide.points}</div>
              <div className="onboarding-card-sub">{slide.pointsSub}</div>
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
            시작하기
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
