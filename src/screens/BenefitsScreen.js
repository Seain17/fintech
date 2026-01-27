import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BenefitsScreen.css';

const BenefitsScreen = ({ showToast, updatePoints }) => {
  const navigate = useNavigate();

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

  return (
    <div className="screen benefits-screen">
      <div className="benefits-header">
        <h1 className="page-title">혜택</h1>
      </div>

      <div className="benefits-content">
        <div className="benefits-scroll-content">
          {/* 래플 이벤트 - 최상단으로 이동 */}
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
                    <span className="raffle-item-cost">100P로 응모</span>
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
                    <span className="raffle-item-cost">500P로 응모</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 출석체크 배너 */}
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

            {/* 만보기 카드 */}
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

          {/* 금융 퀴즈 카드 리스트 */}
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

          {/* 포인트 게임 */}
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

              <div className="benefit-list-item" onClick={() => showToast('준비중입니다')}>
                <div className="benefit-item-icon">🎯</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">다트 게임</div>
                  <div className="benefit-item-desc">정확도 테스트!</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
            </div>
          </div>

          {/* 쇼핑 적립 */}
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

              <div className="benefit-list-item" onClick={() => navigate('/shopping/bridge/gmarket')}>
                <div className="benefit-item-icon gmarket">G</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">G마켓</div>
                  <div className="benefit-item-desc">최대 3.5% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>

              <div className="benefit-list-item" onClick={() => navigate('/shopping/bridge/auction')}>
                <div className="benefit-item-icon auction">A</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">옥션</div>
                  <div className="benefit-item-desc">최대 3% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>

              <div className="benefit-list-item" onClick={() => navigate('/shopping/bridge/ssg')}>
                <div className="benefit-item-icon ssg">SSG</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">SSG.COM</div>
                  <div className="benefit-item-desc">최대 2.5% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
            </div>
          </div>

          {/* 오퍼월 */}
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

              <div className="benefit-list-item" onClick={() => showToast('회원가입 완료! +2000P')}>
                <div className="benefit-item-icon">✍️</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">회원가입하기</div>
                  <div className="benefit-item-desc">+2,000P</div>
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
