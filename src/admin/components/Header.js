import React from 'react';

function Header({ title }) {
  return (
    <header className="admin-header">
      <div className="page-title">{title}</div>
      <div className="user-profile">
        <span>관리자님</span>
        <button className="btn btn-outline btn-sm">로그아웃</button>
      </div>
    </header>
  );
}

export default Header;
