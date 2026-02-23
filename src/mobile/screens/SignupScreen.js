import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupScreen.css';

// 더미 닉네임 생성용 단어 리스트
const adjectives = [
  '행복한', '용감한', '똑똑한', '귀여운', '멋진', '빛나는', '즐거운', '활발한',
  '따뜻한', '신나는', '달리는', '웃는', '춤추는', '노래하는', '꿈꾸는', '반짝이는',
  '날아가는', '점프하는', '씩씩한', '당당한', '자유로운', '평화로운', '건강한', '슬기로운'
];

const nouns = [
  '고양이', '강아지', '토끼', '펭귄', '판다', '사자', '호랑이', '코끼리',
  '돌고래', '부엉이', '여우', '다람쥐', '햄스터', '코알라', '기린', '얼룩말',
  '수달', '해달', '북극곰', '레서판다', '알파카', '미어캣', '카피바라', '쿼카'
];

const generateNickname = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${adj}${noun}${num}`;
};

const SignupScreen = ({ onSignup }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1 state
  // eslint-disable-next-line no-unused-vars
  const [selectedProvider, setSelectedProvider] = useState('');

  // Step 2 state (약관동의)
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
    age: false,
  });

  // 약관 상세 보기 모달
  const [termDetail, setTermDetail] = useState(null);

  // 약관 상세 내용
  const termDetails = {
    service: {
      title: '서비스 이용약관',
      content: `제1조 (목적)
이 약관은 에이핀(이하 "회사")가 제공하는 핀 적립 및 금융 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (정의)
1. "서비스"란 회사가 제공하는 핀 적립, 출금, 제휴 서비스 등을 말합니다.
2. "회원"이란 이 약관에 동의하고 서비스를 이용하는 자를 말합니다.

제3조 (서비스 이용)
1. 회원은 본 약관에 따라 서비스를 이용할 수 있습니다.
2. 회사는 서비스 개선을 위해 사전 공지 후 서비스를 변경할 수 있습니다.`
    },
    privacy: {
      title: '개인정보 처리방침',
      content: `1. 수집하는 개인정보 항목
- 필수항목: 이름, 이메일, 휴대폰 번호
- 선택항목: 마케팅 수신 동의 여부

2. 개인정보의 수집 및 이용목적
- 회원 가입 및 관리
- 서비스 제공 및 핀 정산
- 고객 상담 및 불만 처리

3. 개인정보의 보유 및 이용기간
- 회원 탈퇴 시까지 (단, 관계 법령에 따라 보존이 필요한 경우 해당 기간까지)

4. 개인정보의 파기
- 보유기간 경과 시 지체 없이 파기합니다.`
    },
    age: {
      title: '만 14세 이상 확인',
      content: `만 14세 미만의 아동은 법정대리인의 동의 없이 서비스에 가입할 수 없습니다.

본 확인은 정보통신망 이용촉진 및 정보보호 등에 관한 법률에 따른 것으로, 만 14세 미만의 아동이 서비스에 가입하기 위해서는 법정대리인의 동의가 필요합니다.

만 14세 이상임을 확인합니다.`
    },
    marketing: {
      title: '마케팅 수신 동의',
      content: `에이핀의 다양한 혜택과 이벤트 정보를 받아보실 수 있습니다.

수신 동의 시 받으실 수 있는 정보:
- 신규 서비스 및 기능 안내
- 핀 적립 이벤트 정보
- 제휴사 할인 혜택 안내
- 맞춤형 금융 상품 추천

