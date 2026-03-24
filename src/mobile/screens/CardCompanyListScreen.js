import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CardCompanyListScreen.css';

// 카드사 정보
const cardCompanies = {
  shinhan: { name: '신한카드', logo: '신한', color: '#0046ff' },
  samsung: { name: '삼성카드', logo: '삼성', color: '#1428a0' },
  hyundai: { name: '현대카드', logo: '현대', color: '#000000' },
  kb: { name: 'KB국민카드', logo: 'KB', color: '#ffb300' },
  hana: { name: '하나카드', logo: '하나', color: '#009688' },
  woori: { name: '우리카드', logo: '우리', color: '#0072bc' },
  lotte: { name: '롯데카드', logo: '롯데', color: '#e60012' },
  bc: { name: 'BC카드', logo: 'BC', color: '#e31837' },
};

// 카드사별 카드 데이터
const cardData = {
  shinhan: [
    { id: 1, name: '신한 Deep Dream 카드', benefit: '모든 가맹점 0.7% 적립', benefitPoints: 15000, image: '' },
    { id: 2, name: '신한 미래설계 카드', benefit: '공과금/통신비 10% 할인', benefitPoints: 12000, image: '' },
    { id: 3, name: '신한 S-Line 카드', benefit: '쇼핑 5% 적립', benefitPoints: 11000, image: '' },
    { id: 4, name: '신한 RPM 플래티늄', benefit: '주유 리터당 60원 할인', benefitPoints: 10000, image: '' },
    { id: 5, name: '신한 Love 카드', benefit: '외식/카페 10% 할인', benefitPoints: 9500, image: '' },
    { id: 6, name: '신한 플레이 카드', benefit: 'OTT 구독 10% 할인', benefitPoints: 9000, image: '' },
    { id: 7, name: '신한 땡겨요 카드', benefit: '배달앱 5% 할인', benefitPoints: 8500, image: '' },
    { id: 8, name: '신한 Hi-Point 카드', benefit: '마트 5% 적립', benefitPoints: 8000, image: '' },
    { id: 9, name: '신한 Mr.Life 카드', benefit: '생활 전반 3% 적립', benefitPoints: 7500, image: '' },
    { id: 10, name: '신한 B.Big 카드', benefit: '대중교통 10% 할인', benefitPoints: 7000, image: '' },
  ],
  samsung: [
    { id: 1, name: '삼성 taptap O 카드', benefit: '편의점/카페 10% 적립', benefitPoints: 18000, image: '' },
    { id: 2, name: '삼성 iD SIMPLE 카드', benefit: '통합 2% 적립', benefitPoints: 14000, image: '' },
    { id: 3, name: '삼성 신세계 카드', benefit: '신세계/이마트 5% 할인', benefitPoints: 13000, image: '' },
    { id: 4, name: '삼성 코스트코 리워드', benefit: '코스트코 3% 적립', benefitPoints: 12000, image: '' },
    { id: 5, name: '삼성 SSG.COM 카드', benefit: 'SSG 7% 할인', benefitPoints: 11500, image: '' },
    { id: 6, name: '삼성 숫자123 카드', benefit: '생활비 1.5% 적립', benefitPoints: 11000, image: '' },
    { id: 7, name: '삼성 올댓 플래티늄', benefit: '해외 가맹점 2% 적립', benefitPoints: 10500, image: '' },
    { id: 8, name: '삼성 iD AIRLINES', benefit: '항공 마일리지 적립', benefitPoints: 10000, image: '' },
    { id: 9, name: '삼성 언니네쌀가게', benefit: '친환경 식품 10% 할인', benefitPoints: 9500, image: '' },
    { id: 10, name: '삼성 후불하이패스', benefit: '하이패스 5% 할인', benefitPoints: 9000, image: '' },
  ],
  hyundai: [
    { id: 1, name: '현대 M BOOST 카드', benefit: 'M포인트 최대 3% 적립', benefitPoints: 16000, image: '' },
    { id: 2, name: '현대 ZERO Edition2', benefit: '전월실적 없이 적립', benefitPoints: 14500, image: '' },
    { id: 3, name: '현대 더 핑크 카드', benefit: '뷰티/패션 10% 할인', benefitPoints: 13500, image: '' },
    { id: 4, name: '현대 다이너스 프리미엄', benefit: '프리미엄 라운지 이용', benefitPoints: 13000, image: '' },
    { id: 5, name: '현대 그린 카드', benefit: '친환경 가맹점 5% 할인', benefitPoints: 12500, image: '' },
    { id: 6, name: '현대 코스트코 리워드', benefit: '코스트코 1.5% 적립', benefitPoints: 12000, image: '' },
    { id: 7, name: '현대 MX 부스트', benefit: '스트리밍 구독 할인', benefitPoints: 11500, image: '' },
    { id: 8, name: '현대 CGV 카드', benefit: 'CGV 할인', benefitPoints: 11000, image: '' },
    { id: 9, name: '현대 에너지플러스', benefit: '주유/충전 10% 할인', benefitPoints: 10500, image: '' },
    { id: 10, name: '현대 기업 비즈니스', benefit: '업무용 혜택', benefitPoints: 10000, image: '' },
  ],
  kb: [
    { id: 1, name: 'KB국민 My WE:SH 카드', benefit: '쇼핑/배달 5% 할인', benefitPoints: 17000, image: '' },
    { id: 2, name: 'KB국민 톡톡O 카드', benefit: '통신비 10% 할인', benefitPoints: 15000, image: '' },
    { id: 3, name: 'KB국민 탄탄대로 카드', benefit: '주유 5% 할인', benefitPoints: 13500, image: '' },
    { id: 4, name: 'KB국민 노리2 체크카드', benefit: '교통 10% 할인', benefitPoints: 12500, image: '' },
    { id: 5, name: 'KB국민 청춘대로 카드', benefit: '카페/편의점 10% 할인', benefitPoints: 12000, image: '' },
    { id: 6, name: 'KB국민 가온 카드', benefit: '마트/슈퍼 5% 할인', benefitPoints: 11500, image: '' },
    { id: 7, name: 'KB국민 liiv M 카드', benefit: 'KB페이 5% 적립', benefitPoints: 11000, image: '' },
    { id: 8, name: 'KB국민 K-패스 카드', benefit: '대중교통 20% 할인', benefitPoints: 10500, image: '' },
    { id: 9, name: 'KB국민 스타벅스 카드', benefit: '스타벅스 10% 할인', benefitPoints: 10000, image: '' },
    { id: 10, name: 'KB국민 기프트 카드', benefit: '선물하기 5% 할인', benefitPoints: 9500, image: '' },
  ],
  hana: [
    { id: 1, name: '하나 원큐 카드', benefit: '대중교통/통신 10% 할인', benefitPoints: 14000, image: '' },
    { id: 2, name: '하나 1Q 생활비 카드', benefit: '생활비 3% 적립', benefitPoints: 12500, image: '' },
    { id: 3, name: '하나 원더 카드', benefit: '온라인 쇼핑 5% 할인', benefitPoints: 11500, image: '' },
    { id: 4, name: '하나 에어 카드', benefit: '항공 마일리지 적립', benefitPoints: 11000, image: '' },
    { id: 5, name: '하나 K-패스 카드', benefit: '대중교통 20% 할인', benefitPoints: 10500, image: '' },
    { id: 6, name: '하나 스카이패스 카드', benefit: '대한항공 마일리지', benefitPoints: 10000, image: '' },
    { id: 7, name: '하나 트래블 카드', benefit: '해외 수수료 면제', benefitPoints: 9500, image: '' },
    { id: 8, name: '하나 오피스 카드', benefit: '사무용품 10% 할인', benefitPoints: 9000, image: '' },
    { id: 9, name: '하나 GS칼텍스 카드', benefit: '주유 할인', benefitPoints: 8500, image: '' },
    { id: 10, name: '하나 BIG플러스 카드', benefit: '대형마트 5% 할인', benefitPoints: 8000, image: '' },
  ],
  woori: [
    { id: 1, name: '우리 카드의정석 COOKIE', benefit: '온라인 3% 적립', benefitPoints: 13000, image: '' },
    { id: 2, name: '우리 카드의정석 EVERY', benefit: '전 가맹점 1.5% 적립', benefitPoints: 12000, image: '' },
    { id: 3, name: '우리 NU 오하쳌', benefit: '구독서비스 10% 할인', benefitPoints: 11000, image: '' },
    { id: 4, name: '우리 WON카드 위비', benefit: '간편결제 5% 적립', benefitPoints: 10500, image: '' },
    { id: 5, name: '우리 V카드', benefit: '해외 2% 적립', benefitPoints: 10000, image: '' },
    { id: 6, name: '우리 하나로마트 카드', benefit: '농협마트 7% 할인', benefitPoints: 9500, image: '' },
    { id: 7, name: '우리 다이렉트 카드', benefit: '보험료 5% 할인', benefitPoints: 9000, image: '' },
    { id: 8, name: '우리 가족사랑 카드', benefit: '교육비 5% 할인', benefitPoints: 8500, image: '' },
    { id: 9, name: '우리 주유 카드', benefit: '주유 리터당 50원 할인', benefitPoints: 8000, image: '' },
    { id: 10, name: '우리 포인트 플러스', benefit: '포인트 적립 우대', benefitPoints: 7500, image: '' },
  ],
  lotte: [
    { id: 1, name: '롯데 LOCA 365 카드', benefit: '롯데그룹 7% 할인', benefitPoints: 15000, image: '' },
    { id: 2, name: '롯데 L.POINT 카드', benefit: 'L.POINT 2배 적립', benefitPoints: 13500, image: '' },
    { id: 3, name: '롯데 LOCA LIKIT', benefit: '좋아하는 곳 7% 할인', benefitPoints: 12500, image: '' },
    { id: 4, name: '롯데 롯데백화점 카드', benefit: '롯데백화점 5% 할인', benefitPoints: 12000, image: '' },
    { id: 5, name: '롯데 롯데마트 카드', benefit: '롯데마트 7% 할인', benefitPoints: 11500, image: '' },
    { id: 6, name: '롯데 LOCA 에너지 카드', benefit: '주유/충전 7% 할인', benefitPoints: 11000, image: '' },
    { id: 7, name: '롯데 시네마 카드', benefit: '롯데시네마 50% 할인', benefitPoints: 10500, image: '' },
    { id: 8, name: '롯데 면세점 카드', benefit: '면세점 5% 적립', benefitPoints: 10000, image: '' },
    { id: 9, name: '롯데 하이마트 카드', benefit: '하이마트 5% 할인', benefitPoints: 9500, image: '' },
    { id: 10, name: '롯데 세븐일레븐 카드', benefit: '편의점 10% 할인', benefitPoints: 9000, image: '' },
  ],
  bc: [
    { id: 1, name: 'BC 바로 카드', benefit: '온라인 5% 할인', benefitPoints: 12000, image: '' },
    { id: 2, name: 'BC TOP 카드', benefit: '탑 브랜드 10% 할인', benefitPoints: 11000, image: '' },
    { id: 3, name: 'BC 그린카드', benefit: '친환경 10% 할인', benefitPoints: 10500, image: '' },
    { id: 4, name: 'BC 플러스 카드', benefit: '포인트 2배 적립', benefitPoints: 10000, image: '' },
    { id: 5, name: 'BC 페이북 카드', benefit: '페이북 결제 5% 할인', benefitPoints: 9500, image: '' },
    { id: 6, name: 'BC 클리어 카드', benefit: '연회비 면제', benefitPoints: 9000, image: '' },
    { id: 7, name: 'BC 노블레스 카드', benefit: 'VIP 라운지 이용', benefitPoints: 8500, image: '' },
    { id: 8, name: 'BC 올마이쇼핑 카드', benefit: '쇼핑 7% 할인', benefitPoints: 8000, image: '' },
    { id: 9, name: 'BC 스마트 카드', benefit: '공과금 3% 할인', benefitPoints: 7500, image: '' },
    { id: 10, name: 'BC 기프트 카드', benefit: '선물 카드 할인', benefitPoints: 7000, image: '' },
  ],
};

