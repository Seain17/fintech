import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RaffleHistoryScreen.css';

// 진행 중인 래플
const ongoingRaffles = [
  { id: 1, title: '애플 에어팟 프로 2', image: null, participants: 45234, daysLeft: 8, timeLeft: '20:41:53' },
  { id: 2, title: '아이폰 15 Pro Max', image: null, participants: 1234, daysLeft: 12, timeLeft: '20:41:53' },
];

// 진행 완료된 래플
const completedRaffles = [
  { id: 3, title: '애플 에어팟 프로 2', image: null, endDate: '2026-01-20' },
  { id: 4, title: '애플 에어팟 프로 2', image: null, endDate: '2026-01-15' },
  { id: 5, title: '애플 에어팟 프로 2', image: null, endDate: '2026-01-10' },
  { id: 6, title: '애플 에어팟 프로 2', image: null, endDate: '2026-01-05' },
];

const RaffleHistoryScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing'); // ongoing, completed
  const [dateFilter, setDateFilter] = useState('month');

  const handleResultClick = (raffleId) => {
    // 당첨자 안내페이지 링크로 연결
    showToast && showToast('당첨자 명단 페이지로 이동합니다');
  };

  return (
    <div className="screen raffle-history-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">경품 응모 내역</h1>
      </div>

      {/* 탭 영역 */}
      <div className="raffle-tabs">
        <button
          className={`raffle-tab ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          진행 중
        </button>
        <button
          className={`raffle-tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          진행 완료
        </button>
      </div>

      <div className="raffle-content">
        {/* 진행 완료 탭일 때 날짜 필터 */}
        {activeTab === 'completed' && (
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
        )}

        {/* 진행 중 리스트 */}
        {activeTab === 'ongoing' && (
          <div className="raffle-list">
            {ongoingRaffles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎁</div>
                <div className="empty-text">참여 중인 래플이 없습니다</div>
              </div>
            ) : (
              ongoingRaffles.map((raffle) => (
                <div key={raffle.id} className="raffle-card ongoing">
                  <div className="raffle-image-placeholder">
                    {raffle.image ? (
                      <img src={raffle.image} alt={raffle.title} />
                    ) : (
                      <div className="placeholder-icon">🎁</div>
                    )}
                  </div>
                  <div className="raffle-info">
                    <div className="raffle-deadline">
                      마감까지 {raffle.daysLeft}일 {raffle.timeLeft} 남음
                    </div>
                    <div className="raffle-title">{raffle.title}</div>
                    <div className="raffle-participants">
                      {raffle.participants.toLocaleString()}명 참여 중
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 진행 완료 리스트 */}
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
                  <div className="raffle-image-placeholder">
                    {raffle.image ? (
                      <img src={raffle.image} alt={raffle.title} />
                    ) : (
                      <div className="placeholder-icon">🎁</div>
                    )}
                  </div>
                  <div className="raffle-info">
                    <div className="raffle-status-badge">진행 종료</div>
                    <div className="raffle-title">{raffle.title}</div>
                    <button
                      className="raffle-result-btn"
                      onClick={() => handleResultClick(raffle.id)}
                    >
                      응모결과
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
