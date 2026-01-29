import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizScreen.css';

const quizData = [
  {
    id: 1,
    question: '원금에 이자를 더한 금액에 다시 이자가 붙는 방식을 무엇이라고 할까요?',
    options: ['단리', '복리', '고정금리', '변동금리'],
    answer: 1,
    reward: 100,
  },
  {
    id: 2,
    question: '예금자보호법에 따라 보호받을 수 있는 최대 금액은?',
    options: ['3천만원', '5천만원', '1억원', '무제한'],
    answer: 1,
    reward: 100,
  },
  {
    id: 3,
    question: '물가가 지속적으로 오르는 현상을 무엇이라고 할까요?',
    options: ['디플레이션', '스태그플레이션', '인플레이션', '리플레이션'],
    answer: 2,
    reward: 100,
  },
];

const QuizScreen = ({ showToast, updatePoints }) => {
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalEarned, setTotalEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const quiz = quizData[currentQuiz];

  const handleAnswer = (index) => {
    if (isAnswered) return;

    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === quiz.answer) {
      setTotalEarned((prev) => prev + quiz.reward);
      updatePoints(quiz.reward);
    }
  };

  const handleNext = () => {
    if (currentQuiz < quizData.length - 1) {
      setCurrentQuiz((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleComplete = () => {
    if (totalEarned > 0) {
      showToast(`총 ${totalEarned}P 획득!`);
    }
    navigate(-1);
  };

  if (isComplete) {
    return (
      <div className="screen quiz-screen">
        <div className="page-header">
          <button className="page-back-btn" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="page-title">금융 퀴즈</h1>
        </div>

        <div className="quiz-complete">
          <div className="complete-icon">🎉</div>
          <h2 className="complete-title">퀴즈 완료!</h2>
          <p className="complete-desc">오늘의 금융 퀴즈를 모두 풀었어요</p>
          <div className="complete-reward">
            <span className="reward-label">획득 포인트</span>
            <span className="reward-value">+{totalEarned}P</span>
          </div>
          <button className="btn-complete" onClick={handleComplete}>
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen quiz-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="page-title">금융 퀴즈</h1>
      </div>

      <div className="quiz-content">
        <div className="quiz-progress-section">
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${((currentQuiz + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>
          <div className="quiz-progress-text">
            {currentQuiz + 1} / {quizData.length}
          </div>
        </div>

        <div className="quiz-card-large">
          <div className="quiz-number">Q{quiz.id}</div>
          <div className="quiz-question-text">{quiz.question}</div>
          <div className="quiz-point-badge">+{quiz.reward}P</div>
        </div>

        <div className="quiz-options-list">
          {quiz.options.map((option, index) => {
            let optionClass = 'quiz-option-btn';
            if (isAnswered) {
              if (index === quiz.answer) {
                optionClass += ' correct';
              } else if (index === selectedAnswer) {
                optionClass += ' wrong';
              }
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
              >
                <span className="option-number">{index + 1}</span>
                <span className="option-text">{option}</span>
                {isAnswered && index === quiz.answer && (
                  <span className="option-icon correct">O</span>
                )}
                {isAnswered && index === selectedAnswer && index !== quiz.answer && (
                  <span className="option-icon wrong">X</span>
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="quiz-result-section">
            <div className={`quiz-result-message ${selectedAnswer === quiz.answer ? 'correct' : 'wrong'}`}>
              {selectedAnswer === quiz.answer ? (
                <>
                  <span className="result-icon">🎉</span>
                  <span>정답입니다! +{quiz.reward}P 획득</span>
                </>
              ) : (
                <>
                  <span className="result-icon">😅</span>
                  <span>아쉽게도 오답이에요</span>
                </>
              )}
            </div>
            <button className="btn-next-quiz" onClick={handleNext}>
              {currentQuiz < quizData.length - 1 ? '다음 문제' : '결과 보기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
