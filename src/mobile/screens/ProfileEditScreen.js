import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';

const ProfileEditScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '홍길동',
    email: 'hong@email.com',
    phone: '010-1234-5678'
  });

  const handleSave = () => {
    showToast('프로필이 저장되었습니다');
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
        <h1 className="page-title">프로필 수정</h1>
      </div>

      <div className="detail-content">
        <div className="profile-avatar-section">
          <div className="profile-avatar-large">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <button className="avatar-edit-btn">
            사진 변경
          </button>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              type="text"
              className="form-input"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              type="email"
              className="form-input"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
            />
            <p className="form-hint">이메일 변경 시 인증이 필요합니다</p>
          </div>

          <div className="form-group">
            <label className="form-label">휴대폰 번호</label>
            <input
              type="tel"
              className="form-input"
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
            />
            <p className="form-hint">휴대폰 번호 변경 시 본인인증이 필요합니다</p>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-primary full" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditScreen;
