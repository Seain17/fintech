import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';

const NicknameEditScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('홍길동');

  const handleSave = () => {
    if (!nickname.trim()) {
      showToast('닉네임을 입력해주세요');
      return;
    }
    showToast('닉네임이 변경되었습니다');
    navigate(-1);
  };

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
          <label className="form-label">닉네임</label>
          <input
            type="text"
            className="form-input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            maxLength={20}
          />
        </div>

        <button className="btn-primary full" onClick={handleSave} style={{ marginTop: '24px' }}>
          저장
        </button>
      </div>
    </div>
  );
};

export default NicknameEditScreen;
