import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WithdrawDetailScreen.css';

const WithdrawDetailScreen = ({ userPoints, showToast, isGuest }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bank: '',
    accountNumber: '',
    accountHolder: '',
    amount: '',
    ssn1: '',
    ssn2: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isGuest) {
      navigate('/signup', { replace: true });
    }
  }, [isGuest, navigate]);

  const banks = [
    '은행 선택',
    '국민은행',
    '신한은행',
    '우리은행',
    '하나은행',
    'KB국민은행',
    '농협은행',
    '기업은행',
    '카카오뱅크',
    '토스뱅크'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.bank || formData.bank === '은행 선택') {
      newErrors.bank = '은행을 선택해주세요';
    }

    if (!formData.accountNumber) {
      newErrors.accountNumber = '계좌번호를 입력해주세요';
    } else if (!/^\d{10,14}$/.test(formData.accountNumber.replace(/-/g, ''))) {
      newErrors.accountNumber = '올바른 계좌번호를 입력해주세요';
    }

    if (!formData.accountHolder) {
      newErrors.accountHolder = '예금주명을 입력해주세요';
    }

    if (!formData.amount) {
      newErrors.amount = '출금액을 입력해주세요';
    } else if (parseInt(formData.amount) < 5000) {
      newErrors.amount = '최소 출금 금액은 5,000원입니다';
    } else if (parseInt(formData.amount) > userPoints * 0.1) {
      newErrors.amount = '보유 포인트가 부족합니다';
    }

    // 5만원 초과 시 주민번호 필수
    if (parseInt(formData.amount) > 50000) {
      if (!formData.ssn1 || !formData.ssn2) {
        newErrors.ssn = '5만원 초과 출금 시 주민번호가 필요합니다 (세금 신고용)';
      } else if (!/^\d{6}$/.test(formData.ssn1) || !/^\d{7}$/.test(formData.ssn2)) {
        newErrors.ssn = '올바른 주민번호를 입력해주세요';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      showToast('출금 신청이 완료되었습니다. 매주 수요일에 입금됩니다.');
      setTimeout(() => {
        navigate('/mypage');
      }, 1500);
    }
  };

  const requiredAmount = parseInt(formData.amount) || 0;
  const requiresSSN = requiredAmount > 50000;
  const tax = requiredAmount > 50000 ? Math.floor(requiredAmount * 0.22) : 0;
  const finalAmount = requiredAmount - tax;

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
        <div className="withdraw-info-card">
          <div className="info-row">
            <span className="info-label">보유 포인트</span>
            <span className="info-value">{userPoints.toLocaleString()} P</span>
          </div>
          <div className="info-row">
            <span className="info-label">출금 가능 금액</span>
            <span className="info-value primary">₩{(userPoints * 0.1).toLocaleString()}</span>
          </div>
        </div>

        <form className="withdraw-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">은행 선택 *</label>
            <select
              className="form-select"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
            >
              {banks.map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            {errors.bank && <div className="form-error">{errors.bank}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">계좌번호 *</label>
            <input
              type="text"
              className="form-input"
              name="accountNumber"
              placeholder="'-' 없이 숫자만 입력"
              value={formData.accountNumber}
              onChange={handleChange}
            />
            {errors.accountNumber && <div className="form-error">{errors.accountNumber}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">예금주 *</label>
            <input
              type="text"
              className="form-input"
              name="accountHolder"
              placeholder="예금주명 입력"
              value={formData.accountHolder}
              onChange={handleChange}
            />
            {errors.accountHolder && <div className="form-error">{errors.accountHolder}</div>}
            <div className="form-helper">계좌의 예금주명과 일치해야 합니다</div>
          </div>

          <div className="form-group">
            <label className="form-label">출금 금액 *</label>
            <input
              type="number"
              className="form-input"
              name="amount"
              placeholder="최소 5,000원"
              value={formData.amount}
              onChange={handleChange}
            />
            {errors.amount && <div className="form-error">{errors.amount}</div>}
            <div className="form-helper">포인트 10P = 1원 (최소 5,000원)</div>
          </div>

          {requiresSSN && (
            <div className="ssn-section">
              <div className="ssn-notice">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>5만원 초과 출금 시 세금 신고를 위해 주민번호가 필요합니다</span>
              </div>

              <div className="form-group">
                <label className="form-label">주민등록번호 *</label>
                <div className="ssn-input-group">
                  <input
                    type="text"
                    className="form-input ssn-input"
                    name="ssn1"
                    placeholder="앞 6자리"
                    maxLength="6"
                    value={formData.ssn1}
                    onChange={handleChange}
                  />
                  <span className="ssn-divider">-</span>
                  <input
                    type="password"
                    className="form-input ssn-input"
                    name="ssn2"
                    placeholder="뒤 7자리"
                    maxLength="7"
                    value={formData.ssn2}
                    onChange={handleChange}
                  />
                </div>
                {errors.ssn && <div className="form-error">{errors.ssn}</div>}
                <div className="form-helper">🔒 안전하게 암호화되어 저장됩니다</div>
              </div>
            </div>
          )}

          {requiredAmount > 0 && (
            <div className="withdraw-summary">
              <h3 className="summary-title">출금 요약</h3>
              <div className="summary-row">
                <span>신청 금액</span>
                <span>₩{requiredAmount.toLocaleString()}</span>
              </div>
              {tax > 0 && (
                <div className="summary-row tax">
                  <span>제세공과금 (22%)</span>
                  <span>- ₩{tax.toLocaleString()}</span>
                </div>
              )}
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>실 수령액</span>
                <span>₩{finalAmount.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="withdraw-notice">
            <h4>유의사항</h4>
            <ul>
              <li>최소 출금 금액은 5,000원입니다</li>
              <li>5만원 초과 시 제세공과금 22%가 부과됩니다</li>
              <li>출금은 매주 수요일에 일괄 입금됩니다</li>
              <li>신청 후 취소가 불가능하니 신중히 확인해주세요</li>
            </ul>
          </div>

          <button type="submit" className="btn-primary">
            출금 신청하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawDetailScreen;
