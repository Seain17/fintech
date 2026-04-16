import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import exchangeRateData from '../../shared/data/exchangeRate.json';
import { STORAGE_KEYS, TIMING } from '../../shared/constants';
import { AppLogo, PinAmount } from '../../shared/components';

const HomeScreen = ({ userPoints, showToast, unreadCount = 0 }) => {
  const navigate = useNavigate();
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const pickCardsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 마이핀 PICK 가로 스크롤 - 마우스 드래그
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - pickCardsRef.current.offsetLeft);
    setScrollLeft(pickCardsRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - pickCardsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    pickCardsRef.current.scrollLeft = scrollLeft - walk;
  };

  // 마이핀 PICK 가로 스크롤 - 마우스 휠
  const handleWheel = (e) => {
    if (pickCardsRef.current) {
      e.preventDefault();
      pickCardsRef.current.scrollLeft += e.deltaY;
    }
  };

  // 전면 광고 모달 (첫 진입 시 표시)
  useEffect(() => {
    const hasSeenAd = sessionStorage.getItem(STORAGE_KEYS.HOME_AD_MODAL_SHOWN);
    if (!hasSeenAd) {
      setTimeout(() => {
        setShowAdModal(true);
      }, TIMING.AD_MODAL_DELAY);
    }
  }, []);

  const closeAdModal = () => {
    setShowAdModal(false);
    sessionStorage.setItem(STORAGE_KEYS.HOME_AD_MODAL_SHOWN, 'true');
  };

  const closeAdModalToday = () => {
    setShowAdModal(false);
    sessionStorage.setItem(STORAGE_KEYS.HOME_AD_MODAL_SHOWN, 'true');
    // 실제로는 localStorage에 날짜 저장하여 하루동안 안보이게 처리
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
        <AppLogo />
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
                  <PinAmount amount={userPoints} size="large" />
                </div>
              </div>
              <button className="mypin-detail-btn" onClick={() => navigate('/point-history')}>
                상세
              </button>
            </div>

            <button
              className={`mypin-convert-btn ${isPartnerOpen ? 'open' : ''}`}
              onClick={() => setIsPartnerOpen(!isPartnerOpen)}
            >
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d={isPartnerOpen ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} />
              </svg>
              <span>{isPartnerOpen ? '접기' : '숨어있는 마이핀 전환하기'}</span>
            </button>

            {/* 핀 적립 아이콘들 */}
            <div className={`point-partners ${isPartnerOpen ? 'open' : ''}`}>
              <div className="point-partner-item">
                <div className="partner-icon-text hana" onClick={() => showToast('하나페이 연동')}>
                  <span>하나</span>
                </div>
                <div className="partner-info">
                  <span className="partner-name">하나페이</span>
                  <span className="partner-points"><PinAmount amount={100} size="small" /></span>
                </div>
                <button className="partner-action-btn" onClick={() => showToast('전환 완료')}>전환</button>
              </div>
              <div className="point-partner-item">
                <div className="partner-icon-img" onClick={() => showToast('페이북 연동')}>
                  <img src="/images/icons/shinhan-sol.png" alt="페이북" />
                </div>
                <div className="partner-info">
                  <span className="partner-name">페이북</span>
                  <span className="partner-points"><PinAmount amount={100} size="small" /></span>
                </div>
                <button className="partner-action-btn" onClick={() => showToast('전환 완료')}>전환</button>
              </div>
              <div className="point-partner-item">
                <div className="partner-icon-img" onClick={() => showToast('신한SOL 연동')}>
                  <img src="/images/icons/kakao-pay.png" alt="신한SOL" />
                </div>
                <div className="partner-info">
                  <span className="partner-name">신한SOL</span>
                  <span className="partner-points"><PinAmount amount={100} size="small" /></span>
                </div>
                <button className="partner-action-btn" onClick={() => showToast('전환 완료')}>전환</button>
              </div>
              <div className="point-partner-item">
                <div className="partner-icon-img" onClick={() => showToast('카카오페이 연동')}>
                  <img src="/images/icons/toss-pay.png" alt="카카오페이" />
                </div>
                <div className="partner-info">
                  <span className="partner-name">카카오페이</span>
                  <span className="partner-points">미연결</span>
                </div>
                <button className="partner-action-btn connect" onClick={() => showToast('연결하기')}>연결하기</button>
              </div>
            </div>
          </div>
        </div>

        {/* 마이핀 PICK 섹션 */}
        <div className="pick-section">
          <h2 className="pick-title">마이핀 <span>PICK</span></h2>
          <div
            className={`pick-cards ${isDragging ? 'dragging' : ''}`}
            ref={pickCardsRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
          >
            <img src="/images/banners/01_pick.png" alt="pick 배너 1" className="pick-banner-img" draggable="false" onClick={() => navigate('/benefits', { state: { scrollTo: 'raffle' } })} />
            <img src="/images/banners/02_pick.png" alt="pick 배너 2" className="pick-banner-img" draggable="false" onClick={() => navigate('/finance', { state: { tab: 'recommend' } })} />
            <img src="/images/banners/03_pick.png" alt="pick 배너 3" className="pick-banner-img" draggable="false" onClick={() => navigate('/finance', { state: { tab: 'card' } })} />
          </div>
        </div>

        {/* 동영상 광고 배너 */}
        <div className="video-ad-banner" onClick={() => navigate('/card-top10/bc')}>
          {!videoEnded ? (
            <>
              <video
                className="video-ad-player"
                src="/images/banners/ad-video-bc.mp4"
                autoPlay
                muted
                playsInline
                poster="/images/banners/ad-poster.png"
                onEnded={() => setVideoEnded(true)}
              />
              <div className="video-ad-overlay">
                <span className="video-ad-badge">AD</span>
              </div>
            </>
          ) : (
            <>
              <img
                className="video-ad-player"
                src="/images/banners/main_banner-bc.png"
                alt="BC카드 배너"
              />
              <div className="video-ad-overlay">
                <span className="video-ad-badge">AD</span>
              </div>
            </>
          )}
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
              <img src="/images/icons/raffle.png" alt="경품" />
            </div>
            <span>경품</span>
          </div>
          <div className="quick-grid-item" onClick={() => navigate('/walking')}>
            <div className="quick-grid-icon-img">
              <img src="/images/icons/walking.png" alt="에코만보기" />
            </div>
            <span>에코만보기</span>
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

        {/* 하단 띠배너 */}
        <div className="bottom-ad-banner" onClick={() => navigate('/card-top10/bc')}>
          <img src="/images/banners/bottom_banner-bc.png" alt="BC카드 배너" />
        </div>
      </div>

      {/* 전면 광고 모달 */}
      {showAdModal && (
        <div className="home-ad-modal-overlay">
          <div className="home-ad-modal">
            <button className="home-ad-modal-close" onClick={closeAdModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="home-ad-modal-content">
              <img
                src="/images/banners/modal-bc.png"
                alt="BC카드 광고"
                className="home-ad-modal-image"
                onClick={() => {
                  navigate('/card-top10/bc');
                  closeAdModal();
                }}
              />
            </div>
            <button className="home-ad-modal-skip" onClick={closeAdModalToday}>
              오늘 그만 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
