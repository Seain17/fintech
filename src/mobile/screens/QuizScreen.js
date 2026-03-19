import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizScreen.css';
import { iPadProBanner } from '../components/AdBanner';
import '../components/AdBanner.css';

const quizData = [
  { q: '체크카드 소득공제율은 신용카드보다 높다?', a: 'O' },
  { q: '금리가 오르면 대출 이자부담은 줄어든다?', a: 'X' },
  { q: '예금자보호법은 5천만원까지 보호된다?', a: 'O' },
];

const bubbleMessages = {
  start: '3단계 완주하고 돈다발 챙기세요! 💸',
  correct: '정답입니다! +10핀 적립!',
  wrong: '아쉽네요! 그래도 다음 단계로!',
  finish: '모두 맞히셨네요! 돈다발을 확인하세요!',
};

const QuizScreen = ({ showToast, updatePoints }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalEarned, setTotalEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showShutter, setShowShutter] = useState(false);
  const [bubble, setBubble] = useState(bubbleMessages.start);

  const handleAnswer = (choice) => {
    if (isAnswered) return;
    setSelected(choice);
    setIsAnswered(true);

    const correct = quizData[current].a === choice;
    setIsCorrect(correct);

    if (correct) {
      setBubble(bubbleMessages.correct);
      setTotalEarned(prev => prev + 10);
      updatePoints(10);
    } else {
      setBubble(bubbleMessages.wrong);
    }
  };

  const handleNext = () => {
    if (current < quizData.length - 1) {
      setCurrent(prev => prev + 1);
      setSelected(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setIsComplete(true);
      setBubble(bubbleMessages.finish);
      // 셔터 애니메이션 후 모달
      setTimeout(() => setShowShutter(true), 500);
      setTimeout(() => setShowModal(true), 2000);
    }
  };

  const handleBonusAd = () => {
    updatePoints(10);
    showToast('보너스 돈다발 +10핀 추가 적립!');
    navigate(-1);
  };

  const handleSkip = () => {
    if (totalEarned > 0) {
      showToast(`총 ${totalEarned}핀 획득!`);
    }
    navigate(-1);
  };

  // 로드맵 진행률
  const progress = isComplete ? 100 : (current / quizData.length) * 100;

  return (
    <div className="screen quiz-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="page-title">돈다발 퀴즈</h1>
      </div>

      {/* 셔터 섹션 */}
      <div className="quiz-shutter-section">
        {/* 김미소 대리 */}
        <div className="quiz-teller">
          <div className="quiz-bubble">{bubble}</div>
          <div className="quiz-avatar">👩🏻‍💼</div>
          <div className="quiz-nametag">김미소 대리</div>
        </div>

        {/* 로드맵 */}
        <div className="quiz-roadmap">
          <div className="roadmap-track">
            <div className="roadmap-line-bg" />
            <div className="roadmap-line-fill" style={{ width: `${progress}%` }} />
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`roadmap-node ${i < current || isComplete ? 'passed' : ''} ${i === current && !isComplete ? 'active' : ''}`}
              >
                {i < current || isComplete ? '✔' : i + 1}
                <span className="roadmap-node-label">10핀</span>
              </div>
            ))}
            <div className={`roadmap-node money-bundle ${isComplete ? 'active' : ''}`}>
              💵
              <span className="roadmap-node-label">돈다발</span>
            </div>
          </div>
        </div>

        {/* 퀴즈 카드 */}
        {!isComplete && (
          <div className="quiz-content">
            <div className="quiz-card-ox">
              <div className="quiz-card-header">
                <span className="quiz-step-badge">STEP {current + 1}</span>
                <span className="quiz-point-display">+10핀</span>
              </div>

              <div className="quiz-text-ox">{quizData[current].q}</div>

              <div className="quiz-ox-container">
                <button
                  className={`quiz-ox-btn o ${selected === 'O' ? 'selected' : ''} ${isAnswered ? 'disabled' : ''}`}
                  onClick={() => handleAnswer('O')}
                  disabled={isAnswered}
                >
                  O
                </button>
                <button
                  className={`quiz-ox-btn x ${selected === 'X' ? 'selected' : ''} ${isAnswered ? 'disabled' : ''}`}
                  onClick={() => handleAnswer('X')}
                  disabled={isAnswered}
                >
                  X
                </button>
              </div>

              {isAnswered && (
                <div className={`quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
                  {isCorrect ? 'O' : 'X'}
                </div>
              )}

              {isAnswered && (
                <button className="quiz-next-btn" onClick={handleNext}>
                  <span className="quiz-next-ad-icon">📺</span>
                  {current < quizData.length - 1 ? '광고보고 다음 >' : '광고보고 결과보기 >'}
                </button>
              )}
            </div>

            {isAnswered && (
              <div className="quiz-ad-notice">
                <span className="quiz-ad-notice-icon">📢</span>
                <span>짧은 광고 시청 후 다음 문제를 풀 수 있어요</span>
              </div>
            )}

            {/* 광고 배너 - iPad Pro */}
            {iPadProBanner()}
          </div>
        )}

        {/* 셔터 */}
        {showShutter && (
          <div className="quiz-shutter active">
            <div className="quiz-shutter-lines"></div>
            <div className="quiz-shutter-content">
              <div className="quiz-shutter-icon">🎓</div>
              <h2 className="quiz-shutter-title">오늘의 퀴즈 마감!</h2>
              <p className="quiz-shutter-desc">
                오늘도 금융 지식이 늘었어요!<br />
                내일 새로운 퀴즈로 만나요
              </p>
            </div>
            <div className="quiz-shutter-handle"></div>
          </div>
        )}
      </div>

      {/* 결과 모달 */}
      {showModal && (
        <div className="quiz-modal-overlay" onClick={(e) => e.target === e.currentTarget && handleSkip()}>
          <div className="quiz-modal-card">
            <div className="quiz-modal-emoji">💵</div>
            <h2 className="quiz-modal-title">3단계 완주 성공!</h2>
            <p className="quiz-modal-desc">
              퀴즈 보상 {totalEarned}핀 확보 완료.<br />
              이제 <b>보너스 돈다발</b>을 주워볼까요?
            </p>
            <button className="quiz-bonus-btn" onClick={handleBonusAd}>
              💰 광고 보고 돈다발 줍기
            </button>
            <button className="quiz-skip-btn" onClick={handleSkip}>
              괜찮아요, {totalEarned}핀만 받을게요
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
