import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RaffleDetailScreen.css';

const RaffleDetailScreen = ({ userTickets = 5, updateTickets, showToast }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [currentTickets, setCurrentTickets] = useState(userTickets);

  const raffleData = {
    id: 1,
    name: '애플 에어팟 프로 2',
    image: '🎧',
    ticketCost: 1,
    participants: 234,
    dueDate: '2026-01-30',
    announceDate: '2026-01-31',
    description: '애플 에어팟 프로 2세대 (새 제품)\n노이즈 캔슬링 기능이 탑재된 무선 이어폰입니다.',
    color: 'linear-gradient(135deg, #1a2e71 0%, #2d4a8c 100%)'
  };

  const handleEnter = () => {
    if (currentTickets < ticketCount) {
      showToast('응모권이 부족합니다');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmEnter = () => {
    setCurrentTickets(prev => prev - ticketCount);
    if (updateTickets) {
      updateTickets(-ticketCount);
    }
    setShowConfirmModal(false);
    showToast('🎉 응모 완료! 행운을 빕니다!');
    setTimeout(() => navigate('/benefits'), 1500);
  };

  const increaseTicket = () => {
    if (ticketCount < currentTickets) {
      setTicketCount(prev => prev + 1);
    }
  };

  const decreaseTicket = () => {
    if (ticketCount > 1) {
      setTicketCount(prev => prev - 1);
    }
  };

  return (
    <div className="screen raffle-detail-screen">
      <div className="raffle-detail-header" style={{ background: raffleData.color }}>
        <button className="page-back-btn white" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="raffle-image-large">{raffleData.image}</div>
      </div>

      <div className="raffle-detail-content">
        <div className="raffle-detail-info">
          <div className="raffle-badge-row">
            <div className="raffle-tag hot">🔥 인기</div>
            <div className="raffle-tag dday">D-2</div>
          </div>
          <h1 className="raffle-name">{raffleData.name}</h1>
          <div className="raffle-meta">
            <span>🎟️ 응모권 1장당 1회 응모</span>
            <span>👥 {raffleData.participants}명 참여중</span>
          </div>
          <div className="my-tickets">
            <span>보유 응모권</span>
            <span className="ticket-count">{currentTickets}장</span>
          </div>
        </div>

        <div className="raffle-section">
          <h3 className="section-title">📅 일정</h3>
          <div className="info-card">
            <div className="info-row">
              <span className="info-label">응모 마감</span>
              <span className="info-value">{raffleData.dueDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">당첨자 발표</span>
              <span className="info-value">{raffleData.announceDate}</span>
            </div>
          </div>
        </div>

        <div className="raffle-section">
          <h3 className="section-title">📦 상품 설명</h3>
          <div className="info-card">
            <p className="raffle-description">{raffleData.description}</p>
          </div>
        </div>

        <div className="raffle-section">
          <h3 className="section-title">⚠️ 유의사항</h3>
          <div className="info-card">
            <ul className="notice-list">
              <li>응모 후 취소가 불가능합니다</li>
              <li>중복 응모 가능하며, 응모권 수에 비례하여 당첨 확률이 높아집니다</li>
              <li>당첨자는 앱 알림 및 이메일로 안내됩니다</li>
              <li>경품 수령 기한 내 미수령 시 당첨이 취소됩니다</li>
            </ul>
          </div>
        </div>

        <div className="raffle-enter-section">
          <div className="ticket-selector">
            <span className="ticket-label">사용할 응모권</span>
            <div className="ticket-counter">
              <button className="counter-btn" onClick={decreaseTicket} disabled={ticketCount <= 1}>-</button>
              <span className="counter-value">{ticketCount}</span>
              <button className="counter-btn" onClick={increaseTicket} disabled={ticketCount >= currentTickets}>+</button>
            </div>
          </div>
          <button className="btn-primary" onClick={handleEnter} disabled={currentTickets < 1}>
            {ticketCount}장으로 응모하기
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="modal active" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🎟️</div>
            <div className="modal-title">경품 응모</div>
            <div className="modal-desc">
              {raffleData.name}에<br />
              응모권 {ticketCount}장을 사용하여 응모하시겠습니까?
            </div>
            <button className="modal-btn" onClick={confirmEnter}>응모하기</button>
            <button className="btn-secondary" onClick={() => setShowConfirmModal(false)} style={{ marginTop: '8px' }}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaffleDetailScreen;
