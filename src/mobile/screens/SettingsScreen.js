import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsScreen.css';

const WITHDRAW_REASONS = [
  '앱 사용이 불편해요',
  '포인트 사용처가 부족해요',
  '개인정보가 걱정돼요',
  '다른 앱으로 이동해요',
  '잠시 휴식이 필요해요',
  '기타',
];

const SettingsScreen = ({ showToast, onShowBlocked }) => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    withdrawAlert: true,
    eventAlert: true,
    marketingAlert: false
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  // 탈퇴 플로우 단계: 0=없음, 1=경고, 2=설문
  const [withdrawStep, setWithdrawStep] = useState(0);
  const [withdrawReason, setWithdrawReason] = useState('');
  const [withdrawEtcText, setWithdrawEtcText] = useState('');
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    showToast('설정이 저장되었습니다');
  };

  const handleLogout = () => {
    showToast('로그아웃 되었습니다');
    setShowLogoutModal(false);
    setTimeout(() => { window.location.href = '/'; }, 1000);
  };

  const handleWithdrawConfirm = () => {
    showToast('회원 탈퇴가 완료되었습니다');
    setWithdrawStep(0);
    setShowFinalConfirm(false);
    setTimeout(() => { window.location.href = '/'; }, 1500);
  };

  const closeWithdraw = () => {
    setWithdrawStep(0);
    setWithdrawReason('');
    setWithdrawEtcText('');
    setShowFinalConfirm(false);
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
                <input type="checkbox" checked={settings.withdrawAlert} onChange={() => toggleSetting('withdrawAlert')} />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">이벤트 알림</div>
                <div className="setting-desc">래플, 혜택 정보</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.eventAlert} onChange={() => toggleSetting('eventAlert')} />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-label">마케팅 알림</div>
                <div className="setting-desc">프로모션, 광고</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.marketingAlert} onChange={() => toggleSetting('marketingAlert')} />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">약관 및 정책</h3>
          <div className="settings-group">
            <button className="setting-item clickable" onClick={() => navigate('/terms')}>
              <div className="setting-info"><div className="setting-label">이용약관</div></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button className="setting-item clickable" onClick={() => navigate('/privacy')}>
              <div className="setting-info"><div className="setting-label">개인정보처리방침</div></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">계정 관리</h3>
          <div className="settings-group">
            <button className="setting-item clickable" onClick={() => setShowLogoutModal(true)}>
              <div className="setting-info"><div className="setting-label">로그아웃</div></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </button>
            <button className="setting-item clickable danger" onClick={() => setWithdrawStep(1)}>
              <div className="setting-info"><div className="setting-label">회원 탈퇴</div></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="settings-version">앱 버전 1.0.0</div>
      </div>

      {/* 로그아웃 모달 */}
      {showLogoutModal && (
        <div className="settings-modal" onClick={() => setShowLogoutModal(false)}>
          <div className="settings-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-icon">👋</div>
            <div className="settings-modal-title">로그아웃</div>
            <div className="settings-modal-desc">정말 로그아웃 하시겠습니까?</div>
            <div className="settings-modal-buttons">
              <button className="modal-btn secondary" onClick={() => setShowLogoutModal(false)}>취소</button>
              <button className="modal-btn primary" onClick={handleLogout}>로그아웃</button>
            </div>
          </div>
        </div>
      )}

      {/* 탈퇴 1단계: 경고 */}
      {withdrawStep === 1 && (
        <div className="settings-modal" onClick={closeWithdraw}>
          <div className="settings-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-icon">😢</div>
            <div className="settings-modal-title">정말 탈퇴하시겠어요?</div>
            <div className="settings-modal-desc">
              탈퇴 시 보유하신 핀이 모두 소멸되며<br />
              복구가 불가능합니다.
            </div>
            <div className="settings-modal-buttons">
              <button className="modal-btn secondary" onClick={closeWithdraw}>취소</button>
              <button className="modal-btn danger" onClick={() => setWithdrawStep(2)}>계속하기</button>
            </div>
          </div>
        </div>
      )}

      {/* 탈퇴 2단계: 사유 설문 */}
      {withdrawStep === 2 && (
        <div className="settings-modal" onClick={closeWithdraw}>
          <div className="settings-modal-content withdraw-survey" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-x" onClick={closeWithdraw}>✕</button>
            <div className="settings-modal-title" style={{ textAlign: 'left', marginBottom: '6px' }}>
              탈퇴 사유를 알려주세요
            </div>
            <p style={{ fontSize: '13px', color: '#999', marginBottom: '20px' }}>
              소중한 의견을 에이핀 개선에 활용할게요.
            </p>
            <div className="withdraw-reasons">
              {WITHDRAW_REASONS.map((reason) => (
                <label key={reason} className="withdraw-reason-item">
                  <input
                    type="radio"
                    name="withdraw-reason"
                    value={reason}
                    checked={withdrawReason === reason}
                    onChange={() => { setWithdrawReason(reason); if (reason !== '기타') setWithdrawEtcText(''); }}
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
            {withdrawReason === '기타' && (
              <div className="withdraw-etc-wrap">
                <textarea
                  className="withdraw-etc-input"
                  placeholder="불편하셨던 점을 자유롭게 남겨주세요. 에이핀을 개선하는 데 큰 힘이 됩니다."
                  maxLength={100}
                  value={withdrawEtcText}
                  onChange={(e) => setWithdrawEtcText(e.target.value)}
                  autoFocus
                />
                <span className="withdraw-etc-count">{withdrawEtcText.length}/100</span>
              </div>
            )}
            <button
              className="modal-btn danger"
              style={{ width: '100%', marginTop: '20px' }}
              disabled={!withdrawReason}
              onClick={() => setShowFinalConfirm(true)}
            >
              탈퇴하기
            </button>
          </div>
        </div>
      )}

      {/* 탈퇴 최종 확인 팝업 */}
      {showFinalConfirm && (
        <div className="settings-modal" style={{ zIndex: 1100 }} onClick={() => setShowFinalConfirm(false)}>
          <div className="settings-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-title">탈퇴를 진행할까요?</div>
            <div className="settings-modal-desc">
              탈퇴 시 모든 데이터가 삭제되며<br />복구되지 않습니다.
            </div>
            <div className="settings-modal-buttons">
              <button className="modal-btn secondary" onClick={() => setShowFinalConfirm(false)}>취소</button>
              <button className="modal-btn danger" onClick={handleWithdrawConfirm}>탈퇴하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
