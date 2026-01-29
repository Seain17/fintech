import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ShoppingDetailScreen.css';

const ShoppingDetailScreen = () => {
  const navigate = useNavigate();
  const { mallId } = useParams();

  // 쇼핑몰 데이터
  const mallData = {
    coupang: {
      name: '쿠팡',
      icon: '🛒',
      color: '#E31837',
      rate: '최대 2%',
      baseRate: '1%',
      paymentDate: '구매확정 후 30일 이내',
      minPurchase: '10,000원 이상',
      url: 'https://www.coupang.com',
      description: '로켓배송, 로켓와우 상품 포함 전 카테고리 적립',
      categories: [
        { name: '일반상품', rate: '1%' },
        { name: '로켓배송', rate: '1.5%' },
        { name: '로켓와우', rate: '2%' },
      ],
      notices: [
        '쿠팡 앱/웹에서 바로 구매 시 적립 불가',
        '반드시 본 페이지를 통해 이동 후 구매해야 적립',
        '장바구니에 미리 담아둔 상품은 적립 제외',
        '쿠폰/할인 적용 후 실결제 금액 기준 적립',
        '부분 취소/반품 시 해당 금액만큼 적립 취소',
        '로켓직구, 판매자 직접배송 일부 상품 제외',
      ]
    },
    elevenst: {
      name: '11번가',
      icon: '🏪',
      color: '#FF0000',
      rate: '최대 1.5%',
      baseRate: '1%',
      paymentDate: '구매확정 후 45일 이내',
      minPurchase: '5,000원 이상',
      url: 'https://www.11st.co.kr',
      description: '전 카테고리 상품 적립, 디지털/가전 추가 적립',
      categories: [
        { name: '일반상품', rate: '1%' },
        { name: '디지털/가전', rate: '1.5%' },
        { name: '패션', rate: '1.2%' },
      ],
      notices: [
        '11번가 앱/웹에서 바로 구매 시 적립 불가',
        '본 페이지를 통해 이동 후 30분 이내 구매 필요',
        '기프트카드, 상품권 구매 시 적립 제외',
        '일부 브랜드 상품 적립 제외될 수 있음',
        '구매확정 전 취소 시 적립 예정 취소',
      ]
    },
    gmarket: {
      name: 'G마켓',
      icon: '🛍️',
      color: '#00A651',
      rate: '최대 1.2%',
      baseRate: '0.8%',
      paymentDate: '구매확정 후 35일 이내',
      minPurchase: '10,000원 이상',
      url: 'https://www.gmarket.co.kr',
      description: 'G마켓 전 상품 적립, 스마일배송 추가 적립',
      categories: [
        { name: '일반상품', rate: '0.8%' },
        { name: '스마일배송', rate: '1.2%' },
        { name: '빅스마일데이', rate: '1.5%' },
      ],
      notices: [
        'G마켓 앱/웹에서 바로 구매 시 적립 불가',
        '이동 후 24시간 이내 구매 건만 적립',
        '스마일캐시 사용분은 적립 제외',
        '해외직구 상품 적립 제외',
      ]
    },
    auction: {
      name: '옥션',
      icon: '🏷️',
      color: '#F58220',
      rate: '최대 1.2%',
      baseRate: '0.8%',
      paymentDate: '구매확정 후 35일 이내',
      minPurchase: '10,000원 이상',
      url: 'https://www.auction.co.kr',
      description: '옥션 전 상품 적립',
      categories: [
        { name: '일반상품', rate: '0.8%' },
        { name: '스마일배송', rate: '1.2%' },
      ],
      notices: [
        '옥션 앱/웹에서 바로 구매 시 적립 불가',
        '이동 후 24시간 이내 구매 건만 적립',
        '스마일캐시 사용분은 적립 제외',
      ]
    }
  };

  const mall = mallData[mallId] || mallData.coupang;

  const handleGoShopping = () => {
    window.open(mall.url, '_blank');
  };

  return (
    <div className="screen shopping-detail-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="page-title">쇼핑 적립</h1>
      </div>

      <div className="shopping-detail-content">
        {/* 쇼핑몰 헤더 */}
        <div className="mall-header" style={{ background: `linear-gradient(135deg, ${mall.color}20 0%, ${mall.color}10 100%)` }}>
          <div className="mall-icon-large">{mall.icon}</div>
          <div className="mall-info">
            <h2 className="mall-title">{mall.name}</h2>
            <p className="mall-description">{mall.description}</p>
          </div>
          <div className="mall-rate-badge">
            <span className="rate-label">적립률</span>
            <span className="rate-value">{mall.rate}</span>
          </div>
        </div>

        {/* 적립 정보 */}
        <div className="info-section">
          <h3 className="section-title">적립 정보</h3>
          <div className="info-card">
            <div className="info-row">
              <span className="info-label">기본 적립률</span>
              <span className="info-value">{mall.baseRate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">포인트 지급일</span>
              <span className="info-value">{mall.paymentDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">최소 구매금액</span>
              <span className="info-value">{mall.minPurchase}</span>
            </div>
          </div>
        </div>

        {/* 카테고리별 적립률 */}
        <div className="info-section">
          <h3 className="section-title">카테고리별 적립률</h3>
          <div className="category-list">
            {mall.categories.map((cat, index) => (
              <div key={index} className="category-item">
                <span className="category-name">{cat.name}</span>
                <span className="category-rate">{cat.rate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 유의사항 */}
        <div className="info-section">
          <h3 className="section-title">유의사항</h3>
          <ul className="notice-list">
            {mall.notices.map((notice, index) => (
              <li key={index}>{notice}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="shopping-detail-buttons">
        <button className="btn-history" onClick={() => navigate('/shopping-history')}>
          적립내역 보기
        </button>
        <button className="btn-go-shopping" onClick={handleGoShopping}>
          쇼핑하러 가기
        </button>
      </div>
    </div>
  );
};

export default ShoppingDetailScreen;
