import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';

const TermsScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="screen detail-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">이용약관</h1>
      </div>

      <div className="detail-content">
        <div className="legal-content">
          <h2>제1조 (목적)</h2>
          <p>
            이 약관은 에이핀(이하 "회사")이 제공하는 서비스의 이용조건 및 절차,
            회사와 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>

          <h2>제2조 (용어의 정의)</h2>
          <p>
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          </p>
          <ol>
            <li>"서비스"란 회사가 제공하는 핀 적립, 출금, 경품 등의 모든 서비스를 말합니다.</li>
            <li>"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원을 말합니다.</li>
            <li>"핀"이란 서비스 내에서 적립 및 사용 가능한 가상의 재화를 말합니다.</li>
          </ol>

          <h2>제3조 (약관의 효력 및 변경)</h2>
          <p>
            ① 이 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.<br />
            ② 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며,
            변경된 약관은 서비스 내 공지사항을 통해 공지합니다.
          </p>

          <h2>제4조 (서비스의 제공)</h2>
          <p>
            ① 회사는 다음의 서비스를 제공합니다.
          </p>
          <ol>
            <li>핀 적립 서비스</li>
            <li>핀 출금 서비스</li>
            <li>경품 이벤트 서비스</li>
            <li>제휴사 핀 전환 서비스</li>
            <li>기타 회사가 정하는 서비스</li>
          </ol>

          <h2>제5조 (핀)</h2>
          <p>
            ① 핀은 서비스 내 활동을 통해 적립됩니다.<br />
            ② 핀의 유효기간은 적립일로부터 2년입니다.<br />
            ③ 회원 탈퇴 시 미사용 핀은 즉시 소멸됩니다.
          </p>

          <h2>제6조 (출금)</h2>
          <p>
            ① 최소 출금 금액은 10,000원입니다.<br />
            ② 출금은 본인 명의의 계좌로만 가능합니다.<br />
            ③ 출금 처리는 영업일 기준 1~3일 소요됩니다.
          </p>

          <div className="legal-footer">
            <p>시행일자: 2026년 1월 1일</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsScreen;
