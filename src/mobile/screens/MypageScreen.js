import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MypageScreen.css';

const MypageScreen = ({ userPoints, showToast, unreadCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="screen mypage-screen">
      {/* 앱바 */}
      <div className="mypage-appbar">
        <div className="mypage-logo">LOGO</div>
        <button className="mypage-noti-btn" onClick={() => navigate('/notifications')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && <span className="mypage-noti-badge">{unreadCount}</span>}
        </button>
      </div>

      <div className="mypage-header">
        <div className="profile-section">
          <div className="profile-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div>
            <div className="profile-name">홍길동</div>
            <div className="profile-email">hong@email.com</div>
          </div>
                  </div>

        <div className="mypage-points">
          <div className="mypage-point-row">
            <span>보유 핀</span>
            <span className="mypage-point-value">{userPoints.toLocaleString()}핀</span>
          </div>
          <div className="mypage-actions">
            <button className="mypage-action-btn withdraw" onClick={() => navigate('/withdraw')}>출금</button>
            <button className="mypage-action-btn exchange" onClick={() => showToast('기프티콘 교환')}>교환</button>
          </div>
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
            <span>핀 적립 내역</span>
            <span>›</span>
          </button>
        </div>

        <div className="mypage-menu-section">
          <div className="mypage-menu-section-title">혜택</div>
          <button className="mypage-menu-item" onClick={() => navigate('/raffle-history')}>
            <div className="mypage-menu-icon">🎰</div>
            <span>경품 내역</span>
            <span>›</span>
          </button>
          <button className="mypage-menu-item" onClick={() => navigate('/shopping-history')}>
            <div className="mypage-menu-icon">🛒</div>
            <span>쇼핑적립 내역</span>
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
