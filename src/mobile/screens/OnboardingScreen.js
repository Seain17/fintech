import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingScreen.css';
import { PinIcon, AppLogo } from '../../shared/components';

const slides = [
  {
    image: '/images/icons/img-onboarding-01.png',
    badge: '스마트 자산',
    title: '내 일상에 변화를 만드는\n기분 좋은 금융',
    desc: '매일 쌓이는 핀이 진짜 자산이 됩니다.\n새로운 방식의 금융 혜택을 경험하세요.',
  },
  {
    image: '/images/icons/img-onboarding-02.png',
    badge: '자산 성장',
    title: '작은 습관이 만드는\n큰 자산의 시작',
    desc: '일상 속 작은 행동 하나하나가\n당신의 자산을 키워갑니다.',
  },
  {
    image: '/images/icons/img-onboarding-03.png',
    badge: '새로운 금융',
    title: '누구나 시작할 수 있는\n일상 속 자산 관리',
    desc: '복잡한 금융은 잊으세요.\n에이핀이 쉽고 똑똑한 방법을 알려드릴게요.',
  },
];

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');

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
      <div className="onboarding-content">

        {/* 로고 */}
        <div className="onboarding-logo-area">
          <AppLogo size="medium" />
        </div>

        {/* 슬라이드: 카드 (아이콘 + 배지 + 제목 + 내용) */}
        <div className="onboarding-slide-area">
          <div className={`onboarding-slide onboarding-slide-${direction}`} key={current}>
            <div className="onboarding-card">
              <img src={slide.image} alt={slide.badge} className="onboarding-card-img" />
              <div className="onboarding-card-badge">{slide.badge}</div>
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
        </div>

        {/* 도트: 카드 바로 아래 */}
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
        <div className="onboarding-bottom">
          <div className="btn-primary-wrap">
            <span className="btn-welcome-badge">
              지금 가입하면 웰컴 <PinIcon size={12} color="#fff" />5,000!
            </span>
            <button className="btn-onboarding-primary" onClick={() => navigate('/signup')}>
              바로 시작하기
            </button>
          </div>
          <button className="btn-secondary" onClick={() => navigate('/login')}>
            이미 계정이 있어요
          </button>
        </div>

      </div>
    </div>
  );
};

export default OnboardingScreen;
