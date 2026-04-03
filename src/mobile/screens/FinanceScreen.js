import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinanceScreen.css';
import { AppLogo } from '../../shared/components';
import {
  cardProducts,
  loanProducts,
  loanCategories,
} from '../../shared/data/financeProducts';

/**
 * 금융 탭: 4단 구조 화면 (증권 탭 제거)
 *
 * [추천] - 카드사별 인기차트 (브랜드관)
 * [카드] - 에이핀 핀 높은 순
 * [보험] - 에이핀 핀 높은 순
 * [대출] - 금리 낮은 순 (법규 준수)
 */

// 카드사 브랜드 데이터
const cardBrands = [
  { id: 'bc', name: 'BCcard', logo: 'BC', color: '#ed1c24', brandColor: '#ed1c24' },
  { id: 'hana', name: '하나카드', logo: 'H', color: '#009178', brandColor: '#009178' },
  { id: 'shinhan', name: '신한카드', logo: 'S', color: '#0046ff', brandColor: '#0046ff' },
  { id: 'woori', name: '우리카드', logo: 'W', color: '#0099d9', brandColor: '#0099d9' },
  { id: 'samsung', name: '삼성카드', logo: 'SS', color: '#0066b3', brandColor: '#0066b3' },
];

// 브랜드별 TOP 10 카드 데이터
const brandTopCards = {
  hana: [
    { rank: 1, name: 'JADE Classic', change: null, image: '💳' },
    { rank: 2, name: '하나 스카이패스 아멕스 플래티늄 카드', change: null, image: '💳' },
    { rank: 3, name: '토스뱅크 하나카드 Day', change: null, image: '💳' },
    { rank: 4, name: '트래블로그 신용카드', change: 3, image: '💳' },
    { rank: 5, name: '원더카드 2.0 LIFE', change: null, image: '💳' },
    { rank: 6, name: '하나 1Q 카드', change: -1, image: '💳' },
    { rank: 7, name: '하나머니 쿠팡적립카드', change: 2, image: '💳' },
    { rank: 8, name: '하나 빅팟카드', change: null, image: '💳' },
    { rank: 9, name: '하나멤버스 1Q 카드', change: -2, image: '💳' },
    { rank: 10, name: '하나 트래블로그 체크카드', change: null, image: '💳' },
  ],
  bc: [
    { rank: 1, name: 'GOAT BC 바로카드', change: 2, image: '/images/bc_brand_01.png' },
    { rank: 2, name: 'BC 바로 ZONE 카드', change: 1, image: '/images/bc_brand_02.png' },
    { rank: 3, name: 'BC 바로 클리어 플러스', change: 2, image: '/images/bc_brand_01.png' },
    { rank: 4, name: 'BC 바로 On&Off 카드', change: -2, image: '/images/bc_brand_02.png' },
    { rank: 5, name: 'BC 바로 MACAO 카드', change: 1, image: '/images/bc_brand_01.png' },
    { rank: 6, name: 'BC 바로 클리어 카드', change: -1, image: '/images/bc_brand_02.png' },
    { rank: 7, name: 'BC 페이북 체크카드', change: null, image: '/images/bc_brand_01.png' },
    { rank: 8, name: 'BC 그린카드', change: 2, image: '/images/bc_brand_02.png' },
    { rank: 9, name: 'BC 바로 플래티늄', change: -1, image: '/images/bc_brand_01.png' },
    { rank: 10, name: 'BC 바로 에브리 카드', change: null, image: '/images/bc_brand_02.png' },
  ],
  shinhan: [
    { rank: 1, name: 'Mr.Life 카드', change: null, image: '💳' },
    { rank: 2, name: '신한카드 Deep Oil', change: null, image: '💳' },
    { rank: 3, name: '신한카드 taptap O', change: 1, image: '💳' },
    { rank: 4, name: '신한카드 Hi-Point', change: -1, image: '💳' },
    { rank: 5, name: 'S-Line 카드', change: null, image: '💳' },
  ],
  woori: [
    { rank: 1, name: '카드의정석 POINT', change: null, image: '💳' },
    { rank: 2, name: '카드의정석 COOKIE CHECK', change: null, image: '💳' },
    { rank: 3, name: '다이아몬드 카드', change: 2, image: '💳' },
    { rank: 4, name: '우리V체크카드', change: null, image: '💳' },
    { rank: 5, name: '카드의정석 SHOPPING', change: -1, image: '💳' },
  ],
  samsung: [
    { rank: 1, name: '탭탭오 카드', change: null, image: '💳' },
    { rank: 2, name: '삼성 iD SIMPLE 카드', change: 1, image: '💳' },
    { rank: 3, name: '삼성카드 taptap', change: -1, image: '💳' },
    { rank: 4, name: '삼성 아이디 카드', change: null, image: '💳' },
    { rank: 5, name: '삼성 SELECT 카드', change: 2, image: '💳' },
  ],
};

