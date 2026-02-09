import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WalkingScreen.css';

const WalkingScreen = ({ userPoints = 26350, updatePoints, showToast }) => {
  const navigate = useNavigate();
  const [currentFin, setCurrentFin] = useState(userPoints);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTimer, setAdTimer] = useState(3);
  // eslint-disable-next-line no-unused-vars
  const [pendingReward, setPendingReward] = useState({ index: null, amount: 0 });

  const currentSteps = 7240;

  const [missions, setMissions] = useState([
    { id: 1, title: '3,000보 (플러그 뽑기)', desc: '대기전력 대신 걷기 ⚡️', reward: 30, status: 'done', steps: 3000 },
    { id: 2, title: '7,000보 (텀블러)', desc: '일회용컵 대신 텀블러 🥤', reward: 50, status: 'ready', steps: 7000 },
    { id: 3, title: '10,000보 (승용차)', desc: '운전 대신 걷기 🚗✖️', reward: 100, status: 'locked', steps: 10000 },
  ]);

  const getWalkerMessage = () => {
    if (currentSteps >= 10000) return "오늘 하루 차를 안 탔어요! 대단해요 🚗💨";
    if (currentSteps >= 7000) return "일회용 컵 대신 텀블러! 🥤";
    if (currentSteps >= 3000) return "TV 보는 대신 산책 중? ⚡️";
    return "엘리베이터 대신 계단 어때요? 🏃‍♂️";
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
        <h1 className="walking-title">만보걷기</h1>
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
            <div className="walking-stat-val">1.4 kg</div>
            <div className="walking-tooltip-box">
              <strong>💡 탄소 절감량이란?</strong><br />
              걷기를 통해 승용차나 엘리베이터 이용을
              <strong> '대체'했을 때</strong> 발생하는 효과를 계산한 수치입니다.
              (출처: 한국환경산업기술원)
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
