import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyCouponsScreen.css';

const MyCouponsScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // 쿠폰 데이터 (기획서 기반)
  const coupons = {
    available: [
      {
        id: 1,
        brand: '네이버 페이',
        name: '네이버페이 5천원',
        expireDate: '2026.04.12',
        daysLeft: 4,
        logo: '💳',
        logoColor: '#03C75A',
        barcode: 'P49R 3WKF2',
      },
      {
        id: 2,
        brand: '스타벅스',
        name: '스타벅스 1만원권',
        expireDate: '2026.04.17',
        daysLeft: 9,
        logo: '☕',
        logoColor: '#00704A',
        barcode: 'SB8K 2MN5X',
      },
    ],
    expired: [
      {
        id: 3,
        brand: '신세계',
        name: '신세계상품권 5천원',
        expireDate: '2026.03.31',
        status: 'used',
        logo: '🏬',
        logoColor: '#D4A574',
      },
      {
        id: 4,
        brand: '신세계',
        name: '신세계상품권 5천원',
        expireDate: '2026.03.31',
        status: 'expired',
        logo: '🏬',
        logoColor: '#D4A574',
      },
    ],
  };

  const activeCoupons = activeTab === 'available' ? coupons.available : coupons.expired;

  const handleCouponClick = (coupon) => {
    if (activeTab === 'available') {
      setSelectedCoupon(coupon);
    }
  };

  const closeCouponDetail = () => {
    setSelectedCoupon(null);
  };

  return (
    <div className="screen my-coupons-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="page-title">MY 쿠폰함</h1>
      </div>

      <div className="coupons-content">
        {/* 탭 */}
        <div className="coupon-tabs">
          <button
            className={`coupon-tab ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            사용 가능
          </button>
          <button
            className={`coupon-tab ${activeTab === 'expired' ? 'active' : ''}`}
            onClick={() => setActiveTab('expired')}
          >
            사용 완료/만료
          </button>
        </div>

        {/* 쿠폰 리스트 */}
        <div className="coupon-list">
          {activeCoupons.length === 0 ? (
            <div className="empty-state">
              {activeTab === 'available' ? (
                <>
                  <p className="empty-title">아직 교환한 쿠폰이 없어요</p>
                  <p className="empty-desc">포인트로 상품을 교환하러 가볼까요?</p>
                  <button className="exchange-btn" onClick={() => navigate('/exchange')}>
                    상품 교환하기
                  </button>
                </>
              ) : (
                <p className="empty-title">사용 완료/만료된 쿠폰이 없어요</p>
              )}
            </div>
          ) : (
            activeCoupons.map(coupon => (
              <button
                key={coupon.id}
                className={`coupon-card ${activeTab === 'expired' ? 'disabled' : ''}`}
                onClick={() => handleCouponClick(coupon)}
              >
                <div className="coupon-logo" style={{ backgroundColor: `${coupon.logoColor}15` }}>
                  <span>{coupon.logo}</span>
                </div>
                <div className="coupon-info">
                  {activeTab === 'available' && coupon.daysLeft <= 7 && (
                    <span className="d-day-badge">D-{coupon.daysLeft}</span>
                  )}
                  <span className="coupon-name">{coupon.name}</span>
                  <span className="coupon-expire">
                    {coupon.expireDate}까지
                    {activeTab === 'expired' && (
                      <span className={`status-badge ${coupon.status}`}>
                        {coupon.status === 'used' ? '사용 완료' : '기간 만료'}
                      </span>
                    )}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* 쿠폰 상세 풀화면 */}
      {selectedCoupon && (
        <div className="coupon-detail-screen">
          <div className="page-header">
            <button className="page-back-btn" onClick={closeCouponDetail}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <h1 className="page-title">쿠폰</h1>
          </div>

          <div className="coupon-detail-content">
            {/* 상품 이미지 */}
            <div className="coupon-product-image-area">
              <div className="coupon-product-image-box" style={{ backgroundColor: `${selectedCoupon.logoColor}15` }}>
                <span className="coupon-product-emoji">{selectedCoupon.logo}</span>
                <span className="coupon-product-label">giftishow</span>
              </div>
              <div className="coupon-product-name">{selectedCoupon.name}</div>
              <div className="coupon-product-expire">유효기간: {selectedCoupon.expireDate}까지</div>
            </div>

            {/* 바코드 & 핀코드 */}
            <div className="coupon-barcode-section">
              <div className="coupon-barcode-visual">
                <span className="barcode-lines">||| |||| ||| |||| ||| ||||</span>
              </div>
              <div className="coupon-pin-row">
                <span className="coupon-pin-code">{selectedCoupon.barcode}</span>
                <button className="coupon-copy-btn" onClick={() => navigator.clipboard?.writeText(selectedCoupon.barcode)}>
                  복사
                </button>
              </div>
            </div>

            {/* 쿠폰 정보 */}
            <div className="coupon-info-section">
              <div className="coupon-info-row">
                <span className="coupon-info-label">상품명</span>
                <span className="coupon-info-value">{selectedCoupon.name} 모바일쿠폰</span>
              </div>
              <div className="coupon-info-row">
                <span className="coupon-info-label">교환처</span>
                <span className="coupon-info-value">{selectedCoupon.brand}</span>
              </div>
              <div className="coupon-info-row">
                <span className="coupon-info-label">유효기간</span>
                <span className="coupon-info-value">~{selectedCoupon.expireDate}</span>
              </div>
            </div>

            {/* 유의사항 */}
            <div className="coupon-notice-section">
              <div className="coupon-notice-title">유의사항</div>
              <ul className="coupon-notice-list">
                <li>본 쿠폰은 유효기간 내 1회에 한해 사용 가능합니다.</li>
                <li>유효기간 이후에는 사용 및 환불이 불가합니다.</li>
                <li>쿠폰 분실, 도용에 의한 피해는 당사에서 책임지지 않습니다.</li>
                <li>핀코드를 직접 입력하거나 바코드를 스캔하여 사용하세요.</li>
                <li>사용 방법은 각 브랜드 정책에 따라 상이할 수 있습니다.</li>
                <li>쿠폰 사용 후에는 환불 및 재발급이 불가합니다.</li>
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default MyCouponsScreen;
