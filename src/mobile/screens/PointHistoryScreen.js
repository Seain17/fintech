import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PointHistoryScreen.css';
import { PinAmount, PinIcon } from '../../shared/components';

const PointHistoryScreen = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // all, earn, use
  const [dateFilter, setDateFilter] = useState('month'); // all, week, month, 3months

  // 보유 핀
  const totalPin = 26350;

  // Mock data
  const historyData = [
    { id: 1, type: 'earn', source: '출석체크', amount: 50, date: '2024.01.20', time: '09:15' },
    { id: 2, type: 'use', source: '래플 응모 (에어팟)', amount: -100, date: '2024.01.20', time: '09:15' },
    { id: 3, type: 'earn', source: 'SSG 쇼핑 적립', amount: 3000, date: '2024.01.20', time: '09:15' },
    { id: 4, type: 'earn', source: '퀴즈 정답', amount: 50, date: '2024.01.20', time: '09:15' },
    { id: 5, type: 'use', source: '기프티콘 교환', amount: -5000, date: '2024.01.19', time: '15:20' },
    { id: 6, type: 'earn', source: '만보기 달성', amount: 200, date: '2024.01.18', time: '22:00' },
  ];

  const filteredHistory = historyData.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getTypeLabel = (type) => {
    switch (type) {
      case 'earn':
        return '적립';
      case 'use':
        return '사용';
      case 'expire':
        return '소멸';
      default:
        return '';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'earn':
        return 'earn';
      case 'use':
        return 'use';
      case 'expire':
        return 'expire';
      default:
        return '';
    }
  };

  return (
    <div className="screen point-history-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">핀 내역</h1>
      </div>

      {/* 보유 핀 */}
      <div className="pin-balance-card">
        <span className="pin-balance-label">나의 에이핀</span>
        <PinAmount amount={totalPin} size="large" className="pin-balance-value" />
      </div>

      {/* 탭 필터 */}
      <div className="history-filters">
        <div className="underline-tabs">
          <button
            className={`underline-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button
            className={`underline-tab ${filter === 'earn' ? 'active' : ''}`}
            onClick={() => setFilter('earn')}
          >
            적립
          </button>
          <button
            className={`underline-tab ${filter === 'use' ? 'active' : ''}`}
            onClick={() => setFilter('use')}
          >
            사용
          </button>
        </div>

        {/* 날짜 필터 칩 */}
        <div className="date-filter-chips">
          <button
            className={`date-chip ${dateFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDateFilter('all')}
          >
            전체
          </button>
          <button
            className={`date-chip ${dateFilter === 'week' ? 'active' : ''}`}
            onClick={() => setDateFilter('week')}
          >
            1주일
          </button>
          <button
            className={`date-chip ${dateFilter === 'month' ? 'active' : ''}`}
            onClick={() => setDateFilter('month')}
          >
            1개월
          </button>
          <button
            className={`date-chip ${dateFilter === '3months' ? 'active' : ''}`}
            onClick={() => setDateFilter('3months')}
          >
            3개월
          </button>
        </div>
      </div>

      <div className="history-list">
        {filteredHistory.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <div className="empty-text">내역이 없습니다</div>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-left">
                <div className="history-info">
                  <div className="history-source">{item.source}</div>
                  <div className="history-date">{item.date} | {item.time}</div>
                </div>
              </div>
              <div className="history-right">
                <div className={`history-amount ${item.amount > 0 ? 'positive' : 'negative'}`}>
                  {item.amount > 0 ? '+' : ''}<PinIcon size="small" />{Math.abs(item.amount).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PointHistoryScreen;
