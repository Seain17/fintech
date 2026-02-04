import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AttendanceScreen.css';

const milestones = {
  7: { icon: '🎟️', label: '응모권', title: '응모권 획득!' },
  14: { icon: '💰', label: '3P', title: '3P 적립!' },
  21: { icon: '💰', label: '3P', title: '3P 적립!' },
  28: { icon: '💎', label: '10P', title: '10P 적립!' },
};

const AttendanceScreen = ({ showToast, updatePoints }) => {
  const navigate = useNavigate();
  const [power, setPower] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [todayStamped, setTodayStamped] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [stampExiting, setStampExiting] = useState(false);
  const [bubble, setBubble] = useState('');
  const [sparkles, setSparkles] = useState([]);
  const [flyingVisible, setFlyingVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sparkleId = useRef(0);
  const frameRef = useRef(null);
  const targetCellRef = useRef(null);
  const flyingStampRef = useRef(null);
  const maxPower = 6;

  // 현재 달력 정보
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Mock: 오늘 이전 최대 6일 출석 완료
  const streakDays = Math.min(today - 1, 6);
  const attendedDays = [];
  for (let i = today - streakDays; i < today; i++) {
    if (i > 0) attendedDays.push(i);
  }

  // 오늘이 마일스톤인지
  const todayMilestone = milestones[today];

  // 초기 말풍선
  const [initialBubble] = useState(() => {
    if (todayMilestone) {
      return `오늘은 ${today}일차! ${todayMilestone.label} 획득 찬스예요! ${todayMilestone.icon}`;
    }
    return `오늘 ${today}일차 출석하고 포인트 받으세요! 💪`;
  });
  const displayBubble = bubble || initialBubble;

  const handleStampDown = () => {
    if (isComplete) return;
    setPressed(true);
  };

  const handleStampUp = () => {
    setPressed(false);
  };

  const handleStampClick = (e) => {
    if (isComplete) return;

    const newPower = power + 1;
    setPower(newPower);

    // 스파클 이펙트 (가볍게)
    const id = sparkleId.current++;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;
    setSparkles(prev => [...prev.slice(-3), { id, x, y }]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== id));
    }, 300);

    const percent = (newPower / maxPower) * 100;

    if (percent < 50) {
      setBubble('조금만 더 힘을 모으세요!');
    } else if (percent < 90) {
      setBubble('거의 다 됐어요! 으랏차!');
    }

    if (newPower >= maxPower) {
      startStampAnimation();
    }
  };

  const startStampAnimation = () => {
    setIsComplete(true);
    setBubble(`${streakDays + 1}일차 ${todayMilestone ? todayMilestone.label + ' 획득' : '출석 완료'}! 쾅!`);

    // 1. 도장 + 게이지 퇴장 애니메이션
    setStampExiting(true);

    // 2. 날아가는 도장 시작
    setTimeout(() => {
      if (!frameRef.current || !targetCellRef.current || !flyingStampRef.current) {
        // ref 없으면 fallback
        setTodayStamped(true);
        setShaking(true);
        setTimeout(() => setShaking(false), 300);
        setTimeout(() => setShowModal(true), 800);
        return;
      }

      const frameRect = frameRef.current.getBoundingClientRect();
      const cellRect = targetCellRef.current.getBoundingClientRect();

      const startX = (frameRect.width / 2) - 60;
      const startY = (frameRect.height / 2) - 100;
      const targetX = (cellRect.left - frameRect.left) + (cellRect.width / 2) - 60;
      const targetY = (cellRect.top - frameRect.top) + (cellRect.height / 2) - 60;

      const el = flyingStampRef.current;
      el.style.left = startX + 'px';
      el.style.top = startY + 'px';
      setFlyingVisible(true);

      const animation = el.animate([
        { transform: 'scale(3)', opacity: 0, offset: 0 },
        { transform: 'scale(3)', opacity: 1, offset: 0.2 },
        { transform: `translate(${targetX - startX}px, ${targetY - startY}px) scale(0.4)`, opacity: 1, offset: 1 },
      ], {
        duration: 500,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        fill: 'forwards',
      });

      animation.onfinish = () => {
        setFlyingVisible(false);
        setTodayStamped(true);
        setShaking(true);
        setTimeout(() => setShaking(false), 300);
        setTimeout(() => setShowModal(true), 800);
      };
    }, 400);
  };

  const handleBonusAd = () => {
    updatePoints(20);
    showToast('2배 적립! +20P 획득!');
    navigate(-1);
  };

  const handleSkip = () => {
    updatePoints(10);
    showToast('출석 포인트 +10P 적립!');
    navigate(-1);
  };

  const percent = (power / maxPower) * 100;

  // 달력 셀 생성
  const calendarCells = [];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < firstDay; i++) {
    calendarCells.push({ type: 'empty', key: `e${i}` });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today;
    const isAttended = attendedDays.includes(d) || (isToday && todayStamped);
    const milestone = milestones[d];
    calendarCells.push({
      type: 'date',
      day: d,
      isToday,
      isAttended,
      milestone,
      key: `d${d}`,
    });
  }

  const currentStreak = streakDays + (todayStamped ? 1 : 0);

  return (
    <div className={`screen attendance-screen ${shaking ? 'att-shake' : ''}`} ref={frameRef}>
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="page-title">도장 쾅! 출석체크</h1>
      </div>

      {/* 김미소 대리 */}
      <div className="att-teller">
        <div className="att-bubble">{displayBubble}</div>
        <div className="att-avatar">👩🏻‍💼</div>
        <div className="att-nametag">김미소 대리</div>
      </div>

      {/* 도장 액션 영역 */}
      <div className="att-action-area">
        <div
          className={`att-stamp-object ${stampExiting ? 'exiting' : ''} ${pressed ? 'pressing' : ''}`}
          onClick={handleStampClick}
          onMouseDown={handleStampDown}
          onMouseUp={handleStampUp}
          onMouseLeave={handleStampUp}
          onTouchStart={handleStampDown}
          onTouchEnd={handleStampUp}
        >
          <img src="/stamp.png" alt="출석완료 도장" className="att-stamp-img" />
          {sparkles.map(s => (
            <span key={s.id} className="att-sparkle" style={{ left: s.x, top: s.y }}>⚡️</span>
          ))}
        </div>

        <div className={`att-energy-gauge ${stampExiting ? 'exiting' : ''}`}>
          <div className="att-energy-label">파워</div>
          <div className="att-energy-bar-container">
            <div className="att-energy-bar" style={{ height: `${percent}%` }} />
          </div>
          <div className="att-energy-percent">{Math.round(percent)}%</div>
        </div>

        {!isComplete && (
          <div className="att-click-guide">👆 도장을 연타해서 기를 모으세요!</div>
        )}
      </div>

      {/* 날아가는 도장 */}
      <div
        className="att-flying-stamp"
        ref={flyingStampRef}
        style={{ display: flyingVisible ? 'block' : 'none' }}
      >
        <img src="/stamp.png" alt="도장" />
      </div>

      {/* 달력 (통장) 영역 */}
      <div className="att-bankbook">
        <div className="att-bankbook-header">
          <div>
            <div className="att-bankbook-title">{month + 1}월 챌린지 🏆</div>
            <div className="att-bankbook-sub">매일 출석하고 포인트 모으자!</div>
          </div>
          <div className="att-streak-badge">{currentStreak}일 연속 달성중🔥</div>
        </div>

        <div className="att-calendar-grid">
          {dayNames.map(d => (
            <div key={d} className="att-day-head">{d}</div>
          ))}

          {calendarCells.map(cell => {
            if (cell.type === 'empty') {
              return <div key={cell.key} className="att-date-cell empty" />;
            }

            const classes = ['att-date-cell'];
            if (cell.isToday) classes.push('today');
            if (cell.milestone) classes.push('milestone');
            if (cell.day === 28 && cell.milestone) classes.push('milestone-gold');

            // 마일스톤 아이콘 스타일 (원본 HTML 구조 반영)
            const milestoneIconStyle = {};
            if (cell.milestone && !cell.isToday) {
              // 미래 마일스톤: 컬러 표시, 약간 투명
              milestoneIconStyle.opacity = 0.6;
              milestoneIconStyle.filter = 'none';
            }
            if (cell.day === 28 && cell.milestone) {
              milestoneIconStyle.opacity = 1;
              milestoneIconStyle.filter = 'none';
              milestoneIconStyle.fontSize = '16px';
            }

            return (
              <div
                key={cell.key}
                className={classes.join(' ')}
                ref={cell.isToday ? targetCellRef : null}
              >
                {cell.day}
                {cell.milestone && (
                  <span
                    className={`att-milestone-icon ${cell.isAttended && cell.isToday ? 'unlocked' : ''}`}
                    style={milestoneIconStyle}
                  >
                    {cell.milestone.icon}
                  </span>
                )}
                {cell.milestone && (
                  <span className="att-milestone-label">{cell.milestone.label}</span>
                )}
                {cell.isAttended && (
                  <div className="att-ink-mark">
                    <div className="att-ink-mark-inner">
                      {cell.isToday ? <>{currentStreak}일<br/>연속</> : '완료'}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 결과 모달 */}
      {showModal && (
        <div className="att-modal-overlay" onClick={(e) => e.target === e.currentTarget && handleSkip()}>
          <div className="att-modal-card">
            <span className="att-popup-badge">{currentStreak}일 연속 달성!</span>
            <div className="att-modal-emoji">{todayMilestone ? todayMilestone.icon : '📅'}</div>
            <h2 className="att-modal-title">{todayMilestone ? todayMilestone.title : '출석 완료!'}</h2>
            <p className="att-modal-desc">
              + 기본 포인트 10P 적립 완료
            </p>
            <button className="att-btn-ad-double" onClick={handleBonusAd}>
              📺 광고 보고 2배 적립 (+20P)
            </button>
            <button className="att-btn-just-get" onClick={handleSkip}>
              그냥 기본 포인트만 받을게요
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceScreen;