// 브랜드별 이벤트 데이터
const brandEvents = {
  hana: [
    { icon: '🏠', subtitle: '지금까지 최고 1억4천만원!', title: '부동산 세금 환급 확인하세요' },
    { icon: '🚗', subtitle: '자동차보험 조회하고 가입하면', title: '최대 6만 하나머니' },
    { icon: '🚙', subtitle: '초기 비용 부담없이', title: '내 차 타는 법, 어떻게 할까요?' },
    { icon: '💰', subtitle: '평균 53만원 돌려받았어요', title: '숨어있는 보험금 찾기!' },
  ],
  bc: [
    { icon: '🎁', subtitle: 'BC카드 신규 발급 시', title: '최대 5만원 캐시백' },
    { icon: '✈️', subtitle: '해외여행 필수', title: '환전 수수료 90% 할인' },
    { icon: '🛒', subtitle: '온라인 쇼핑 할인', title: '쿠팡/네이버 최대 7% 적립' },
    { icon: '☕', subtitle: '커피 전문점 할인', title: '스타벅스/투썸 15% 청구할인' },
  ],
  shinhan: [
    { icon: '🛒', subtitle: '온라인 쇼핑 할인', title: '쿠팡/네이버 최대 5% 적립' },
    { icon: '☕', subtitle: '커피 전문점 할인', title: '스타벅스 10% 청구할인' },
  ],
  woori: [
    { icon: '🎬', subtitle: '영화관 할인', title: 'CGV/롯데시네마 4천원 할인' },
    { icon: '🍽️', subtitle: '외식비 절약', title: '배달앱 5% 청구할인' },
  ],
  samsung: [
    { icon: '📱', subtitle: '통신비 할인', title: 'SKT/KT/LG U+ 1만원 할인' },
    { icon: '⛽', subtitle: '주유 할인', title: '리터당 80원 할인' },
  ],
};

