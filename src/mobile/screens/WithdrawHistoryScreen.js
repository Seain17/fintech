import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';
import './WithdrawHistoryScreen.css';

const withdrawHistory = [
  { id: 1, date: '2026-01-30', amount: 50000, status: 'completed', bank: '신한은행', account: '123-*****-******' },
  { id: 2, date: '2026-01-20', amount: 50000, status: 'cancelled', bank: '국민은행', account: '123-*****-******', reason: '예금주명 미일치' },
  { id: 3, date: '2026-01-10', amount: 100000, status: 'completed', bank: '신한은행', account: '123-*****-******' },
  { id: 4, date: '2026-01-05', amount: 30000, status: 'completed', bank: '국민은행', account: '123-*****-******' },
];

const WithdrawHistoryScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <span className="status-badge completed">완료</span>;
      case 'cancelled': return <span className="status-badge rejected">취소</span>;
      case 'pending': return <span className="status-badge pending">대기중</span>;
      default: return null;
    }
  };

  const completedHistory = withdrawHistory.filter(item => item.status === 'completed');
  const totalAmount = completedHistory.reduce((acc, cur) => acc + cur.amount, 0);

  const getDateLimit = () => {
    const now = new Date();
    if (dateFilter === 'week') return new Date(now - 7 * 24 * 60 * 60 * 1000);
    if (dateFilter === 'month') return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    if (dateFilter === '3months') return new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    return null;
  };

  const filteredHistory = withdrawHistory.filter(item => {
    if (activeTab !== 'all' && item.status !== activeTab) return false;
    const limit = getDateLimit();
    if (limit && new Date(item.date) < limit) return false;
    return true;
  });

  return (
    <div className="screen detail-screen withdraw-history-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="page-title">출금내역</h1>
      </div>

      {/* 요약 카드 */}
      <div className="history-summary-fixed">
        <div className="summary-item">
          <span className="summary-label">총 출금 횟수</span>
          <span className="summary-value">{completedHistory.length}회</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">총 출금 금액</span>
          <span className="summary-value highlight">{totalAmount.toLocaleString()}원</span>
        </div>
      </div>

      {/* 탭: 전체/완료/취소 */}
      <div className="withdraw-tabs">
        {[['all', '전체'], ['completed', '완료'], ['cancelled', '취소']].map(([key, label]) => (
          <button
            key={key}
            className={`withdraw-tab ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 기간 칩 필터 */}
      <div className="withdraw-chip-filter">
        {[['all', '전체'], ['week', '1주일'], ['month', '1개월'], ['3months', '3개월']].map(([key, label]) => (
          <button
            key={key}
            className={`withdraw-chip ${dateFilter === key ? 'active' : ''}`}
            onClick={() => setDateFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 리스트 */}
      <div className="detail-content-scroll">
        <div className="history-list">
          {filteredHistory.map((item) => (
            <div key={item.id} className={`history-item ${item.status === 'cancelled' ? 'cancelled' : ''}`}>
              <div className="history-main">
                <div className="history-info">
                  <div className="history-title">{item.bank} {item.account}</div>
                  <div className="history-date">{item.date.replace(/-/g, '.')}</div>
                  {item.reason && (
                    <div className="history-reason">취소 사유 : {item.reason}</div>
                  )}
                </div>
                <div className="history-right">
                  <div className="history-amount">{item.amount.toLocaleString()}원</div>
                  {getStatusBadge(item.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredHistory.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">💸</div>
            <div className="empty-text">출금 기록이 없습니다</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawHistoryScreen;
