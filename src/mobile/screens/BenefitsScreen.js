import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BenefitsScreen.css';
import { iPadProBanner } from '../components/AdBanner';
import '../components/AdBanner.css';
import { AppLogo, PinAmount } from '../../shared/components';

const tabs = [
  { id: 'raffle', label: '경품', icon: '/images/icons/icon-favor-01.png' },
  { id: 'mission', label: '미션', icon: '/images/icons/icon-favor-02.png' },
  { id: 'shopping', label: '쇼핑', icon: '/images/icons/icon-favor-03.png' },
];

const BenefitsScreen = ({ showToast, updatePoints, unreadCount = 0, userPoints = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Refs for each section
  const raffleRef = useRef(null);
  const missionRef = useRef(null);
  const shoppingRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollTo === 'raffle' && raffleRef.current) {
      setTimeout(() => {
        raffleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.state]);
  // Tab drag scroll
  const tabsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const hasMoved = useRef(false);

  // 권한 팝업 상태
  const [attPopupOpen, setAttPopupOpen] = useState(false);
  const [fallbackAlertOpen, setFallbackAlertOpen] = useState(false);
  const [pedometerPopupOpen, setPedometerPopupOpen] = useState(false);

  // 캐러셀 배너 상태
  const [currentBanner, setCurrentBanner] = useState(0);
  const bannerRef = useRef(null);
  const banners = [
    { id: 0, image: '/images/banners/carousel_banner-bc_02.png', alt: 'BC카드 배너' },
    { id: 1, image: '/images/banners/carousel_banner-bc_03.png', alt: 'BC카드 배너' },
  ];

  // 배너 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // 첫 진입 시 만보기 권한 팝업 (테스트용)
  useEffect(() => {
    const hasShownPermission = sessionStorage.getItem('pedometerPermissionShown');
    if (!hasShownPermission) {
      setTimeout(() => {
        setPedometerPopupOpen(true);
      }, 500);
    }
  }, []);

  // 만보기 권한 처리 (테스트용)
  const handlePedometerPermission = (allowed) => {
    setPedometerPopupOpen(false);
    sessionStorage.setItem('pedometerPermissionShown', 'true');
    if (allowed) {
      showToast('만보기 권한이 허용되었습니다');
    } else {
      showToast('만보기 기능을 사용하려면 권한이 필요합니다');
    }
  };

  // 추적 권한 처리 (테스트용)
  const handleAttPermission = (allowed) => {
    setAttPopupOpen(false);
    setTimeout(() => {
      if (!allowed) {
        setFallbackAlertOpen(true);
      }
    }, 250);
  };

  // 설정으로 이동 (테스트용)
  const goToSettings = () => {
    setFallbackAlertOpen(false);
    showToast('기기 설정에서 추적 권한을 허용해주세요');
  };

  // eslint-disable-next-line no-unused-vars
  const handleTouchStart = (e) => {
    setIsDragging(true);
    hasMoved.current = false;
    setStartX(e.touches[0].pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

  // eslint-disable-next-line no-unused-vars
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      hasMoved.current = true;
    }
    tabsRef.current.scrollLeft = scrollLeft - walk;
  };

  // eslint-disable-next-line no-unused-vars
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleMouseDown = (e) => {
    setIsDragging(true);
    hasMoved.current = false;
    setStartX(e.pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

  // eslint-disable-next-line no-unused-vars
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      hasMoved.current = true;
    }
    tabsRef.current.scrollLeft = scrollLeft - walk;
  };

  // eslint-disable-next-line no-unused-vars
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTabClick = (tabId) => {
    if (hasMoved.current) return;

    const refMap = {
      raffle: raffleRef,
      mission: missionRef,
      shopping: shoppingRef,
    };

    const targetRef = refMap[tabId];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePedometer = () => {
    navigate('/walking');
  };

  return (
    <div className="screen benefits-screen">
      {/* 앱바 */}
      <div className="benefits-appbar">
        <AppLogo />
        <PinAmount amount={userPoints} size="medium" className="benefits-pin-amount" />
      </div>

      <div className="benefits-header">
        {/* 캐러셀 배너 */}
        <div className="benefits-carousel" ref={bannerRef}>
          <div
            className="benefits-carousel-track"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="benefits-carousel-slide">
                <img src={banner.image} alt={banner.alt} className="carousel-image" />
              </div>
            ))}
          </div>
          <div className="benefits-carousel-dots">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentBanner ? 'active' : ''}`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </div>

        {/* 탭 */}
        <div className="benefits-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="benefits-tab"
              onClick={() => handleTabClick(tab.id)}
            >
              <img src={tab.icon} alt={tab.label} className="tab-icon-img"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="benefits-content">
        <div className="benefits-scroll-content">
          {/* 경품 이벤트 */}
          <div className="section" ref={raffleRef}>
            <div className="section-header">
              <h2 className="section-title">🔥 놓치면 아쉬운 경품 혜택!</h2>
            </div>
            <div className="raffle-list-vertical">
              <div className="raffle-list-item" onClick={() => navigate('/raffle/1')}>
                <div className="raffle-item-image">
                  <img src="/images/raffle/airpods.png" alt="에어팟" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="raffle-item-icon" style={{ display: 'none' }}>🎧</div>
                </div>
                <div className="raffle-item-content">
                  <div className="raffle-item-badge urgent">마감까지 8일 20:41:53 남음</div>
                  <div className="raffle-item-name">애플 에어팟 프로 2</div>
                  <div className="raffle-item-participants">45,234명 참여 중</div>
                </div>
              </div>
              <div className="raffle-list-item" onClick={() => navigate('/raffle/2')}>
                <div className="raffle-item-image">
                  <img src="/images/raffle/iphone.png" alt="아이폰" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="raffle-item-icon" style={{ display: 'none' }}>📱</div>
                </div>
                <div className="raffle-item-content">
                  <div className="raffle-item-badge ongoing">마감까지 12일 20:41:53 남음</div>
                  <div className="raffle-item-name">아이폰 15 Pro Max</div>
                  <div className="raffle-item-participants">1,234명 참여 중</div>
                </div>
              </div>
              <div className="raffle-list-item" onClick={() => navigate('/raffle/3')}>
                <div className="raffle-item-image">
                  <img src="/images/raffle/robot.png" alt="청소기" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="raffle-item-icon" style={{ display: 'none' }}>🤖</div>
                </div>
                <div className="raffle-item-content">
                  <div className="raffle-item-badge upcoming">2/31 진행 예정</div>
                  <div className="raffle-item-name">로보ROCK 청소기</div>
                  <div className="raffle-item-participants">1,234명 참여 중</div>
                </div>
              </div>
            </div>
          </div>

          {/* 오늘의 미션 */}
          <div className="section" ref={missionRef}>
            <div className="section-header">
              <h2 className="section-title">✨ 오늘의 미션 진행하고 포인트 받아요♥</h2>
            </div>
            <div className="attendance-banner" onClick={() => navigate('/attendance')}>
              <div className="attendance-icon">📅</div>
              <div className="attendance-info">
                <div className="attendance-title">오늘의 출석체크</div>
                <div className="attendance-desc">매일 출석하고 10핀 받기!</div>
              </div>
              <div className="attendance-arrow">›</div>
            </div>
            <div className="mission-card pedometer-card eco" onClick={handlePedometer}>
              <div className="mission-icon">🌿</div>
              <div className="mission-content">
                <div className="mission-title">에코 만보기</div>
                <div className="mission-desc">걸으면서 탄소도 줄이고 핀도 모으기!</div>
                <div className="mission-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '72%' }}></div>
                  </div>
                  <div className="progress-text">7,240보 · 탄소 1.4kg 절감 중</div>
                </div>
              </div>
            </div>
            <div className="mission-card quiz-card" onClick={() => navigate('/quiz')}>
              <div className="mission-icon">💡</div>
              <div className="mission-content">
                <div className="mission-title">금융 퀴즈 풀기</div>
                <div className="mission-desc">알면 자산이 되는 꿀팁! 핀도 챙겨가세요</div>
                <div className="mission-progress-status">오늘 0/3 완료</div>
              </div>
            </div>
          </div>

          {/* 광고 배너 - iPad Pro */}
          {iPadProBanner()}

          {/* 쇼핑 적립 */}
          <div className="section" ref={shoppingRef}>
            <div className="section-header">
              <h2 className="section-title">🛒 쇼핑하고 포인트 적립까지!</h2>
            </div>
            <div className="benefit-list-vertical">
              <div className="benefit-list-item" onClick={() => navigate('/shopping/gmarket')}>
                <div className="benefit-item-icon gmarket">G</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">지마켓</div>
                  <div className="benefit-item-desc">에이핀 적립률 1.7%</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/shopping/ohouse')}>
                <div className="benefit-item-icon ohouse">오</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">오늘의 집</div>
                  <div className="benefit-item-desc">에이핀 적립률 1.8%</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/shopping/ssg')}>
                <div className="benefit-item-icon ssg">SSG</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">SSG 몰</div>
                  <div className="benefit-item-desc">에이핀 적립률 1.6%</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/shopping/emart')}>
                <div className="benefit-item-icon emart">E</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">이마트몰</div>
                  <div className="benefit-item-desc">에이핀 적립률 1.5%</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 만보기 권한 팝업 */}
      <div className={`system-popup-overlay ${pedometerPopupOpen ? 'active' : ''}`}>
        <div className="system-popup">
          <div className="sys-content">
            <div className="sys-title">"에이핀"이(가) 사용자의 신체 활동 데이터에 접근하려고 합니다</div>
            <div className="sys-desc">만보기 기능을 통해 걸음수를 측정하고 핀을 적립할 수 있습니다.</div>
          </div>
          <div className="sys-btn-group">
            <div className="sys-btn-row">
              <button className="sys-btn" onClick={() => handlePedometerPermission(false)}>허용 안 함</button>
              <button className="sys-btn bold" onClick={() => handlePedometerPermission(true)}>확인</button>
            </div>
          </div>
        </div>
      </div>


      {/* ATT 추적 권한 팝업 */}
      <div className={`system-popup-overlay ${attPopupOpen ? 'active' : ''}`}>
        <div className="system-popup">
          <div className="sys-content">
            <div className="sys-title">"에이핀" 앱이 다른 회사의 앱 및 웹사이트에 걸쳐 사용자의 활동을 추적하도록 허용하겠습니까?</div>
            <div className="sys-desc">정확한 핀 지급 처리를 위해 추적 권한이 사용됩니다.</div>
          </div>
          <div className="sys-btn-group">
            <div className="sys-btn-row single">
              <button className="sys-btn" onClick={() => handleAttPermission(false)}>앱 추적 금지 요청</button>
            </div>
            <div className="sys-btn-row single">
              <button className="sys-btn bold" onClick={() => handleAttPermission(true)}>허용</button>
            </div>
          </div>
        </div>
      </div>

      {/* 추적 권한 필요 알림 */}
      <div className={`system-popup-overlay ${fallbackAlertOpen ? 'active' : ''}`}>
        <div className="system-popup">
          <div className="sys-content">
            <div className="sys-title">추적 권한 필요</div>
            <div className="sys-desc">추적을 허용하지 않으면 미션을 수행해도 핀을 받을 수 없습니다.<br />기기 설정에서 권한을 허용해 주세요.</div>
          </div>
          <div className="sys-btn-group">
            <div className="sys-btn-row">
              <button className="sys-btn" onClick={() => setFallbackAlertOpen(false)}>취소</button>
              <button className="sys-btn bold" onClick={goToSettings}>설정으로 이동</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsScreen;
