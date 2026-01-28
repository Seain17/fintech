import React from 'react';

function Badge({ variant = 'primary', children }) {
  return (
    <span className={`badge ${variant}`}>
      {children}
    </span>
  );
}

export default Badge;
