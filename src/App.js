import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './mobile/styles/global.css';

// Mobile Screens
import SplashScreen from './mobile/screens/SplashScreen';
import OnboardingScreen from './mobile/screens/OnboardingScreen';
import LoginScreen from './mobile/screens/LoginScreen';
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

// Mobile Components
import BottomNav from './mobile/components/BottomNav';
import Toast from './mobile/components/Toast';

// Admin
import AdminApp from './AdminApp';

function MobileApp({ isLoggedIn, handleLogin, showToast, userPoints, updatePoints, toast }) {
  return (
    <div className="phone-frame">
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<OnboardingScreen />} />
            <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomeScreen userPoints={userPoints} showToast={showToast} updatePoints={updatePoints} />} />
            <Route path="/benefits" element={<BenefitsScreen showToast={showToast} updatePoints={updatePoints} />} />
            <Route path="/finance" element={<FinanceScreen showToast={showToast} />} />
            <Route path="/mypage" element={<MypageScreen userPoints={userPoints} showToast={showToast} />} />

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

      {isLoggedIn && <BottomNav />}
      <Toast show={toast.show} message={toast.message} />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [userPoints, setUserPoints] = useState(26350);

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
    showToastMessage('환영합니다! 🎉');
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
      handleLogin={handleLogin}
      showToast={showToastMessage}
      userPoints={userPoints}
      updatePoints={updatePoints}
      toast={toast}
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
