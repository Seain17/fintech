import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';

// Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BenefitsScreen from './screens/BenefitsScreen';
import FinanceScreen from './screens/FinanceScreen';
import MypageScreen from './screens/MypageScreen';

// Detail Screens
import WithdrawDetailScreen from './screens/WithdrawDetailScreen';
import PointHistoryScreen from './screens/PointHistoryScreen';
import RaffleDetailScreen from './screens/RaffleDetailScreen';
import ShoppingBridgeScreen from './screens/ShoppingBridgeScreen';
import SettingsScreen from './screens/SettingsScreen';
import GamePlayScreen from './screens/GamePlayScreen';

// Components
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [userPoints, setUserPoints] = useState(26350);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    showToast('환영합니다! 🎉');
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2500);
  };

  const updatePoints = (amount) => {
    setUserPoints(prev => prev + amount);
  };

  if (showSplash) {
    return (
      <div className="phone-frame">
        <SplashScreen />
      </div>
    );
  }

  return (
    <Router>
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
              <Route path="/point-history" element={<PointHistoryScreen />} />
              <Route path="/raffle/:id" element={<RaffleDetailScreen userPoints={userPoints} updatePoints={updatePoints} showToast={showToast} />} />
              <Route path="/shopping/bridge/:shopId" element={<ShoppingBridgeScreen />} />
              <Route path="/settings" element={<SettingsScreen showToast={showToast} />} />
              <Route path="/game/:gameType" element={<GamePlayScreen updatePoints={updatePoints} showToast={showToast} />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>

        {isLoggedIn && <BottomNav />}
        <Toast show={toast.show} message={toast.message} />
      </div>
    </Router>
  );
}

export default App;
