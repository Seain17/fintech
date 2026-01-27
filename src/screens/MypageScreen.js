import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MypageScreen.css';

const MypageScreen = ({ userPoints, showToast }) => {
  const navigate = useNavigate();
  
  return (
    <div className="screen mypage-screen">
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
            <span>보유 포인트</span>
            <span className="mypage-point-value">{userPoints.toLocaleString()} P</span>
          </div>
          <div className="mypage-actions">
            <button className="mypage-action-btn withdraw" onClick={() => navigate('/withdraw')}>출금</button>
            <button className="mypage-action-btn exchange" onClick={() => showToast('기프티콘 교환')}>교환</button>
          </div>
        </div>
      </div>
      <div className="mypage-menu">
        <div className="mypage-menu-section">
          <div className="mypage-menu-section-title">포인트 관리</div>
          <button className="mypage-menu-item" onClick={() => navigate('/withdraw')}>
            <div className="mypage-menu-icon">💰</div>
            <span>출금 신청</span>
            <span>›</span>
          </button>
          <button className="mypage-menu-item" onClick={() => navigate('/withdraw-history')}>
            <div className="mypage-menu-icon">📋</div>
            <span>출금 내역</span>
            <span>›</span>
          </button>
          <button className="mypage-menu-item" onClick={() => navigate('/point-history')}>
            <div className="mypage-menu-icon">📊</div>
            <span>포인트 내역</span>
            <span>›</span>
          </button>
        </div>

        <div className="mypage-menu-section">
          <div className="mypage-menu-section-title">이벤트</div>
          <button className="mypage-menu-item" onClick={() => navigate('/raffle-history')}>
            <div className="mypage-menu-icon">🎰</div>
            <span>응모 내역</span>
            <span>›</span>
          </button>
          <button className="mypage-menu-item" onClick={() => navigate('/winner-history')}>
            <div className="mypage-menu-icon">🏆</div>
            <span>당첨 내역</span>
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
          <button className="mypage-menu-item" onClick={() => navigate('/notice')}>
            <div className="mypage-menu-icon">📢</div>
            <span>공지사항</span>
            <span>›</span>
          </button>
        </div>

        <div className="mypage-menu-section">
          <div className="mypage-menu-section-title">기타</div>
          <button className="mypage-menu-item" onClick={() => navigate('/settings')}>
            <div className="mypage-menu-icon">⚙️</div>
            <span>설정</span>
            <span>›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MypageScreen;
