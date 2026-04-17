import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './mobile/styles/global.css';

// Shared Constants, Components & Hooks
import { TIMING, APP_DEFAULTS, NAVIGATION } from './shared/constants';
import { ErrorBoundary, PageLoading, SmsVerification } from './shared/components';
import { useToast, usePoints } from './shared/hooks';

// 즉시 로드 (초기 진입 필수)
import SplashScreen from './mobile/screens/SplashScreen';
import OnboardingScreen from './mobile/screens/OnboardingScreen';
import LoginScreen from './mobile/screens/LoginScreen';
import SignupScreen from './mobile/screens/SignupScreen';

// Mobile Components (즉시 로드)
import BottomNav from './mobile/components/BottomNav';
import Toast from './mobile/components/Toast';

// Lazy Load - 메인 탭 스크린
const HomeScreen = lazy(() => import('./mobile/screens/HomeScreen'));
const BenefitsScreen = lazy(() => import('./mobile/screens/BenefitsScreen'));
const FinanceScreen = lazy(() => import('./mobile/screens/FinanceScreen'));
const MypageScreen = lazy(() => import('./mobile/screens/MypageScreen'));

// Lazy Load - 상세 스크린
const WithdrawDetailScreen = lazy(() => import('./mobile/screens/WithdrawDetailScreen'));
const WithdrawHistoryScreen = lazy(() => import('./mobile/screens/WithdrawHistoryScreen'));
const PointHistoryScreen = lazy(() => import('./mobile/screens/PointHistoryScreen'));
const RaffleDetailScreen = lazy(() => import('./mobile/screens/RaffleDetailScreen'));
const RaffleHistoryScreen = lazy(() => import('./mobile/screens/RaffleHistoryScreen'));
const ShoppingBridgeScreen = lazy(() => import('./mobile/screens/ShoppingBridgeScreen'));
const SettingsScreen = lazy(() => import('./mobile/screens/SettingsScreen'));
const GamePlayScreen = lazy(() => import('./mobile/screens/GamePlayScreen'));
const InquiryScreen = lazy(() => import('./mobile/screens/InquiryScreen'));
const FAQScreen = lazy(() => import('./mobile/screens/FAQScreen'));
const NoticeScreen = lazy(() => import('./mobile/screens/NoticeScreen'));
const ProfileEditScreen = lazy(() => import('./mobile/screens/ProfileEditScreen'));
const TermsScreen = lazy(() => import('./mobile/screens/TermsScreen'));
const PrivacyScreen = lazy(() => import('./mobile/screens/PrivacyScreen'));
const ShoppingHistoryScreen = lazy(() => import('./mobile/screens/ShoppingHistoryScreen'));
const ShoppingDetailScreen = lazy(() => import('./mobile/screens/ShoppingDetailScreen'));
const QuizScreen = lazy(() => import('./mobile/screens/QuizScreen'));
const AttendanceScreen = lazy(() => import('./mobile/screens/AttendanceScreen'));
const NotificationScreen = lazy(() => import('./mobile/screens/NotificationScreen'));
const NotificationDetailScreen = lazy(() => import('./mobile/screens/NotificationDetailScreen'));
const WalkingScreen = lazy(() => import('./mobile/screens/WalkingScreen'));
const NicknameEditScreen = lazy(() => import('./mobile/screens/NicknameEditScreen'));
const ExchangeScreen = lazy(() => import('./mobile/screens/ExchangeScreen'));
const MyCouponsScreen = lazy(() => import('./mobile/screens/MyCouponsScreen'));
const CardTop10Screen = lazy(() => import('./mobile/screens/CardTop10Screen'));
const CardCompanyListScreen = lazy(() => import('./mobile/screens/CardCompanyListScreen'));

// Admin (Lazy Load)
const AdminApp = lazy(() => import('./AdminApp'));

const BLOCK_REASON = '불법 프로그램 사용';
const MAX_APPEALS = 3;

