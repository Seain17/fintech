import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinanceScreen.css';
import { SamsungFireBanner } from '../components/AdBanner';
import '../components/AdBanner.css';
import { AppLogo } from '../../shared/components';
import {
  cardProducts,
  loanProducts,
  insuranceProducts,
  stockProducts,
  loanCategories,
  insuranceCategories,
  stockCategories,
} from '../../shared/data/financeProducts';

/**
 * 금융 탭: 3단 구조 화면
 *
 * [계산기] - Search & Algorithm (법규 준수)
 *   → 금리 낮은 순 → 한도 높은 순 (자가평가서 기준)
 *
 * [카드] / [대출] - Curation (전략적 추천)
 *   → 에이핀 핀 높은 순
 */

const FinanceScreen = ({ showToast, unreadCount = 0 }) => {
  const navigate = useNavigate();

  // 메인 탭 상태
  const [mainTab, setMainTab] = useState('calculator');

  // ============================================
  // 계산기 탭 상태
  // ============================================
  const [calcStep, setCalcStep] = useState('select'); // 'select' | 'option' | 'result'
  const [calcType, setCalcType] = useState(null); // 'card' | 'loan'
  const [calcCardBenefit, setCalcCardBenefit] = useState('all'); // 카드 혜택 선택
  const [calcLoanType, setCalcLoanType] = useState('credit'); // 대출 종류 선택
  const [calcFilters, setCalcFilters] = useState({
    minRate: 0,
    maxRate: 20,
    minLimit: 0,
    maxLimit: 200000,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [calcResults, setCalcResults] = useState([]);

  // ============================================
  // 카드 탭 상태
  // ============================================
  const [cardFilter, setCardFilter] = useState('all');
  const [cardBrand, setCardBrand] = useState('all');

  // ============================================
  // 대출 탭 상태
  // ============================================
  const [loanCategory, setLoanCategory] = useState('credit');
  const [loanSortBy, setLoanSortBy] = useState('rate');
  const [loanBrand, setLoanBrand] = useState('all');

  // ============================================
  // 보험 탭 상태
  // ============================================
  const [insuranceCategory, setInsuranceCategory] = useState('health');
  const [insuranceBrand, setInsuranceBrand] = useState('all');

  // ============================================
  // 증권 탭 상태
  // ============================================
  const [stockCategory, setStockCategory] = useState('stock');
  const [stockBrand, setStockBrand] = useState('all');

  // ============================================
  // 브랜드 목록 정의
  // ============================================
  const cardBrands = [
    { id: 'all', label: '전체' },
    { id: '신한카드', label: '신한' },
    { id: '삼성카드', label: '삼성' },
    { id: '현대카드', label: '현대' },
    { id: 'KB국민카드', label: 'KB국민' },
    { id: '하나카드', label: '하나' },
  ];

  const loanBrands = [
    { id: 'all', label: '전체' },
    { id: '토스뱅크', label: '토스' },
    { id: 'KB국민은행', label: 'KB국민' },
    { id: '카카오뱅크', label: '카카오' },
    { id: '하나은행', label: '하나' },
    { id: '신한은행', label: '신한' },
  ];

  const insuranceBrands = [
    { id: 'all', label: '전체' },
    { id: '삼성생명', label: '삼성' },
    { id: '한화생명', label: '한화' },
    { id: '현대해상', label: '현대' },
    { id: 'DB손해보험', label: 'DB' },
    { id: '메리츠화재', label: '메리츠' },
  ];

  const stockBrands = [
    { id: 'all', label: '전체' },
    { id: '삼성증권', label: '삼성' },
    { id: '미래에셋증권', label: '미래에셋' },
    { id: 'NH투자증권', label: 'NH' },
    { id: '키움증권', label: '키움' },
    { id: '토스증권', label: '토스' },
    { id: 'KB증권', label: 'KB' },
  ];

  // ============================================
  // 바텀시트 상태
  // ============================================
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ============================================
  // 계산기 검색 실행
  // ============================================
  const runCalculation = () => {
    setIsLoading(true);

    setTimeout(() => {
      if (calcType === 'card') {
        // 카드: 혜택별 필터 후 핀 높은 순
        const sorted = [...cardProducts]
          .filter(card => calcCardBenefit === 'all' || card.category === calcCardBenefit || card.category === 'all')
          .sort((a, b) => b.benefitPoints - a.benefitPoints);
        setCalcResults(sorted);
      } else {
        // 대출: 자가평가서 기준 정렬 (금리 낮은 순 → 한도 높은 순)
        const sorted = [...loanProducts]
          .filter(loan => loan.category === calcLoanType)
          .sort((a, b) => {
            if (a.interestRate !== b.interestRate) {
              return a.interestRate - b.interestRate;
            }
            return b.maxLimit - a.maxLimit;
          });
        setCalcResults(sorted);
      }
      setIsLoading(false);
      setCalcStep('result');
    }, 1500);
  };

  // 대출 결과에서 필터 적용
  const getFilteredLoanResults = () => {
    return calcResults.filter(loan => {
      if (loan.interestRate < calcFilters.minRate) return false;
      if (loan.interestRate > calcFilters.maxRate) return false;
      if (loan.maxLimit < calcFilters.minLimit) return false;
      if (loan.maxLimit > calcFilters.maxLimit) return false;
      return true;
    });
  };

  // 계산기 초기화
  const resetCalculator = () => {
    setCalcStep('select');
    setCalcType(null);
    setCalcResults([]);
    setCalcFilters({
      minRate: 0,
      maxRate: 20,
      minLimit: 0,
      maxLimit: 200000,
    });
  };

  // ============================================
  // 카드 정렬: 에이핀 핀 높은 순 + 브랜드 필터
  // ============================================
  const getSortedCards = () => {
    return [...cardProducts]
      .filter(card => cardFilter === 'all' || card.category === cardFilter || card.category === 'all')
      .filter(card => cardBrand === 'all' || card.company === cardBrand)
      .sort((a, b) => b.benefitPoints - a.benefitPoints);
  };

  // ============================================
  // 대출 정렬: 핀순 또는 금리순 + 브랜드 필터
  // ============================================
  const getSortedLoans = () => {
    const filtered = [...loanProducts]
      .filter(loan => loan.category === loanCategory)
      .filter(loan => loanBrand === 'all' || loan.company === loanBrand);
    if (loanSortBy === 'limit') {
      return filtered.sort((a, b) => b.maxLimit - a.maxLimit);
    }
    // 기본: 금리 낮은 순
    return filtered.sort((a, b) => a.interestRate - b.interestRate);
  };

  // ============================================
  // 보험 정렬: 핀 높은 순 + 브랜드 필터
  // ============================================
  const getSortedInsurance = () => {
    return [...insuranceProducts]
      .filter(ins => insuranceCategory === 'all' || ins.category === insuranceCategory)
      .filter(ins => insuranceBrand === 'all' || ins.company === insuranceBrand)
      .sort((a, b) => b.benefitPoints - a.benefitPoints);
  };

  // ============================================
  // 증권 정렬: 핀 높은 순 + 브랜드 필터
  // ============================================
  const getSortedStocks = () => {
    return [...stockProducts]
      .filter(stock => stockCategory === 'all' || stock.category === stockCategory)
      .filter(stock => stockBrand === 'all' || stock.company === stockBrand)
      .sort((a, b) => b.benefitPoints - a.benefitPoints);
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

  // ============================================
  // 렌더링
  // ============================================
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

      {/* 메인 탭 */}
      <div className="main-tabs-v3">
        <button
          className={`main-tab-v3 ${mainTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setMainTab('calculator')}
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
          className={`main-tab-v3 ${mainTab === 'stock' ? 'active' : ''}`}
          onClick={() => setMainTab('stock')}
        >
          증권
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
        {/* ========== 계산기 탭 ========== */}
        {mainTab === 'calculator' && (
          <div className="calc-section">
            {/* Step 1: 카드/대출 선택 */}
            {calcStep === 'select' && (
              <div className="calc-card-v3">
                <div className="calc-header-v3">
                  <h2 className="calc-title-v3">
                    나에게 맞는<br />
                    <span className="accent">최적 상품 찾기</span>
                  </h2>
                  <p className="calc-subtitle-v3">
                    금융소비자보호법에 따라<br />
                    유리한 조건 순으로 추천해드려요
                  </p>
                </div>

                <div className="calc-type-select">
                  <label className="category-label">어떤 상품을 찾으세요?</label>
                  <div className="calc-type-buttons">
                    <button
                      className="calc-type-btn"
                      onClick={() => {
                        setCalcType('card');
                        setCalcStep('option');
                      }}
                    >
                      <span className="type-icon">💳</span>
                      <span className="type-label">카드</span>
                      <span className="type-desc">혜택 맞춤 추천</span>
                    </button>
                    <button
                      className="calc-type-btn"
                      onClick={() => {
                        setCalcType('loan');
                        setCalcStep('option');
                      }}
                    >
                      <span className="type-icon">💰</span>
                      <span className="type-label">대출</span>
                      <span className="type-desc">금리 비교 추천</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: 옵션 선택 */}
            {calcStep === 'option' && (
              <div className="calc-card-v3">
                <button className="calc-back-btn" onClick={resetCalculator}>
                  ← 다시 선택
                </button>

                <div className="calc-header-v3">
                  <h2 className="calc-title-v3">
                    {calcType === 'card' ? '카드 혜택' : '대출 종류'}<br />
                    <span className="accent">선택하기</span>
                  </h2>
                </div>

                {calcType === 'card' ? (
                  <div className="calc-option-select">
                    <label className="category-label">어떤 혜택이 필요하세요?</label>
                    <div className="select-wrapper">
                      <select
                        className="category-dropdown"
                        value={calcCardBenefit}
                        onChange={(e) => setCalcCardBenefit(e.target.value)}
                      >
                        <option value="all">전체 혜택</option>
                        <option value="shopping">쇼핑 할인</option>
                        <option value="food">외식/카페</option>
                        <option value="transport">교통/통신</option>
                      </select>
                      <span className="select-arrow">▼</span>
                    </div>
                  </div>
                ) : (
                  <div className="calc-option-select">
                    <label className="category-label">어떤 대출이 필요하세요?</label>
                    <div className="select-wrapper">
                      <select
                        className="category-dropdown"
                        value={calcLoanType}
                        onChange={(e) => setCalcLoanType(e.target.value)}
                      >
                        <option value="credit">신용대출</option>
                        <option value="mortgage">주택담보대출</option>
                        <option value="car">자동차대출</option>
                      </select>
                      <span className="select-arrow">▼</span>
                    </div>
                  </div>
                )}

                <button className="calc-btn-v3" onClick={runCalculation}>
                  최적 상품 찾기
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            )}

            {/* 로딩 */}
            {isLoading && (
              <div className="loading-section">
                <div className="loading-spinner"></div>
                <p className="loading-text">
                  나에게 유리한 {calcType === 'card' ? '카드를' : '대출을'}<br />찾고 있어요
                </p>
              </div>
            )}

            {/* Step 3: 결과 */}
            {calcStep === 'result' && !isLoading && (
              <div className="calc-result-section">
                <button className="calc-back-btn" onClick={resetCalculator}>
                  ← 다시 검색
                </button>

                {calcType === 'card' ? (
                  <>
                    {/* 카드 결과 */}
                    <div className="legal-sort-notice">
                      <span className="legal-icon">🎁</span>
                      <span>혜택이 좋은 순으로 정렬되었습니다</span>
                    </div>

                    {calcResults.length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon">🔍</div>
                        <div className="empty-title">검색 결과가 없습니다</div>
                        <div className="empty-desc">
                          선택하신 조건에 맞는 카드가 없어요.<br />
                          다른 혜택을 선택해 보세요.
                        </div>
                        <button className="btn-reset" onClick={resetCalculator}>
                          다시 검색하기
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="top-recommend-card">
                          <div className="top-recommend-badge">🏆 추천 1위</div>
                          <div className="top-recommend-hook">
                            +{calcResults[0]?.benefitPoints.toLocaleString()}핀
                          </div>
                          <div className="top-recommend-sub">
                            {calcResults[0]?.name}
                          </div>
                        </div>

                        <div className="product-list-v3">
                          {calcResults.map((card, index) => (
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
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* 대출 결과 */}
                    <div className="legal-sort-notice">
                      <span className="legal-icon">⚖️</span>
                      <span>금융소비자보호법에 따라 금리가 낮은 순으로 정렬되었습니다</span>
                    </div>

                    {/* 대출 결과에서 조건 설정 슬라이더 */}
                    <div className="result-filter-panel">
                      <div className="filter-item">
                        <label>
                          금리 범위
                          <span className="filter-value">{calcFilters.minRate}% ~ {calcFilters.maxRate}%</span>
                        </label>
                        <div className="range-slider-container">
                          <div
                            className="range-slider-track"
                            style={{
                              '--min-percent': `${(calcFilters.minRate / 20) * 100}%`,
                              '--max-percent': `${(calcFilters.maxRate / 20) * 100}%`
                            }}
                          />
                          <input
                            type="range"
                            className="range-slider-input"
                            min="0"
                            max="20"
                            step="0.5"
                            value={calcFilters.minRate}
                            onChange={(e) => setCalcFilters(prev => ({
                              ...prev,
                              minRate: Math.min(parseFloat(e.target.value), prev.maxRate - 0.5)
                            }))}
                          />
                          <input
                            type="range"
                            className="range-slider-input"
                            min="0"
                            max="20"
                            step="0.5"
                            value={calcFilters.maxRate}
                            onChange={(e) => setCalcFilters(prev => ({
                              ...prev,
                              maxRate: Math.max(parseFloat(e.target.value), prev.minRate + 0.5)
                            }))}
                          />
                        </div>
                        <div className="range-slider-labels">
                          <span>0%</span>
                          <span>20%</span>
                        </div>
                      </div>

                      <div className="filter-item">
                        <label>
                          대출 한도
                          <span className="filter-value">
                            {calcFilters.minLimit === 0 ? '0' : (calcFilters.minLimit / 10000).toFixed(0) + '억'} ~ {(calcFilters.maxLimit / 10000).toFixed(0)}억
                          </span>
                        </label>
                        <div className="range-slider-container">
                          <div
                            className="range-slider-track"
                            style={{
                              '--min-percent': `${(calcFilters.minLimit / 200000) * 100}%`,
                              '--max-percent': `${(calcFilters.maxLimit / 200000) * 100}%`
                            }}
                          />
                          <input
                            type="range"
                            className="range-slider-input"
                            min="0"
                            max="200000"
                            step="5000"
                            value={calcFilters.minLimit}
                            onChange={(e) => setCalcFilters(prev => ({
                              ...prev,
                              minLimit: Math.min(parseInt(e.target.value), prev.maxLimit - 5000)
                            }))}
                          />
                          <input
                            type="range"
                            className="range-slider-input"
                            min="0"
                            max="200000"
                            step="5000"
                            value={calcFilters.maxLimit}
                            onChange={(e) => setCalcFilters(prev => ({
                              ...prev,
                              maxLimit: Math.max(parseInt(e.target.value), prev.minLimit + 5000)
                            }))}
                          />
                        </div>
                        <div className="range-slider-labels">
                          <span>0</span>
                          <span>20억</span>
                        </div>
                      </div>
                    </div>

                    {getFilteredLoanResults().length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon">🔍</div>
                        <div className="empty-title">검색 결과가 없습니다</div>
                        <div className="empty-desc">
                          선택하신 조건에 맞는 금융상품이 없어요.<br />
                          금리나 한도 조건을 변경해 보세요.
                        </div>
                        <button
                          className="btn-reset"
                          onClick={() => setCalcFilters({
                            minRate: 0,
                            maxRate: 20,
                            minLimit: 0,
                            maxLimit: 200000,
                          })}
                        >
                          필터 초기화
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="top-recommend-card rate">
                          <div className="top-recommend-badge">🏆 최저금리 1위</div>
                          <div className="top-recommend-hook">
                            연 {getFilteredLoanResults()[0]?.interestRate}% ~
                          </div>
                          <div className="top-recommend-sub">
                            {getFilteredLoanResults()[0]?.name}
                          </div>
                        </div>

                        <div className="product-list-v3">
                          {getFilteredLoanResults().map((loan, index) => (
                            <div key={loan.id} className="product-card-horizontal" onClick={() => handleProductClick(loan)}>
                              <div className="product-rank-badge">{index === 0 ? '👑' : index + 1}</div>
                              <div className="product-logo-sm" style={{ background: loan.color }}>
                                <span>{loan.logo}</span>
                              </div>
                              <div className="product-info-inline">
                                <span className="product-name-inline">{loan.name}</span>
                                <span className="product-rate-inline">연 {loan.interestRate}%~ · 최대 {loan.maxLimit >= 10000 ? (loan.maxLimit / 10000) + '억' : (loan.maxLimit / 1000) + '천만'}원</span>
                              </div>
                              <div className="product-point-inline">{loan.interestRate}%</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
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

            <div className="brand-filter-bar">
              {cardBrands.map((brand) => (
                <button
                  key={brand.id}
                  className={`brand-filter-btn ${cardBrand === brand.id ? 'active' : ''}`}
                  onClick={() => setCardBrand(brand.id)}
                >
                  {brand.label}
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

            <div className="brand-filter-bar">
              {loanBrands.map((brand) => (
                <button
                  key={brand.id}
                  className={`brand-filter-btn ${loanBrand === brand.id ? 'active' : ''}`}
                  onClick={() => setLoanBrand(brand.id)}
                >
                  {brand.label}
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

        {/* ========== 보험 탭 ========== */}
        {mainTab === 'insurance' && (
          <div className="insurance-section">
            <div className="insurance-category-bar">
              {insuranceCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`insurance-category-btn ${insuranceCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setInsuranceCategory(cat.id)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-label">{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="brand-filter-bar">
              {insuranceBrands.map((brand) => (
                <button
                  key={brand.id}
                  className={`brand-filter-btn ${insuranceBrand === brand.id ? 'active' : ''}`}
                  onClick={() => setInsuranceBrand(brand.id)}
                >
                  {brand.label}
                </button>
              ))}
            </div>

            <div className="sort-text-corner">핀 적립순</div>

            <div className="product-list-v3">
              {getSortedInsurance().map((ins, index) => (
                <div key={ins.id} className="product-card-horizontal" onClick={() => handleProductClick(ins)}>
                  <div className="product-rank-badge">{index === 0 ? '👑' : index + 1}</div>
                  <div className="product-logo-sm" style={{ background: ins.color }}>
                    <span>{ins.logo}</span>
                  </div>
                  <div className="product-info-inline">
                    <span className="product-name-inline">{ins.name}</span>
                    <span className="product-benefit-inline">월 {ins.monthlyPremium.toLocaleString()}원 · {ins.coverage}</span>
                  </div>
                  <div className="product-point-inline">+{ins.benefitPoints.toLocaleString()}핀</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== 증권 탭 ========== */}
        {mainTab === 'stock' && (
          <div className="stock-section">
            <div className="stock-category-bar">
              {stockCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`stock-category-btn ${stockCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setStockCategory(cat.id)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-label">{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="brand-filter-bar">
              {stockBrands.map((brand) => (
                <button
                  key={brand.id}
                  className={`brand-filter-btn ${stockBrand === brand.id ? 'active' : ''}`}
                  onClick={() => setStockBrand(brand.id)}
                >
                  {brand.label}
                </button>
              ))}
            </div>

            <div className="sort-text-corner">핀 적립순</div>

            <div className="product-list-v3">
              {getSortedStocks().map((stock, index) => (
                <div key={stock.id} className="product-card-horizontal" onClick={() => handleProductClick(stock)}>
                  <div className="product-rank-badge">{index === 0 ? '👑' : index + 1}</div>
                  <div className="product-logo-sm" style={{ background: stock.color }}>
                    <span>{stock.logo}</span>
                  </div>
                  <div className="product-info-inline">
                    <span className="product-name-inline">{stock.name}</span>
                    <span className="product-benefit-inline">{stock.benefit}</span>
                  </div>
                  <div className="product-point-inline">+{stock.benefitPoints.toLocaleString()}핀</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 광고 배너 - 삼성화재 (추천 탭에서만 표시) */}
      {mainTab === 'calculator' && SamsungFireBanner()}

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
