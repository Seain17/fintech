import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/admin.css';

const pageTitles = {
  '/admin': '대시보드',
  '/admin/members': '회원 관리',
  '/admin/sales': '매출 관리',
  '/admin/stats': '통계',
  '/admin/withdrawals': '출금/정산',
  '/admin/cms': '운영 관리',
  '/admin/benefits': '혜택/금융 상품 관리',
  '/admin/cs': '고객센터',
};

function AdminLayout() {
  const location = useLocation();
  const basePath = '/' + location.pathname.split('/').slice(1, 3).join('/');
  const title = pageTitles[basePath] || '관리자';

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="admin-main">
        <Header title={title} />
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
