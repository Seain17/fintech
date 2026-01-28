import React, { useState } from 'react';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import Toggle from '../components/Toggle';

const cmsTabs = [
  { id: 'banner', label: '배너 관리' },
  { id: 'notice', label: '공지사항' },
  { id: 'push', label: '푸시 발송' },
];

const initialBannerData = [
  { id: 1, title: '신규 가입 이벤트', location: '홈', period: '2026-01-20 ~ 2026-01-31', active: true },
  { id: 2, title: '래플 이벤트 진행중', location: '이벤트', period: '2026-01-15 ~ 2026-02-15', active: true },
  { id: 3, title: '포인트 충전 보너스', location: '마이페이지', period: '2026-01-10 ~ 2026-01-25', active: false },
];

const initialNoticeData = [
  { id: 12, title: '[중요] 서버 점검 안내', date: '2026-01-20', views: '1,245', active: true },
  { id: 11, title: '래플 당첨자 발표', date: '2026-01-18', views: '892', active: true },
  { id: 10, title: '포인트 정책 변경 안내', date: '2026-01-15', views: '2,103', active: false },
];

function CMS() {
  const [activeTab, setActiveTab] = useState('banner');
  const [detailView, setDetailView] = useState(null);
  const [pushTitle, setPushTitle] = useState('');
  const [pushBody, setPushBody] = useState('');
  const [banners, setBanners] = useState(initialBannerData);
  const [notices, setNotices] = useState(initialNoticeData);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // 배너 상태 토글
  const handleBannerToggle = (id, checked) => {
    setBanners(banners.map(item =>
      item.id === id ? { ...item, active: checked } : item
    ));
  };

  // 공지사항 상태 토글
  const handleNoticeToggle = (id, checked) => {
    setNotices(notices.map(item =>
      item.id === id ? { ...item, active: checked } : item
    ));
  };

  // 드래그 시작
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // 드래그 오버 (드롭 허용)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 드롭 시 순서 변경
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newBanners = [...banners];
    const draggedItem = newBanners[draggedIndex];
    newBanners.splice(draggedIndex, 1);
    newBanners.splice(dropIndex, 0, draggedItem);
    setBanners(newBanners);
    setDraggedIndex(null);
  };

  const renderBannerDetail = () => (
    <div className="detail-view-container">
      <div className="detail-header">
        <div className="detail-title">배너 등록/수정</div>
        <Button variant="outline" size="sm" onClick={() => setDetailView(null)}>취소</Button>
      </div>

      <div className="form-group">
        <label className="form-label">배너 이미지</label>
        <div className="image-upload-box">
          <div>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
            <div style={{ fontSize: 14, color: 'var(--admin-text-sub)' }}>클릭하여 이미지 업로드</div>
            <div style={{ fontSize: 12, color: 'var(--admin-text-sub)', marginTop: 8 }}>권장 크기: 1200 x 400px</div>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-col">
          <label className="form-label">배너 제목</label>
          <input type="text" className="input-field" placeholder="배너 제목" />
        </div>
        <div className="form-col">
          <label className="form-label">노출 순서</label>
          <input type="number" className="input-field" defaultValue="1" min="1" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-col">
          <label className="form-label">배너 지면</label>
          <select className="select-field">
            <option>홈</option>
            <option>이벤트</option>
            <option>마이페이지</option>
            <option>래플</option>
          </select>
        </div>
        <div className="form-col">
          <label className="form-label">링크 URL</label>
          <input type="text" className="input-field" placeholder="https://" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-col">
          <label className="form-label">시작일</label>
          <input type="date" className="input-field" />
        </div>
        <div className="form-col">
          <label className="form-label">종료일</label>
          <input type="date" className="input-field" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">노출 상태</label>
        <select className="select-field">
          <option>노출</option>
          <option>숨김</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">메모</label>
        <textarea className="textarea-field" placeholder="관리자 메모 (선택)"></textarea>
      </div>

      <div className="action-bar">
        <Button variant="danger">삭제</Button>
        <Button variant="primary" onClick={() => { setDetailView(null); alert('저장되었습니다.'); }}>저장</Button>
      </div>
    </div>
  );

  const renderNoticeDetail = () => (
    <div className="detail-view-container">
      <div className="detail-header">
        <div className="detail-title">공지사항 등록/수정</div>
        <Button variant="outline" size="sm" onClick={() => setDetailView(null)}>취소</Button>
      </div>

      <div className="form-row">
        <div className="form-col" style={{ flex: 3 }}>
          <label className="form-label">제목</label>
          <input type="text" className="input-field" placeholder="공지사항 제목" />
        </div>
        <div className="form-col">
          <label className="form-label">카테고리</label>
          <select className="select-field">
            <option>일반</option>
            <option>점검</option>
            <option>이벤트</option>
            <option>업데이트</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">내용</label>
        <textarea className="textarea-field" style={{ height: 400 }} placeholder="공지사항 내용을 입력하세요"></textarea>
      </div>

      <div className="form-row">
        <div className="form-col">
          <label className="form-label">게시 상태</label>
          <select className="select-field">
            <option>게시</option>
            <option>숨김</option>
          </select>
        </div>
        <div className="form-col">
          <label className="form-label">중요 공지</label>
          <select className="select-field">
            <option>일반</option>
            <option>상단 고정</option>
          </select>
        </div>
      </div>

      <div className="action-bar">
        <Button variant="danger">삭제</Button>
        <Button variant="outline">미리보기</Button>
        <Button variant="primary" onClick={() => { setDetailView(null); alert('저장되었습니다.'); }}>저장</Button>
      </div>
    </div>
  );

  if (detailView === 'banner') return renderBannerDetail();
  if (detailView === 'notice') return renderNoticeDetail();

  return (
    <>
      <Tabs tabs={cmsTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'banner' && (
        <div className="tab-content active">
          <div className="section-title">
            <span>배너 리스트</span>
            <Button variant="primary" onClick={() => setDetailView('banner')}>+ 등록</Button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--admin-text-sub)', marginBottom: 12 }}>
            ↕ 행을 드래그하여 순서를 변경할 수 있습니다
          </p>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr><th style={{ width: 60 }}>순서</th><th>이미지</th><th>제목</th><th>배너 지면</th><th>기간</th><th>상태</th><th>관리</th></tr>
              </thead>
              <tbody>
                {banners.map((item, index) => (
                  <tr
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    style={{ cursor: 'grab' }}
                    className={draggedIndex === index ? 'dragging' : ''}
                  >
                    <td>
                      <span className="order-number">{index + 1}</span>
                    </td>
                    <td>🖼️</td>
                    <td onClick={() => setDetailView('banner')}>{item.title}</td>
                    <td>{item.location}</td>
                    <td>{item.period}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Toggle checked={item.active} onChange={(checked) => handleBannerToggle(item.id, checked)} />
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm" onClick={() => setDetailView('banner')}>수정</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'notice' && (
        <div className="tab-content active">
          <div className="section-title">
            <span>공지사항</span>
            <Button variant="primary" onClick={() => setDetailView('notice')}>+ 글쓰기</Button>
          </div>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr><th>No.</th><th>제목</th><th>작성일</th><th>조회수</th><th>상태</th><th>관리</th></tr>
              </thead>
              <tbody>
                {notices.map((item) => (
                  <tr key={item.id} onClick={() => setDetailView('notice')}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.views}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Toggle checked={item.active} onChange={(checked) => handleNoticeToggle(item.id, checked)} />
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm" onClick={() => setDetailView('notice')}>수정</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'push' && (
        <div className="tab-content active">
          <div style={{ display: 'flex', gap: 30 }}>
            <div className="card" style={{ flex: 1 }}>
              <h3 className="section-title">푸시 발송</h3>
              <div className="form-group">
                <label className="form-label">발송 대상</label>
                <select className="select-field">
                  <option>전체 회원</option>
                  <option>활성 회원</option>
                  <option>휴면 회원</option>
                  <option>특정 회원</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">제목</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="푸시 제목을 입력하세요"
                  value={pushTitle}
                  onChange={(e) => setPushTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">내용</label>
                <textarea
                  className="textarea-field"
                  placeholder="푸시 내용을 입력하세요"
                  value={pushBody}
                  onChange={(e) => setPushBody(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">링크 URL (선택)</label>
                <input type="text" className="input-field" placeholder="https://" />
              </div>
              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">발송 시간</label>
                  <select className="select-field">
                    <option>즉시 발송</option>
                    <option>예약 발송</option>
                  </select>
                </div>
                <div className="form-col">
                  <label className="form-label">예약 일시</label>
                  <input type="datetime-local" className="input-field" />
                </div>
              </div>
              <Button variant="primary" style={{ width: '100%', marginTop: 20 }} onClick={() => alert('푸시가 발송되었습니다.')}>발송</Button>
            </div>
            <div style={{ width: 320 }}>
              <h4 style={{ marginBottom: 16, color: 'var(--admin-text-sub)' }}>미리보기</h4>
              <div style={{ background: '#1a1a1a', borderRadius: 30, padding: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                <div style={{ height: 600, background: '#fff', borderRadius: 24, padding: 20, position: 'relative' }}>
                  <div style={{ textAlign: 'center', padding: '10px 0', borderBottom: '1px solid #eee', marginBottom: 20 }}>
                    <div style={{ fontSize: 11, color: '#666' }}>10:24</div>
                  </div>
                  <div style={{ background: '#f5f5f5', padding: 14, borderRadius: 12, marginTop: 40 }}>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 32, height: 32, background: 'var(--admin-primary)', borderRadius: 8, flexShrink: 0 }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: '#666', marginBottom: 2 }}>Anick</div>
                        <strong style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>
                          {pushTitle || '제목을 입력하세요'}
                        </strong>
                        <p style={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>
                          {pushBody || '내용을 입력하세요'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CMS;
