import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NoticeScreen.css';

const noticeData = [
  {
    id: 1,
    title: '서비스 점검 안내',
    date: '2026-01-20',
    isImportant: true,
    content: '안녕하세요, 에이핀입니다.\n\n서비스 안정화를 위한 점검이 예정되어 있습니다.\n\n■ 점검 일시: 2026년 1월 28일 02:00 ~ 06:00\n■ 점검 내용: 서버 안정화 작업\n\n점검 시간 동안 서비스 이용이 불가하오니 양해 부탁드립니다.\n\n감사합니다.'
  },
  {
    id: 2,
    title: '앱 업데이트 안내 (v1.0.0)',
    date: '2026-01-15',
    isImportant: false,
    content: '에이핀 앱이 정식 출시되었습니다!\n\n■ 주요 기능\n- 핀 적립 및 출금\n- 경품 이벤트 참여\n- 쇼핑 적립\n\n많은 이용 부탁드립니다.'
  },
  {
    id: 3,
    title: '신규 래플 이벤트 오픈!',
    date: '2026-01-15',
    isImportant: false,
    content: '새로운 래플 이벤트가 오픈되었습니다!\n\n스타벅스, 배달의민족, 넷플릭스 등 다양한 상품이 준비되어 있으니 많은 참여 부탁드립니다.\n\n혜택 탭에서 확인하세요!'
  },
];

const NoticeScreen = () => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('month');
  const [openId, setOpenId] = useState(null);

  return (
    <div className="screen notice-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">공지사항</h1>
      </div>

      <div className="notice-content">
        {/* 기간 필터 칩 */}
        <div className="notice-filter-chips">
          <button
            className={`notice-filter-chip ${dateFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDateFilter('all')}
          >
            전체
          </button>
          <button
            className={`notice-filter-chip ${dateFilter === 'week' ? 'active' : ''}`}
            onClick={() => setDateFilter('week')}
          >
            1주일
          </button>
          <button
            className={`notice-filter-chip ${dateFilter === 'month' ? 'active' : ''}`}
            onClick={() => setDateFilter('month')}
          >
            1개월
          </button>
          <button
            className={`notice-filter-chip ${dateFilter === '3months' ? 'active' : ''}`}
            onClick={() => setDateFilter('3months')}
          >
            3개월
          </button>
        </div>

        {/* 공지사항 리스트 */}
        <div className="notice-list">
          {noticeData.map((item) => (
            <div key={item.id} className={`notice-item ${openId === item.id ? 'open' : ''}`}>
              <button
                className="notice-header"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                <div className="notice-info">
                  {item.isImportant && <span className="notice-badge">중요</span>}
                  <div className="notice-title">{item.title}</div>
                  <div className="notice-date">{item.date}</div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d={openId === item.id ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
                </svg>
              </button>
              {openId === item.id && (
                <div className="notice-detail">
                  {item.content.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeScreen;
