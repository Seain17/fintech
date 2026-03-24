import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WalkingScreen.css';
import { iPadProBanner } from '../components/AdBanner';
import '../components/AdBanner.css';

const WalkingScreen = ({ userPoints = 26350, updatePoints, showToast }) => {
  const navigate = useNavigate();
  const [currentFin, setCurrentFin] = useState(userPoints);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTimer, setAdTimer] = useState(3);
  // eslint-disable-next-line no-unused-vars
  const [pendingReward, setPendingReward] = useState({ index: null, amount: 0 });

  const currentSteps = 7240;

  const [missions, setMissions] = useState([
    { id: 1, title: '1,000보 달성', desc: '탄소 100g 절감 🌱', reward: 10, status: 'done', steps: 1000 },
    { id: 2, title: '3,000보 달성', desc: '탄소 300g 절감 🍃', reward: 30, status: 'done', steps: 3000 },
    { id: 3, title: '7,000보 달성', desc: '탄소 700g 절감 🌿', reward: 50, status: 'ready', steps: 7000 },
    { id: 4, title: '10,000보 달성', desc: '탄소 1kg 절감 🌳', reward: 100, status: 'locked', steps: 10000 },
  ]);

  const getWalkerMessage = () => {
    if (currentSteps >= 10000) return "승용차 7km 주행을 대체했어요! 1kg 절감! 🚗💨";
    if (currentSteps >= 7000) return "승용차 약 5km 분량, 700g 절감 중! 🌿";
    if (currentSteps >= 3000) return "승용차 약 2km 분량, 300g 절감 중! 🍃";
    if (currentSteps >= 1000) return "승용차 700m 분량, 100g 절감했어요! 🌱";
    return "가까운 거리는 대중교통 대신 걸어보는 게 어떨까요? 🚶";
  };

  // 현재 걸음 수에 따른 탄소 절감량 계산 (g 단위)
  // 환경부 기준: 승용차 약 150g CO₂/km, 1,000보 ≈ 0.7km → 1,000보당 약 100g
  const getCarbonSaved = () => {
    const carbonPerStep = 0.1; // g per step (환경부 기준)
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

  return (
    <div className="walking-screen">
      {/* 헤더 */}
      <div className="walking-header">
        <button className="walking-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="walking-title">에코만보기</h1>
        <div className="walking-header-space" />
      </div>

      {/* 자산 박스 */}
      <div className="walking-asset-section">
        <h2 className="walking-asset-title">쿼카님의 자산 🌿</h2>
        <div className="walking-asset-box">
          <div className="walking-asset-left">
            <div className="walking-asset-label">현재 보유 자산</div>
            <div className="walking-asset-value">
              {currentFin.toLocaleString()} <span className="walking-asset-unit">핀</span>
            </div>
          </div>
          <div className="walking-asset-right">
            <div className="walking-asset-label">
              오늘 아낀 탄소
              <span className="walking-tooltip-icon">?</span>
            </div>
            <div className="walking-stat-val">{formatCarbonSaved()}</div>
            <div className="walking-tooltip-box">
              <strong>💡 탄소 절감량이란?</strong><br />
              걷기로 승용차 이용을 <strong>'대체'했을 때</strong>의 효과입니다.<br /><br />
              • 승용차 CO₂ 배출량: 약 150g/km<br />
              (출처: 환경부)
            </div>
          </div>
        </div>
      </div>

      {/* 워커 스테이지 */}
      <div className="walking-stage">
        <div className="walking-speech-bubble">{getWalkerMessage()}</div>
        <div className="walking-walker">
          <div className="walking-head" />
          <div className="walking-body" />
          <div className="walking-leg left" />
          <div className="walking-leg right" />
        </div>
        <div className="walking-step-info">
          오늘 <strong>{currentSteps.toLocaleString()}보</strong> 걷는 중
        </div>
      </div>

      {/* 미션 리스트 */}
      <div className="walking-mission-list">
        {missions.map((mission, index) => (
          <div key={mission.id} className="walking-mission-card">
            <div className="walking-mission-info">
              <h3>{mission.title}</h3>
              <p>{mission.desc}</p>
            </div>
            <button
              className={`walking-reward-btn ${mission.status}`}
              onClick={() => mission.status === 'ready' && handleRewardClick(index, mission.reward)}
              disabled={mission.status !== 'ready'}
            >
              {mission.status === 'done' ? '투자완료' :
               mission.status === 'locked' ? '진행중' :
               `${mission.reward} 핀`}
            </button>
          </div>
        ))}

        <div className="walking-logic-footer">
          <span className="walking-logic-title">ℹ️ A-Fin 에코 로직</span>
          단순히 걷는다고 탄소가 사라지는 게 아니에요!<br />
          A-Fin은 쿼카님이 <strong>탄소 배출 활동(운전, 엘리베이터 등)을 걷기로 대체</strong>한 가치를 금융 자산으로 환산해 드립니다.
        </div>

        {/* 페이지 하단 배너 */}
        <div className="walking-bottom-banner">
          {iPadProBanner()}
        </div>
      </div>

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
