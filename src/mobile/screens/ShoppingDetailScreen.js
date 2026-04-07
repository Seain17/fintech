import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ShoppingDetailScreen.css';

const ShoppingDetailScreen = () => {
  const navigate = useNavigate();
  const { mallId } = useParams();
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [showAttWarning] = useState(true); // ATT 추적 차단 상태 (실제로는 기기 설정에서 가져와야 함)

  // 쇼핑몰 데이터 (기획서 기반)
  const mallData = {
    gmarket: {
      name: 'G마켓',
      icon: '🛍️',
      color: '#00A651',
      rate: '3%',
      baseRate: '3%',
      paymentDate: '익익월 초',
      settlementCycle: '2개월',
      minPurchase: '제한 없음',
      url: 'https://www.gmarket.co.kr',
      description: 'G마켓 전 상품 적립',
      categories: [
        { name: '전 상품', rate: '3%' },
      ],
      notices: [
        '금/은, 쥬얼리/시계 등 환금성 상품은 적립에서 제외됩니다.',
        '여행(호텔/숙박/항공권), 상품권/e쿠폰 구매 시 리워드가 지급되지 않습니다.',
        '브라우저 및 모바일 기기 내 광고 추적 미허용 시 리워드가 지급되지 않습니다.',
        '진행 배너 및 링크를 클릭하여 참여해 주셔야 하며, 다른 경로를 통한 접속 이력이 있을 경우 반드시 캐시 삭제 후 참여하셔야 합니다.',
      ]
    },
    ohouse: {
      name: '오늘의집',
      icon: '🏠',
      color: '#35C5F0',
      rate: '3.6%',
      baseRate: '3.6%',
      paymentDate: '익월 초',
      settlementCycle: '1개월',
      minPurchase: '제한 없음',
      url: 'https://ohou.se',
      description: '오늘의집 전 상품 적립',
      categories: [
        { name: '전 상품', rate: '3.6%' },
      ],
      notices: [
        '금/은, 쥬얼리/시계 등 환금성 상품은 적립에서 제외됩니다.',
        '여행(호텔/숙박/항공권), 상품권/e쿠폰 구매 시 리워드가 지급되지 않습니다.',
        '브라우저 및 모바일 기기 내 광고 추적 미허용 시 리워드가 지급되지 않습니다.',
        '진행 배너 및 링크를 클릭하여 참여해 주셔야 하며, 다른 경로를 통한 접속 이력이 있을 경우 반드시 캐시 삭제 후 참여하셔야 합니다.',
      ]
    },
    ssg: {
      name: 'SSG',
      icon: '🛒',
      color: '#FF5A5A',
      rate: '3%',
      baseRate: '3%',
      paymentDate: '익월 초',
      settlementCycle: '1개월',
      minPurchase: '제한 없음',
      url: 'https://www.ssg.com',
      description: 'SSG닷컴 전 상품 적립',
      categories: [
        { name: '전 상품', rate: '3%' },
      ],
      notices: [
        '금/은, 쥬얼리/시계 등 환금성 상품은 적립에서 제외됩니다.',
        '여행(호텔/숙박/항공권), 상품권/e쿠폰 구매 시 리워드가 지급되지 않습니다.',
        '브라우저 및 모바일 기기 내 광고 추적 미허용 시 리워드가 지급되지 않습니다.',
        '진행 배너 및 링크를 클릭하여 참여해 주셔야 하며, 다른 경로를 통한 접속 이력이 있을 경우 반드시 캐시 삭제 후 참여하셔야 합니다.',
      ]
    },
    emart: {
      name: '이마트몰',
      icon: '🏬',
      color: '#FFD100',
      rate: '3%',
      baseRate: '3%',
      paymentDate: '익월 초',
      settlementCycle: '1개월',
      minPurchase: '제한 없음',
      url: 'https://emart.ssg.com',
      description: '이마트몰 전 상품 적립',
      categories: [
        { name: '전 상품', rate: '3%' },
      ],
      notices: [
        '금/은, 쥬얼리/시계 등 환금성 상품은 적립에서 제외됩니다.',
        '여행(호텔/숙박/항공권), 상품권/e쿠폰 구매 시 리워드가 지급되지 않습니다.',
        '브라우저 및 모바일 기기 내 광고 추적 미허용 시 리워드가 지급되지 않습니다.',
        '진행 배너 및 링크를 클릭하여 참여해 주셔야 하며, 다른 경로를 통한 접속 이력이 있을 경우 반드시 캐시 삭제 후 참여하셔야 합니다.',
      ]
    }
  };

  const mall = mallData[mallId] || mallData.gmarket;

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
        <div className="mall-header">
          <div className="mall-header-top">
            <div className="mall-icon-large" style={{ background: `${mall.color}15` }}>{mall.icon}</div>
            <div className="mall-info">
              <h2 className="mall-title">{mall.name}</h2>
              <p className="mall-description">{mall.description}</p>
            </div>
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
              <span className="info-label">정산주기</span>
              <span className="info-value">{mall.settlementCycle}</span>
            </div>
            <div className="info-row">
              <span className="info-label">포인트 지급일</span>
              <span className="info-value">{mall.paymentDate}</span>
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

        {/* 유의사항 아코디언 */}
        <div className="notice-accordion" onClick={() => setIsNoticeOpen(!isNoticeOpen)}>
          <div className="notice-accordion-header">
            <span>적립 전 유의사항 꼼꼼히 확인하기</span>
            <span className={`accordion-arrow ${isNoticeOpen ? 'open' : ''}`}>▼</span>
          </div>
          {isNoticeOpen && (
            <ul className="notice-list">
              {mall.notices.map((notice, index) => (
                <li key={index}>{notice}</li>
              ))}
            </ul>
          )}
        </div>

        {/* ATT 경고 배너 */}
        {showAttWarning && (
          <div className="att-warning">
            <div className="att-warning-title">
              <span>⚠️</span>
              <span>핀 적립 불가 안내</span>
            </div>
            <p className="att-warning-desc">
              현재 기기 추적이 차단되어 있어 쇼핑하셔도 핀이 적립되지 않습니다.
            </p>
            <span className="att-warning-link">기기 설정 변경하기 &gt;</span>
          </div>
        )}
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