function BlockedModal({ onClose }) {
  const [step, setStep] = useState('blocked'); // 'blocked' | 'appeal' | 'done' | 'exhausted'
  const [appealText, setAppealText] = useState('');
  const [appealCount, setAppealCount] = useState(0);

  const remainingAppeals = MAX_APPEALS - appealCount;

  const handleSubmitAppeal = () => {
    if (!appealText.trim()) return;
    const next = appealCount + 1;
    setAppealCount(next);
    setAppealText('');
    setStep(next >= MAX_APPEALS ? 'exhausted' : 'done');
  };

  if (step === 'appeal') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '28px 24px',
          width: '100%', maxWidth: '340px'
        }}>
          <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#1a2e71', marginBottom: '4px' }}>
            이의신청
          </h2>
          <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '16px' }}>
            남은 이의신청 횟수: {remainingAppeals}회
          </p>
          <textarea
            value={appealText}
            onChange={e => setAppealText(e.target.value)}
            maxLength={500}
            placeholder="이의신청 사유를 입력해 주세요."
            autoFocus
            style={{
              width: '100%', height: '140px', padding: '14px',
              border: '1.5px solid #e5e7eb', borderRadius: '12px',
              fontSize: '14px', lineHeight: '1.6', resize: 'none',
              fontFamily: 'inherit', color: '#191F28', outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#aaa', marginBottom: '20px' }}>
            {appealText.length}/500
          </div>
          <button
            onClick={handleSubmitAppeal}
            disabled={!appealText.trim()}
            style={{
              width: '100%', padding: '14px', borderRadius: '12px',
              background: appealText.trim() ? '#1a2e71' : '#e5e7eb',
              color: appealText.trim() ? '#fff' : '#aaa',
              border: 'none', fontSize: '15px', fontWeight: '600',
              cursor: appealText.trim() ? 'pointer' : 'not-allowed',
              marginBottom: '10px'
            }}
          >
            제출하기
          </button>
          <button
            onClick={() => setStep('blocked')}
            style={{
              width: '100%', padding: '10px', background: 'none', border: 'none',
              fontSize: '14px', color: '#999', cursor: 'pointer',
              textDecoration: 'underline', textUnderlineOffset: '3px'
            }}
          >
            뒤로
          </button>
        </div>
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '32px 24px',
          width: '100%', maxWidth: '340px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a2e71', marginBottom: '12px' }}>
            이의신청 완료
          </h2>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '8px' }}>
            이의신청이 접수되었습니다.<br />운영팀에서 검토 후 연락드리겠습니다.
          </p>
          <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '28px' }}>
            남은 이의신청 횟수: {remainingAppeals}회
          </p>
          <button
            onClick={() => setStep('blocked')}
            style={{
              width: '100%', padding: '14px', borderRadius: '12px',
              background: '#1a2e71', color: '#fff', border: 'none',
              fontSize: '15px', fontWeight: '600', cursor: 'pointer'
            }}
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  if (step === 'exhausted') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '32px 24px',
          width: '100%', maxWidth: '340px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⛔</div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a2e71', marginBottom: '12px' }}>
            이의신청 횟수 소진
          </h2>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '28px' }}>
            이의신청 가능 횟수({MAX_APPEALS}회)를 모두 사용했습니다.<br />더 이상 이의신청이 불가합니다.
          </p>
          <button
            onClick={onClose}
            style={{
              width: '100%', padding: '14px', borderRadius: '12px',
              background: '#1a2e71', color: '#fff', border: 'none',
              fontSize: '15px', fontWeight: '600', cursor: 'pointer'
            }}
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '32px 24px',
        width: '100%', maxWidth: '340px', textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a2e71', marginBottom: '12px' }}>
          계정이 차단되었습니다
        </h2>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '12px' }}>
          운영 정책 위반으로 인해 계정 이용이 제한되었습니다.
        </p>
        <div style={{
          background: '#fff4f4', border: '1px solid #ffd0d0', borderRadius: '10px',
          padding: '10px 14px', marginBottom: '16px', display: 'inline-block'
        }}>
          <span style={{ fontSize: '13px', color: '#e53935', fontWeight: '600' }}>
            차단 사유: {BLOCK_REASON}
          </span>
        </div>
        <p style={{ fontSize: '13px', color: '#999', lineHeight: '1.7', marginBottom: '24px', textAlign: 'center' }}>
          차단 사유에 이의가 있으신 경우<br />이의신청 버튼을 통해 문의해 주세요.
        </p>
        <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '20px' }}>
          남은 이의신청 횟수: {remainingAppeals}회
        </p>
        <button
          onClick={() => setStep('appeal')}
          style={{
            width: '100%', padding: '14px', borderRadius: '12px',
            background: '#1a2e71', color: '#fff', border: 'none',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '10px'
          }}
        >
          이의신청 하기
        </button>
        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '10px', background: 'none', border: 'none',
            fontSize: '14px', color: '#999', cursor: 'pointer',
            textDecoration: 'underline', textUnderlineOffset: '3px'
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

