import React, { useState } from 'react';

const waterfallData = {
  banner: {
    title: '배너 광고',
    icon: '🖼️',
    enabled: true,
    items: [
      { rank: 1, network: 'Google AdMob', ecpm: 12500 },
      { rank: 2, network: '카울리', ecpm: 6800 },
      { rank: 3, network: '애드게이트', ecpm: 5200 },
    ]
  },
  interstitial: {
    title: '전면 광고',
    icon: '📱',
    enabled: true,
    items: [
      { rank: 1, network: 'Google AdMob', ecpm: 18200 },
      { rank: 2, network: 'AppLovin', ecpm: 15500 },
      { rank: 3, network: '카울리', ecpm: 9800 },
      { rank: 4, network: 'Unity Ads', ecpm: 7200 },
    ]
  },
  rewarded: {
    title: '리워드 광고',
    icon: '🎁',
    enabled: true,
    items: [
      { rank: 1, network: '애드게이트', ecpm: 22500 },
      { rank: 2, network: 'Unity Ads', ecpm: 18800 },
      { rank: 3, network: 'Google AdMob', ecpm: 15200 },
      { rank: 4, network: 'AppLovin', ecpm: 12000 },
    ]
  }
};

const optimizationSettings = [
  { key: 'autoSort', title: '자동 eCPM 정렬', desc: '실시간 eCPM 기반으로 워터폴 순서 자동 조정', enabled: true },
  { key: 'fillFallback', title: 'Fill Rate 기반 Fallback', desc: 'Fill Rate가 낮은 네트워크 자동 스킵', enabled: true },
  { key: 'abTest', title: 'A/B 테스트 모드', desc: '워터폴 순서 랜덤화로 최적 조합 탐색', enabled: false },
  { key: 'healthMonitor', title: '네트워크 건강도 모니터링', desc: '응답 지연/에러율 높은 네트워크 자동 비활성화', enabled: true },
];

function Waterfall() {
  const [waterfall, setWaterfall] = useState(waterfallData);
  const [settings, setSettings] = useState(optimizationSettings);

  const formatCurrency = (num) => {
    return '₩' + num.toLocaleString();
  };

  const toggleWaterfall = (key) => {
    setWaterfall(prev => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled }
    }));
  };

  const toggleSetting = (key) => {
    setSettings(prev => prev.map(s =>
      s.key === key ? { ...s, enabled: !s.enabled } : s
    ));
  };

  return (
    <div>
      {/* 워터폴 카드 그리드 */}
      <div className="admed-waterfall-section">
        {Object.entries(waterfall).map(([key, data]) => (
          <div key={key} className="admed-waterfall-card">
            <div className="admed-waterfall-header">
              <h4 className="admed-waterfall-title">
                <span className="admed-waterfall-title-icon">{data.icon}</span>
                {data.title}
              </h4>
              <div
                className={`admed-waterfall-toggle ${data.enabled ? 'active' : ''}`}
                onClick={() => toggleWaterfall(key)}
              />
            </div>
            <div className="admed-waterfall-list">
              {data.items.map((item) => (
                <div key={item.rank} className="admed-waterfall-item">
                  <span className="admed-waterfall-drag">⋮⋮</span>
                  <span className="admed-waterfall-rank">{item.rank}</span>
                  <span className="admed-waterfall-network">{item.network}</span>
                  <span className="admed-waterfall-ecpm">{formatCurrency(item.ecpm)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 최적화 설정 */}
      <div className="admed-table-card">
        <div className="admed-table-header">
          <h3 className="admed-table-title">워터폴 최적화 설정</h3>
        </div>
        <div className="admed-settings-grid">
          <div>
            {settings.slice(0, 2).map((setting) => (
              <div key={setting.key} className="admed-toggle-row">
                <div className="admed-toggle-info">
                  <h5>{setting.title}</h5>
                  <p>{setting.desc}</p>
                </div>
                <div
                  className={`admed-toggle-switch ${setting.enabled ? 'active' : ''}`}
                  onClick={() => toggleSetting(setting.key)}
                />
              </div>
            ))}
          </div>
          <div>
            {settings.slice(2).map((setting) => (
              <div key={setting.key} className="admed-toggle-row">
                <div className="admed-toggle-info">
                  <h5>{setting.title}</h5>
                  <p>{setting.desc}</p>
                </div>
                <div
                  className={`admed-toggle-switch ${setting.enabled ? 'active' : ''}`}
                  onClick={() => toggleSetting(setting.key)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Waterfall;
