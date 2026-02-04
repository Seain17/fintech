import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailScreen.css';

const PrivacyScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="screen detail-screen">
      <div className="page-header">
        <button className="page-back-btn" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">개인정보처리방침</h1>
      </div>

      <div className="detail-content">
        <div className="legal-content">
          <p className="legal-intro">
            에이핀(이하 "회사")은 이용자의 개인정보를 중요시하며,
            「개인정보 보호법」을 준수하고 있습니다.
          </p>

          <h2>1. 수집하는 개인정보 항목</h2>
          <p>
            회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다.
          </p>
          <ul>
            <li>필수항목: 이름, 이메일, 휴대폰 번호</li>
            <li>선택항목: 프로필 사진</li>
            <li>출금 시: 은행명, 계좌번호, 예금주</li>
          </ul>

          <h2>2. 개인정보의 수집 및 이용 목적</h2>
          <p>
            수집한 개인정보는 다음의 목적을 위해 이용됩니다.
          </p>
          <ul>
            <li>회원 가입 및 관리</li>
            <li>서비스 제공 및 요금 정산</li>
            <li>고객 상담 및 불만 처리</li>
            <li>마케팅 및 광고에 활용 (동의 시)</li>
          </ul>

          <h2>3. 개인정보의 보유 및 이용 기간</h2>
          <p>
            ① 회원 탈퇴 시까지 보유합니다.<br />
            ② 단, 관계법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보존합니다.
          </p>
          <ul>
            <li>전자상거래법에 따른 거래기록: 5년</li>
            <li>통신비밀보호법에 따른 로그기록: 3개월</li>
          </ul>

          <h2>4. 개인정보의 제3자 제공</h2>
          <p>
            회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
            다만, 다음의 경우에는 예외로 합니다.
          </p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 요구가 있는 경우</li>
          </ul>

          <h2>5. 개인정보의 파기</h2>
          <p>
            회사는 개인정보 보유기간의 경과, 처리목적 달성 등으로 개인정보가 불필요하게 되었을 때에는
            지체 없이 해당 개인정보를 파기합니다.
          </p>

          <h2>6. 이용자의 권리</h2>
          <p>
            이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
            가입 해지를 요청할 수 있습니다.
          </p>

          <h2>7. 개인정보 보호책임자</h2>
          <p>
            성명: 김보안<br />
            직책: 개인정보보호팀장<br />
            연락처: privacy@anick.com
          </p>

          <div className="legal-footer">
            <p>시행일자: 2026년 1월 1일</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyScreen;
