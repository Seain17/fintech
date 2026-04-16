import React, { useState, useEffect, useRef } from 'react';
import './SmsVerification.css';

const MAX_ATTEMPTS = 3;

const SmsVerification = ({
  onSuccess,
  onClose,
  title = '휴대폰 본인인증',
  subtitle = '인증번호를 받을 휴대폰 번호를 입력해주세요.',
  submitText = '인증하기',
}) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [timer, setTimer] = useState(180);
  const [attempts, setAttempts] = useState(0);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [sentMsg, setSentMsg] = useState(false);
  const timerRef = useRef(null);

  const phoneRaw = phone.replace(/-/g, '');
  const attemptsExhausted = attempts >= MAX_ATTEMPTS;

  const formatPhone = (value) => {
    const n = value.replace(/[^0-9]/g, '');
    if (n.length <= 3) return n;
    if (n.length <= 7) return `${n.slice(0, 3)}-${n.slice(3)}`;
    return `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7, 11)}`;
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(180);
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRequestCode = () => {
    if (phoneRaw.length < 10 || attemptsExhausted) return;
    setAttempts(prev => prev + 1);
    setCodeSent(true);
    setSentMsg(true);
    startTimer();
  };

  const handleVerify = () => {
    if (code.length === 6 && privacyAgreed) {
      if (timerRef.current) clearInterval(timerRef.current);
      onSuccess();
    }
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const canRequest = phoneRaw.length >= 10 && !attemptsExhausted;
  const canVerify = code.length === 6 && privacyAgreed;

  return (
    <div className="sms-verification">
      <h2 className="sms-title">{title}</h2>
      <p className="sms-subtitle">{subtitle}</p>

      {/* 전화번호 */}
      <div className="sms-field">
        <label className="sms-label">휴대전화번호</label>
        <div className="sms-row">
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(formatPhone(e.target.value))}
            placeholder="010-0000-0000"
            maxLength={13}
            className="sms-input"
          />
          <button
            className="sms-request-btn"
            onClick={handleRequestCode}
            disabled={!canRequest}
          >
            {codeSent ? '재요청' : '인증요청'}
          </button>
        </div>
        {sentMsg && !attemptsExhausted && (
          <p className="sms-hint success">인증번호가 발송되었습니다. ({attempts}/{MAX_ATTEMPTS}회)</p>
        )}
        {attemptsExhausted && (
          <p className="sms-hint error">인증 요청 횟수를 초과했습니다.</p>
        )}
      </div>

      {/* 인증번호 */}
      {codeSent && (
        <div className="sms-field">
          <label className="sms-label">인증번호</label>
          <div className="sms-row">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              placeholder="6자리 입력"
              maxLength={6}
              className="sms-input"
              autoFocus
            />
            <span className="sms-timer">{formatTimer(timer)}</span>
          </div>
        </div>
      )}

      {/* 개인정보 동의 */}
      <div className="sms-privacy-row">
        <label className="sms-privacy-label" onClick={() => setPrivacyAgreed(v => !v)}>
          <div className={`sms-checkbox ${privacyAgreed ? 'checked' : ''}`}>
            {privacyAgreed && (
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <span>개인정보 수집·이용 동의</span>
          <span className="sms-required">(필수)</span>
        </label>
        <button className="sms-privacy-detail-btn" onClick={() => setShowPrivacy(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* 인증 버튼 */}
      <button className="sms-submit-btn" onClick={handleVerify} disabled={!canVerify}>
        {submitText}
      </button>

      {onClose && (
        <button className="sms-cancel-btn" onClick={onClose}>취소</button>
      )}

      {/* 개인정보 상세 오버레이 */}
      {showPrivacy && (
        <div className="sms-privacy-overlay" onClick={() => setShowPrivacy(false)}>
          <div className="sms-privacy-sheet" onClick={e => e.stopPropagation()}>
            <div className="sms-privacy-sheet-header">
              <h3>개인정보 수집·이용 동의</h3>
              <button onClick={() => setShowPrivacy(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="sms-privacy-sheet-body">
              <p><strong>1. 수집하는 개인정보 항목</strong><br />• 필수항목: 휴대전화번호, 본인인증 정보(CI, DI)</p>
              <p><strong>2. 수집 및 이용목적</strong><br />
                • 회원 가입 및 본인 확인<br />
                • 상품 교환 및 발송<br />
                • 출금 신청 및 처리<br />
                • 휴면 계정 복구<br />
                • 서비스 이용 기록 관리
              </p>
              <p><strong>3. 보유 및 이용기간</strong><br />• 회원 탈퇴 시 또는 동의 철회 시까지<br />• 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간까지</p>
              <p><strong>4. 동의 거부권</strong><br />필수 항목에 대한 동의를 거부하실 경우 서비스 이용이 제한될 수 있습니다.</p>
            </div>
            <div className="sms-privacy-sheet-footer">
              <button className="sms-privacy-agree-btn" onClick={() => { setPrivacyAgreed(true); setShowPrivacy(false); }}>
                동의하고 계속하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmsVerification;
