import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotificationScreen.css';

const initialNotifications = [
  {
    id: 1,
    icon: '🎁',
    title: '출석체크 보너스 적립 완료',
    message: '매일 출석체크하고 핀 받아가세요!',
    time: '방금 전',
    isRead: false,
  },
  {
    id: 2,
    icon: '🎉',
    title: '이번 주 경품 당첨자 발표',
    message: '에어팟 프로 경품 결과가 발표되었습니다.',
    time: '10분 전',
    isRead: false,
    isNew: true,
  },
  {
    id: 3,
    icon: '💸',
    title: '출금 신청이 완료되었습니다',
    message: '신청 내역을 확인해 보세요.',
    time: '1시간 전',
    isRead: false,
  },
  {
    id: 4,
    icon: '🎰',
    title: '새로운 경품이 오픈되었어요',
    message: '아이폰 15 Pro 경품이 시작되었습니다.',
    time: '3시간 전',
    isRead: true,
  },
  {
    id: 5,
    icon: '💡',
    title: '금융 퀴즈 보상 지급',
    message: '퀴즈 정답 보상 30핀이 지급되었습니다.',
    time: '어제',
    isRead: true,
  },
];

const NotificationScreen = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleNotificationClick = (noti) => {
    setNotifications(prev =>
      prev.map(n => n.id === noti.id ? { ...n, isRead: true } : n)
    );
    navigate(`/notification/${noti.id}`);
  };

  const handleReadAll = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="screen notification-screen">
      {/* 스테이터스바 영역 */}
      <div className="noti-statusbar" />

      {/* 헤더 */}
      <div className="noti-header">
        <button className="noti-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="noti-header-title">알림</h1>
        {unreadCount > 0 && (
          <button className="noti-read-all-btn" onClick={handleReadAll}>
            모두 읽음
          </button>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="noti-content-area">
        {unreadCount > 0 && (
          <div className="noti-summary">
            <div className="noti-summary-icon">🔔</div>
            <div className="noti-summary-text">
              <span className="noti-summary-count">{unreadCount}개</span>의 새로운 알림이 있어요
            </div>
          </div>
        )}

        <div className="noti-list">
          {notifications.length === 0 ? (
            <div className="noti-empty">
              <div className="noti-empty-icon">🔔</div>
              <div className="noti-empty-title">알림이 없습니다</div>
              <div className="noti-empty-desc">새로운 소식이 오면 알려드릴게요</div>
            </div>
          ) : (
            notifications.map(noti => (
              <div
                key={noti.id}
                className={`noti-item ${!noti.isRead ? 'unread' : ''}`}
                onClick={() => handleNotificationClick(noti)}
              >
                <div className={`noti-item-icon ${!noti.isRead ? 'active' : ''}`}>
                  {noti.icon}
                </div>
                <div className="noti-item-content">
                  <div className="noti-item-title">
                    {noti.title}
                    {noti.isNew && <span className="noti-new-badge">NEW</span>}
                  </div>
                  <div className="noti-item-message">{noti.message}</div>
                  <div className="noti-item-time">{noti.time}</div>
                </div>
                <div className="noti-item-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
                {!noti.isRead && <div className="noti-item-dot" />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen;
