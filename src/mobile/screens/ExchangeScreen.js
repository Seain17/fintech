import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExchangeScreen.css';
import { PinIcon, SmsVerification } from '../../shared/components';

const ExchangeScreen = ({ userPoints = 26350, showToast }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'cafe', name: '카페', count: 10 },
    { id: 'convenience', name: '편의점', count: 18 },
    { id: 'online', name: '온라인쇼핑', count: 8 },
    { id: 'delivery', name: '배달/외식', count: 18 },
    { id: 'gas', name: '주유소', count: 6 },
  ];

  // 교환 상품 데이터
  const products = [
    // 카페 (10개)
    { id: 1, brand: '컴포즈커피', name: '아메리카노(HOT)(TAKE-OUT)', price: 1500, category: 'cafe', emoji: '☕' },
    { id: 2, brand: '컴포즈커피', name: '아메리카노(ICE)(TAKE-OUT)', price: 1800, category: 'cafe', emoji: '🧊' },
    { id: 3, brand: '메가MGC커피', name: '(HOT)아메리카노', price: 1700, category: 'cafe', emoji: '☕' },
    { id: 4, brand: '메가MGC커피', name: '(ICE)아메리카노', price: 2000, category: 'cafe', emoji: '🧊' },
    { id: 5, brand: '빽다방', name: '아메리카노(ICED)', price: 2000, category: 'cafe', emoji: '🥤' },
    { id: 6, brand: '빽다방', name: '소프트아이스크림', price: 2000, category: 'cafe', emoji: '🍦' },
    { id: 7, brand: '이디야커피', name: '(L)ICED 아메리카노', price: 3200, category: 'cafe', emoji: '🧊' },
    { id: 8, brand: '이디야커피', name: '(L)HOT 아메리카노', price: 3200, category: 'cafe', emoji: '☕' },
    { id: 9, brand: '스타벅스', name: '아이스 카페 아메리카노 T', price: 4700, category: 'cafe', emoji: '🧊' },
    { id: 10, brand: '스타벅스', name: '카페 아메리카노 T', price: 4700, category: 'cafe', emoji: '☕' },

    // 편의점 - GS25 (8개)
    { id: 11, brand: 'GS25', name: '빙그레)바나나우유240ML', price: 1800, category: 'convenience', emoji: '🥛' },
    { id: 12, brand: 'GS25', name: '오리온)닥터유에너지바', price: 1300, category: 'convenience', emoji: '🍫' },
    { id: 13, brand: 'GS25', name: '롯데)크런키초콜릿', price: 1700, category: 'convenience', emoji: '🍫' },
    { id: 14, brand: 'GS25', name: '팔도)왕뚜껑', price: 1500, category: 'convenience', emoji: '🍜' },
    { id: 15, brand: 'GS25', name: '삼양)불닭볶음면(대컵)', price: 1800, category: 'convenience', emoji: '🔥' },
    { id: 16, brand: 'GS25', name: '농심)육개장사발면(소컵)', price: 1100, category: 'convenience', emoji: '🍜' },
    { id: 17, brand: 'GS25', name: '농심)짜파게티큰사발(대컵)', price: 1500, category: 'convenience', emoji: '🍝' },
    { id: 18, brand: 'GS25', name: '해태)초코홈런볼46g', price: 1900, category: 'convenience', emoji: '🍪' },
    // 편의점 - CU (5개)
    { id: 19, brand: 'CU', name: '서울)비요뜨초코링', price: 2300, category: 'convenience', emoji: '🥣' },
    { id: 20, brand: 'CU', name: '한양)숏다리20g', price: 2900, category: 'convenience', emoji: '🍖' },
    { id: 21, brand: 'CU', name: '광동)비타민500병100ml', price: 1100, category: 'convenience', emoji: '🧃' },
    { id: 22, brand: 'CU', name: '서울)흰우유1L', price: 3200, category: 'convenience', emoji: '🥛' },
    { id: 23, brand: 'CU', name: '오리온)포카칩어니언66g', price: 1700, category: 'convenience', emoji: '🥔' },
    // 편의점 - 세븐일레븐 (5개)
    { id: 24, brand: '세븐일레븐', name: '동아)박카스F', price: 1000, category: 'convenience', emoji: '🧃' },
    { id: 25, brand: '세븐일레븐', name: '농심)새우깡90g', price: 1500, category: 'convenience', emoji: '🦐' },
    { id: 26, brand: '세븐일레븐', name: '롯데)초코빼빼로54g', price: 2000, category: 'convenience', emoji: '🍫' },
    { id: 27, brand: '세븐일레븐', name: '빙그레)메로나75ml', price: 1500, category: 'convenience', emoji: '🍦' },
    { id: 28, brand: '세븐일레븐', name: '농심)너구리큰사발', price: 1800, category: 'convenience', emoji: '🍜' },

    // 온라인 쇼핑 (8개)
    { id: 29, brand: '네이버페이 포인트', name: '네이버페이 포인트 5천원', price: 5000, category: 'online', emoji: '💳' },
    { id: 30, brand: '네이버페이 포인트', name: '네이버페이 포인트 1만원', price: 10000, category: 'online', emoji: '💳' },
    { id: 31, brand: '배달의민족', name: '배달의민족 모바일상품권 5천원', price: 5000, category: 'online', emoji: '🛵' },
    { id: 32, brand: '배달의민족', name: '배달의민족 모바일상품권 1만원', price: 10000, category: 'online', emoji: '🛵' },
    { id: 33, brand: '올리브영', name: '올리브영 모바일상품권 5천원', price: 5000, category: 'online', emoji: '💄' },
    { id: 34, brand: '올리브영', name: '올리브영 모바일상품권 1만원', price: 10000, category: 'online', emoji: '💄' },
    { id: 35, brand: '신세계상품권', name: '이마트 상품권 5천원(신세계 겸용)', price: 5000, category: 'online', emoji: '🏬' },
    { id: 36, brand: '카카오 선물하기', name: '카카오톡 선물하기 상품권 5천원', price: 5000, category: 'online', emoji: '🎁' },

    // 배달/외식 (18개)
    { id: 37, brand: '베스킨라빈스', name: '싱글레귤러 아이스크림', price: 3900, category: 'delivery', emoji: '🍨' },
    { id: 38, brand: '베스킨라빈스', name: '두바이 모찌 피스타치오', price: 6000, category: 'delivery', emoji: '🍨' },
    { id: 39, brand: '맘스터치', name: '싸이버거 단품', price: 5200, category: 'delivery', emoji: '🍔' },
    { id: 40, brand: '맘스터치', name: '간장마늘떡강정S', price: 4600, category: 'delivery', emoji: '🍗' },
    { id: 41, brand: '맘스터치', name: '싸이버거 세트', price: 7500, category: 'delivery', emoji: '🍔' },
    { id: 42, brand: '롯데리아', name: '소프트콘', price: 1300, category: 'delivery', emoji: '🍦' },
    { id: 43, brand: '롯데리아', name: '양념감자', price: 2600, category: 'delivery', emoji: '🍟' },
    { id: 44, brand: '롯데리아', name: '데리버거 세트', price: 6100, category: 'delivery', emoji: '🍔' },
    { id: 45, brand: '맥도날드', name: '드립커피 Large', price: 2800, category: 'delivery', emoji: '☕' },
    { id: 46, brand: '맥도날드', name: '아이스드립커피Large', price: 2800, category: 'delivery', emoji: '🧊' },
    { id: 47, brand: '맥도날드', name: '빅맥세트', price: 7600, category: 'delivery', emoji: '🍔' },
    { id: 48, brand: '맥도날드', name: '더블 불고기버거 세트', price: 6000, category: 'delivery', emoji: '🍔' },
    { id: 49, brand: '파리바게뜨', name: '한입브레드 단짠 소시지', price: 990, category: 'delivery', emoji: '🥐' },
    { id: 50, brand: '파리바게뜨', name: '한입만에그마요롤', price: 1990, category: 'delivery', emoji: '🥐' },
    { id: 51, brand: '파리바게뜨', name: '인생크림빵 우유', price: 3100, category: 'delivery', emoji: '🍞' },
    { id: 52, brand: '던킨', name: '바바리안필드', price: 2000, category: 'delivery', emoji: '🍩' },
    { id: 53, brand: '던킨', name: '허니 올드훼션드', price: 2000, category: 'delivery', emoji: '🍩' },
    { id: 54, brand: '던킨', name: '던킨 콤보(아메리카노+글레이즈드)', price: 5600, category: 'delivery', emoji: '🍩' },

    // 주유소 (6개)
    { id: 55, brand: 'GS칼텍스', name: 'GS칼텍스 주유쿠폰 5천원', price: 5000, category: 'gas', emoji: '⛽' },
    { id: 56, brand: 'GS칼텍스', name: 'GS칼텍스 주유쿠폰 1만원', price: 10000, category: 'gas', emoji: '⛽' },
    { id: 57, brand: 'SK주유권', name: 'SK 모바일주유권 5천원', price: 5000, category: 'gas', emoji: '⛽' },
    { id: 58, brand: 'SK주유권', name: 'SK 모바일주유권 1만원', price: 10000, category: 'gas', emoji: '⛽' },
    { id: 59, brand: 'S-OIL', name: '에쓰오일 5천원', price: 5000, category: 'gas', emoji: '⛽' },
    { id: 60, brand: 'S-OIL', name: '에쓰오일 1만원', price: 10000, category: 'gas', emoji: '⛽' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exchangeConfirmed, setExchangeConfirmed] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setExchangeConfirmed(false);
  };

  const handleExchange = () => {
    if (!selectedProduct) return;
    if (userPoints < selectedProduct.price) {
      showToast && showToast('핀이 부족합니다');
      return;
    }
    setShowSmsModal(true);
  };

  const handleExchangeComplete = () => {
    setShowSmsModal(false);
    setExchangeConfirmed(true);
  };

  const closeBottomSheet = () => {
    setSelectedProduct(null);
    setExchangeConfirmed(false);
  };

  return (
    <div className="screen exchange-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="page-title">교환소</h1>
      </div>

      <div className="exchange-content">
        {/* 사용 가능 핀 + MY 쿠폰함 */}
        <div className="exchange-top-bar">
          <div className="exchange-balance">
            <span className="balance-label">사용 가능</span>
            <span className="balance-value">
              <PinIcon size="medium" />
              {userPoints.toLocaleString()}
            </span>
          </div>
          <button className="my-coupon-btn" onClick={() => navigate('/my-coupons')}>
            MY 쿠폰함
          </button>
        </div>

        {/* 카테고리 탭 */}
        <div className="category-tabs-wrapper">
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}{cat.count ? ` (${cat.count})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* 교환 상품 */}
        <div className="exchange-section">
          <h3 className="exchange-section-title">교환 상품</h3>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                className={`product-card ${userPoints < product.price ? 'disabled' : ''}`}
                onClick={() => handleProductClick(product)}
              >
                <div className="product-image">
                  <span className="product-emoji">{product.emoji}</span>
                </div>
                <div className="product-info">
                  <span className="product-brand">{product.brand}</span>
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">
                    <PinIcon size="small" />
                    {product.price.toLocaleString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SMS 인증 모달 */}
      {showSmsModal && (
        <div className="bs-overlay active" style={{ zIndex: 200 }} onClick={() => setShowSmsModal(false)}>
          <div className="bs" onClick={e => e.stopPropagation()}>
            <SmsVerification
              title="본인인증"
              subtitle="교환을 위해 본인인증을 진행해주세요."
              submitText="인증하고 교환하기"
              onSuccess={handleExchangeComplete}
              onClose={() => setShowSmsModal(false)}
            />
          </div>
        </div>
      )}

      {/* 상품 상세 바텀시트 */}
      {selectedProduct && (
        <div className={`bs-overlay active`} onClick={closeBottomSheet}>
          <div className="bs exchange-sheet" onClick={(e) => e.stopPropagation()}>

            {exchangeConfirmed ? (
              <div className="exchange-sheet-done">
                <div className="exchange-done-icon">🎉</div>
                <div className="exchange-done-title">교환 완료!</div>
                <p className="exchange-done-desc">
                  {selectedProduct.name} 교환이 완료되었습니다.<br />
                  MY 쿠폰함에서 확인하세요.
                </p>
                <button className="bs-btn-primary" onClick={() => { closeBottomSheet(); navigate('/my-coupons'); }}>
                  MY 쿠폰함 바로가기
                </button>
                <button className="bs-btn-close" onClick={closeBottomSheet}>닫기</button>
              </div>
            ) : (
              <>
                <div className="exchange-sheet-product">
                  <div className="exchange-sheet-emoji">{selectedProduct.emoji}</div>
                  <div className="exchange-sheet-info">
                    <span className="exchange-sheet-brand">{selectedProduct.brand}</span>
                    <span className="exchange-sheet-name">{selectedProduct.name}</span>
                    <span className="exchange-sheet-price">
                      <PinIcon size="small" />
                      {selectedProduct.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="exchange-sheet-balance">
                  <span>보유 핀</span>
                  <span className={userPoints < selectedProduct.price ? 'insufficient' : ''}>
                    <PinIcon size="small" />
                    {userPoints.toLocaleString()}
                    {userPoints < selectedProduct.price && ' (부족)'}
                  </span>
                </div>

                {/* 유의사항 */}
                <div className="exchange-notice">
                  <div className="exchange-notice-title">유의사항</div>
                  <ul className="exchange-notice-list">
                    <li>교환 완료 후에는 취소 및 환불이 불가합니다.</li>
                    <li>발급된 쿠폰은 MY 쿠폰함에서 확인할 수 있습니다.</li>
                    <li>쿠폰의 유효기간은 발급일로부터 30일입니다.</li>
                    <li>핀 교환은 1:1 비율로 진행되며, 1핀 = 1원입니다.</li>
                    <li>부정한 방법으로 획득한 핀으로 교환 시 이용이 제한될 수 있습니다.</li>
                    <li>쿠폰 사용 방법은 각 브랜드 정책에 따라 상이합니다.</li>
                  </ul>
                </div>

                <button
                  className="bs-btn-primary"
                  disabled={userPoints < selectedProduct.price}
                  onClick={handleExchange}
                >
                  교환하기
                </button>
                <button className="bs-btn-close" onClick={closeBottomSheet}>닫기</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeScreen;
