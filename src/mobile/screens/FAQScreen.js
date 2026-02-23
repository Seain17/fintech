import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';

const faqCategories = [
  { id: 'all', label: '전체' },
  { id: 'point', label: '핀' },
  { id: 'withdraw', label: '출금' },
  { id: 'raffle', label: '경품' },
  { id: 'account', label: '계정' },
];

const faqData = [
  {
    id: 1,
    category: 'point',
    question: '핀은 어떻게 적립되나요?',
    answer: '앱 내 다양한 활동(게임, 미션, 쇼핑 등)을 통해 핀을 적립할 수 있습니다. 또한 제휴사 핀을 전환하여 적립할 수도 있습니다.'
  },
  {
    id: 2,
    category: 'point',
    question: '핀 유효기간이 있나요?',
    answer: '적립된 핀은 적립일로부터 2년간 유효합니다. 유효기간이 지난 핀은 자동으로 소멸됩니다.'
  },
  {
    id: 3,
    category: 'withdraw',
    question: '출금 신청은 어떻게 하나요?',
    answer: '마이페이지에서 출금 버튼을 눌러 출금 신청을 할 수 있습니다. 최소 출금 금액은 10,000원이며, 본인 명의 계좌로만 출금 가능합니다.'
  },
  {
    id: 4,
    category: 'withdraw',
    question: '출금 처리는 얼마나 걸리나요?',
    answer: '출금 신청 후 영업일 기준 1~3일 이내에 처리됩니다. 주말 및 공휴일에는 처리가 지연될 수 있습니다.'
  },
  {
    id: 5,
    category: 'raffle',
    question: '경품 당첨 확률은 어떻게 되나요?',
    answer: '경품 당첨 확률은 각 경품별로 상이하며, 응모 티켓 수에 비례하여 당첨 확률이 높아집니다.'
  },
  {
    id: 6,
    category: 'raffle',
    question: '경품 당첨 상품은 어떻게 받나요?',
    answer: '경품 당첨 시 등록된 휴대폰 번호로 기프티콘이 발송됩니다. 발송된 기프티콘은 해당 브랜드 매장에서 사용 가능합니다.'
  },
  {
    id: 7,
    category: 'account',
    question: '비밀번호를 잊어버렸어요',
    answer: '로그인 화면에서 "비밀번호 찾기"를 통해 재설정할 수 있습니다. 가입 시 등록한 이메일로 재설정 링크가 발송됩니다.'
  },
  {
    id: 8,
    category: 'account',
    question: '회원 탈퇴는 어떻게 하나요?',
    answer: '앱 설정 > 회원 탈퇴에서 탈퇴할 수 있습니다. 탈퇴 시 모든 핀이 소멸되며 복구가 불가능하니 신중히 결정해주세요.'
  },
];

const FAQScreen = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openId, setOpenId] = useState(null);

  const filteredFaq = selectedCategory === 'all'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <div className="screen detail-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">자주 묻는 질문</h1>
      </div>

      <div className="detail-content">
        <div className="category-scroll">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {filteredFaq.map((item) => (
            <div key={item.id} className={`faq-item ${openId === item.id ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                <span>Q. {item.question}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d={openId === item.id ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
                </svg>
              </button>
              {openId === item.id && (
                <div className="faq-answer">
                  <span>A. {item.answer}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQScreen;
