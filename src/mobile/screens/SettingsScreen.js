import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsScreen.css';

const SettingsScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    pushMarketing: true,
    smsMarketing: false,
    emailMarketing: true
  });
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    showToast('설정이 저장되었습니다');
  };

  return (
    <div className="screen settings-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">설정</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3 className="settings-section-title">알림 설정</h3>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">마케팅 푸시 알림</div>
                <div className="setting-desc">이벤트, 혜택 정보</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.pushMarketing}
                  onChange={() => toggleSetting('pushMarketing')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">마케팅 SMS 수신</div>
                <div className="setting-desc">문자 메시지 수신</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.smsMarketing}
                  onChange={() => toggleSetting('smsMarketing')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">마케팅 이메일 수신</div>
                <div className="setting-desc">뉴스레터, 프로모션</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.emailMarketing}
                  onChange={() => toggleSetting('emailMarketing')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">계정 관리</h3>
          <div className="settings-group">
            <button className="setting-item danger" onClick={() => setShowWithdrawModal(true)}>
              <span>회원 탈퇴</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showWithdrawModal && (
        <div className="modal active" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">😢</div>
            <div className="modal-title">회원 탈퇴</div>
            <div className="modal-desc">
              탈퇴 시 모든 포인트가 소멸되며<br />
              복구가 불가능합니다.<br /><br />
              정말 탈퇴하시겠습니까?
            </div>
            <button className="btn-secondary" onClick={() => setShowWithdrawModal(false)}>
              취소
            </button>
            <button className="modal-btn danger" style={{ background: 'var(--error)', marginTop: '8px' }} onClick={() => showToast('탈퇴가 취소되었습니다')}>
              탈퇴하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
