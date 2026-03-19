import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InquiryScreen.css';

const inquiryTypes = [
  { id: 'point', label: '핀 관련' },
  { id: 'withdraw', label: '출금 문의' },
  { id: 'raffle', label: '경품/이벤트' },
  { id: 'account', label: '계정/로그인' },
  { id: 'etc', label: '기타 문의' },
];

const myInquiries = [
  {
    id: 1,
    type: '핀 관련',
    title: '핀이 적립 안돼요',
    date: '2026-01-20',
    status: 'answered',
    content: '출석체크를 했는데도 포인트가 적립이 되지 않네요. 광고보고 왔어요.',
    answer: '안녕하세요 에이핀입니다.\n\n문의주신 사항 확인하였으며, 일시적 오류로 포인트가 지급이 되지 않는 현상이 발생했습니다.\n지급되지 않은 포인트는 즉시 지급해드렸습니다.\n\n불편을 드려 죄송합니다.'
  },
  {
    id: 2,
    type: '핀 관련',
    title: '출금은 언제 해주나요?',
    date: '2026-01-15',
    status: 'pending',
    content: '출금 신청한지 3일이 지났는데 아직 입금이 안됐어요.',
    answer: null
  },
];

const InquiryScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new');
  const [selectedType, setSelectedType] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dateFilter, setDateFilter] = useState('month');
  const [expandedId, setExpandedId] = useState(null);

  // 유효성 검사
  const isTitleValid = title.length >= 5;
  const isContentValid = content.length >= 10;
  const isFormValid = selectedType && isTitleValid && isContentValid;

  const handleSubmitClick = () => {
    if (!selectedType) {
      showToast('문의 유형을 선택해주세요');
      return;
    }
    if (!isTitleValid) {
      showToast('제목을 5자 이상 입력해주세요');
      return;
    }
    if (!isContentValid) {
      showToast('내용을 10자 이상 입력해주세요');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    showToast('문의가 등록되었습니다');
    setShowConfirmModal(false);
    setSelectedType('');
    setTitle('');
    setContent('');
    setActiveTab('history');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'answered': return <span className="inquiry-status-badge answered">답변 완료</span>;
      case 'pending': return <span className="inquiry-status-badge pending">답변 대기</span>;
      default: return null;
    }
  };

  return (
    <div className="screen inquiry-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">1:1 문의</h1>
      </div>

      {/* 탭 영역 */}
      <div className="inquiry-tabs">
        <button
          className={`inquiry-tab ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          문의하기
        </button>
        <button
          className={`inquiry-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          문의 내역
        </button>
      </div>

      <div className="inquiry-content">
        {/* 문의하기 탭 */}
        {activeTab === 'new' && (
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
                className={`form-input ${title.length > 0 && !isTitleValid ? 'error' : ''}`}
                placeholder="문의 제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 20))}
                maxLength={20}
              />
              <div className="input-helper">
                {title.length > 0 && !isTitleValid ? (
                  <span className="helper-error">*최소 5자 이상 입력해주세요.</span>
                ) : (
                  <span className="helper-text"></span>
                )}
                <span className="char-count">{title.length}/20</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">문의 내용</label>
              <textarea
                className={`form-textarea ${content.length > 0 && !isContentValid ? 'error' : ''}`}
                placeholder="문의 내용을 상세히 입력해주세요"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, 500))}
                maxLength={500}
              />
              <div className="input-helper">
                {content.length > 0 && !isContentValid ? (
                  <span className="helper-error">*정확한 상황 파악을 위해 10자 이상 입력 부탁드려요.</span>
                ) : (
                  <span className="helper-text"></span>
                )}
                <span className="char-count">{content.length}/500</span>
              </div>
            </div>

            <div className="inquiry-notice">
              무분별한 욕설 및 문의 도배 등의 행위는 차단 대상이 될 수 있습니다.
            </div>

            <button
              className={`btn-primary full ${!isFormValid ? 'disabled' : ''}`}
              onClick={handleSubmitClick}
              disabled={!isFormValid}
            >
              문의 등록
            </button>
          </div>
        )}

        {/* 문의 내역 탭 */}
        {activeTab === 'history' && (
          <>
            <div className="date-filter-chips">
              <button
                className={`date-chip ${dateFilter === 'all' ? 'active' : ''}`}
                onClick={() => setDateFilter('all')}
              >
                전체
              </button>
              <button
                className={`date-chip ${dateFilter === 'week' ? 'active' : ''}`}
                onClick={() => setDateFilter('week')}
              >
                1주일
              </button>
              <button
                className={`date-chip ${dateFilter === 'month' ? 'active' : ''}`}
                onClick={() => setDateFilter('month')}
              >
                1개월
              </button>
              <button
                className={`date-chip ${dateFilter === '3months' ? 'active' : ''}`}
                onClick={() => setDateFilter('3months')}
              >
                3개월
              </button>
            </div>

            <div className="inquiry-list">
              {myInquiries.map((item) => (
                <div key={item.id} className={`inquiry-item ${expandedId === item.id ? 'expanded' : ''}`}>
                  <button
                    className="inquiry-item-header"
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  >
                    <div className="inquiry-item-info">
                      <div className="inquiry-item-type">{item.type}</div>
                      <div className="inquiry-item-title">{item.title}</div>
                      <div className="inquiry-item-date">{item.date}</div>
                    </div>
                    <div className="inquiry-item-right">
                      {getStatusBadge(item.status)}
                    </div>
                  </button>

                  {expandedId === item.id && (
                    <div className="inquiry-item-detail">
                      <div className="inquiry-detail-section">
                        <div className="inquiry-detail-content">{item.content}</div>
                      </div>
                      {item.answer && (
                        <div className="inquiry-detail-section answer">
                          <div className="inquiry-detail-label">관리자 답변</div>
                          <div className="inquiry-detail-content">
                            {item.answer.split('\n').map((line, idx) => (
                              <React.Fragment key={idx}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {myInquiries.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">💬</div>
                  <div className="empty-text">문의 내역이 없습니다</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* 확인 팝업 */}
      {showConfirmModal && (
        <div className="inquiry-modal" onClick={() => setShowConfirmModal(false)}>
          <div className="inquiry-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="inquiry-modal-title">문의를 접수할까요?</div>
            <div className="inquiry-modal-desc">작성하신 내용으로 문의가 등록됩니다.</div>
            <div className="inquiry-modal-buttons">
              <button className="modal-btn secondary" onClick={() => setShowConfirmModal(false)}>
                조금 더 수정할래요
              </button>
              <button className="modal-btn primary" onClick={handleConfirmSubmit}>
                네, 접수할게요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryScreen;
