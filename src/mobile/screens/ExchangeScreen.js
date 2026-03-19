import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExchangeScreen.css';

const exchangeProducts = [
  {
    id: 1,
    name: '네이버페이 5천원',
    price: 50000,
    desc: '즉시발송, 수수료 없음',
    icon: 'N'
  },
  {
    id: 2,
    name: '스타벅스 1만원권',
    price: 100000,
    desc: '즉시발송, 수수료 없음',
    icon: 'S'
  },
  {
    id: 3,
    name: '신세계상품권 5천원',
    price: 46000,
    desc: '즉시발송, 수수료 없음',
    icon: 'SS'
  },
  {
    id: 4,
    name: 'CU 5천원 쿠폰',
    price: 44000,
    desc: '즉시발송, 수수료 없음',
    icon: 'CU'
  },
  {
    id: 5,
    name: '배달의민족',
    price: 47500,
    desc: '즉시발송, 수수료 없음',
    icon: 'BM'
  },
  {
    id: 6,
    name: '올리브영',
    price: 46000,
    desc: '즉시발송, 수수료 없음',
    icon: 'OY'
  },
];

const ExchangeScreen = ({ userPoints = 26930, showToast }) => {
  const navigate = useNavigate();

  const handleExchange = (product) => {
    if (userPoints < product.price) {
      showToast('포인트가 부족합니다');
      return;
    }
    showToast(`${product.name} 교환 신청이 완료되었습니다`);
  };

  return (
    <div className="screen exchange-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">교환하기</h1>
      </div>

      <div className="exchange-content">
        {/* 보유 포인트 */}
        <div className="exchange-balance">
          <span className="balance-label">보유 포인트</span>
          <span className="balance-value">{userPoints.toLocaleString()} P</span>
        </div>

        {/* 교환 상품 */}
        <div className="exchange-section">
          <h3 className="exchange-section-title">교환 상품</h3>
          <div className="exchange-list">
            {exchangeProducts.map((product) => (
              <button
                key={product.id}
                className={`exchange-item ${userPoints < product.price ? 'disabled' : ''}`}
                onClick={() => handleExchange(product)}
                disabled={userPoints < product.price}
              >
                <div className="exchange-icon">{product.icon}</div>
                <div className="exchange-info">
                  <div className="exchange-name">{product.name}</div>
                  <div className="exchange-desc">
                    {product.price.toLocaleString()}P, {product.desc}
                  </div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeScreen;
