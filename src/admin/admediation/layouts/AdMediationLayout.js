import React, { useState } from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { DateFilterProvider, useDateFilter } from '../context/DateFilterContext';
import '../styles/admediation.css';

const menuSections = [
  {
    title: 'Overview',
    items: [
      { path: '/admin/admediation', icon: '📊', label: '대시보드', exact: true },
    ]
  },
  {
    title: 'Ad Management',
    items: [
      { path: '/admin/admediation/networks', icon: '🔗', label: '네트워크 관리' },
      { path: '/admin/admediation/units', icon: '📱', label: '광고 지면' },
    ]
  },
  {
    title: 'Settings',
    items: [
      { path: '/admin/admediation/settings', icon: '⚙️', label: '설정' },
    ]
  }
];

const pageTitles = {
  '/admin/admediation': '광고 미디에이션 대시보드',
  '/admin/admediation/networks': '네트워크 관리',
  '/admin/admediation/units': '광고 지면 관리',
  '/admin/admediation/settings': '설정',
};

// 날짜 필터 컴포넌트
function DateFilterBar() {
  const {
    dateFilter,
    setDateFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    getDateLabel
  } = useDateFilter();
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="admed-date-filter">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>📅 조회 기간</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            className={`admed-btn ${dateFilter === 'today' ? 'admed-btn-primary' : 'admed-btn-secondary'}`}
            style={{ padding: '6px 14px', fontSize: 13 }}
            onClick={() => { setDateFilter('today'); setShowDatePicker(false); }}
          >
            오늘
          </button>
          <button
            className={`admed-btn ${dateFilter === 'yesterday' ? 'admed-btn-primary' : 'admed-btn-secondary'}`}
            style={{ padding: '6px 14px', fontSize: 13 }}
            onClick={() => { setDateFilter('yesterday'); setShowDatePicker(false); }}
          >
            어제
          </button>
          <button
            className={`admed-btn ${dateFilter === 'thisMonth' ? 'admed-btn-primary' : 'admed-btn-secondary'}`}
            style={{ padding: '6px 14px', fontSize: 13 }}
            onClick={() => { setDateFilter('thisMonth'); setShowDatePicker(false); }}
          >
            이번 달
          </button>
          <button
            className={`admed-btn ${dateFilter === 'lastMonth' ? 'admed-btn-primary' : 'admed-btn-secondary'}`}
            style={{ padding: '6px 14px', fontSize: 13 }}
            onClick={() => { setDateFilter('lastMonth'); setShowDatePicker(false); }}
          >
            저번 달
          </button>
          <button
            className={`admed-btn ${dateFilter === 'custom' ? 'admed-btn-primary' : 'admed-btn-secondary'}`}
            style={{ padding: '6px 14px', fontSize: 13 }}
            onClick={() => { setDateFilter('custom'); setShowDatePicker(!showDatePicker); }}
          >
            📆 기간 설정
          </button>
        </div>
        <div style={{
          marginLeft: 'auto',
          padding: '6px 14px',
          background: '#1a2e71',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          color: '#fff'
        }}>
          {getDateLabel()}
        </div>
      </div>

      {/* 커스텀 날짜 선택 */}
      {showDatePicker && (
        <div style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: 12,
          alignItems: 'center'
        }}>
          <span style={{ fontSize: 13, color: '#64748b' }}>시작일</span>
          <input
            type="date"
            className="admed-form-input"
            style={{ width: 150, margin: 0, padding: '6px 10px', fontSize: 13 }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span style={{ fontSize: 13, color: '#94a3b8' }}>~</span>
          <span style={{ fontSize: 13, color: '#64748b' }}>종료일</span>
          <input
            type="date"
            className="admed-form-input"
            style={{ width: 150, margin: 0, padding: '6px 10px', fontSize: 13 }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            className="admed-btn admed-btn-primary"
            style={{ padding: '6px 16px', fontSize: 13 }}
            onClick={() => {
              if (startDate && endDate) {
                setShowDatePicker(false);
              } else {
                alert('시작일과 종료일을 모두 선택해주세요.');
              }
            }}
          >
            적용
          </button>
        </div>
      )}
    </div>
  );
}

// 메인 레이아웃 내부 컴포넌트
function AdMediationLayoutInner() {
  const location = useLocation();
  const { getDateLabel } = useDateFilter();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('/networks/')) return '네트워크 상세';
    if (path.includes('/units/')) return '광고 지면 상세';
    const basePath = '/' + path.split('/').slice(1, 4).join('/');
    return pageTitles[basePath] || '광고 미디에이션';
  };

  // 설정 페이지에서는 날짜 필터 숨김
  const showDateFilter = !location.pathname.includes('/settings');

  return (
    <div className="admed-container">
      {/* 사이드바 */}
      <nav className="admed-sidebar">
        <div className="admed-sidebar-header">
          <div className="admed-logo">
            <div className="admed-logo-icon">A</div>
            <div className="admed-logo-text">
              <span className="admed-logo-text-title">에이핀</span>
              <span className="admed-logo-text-sub">Ad Mediation</span>
            </div>
          </div>
        </div>

        <div className="admed-nav">
          {menuSections.map((section, idx) => (
            <div key={idx} className="admed-menu-section">
              <div className="admed-menu-section-title">{section.title}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) => `admed-nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="admed-nav-icon">{item.icon}</span>
                  <span className="admed-nav-label">{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        <div className="admed-sidebar-footer">
          <NavLink to="/admin" className="admed-back-link">
            ← 메인 어드민으로
          </NavLink>
          <div className="admed-version">v1.0.0</div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="admed-main">
        {/* 페이지 헤더 */}
        <header className="admed-header">
          <div className="admed-title-wrap">
            <h1 className="admed-title">{getTitle()}</h1>
            <span className="admed-subtitle">{getDateLabel()} 기준</span>
          </div>
          <div className="admed-header-actions">
            <button className="admed-btn admed-btn-secondary">
              <span>📥</span> 리포트 다운로드
            </button>
          </div>
        </header>

        {/* 탭 네비게이션 */}
        <div className="admed-tabs">
          <NavLink to="/admin/admediation" end className={({ isActive }) => `admed-tab ${isActive ? 'active' : ''}`}>
            <span className="admed-tab-icon">📊</span>
            대시보드
          </NavLink>
          <NavLink to="/admin/admediation/networks" className={({ isActive }) => `admed-tab ${isActive ? 'active' : ''}`}>
            <span className="admed-tab-icon">🔗</span>
            네트워크 관리
          </NavLink>
          <NavLink to="/admin/admediation/units" className={({ isActive }) => `admed-tab ${isActive ? 'active' : ''}`}>
            <span className="admed-tab-icon">📱</span>
            광고 지면
          </NavLink>
          <NavLink to="/admin/admediation/settings" className={({ isActive }) => `admed-tab ${isActive ? 'active' : ''}`}>
            <span className="admed-tab-icon">⚙️</span>
            설정
          </NavLink>
        </div>

        {/* 날짜 필터 (설정 페이지 제외) */}
        {showDateFilter && <DateFilterBar />}

        {/* 스크롤 콘텐츠 */}
        <div className="admed-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Provider로 감싼 레이아웃
function AdMediationLayout() {
  return (
    <DateFilterProvider>
      <AdMediationLayoutInner />
    </DateFilterProvider>
  );
}

export default AdMediationLayout;
