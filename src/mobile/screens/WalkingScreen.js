import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WalkingScreen.css';
import { iPadProBanner } from '../components/AdBanner';
import '../components/AdBanner.css';
import { PinIcon } from '../../shared/components';

const WalkingScreen = ({ userPoints = 26350, updatePoints, showToast }) => {
  const navigate = useNavigate();
  const [currentFin, setCurrentFin] = useState(userPoints);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTimer, setAdTimer] = useState(3);
  // eslint-disable-next-line no-unused-vars
  const [pendingReward, setPendingReward] = useState({ index: null, amount: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const currentSteps = 7240;
  const maxSteps = 10000;

  const [missions, setMissions] = useState([
    { id: 1, title: '1,000보 달성', desc: '탄소 100g 절감 🌱', reward: 10, status: 'done', steps: 1000 },
    { id: 2, title: '3,000보 달성', desc: '탄소 300g 절감 🍃', reward: 30, status: 'locked', steps: 3000 },
    { id: 3, title: '7,000보 달성', desc: '탄소 700g 절감 🌿', reward: 50, status: 'ready', steps: 7000 },
    { id: 4, title: '10,000보 달성', desc: '탄소 1kg 절감 🌳', reward: 50, status: 'upcoming', steps: 10000 },
  ]);

  const getWalkerMessage = () => {
    if (currentSteps >= 10000) return "승용차 7km 주행을 대체했어요!";
    if (currentSteps >= 7000) return "승용차 약 5km 분량, 700g 절감중!";
    if (currentSteps >= 3000) return "승용차 약 2km 분량, 300g 절감중!";
    if (currentSteps >= 1000) return "승용차 700m 분량, 100g 절감!";
    return "가까운 거리는 걸어보는 게 어떨까요?";
  };

  const getCarbonSaved = () => {
    const carbonPerStep = 0.1;
    return Math.round(currentSteps * carbonPerStep);
  };

  const formatCarbonSaved = () => {
    const carbon = getCarbonSaved();
    if (carbon >= 1000) {
      return `${(carbon / 1000).toFixed(1)} kg`;
    }
    return `${carbon} g`;
  };

  const handleRewardClick = (index, amount) => {
    setPendingReward({ index, amount });
    setShowAdModal(true);
    setAdTimer(3);

    const countdown = setInterval(() => {
      setAdTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          completeReward(index, amount);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const completeReward = (index, amount) => {
    setShowAdModal(false);
    setCurrentFin(prev => prev + amount);
    if (updatePoints) updatePoints(amount);

    setMissions(prev => prev.map((m, i) =>
      i === index ? { ...m, status: 'done' } : m
    ));

    if (showToast) showToast(`💰 ${amount} 핀이 적립되었습니다!`);
  };

  const progress = Math.min(currentSteps / maxSteps, 1);

  return (
    <div className="walking-screen">
      {/* 헤더 */}
      <div className="walking-header">
        <button className="walking-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="walking-title">에코 만보기</h1>
        <div className="walking-header-space" />
      </div>

      <div className="walking-scroll">
        {/* 자산 박스 */}
        <div className="walking-asset-section">
          <div className="walking-asset-box">
            <div className="walking-asset-header">
              <img src="/images/icons/icon-eco-01.png" alt="" className="walking-eco-icon" onError={(e) => { e.target.style.display = 'none'; }} />
              <span className="walking-asset-title">쿼카님의 자산</span>
            </div>
            <div className="walking-asset-inner">
            <div className="walking-asset-left">
              <div className="walking-asset-label">나의 에이핀</div>
              <div className="walking-asset-value">
                <PinIcon size="medium" />{currentFin.toLocaleString()}
              </div>
            </div>
            <div className="walking-asset-divider" />
            <div className="walking-asset-right">
              <div className="walking-asset-label">오늘 아낀 탄소 <span className="walking-tooltip-icon" onClick={() => setShowTooltip(v => !v)}>?</span></div>
              <div className="walking-stat-val">{formatCarbonSaved()}</div>
            </div>
            </div>
          </div>
        </div>

        {/* 원형 걸음 수 */}
        <div className="walking-circle-section">
          <div className="walking-circle-outer">
            {/* 링 SVG (z-index 1, inner 뒤) — 퍼플 게이지만 */}
            <svg className="walking-circle-svg walking-circle-ring" viewBox="0 0 200 200">
              <circle
                cx="100" cy="100" r="87"
                fill="none"
                stroke="#7d7dde"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 87}
                strokeDashoffset={2 * Math.PI * 87 * (1 - progress)}
                transform="rotate(-90 100 100)"
              />
            </svg>
            {/* 흰 점 SVG (z-index 3, inner 앞) */}
            <svg className="walking-circle-svg walking-circle-dot" viewBox="0 0 200 200">
              <defs>
                <filter id="dot-shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="2" floodColor="rgba(0,0,0,0.16)" />
                </filter>
              </defs>
              <circle
                cx={100 + 87 * Math.cos((-90 + progress * 360) * Math.PI / 180)}
                cy={100 + 87 * Math.sin((-90 + progress * 360) * Math.PI / 180)}
                r="12.5"
                fill="#fff"
                filter="url(#dot-shadow)"
              />
            </svg>
            <div className="walking-circle-inner">
              <div className="walking-circle-label">오늘 걸음</div>
              <div className="walking-circle-steps">{currentSteps.toLocaleString()}</div>
              <div className="walking-circle-badge">
                <PinIcon size="small" />{missions.filter(m => m.status === 'done').reduce((acc, m) => acc + m.reward, 0)} 적립
              </div>
            </div>
          </div>
          <div className="walking-character-wrap">
            <img
              src="/images/img-sportsman-01.png"
              alt="walker"
              className="walking-sportsman"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="walking-eco-label">오늘의 에코기록</div>
            <div className="walking-eco-message">{getWalkerMessage()}</div>
          </div>
        </div>

        {/* 미션 리스트 */}
        <div className="walking-mission-list">
          {missions.map((mission, index) => (
            <div key={mission.id} className="walking-mission-card">
              <div className="walking-mission-info">
                <div className="walking-mission-title">{mission.title}</div>
                <div className="walking-mission-desc">{mission.desc}</div>
              </div>
              <button
                className={`walking-reward-btn ${mission.status}`}
                onClick={() => mission.status === 'ready' && handleRewardClick(index, mission.reward)}
                disabled={mission.status !== 'ready'}
              >
                {mission.status === 'done' ? '투자완료' :
                 mission.status === 'locked' ? '진행중' :
                 mission.status === 'upcoming' ? <><PinIcon size="small" /><span>{mission.reward}</span></> :
                 <><PinIcon size="small" /><span>{mission.reward}</span></>}
              </button>
            </div>
          ))}
        </div>

        {/* A-Fin 에코 로직 */}
        <div className="walking-logic-footer">
          <div className="walking-logic-title">
            💡 A-Fin 에코 로직
          </div>
          <div className="walking-logic-text">
            단순히 걷는다고 탄소가 사라지는 게 아니에요!<br />
            A-Fin은 쿼카님이 <strong>탄소 배출 활동(운전, 엘리베이터 등)을 걷기로 대체</strong>한 가치를 금융 자산으로 환산해 드립니다.
          </div>
        </div>

        {/* 페이지 하단 배너 */}
        <div className="walking-bottom-banner">
          {iPadProBanner()}
        </div>
      </div>

      {/* 탄소 툴팁 */}
      {showTooltip && (
        <div className="walking-tooltip-overlay" onClick={() => setShowTooltip(false)}>
          <div className="walking-tooltip-box" onClick={e => e.stopPropagation()}>
            <strong>💡 탄소 절감량이란?</strong><br />
            걷기로 승용차 이용을 <strong>'대체'했을 때</strong>의 효과입니다.<br /><br />
            • 승용차 CO₂ 배출량: 약 150g/km<br />
            (출처: 환경부)
          </div>
        </div>
      )}

      {/* 광고 모달 */}
      {showAdModal && (
        <div className="walking-ad-overlay">
          <div className="walking-ad-content">
            <div className="walking-ad-title">A-Fin 광고</div>
            <div className="walking-ad-desc">
              에코 활동 검증 및<br /> 핀(Fin) 적립을 진행합니다.
            </div>
            <div className="walking-ad-timer">{adTimer}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalkingScreen;
