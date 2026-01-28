import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';

const withdrawHistory = [
  { id: 1, date: '2026-01-20', amount: 50000, status: 'completed', bank: '국민은행', account: '***-**-789' },
  { id: 2, date: '2026-01-15', amount: 80000, status: 'completed', bank: '신한은행', account: '***-**-321' },
  { id: 3, date: '2026-01-10', amount: 100000, status: 'completed', bank: '국민은행', account: '***-**-789' },
  { id: 4, date: '2026-01-05', amount: 30000, status: 'completed', bank: '카카오뱅크', account: '****-**-456' },
];

const WithdrawHistoryScreen = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <span className="status-badge completed">완료</span>;
      case 'pending': return <span className="status-badge pending">대기중</span>;
      case 'rejected': return <span className="status-badge rejected">거부</span>;
      default: return null;
    }
  };

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
            <span className="summary-value">{withdrawHistory.length}회</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">총 출금 금액</span>
            <span className="summary-value highlight">
              {withdrawHistory.reduce((acc, cur) => acc + cur.amount, 0).toLocaleString()}원
            </span>
          </div>
        </div>

        <div className="history-list">
          {withdrawHistory.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-main">
                <div className="history-info">
                  <div className="history-title">{item.bank} {item.account}</div>
                  <div className="history-date">{item.date}</div>
                </div>
                <div className="history-right">
                  <div className="history-amount">-{item.amount.toLocaleString()}원</div>
                  {getStatusBadge(item.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {withdrawHistory.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">💸</div>
            <div className="empty-text">출금 내역이 없습니다</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawHistoryScreen;