const CardCompanyListScreen = ({ showToast }) => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [selectedCard, setSelectedCard] = useState(null);
  const [showSheet, setShowSheet] = useState(false);

  const company = cardCompanies[companyId] || cardCompanies.shinhan;
  const cards = cardData[companyId] || cardData.shinhan;

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowSheet(true);
  };

  const closeSheet = () => {
    setShowSheet(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  const handleApply = () => {
    showToast(`${selectedCard?.name} 신청 페이지로 이동합니다`);
    closeSheet();
  };

  return (
    <div className="screen card-company-list-screen">
      {/* 헤더 */}
      <div className="company-list-header" style={{ background: company.color }}>
        <button className="back-btn white" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="company-header-info">
          <div className="company-header-logo">
            <span>{company.logo}</span>
          </div>
          <div className="company-header-text">
            <h1>{company.name}</h1>
            <p>Top 10 카드</p>
          </div>
        </div>
      </div>

      {/* 카드 리스트 */}
      <div className="card-list-container">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="card-list-item"
            onClick={() => handleCardClick(card)}
          >
            <div className="card-rank-badge" style={{ background: index < 3 ? company.color : '#e0e0e0', color: index < 3 ? '#fff' : '#666' }}>
              {index + 1}
            </div>
            <div className="card-item-info">
              <span className="card-item-name">{card.name}</span>
              <span className="card-item-benefit">{card.benefit}</span>
            </div>
            <div className="card-item-point">
              <span className="point-value">+{card.benefitPoints.toLocaleString()}</span>
              <span className="point-unit">핀</span>
            </div>
          </div>
        ))}
      </div>

      {/* 바텀시트 */}
      <div
        className={`card-detail-overlay ${showSheet ? 'active' : ''}`}
        onClick={closeSheet}
      >
        <div className="card-detail-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="sheet-handle" />

          {selectedCard && (
            <>
              <div className="sheet-card-info">
                <div className="sheet-card-logo" style={{ background: company.color }}>
                  <span>{company.logo}</span>
                </div>
                <div className="sheet-card-text">
                  <h3>{selectedCard.name}</h3>
                  <p>{selectedCard.benefit}</p>
                </div>
              </div>

              <div className="sheet-point-box">
                <span className="sheet-point-label">발급 시 적립 예정</span>
                <span className="sheet-point-value">+{selectedCard.benefitPoints.toLocaleString()}핀</span>
              </div>

              <div className="sheet-notice">
                <p>* 카드 발급 완료 후 익월 15일 이내 지급</p>
                <p>* 기존 회원은 혜택이 다를 수 있음</p>
              </div>

              <button className="sheet-apply-btn" onClick={handleApply}>
                카드 신청하기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardCompanyListScreen;
