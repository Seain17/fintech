import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsScreen.css';

const SettingsScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    withdrawAlert: true,
    eventAlert: true,
    marketingAlert: false
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    showToast('설정이 저장되었습니다');
  };

  const handleLogout = () => {
    showToast('로그아웃 되었습니다');
    setShowLogoutModal(false);
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="screen settings-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">앱 설정</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3 className="settings-section-title">알림 설정</h3>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">출금 알림</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.withdrawAlert}
                  onChange={() => toggleSetting('withdrawAlert')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">이벤트 알림</div>
                <div className="setting-desc">래플, 혜택 정보</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.eventAlert}
                  onChange={() => toggleSetting('eventAlert')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">마케팅 알림</div>
                <div className="setting-desc">프로모션, 광고</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.marketingAlert}
                  onChange={() => toggleSetting('marketingAlert')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">약관 및 정책</h3>
          <div className="settings-group">
            <button className="setting-item clickable" onClick={() => navigate('/terms')}>
              <div className="setting-info">
                <div className="setting-label">이용약관</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            <button className="setting-item clickable" onClick={() => navigate('/privacy')}>
              <div className="setting-info">
                <div className="setting-label">개인정보처리방침</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">계정 관리</h3>
          <div className="settings-group">
            <button className="setting-item clickable" onClick={() => setShowLogoutModal(true)}>
              <div className="setting-info">
                <div className="setting-label">로그아웃</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </button>
            <button className="setting-item clickable danger" onClick={() => setShowWithdrawModal(true)}>
              <div className="setting-info">
                <div className="setting-label">회원 탈퇴</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="settings-modal" onClick={() => setShowLogoutModal(false)}>
          <div className="settings-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-icon">👋</div>
            <div className="settings-modal-title">로그아웃</div>
            <div className="settings-modal-desc">
              정말 로그아웃 하시겠습니까?
            </div>
            <div className="settings-modal-buttons">
              <button className="modal-btn secondary" onClick={() => setShowLogoutModal(false)}>
                취소
              </button>
              <button className="modal-btn primary" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="settings-modal" onClick={() => setShowWithdrawModal(false)}>
          <div className="settings-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-icon">😢</div>
            <div className="settings-modal-title">회원 탈퇴</div>
            <div className="settings-modal-desc">
              탈퇴 시 모든 핀이 소멸되며<br />
              복구가 불가능합니다.<br /><br />
              정말 탈퇴하시겠습니까?
            </div>
            <div className="settings-modal-buttons">
              <button className="modal-btn secondary" onClick={() => setShowWithdrawModal(false)}>
                취소
              </button>
              <button className="modal-btn danger" onClick={() => {
                showToast('회원 탈퇴가 완료되었습니다');
                setShowWithdrawModal(false);
              }}>
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
