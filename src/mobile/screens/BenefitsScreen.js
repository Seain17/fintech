import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BenefitsScreen.css';

const tabs = [
  { id: 'raffle', label: '래플', icon: '🎰' },
  { id: 'mission', label: '미션', icon: '📅' },
  { id: 'game', label: '게임', icon: '🎮' },
  { id: 'shopping', label: '쇼핑', icon: '🛒' },
  { id: 'offerwall', label: '오퍼월', icon: '🎁' },
];

const BenefitsScreen = ({ showToast, updatePoints }) => {
  const navigate = useNavigate();

  // Refs for each section
  const raffleRef = useRef(null);
  const missionRef = useRef(null);
  const gameRef = useRef(null);
  const shoppingRef = useRef(null);
  const offerwallRef = useRef(null);

  // Tab drag scroll
  const tabsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const hasMoved = useRef(false);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    hasMoved.current = false;
    setStartX(e.touches[0].pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      hasMoved.current = true;
    }
    tabsRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    hasMoved.current = false;
    setStartX(e.pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      hasMoved.current = true;
    }
    tabsRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTabClick = (tabId) => {
    if (hasMoved.current) return;

    const refMap = {
      raffle: raffleRef,
      mission: missionRef,
      game: gameRef,
      shopping: shoppingRef,
      offerwall: offerwallRef,
    };

    const targetRef = refMap[tabId];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAttendance = () => {
    showToast('출석체크 완료! +50P');
    updatePoints(50);
  };

  const handlePedometer = () => {
    showToast('만보기 포인트 적립! +100P');
    updatePoints(100);
  };

  return (
    <div className="screen benefits-screen">
      <div className="benefits-header">
        <h1 className="page-title">혜택</h1>
        <div
          className={`benefits-tabs ${isDragging ? 'dragging' : ''}`}
          ref={tabsRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="benefits-tab"
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="benefits-content">
        <div className="benefits-scroll-content">
          {/* 래플 이벤트 */}
          <div className="section" ref={raffleRef}>
            <div className="section-header">
              <h2 className="section-title">🎰 래플 이벤트</h2>
            </div>
            <div className="raffle-list-vertical">
              <div className="raffle-list-item" onClick={() => navigate('/raffle/1')}>
                <div className="raffle-item-image" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <div className="raffle-item-icon">🎧</div>
                </div>
                <div className="raffle-item-content">
                  <div className="raffle-item-badge hot">🔥 D-2</div>
                  <div className="raffle-item-name">애플 에어팟 프로 2</div>
                  <div className="raffle-item-info">
                    <span className="raffle-item-participants">234명 참여중</span>
                    <span className="raffle-item-separator">·</span>
                    <span className="raffle-item-cost">응모권 1장</span>
                  </div>
                </div>
              </div>
              <div className="raffle-list-item" onClick={() => navigate('/raffle/2')}>
                <div className="raffle-item-image" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  <div className="raffle-item-icon">📱</div>
                </div>
                <div className="raffle-item-content">
                  <div className="raffle-item-badge new">🆕 D-5</div>
                  <div className="raffle-item-name">아이폰 15 Pro Max</div>
                  <div className="raffle-item-info">
                    <span className="raffle-item-participants">1,892명 참여중</span>
                    <span className="raffle-item-separator">·</span>
                    <span className="raffle-item-cost">응모권 1장</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 데일리 미션 */}
          <div className="section" ref={missionRef}>
            <div className="section-header">
              <h2 className="section-title">📅 데일리 미션</h2>
            </div>
            <div className="attendance-banner" onClick={handleAttendance}>
              <div className="attendance-icon">📅</div>
              <div className="attendance-info">
                <div className="attendance-title">오늘의 출석체크</div>
                <div className="attendance-desc">매일 출석하고 50P 받기!</div>
              </div>
              <div className="attendance-arrow">›</div>
            </div>
            <div className="mission-card pedometer-card" onClick={handlePedometer}>
              <div className="mission-icon">👟</div>
              <div className="mission-content">
                <div className="mission-title">만보 걷기</div>
                <div className="mission-desc">10,000보 달성 시 100P</div>
                <div className="mission-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
                  </div>
                  <div className="progress-text">6,500 / 10,000보</div>
                </div>
              </div>
            </div>
            <div className="mission-card quiz-card" onClick={() => navigate('/quiz')}>
              <div className="mission-icon">💡</div>
              <div className="mission-content">
                <div className="mission-title">금융 퀴즈 풀기</div>
                <div className="mission-desc">3문제 풀고 최대 300P 획득!</div>
                <div className="mission-reward-badge">+100P / 문제당</div>
              </div>
            </div>
          </div>

          {/* 포인트 게임 */}
          <div className="section" ref={gameRef}>
            <div className="section-header">
              <h2 className="section-title">🎮 포인트 게임</h2>
            </div>
            <div className="benefit-list-vertical">
              <div className="benefit-list-item" onClick={() => navigate('/game/roulette')}>
                <div className="benefit-item-icon">🎡</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">룰렛 돌리기</div>
                  <div className="benefit-item-desc">최대 1,000P 획득!</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/game/card')}>
                <div className="benefit-item-icon">🃏</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">카드 뒤집기</div>
                  <div className="benefit-item-desc">행운의 카드를 찾아라!</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => showToast('준비중입니다')}>
                <div className="benefit-item-icon">🎰</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">슬롯머신</div>
                  <div className="benefit-item-desc">잭팟 도전!</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
            </div>
          </div>

          {/* 쇼핑 적립 */}
          <div className="section" ref={shoppingRef}>
            <div className="section-header">
              <h2 className="section-title">🛒 쇼핑 적립</h2>
            </div>
            <div className="benefit-list-vertical">
              <div className="benefit-list-item" onClick={() => navigate('/shopping/coupang')}>
                <div className="benefit-item-icon coupang">쿠팡</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">쿠팡</div>
                  <div className="benefit-item-desc">최대 2% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/shopping/elevenst')}>
                <div className="benefit-item-icon eleven">11</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">11번가</div>
                  <div className="benefit-item-desc">최대 1.5% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/shopping/gmarket')}>
                <div className="benefit-item-icon gmarket">G</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">G마켓</div>
                  <div className="benefit-item-desc">최대 1.2% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/shopping/auction')}>
                <div className="benefit-item-icon auction">옥션</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">옥션</div>
                  <div className="benefit-item-desc">최대 1.2% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
            </div>
          </div>

          {/* 오퍼월 */}
          <div className="section" ref={offerwallRef}>
            <div className="section-header">
              <h2 className="section-title">🎁 오퍼월</h2>
            </div>
            <div className="benefit-list-vertical">
              <div className="benefit-list-item" onClick={() => showToast('광고 시청 완료! +500P')}>
                <div className="benefit-item-icon">📺</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">영상 시청하기</div>
                  <div className="benefit-item-desc">+500P</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => showToast('앱 설치 완료! +1000P')}>
                <div className="benefit-item-icon">📱</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">앱 설치하기</div>
                  <div className="benefit-item-desc">+1,000P</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => showToast('설문조사 완료! +300P')}>
                <div className="benefit-item-icon">📝</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">설문조사 참여</div>
                  <div className="benefit-item-desc">+300P</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsScreen;
