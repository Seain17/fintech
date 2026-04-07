import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ShoppingBridgeScreen.css';

const ShoppingBridgeScreen = () => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const [countdown, setCountdown] = useState(3);

  const shopData = {
    gmarket: { name: 'G마켓', url: 'https://www.gmarket.co.kr' },
    ohouse: { name: '오늘의집', url: 'https://ohou.se' },
    ssg: { name: 'SSG', url: 'https://www.ssg.com' },
    emart: { name: '이마트몰', url: 'https://emart.ssg.com' }
  };

  const currentShop = shopData[shopId] || shopData.gmarket;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.open(currentShop.url, '_blank');
          setTimeout(() => navigate('/benefits'), 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, currentShop.url]);

  return (
    <div className="screen bridge-screen">
      <div className="bridge-content">
        <div className="bridge-logo">🚀</div>
        <h1 className="bridge-title">{currentShop.name}로 이동중입니다...</h1>
        <div className="bridge-countdown">{countdown}</div>
        <div className="bridge-notice">
          <h3>⚠️ 유의사항</h3>
          <ul>
            <li>적립은 구매 확정 후 7일 이내에 지급됩니다</li>
            <li>취소/반품 시 적립이 취소될 수 있습니다</li>
            <li>쿠폰/핀 사용 금액은 적립 제외입니다</li>
            <li>앱을 종료하지 말고 이 창에서 쇼핑을 시작하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBridgeScreen;
