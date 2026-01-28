import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BenefitsScreen.css';

const tabs = [
  { id: 'all', label: '전체', icon: '✨' },
  { id: 'raffle', label: '래플', icon: '🎰' },
  { id: 'mission', label: '미션', icon: '📅' },
  { id: 'quiz', label: '퀴즈', icon: '💡' },
  { id: 'game', label: '게임', icon: '🎮' },
  { id: 'shopping', label: '쇼핑', icon: '🛒' },
  { id: 'offerwall', label: '오퍼월', icon: '🎁' },
];

const BenefitsScreen = ({ showToast, updatePoints }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const handleAttendance = () => {
    showToast('출석체크 완료! +50P');
    updatePoints(50);
  };

  const handlePedometer = () => {
    showToast('만보기 포인트 적립! +100P');
    updatePoints(100);
  };

  const handleQuiz = (answer) => {
    if (answer === 'correct') {
      showToast('정답! +30P 획득');
      updatePoints(30);
    } else {
      showToast('아쉽게도 오답입니다');
    }
  };

  const renderRaffle = () => (
    <div className="section">
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
  );

  const renderMission = () => (
    <div className="section">
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
    </div>
  );

  const renderQuiz = () => (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">💡 금융 퀴즈</h2>
      </div>
      <div className="quiz-list">
        <div className="quiz-card">
          <div className="quiz-question">원금에 이자를 더한 금액에, 다시 이자가 붙는 방식은?</div>
          <div className="quiz-options">
            <button className="quiz-btn" onClick={() => handleQuiz('correct')}>복리</button>
            <button className="quiz-btn" onClick={() => handleQuiz('wrong')}>단리</button>
            <button className="quiz-btn" onClick={() => handleQuiz('wrong')}>고정금리</button>
          </div>
          <div className="quiz-reward">+100P</div>
        </div>
        <div className="quiz-card">
          <div className="quiz-question">예금자 보호 한도는?</div>
          <div className="quiz-options">
            <button className="quiz-btn" onClick={() => handleQuiz('wrong')}>3천만원</button>
            <button className="quiz-btn" onClick={() => handleQuiz('correct')}>5천만원</button>
            <button className="quiz-btn" onClick={() => handleQuiz('wrong')}>1억원</button>
          </div>
          <div className="quiz-reward">+100P</div>
        </div>
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="section">
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
  );

  const renderShopping = () => (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">🛒 쇼핑 적립</h2>
      </div>
      <div className="benefit-list-vertical">
        <div className="benefit-list-item" onClick={() => navigate('/shopping/bridge/coupang')}>
          <div className="benefit-item-icon coupang">쿠팡</div>
          <div className="benefit-item-content">
            <div className="benefit-item-title">쿠팡</div>
            <div className="benefit-item-desc">최대 3% 적립</div>
          </div>
          <div className="benefit-item-arrow">›</div>
        </div>
        <div className="benefit-list-item" onClick={() => navigate('/shopping/bridge/naver')}>
          <div className="benefit-item-icon naver">N</div>
          <div className="benefit-item-content">
            <div className="benefit-item-title">네이버 쇼핑</div>
            <div className="benefit-item-desc">최대 2% 적립</div>
          </div>
          <div className="benefit-item-arrow">›</div>
        </div>
        <div className="benefit-list-item" onClick={() => navigate('/shopping/bridge/11st')}>
          <div className="benefit-item-icon eleven">11</div>
          <div className="benefit-item-content">
            <div className="benefit-item-title">11번가</div>
            <div className="benefit-item-desc">최대 4% 적립</div>
          </div>
          <div className="benefit-item-arrow">›</div>
        </div>
      </div>
    </div>
  );

  const renderOfferwall = () => (
    <div className="section">
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
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'all':
        return (
          <div className="tab-content">
            {renderRaffle()}
            {renderMission()}
            {renderQuiz()}
            {renderGame()}
            {renderShopping()}
            {renderOfferwall()}
          </div>
        );

      case 'raffle':
        return <div className="tab-content">{renderRaffle()}</div>;

      case 'mission':
        return <div className="tab-content">{renderMission()}</div>;

      case 'quiz':
        return <div className="tab-content">{renderQuiz()}</div>;

      case 'game':
        return <div className="tab-content">{renderGame()}</div>;

      case 'shopping':
        return <div className="tab-content">{renderShopping()}</div>;

      case 'offerwall':
        return <div className="tab-content">{renderOfferwall()}</div>;

      default:
        return null;
    }
  };

  return (
    <div className="screen benefits-screen">
      <div className="benefits-header">
        <h1 className="page-title">혜택</h1>
        <div className="benefits-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`benefits-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="benefits-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default BenefitsScreen;
