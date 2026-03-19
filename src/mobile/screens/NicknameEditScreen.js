import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';

const NicknameEditScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('홍길동');
  const [isTouched, setIsTouched] = useState(false);

  // 한글, 영문, 숫자만 허용하는 정규식 (한글 자음/모음 조합 중에도 허용)
  const handleChange = (e) => {
    const value = e.target.value;
    // 한글(자음/모음 포함), 영문, 숫자만 허용 (최대 10자)
    const filteredValue = value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/g, '').slice(0, 10);
    setNickname(filteredValue);
    setIsTouched(true);
  };

  const handleClear = () => {
    setNickname('');
    setIsTouched(true);
  };

  const handleSave = () => {
    if (nickname.length < 2) {
      showToast('2자 이상 입력해주세요');
      return;
    }
    showToast('닉네임이 변경되었습니다');
    navigate(-1);
  };

  // 유효성 검사
  const isValid = nickname.length >= 2;
  const showError = isTouched && nickname.length > 0 && nickname.length < 2;

  return (
    <div className="screen detail-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">닉네임 수정</h1>
      </div>

      <div className="detail-content">
        <div className="form-group">
          <label className="form-label">새로운 닉네임을 입력해주세요</label>
          <div className="input-wrapper">
            <input
              type="text"
              className={`form-input ${showError ? 'error' : ''}`}
              value={nickname}
              onChange={handleChange}
              placeholder="닉네임 입력"
              maxLength={10}
            />
            {nickname.length > 0 && (
              <button className="input-clear-btn" onClick={handleClear}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <circle cx="12" cy="12" r="10" fill="#ccc" stroke="none"/>
                  <path d="M15 9l-6 6M9 9l6 6" stroke="#fff" strokeWidth="2"/>
                </svg>
              </button>
            )}
          </div>
          <div className="input-helper">
            {showError ? (
              <span className="helper-error">2자 이상 입력해주세요.</span>
            ) : (
              <span className="helper-text">2~10자의 한글, 영문, 숫자</span>
            )}
            <span className="char-count">{nickname.length}/10</span>
          </div>
        </div>

      </div>

      <div className="bottom-fixed-btn">
        <button
          className={`btn-primary full ${!isValid ? 'disabled' : ''}`}
          onClick={handleSave}
          disabled={!isValid}
        >
          수정 완료
        </button>
      </div>
    </div>
  );
};

export default NicknameEditScreen;
