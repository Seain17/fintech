import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './mobile/styles/global.css';

// Shared Constants, Components & Hooks
import { TIMING, APP_DEFAULTS, NAVIGATION } from './shared/constants';
import { ErrorBoundary, PageLoading } from './shared/components';
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
const CardTop10Screen = lazy(() => import('./mobile/screens/CardTop10Screen'));
const CardCompanyListScreen = lazy(() => import('./mobile/screens/CardCompanyListScreen'));

// Admin (Lazy Load)
const AdminApp = lazy(() => import('./AdminApp'));

function MobileApp({ isLoggedIn, isGuest, handleLogin, handleSignup, handleGuest, showToast, userPoints, updatePoints, toast, unreadCount }) {
  const location = useLocation();
  const shouldHideNav = NAVIGATION.HIDE_NAV_PATHS.includes(location.pathname)
    || NAVIGATION.HIDE_NAV_PREFIXES.some(p => location.pathname.startsWith(p));

  return (
    <div className="phone-frame">
      <Suspense fallback={<PageLoading />}>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<OnboardingScreen onGuest={handleGuest} />} />
              <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignupScreen onSignup={handleSignup} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomeScreen userPoints={userPoints} showToast={showToast} updatePoints={updatePoints} isGuest={isGuest} unreadCount={unreadCount} />} />
              <Route path="/benefits" element={<BenefitsScreen showToast={showToast} updatePoints={updatePoints} unreadCount={unreadCount} />} />
              <Route path="/finance" element={<FinanceScreen showToast={showToast} unreadCount={unreadCount} />} />
              <Route path="/mypage" element={<MypageScreen userPoints={userPoints} showToast={showToast} unreadCount={unreadCount} />} />

              {/* Detail Pages */}
              <Route path="/withdraw" element={<WithdrawDetailScreen userPoints={userPoints} showToast={showToast} isGuest={isGuest} />} />
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
              <Route path="/settings" element={<SettingsScreen showToast={showToast} />} />
              <Route path="/game/:gameType" element={<GamePlayScreen updatePoints={updatePoints} showToast={showToast} />} />
              <Route path="/inquiry" element={<InquiryScreen showToast={showToast} />} />
              <Route path="/faq" element={<FAQScreen />} />
              <Route path="/notice" element={<NoticeScreen />} />
              <Route path="/profile-edit" element={<ProfileEditScreen showToast={showToast} />} />
              <Route path="/nickname-edit" element={<NicknameEditScreen showToast={showToast} />} />
              <Route path="/exchange" element={<ExchangeScreen userPoints={userPoints} showToast={showToast} />} />
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
  const [isGuest, setIsGuest] = useState(false);
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
    setIsGuest(false);
    showToast('환영합니다! 🎉');
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setIsGuest(false);
    updatePoints(APP_DEFAULTS.WELCOME_BONUS_POINTS);
    showToast('회원가입 완료! 웰컴핀 1,000핀 지급 🎉');
  };

  const handleGuest = () => {
    setIsLoggedIn(true);
    setIsGuest(true);
    showToast('둘러보기 모드로 이용 중입니다');
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
      isGuest={isGuest}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      handleGuest={handleGuest}
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
