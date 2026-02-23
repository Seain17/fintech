import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PointHistoryScreen.css';

const PointHistoryScreen = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // all, earn, use, expire
  const [dateFilter, setDateFilter] = useState('all'); // all, week, month, 3months

  // Mock data
  const historyData = [
    { id: 1, type: 'earn', source: '출석체크', amount: 50, date: '2024-01-20 09:15', balance: 26350 },
    { id: 2, type: 'earn', source: '광고 시청', amount: 30, date: '2024-01-20 10:22', balance: 26300 },
    { id: 3, type: 'use', source: '경품 응모 (에어팟)', amount: -100, date: '2024-01-19 14:30', balance: 26270 },
    { id: 4, type: 'earn', source: '쿠팡 쇼핑 적립', amount: 1500, date: '2024-01-19 11:45', balance: 26370 },
    { id: 5, type: 'earn', source: '퀴즈 정답', amount: 100, date: '2024-01-18 20:10', balance: 24870 },
    { id: 6, type: 'use', source: '기프티콘 교환', amount: -5000, date: '2024-01-17 15:20', balance: 24770 },
    { id: 7, type: 'earn', source: '만보기 달성', amount: 200, date: '2024-01-17 22:00', balance: 29770 },
    { id: 8, type: 'earn', source: '토스 가입하기', amount: 3000, date: '2024-01-16 13:55', balance: 29570 },
    { id: 9, type: 'expire', source: '핀 소멸', amount: -500, date: '2024-01-15 00:00', balance: 26570 },
    { id: 10, type: 'earn', source: '출석체크', amount: 50, date: '2024-01-15 08:30', balance: 27070 }
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
        <h1 className="page-title">핀 적립 내역</h1>
      </div>

      <div className="history-filters">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button
            className={`filter-tab ${filter === 'earn' ? 'active' : ''}`}
            onClick={() => setFilter('earn')}
          >
            적립
          </button>
          <button
            className={`filter-tab ${filter === 'use' ? 'active' : ''}`}
            onClick={() => setFilter('use')}
          >
            사용
          </button>
          <button
            className={`filter-tab ${filter === 'expire' ? 'active' : ''}`}
            onClick={() => setFilter('expire')}
          >
            소멸
          </button>
        </div>

        <div className="date-filter">
          <select
            className="date-select"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">전체 기간</option>
            <option value="week">최근 1주일</option>
            <option value="month">최근 1개월</option>
            <option value="3months">최근 3개월</option>
          </select>
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
                <div className={`history-type-badge ${getTypeColor(item.type)}`}>
                  {getTypeLabel(item.type)}
                </div>
                <div className="history-info">
                  <div className="history-source">{item.source}</div>
                  <div className="history-date">{item.date}</div>
                </div>
              </div>
              <div className="history-right">
                <div className={`history-amount ${item.amount > 0 ? 'positive' : 'negative'}`}>
                  {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}핀
                </div>
                <div className="history-balance">잔액 {item.balance.toLocaleString()}핀</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="history-notice">
        <h4>💡 핀 이용 안내</h4>
        <ul>
          <li>핀은 적립일로부터 1년간 유효합니다</li>
          <li>소멸 예정 핀은 마이페이지에서 확인할 수 있습니다</li>
          <li>부정 사용 적발 시 핀이 회수될 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
};

export default PointHistoryScreen;
