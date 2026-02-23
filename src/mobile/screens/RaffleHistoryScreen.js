import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';

const raffleHistory = [
  { id: 1, title: '스타벅스 아메리카노', date: '2026-01-22', status: 'won', tickets: 5, prize: '스타벅스 아메리카노 Tall' },
  { id: 2, title: '배달의민족 5천원권', date: '2026-01-20', status: 'lost', tickets: 3, prize: null },
  { id: 3, title: 'CU 편의점 3천원권', date: '2026-01-18', status: 'won', tickets: 2, prize: 'CU 모바일 상품권 3,000원' },
  { id: 4, title: '넷플릭스 1개월권', date: '2026-01-15', status: 'lost', tickets: 10, prize: null },
  { id: 5, title: 'GS25 만원권', date: '2026-01-10', status: 'lost', tickets: 5, prize: null },
];

const RaffleHistoryScreen = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filteredHistory = filter === 'all'
    ? raffleHistory
    : raffleHistory.filter(item => item.status === filter);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'won': return <span className="status-badge won">당첨</span>;
      case 'lost': return <span className="status-badge lost">미당첨</span>;
      default: return null;
    }
  };

  const wonCount = raffleHistory.filter(r => r.status === 'won').length;
  const totalTickets = raffleHistory.reduce((acc, cur) => acc + cur.tickets, 0);

  return (
    <div className="screen detail-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">경품 내역</h1>
      </div>

      <div className="detail-content">
        <div className="history-summary">
          <div className="summary-item">
            <span className="summary-label">총 응모 횟수</span>
            <span className="summary-value">{raffleHistory.length}회</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">사용 티켓</span>
            <span className="summary-value">{totalTickets}장</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">당첨 횟수</span>
            <span className="summary-value highlight">{wonCount}회</span>
          </div>
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button
            className={`filter-tab ${filter === 'won' ? 'active' : ''}`}
            onClick={() => setFilter('won')}
          >
            당첨
          </button>
          <button
            className={`filter-tab ${filter === 'lost' ? 'active' : ''}`}
            onClick={() => setFilter('lost')}
          >
            미당첨
          </button>
        </div>

        <div className="history-list">
          {filteredHistory.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-main">
                <div className="history-info">
                  <div className="history-title">{item.title}</div>
                  <div className="history-date">{item.date} · 티켓 {item.tickets}장 사용</div>
                  {item.prize && (
                    <div className="history-prize">🎁 {item.prize}</div>
                  )}
                </div>
                <div className="history-right">
                  {getStatusBadge(item.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎰</div>
            <div className="empty-text">경품 내역이 없습니다</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaffleHistoryScreen;
