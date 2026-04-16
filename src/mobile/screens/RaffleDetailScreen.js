import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RaffleDetailScreen.css';
import { iPadProBanner } from '../components/AdBanner';
import '../components/AdBanner.css';
import { PinIcon } from '../../shared/components';

const RaffleDetailScreen = ({ userTickets = 1, userPoints = 3520, updateTickets, showToast }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [currentTickets, setCurrentTickets] = useState(userTickets);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [myEntryCount, setMyEntryCount] = useState(7);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  // 카운트다운 타이머
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 59,
    minutes: 1,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const raffleData = {
    id: id || 1,
    name: '애플 에어팟 프로 2',
    winnerCount: 10,
    image: '/images/raffle/img-product-01.png',
    participants: 297953,
    entryPeriod: '07월 01일 ~ 07월 14일',
    announceDate: '07월 15일 10시',
    winners: 1,
  };

  const entryOptions = [
    { type: 'ticket', amount: 1, label: '1장' },
    { type: 'ticket', amount: 5, label: '5장' },
    { type: 'ticket', amount: 10, label: '10장' },
    { type: 'pin', amount: 50, label: '50 핀', ticketEquiv: 1 },
    { type: 'pin', amount: 250, label: '250 핀', ticketEquiv: 5 },
    { type: 'pin', amount: 500, label: '500 핀', ticketEquiv: 10 },
  ];

  const handleOpenEntry = () => {
    setShowEntryModal(true);
    setSelectedEntry(null);
  };

  const handleSelectEntry = (option) => {
    if (option.type === 'ticket' && currentTickets < option.amount) {
      return;
    }
    if (option.type === 'pin' && userPoints < option.amount) {
      return;
    }
    setSelectedEntry(option);
  };

  const handleConfirmEntry = () => {
    if (!selectedEntry) return;

    if (selectedEntry.type === 'ticket') {
      setCurrentTickets(prev => prev - selectedEntry.amount);
      if (updateTickets) {
        updateTickets(-selectedEntry.amount);
      }
      setMyEntryCount(prev => prev + selectedEntry.amount);
    } else {
      setMyEntryCount(prev => prev + selectedEntry.ticketEquiv);
    }

    setShowEntryModal(false);
    setShowCompleteModal(true);
  };

  const handleCloseComplete = () => {
    setShowCompleteModal(false);
  };

  const handleWatchAd = (type) => {
    showToast('광고 재생 중...');
    setTimeout(() => {
      setCurrentTickets(prev => prev + 1);
      showToast('응모권 1장을 획득했습니다!');
    }, 2000);
  };

  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
    showToast(notificationEnabled ? '알림이 해제되었습니다' : '알림이 설정되었습니다');
  };

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className="screen raffle-detail-screen">
      {/* 헤더 */}
      <div className="raffle-detail-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="header-title">경품 응모</h1>
        <div className="header-space" />
      </div>

      <div className="raffle-detail-content">
        {/* 상품 이미지 */}
        <div className="raffle-product-image">
          <img src={raffleData.image} alt={raffleData.name} onError={(e) => { e.target.style.display = 'none'; }} />
        </div>

        {/* 상품명 */}
        <h2 className="raffle-product-name">
          {raffleData.name} [{raffleData.winnerCount}명]
        </h2>

        {/* 참여 정보 */}
        <div className="raffle-participation-info">
          <span className="participants-count">{raffleData.participants.toLocaleString()}명 참여</span>
          <span className="separator">|</span>
          <span className="my-entry-count">내 응모 {myEntryCount}회</span>
        </div>

        {/* 카운트다운 */}
        <div className="raffle-countdown">
          <div className="countdown-item">
            <span className="countdown-value">{formatNumber(timeLeft.days)}</span>
            <span className="countdown-label">DAY</span>
          </div>
          <span className="countdown-separator">:</span>
          <div className="countdown-item">
            <span className="countdown-value">{formatNumber(timeLeft.hours)}</span>
            <span className="countdown-label">HH</span>
          </div>
          <span className="countdown-separator">:</span>
          <div className="countdown-item">
            <span className="countdown-value">{formatNumber(timeLeft.minutes)}</span>
            <span className="countdown-label">MM</span>
          </div>
          <span className="countdown-separator">:</span>
          <div className="countdown-item">
            <span className="countdown-value">{formatNumber(timeLeft.seconds)}</span>
            <span className="countdown-label">SS</span>
          </div>
        </div>

        {/* 일정 정보 */}
        <div className="raffle-schedule">
          <div className="schedule-row">
            <span className="schedule-label">응모 기간</span>
            <span className="schedule-value">{raffleData.entryPeriod}</span>
          </div>
          <div className="schedule-row">
            <span className="schedule-label">발표일시</span>
            <span className="schedule-value highlight">{raffleData.announceDate}</span>
          </div>
          <div className="schedule-row">
            <span className="schedule-label">당첨인원</span>
            <span className="schedule-value">{raffleData.winners}명</span>
          </div>
        </div>

        {/* 보유 응모권 */}
        <div className="raffle-my-tickets">
          <span className="my-tickets-label">전체 보유 응모권</span>
          <div className="my-tickets-value">
            <img src="/images/icons/img-ticket-03-on.png" alt="응모권" className="ticket-img" />
            <span className="ticket-count">{currentTickets}장</span>
          </div>
        </div>

        {/* 응모권 미션 */}
        <div className="raffle-mission-section">
          <h3 className="mission-title">응모권이 부족하신가요?</h3>

          <div className="mission-item" onClick={() => handleWatchAd('normal')}>
            <div className="mission-content">
              <span className="mission-name">일반 영상 보고 응모권 받기</span>
              <span className="mission-sub">응모권 3개</span>
            </div>
            <button className="mission-btn">3개 받기</button>
          </div>

          <div className="mission-item" onClick={() => handleWatchAd('reward')}>
            <div className="mission-content">
              <span className="mission-name">30초 영상 보고 응모권 획득</span>
              <span className="mission-sub">응모권 3개</span>
            </div>
            <div className="mission-timer-wrap">
              <div className="mission-timer">00:00</div>
              <span className="mission-timer-label">다음 미션까지</span>
            </div>
          </div>
        </div>

        {/* 광고 배너 */}
        {iPadProBanner()}

        {/* 알림 설정 */}
        <div className="raffle-notification" onClick={toggleNotification}>
          <div className="notification-content">
            <span className="notification-title">경품 최대한 많이 응모하는법!</span>
            <span className="notification-desc">1시간마다 응모권 잊지 않게 챙겨드릴게요!</span>
          </div>
          <button className={`notification-btn ${notificationEnabled ? 'active' : ''}`}>
            알림 받기
          </button>
        </div>


        {/* 이전 응모 현황 */}
        <button className="raffle-history-link" onClick={() => navigate('/raffle-history')}>
          <span>이전 응모 현황보기</span>
          <span className="arrow">›</span>
        </button>

        {/* 유의사항 */}
        <div className="raffle-notice">
          <h3 className="notice-title">유의사항</h3>
          <ul className="notice-list">
            <li>응모권 미션은 1시간에 한 번 가능합니다.</li>
            <li>매주 월요일 새로운 경품 이벤트가 진행됩니다.</li>
            <li>당첨자에 한하여 연락 드리며, 미 당첨자에게는 별도의 연락을 드리지 않습니다.</li>
            <li>회원정보가 일치하지 않거나 부당한 방법으로 응모한 고객의 경우 당첨이 자동 취소되며, 추후 이벤트 응모 시 불이익을 받을 수 있습니다.</li>
          </ul>
        </div>
      </div>

      {/* 하단 응모하기 버튼 */}
      <div className="raffle-bottom-btn">
        <button className="btn-entry" onClick={handleOpenEntry}>
          응모하기
        </button>
        <div className="raffle-remaining-time">
          종료까지 {timeLeft.days}일 {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)} 남음
        </div>
      </div>

      {/* 응모 팝업 */}
      {showEntryModal && (
        <div className="modal active" onClick={() => setShowEntryModal(false)}>
          <div className="modal-content entry-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowEntryModal(false)}>✕</button>
            <h2 className="modal-title">응모하기</h2>

            <div className="entry-info">
              <div className="entry-info-row">
                <span>보유 응모권 :</span>
                <span>{currentTickets}장</span>
              </div>
              <div className="entry-info-row">
                <span>보유 핀 :</span>
                <span className="pin-display"><PinIcon size="small" />{userPoints.toLocaleString()}</span>
              </div>
            </div>

            <div className="entry-options">
              {entryOptions.slice(0, 3).map((option, index) => (
                <button
                  key={index}
                  className={`entry-option ${selectedEntry === option ? 'selected' : ''} ${currentTickets < option.amount ? 'disabled' : ''}`}
                  onClick={() => handleSelectEntry(option)}
                  disabled={currentTickets < option.amount}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="entry-options">
              {entryOptions.slice(3).map((option, index) => (
                <button
                  key={index}
                  className={`entry-option pin ${selectedEntry === option ? 'selected' : ''} ${userPoints < option.amount ? 'disabled' : ''}`}
                  onClick={() => handleSelectEntry(option)}
                  disabled={userPoints < option.amount}
                >
                  <span>{option.label}</span>
                  <span className="entry-equiv">({option.ticketEquiv}장 응모)</span>
                </button>
              ))}
            </div>

            {currentTickets === 0 && (
              <div className="entry-warning">
                응모권이 부족해요.<br />
                광고를 보고 추가로 획득해 보세요!
              </div>
            )}

            <button
              className={`btn-entry-confirm ${!selectedEntry ? 'disabled' : ''}`}
              onClick={handleConfirmEntry}
              disabled={!selectedEntry}
            >
              {selectedEntry ? `${selectedEntry.type === 'ticket' ? selectedEntry.amount + '장' : selectedEntry.ticketEquiv + '장'} 응모하기` : '응모하기'}
            </button>
          </div>
        </div>
      )}

      {/* 응모 완료 팝업 */}
      {showCompleteModal && (
        <div className="modal active" onClick={handleCloseComplete}>
          <div className="modal-content complete-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseComplete}>✕</button>
            <h2 className="modal-title">응모하기</h2>
            <p className="complete-message">응모가 완료되었습니다.</p>
            <button className="btn-confirm" onClick={handleCloseComplete}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaffleDetailScreen;
