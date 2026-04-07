import React from 'react';

const Toast = ({ show, message }) => {
  return (
    <div
      className={`toast ${show ? 'show' : ''}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
};

export default Toast;
