import React from 'react';

function Card({ label, value, valueStyle, sub, onClick, children, style }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
    >
      {label && <div className="card-label">{label}</div>}
      {value && <div className="card-value" style={valueStyle}>{value}</div>}
      {sub && <div className="card-sub">{sub}</div>}
      {children}
    </div>
  );
}

export default Card;
