import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WithdrawDetailScreen.css';
import { PinAmount, SmsVerification } from '../../shared/components';

const WithdrawDetailScreen = ({ userPoints = 51250, showToast }) => {
  const navigate = useNavigate();

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [ssn1, setSsn1] = useState('');
  const [ssn2, setSsn2] = useState('');
  const [showSsnInfo, setShowSsnInfo] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [agreements, setAgreements] = useState({
    fee: false,
    tax: false,
    schedule: false,
    responsibility: false
  });

  const banks = [
    '하나은행', '신한은행', '카카오뱅크', '국민은행',
    '농협은행', '기업은행', '우리은행', '토스뱅크'
  ];

  const amountOptions = [
    { label: '5천원', value: 5000, pin: 50000 },
    { label: '1만원', value: 10000, pin: 100000 },
    { label: '3만원', value: 30000, pin: 300000 },
    { label: '5만원', value: 50000, pin: 500000 },
  ];

  const toggleAgreement = (key) => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allAgreed = Object.values(agreements).every(v => v);
  const isFormValid = selectedAmount && bank && accountNumber.length >= 7 && accountHolder && ssn1.length === 6 && ssn2.length === 1 && allAgreed;

  const handleSubmit = () => {
    if (!isFormValid) {
      showToast('모든 정보를 입력해주세요');
      return;
    }
    setShowSmsModal(true);
  };

  const handleWithdrawComplete = () => {
    setShowSmsModal(false);
    showToast('출금 신청이 완료되었습니다');
    navigate('/mypage');
  };

  return (
    <div className="screen withdraw-detail-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">출금하기</h1>
      </div>

      <div className="withdraw-content">
        {/* 보유 핀 */}
        <div className="withdraw-balance">
          <span className="balance-label">보유 핀</span>
          <PinAmount amount={userPoints} size="large" className="balance-value" />
        </div>

        {/* 출금 금액 선택 */}
        <div className="form-section">
          <label className="form-label">출금 금액 *</label>
          <div className="amount-buttons">
            {amountOptions.map((option) => (
              <button
                key={option.value}
                className={`amount-btn ${selectedAmount === option.value ? 'active' : ''} ${userPoints < option.pin ? 'disabled' : ''}`}
                onClick={() => userPoints >= option.pin && setSelectedAmount(option.value)}
                disabled={userPoints < option.pin}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="form-helper">최소 50,000핀 부터 출금 가능합니다.</div>
        </div>

        {/* 은행 선택 */}
        <div className="form-section">
          <label className="form-label">은행 선택 * <span className="required-hint">*필수 입력 정보</span></label>
          <select
            className="form-select"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          >
            <option value="">은행 선택</option>
            {banks.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* 계좌번호 */}
        <div className="form-section">
          <label className="form-label">계좌번호 *</label>
          <input
            type="text"
            className={`form-input ${accountNumber && accountNumber.length < 7 ? 'error' : ''}`}
            placeholder="'-' 없이 숫자만 입력"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))}
          />
          {accountNumber && accountNumber.length < 7 && (
            <div className="form-error">*계좌번호를 잘못 입력하셨습니다.</div>
          )}
        </div>

        {/* 예금주 */}
        <div className="form-section">
          <label className="form-label">예금주 *</label>
          <input
            type="text"
            className="form-input"
            placeholder="예금주명 입력"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
          />
          <div className="form-helper">계좌의 예금주명과 일치해야 합니다</div>
        </div>

        {/* 주민등록번호 */}
        <div className="form-section">
          <label className="form-label">
            주민등록번호 7자리*
            <button className="ssn-info-btn" onClick={() => setShowSsnInfo(true)}>
              ⓘ 왜 주민등록번호를 입력하나요?
            </button>
          </label>
          <div className="ssn-input-row">
            <input
              type="text"
              className="form-input ssn-input"
              placeholder="6자리 입력"
              maxLength={6}
              value={ssn1}
              onChange={(e) => setSsn1(e.target.value.replace(/[^0-9]/g, ''))}
            />
            <span className="ssn-divider">-</span>
            <input
              type="password"
              className="form-input ssn-input ssn-back"
              placeholder="*"
              maxLength={1}
              value={ssn2}
              onChange={(e) => setSsn2(e.target.value.replace(/[^0-9]/g, ''))}
            />
            <span className="ssn-mask">* * * * * *</span>
          </div>
          <div className="form-helper-link" onClick={() => navigate('/exchange')}>
            주민등록번호 수집을 원치 않으시면 상품권으로 교환가능해요.
          </div>
        </div>

        {/* 유의사항 */}
        <div className="form-section">
          <div className="notice-title">반드시 확인해주세요!</div>
          <div className="agreement-list">
            <label className="agreement-item">
              <input
                type="checkbox"
                checked={agreements.fee}
                onChange={() => toggleAgreement('fee')}
              />
              <span>출금 시 수수료가 500원 차감돼요.</span>
            </label>
            <label className="agreement-item">
              <input
                type="checkbox"
                checked={agreements.tax}
                onChange={() => toggleAgreement('tax')}
              />
              <span>기타소득세법에 따라, 주민등록번호 7자리 수집에 동의합니다.</span>
            </label>
            <label className="agreement-item">
              <input
                type="checkbox"
                checked={agreements.schedule}
                onChange={() => toggleAgreement('schedule')}
              />
              <span>매주 수요일(공휴일인 경우 다음 영업일) 15시 이후 계좌로 지급돼요.</span>
            </label>
            <label className="agreement-item">
              <input
                type="checkbox"
                checked={agreements.responsibility}
                onChange={() => toggleAgreement('responsibility')}
              />
              <span>입력된 예금주와 계좌번호 정보가 틀려서 잘못 입금되는 경우 책임지지 않습니다.</span>
            </label>
          </div>
        </div>
      </div>

      {/* 출금 신청 버튼 */}
      <div className="withdraw-bottom-btn">
        <button
          className={`btn-primary full ${!isFormValid ? 'disabled' : ''}`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          출금 신청
        </button>
      </div>

      {/* SMS 인증 모달 */}
      {showSmsModal && (
        <div className="bs-overlay active" onClick={() => setShowSmsModal(false)}>
          <div className="bs" onClick={e => e.stopPropagation()}>
            <SmsVerification
              title="본인인증"
              subtitle="출금 신청을 위해 본인인증을 진행해주세요."
              submitText="인증하고 출금 신청"
              onSuccess={handleWithdrawComplete}
              onClose={() => setShowSmsModal(false)}
            />
          </div>
        </div>
      )}

      {/* 주민등록번호 안내 팝업 */}
      {showSsnInfo && (
        <div className="withdraw-modal" onClick={() => setShowSsnInfo(false)}>
          <div className="withdraw-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSsnInfo(false)}>✕</button>
            <div className="modal-title">왜 주민등록 번호를 입력하나요?</div>
            <div className="modal-desc">
              연간 기타소득이 일정 금액을 초과할 경우 세무신고가 필요합니다.<br /><br />
              이에 주민등록번호 앞 7자리를 수집합니다.<br /><br />
              출금 외의 용도로는 절대 사용되지 않으며, 개인정보보안 법령에 따라 안전하게 보관돼요.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawDetailScreen;
