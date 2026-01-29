import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingHistoryScreen.css';

const ShoppingHistoryScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('completed');

  // 샘플 데이터
  const completedHistory = [
    { id: 1, mall: '쿠팡', mallIcon: '🛒', product: '삼성 갤럭시 버즈3', amount: 189000, points: 1890, date: '2024.01.15', status: '적립완료' },
    { id: 2, mall: '11번가', mallIcon: '🏪', product: '나이키 에어맥스', amount: 129000, points: 1290, date: '2024.01.10', status: '적립완료' },
    { id: 3, mall: 'G마켓', mallIcon: '🛍️', product: '애플 에어팟 프로', amount: 259000, points: 2590, date: '2024.01.05', status: '적립완료' },
  ];

  const pendingHistory = [
    { id: 1, mall: '쿠팡', mallIcon: '🛒', product: 'LG 그램 노트북', amount: 1590000, points: 15900, date: '2024.01.20', expectedDate: '2024.02.20', status: '적립예정' },
    { id: 2, mall: '옥션', mallIcon: '🏷️', product: '다이슨 에어랩', amount: 599000, points: 5990, date: '2024.01.18', expectedDate: '2024.02.18', status: '적립예정' },
  ];

  const canceledHistory = [
    { id: 1, mall: '11번가', mallIcon: '🏪', product: '아디다스 운동화', amount: 89000, points: -890, date: '2024.01.12', reason: '고객 변심', status: '취소' },
    { id: 2, mall: 'G마켓', mallIcon: '🛍️', product: '소니 헤드폰', amount: 349000, points: -3490, date: '2024.01.08', reason: '상품 불량', status: '환불' },
  ];

  const getHistoryData = () => {
    switch (activeTab) {
      case 'completed': return completedHistory;
      case 'pending': return pendingHistory;
      case 'canceled': return canceledHistory;
      default: return [];
    }
  };

  const renderHistoryItem = (item) => (
    <div key={item.id} className="shopping-history-item">
      <div className="shopping-history-mall">
        <span className="mall-icon">{item.mallIcon}</span>
        <span className="mall-name">{item.mall}</span>
        <span className={`history-status ${item.status === '적립완료' ? 'completed' : item.status === '적립예정' ? 'pending' : 'canceled'}`}>
          {item.status}
        </span>
      </div>
      <div className="shopping-history-product">{item.product}</div>
      <div className="shopping-history-info">
        <span className="purchase-amount">{item.amount.toLocaleString()}원</span>
        <span className={`point-amount ${item.points < 0 ? 'negative' : 'positive'}`}>
          {item.points > 0 ? '+' : ''}{item.points.toLocaleString()} P
        </span>
      </div>
      <div className="shopping-history-date">
        {item.date}
        {item.expectedDate && <span className="expected-date"> (지급예정: {item.expectedDate})</span>}
        {item.reason && <span className="cancel-reason"> · {item.reason}</span>}
      </div>
    </div>
  );

  return (
    <div className="screen shopping-history-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="page-title">쇼핑적립 내역</h1>
      </div>

      <div className="shopping-history-tabs">
        <button
          className={`history-tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          적립내역
        </button>
        <button
          className={`history-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          적립예정
        </button>
        <button
          className={`history-tab ${activeTab === 'canceled' ? 'active' : ''}`}
          onClick={() => setActiveTab('canceled')}
        >
          취소·환불
        </button>
      </div>

      <div className="shopping-history-content">
        {getHistoryData().length > 0 ? (
          <div className="shopping-history-list">
            {getHistoryData().map(renderHistoryItem)}
          </div>
        ) : (
          <div className="empty-history">
            <span className="empty-icon">📭</span>
            <p>내역이 없습니다</p>
          </div>
        )}
      </div>

      <div className="shopping-history-summary">
        <div className="summary-item">
          <span className="summary-label">총 적립 포인트</span>
          <span className="summary-value">5,770 P</span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingHistoryScreen;
