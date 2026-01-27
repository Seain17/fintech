import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GamePlayScreen.css';

const GamePlayScreen = ({ updatePoints, showToast }) => {
  const navigate = useNavigate();
  const { gameType } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);

  // 룰렛 게임
  const [rouletteRotation, setRouletteRotation] = useState(0);
  const rouletteRewards = [10, 20, 50, 5, 30, 100, 10, 20];

  // 카드 뒤집기 게임
  const [cards, setCards] = useState([
    { id: 1, flipped: false, reward: 10 },
    { id: 2, flipped: false, reward: 50 },
    { id: 3, flipped: false, reward: 20 },
    { id: 4, flipped: false, reward: 5 },
    { id: 5, flipped: false, reward: 100 },
    { id: 6, flipped: false, reward: 30 }
  ]);

  const playRoulette = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setResult(null);

    // 랜덤 회전 (3600도 + 랜덤)
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = rouletteRotation + 3600 + randomDegree;
    setRouletteRotation(totalRotation);

    // 결과 계산 (8개 섹션)
    const sectionDegree = 360 / 8;
    const finalDegree = totalRotation % 360;
    const winningIndex = Math.floor((360 - finalDegree) / sectionDegree) % 8;
    const reward = rouletteRewards[winningIndex];

    setTimeout(() => {
      setResult(reward);
      updatePoints(reward);
      showToast(`🎉 ${reward}P 획득!`);
      setIsPlaying(false);
    }, 4000);
  };

  const flipCard = (cardId) => {
    if (isPlaying) return;

    const card = cards.find(c => c.id === cardId);
    if (card.flipped) return;

    setIsPlaying(true);
    setCards(cards.map(c =>
      c.id === cardId ? { ...c, flipped: true } : c
    ));

    setTimeout(() => {
      updatePoints(card.reward);
      showToast(`🎉 ${card.reward}P 획득!`);
      setIsPlaying(false);
    }, 500);
  };

  const resetCardGame = () => {
    setCards(cards.map(c => ({ ...c, flipped: false })));
    setResult(null);
  };

  return (
    <div className="screen game-play-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">
          {gameType === 'roulette' ? '🎰 룰렛 게임' : '🃏 카드 뒤집기'}
        </h1>
      </div>

      <div className="game-content">
        {gameType === 'roulette' ? (
          <div className="roulette-game">
            <div className="game-info-card">
              <div className="game-info-icon">🎯</div>
              <div className="game-info-text">
                <div className="game-info-title">룰렛을 돌려보세요!</div>
                <div className="game-info-desc">최대 100P까지 획득 가능</div>
              </div>
            </div>

            <div className="roulette-container">
              <div className="roulette-pointer">▼</div>
              <div
                className={`roulette-wheel ${isPlaying ? 'spinning' : ''}`}
                style={{ transform: `rotate(${rouletteRotation}deg)` }}
              >
                {rouletteRewards.map((reward, index) => (
                  <div
                    key={index}
                    className="roulette-section"
                    style={{
                      transform: `rotate(${index * 45}deg)`,
                      background: index % 2 === 0 ? '#3182F6' : '#FF6B35'
                    }}
                  >
                    <span className="roulette-text">{reward}P</span>
                  </div>
                ))}
                <div className="roulette-center">
                  <span>🎰</span>
                </div>
              </div>
            </div>

            {result && (
              <div className="game-result">
                <div className="result-icon">🎉</div>
                <div className="result-text">{result}P 획득!</div>
              </div>
            )}

            <button
              className="btn-primary game-btn"
              onClick={playRoulette}
              disabled={isPlaying}
            >
              {isPlaying ? '룰렛 돌리는 중...' : '룰렛 돌리기'}
            </button>

            <div className="game-notice">
              <p>💡 하루 3회까지 무료로 플레이 가능합니다</p>
            </div>
          </div>
        ) : (
          <div className="card-game">
            <div className="game-info-card">
              <div className="game-info-icon">🎴</div>
              <div className="game-info-text">
                <div className="game-info-title">카드를 선택하세요!</div>
                <div className="game-info-desc">숨겨진 포인트를 확인하세요</div>
              </div>
            </div>

            <div className="card-grid">
              {cards.map(card => (
                <div
                  key={card.id}
                  className={`game-card ${card.flipped ? 'flipped' : ''} ${isPlaying && !card.flipped ? 'disabled' : ''}`}
                  onClick={() => flipCard(card.id)}
                >
                  {card.flipped ? (
                    <div className="card-front">
                      <div className="card-reward">{card.reward}P</div>
                      <div className="card-emoji">🎁</div>
                    </div>
                  ) : (
                    <div className="card-back">
                      <div className="card-question">?</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="card-game-actions">
              <button
                className="btn-primary game-btn"
                onClick={resetCardGame}
                disabled={isPlaying}
              >
                다시 시작
              </button>
            </div>

            <div className="game-notice">
              <p>💡 한 번에 하나의 카드만 선택할 수 있습니다</p>
              <p>💡 선택한 카드는 되돌릴 수 없습니다</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePlayScreen;
