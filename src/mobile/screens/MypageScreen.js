import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MypageScreen.css';
import { AppLogo } from '../../shared/components';

const MypageScreen = ({ userPoints, showToast, unreadCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="screen mypage-screen">
      {/* 앱바 */}
      <div className="mypage-appbar">
        <AppLogo />
        <button className="mypage-noti-btn" onClick={() => navigate('/notifications')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && <span className="mypage-noti-badge">{unreadCount}</span>}
        </button>
      </div>

      <div className="mypage-header">
        <div className="profile-section">
          <div className="profile-name-row">
            <span className="profile-name">홍길동</span>
            <button className="profile-edit-btn" onClick={() => navigate('/nickname-edit')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mypage-actions">
          <button className="mypage-action-btn withdraw" onClick={() => navigate('/withdraw')}>출금</button>
          <button className="mypage-action-btn exchange" onClick={() => navigate('/exchange')}>교환</button>
        </div>
      </div>

      <div className="mypage-menu">
        <div className="mypage-menu-section">
          <div className="mypage-menu-section-title">핀</div>
          <button className="mypage-menu-item" onClick={() => navigate('/withdraw-history')}>
            <div className="mypage-menu-icon">📋</div>
            <span>출금 내역</span>
            <span>›</span>
          </button>
          <button className="mypage-menu-item" onClick={() => navigate('/point-history')}>
            <div className="mypage-menu-icon">📊</div>
            <span>핀 내역</span>
            <span>›</span>
          </button>
        </div>

        <div className="mypage-menu-section">
          <div className="mypage-menu-section-title">혜택</div>
          <button className="mypage-menu-item" onClick={() => navigate('/raffle-history')}>
            <div className="mypage-menu-icon">🎁</div>
            <span>경품 응모 내역</span>
            <span>›</span>
          </button>
        </div>

        <div className="mypage-menu-section">
          <div className="mypage-menu-section-title">고객지원</div>
          <button className="mypage-menu-item" onClick={() => navigate('/inquiry')}>
            <div className="mypage-menu-icon">💬</div>
            <span>1:1 문의</span>
            <span>›</span>
          </button>
          <button className="mypage-menu-item" onClick={() => navigate('/faq')}>
            <div className="mypage-menu-icon">❓</div>
            <span>자주 묻는 질문</span>
            <span>›</span>
          </button>
          <button className="mypage-menu-item" onClick={() => navigate('/notice')}>
            <div className="mypage-menu-icon">📢</div>
            <span>공지사항</span>
            <span>›</span>
          </button>
        </div>

        <div className="mypage-menu-section">
          <button className="mypage-menu-item" onClick={() => navigate('/settings')}>
            <div className="mypage-menu-icon">⚙️</div>
            <span>앱 설정</span>
            <span>›</span>
          </button>
        </div>

        <div className="mypage-footer">
          <div className="app-version">앱 버전 1.0.0</div>
        </div>
      </div>
    </div>
  );
};

export default MypageScreen;
