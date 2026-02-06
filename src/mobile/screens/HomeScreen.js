import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import exchangeRateData from '../../shared/data/exchangeRate.json';

const HomeScreen = ({ userPoints, showToast, isGuest }) => {
  const navigate = useNavigate();
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  const unreadCount = 3;

  const handleGuestBlock = () => {
    navigate('/signup');
  };

  const exchangeRate = {
    rate: exchangeRateData.USD.rate,
    change: exchangeRateData.USD.change
  };

  return (
    <div className="screen home-screen">
      {/* 스테이터스바 */}
      <div className="home-statusbar" />

      {/* 앱바 */}
      <div className="home-appbar">
        <button className="home-menu-btn" onClick={() => showToast('메뉴')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <div className="home-logo">LOGO</div>
        <button className="home-noti-btn" onClick={() => navigate('/notifications')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && <span className="home-noti-badge">{unreadCount}</span>}
        </button>
      </div>

      {/* 스크롤 콘텐츠 */}
      <div className="home-content">
        {/* 마이핀 모으기 섹션 */}
        <div className="mypin-section">
          <div className="mypin-header">
            <span className="mypin-title">마이핀 모으기</span>
          </div>

          <div className="mypin-card">
            <div className="mypin-card-top">
              <div className="mypin-info">
                <span className="mypin-label">나의 에이핀</span>
                <div className="mypin-value">
                  <span className="mypin-amount">{userPoints.toLocaleString()}</span>
                  <span className="mypin-unit">핀</span>
                </div>
              </div>
              <button className="mypin-detail-btn" onClick={() => isGuest ? handleGuestBlock() : navigate('/point-history')}>
                상세
              </button>
            </div>

            <button
              className={`mypin-convert-btn ${isPartnerOpen ? 'open' : ''}`}
              onClick={() => isGuest ? handleGuestBlock() : setIsPartnerOpen(!isPartnerOpen)}
            >
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d={isPartnerOpen ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} />
              </svg>
              <span>{isPartnerOpen ? '접기' : '숨어있는 마이핀 전환하기'}</span>
            </button>

            {/* 포인트 적립 아이콘들 */}
            <div className={`point-partners ${isPartnerOpen ? 'open' : ''}`}>
              <div className="point-partner-item">
                <div className="partner-icon-img" onClick={() => showToast('네이버페이 연동')}>
                  <img src="/images/icons/naver-pay.png" alt="네이버페이" />
                </div>
                <span className="partner-points">100 P</span>
                <button className="partner-action-btn" onClick={() => showToast('전환 완료')}>전환</button>
              </div>
              <div className="point-partner-item">
                <div className="partner-icon-img" onClick={() => showToast('페이북 연동')}>
                  <img src="/images/icons/toss-pay.png" alt="페이북" />
                </div>
                <span className="partner-points">100 P</span>
                <button className="partner-action-btn" onClick={() => showToast('전환 완료')}>전환</button>
              </div>
              <div className="point-partner-item">
                <div className="partner-icon-img" onClick={() => showToast('신한SOL 연동')}>
                  <img src="/images/icons/shinhan-sol.png" alt="신한SOL" />
                </div>
                <span className="partner-points">100 P</span>
                <button className="partner-action-btn" onClick={() => showToast('전환 완료')}>전환</button>
              </div>
              <div className="point-partner-item">
                <div className="partner-icon-img" onClick={() => showToast('카카오페이 연동')}>
                  <img src="/images/icons/kakao-pay.png" alt="카카오페이" />
                </div>
                <span className="partner-points">-</span>
                <button className="partner-action-btn connect" onClick={() => showToast('연결하기')}>연결하기</button>
              </div>
            </div>
          </div>
        </div>

        {/* 마이핀 PICK 섹션 */}
        <div className="pick-section">
          <h2 className="pick-title">마이핀 <span>PICK</span></h2>
          <div className="pick-cards">
            <div className="pick-card yellow" onClick={() => navigate('/benefits')}>
              <div className="pick-card-text">
                <p>포인트</p>
                <p>모으기</p>
              </div>
              <div className="pick-card-icon-img">
                <img src="/images/icons/recommend.png" alt="" />
              </div>
            </div>
            <div className="pick-card blue" onClick={() => showToast('카드 추천 페이지')}>
              <div className="pick-card-text">
                <p>가장 혜택</p>
                <p>좋은카드는?</p>
              </div>
              <div className="pick-card-icon-img">
                <img src="/images/icons/card.png" alt="" />
              </div>
            </div>
            <div className="pick-card pink" onClick={() => showToast('보험 추천 페이지')}>
              <div className="pick-card-text">
                <p>보험</p>
                <p>추천</p>
              </div>
              <div className="pick-card-icon-img">
                <img src="/images/icons/insurance.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* 꿀정보 배너 */}
        <div className="info-banner" onClick={() => navigate('/benefits')}>
          <div className="info-banner-content">
            <p className="info-banner-title">이미소 대리가</p>
            <p className="info-banner-title">알려주는 꿀정보!</p>
            <button className="info-banner-btn">
              <span>다양한 경품 응모하기</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          <div className="info-banner-character">
            <img src="/images/icons/banner-character.png" alt="" />
          </div>
        </div>

        {/* 퀵메뉴 */}
        <div className="quick-grid">
          <div className="quick-grid-item" onClick={() => showToast('카드 페이지')}>
            <div className="quick-grid-icon-img">
              <img src="/images/icons/card.png" alt="카드" />
            </div>
            <span>카드</span>
          </div>
          <div className="quick-grid-item" onClick={() => showToast('보험 페이지')}>
            <div className="quick-grid-icon-img">
              <img src="/images/icons/insurance.png" alt="보험" />
            </div>
            <span>보험</span>
          </div>
          <div className="quick-grid-item" onClick={() => showToast('대출 페이지')}>
            <div className="quick-grid-icon-img">
              <img src="/images/icons/loan.png" alt="대출" />
            </div>
            <span>대출</span>
          </div>
          <div className="quick-grid-item" onClick={() => showToast('추천 페이지')}>
            <div className="quick-grid-icon-img">
              <img src="/images/icons/recommend.png" alt="추천" />
            </div>
            <span>추천</span>
          </div>
          <div className="quick-grid-item" onClick={() => navigate('/attendance')}>
            <div className="quick-grid-icon-img">
              <img src="/images/icons/attendance.png" alt="출석체크" />
            </div>
            <span>출석체크</span>
          </div>
          <div className="quick-grid-item" onClick={() => navigate('/benefits')}>
            <div className="quick-grid-icon-img">
              <img src="/images/icons/raffle.png" alt="래플" />
            </div>
            <span>래플</span>
          </div>
          <div className="quick-grid-item" onClick={() => showToast('만보걷기 페이지')}>
            <div className="quick-grid-icon-img">
              <img src="/images/icons/walking.png" alt="만보걷기" />
            </div>
            <span>만보걷기</span>
          </div>
          <div className="quick-grid-item" onClick={() => navigate('/quiz')}>
            <div className="quick-grid-icon-img">
              <img src="/images/icons/quiz.png" alt="오늘의 퀴즈" />
            </div>
            <span>오늘의 퀴즈</span>
          </div>
        </div>

        {/* 오늘의 소식 */}
        <div className="news-section">
          <div className="news-header">
            <h2 className="news-title">오늘의 소식</h2>
            <span className="news-icon">📈</span>
          </div>

          <div className="market-card">
            <div className="market-row">
              <span className="market-name">US 나스닥</span>
              <span className="market-value">15,620.40 <span className="change up">▲0.3%</span></span>
            </div>
            <div className="market-row">
              <span className="market-name">KR 코스피</span>
              <span className="market-value">4,949.67 <span className="change down">▼5.26%</span></span>
            </div>
            <div className="market-row">
              <span className="market-name">KR 코스닥</span>
              <span className="market-value">1,098.36 <span className="change down">▼4.44%</span></span>
            </div>
            <div className="market-row">
              <span className="market-name">US 달러 환율</span>
              <span className="market-value">
                {exchangeRate.rate}원{' '}
                <span className={`change ${parseFloat(exchangeRate.change) >= 0 ? 'up' : 'down'}`}>
                  {parseFloat(exchangeRate.change) >= 0 ? '▲' : '▼'}{Math.abs(parseFloat(exchangeRate.change))}%
                </span>
              </span>
            </div>
            <div className="market-row">
              <span className="market-name">🟡 금 시세</span>
              <span className="market-value">96,500원 <span className="change up">▲1.2%</span></span>
            </div>
          </div>

          <div className="news-card-list">
            <div className="news-item" onClick={() => showToast('뉴스 상세')}>
              <div className="news-item-left">
                <span className="news-date-badge">WED<br/>04</span>
              </div>
              <div className="news-item-content">
                <span className="news-item-badge">뉴스레터</span>
                <p className="news-item-title">코스피, 7% 가까이 급등하며 사상 최고치...</p>
              </div>
            </div>
            <div className="news-item" onClick={() => showToast('뉴스 상세')}>
              <div className="news-item-left">
                <span className="news-emoji">📊</span>
              </div>
              <div className="news-item-content">
                <span className="news-item-badge">모닝 브리핑</span>
                <p className="news-item-title">S/W 기업 주가 약세 부각된 미국 증시</p>
              </div>
            </div>
            <div className="news-item" onClick={() => showToast('뉴스 상세')}>
              <div className="news-item-left">
                <span className="news-emoji">🌤️</span>
              </div>
              <div className="news-item-content">
                <span className="news-item-badge">산책지수</span>
                <p className="news-item-title">오늘의 산책 지수를 알아볼까요?</p>
              </div>
            </div>
          </div>

          <p className="news-footer">네이버 뉴스 제공 · 매일 오전 10시 업데이트</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
