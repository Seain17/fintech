import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/admin', icon: '📊', label: '대시보드', exact: true },
  { path: '/admin/members', icon: '👥', label: '회원 관리' },
  { path: '/admin/sales', icon: '💰', label: '매출 관리' },
  { path: '/admin/stats', icon: '📈', label: '통계' },
  { path: '/admin/withdrawals', icon: '💸', label: '출금/정산' },
  { path: '/admin/cms', icon: '⚙️', label: '운영 관리' },
  { path: '/admin/benefits', icon: '🎁', label: '혜택/금융 상품 관리' },
  { path: '/admin/cs', icon: '🎧', label: '고객센터' },
  { path: '/admin/admediation', icon: '📡', label: '광고 미디에이션' },
];

function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">Anick Admin</div>
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">v1.4.0</div>
    </aside>
  );
}

export default Sidebar;
