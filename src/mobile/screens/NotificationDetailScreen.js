import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './NotificationDetailScreen.css';

// 알림 상세 데이터
const notificationDetails = {
  1: {
    icon: '🎁',
    title: '출석체크 보너스 적립 완료',
    message: '매일 출석체크하고 핀 받아가세요!',
    fullMessage: '오늘도 출석체크 완료! 꾸준히 출석하면 더 많은 보너스를 받을 수 있어요. 7일 연속 출석 시 특별 보너스가 지급됩니다.',
    time: '방금 전',
    hasButton: true,
    buttonText: '출석체크 하러가기',
    link: '/attendance',
  },
  2: {
    icon: '🎉',
    title: '이번 주 경품 당첨자 발표',
    message: '에어팟 프로 경품 결과가 발표되었습니다.',
    fullMessage: '이번 주 경품 결과가 발표되었어요! 당첨 여부를 확인하고, 새로운 경품에도 참여해보세요.',
    time: '10분 전',
    isNew: true,
    hasButton: true,
    buttonText: '당첨 결과 확인하기',
    link: '/benefits',
    highlight: '총 5명의 당첨자가 선정되었습니다',
  },
  3: {
    icon: '💸',
    title: '출금 신청이 완료되었습니다',
    message: '신청하신 출금이 정상적으로 처리되었습니다.',
    fullMessage: '출금 신청이 완료되어 입금 처리 중입니다. 영업일 기준 1-2일 내에 입금됩니다.',
    time: '1시간 전',
    hasDetail: true,
    detailInfo: [
      { label: '출금 금액', value: '5,000원' },
      { label: '수수료', value: '0원' },
      { label: '실 입금액', value: '5,000원', highlight: true },
      { label: '입금 계좌', value: '하나은행 ****1234' },
      { label: '처리 상태', value: '입금 대기중', status: 'pending' },
    ],
  },
  4: {
    icon: '🎰',
    title: '새로운 경품이 오픈되었어요',
    message: '아이폰 15 Pro 경품이 시작되었습니다. 지금 참여하세요!',
    fullMessage: '가장 핫한 아이폰 15 Pro 경품이 시작되었어요! 100핀으로 참여하고 행운의 주인공이 되어보세요.',
    time: '3시간 전',
    hasButton: true,
    buttonText: '경품 참여하기',
    link: '/benefits',
    highlight: '마감까지 D-5',
  },
  5: {
    icon: '💡',
    title: '금융 퀴즈 보상 지급',
    message: '퀴즈 정답 보상 30핀이 지급되었습니다.',
    fullMessage: '축하합니다! 금융 퀴즈를 맞춰서 30핀을 획득하셨어요. 매일 새로운 퀴즈가 업데이트됩니다.',
    time: '어제',
    hasButton: true,
    buttonText: '오늘의 퀴즈 풀기',
    link: '/quiz',
    reward: '+30핀',
  },
};

const NotificationDetailScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const noti = notificationDetails[id] || {
    icon: '📭',
    title: '알림을 찾을 수 없습니다',
    message: '',
    fullMessage: '요청하신 알림을 찾을 수 없습니다.',
    time: '',
  };

  const handleButtonClick = () => {
    if (noti.link) {
      navigate(noti.link);
    } else {
      showToast('페이지로 이동합니다');
    }
  };

  return (
    <div className="screen notification-detail-screen">
      {/* 스테이터스바 영역 */}
      <div className="noti-detail-statusbar" />

      {/* 헤더 */}
      <div className="noti-detail-header">
        <button className="noti-detail-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="noti-detail-header-title">알림</h1>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="noti-detail-content">
        <div className="noti-detail-card">
          {/* 카드 상단 */}
          <div className="noti-detail-card-top">
            <div className="noti-detail-app-info">
              <div className="noti-detail-app-icon">
                <span>A</span>
              </div>
              <span className="noti-detail-app-name">에이핀</span>
            </div>
            <span className="noti-detail-time">{noti.time}</span>
          </div>

          {/* 아이콘 & 제목 */}
          <div className="noti-detail-main">
            <div className="noti-detail-icon-wrap">
              <span className="noti-detail-icon">{noti.icon}</span>
              {noti.reward && <span className="noti-detail-reward">{noti.reward}</span>}
            </div>
            <h2 className="noti-detail-title">
              {noti.title}
              {noti.isNew && <span className="noti-detail-new-badge">NEW</span>}
            </h2>
          </div>

          {/* 하이라이트 */}
          {noti.highlight && (
            <div className="noti-detail-highlight">
              <span className="noti-detail-highlight-icon">✨</span>
              {noti.highlight}
            </div>
          )}

          {/* 메시지 */}
          <p className="noti-detail-message">{noti.fullMessage}</p>

          {/* 상세 정보 박스 */}
          {noti.hasDetail && noti.detailInfo && (
            <div className="noti-detail-info-box">
              <div className="noti-detail-info-title">상세 내역</div>
              {noti.detailInfo.map((info, idx) => (
                <div key={idx} className={`noti-detail-info-row ${info.highlight ? 'highlight' : ''}`}>
                  <span className="noti-detail-info-label">{info.label}</span>
                  <span className={`noti-detail-info-value ${info.status || ''}`}>
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 액션 버튼 */}
          {noti.hasButton && (
            <button className="noti-detail-btn" onClick={handleButtonClick}>
              {noti.buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailScreen;
