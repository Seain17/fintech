import React, { useState, useRef } from 'react';
import './FinanceScreen.css';

const FinanceScreen = ({ showToast }) => {
  const [activeCalcTab, setActiveCalcTab] = useState('card');
  const [showResult, setShowResult] = useState(false);
  const [activeProductTab, setActiveProductTab] = useState('card');

  // Refs for scroll sections
  const cardSectionRef = useRef(null);
  const insuranceSectionRef = useRef(null);
  const loanSectionRef = useRef(null);

  const handleProductTabClick = (tabId) => {
    setActiveProductTab(tabId);

    const sectionRef = {
      card: cardSectionRef,
      insurance: insuranceSectionRef,
      loan: loanSectionRef
    }[tabId];

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Card inputs
  const [cardCompany, setCardCompany] = useState('');
  const [monthlyUsage, setMonthlyUsage] = useState('');

  // Loan inputs
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanAmount, setLoanAmount] = useState('');

  // Insurance inputs
  const [insuranceType, setInsuranceType] = useState('');
  const [age, setAge] = useState('');

  const handleCalculate = () => {
    setShowResult(true);
    showToast('혜택 계산이 완료되었습니다!');
  };

  return (
    <div className="screen finance-screen">
      <div className="finance-header">
        <h1 className="page-title">금융</h1>
      </div>

      <div className="finance-content">
        <div className="finance-scroll-content">
          {/* 혜택 계산기 섹션 */}
          <div className="finance-calculator-card">
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#191F28', marginBottom: '8px', lineHeight: '1.4' }}>
                맞춤 금융 진단 🧐<br />
                <span style={{ color: '#3182F6' }}>혜택 계산기</span>
              </h2>
              <p style={{ fontSize: '13px', color: '#8B95A1' }}>10초 만에 혜택을 확인해보세요</p>
            </div>

            <div className="calc-tabs">
              <button
                className={`calc-tab ${activeCalcTab === 'card' ? 'active' : ''}`}
                onClick={() => { setActiveCalcTab('card'); setShowResult(false); }}
              >
                카드
              </button>
              <button
                className={`calc-tab ${activeCalcTab === 'loan' ? 'active' : ''}`}
                onClick={() => { setActiveCalcTab('loan'); setShowResult(false); }}
              >
                대출
              </button>
              <button
                className={`calc-tab ${activeCalcTab === 'insurance' ? 'active' : ''}`}
                onClick={() => { setActiveCalcTab('insurance'); setShowResult(false); }}
              >
                보험
              </button>
            </div>

            {activeCalcTab === 'card' && (
              <div className="calc-content-area active">
                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label>사용 중인 카드사</label>
                  <select className="input-select" value={cardCompany} onChange={(e) => setCardCompany(e.target.value)}>
                    <option value="">카드사를 선택해주세요</option>
                    <option value="shinhan">신한카드</option>
                    <option value="hyundai">현대카드</option>
                    <option value="samsung">삼성카드</option>
                    <option value="kb">KB국민카드</option>
                  </select>
                </div>
                <div className="input-group" style={{ marginBottom: '24px' }}>
                  <label>월 평균 이용 금액</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      className="input-text"
                      placeholder="예: 100"
                      style={{ paddingRight: '40px' }}
                      value={monthlyUsage}
                      onChange={(e) => setMonthlyUsage(e.target.value)}
                    />
                    <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8B95A1' }}>만원</span>
                  </div>
                </div>
              </div>
            )}

            {activeCalcTab === 'loan' && (
              <div className="calc-content-area active">
                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label>대출 목적</label>
                  <select className="input-select" value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)}>
                    <option value="">목적을 선택해주세요</option>
                    <option value="credit">신용대출</option>
                    <option value="house">주택담보대출</option>
                    <option value="car">자동차대출</option>
                  </select>
                </div>
                <div className="input-group" style={{ marginBottom: '24px' }}>
                  <label>필요한 금액</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      className="input-text"
                      placeholder="예: 5000"
                      style={{ paddingRight: '40px' }}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                    <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8B95A1' }}>만원</span>
                  </div>
                </div>
              </div>
            )}

            {activeCalcTab === 'insurance' && (
              <div className="calc-content-area active">
                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label>관심 보험 분야</label>
                  <select className="input-select" value={insuranceType} onChange={(e) => setInsuranceType(e.target.value)}>
                    <option value="">분야를 선택해주세요</option>
                    <option value="car">자동차보험</option>
                    <option value="health">실손의료비</option>
                    <option value="cancer">암보험</option>
                  </select>
                </div>
                <div className="input-group" style={{ marginBottom: '24px' }}>
                  <label>만 나이</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      className="input-text"
                      placeholder="예: 30"
                      style={{ paddingRight: '40px' }}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#8B95A1' }}>세</span>
                  </div>
                </div>
              </div>
            )}

            <button className="btn-calc" onClick={handleCalculate}>혜택 확인하기 &gt;</button>

            {showResult && (
              <div className="calc-result">
                <div style={{ background: '#F2F4F6', borderRadius: '12px', padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '13px', color: '#4E5968' }}>지금 바꾸면 월 예상 혜택</span>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#3182F6', marginTop: '4px' }}>+ 15,000 P</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid #3182F6', borderRadius: '12px', background: '#F0F7FF' }}>
                  <div style={{ width: '40px', height: '26px', background: '#3182F6', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#3182F6' }}>추천 1위</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#191F28' }}>에이닉 제휴 신한카드</div>
                  </div>
                  <button style={{ background: '#3182F6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }} onClick={() => showToast('신청 페이지로 이동합니다')}>신청</button>
                </div>
              </div>
            )}
          </div>

          {/* 상품 탭 네비게이션 */}
          <div className="product-tabs-container">
            <div className="product-tabs">
              <button
                className={`product-tab ${activeProductTab === 'card' ? 'active' : ''}`}
                onClick={() => handleProductTabClick('card')}
              >
                <span className="product-tab-icon">💳</span>
                <span className="product-tab-label">카드</span>
              </button>
              <button
                className={`product-tab ${activeProductTab === 'insurance' ? 'active' : ''}`}
                onClick={() => handleProductTabClick('insurance')}
              >
                <span className="product-tab-icon">🛡️</span>
                <span className="product-tab-label">보험</span>
              </button>
              <button
                className={`product-tab ${activeProductTab === 'loan' ? 'active' : ''}`}
                onClick={() => handleProductTabClick('loan')}
              >
                <span className="product-tab-icon">💸</span>
                <span className="product-tab-label">대출</span>
              </button>
            </div>
          </div>

          {/* 추천 카드 섹션 */}
          <div className="section" ref={cardSectionRef}>
            <div className="section-header">
              <h2 className="section-title">💳 추천 카드</h2>
            </div>
            <div className="card-list">
              <div className="finance-card" onClick={() => showToast('신한 Deep Dream 카드 신청 페이지로 이동합니다')}>
                <div className="finance-card-visual shinhan">
                  <div className="card-logo">신한</div>
                </div>
                <div className="finance-card-info">
                  <div className="finance-card-name">신한 Deep Dream 카드</div>
                  <div className="finance-card-benefit">모든 가맹점 0.7% 적립</div>
                  <div className="finance-card-reward">+5,000P 적립</div>
                </div>
              </div>

              <div className="finance-card" onClick={() => showToast('삼성 taptap O 카드 신청 페이지로 이동합니다')}>
                <div className="finance-card-visual samsung">
                  <div className="card-logo">삼성</div>
                </div>
                <div className="finance-card-info">
                  <div className="finance-card-name">삼성 taptap O 카드</div>
                  <div className="finance-card-benefit">편의점/카페 10% 할인</div>
                  <div className="finance-card-reward">+8,000P 적립</div>
                </div>
              </div>

              <div className="finance-card" onClick={() => showToast('KB국민 liiv Fit 카드 신청 페이지로 이동합니다')}>
                <div className="finance-card-visual kb">
                  <div className="card-logo">KB</div>
                </div>
                <div className="finance-card-info">
                  <div className="finance-card-name">KB국민 liiv Fit 카드</div>
                  <div className="finance-card-benefit">통신/스트리밍 10% 할인</div>
                  <div className="finance-card-reward">+6,000P 적립</div>
                </div>
              </div>

              <div className="finance-card" onClick={() => showToast('현대 Z Edition2 카드 신청 페이지로 이동합니다')}>
                <div className="finance-card-visual hyundai">
                  <div className="card-logo">현대</div>
                </div>
                <div className="finance-card-info">
                  <div className="finance-card-name">현대 Z Edition2 카드</div>
                  <div className="finance-card-benefit">배달앱/OTT 5% 적립</div>
                  <div className="finance-card-reward">+7,000P 적립</div>
                </div>
              </div>
            </div>
          </div>

          {/* 추천 보험 섹션 */}
          <div className="section" ref={insuranceSectionRef}>
            <div className="section-header">
              <h2 className="section-title">🛡️ 추천 보험</h2>
            </div>
            <div className="insurance-grid">
              <div className="insurance-card" onClick={() => showToast('실손보험 상담 신청이 완료되었습니다')}>
                <div className="insurance-icon">🏥</div>
                <div className="insurance-name">실손보험</div>
                <div className="insurance-desc">의료비 보장</div>
                <div className="insurance-reward">+3,000P</div>
              </div>

              <div className="insurance-card" onClick={() => showToast('운전자보험 상담 신청이 완료되었습니다')}>
                <div className="insurance-icon">🚗</div>
                <div className="insurance-name">운전자보험</div>
                <div className="insurance-desc">사고 대비</div>
                <div className="insurance-reward">+4,000P</div>
              </div>

              <div className="insurance-card" onClick={() => showToast('암보험 상담 신청이 완료되었습니다')}>
                <div className="insurance-icon">💊</div>
                <div className="insurance-name">암보험</div>
                <div className="insurance-desc">암 진단비</div>
                <div className="insurance-reward">+5,000P</div>
              </div>

              <div className="insurance-card" onClick={() => showToast('치아보험 상담 신청이 완료되었습니다')}>
                <div className="insurance-icon">🦷</div>
                <div className="insurance-name">치아보험</div>
                <div className="insurance-desc">치료비 보장</div>
                <div className="insurance-reward">+3,500P</div>
              </div>

              <div className="insurance-card" onClick={() => showToast('연금보험 상담 신청이 완료되었습니다')}>
                <div className="insurance-icon">💰</div>
                <div className="insurance-name">연금보험</div>
                <div className="insurance-desc">노후 대비</div>
                <div className="insurance-reward">+6,000P</div>
              </div>

              <div className="insurance-card" onClick={() => showToast('여행자보험 상담 신청이 완료되었습니다')}>
                <div className="insurance-icon">✈️</div>
                <div className="insurance-name">여행자보험</div>
                <div className="insurance-desc">해외 여행</div>
                <div className="insurance-reward">+2,000P</div>
              </div>
            </div>
          </div>

          {/* 추천 대출 섹션 */}
          <div className="section" ref={loanSectionRef}>
            <div className="section-header">
              <h2 className="section-title">💸 추천 대출</h2>
            </div>
            <div className="card-list">
              <div className="finance-card" onClick={() => showToast('카카오뱅크 비상금대출 신청 페이지로 이동합니다')}>
                <div className="finance-card-visual kakao">
                  <div className="card-logo">카카오</div>
                </div>
                <div className="finance-card-info">
                  <div className="finance-card-name">카카오뱅크 비상금대출</div>
                  <div className="finance-card-benefit">연 3.69% ~ 19.9%</div>
                  <div className="finance-card-reward">+10,000P 적립</div>
                </div>
              </div>

              <div className="finance-card" onClick={() => showToast('토스 마이너스통장 신청 페이지로 이동합니다')}>
                <div className="finance-card-visual toss">
                  <div className="card-logo">toss</div>
                </div>
                <div className="finance-card-info">
                  <div className="finance-card-name">토스 마이너스통장</div>
                  <div className="finance-card-benefit">연 3.5% ~ 14.9%</div>
                  <div className="finance-card-reward">+12,000P 적립</div>
                </div>
              </div>

              <div className="finance-card" onClick={() => showToast('KB국민은행 햇살론 신청 페이지로 이동합니다')}>
                <div className="finance-card-visual kb">
                  <div className="card-logo">KB</div>
                </div>
                <div className="finance-card-info">
                  <div className="finance-card-name">KB국민은행 햇살론</div>
                  <div className="finance-card-benefit">연 4.5% ~ 9.5%</div>
                  <div className="finance-card-reward">+8,000P 적립</div>
                </div>
              </div>

              <div className="finance-card" onClick={() => showToast('우리은행 직장인신용대출 신청 페이지로 이동합니다')}>
                <div className="finance-card-visual woori">
                  <div className="card-logo">우리</div>
                </div>
                <div className="finance-card-info">
                  <div className="finance-card-name">우리은행 직장인신용대출</div>
                  <div className="finance-card-benefit">연 3.2% ~ 12.5%</div>
                  <div className="finance-card-reward">+15,000P 적립</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceScreen;
