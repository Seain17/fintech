import React from 'react';
import './PinIcon.css';

/**
 * 핀(F) 아이콘 컴포넌트
 * @param {Object} props
 * @param {string} [props.size] - 아이콘 크기 ('small' | 'medium' | 'large')
 * @param {string} [props.className] - 추가 CSS 클래스
 */
const PinIcon = ({ size = 'medium', className = '' }) => {
  return (
    <span className={`pin-icon pin-icon--${size} ${className}`}>F</span>
  );
};

/**
 * 핀 금액 표시 컴포넌트
 * @param {Object} props
 * @param {number} props.amount - 표시할 금액
 * @param {string} [props.size] - 아이콘 크기 ('small' | 'medium' | 'large')
 * @param {string} [props.className] - 추가 CSS 클래스
 */
export const PinAmount = ({ amount, size = 'medium', className = '' }) => {
  return (
    <span className={`pin-amount pin-amount--${size} ${className}`}>
      <PinIcon size={size} />
      <span className="pin-amount-value">{amount.toLocaleString()}</span>
    </span>
  );
};

export default PinIcon;
