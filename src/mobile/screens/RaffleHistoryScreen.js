import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RaffleHistoryScreen.css';

const ongoingRaffles = [
  { id: 1, title: '애플 에어팟 프로 2', image: '/images/raffle/img-product-01.png', participants: 234, daysLeft: 8, timeLeft: '20:41:53' },
  { id: 2, title: '아이폰 15 Pro Max', image: '/images/raffle/img-product-02.png', participants: 1893, daysLeft: 12, timeLeft: '20:41:53' },
];

const completedRaffles = [
  { id: 3, title: '애플 에어팟 프로 2', image: '/images/raffle/img-product-01.png', participants: 234 },
  { id: 4, title: '아이폰 15 Pro Max', image: '/images/raffle/img-product-02.png', participants: 1893 },
];

const RaffleHistoryScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [dateFilter, setDateFilter] = useState('all');

  const handleResultClick = () => {
    showToast && showToast('당첨자 명단 페이지로 이동합니다');
  };

  return (
    <div className="screen raffle-history-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="page-title">경품 응모 내역</h1>
      </div>

      {/* 탭 */}
      <div className="raffle-tabs">
        <button
          className={`raffle-tab ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          진행중
        </button>
        <button
          className={`raffle-tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          진행 완료
        </button>
      </div>

      {/* 진행 완료 날짜 필터 */}
      {activeTab === 'completed' && (
        <div className="date-filter-fixed">
          {['all', 'week', 'month'].map((key) => (
            <button
              key={key}
              className={`date-chip ${dateFilter === key ? 'active' : ''}`}
              onClick={() => setDateFilter(key)}
            >
              {key === 'all' ? '전체' : key === 'week' ? '1주일' : '1개월'}
            </button>
          ))}
        </div>
      )}

      <div className="raffle-content">
        {/* 진행 중 */}
        {activeTab === 'ongoing' && (
          <div className="raffle-list">
            {ongoingRaffles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎁</div>
                <div className="empty-text">참여 중인 래플이 없습니다</div>
              </div>
            ) : (
              ongoingRaffles.map((raffle) => (
                <div key={raffle.id} className="raffle-card ongoing" onClick={() => navigate(`/raffle/${raffle.id}`)}>
                  <div className="raffle-card-image">
                    <img src={raffle.image} alt={raffle.title} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  <div className="raffle-info">
                    <div className="raffle-deadline">
                      <img src="/images/icons/img-product-reaction-02.png" alt="" className="deadline-icon" />
                      마감까지 {raffle.daysLeft}일 {raffle.timeLeft} 남음
                    </div>
                    <div className="raffle-title">{raffle.title}</div>
                    <div className="raffle-participants">{raffle.participants.toLocaleString()}명 참여 중</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 진행 완료 */}
        {activeTab === 'completed' && (
          <div className="raffle-list">
            {completedRaffles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎁</div>
                <div className="empty-text">완료된 래플이 없습니다</div>
              </div>
            ) : (
              completedRaffles.map((raffle) => (
                <div key={raffle.id} className="raffle-card completed">
                  <div className="raffle-card-image">
                    <img src={raffle.image} alt={raffle.title} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  <div className="raffle-info">
                    <div className="raffle-status-badge">진행종료</div>
                    <div className="raffle-title">{raffle.title}</div>
                    <div className="raffle-participants">{raffle.participants.toLocaleString()}명 참여 중</div>
                    <button className="raffle-result-btn" onClick={handleResultClick}>
                      결과 상세보기 &gt;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RaffleHistoryScreen;
