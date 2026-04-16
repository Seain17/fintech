import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/',         label: '홈',  icon: '/images/icons/icon-home-01.png' },
    { path: '/finance',  label: '금융', icon: '/images/icons/icon-home-02.png' },
    { path: '/benefits', label: '혜택', icon: '/images/icons/icon-home-03.png' },
    { path: '/mypage',   label: '마이', icon: '/images/icons/icon-home-04.png' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bottom-nav" role="navigation" aria-label="메인 네비게이션">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
          aria-label={`${item.label} ${isActive(item.path) ? '(현재 페이지)' : ''}`}
          aria-current={isActive(item.path) ? 'page' : undefined}
        >
          <span className="nav-icon" aria-hidden="true">
            <img src={item.icon} alt={item.label} />
          </span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
