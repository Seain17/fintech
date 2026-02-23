import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';

const inquiryTypes = [
  { id: 'point', label: '핀 관련' },
  { id: 'withdraw', label: '출금 문의' },
  { id: 'raffle', label: '경품/이벤트' },
  { id: 'account', label: '계정/로그인' },
  { id: 'etc', label: '기타 문의' },
];

const myInquiries = [
  { id: 1, type: '핀 관련', title: '핀이 적립되지 않았어요', date: '2026-01-20', status: 'answered' },
  { id: 2, type: '출금 문의', title: '출금 신청 후 얼마나 걸리나요?', date: '2026-01-15', status: 'answered' },
];

const InquiryScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new');
  const [selectedType, setSelectedType] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!selectedType) {
      showToast('문의 유형을 선택해주세요');
      return;
    }
    if (!title.trim()) {
      showToast('제목을 입력해주세요');
      return;
    }
    if (!content.trim()) {
      showToast('내용을 입력해주세요');
      return;
    }
    showToast('문의가 등록되었습니다');
    setSelectedType('');
    setTitle('');
    setContent('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'answered': return <span className="status-badge completed">답변완료</span>;
      case 'pending': return <span className="status-badge pending">대기중</span>;
      default: return null;
    }
  };

  return (
    <div className="screen detail-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">1:1 문의</h1>
      </div>

      <div className="detail-content">
        <div className="filter-tabs" style={{ marginBottom: '20px' }}>
          <button
            className={`filter-tab ${activeTab === 'new' ? 'active' : ''}`}
            onClick={() => setActiveTab('new')}
          >
            문의하기
          </button>
          <button
            className={`filter-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            문의 내역
          </button>
        </div>

        {activeTab === 'new' ? (
          <div className="inquiry-form">
            <div className="form-group">
              <label className="form-label">문의 유형</label>
              <div className="type-chips">
                {inquiryTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`type-chip ${selectedType === type.id ? 'active' : ''}`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">제목</label>
              <input
                type="text"
                className="form-input"
                placeholder="문의 제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">내용</label>
              <textarea
                className="form-textarea"
                placeholder="문의 내용을 상세히 입력해주세요"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <button className="btn-primary full" onClick={handleSubmit}>
              문의 등록
            </button>
          </div>
        ) : (
          <div className="history-list">
            {myInquiries.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-main">
                  <div className="history-info">
                    <div className="history-type">{item.type}</div>
                    <div className="history-title">{item.title}</div>
                    <div className="history-date">{item.date}</div>
                  </div>
                  <div className="history-right">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </div>
            ))}

            {myInquiries.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <div className="empty-text">문의 내역이 없습니다</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryScreen;