function DormantModal({ onClose, onReactivate }) {
  const [step, setStep] = useState('notice'); // 'notice' | 'sms' | 'done'

  if (step === 'sms') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '28px 24px',
          width: '100%', maxWidth: '340px'
        }}>
          <SmsVerification
            title="본인인증"
            subtitle="휴면 해제를 위해 본인인증을 진행해주세요."
            submitText="인증하고 계정 복구하기"
            onSuccess={() => setStep('done')}
            onClose={() => setStep('notice')}
          />
        </div>
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '32px 24px',
          width: '100%', maxWidth: '340px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a2e71', marginBottom: '12px' }}>
            계정이 복구되었습니다
          </h2>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '28px' }}>
            휴면이 해제되었습니다.<br />기존 핀은 그대로 유지됩니다.
          </p>
          <button
            onClick={onReactivate}
            style={{
              width: '100%', padding: '14px', borderRadius: '12px',
              background: '#1a2e71', color: '#fff', border: 'none',
              fontSize: '15px', fontWeight: '600', cursor: 'pointer'
            }}
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '32px 24px',
        width: '100%', maxWidth: '340px', textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💤</div>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1a2e71', marginBottom: '12px' }}>
          휴면 계정입니다
        </h2>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', marginBottom: '8px', textAlign: 'center' }}>
          12개월 이상 접속하지 않아<br />계정이 휴면 상태로 전환되었습니다.
        </p>
        <p style={{ fontSize: '13px', color: '#999', lineHeight: '1.7', marginBottom: '28px', textAlign: 'center' }}>
          본인인증을 통해 계정을 복구하시면<br />기존 핀을 그대로 사용하실 수 있습니다.
        </p>
        <button
          onClick={() => setStep('sms')}
          style={{
            width: '100%', padding: '14px', borderRadius: '12px',
            background: '#1a2e71', color: '#fff', border: 'none',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '10px'
          }}
        >
          본인인증으로 계정 복구하기
        </button>
        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '10px', background: 'none', border: 'none',
            fontSize: '14px', color: '#999', cursor: 'pointer',
            textDecoration: 'underline', textUnderlineOffset: '3px'
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

