import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BenefitsScreen.css';

const tabs = [
  { id: 'raffle', label: '래플', icon: '🎰' },
  { id: 'mission', label: '미션', icon: '📅' },
  { id: 'game', label: '게임', icon: '🎮' },
  { id: 'shopping', label: '쇼핑', icon: '🛒' },
  { id: 'offerwall', label: '오퍼월', icon: '🎁' },
];

const BenefitsScreen = ({ showToast, updatePoints, unreadCount = 0 }) => {
  const navigate = useNavigate();

  // Refs for each section
  const raffleRef = useRef(null);
  const missionRef = useRef(null);
  const gameRef = useRef(null);
  const shoppingRef = useRef(null);
  const offerwallRef = useRef(null);

  // Tab drag scroll
  const tabsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const hasMoved = useRef(false);

  // 권한 팝업 상태
  const [offerwallSheetOpen, setOfferwallSheetOpen] = useState(false);
  const [attPopupOpen, setAttPopupOpen] = useState(false);
  const [fallbackAlertOpen, setFallbackAlertOpen] = useState(false);
  const [pedometerPopupOpen, setPedometerPopupOpen] = useState(false);

  // 첫 진입 시 만보기 권한 팝업
  useEffect(() => {
    const hasShownPermission = sessionStorage.getItem('pedometerPermissionShown');
    if (!hasShownPermission) {
      setTimeout(() => {
        setPedometerPopupOpen(true);
      }, 500);
    }
  }, []);

  // 만보기 권한 처리
  const handlePedometerPermission = (allowed) => {
    setPedometerPopupOpen(false);
    sessionStorage.setItem('pedometerPermissionShown', 'true');
    if (allowed) {
      showToast('만보기 권한이 허용되었습니다');
    } else {
      showToast('만보기 기능을 사용하려면 권한이 필요합니다');
    }
  };

  // 오퍼월 바텀시트
  const openOfferwallSheet = () => {
    setOfferwallSheetOpen(true);
  };

  const closeOfferwallSheet = () => {
    setOfferwallSheetOpen(false);
  };

  // 오퍼월 동의 -> 추적 권한 팝업
  const proceedToPermission = () => {
    setOfferwallSheetOpen(false);
    setTimeout(() => {
      setAttPopupOpen(true);
    }, 350);
  };

  // 추적 권한 처리
  const handleAttPermission = (allowed) => {
    setAttPopupOpen(false);
    setTimeout(() => {
      if (allowed) {
        showToast('오퍼월 진입 성공! 제휴사 페이지로 이동합니다');
      } else {
        setFallbackAlertOpen(true);
      }
    }, 250);
  };

  // 설정으로 이동
  const goToSettings = () => {
    setFallbackAlertOpen(false);
    showToast('기기 설정에서 추적 권한을 허용해주세요');
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    hasMoved.current = false;
    setStartX(e.touches[0].pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      hasMoved.current = true;
    }
    tabsRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    hasMoved.current = false;
    setStartX(e.pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTabClick = (tabId) => {
    if (hasMoved.current) return;

    const refMap = {
      raffle: raffleRef,
      mission: missionRef,
      game: gameRef,
      shopping: shoppingRef,
      offerwall: offerwallRef,
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
        <div className="benefits-logo">LOGO</div>
        <button className="benefits-noti-btn" onClick={() => navigate('/notifications')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && <span className="benefits-noti-badge">{unreadCount}</span>}
        </button>
      </div>

      <div className="benefits-header">
        <h1 className="page-title">혜택</h1>
        <div
          className={`benefits-tabs ${isDragging ? 'dragging' : ''}`}
          ref={tabsRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="benefits-tab"
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="benefits-content">
        <div className="benefits-scroll-content">
          {/* 래플 이벤트 */}
          <div className="section" ref={raffleRef}>
            <div className="section-header">
              <h2 className="section-title">🎰 래플 이벤트</h2>
            </div>
            <div className="raffle-list-vertical">
              <div className="raffle-list-item" onClick={() => navigate('/raffle/1')}>
                <div className="raffle-item-image" style={{ background: 'linear-gradient(135deg, #1a2e71 0%, #2d4a8c 100%)' }}>
                  <div className="raffle-item-icon">🎧</div>
                </div>
                <div className="raffle-item-content">
                  <div className="raffle-item-badge hot">🔥 D-2</div>
                  <div className="raffle-item-name">애플 에어팟 프로 2</div>
                  <div className="raffle-item-info">
                    <span className="raffle-item-participants">234명 참여중</span>
                    <span className="raffle-item-separator">·</span>
                    <span className="raffle-item-cost">응모권 1장</span>
                  </div>
                </div>
              </div>
              <div className="raffle-list-item" onClick={() => navigate('/raffle/2')}>
                <div className="raffle-item-image" style={{ background: 'linear-gradient(135deg, #3d5a9e 0%, #5c7cba 100%)' }}>
                  <div className="raffle-item-icon">📱</div>
                </div>
                <div className="raffle-item-content">
                  <div className="raffle-item-badge new">🆕 D-5</div>
                  <div className="raffle-item-name">아이폰 15 Pro Max</div>
                  <div className="raffle-item-info">
                    <span className="raffle-item-participants">1,892명 참여중</span>
                    <span className="raffle-item-separator">·</span>
                    <span className="raffle-item-cost">응모권 1장</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 데일리 미션 */}
          <div className="section" ref={missionRef}>
            <div className="section-header">
              <h2 className="section-title">📅 데일리 미션</h2>
            </div>
            <div className="attendance-banner" onClick={() => navigate('/attendance')}>
              <div className="attendance-icon">📅</div>
              <div className="attendance-info">
                <div className="attendance-title">오늘의 출석체크</div>
                <div className="attendance-desc">매일 출석하고 50P 받기!</div>
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
                <div className="mission-desc">3문제 풀고 최대 300P 획득!</div>
                <div className="mission-reward-badge">+100P / 문제당</div>
              </div>
            </div>
          </div>

          {/* 포인트 게임 */}
          <div className="section" ref={gameRef}>
            <div className="section-header">
              <h2 className="section-title">🎮 포인트 게임</h2>
            </div>
            <div className="benefit-list-vertical">
              <div className="benefit-list-item" onClick={() => navigate('/game/roulette')}>
                <div className="benefit-item-icon">🎡</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">룰렛 돌리기</div>
                  <div className="benefit-item-desc">최대 1,000P 획득!</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/game/card')}>
                <div className="benefit-item-icon">🃏</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">카드 뒤집기</div>
                  <div className="benefit-item-desc">행운의 카드를 찾아라!</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => showToast('준비중입니다')}>
                <div className="benefit-item-icon">🎰</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">슬롯머신</div>
                  <div className="benefit-item-desc">잭팟 도전!</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
            </div>
          </div>

          {/* 쇼핑 적립 */}
          <div className="section" ref={shoppingRef}>
            <div className="section-header">
              <h2 className="section-title">🛒 쇼핑 적립</h2>
            </div>
            <div className="benefit-list-vertical">
              <div className="benefit-list-item" onClick={() => navigate('/shopping/coupang')}>
                <div className="benefit-item-icon coupang">쿠팡</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">쿠팡</div>
                  <div className="benefit-item-desc">최대 2% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/shopping/elevenst')}>
                <div className="benefit-item-icon eleven">11</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">11번가</div>
                  <div className="benefit-item-desc">최대 1.5% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/shopping/gmarket')}>
                <div className="benefit-item-icon gmarket">G</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">G마켓</div>
                  <div className="benefit-item-desc">최대 1.2% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={() => navigate('/shopping/auction')}>
                <div className="benefit-item-icon auction">옥션</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">옥션</div>
                  <div className="benefit-item-desc">최대 1.2% 적립</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
            </div>
          </div>

          {/* 오퍼월 */}
          <div className="section" ref={offerwallRef}>
            <div className="section-header">
              <h2 className="section-title">🎁 오퍼월</h2>
            </div>
            <div className="benefit-list-vertical">
              <div className="benefit-list-item" onClick={openOfferwallSheet}>
                <div className="benefit-item-icon">📺</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">영상 시청하기</div>
                  <div className="benefit-item-desc">+500P</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={openOfferwallSheet}>
                <div className="benefit-item-icon">📱</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">앱 설치하기</div>
                  <div className="benefit-item-desc">+1,000P</div>
                </div>
                <div className="benefit-item-arrow">›</div>
              </div>
              <div className="benefit-list-item" onClick={openOfferwallSheet}>
                <div className="benefit-item-icon">📝</div>
                <div className="benefit-item-content">
                  <div className="benefit-item-title">설문조사 참여</div>
                  <div className="benefit-item-desc">+300P</div>
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

      {/* 오퍼월 바텀시트 */}
      <div
        className={`bottom-sheet-overlay ${offerwallSheetOpen ? 'active' : ''}`}
        onClick={closeOfferwallSheet}
      >
        <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="sheet-header">
            <div className="sheet-title">오퍼월 참여 안내</div>
            <button className="btn-close" onClick={closeOfferwallSheet}>✕</button>
          </div>

          <div className="sheet-highlight warning">
            ⚠️ 정확한 핀 지급을 위해<br />기기 활동 추적 허용이 반드시 필요합니다.
          </div>
          <ul className="sheet-list">
            <li>권한을 허용하지 않으면 미션을 완료해도 핀을 받을 수 없습니다.</li>
            <li>다음 화면에서 <strong>'허용'</strong>을 꼭 선택해 주세요.</li>
            <li>에이핀 앱을 벗어나 제휴사 페이지로 이동합니다.</li>
          </ul>

          <button className="btn-apply-full" onClick={proceedToPermission}>
            동의하고 참여하기
          </button>
        </div>
      </div>

      {/* 추적 권한 시스템 팝업 */}
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

      {/* 권한 거부 Fallback 팝업 */}
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
