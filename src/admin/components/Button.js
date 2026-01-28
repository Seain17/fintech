import React from 'react';

function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  children,
  type = 'button',
  style
}) {
  const sizeClass = size === 'sm' ? 'btn-sm' : '';

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${sizeClass}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;