※ 마케팅 수신 동의는 선택 사항이며, 동의하지 않아도 서비스 이용에 제한이 없습니다.
※ 수신 동의 후에도 마이페이지에서 언제든 변경 가능합니다.`
    }
  };

  // Step 3 state (본인인증 - 외부 인증사 연동 예정, 현재 mock)
  const [phone, setPhone] = useState('');
  const [verifying, setVerifying] = useState(false);

  // Step 4 state (닉네임)
  const [nickname, setNickname] = useState('');

  // 닉네임 자동 생성 (본인인증 완료 시)
  useEffect(() => {
    if (step === 4 && !nickname) {
      setNickname(generateNickname());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleSocialSelect = (provider) => {
    setSelectedProvider(provider);
    setTimeout(() => setStep(2), 400);
  };

  const handleTermToggle = (key) => {
    setTerms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAllTerms = () => {
    const allChecked = terms.service && terms.privacy && terms.marketing && terms.age;
    const newVal = !allChecked;
    setTerms({ service: newVal, privacy: newVal, marketing: newVal, age: newVal });
  };

  const handleTermsNext = () => {
    if (terms.service && terms.privacy && terms.age) {
      setStep(3);
    }
  };

  const handleVerify = () => {
    if (phone.length < 10) return;
    setVerifying(true);
    // 외부 인증사 연동 시 이 부분을 교체
    setTimeout(() => {
      setVerifying(false);
      setStep(4);
    }, 1200);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  const allTermsChecked = terms.service && terms.privacy && terms.marketing && terms.age;
  const requiredTermsChecked = terms.service && terms.privacy && terms.age;

  const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <div className="screen signup-screen">
      <div className="signup-content">
        {/* Top Bar: Back + Progress */}
        {step < 4 && (
          <div className="signup-top-bar">
            <button className="signup-back-btn" onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="signup-progress">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`signup-progress-bar ${i < step ? 'completed' : ''} ${i === step ? 'active' : ''}`}
                />
              ))}
              <span className="signup-step-label">{step}/3</span>
            </div>
          </div>
        )}

        {/* Step 1: Social Login */}
        {step === 1 && (
          <>
            <div className="signup-step-header">
              <h2 className="signup-step-title">지금 내 자산이 얼마나<br/>쌓여있는지 확인해보세요.</h2>
            </div>
            <div className="signup-social-section">
              <button className="social-btn kakao" onClick={() => handleSocialSelect('kakao')}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.463 2 10.731c0 2.727 1.818 5.127 4.548 6.5-.148.548-.95 3.534-.982 3.761 0 0-.02.166.088.229.108.063.235.015.235.015.31-.044 3.592-2.34 4.158-2.737.636.092 1.296.14 1.953.14 5.523 0 10-3.463 10-7.731S17.523 3 12 3z" />
                </svg>
                카카오로 계속하기
              </button>

              <button className="social-btn naver" onClick={() => handleSocialSelect('naver')}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
                </svg>
                네이버로 계속하기
              </button>

              <button className="social-btn google" onClick={() => handleSocialSelect('google')}>
                <svg viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google로 계속하기
              </button>

            </div>
          </>
        )}

        {/* Step 2: Terms Agreement */}
        {step === 2 && (
          <>
            <div className="signup-step-header">
              <h2 className="signup-step-title">약관동의</h2>
              <p className="signup-step-desc">서비스 이용을 위해 약관에 동의해주세요</p>
            </div>
            <div className="signup-terms-section">
              <div className="signup-terms-list">
                <div
                  className={`signup-term-all ${allTermsChecked ? 'checked' : ''}`}
                  onClick={handleAllTerms}
                >
                  <div className={`signup-checkbox ${allTermsChecked ? 'checked' : ''}`}>
                    <CheckIcon />
                  </div>
                  <span className="signup-term-text">전체 동의하기</span>
                </div>

                <div className="signup-term-item">
                  <div className="signup-term-left" onClick={() => handleTermToggle('service')}>
                    <div className={`signup-checkbox ${terms.service ? 'checked' : ''}`}>
                      <CheckIcon />
                    </div>
                    <span className="signup-term-text">
                      서비스 이용약관
                      <span className="signup-term-required">(필수)</span>
                    </span>
                  </div>
                  <button className="signup-term-detail-btn" onClick={(e) => { e.stopPropagation(); setTermDetail('service'); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                <div className="signup-term-item">
                  <div className="signup-term-left" onClick={() => handleTermToggle('privacy')}>
                    <div className={`signup-checkbox ${terms.privacy ? 'checked' : ''}`}>
                      <CheckIcon />
                    </div>
                    <span className="signup-term-text">
                      개인정보 처리방침
                      <span className="signup-term-required">(필수)</span>
                    </span>
                  </div>
                  <button className="signup-term-detail-btn" onClick={(e) => { e.stopPropagation(); setTermDetail('privacy'); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                <div className="signup-term-item">
                  <div className="signup-term-left" onClick={() => handleTermToggle('age')}>
                    <div className={`signup-checkbox ${terms.age ? 'checked' : ''}`}>
                      <CheckIcon />
                    </div>
                    <span className="signup-term-text">
                      만 14세 이상입니다
                      <span className="signup-term-required">(필수)</span>
                    </span>
                  </div>
                  <button className="signup-term-detail-btn" onClick={(e) => { e.stopPropagation(); setTermDetail('age'); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                <div className="signup-term-item">
                  <div className="signup-term-left" onClick={() => handleTermToggle('marketing')}>
                    <div className={`signup-checkbox ${terms.marketing ? 'checked' : ''}`}>
                      <CheckIcon />
                    </div>
                    <span className="signup-term-text">
                      마케팅 수신 동의
                      <span className="signup-term-optional">(선택)</span>
                    </span>
                  </div>
                  <button className="signup-term-detail-btn" onClick={(e) => { e.stopPropagation(); setTermDetail('marketing'); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                className="signup-next-btn"
                onClick={handleTermsNext}
                disabled={!requiredTermsChecked}
              >
                다음
              </button>
            </div>
          </>
        )}

        {/* Step 3: Identity Verification (외부 인증사 연동 예정) */}
        {step === 3 && (
          <>
            <div className="signup-step-header">
              <h2 className="signup-step-title">본인인증</h2>
              <p className="signup-step-desc">안전한 서비스 이용을 위해 정보를 확인해주세요</p>
            </div>
            <div className="signup-verify-section">
              {/* SSO에서 자동으로 받은 정보 */}
              <div className="signup-sso-info">
                <div className="signup-sso-item">
                  <span className="signup-sso-label">이름</span>
                  <div className="signup-sso-value-row">
                    <span className="signup-sso-value">홍길동</span>
                    <span className="signup-sso-badge">SNS 연동</span>
                  </div>
                </div>
                <div className="signup-sso-item">
                  <span className="signup-sso-label">이메일</span>
                  <div className="signup-sso-value-row">
                    <span className="signup-sso-value">hong@email.com</span>
                    <span className="signup-sso-badge">SNS 연동</span>
                  </div>
                </div>
              </div>

              {/* 휴대폰 번호 입력 */}
              <div className="signup-form-group">
                <label className="signup-form-label">휴대폰 번호</label>
                <input
                  type="tel"
                  className="signup-form-input"
                  placeholder="01012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={11}
                />
              </div>

              <button
                className="signup-next-btn"
                onClick={handleVerify}
                disabled={verifying || phone.length < 10}
              >
                {verifying ? '인증 처리 중...' : '본인인증 하기'}
              </button>
            </div>
          </>
        )}

        {/* Step 4: Complete with Nickname */}
        {step === 4 && (
          <div className="signup-complete-section">
            <div className="signup-complete-icon">
              <span className="signup-sparkle"></span>
              <span className="signup-sparkle"></span>
              <span className="signup-sparkle"></span>
              🎉
            </div>
            <h2 className="signup-complete-title">환영합니다!</h2>
            <p className="signup-complete-desc">
              <strong>{nickname}</strong>님,<br/>에이핀의 모든 혜택을 누려보세요
            </p>
            <p className="signup-nickname-hint">닉네임은 마이페이지에서 변경할 수 있어요</p>
            <div className="signup-points-badge">
              <div className="signup-points-label">웰컴핀 지급!</div>
              <div className="signup-points-value">1,000핀</div>
            </div>
            <button className="signup-start-btn" onClick={onSignup}>
              시작하기
            </button>
          </div>
        )}
      </div>

      {/* 약관 상세 보기 모달 */}
      {termDetail && (
        <div className="term-detail-overlay" onClick={() => setTermDetail(null)}>
          <div className="term-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="term-detail-header">
              <h3 className="term-detail-title">{termDetails[termDetail].title}</h3>
              <button className="term-detail-close" onClick={() => setTermDetail(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="term-detail-content">
              {termDetails[termDetail].content}
            </div>
            <button className="term-detail-confirm" onClick={() => setTermDetail(null)}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupScreen;
