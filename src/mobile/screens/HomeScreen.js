import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import exchangeRateData from '../../shared/data/exchangeRate.json';

const HomeScreen = ({ userPoints, showToast, isGuest }) => {
  const navigate = useNavigate();

  // 읽지 않은 알림 개수 (임시)
  const unreadCount = 3;

  const handleGuestBlock = () => {
    navigate('/signup');
  };

  // JSON 파일에서 환율 데이터 직접 사용
  const exchangeRate = {
    rate: exchangeRateData.USD.rate,
    change: exchangeRateData.USD.change
  };

  return (
    <div className="screen home-screen">
      <div className="home-header">
        <div className="home-header-top">
          <div className="home-logo">에이핀</div>
          <div className="home-header-icons">
            <button className="home-icon-btn noti-btn" onClick={() => navigate('/notifications')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {unreadCount > 0 && (
                <span className="noti-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
              )}
            </button>
          </div>
        </div>

        <div className="point-card">
          <div className="point-card-label">내 에이핀 포인트</div>
          <div className="point-card-value">{userPoints.toLocaleString()} <span>P</span></div>
          <div className="point-actions">
            <button className="point-action-btn withdraw" onClick={() => isGuest ? handleGuestBlock() : navigate('/withdraw')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              출금하기
            </button>
            <button className="point-action-btn exchange" onClick={() => isGuest ? handleGuestBlock() : showToast('기프티콘 교환')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 12V8H6M4 12v4h14M4 8l3-3 3 3M20 16l-3 3-3-3" />
              </svg>
              교환하기
            </button>
          </div>
        </div>
      </div>

      <div className="quick-menu">
        <button className="quick-item" onClick={() => showToast('하나 트래블로그 페이지로 이동')}>
          <div className="quick-icon" style={{ background: 'rgba(0, 148, 144, 0.1)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#009490" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </div>
          <div className="quick-text-group">
            <span className="quick-label">환전 100% 우대</span>
            <span className="quick-sub">여행 필수템</span>
          </div>
        </button>

        <button className="quick-item" onClick={() => showToast('신한 암보험 페이지로 이동')}>
          <div className="quick-icon" style={{ background: 'rgba(49, 130, 246, 0.1)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#0046FF" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="quick-text-group">
            <span className="quick-label">내 보험료 확인</span>
            <span className="quick-sub">병원비 걱정 끝</span>
          </div>
        </button>

        <button className="quick-item" onClick={() => navigate('/benefits')}>
          <div className="quick-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          </div>
          <div className="quick-text-group">
            <span className="quick-label">래플</span>
            <span className="quick-sub">매주 경품</span>
          </div>
        </button>

        <button className="quick-item" onClick={() => navigate('/withdraw')}>
          <div className="quick-icon orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 12V8H6M4 12v4h14M4 8l3-3 3 3M20 16l-3 3-3-3" />
            </svg>
          </div>
          <div className="quick-text-group">
            <span className="quick-label">포인트 교환</span>
            <span className="quick-sub">기프티콘 구매</span>
          </div>
        </button>
      </div>

      <div className="partner-section">
        <div className="partner-total-card">
          <div className="partner-total-label">전체 제휴포인트</div>
          <div className="partner-total-value">2,450 P</div>
        </div>
        <button className="btn-convert-all" onClick={() => isGuest ? handleGuestBlock() : showToast('2,450P가 에이핀 포인트로 전환되었습니다!')}>
          에이핀 포인트로 전환하기
        </button>

        <div className="partner-list-card">
          <div className="partner-item">
            <div className="partner-info">
              <div className="partner-logo hana">H</div>
              <div className="partner-name">하나페이</div>
            </div>
            <div className="partner-action">
              <div className="partner-amount">1,200 P</div>
              <button className="btn-convert-sm" onClick={() => showToast('하나머니가 전환되었습니다')}>전환</button>
            </div>
          </div>

          <div className="partner-item">
            <div className="partner-info">
              <div className="partner-logo shinhan">S</div>
              <div className="partner-name">신한카드</div>
            </div>
            <div className="partner-action">
              <div className="partner-amount">850 P</div>
              <button className="btn-convert-sm" onClick={() => showToast('신한포인트가 전환되었습니다')}>전환</button>
            </div>
          </div>

          <div className="partner-item">
            <div className="partner-info">
              <div className="partner-logo paybooc">P</div>
              <div className="partner-name">페이북</div>
            </div>
            <div className="partner-action">
              <div className="partner-amount">400 P</div>
              <button className="btn-convert-sm" onClick={() => showToast('페이북 머니가 전환되었습니다')}>전환</button>
            </div>
          </div>

          <div className="partner-item">
            <div className="partner-info">
              <div className="partner-logo kakao">K</div>
              <div className="partner-name">카카오페이</div>
            </div>
            <div className="partner-action">
              <button className="btn-connect-sm" onClick={() => showToast('연동 화면으로 이동합니다')}>연결하기</button>
            </div>
          </div>
        </div>
      </div>

      <div className="asset-ticker">
        <div className="asset-row">
          <div className="asset-name">🇺🇸 나스닥</div>
          <div className="asset-val">15,620.40 <span className="asset-change up">▲0.3%</span></div>
        </div>
        <div className="asset-row">
          <div className="asset-name">🇰🇷 코스피</div>
          <div className="asset-val">4,949.67 <span className="asset-change down">▼5.26%</span></div>
        </div>
        <div className="asset-row">
          <div className="asset-name">🇰🇷 코스닥</div>
          <div className="asset-val">1,098.36 <span className="asset-change down">▼4.44%</span></div>
        </div>
        <div className="asset-row">
          <div className="asset-name">🇺🇸 달러 환율</div>
          <div className="asset-val">
            {exchangeRate.rate}원{' '}
            <span className={`asset-change ${parseFloat(exchangeRate.change) >= 0 ? 'up' : 'down'}`}>
              {parseFloat(exchangeRate.change) >= 0 ? '▲' : '▼'}{Math.abs(parseFloat(exchangeRate.change))}%
            </span>
          </div>
        </div>
        <div className="asset-row">
          <div className="asset-name">🟡 금 시세</div>
          <div className="asset-val">96,500원 <span className="asset-change up">▲1.2%</span></div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h2 className="section-title">📰 생활 금융 뉴스</h2>
            <span style={{ fontSize: '11px', color: '#8B95A1', fontWeight: '500' }}>
              네이버 뉴스 제공 · 매일 오전 10시 업데이트
            </span>
          </div>
        </div>
        <div className="news-list-vertical">
          <div className="news-card" onClick={() => showToast('뉴스 상세 보기')}>
            <div className="news-thumb">🚌</div>
            <div className="news-content">
              <div className="news-headline">서울시 버스 요금 인상안 확정, 다음 달부터 적용</div>
              <div className="news-date">2시간 전 · 생활경제</div>
            </div>
          </div>
          <div className="news-card" onClick={() => showToast('뉴스 상세 보기')}>
            <div className="news-thumb">🥚</div>
            <div className="news-content">
              <div className="news-headline">계란 한 판 가격 7천원대 진입... 장바구니 비상</div>
              <div className="news-date">4시간 전 · 물가</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
