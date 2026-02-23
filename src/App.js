import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './mobile/styles/global.css';

// Mobile Screens
import SplashScreen from './mobile/screens/SplashScreen';
import OnboardingScreen from './mobile/screens/OnboardingScreen';
import LoginScreen from './mobile/screens/LoginScreen';
import SignupScreen from './mobile/screens/SignupScreen';
import HomeScreen from './mobile/screens/HomeScreen';
import BenefitsScreen from './mobile/screens/BenefitsScreen';
import FinanceScreen from './mobile/screens/FinanceScreen';
import MypageScreen from './mobile/screens/MypageScreen';

// Mobile Detail Screens
import WithdrawDetailScreen from './mobile/screens/WithdrawDetailScreen';
import WithdrawHistoryScreen from './mobile/screens/WithdrawHistoryScreen';
import PointHistoryScreen from './mobile/screens/PointHistoryScreen';
import RaffleDetailScreen from './mobile/screens/RaffleDetailScreen';
import RaffleHistoryScreen from './mobile/screens/RaffleHistoryScreen';
import ShoppingBridgeScreen from './mobile/screens/ShoppingBridgeScreen';
import SettingsScreen from './mobile/screens/SettingsScreen';
import GamePlayScreen from './mobile/screens/GamePlayScreen';
import InquiryScreen from './mobile/screens/InquiryScreen';
import FAQScreen from './mobile/screens/FAQScreen';
import NoticeScreen from './mobile/screens/NoticeScreen';
import ProfileEditScreen from './mobile/screens/ProfileEditScreen';
import TermsScreen from './mobile/screens/TermsScreen';
import PrivacyScreen from './mobile/screens/PrivacyScreen';
import ShoppingHistoryScreen from './mobile/screens/ShoppingHistoryScreen';
import ShoppingDetailScreen from './mobile/screens/ShoppingDetailScreen';
import QuizScreen from './mobile/screens/QuizScreen';
import AttendanceScreen from './mobile/screens/AttendanceScreen';
import NotificationScreen from './mobile/screens/NotificationScreen';
import NotificationDetailScreen from './mobile/screens/NotificationDetailScreen';
import WalkingScreen from './mobile/screens/WalkingScreen';

// Mobile Components
import BottomNav from './mobile/components/BottomNav';
import Toast from './mobile/components/Toast';

// Admin
import AdminApp from './AdminApp';

// 네비게이션바를 숨길 상세 페이지 경로
const hideNavPaths = [
  '/withdraw', '/withdraw-history', '/point-history',
  '/raffle-history', '/shopping-history', '/quiz', '/attendance',
  '/settings', '/inquiry', '/faq', '/notice', '/notifications', '/walking'
];
const hideNavPrefixes = ['/raffle/', '/shopping/', '/notification/'];

function MobileApp({ isLoggedIn, isGuest, handleLogin, handleSignup, handleGuest, showToast, userPoints, updatePoints, toast, unreadCount }) {
  const location = useLocation();
  const shouldHideNav = hideNavPaths.includes(location.pathname)
    || hideNavPrefixes.some(p => location.pathname.startsWith(p));

  return (
    <div className="phone-frame">
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
            <Route path="/terms" element={<TermsScreen />} />
            <Route path="/privacy" element={<PrivacyScreen />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>

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
  const [toast, setToast] = useState({ show: false, message: '' });
  const [userPoints, setUserPoints] = useState(26350);
  // eslint-disable-next-line no-unused-vars
  const [unreadCount, setUnreadCount] = useState(3);

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
    }, 2500);
    return () => clearTimeout(timer);
  }, [isAdminRoute]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsGuest(false);
    showToastMessage('환영합니다! 🎉');
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setIsGuest(false);
    updatePoints(1000);
    showToastMessage('회원가입 완료! 웰컴포인트 1,000P 지급 🎉');
  };

  const handleGuest = () => {
    setIsLoggedIn(true);
    setIsGuest(true);
    showToastMessage('둘러보기 모드로 이용 중입니다');
  };

  const showToastMessage = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2500);
  };

  const updatePoints = (amount) => {
    setUserPoints(prev => prev + amount);
  };

  // Admin 라우트인 경우 별도 처리
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
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
      showToast={showToastMessage}
      userPoints={userPoints}
      updatePoints={updatePoints}
      toast={toast}
      unreadCount={unreadCount}
    />
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
