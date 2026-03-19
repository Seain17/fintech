import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';

const withdrawHistory = [
  { id: 1, date: '2026-01-30', amount: 50000, status: 'completed', bank: '국민은행', account: '123-*****-******' },
  { id: 2, date: '2026-01-15', amount: 50000, status: 'cancelled', bank: '국민은행', account: '123-*****-******', reason: '예금주명 미일치' },
  { id: 3, date: '2026-01-10', amount: 100000, status: 'completed', bank: '신한은행', account: '456-*****-******' },
  { id: 4, date: '2026-01-05', amount: 30000, status: 'completed', bank: '카카오뱅크', account: '789-*****-******' },
];

const WithdrawHistoryScreen = () => {
  const navigate = useNavigate();

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

  return (
    <div className="screen detail-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">출금 내역</h1>
      </div>

      <div className="detail-content">
        <div className="history-summary">
          <div className="summary-item">
            <span className="summary-label">총 출금 횟수</span>
            <span className="summary-value">{completedHistory.length}회</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">총 출금 금액</span>
            <span className="summary-value highlight">
              {totalAmount.toLocaleString()}원
            </span>
          </div>
        </div>

        <div className="history-list">
          {withdrawHistory.map((item) => (
            <div key={item.id} className={`history-item ${item.status === 'cancelled' ? 'cancelled' : ''}`}>
              <div className="history-main">
                <div className="history-info">
                  <div className="history-title">{item.bank} {item.account}</div>
                  <div className="history-date">{item.date}</div>
                  {item.reason && (
                    <div className="history-reason">사유 : {item.reason}</div>
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

        {withdrawHistory.length === 0 && (
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