function MobileApp({ isLoggedIn, isBlocked, setIsBlocked, isDormant, setIsDormant, handleLogin, handleSignup, showToast, userPoints, updatePoints, toast, unreadCount }) {
  const location = useLocation();
  const shouldHideNav = NAVIGATION.HIDE_NAV_PATHS.includes(location.pathname)
    || NAVIGATION.HIDE_NAV_PREFIXES.some(p => location.pathname.startsWith(p));
  const navigate = useNavigate(); // eslint-disable-line no-unused-vars

  return (
    <div className="phone-frame">
      {isBlocked && (
        <BlockedModal onClose={() => setIsBlocked(false)} />
      )}
      {isDormant && (
        <DormantModal
          onClose={() => setIsDormant(false)}
          onReactivate={() => { setIsDormant(false); handleLogin(); }}
        />
      )}
      <Suspense fallback={<PageLoading />}>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<OnboardingScreen />} />
              <Route path="/login" element={<LoginScreen onLogin={handleLogin} onShowBlocked={() => setIsBlocked(true)} onShowDormant={() => setIsDormant(true)} />} />
              <Route path="/signup" element={<SignupScreen onSignup={handleSignup} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomeScreen userPoints={userPoints} showToast={showToast} updatePoints={updatePoints} unreadCount={unreadCount} />} />
              <Route path="/benefits" element={<BenefitsScreen showToast={showToast} updatePoints={updatePoints} unreadCount={unreadCount} userPoints={userPoints} />} />
              <Route path="/finance" element={<FinanceScreen showToast={showToast} unreadCount={unreadCount} />} />
              <Route path="/mypage" element={<MypageScreen userPoints={userPoints} showToast={showToast} unreadCount={unreadCount} />} />

              {/* Detail Pages */}
              <Route path="/withdraw" element={<WithdrawDetailScreen userPoints={userPoints} showToast={showToast} />} />
              <Route path="/withdraw-history" element={<WithdrawHistoryScreen />} />
              <Route path="/point-history" element={<PointHistoryScreen />} />
              <Route path="/raffle/:id" element={<RaffleDetailScreen userPoints={userPoints} updatePoints={updatePoints} showToast={showToast} />} />
              <Route path="/raffle-history" element={<RaffleHistoryScreen />} />
              <Route path="/shopping-history" element={<ShoppingHistoryScreen />} />
              <Route path="/shopping/:mallId" element={<ShoppingDetailScreen />} />
              <Route path="/shopping/bridge/:shopId" element={<ShoppingBridgeScreen />} />
              <Route path="/quiz" element={<QuizScreen showToast={showToast} updatePoints={updatePoints} />} />
              <Route path="/attendance" element={<AttendanceScreen showToast={showToast} updatePoints={updatePoints} />} />
              <Route path="/walking" element={<WalkingScreen userPoints={userPoints} updatePoints={updatePoints} showToast={showToast} />} />
              <Route path="/notifications" element={<NotificationScreen showToast={showToast} />} />
              <Route path="/notification/:id" element={<NotificationDetailScreen showToast={showToast} />} />
              <Route path="/settings" element={<SettingsScreen showToast={showToast} onShowBlocked={() => setIsBlocked(true)} />} />
              <Route path="/game/:gameType" element={<GamePlayScreen updatePoints={updatePoints} showToast={showToast} />} />
              <Route path="/inquiry" element={<InquiryScreen showToast={showToast} />} />
              <Route path="/faq" element={<FAQScreen />} />
              <Route path="/notice" element={<NoticeScreen />} />
              <Route path="/profile-edit" element={<ProfileEditScreen showToast={showToast} />} />
              <Route path="/nickname-edit" element={<NicknameEditScreen showToast={showToast} />} />
              <Route path="/exchange" element={<ExchangeScreen userPoints={userPoints} showToast={showToast} />} />
              <Route path="/my-coupons" element={<MyCouponsScreen />} />
              <Route path="/terms" element={<TermsScreen />} />
              <Route path="/privacy" element={<PrivacyScreen />} />
              <Route path="/card-top10" element={<CardTop10Screen showToast={showToast} />} />
              <Route path="/card-top10/:companyId" element={<CardCompanyListScreen showToast={showToast} />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Suspense>

      {isLoggedIn && !shouldHideNav && <BottomNav />}
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isDormant, setIsDormant] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [unreadCount, setUnreadCount] = useState(APP_DEFAULTS.INITIAL_UNREAD_COUNT);

  // 커스텀 훅 사용
  const { toast, showToast } = useToast();
  const { points: userPoints, updatePoints } = usePoints();

  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin 모드일 때 body 클래스 추가/제거
  useEffect(() => {
    if (isAdminRoute) {
      document.body.classList.add('admin-mode');
    } else {
      document.body.classList.remove('admin-mode');
    }
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, [isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) {
      setShowSplash(false);
      return;
    }
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, TIMING.SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [isAdminRoute]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    showToast('환영합니다! 🎉');
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    updatePoints(APP_DEFAULTS.WELCOME_BONUS_POINTS);
    showToast('회원가입 완료! 웰컴핀 1,000핀 지급 🎉');
  };

  // Admin 라우트인 경우 별도 처리
  if (isAdminRoute) {
    return (
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    );
  }

  // 모바일 앱 스플래시
  if (showSplash) {
    return (
      <div className="phone-frame">
        <SplashScreen />
      </div>
    );
  }

  return (
    <MobileApp
      isLoggedIn={isLoggedIn}
      isBlocked={isBlocked}
      setIsBlocked={setIsBlocked}
      isDormant={isDormant}
      setIsDormant={setIsDormant}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      showToast={showToast}
      userPoints={userPoints}
      updatePoints={updatePoints}
      toast={toast}
      unreadCount={unreadCount}
    />
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
