import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ShoppingDetailScreen.css';

const ShoppingDetailScreen = () => {
  const navigate = useNavigate();
  const { mallId } = useParams();
  const [isShoppingNoticeOpen, setIsShoppingNoticeOpen] = useState(false);
  const [isMallNoticeOpen, setIsMallNoticeOpen] = useState(false);
  const [showAttWarning] = useState(true);

  // 쇼핑몰 데이터 (기획서 기반)
  const mallData = {
    ssg: {
      name: 'SSG 몰',
      icon: '🛒',
      color: '#FF5A5A',
      description: '신세계, 종합몰, 브랜드몰',
      rate: '1.6%',
      paymentDate: '구매 확정 후 익익월 초',
      url: 'https://www.ssg.com',
      excludedItems: [
        '금/은, 쥬얼리/시계 등 환금성 상품',
        '여행(호텔/숙박/항공권/입장권)',
        '상품권 / e쿠폰 / 기프트카드',
        '도서 / 음반 / 티켓 / e교육',
        '꽃 / 이벤트 용품',
        '브랜드 쥬얼리/시계',
        '배달(꽃, 음식 등 배달서비스 카테고리) / 렌탈 서비스 / 중고시장 / 약정&결합 가입',
        '모바일 / 태블릿 / 컴퓨터사업자몰 / 특판(단골찬스)',
        '수입명품',
        'G마켓 비회원 구매 실적',
      ]
    },
    gmarket: {
      name: '지마켓',
      icon: '🛍️',
      color: '#00A651',
      description: '종합쇼핑몰',
      rate: '1.7%',
      paymentDate: '구매 확정 후 익익월 초',
      url: 'https://www.gmarket.co.kr',
      excludedItems: [
        '금/은, 쥬얼리/시계 등 환금성 상품',
        '여행(호텔/숙박/항공권/입장권)',
        '상품권 / e쿠폰 / 기프트카드',
        '도서 / 음반 / 티켓 / e교육',
        '브랜드 쥬얼리/시계',
        '배달 서비스 / 렌탈 서비스 / 중고시장',
        '모바일 / 태블릿 / 컴퓨터사업자몰',
        '수입명품',
        '비회원 구매 실적',
      ]
    },
    ohouse: {
      name: '오늘의 집',
      icon: '🏠',
      color: '#35C5F0',
      description: '인테리어, 가구, 소품',
      rate: '1.8%',
      paymentDate: '구매 확정 후 익월 초',
      url: 'https://ohou.se',
      excludedItems: [
        '금/은, 쥬얼리/시계 등 환금성 상품',
        '상품권 / e쿠폰 / 기프트카드',
        '시공/인테리어 서비스',
        '중고상품',
        '비회원 구매 실적',
      ]
    },
    emart: {
      name: '이마트몰',
      icon: '🏬',
      color: '#FFD100',
      description: '대형마트, 식품, 생필품',
      rate: '1.5%',
      paymentDate: '구매 확정 후 익월 초',
      url: 'https://emart.ssg.com',
      excludedItems: [
        '금/은, 쥬얼리/시계 등 환금성 상품',
        '여행(호텔/숙박/항공권/입장권)',
        '상품권 / e쿠폰 / 기프트카드',
        '도서 / 음반 / 티켓',
        '배달 서비스 / 렌탈 서비스',
        '수입명품',
        '비회원 구매 실적',
      ]
    }
  };

  // 공통 쇼핑적립 유의사항
  const shoppingNotices = [
    '브라우저 및 모바일 기기 내 광고 추적 미허용시 리워드가 지급되지 않습니다.',
    '진행 배너 및 링크를 클릭하여 참여해주셔야 합니다. 다른 앱, 타 사이트의 광고 배너 클릭과 병행하여 구매 시 리워드가 되지 않습니다.',
    '진행 배너 및 링크 클릭이 아닌 다른 경로를 통한 대상앱 접속이력이 있으신 경우, 반드시 캐시 삭제 후 참여하셔야합니다.',
    '타 쇼핑사이트나 쇼핑 플랫폼은 모두 닫은 후 진행 배너 및 링크 클릭하여 구매 진행해주시기 바랍니다.',
    '장바구니에 미리 담은 상품을 경유하여 장바구니 결제만 진행 할 경우 적립이 누락될 수 있습니다.',
    '배너 및 링크 클릭 경유 후 바로 검색, 클릭 등을 하지 않고 1분 이상 대기 후 구매하는 경우 적립이 누락될 수 있습니다.',
  ];

  const additionalNotices = [
    '참여방법 미숙지로 인한 리워드 미지급 책임은 유저 본인에게 있습니다.',
    '구매 후 취소를 반복하는 경우 리워드 참여가 제한될 수 있습니다.',
    '회원 탈퇴 시 리워드 지급 대상자에서 제외 됩니다.',
    '본인인증 미인증 시 참여가 제한됩니다.',
    '주문 취소 시 전체, 부분 취소 상관없이 모든 리워드 취소되며, 부분취소로 인한 부분 지급 문의는 고객센터 1:1문의하기로 남겨주시기 바랍니다.',
  ];

  const mall = mallData[mallId] || mallData.ssg;

  const handleGoShopping = () => {
    window.open(mall.url, '_blank');
  };

  return (
    <div className="screen shopping-detail-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="page-title">쇼핑 적립</h1>
      </div>

      <div className="shopping-detail-content">
        {/* 상단 설명 */}
        <p className="shopping-intro">
          쇼핑적립은 해당 마켓에서 쇼핑 후 일정 기간이 지나면 핀을 지급받는 콘텐츠입니다.
        </p>

        {/* 쇼핑몰 헤더 */}
        <div className="mall-header">
          <div className="mall-header-top">
            <div className="mall-icon-large" style={{ background: `${mall.color}15` }}>{mall.icon}</div>
            <div className="mall-info">
              <h2 className="mall-title">{mall.name}</h2>
              <p className="mall-description">{mall.description}</p>
            </div>
          </div>
        </div>

        {/* 적립 정보 */}
        <div className="info-section">
          <h3 className="section-title">적립 정보</h3>
          <div className="info-card">
            <div className="info-row">
              <span className="info-label">적립률</span>
              <span className="info-value highlight">{mall.rate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">핀 지급일</span>
              <span className="info-value">{mall.paymentDate}</span>
            </div>
          </div>
        </div>

        {/* 쇼핑적립 유의사항 아코디언 */}
        <div className="notice-accordion" onClick={() => setIsShoppingNoticeOpen(!isShoppingNoticeOpen)}>
          <div className="notice-accordion-header">
            <span>쇼핑적립 유의사항 확인하기</span>
            <span className={`accordion-arrow ${isShoppingNoticeOpen ? 'open' : ''}`}>▼</span>
          </div>
          {isShoppingNoticeOpen && (
            <div className="notice-content">
              <ol className="notice-list-numbered">
                {shoppingNotices.map((notice, index) => (
                  <li key={index}>{notice}</li>
                ))}
              </ol>
              <ul className="notice-list-bullet">
                {additionalNotices.map((notice, index) => (
                  <li key={index}>{notice}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 마켓별 유의사항 아코디언 */}
        <div className="notice-accordion" onClick={() => setIsMallNoticeOpen(!isMallNoticeOpen)}>
          <div className="notice-accordion-header">
            <span>{mall.name} 유의사항 확인하기</span>
            <span className={`accordion-arrow ${isMallNoticeOpen ? 'open' : ''}`}>▼</span>
          </div>
          {isMallNoticeOpen && (
            <div className="notice-content">
              <p className="notice-subtitle">아래에 해당하는 경우 핀이 지급되지 않습니다.</p>
              <ul className="notice-list">
                {mall.excludedItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ATT 경고 배너 */}
        {showAttWarning && (
          <div className="att-warning">
            <div className="att-warning-title">
              <span>⚠️</span>
              <span>핀 적립 불가 안내</span>
            </div>
            <p className="att-warning-desc">
              현재 기기 추적(ATT)권한이 차단되어 있어 쇼핑하셔도 핀이 적립되지 않습니다.
            </p>
            <span className="att-warning-link">기기 설정 변경하러 가기 &gt;</span>
          </div>
        )}

        {/* 하단 안내 */}
        <p className="shopping-notice-text">※ 쇼핑 전 유의사항을 꼭 읽어봐 주세요!</p>
      </div>

      {/* 하단 버튼 */}
      <div className="shopping-detail-buttons">
        <button className="btn-history" onClick={() => navigate('/shopping-history')}>
          적립 내역
        </button>
        <button className="btn-go-shopping" onClick={handleGoShopping}>
          쇼핑하러 가기
        </button>
      </div>
    </div>
  );
};

export default ShoppingDetailScreen;
