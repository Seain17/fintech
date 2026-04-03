import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardTop10Screen.css';

const cardCompanies = [
  { id: 'bc', name: 'BC카드', logo: 'BC', color: '#e31837', slogan: '생활 금융 플랫폼' },
  { id: 'hana', name: '하나카드', logo: '하나', color: '#009688', slogan: '손안의 하나' },
  { id: 'shinhan', name: '신한카드', logo: '신한', color: '#0046ff', slogan: '더 나은 금융 생활의 시작' },
  { id: 'samsung', name: '삼성카드', logo: '삼성', color: '#1428a0', slogan: '당신의 라이프스타일 파트너' },
  { id: 'hyundai', name: '현대카드', logo: '현대', color: '#000000', slogan: 'Make your Rule' },
  { id: 'kb', name: 'KB국민카드', logo: 'KB', color: '#ffb300', slogan: '금융을 넘어, 생활 속으로' },
  { id: 'woori', name: '우리카드', logo: '우리', color: '#0072bc', slogan: '우리만의 혜택' },
  { id: 'lotte', name: '롯데카드', logo: '롯데', color: '#e60012', slogan: '일상에 가치를 더하다' },
];

const CardTop10Screen = ({ showToast }) => {
  const navigate = useNavigate();

  return (
    <div className="screen card-top10-screen">
      {/* 헤더 */}
      <div className="card-top10-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="card-top10-title">에이핀 추천 카드혜택 Top10</h1>
        <div className="header-spacer" />
      </div>

      {/* 설명 */}
      <div className="card-top10-desc">
        <p>카드사별 최고 혜택 카드를 확인해보세요</p>
        <span className="update-info">매월 1일 업데이트</span>
      </div>

      {/* 카드사 리스트 */}
      <div className="card-company-list">
        {cardCompanies.map((company, index) => (
          <div
            key={company.id}
            className="card-company-item"
            onClick={() => navigate(`/card-top10/${company.id}`)}
          >
            <div className="company-rank">{index + 1}</div>
            <div className="company-logo" style={{ background: company.color }}>
              <span>{company.logo}</span>
            </div>
            <div className="company-info">
              <span className="company-name">{company.name}</span>
              <span className="company-slogan">{company.slogan}</span>
            </div>
            <div className="company-badge">Top 10</div>
            <svg className="company-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        ))}
      </div>

      {/* 안내 문구 */}
      <div className="card-top10-footer">
        <p>* 에이핀 제휴사 기준 혜택 순위입니다</p>
        <p>* 개인 소비 패턴에 따라 실제 혜택은 다를 수 있습니다</p>
      </div>
    </div>
  );
};

export default CardTop10Screen;