const FinanceScreen = ({ showToast, unreadCount = 0 }) => {
  const navigate = useNavigate();

  // 메인 탭 상태
  const [mainTab, setMainTab] = useState('recommend');

  // 브랜드 상세 페이지 상태
  const [selectedBrand, setSelectedBrand] = useState(null);

  // ============================================
  // 카드 탭 상태
  // ============================================
  const [cardFilter, setCardFilter] = useState('all');

  // ============================================
  // 대출 탭 상태
  // ============================================
  const [loanCategory, setLoanCategory] = useState('credit');
  const [loanSortBy, setLoanSortBy] = useState('rate');

  // 보험 탭은 현재 준비중 상태

  // ============================================
  // 바텀시트 상태
  // ============================================
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ============================================
  // 카드 정렬: 에이핀 핀 높은 순
  // ============================================
  const getSortedCards = () => {
    return [...cardProducts]
      .filter(card => cardFilter === 'all' || card.category === cardFilter || card.category === 'all')
      .sort((a, b) => b.benefitPoints - a.benefitPoints);
  };

  // ============================================
  // 대출 정렬: 핀순 또는 금리순
  // ============================================
  const getSortedLoans = () => {
    const filtered = [...loanProducts]
      .filter(loan => loan.category === loanCategory);
    if (loanSortBy === 'limit') {
      return filtered.sort((a, b) => b.maxLimit - a.maxLimit);
    }
    // 기본: 금리 낮은 순
    return filtered.sort((a, b) => a.interestRate - b.interestRate);
  };


  // ============================================
  // 상품 클릭 핸들러
  // ============================================
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setBottomSheetOpen(true);
  };

  // 바텀시트 닫기
  const closeBottomSheet = () => {
    setBottomSheetOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // 제휴사 이동
  const handleApply = () => {
    showToast(`${selectedProduct?.name} 제휴사로 이동합니다`);
    closeBottomSheet();
  };

  // 브랜드 클릭 핸들러
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  // 브랜드 상세에서 뒤로가기
  const handleBackFromBrand = () => {
    setSelectedBrand(null);
  };

  // ============================================
  // 렌더링
  // ============================================

  // 브랜드 상세 페이지 렌더링
  if (selectedBrand) {
    const brand = cardBrands.find(b => b.id === selectedBrand);
    const topCards = brandTopCards[selectedBrand] || [];
    const events = brandEvents[selectedBrand] || [];

    // BC카드 전용 이미지 기반 브랜드관
    if (selectedBrand === 'bc') {
      return (
        <div className="screen finance-screen-v3">
          {/* 헤더 */}
          <div className="finance-header-v3">
            <button className="brand-back-btn" onClick={handleBackFromBrand}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="finance-noti-btn" onClick={() => navigate('/notifications')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {unreadCount > 0 && <span className="finance-noti-badge">{unreadCount}</span>}
            </button>
          </div>

          {/* BC카드 브랜드관 - 이미지 기반 */}
          <div className="finance-content-v3 brand-detail-content bc-brand-content">
            {/* 브랜드 타이틀 */}
            <h1 className="brand-detail-title">
              <span style={{ color: '#e31837' }}>BC카드</span> TOP 10
            </h1>

            {/* TOP 10 이미지 */}
            <div className="bc-brand-image-section">
              <img
                src="/images/bc_brand_01.png"
                alt="BC카드 TOP 10"
                className="bc-brand-full-image"
              />
            </div>

            {/* 이벤트 타이틀 */}
            <h2 className="brand-events-title" style={{ marginTop: '24px' }}>
              <span style={{ color: '#e31837' }}>BC카드</span> Event
            </h2>

            {/* 이벤트 이미지 */}
            <div className="bc-brand-image-section">
              <img
                src="/images/bc_brand_02.png"
                alt="BC카드 Event"
                className="bc-brand-full-image"
              />
            </div>
          </div>
        </div>
      );
    }

    // 기타 브랜드 기존 렌더링
    return (
      <div className="screen finance-screen-v3">
        {/* 헤더 */}
        <div className="finance-header-v3">
          <button className="brand-back-btn" onClick={handleBackFromBrand}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="finance-noti-btn" onClick={() => navigate('/notifications')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && <span className="finance-noti-badge">{unreadCount}</span>}
          </button>
        </div>

        {/* 브랜드 상세 콘텐츠 */}
        <div className="finance-content-v3 brand-detail-content">
          {/* 브랜드 타이틀 */}
          <h1 className="brand-detail-title">
            <span style={{ color: brand?.brandColor }}>{brand?.name}</span> TOP 10
          </h1>

          {/* TOP 1 히어로 카드 */}
          <div className="brand-hero-card" style={{ background: `linear-gradient(135deg, ${brand?.brandColor} 0%, ${brand?.brandColor}dd 100%)` }}>
            <button className="hero-back-btn" onClick={handleBackFromBrand}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="hero-menu-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="hero-title">{brand?.name} TOP10 <span className="hero-help">?</span></div>
            <div className="hero-date">2026.3.1 ~ 2026.3.31 <span className="hero-arrow">▼</span></div>

            <div className="hero-top1">
              <span className="hero-rank">1</span>
              <span className="hero-rank-dash">{topCards[0]?.change > 0 ? `▲${topCards[0]?.change}` : topCards[0]?.change < 0 ? `▼${Math.abs(topCards[0]?.change)}` : '—'}</span>
              <div className="hero-card-img">
                {topCards[0]?.image?.startsWith('/') ? (
                  <img src={topCards[0]?.image} alt={topCards[0]?.name} />
                ) : topCards[0]?.image}
              </div>
              <div className="hero-card-info">
                <div className="hero-card-name">{topCards[0]?.name}</div>
                <div className="hero-card-brand">{brand?.name}</div>
              </div>
              <span className="hero-arrow-right">›</span>
            </div>
          </div>

          {/* TOP 2-10 리스트 */}
          <div className="brand-ranking-list">
            {topCards.slice(1).map((card, index) => (
              <div key={card.rank} className="ranking-item" onClick={() => handleProductClick(card)}>
                <span className="ranking-num">{card.rank}</span>
                <span className={`ranking-change ${card.change > 0 ? 'up' : card.change < 0 ? 'down' : ''}`}>
                  {card.change === null ? '—' : card.change > 0 ? `▲${card.change}` : `▼${Math.abs(card.change)}`}
                </span>
                <div className="ranking-card-img">
                  {card.image?.startsWith('/') ? (
                    <img src={card.image} alt={card.name} />
                  ) : card.image}
                </div>
                <div className="ranking-card-info">
                  <div className="ranking-card-name">{card.name}</div>
                  <div className="ranking-card-brand">{brand?.name}</div>
                </div>
                <span className="ranking-arrow">›</span>
              </div>
            ))}
          </div>

          {/* 브랜드 이벤트 섹션 */}
          <div className="brand-events-section">
            <h2 className="brand-events-title">
              <span style={{ color: brand?.brandColor }}>{brand?.name}</span> Event
            </h2>

            <div className="brand-events-list">
              {events.map((event, index) => (
                <div key={index} className="brand-event-item">
                  <div className="event-icon">{event.icon}</div>
                  <div className="event-content">
                    <div className="event-subtitle">{event.subtitle}</div>
                    <div className="event-title">{event.title}</div>
                  </div>
                  <span className="event-arrow">›</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen finance-screen-v3">
      {/* 헤더 */}
      <div className="finance-header-v3">
        <AppLogo />
        <button className="finance-noti-btn" onClick={() => navigate('/notifications')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && <span className="finance-noti-badge">{unreadCount}</span>}
        </button>
      </div>

      {/* 메인 탭 (증권 탭 제거됨) */}
      <div className="main-tabs-v3">
        <button
          className={`main-tab-v3 ${mainTab === 'recommend' ? 'active' : ''}`}
          onClick={() => setMainTab('recommend')}
        >
          추천
        </button>
        <button
          className={`main-tab-v3 ${mainTab === 'card' ? 'active' : ''}`}
          onClick={() => setMainTab('card')}
        >
          카드
        </button>
        <button
          className={`main-tab-v3 ${mainTab === 'insurance' ? 'active' : ''}`}
          onClick={() => setMainTab('insurance')}
        >
          보험
        </button>
        <button
          className={`main-tab-v3 ${mainTab === 'loan' ? 'active' : ''}`}
          onClick={() => setMainTab('loan')}
        >
          대출
        </button>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="finance-content-v3">
        {/* ========== 추천 탭 - 카드사별 인기차트 ========== */}
        {mainTab === 'recommend' && (
          <div className="recommend-section">
            <h2 className="brand-chart-title">
              <span className="crown-icon">👑</span>
              카드사별 인기차트
            </h2>

            <div className="brand-card-list">
              {cardBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="brand-card-item"
                  onClick={() => handleBrandClick(brand.id)}
                >
                  <div className="brand-card-preview">
                    <div className="brand-card-img" style={{ background: `linear-gradient(135deg, ${brand.color}22 0%, ${brand.color}11 100%)` }}>
                      💳
                    </div>
                  </div>
                  <div className="brand-card-info">
                    <span className="brand-logo" style={{ color: brand.brandColor }}>{brand.logo}</span>
                    <span className="brand-name" style={{ color: brand.brandColor }}>{brand.name}</span>
                    <span className="brand-suffix">브랜드관</span>
                  </div>
                  <span className="brand-arrow">›</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== 카드 탭 ========== */}
        {mainTab === 'card' && (
          <div className="card-section">
            <div className="card-filter-bar">
              {[
                { id: 'all', label: '전체' },
                { id: 'shopping', label: '쇼핑' },
                { id: 'food', label: '외식' },
                { id: 'transport', label: '교통' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  className={`card-filter-btn ${cardFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setCardFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="sort-text-corner">핀 적립순</div>

            <div className="product-list-v3">
              {getSortedCards().map((card, index) => (
                <div key={card.id} className="product-card-horizontal" onClick={() => handleProductClick(card)}>
                  <div className="product-rank-badge">{index === 0 ? '👑' : index + 1}</div>
                  <div className="product-logo-sm" style={{ background: card.color }}>
                    <span>{card.logo}</span>
                  </div>
                  <div className="product-info-inline">
                    <span className="product-name-inline">{card.name}</span>
                    <span className="product-benefit-inline">{card.benefit}</span>
                  </div>
                  <div className="product-point-inline">+{card.benefitPoints.toLocaleString()}핀</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== 대출 탭 ========== */}
        {mainTab === 'loan' && (
          <div className="loan-section">
            <div className="loan-category-bar">
              {loanCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`loan-category-btn ${loanCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setLoanCategory(cat.id)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-label">{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="sort-options-with-text">
              <div className="sort-options-inline">
                <button
                  className={`sort-chip ${loanSortBy === 'rate' ? 'active' : ''}`}
                  onClick={() => setLoanSortBy('rate')}
                >
                  금리 낮은순
                </button>
                <button
                  className={`sort-chip ${loanSortBy === 'limit' ? 'active' : ''}`}
                  onClick={() => setLoanSortBy('limit')}
                >
                  한도순
                </button>
              </div>
            </div>

            <div className="product-list-v3">
              {getSortedLoans().map((loan, index) => (
                <div key={loan.id} className="product-card-horizontal" onClick={() => handleProductClick(loan)}>
                  <div className="product-rank-badge">{index === 0 ? '👑' : index + 1}</div>
                  <div className="product-logo-sm" style={{ background: loan.color }}>
                    <span>{loan.logo}</span>
                  </div>
                  <div className="product-info-inline">
                    <span className="product-name-inline">{loan.name}</span>
                    <span className="product-rate-inline">연 {loan.interestRate}%~ · 최대 {loan.maxLimit >= 10000 ? (loan.maxLimit / 10000) + '억' : (loan.maxLimit / 1000) + '천만'}원</span>
                  </div>
                  <div className="product-point-inline loan-rate">{loan.interestRate}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== 보험 탭 - 페이지 준비중 ========== */}
        {mainTab === 'insurance' && (
          <div className="insurance-section coming-soon-section">
            <div className="coming-soon-content">
              <img
                src="/images/misokim.png"
                alt="김미소 대리 - 페이지 준비중"
                className="coming-soon-character"
              />
            </div>
          </div>
        )}
      </div>


      {/* 바텀시트 */}
      <div
        className={`bottom-sheet-overlay ${bottomSheetOpen ? 'active' : ''}`}
        onClick={closeBottomSheet}
      >
        <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="sheet-header">
            <div className="sheet-title">혜택 및 제휴사 이동 안내</div>
            <button className="btn-close" onClick={closeBottomSheet}>✕</button>
          </div>

          <div className="sheet-highlight">💡 핀 지급 유의사항</div>
          <ul className="sheet-list">
            <li>핀은 카드 발급 또는 대출 실행 완료 후 <strong>익월 15일 이내</strong> 지급됩니다.</li>
            <li>이미 해당 금융사의 카드를 소유하신 기존 회원은 지급 대상에서 제외될 수 있습니다.</li>
          </ul>

          <div className="outlink-notice">
            <strong>제휴사 페이지로 이동합니다</strong>
            <p>안전한 진행을 위해 에이핀 앱을 벗어나 해당 금융사로 이동합니다. 상품 심사 및 가입은 금융사의 기준을 따릅니다.</p>
          </div>

          <button className="btn-apply-full" onClick={handleApply}>
            동의하고 제휴사로 이동하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceScreen;
