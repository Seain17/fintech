import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// 광고 지면 상세 데이터
const adUnitsDetailData = {
  home_banner: {
    id: 'home_banner',
    name: '홈 하단 배너',
    pixel: '320x50',
    code: 'AFIN_HOME_BN_001',
    provider: 'Google AdMob',
    providerId: 'admob',
    content: '홈 화면',
    adType: '배너',
    billingType: 'CPM',
    integrationMethod: 'SDK',
    status: 'active',
    ecpm: 5200,
    fillRate: 96,
    impressions: 45200,
    clicks: 678,
    ctr: 1.5,
    revenue: 235000,
    todayRevenue: 235000,
    monthRevenue: 7050000,
    refreshEnabled: true,
    refreshInterval: 30,
    frequencyCap: { enabled: false, limit: 0, period: '' },
    scriptCode: '<script src="https://admob.google.com/sdk/afin_home_bn_001.js"></script>',
    networks: [
      { id: 'admob', name: 'Google AdMob', logo: 'G', priority: 1, ecpm: 5200, fillRate: 98, adType: '네트워크 띠 배너', billingType: 'CPM', integrationMethod: 'SDK' },
      { id: 'cauly', name: '카울리', logo: 'C', priority: 2, ecpm: 4800, fillRate: 89, adType: '네트워크 띠 배너', billingType: 'CPM', integrationMethod: 'SDK' },
    ]
  },
  feed_native: {
    id: 'feed_native',
    name: '피드 네이티브',
    pixel: '360x200',
    code: 'AFIN_FEED_NT_001',
    provider: '카울리',
    providerId: 'cauly',
    content: '혜택탭 피드',
    adType: '네이티브',
    billingType: 'CPC',
    integrationMethod: '스크립트',
    status: 'active',
    ecpm: 8500,
    fillRate: 94,
    impressions: 52300,
    clicks: 1569,
    ctr: 3.0,
    revenue: 445000,
    todayRevenue: 445000,
    monthRevenue: 13350000,
    refreshEnabled: false,
    refreshInterval: 0,
    frequencyCap: { enabled: true, limit: 5, period: 'daily' },
    scriptCode: '<div id="cauly-native-feed"></div>\n<script src="https://ads.cauly.net/native/afin_feed.js"></script>',
    networks: [
      { id: 'cauly', name: '카울리', logo: 'C', priority: 1, ecpm: 8500, fillRate: 94, adType: '네이티브 띠 배너', billingType: 'CPC', integrationMethod: '스크립트' },
      { id: 'adgate', name: '애드게이트', logo: 'AG', priority: 2, ecpm: 7200, fillRate: 90, adType: '네이티브 띠 배너', billingType: 'CPC', integrationMethod: '스크립트' },
    ]
  },
  interstitial_tab: {
    id: 'interstitial_tab',
    name: '탭 전환 전면',
    pixel: 'Fullscreen',
    code: 'AFIN_TAB_INT_001',
    provider: 'Google AdMob',
    providerId: 'admob',
    content: '탭 전환',
    adType: '전면',
    billingType: 'CPM',
    integrationMethod: 'SDK',
    status: 'active',
    ecpm: 15800,
    fillRate: 92,
    impressions: 18500,
    clicks: 925,
    ctr: 5.0,
    revenue: 292000,
    todayRevenue: 292000,
    monthRevenue: 8760000,
    refreshEnabled: false,
    refreshInterval: 0,
    frequencyCap: { enabled: true, limit: 5, period: 'hourly' },
    scriptCode: null,
    networks: [
      { id: 'admob', name: 'Google AdMob', logo: 'G', priority: 1, ecpm: 18200, fillRate: 95, adType: 'Interstitial', billingType: 'CPM', integrationMethod: 'SDK' },
      { id: 'applovin', name: 'AppLovin', logo: 'A', priority: 2, ecpm: 15500, fillRate: 88, adType: 'Interstitial', billingType: 'CPM', integrationMethod: 'SDK' },
      { id: 'unity', name: 'Unity Ads', logo: 'U', priority: 3, ecpm: 12200, fillRate: 90, adType: '전면', billingType: 'CPM', integrationMethod: 'SDK' },
    ]
  },
  reward_mission: {
    id: 'reward_mission',
    name: '핀 적립 리워드',
    pixel: 'Fullscreen',
    code: 'AFIN_RWD_MSN_001',
    provider: '애드게이트',
    providerId: 'adgate',
    content: '혜택탭 미션',
    adType: '동영상',
    billingType: 'CPV',
    integrationMethod: 'SDK',
    status: 'active',
    ecpm: 22500,
    fillRate: 98,
    impressions: 32800,
    clicks: 31816,
    ctr: 97.0,
    revenue: 738000,
    todayRevenue: 738000,
    monthRevenue: 22140000,
    refreshEnabled: false,
    refreshInterval: 0,
    frequencyCap: { enabled: true, limit: 10, period: 'daily' },
    rewardAmount: 50,
    rewardType: '핀',
    scriptCode: null,
    networks: [
      { id: 'adgate', name: '애드게이트', logo: 'AG', priority: 1, ecpm: 22500, fillRate: 98, adType: '리워드비디오', billingType: 'CPV', integrationMethod: 'SDK' },
      { id: 'unity', name: 'Unity Ads', logo: 'U', priority: 2, ecpm: 18800, fillRate: 95, adType: '리워드비디오', billingType: 'CPV', integrationMethod: 'SDK' },
      { id: 'admob', name: 'Google AdMob', logo: 'G', priority: 3, ecpm: 15200, fillRate: 92, adType: '동영상', billingType: 'CPV', integrationMethod: 'SDK' },
    ]
  },
  reward_attendance: {
    id: 'reward_attendance',
    name: '출석체크 보너스',
    pixel: 'Fullscreen',
    code: 'AFIN_RWD_ATT_001',
    provider: '애드게이트',
    providerId: 'adgate',
    content: '출석체크',
    adType: '동영상',
    billingType: 'CPV',
    integrationMethod: 'SDK',
    status: 'active',
    ecpm: 20200,
    fillRate: 97,
    impressions: 28100,
    clicks: 27257,
    ctr: 97.0,
    revenue: 567000,
    todayRevenue: 567000,
    monthRevenue: 17010000,
    refreshEnabled: false,
    refreshInterval: 0,
    frequencyCap: { enabled: true, limit: 1, period: 'daily' },
    rewardAmount: 100,
    rewardType: '핀',
    scriptCode: null,
    networks: [
      { id: 'adgate', name: '애드게이트', logo: 'AG', priority: 1, ecpm: 20200, fillRate: 97, adType: '리워드비디오', billingType: 'CPV', integrationMethod: 'SDK' },
      { id: 'unity', name: 'Unity Ads', logo: 'U', priority: 2, ecpm: 18000, fillRate: 94, adType: '리워드비디오', billingType: 'CPV', integrationMethod: 'SDK' },
    ]
  },
  reward_walking: {
    id: 'reward_walking',
    name: '만보기 보상',
    pixel: 'Fullscreen',
    code: 'AFIN_RWD_WLK_001',
    provider: 'Unity Ads',
    providerId: 'unity',
    content: '에코만보기',
    adType: '동영상',
    billingType: 'CPV',
    integrationMethod: 'SDK',
    status: 'active',
    ecpm: 19800,
    fillRate: 96,
    impressions: 15200,
    clicks: 14744,
    ctr: 97.0,
    revenue: 301000,
    todayRevenue: 301000,
    monthRevenue: 9030000,
    refreshEnabled: false,
    refreshInterval: 0,
    frequencyCap: { enabled: true, limit: 3, period: 'daily' },
    rewardAmount: 30,
    rewardType: '핀',
    scriptCode: null,
    networks: [
      { id: 'unity', name: 'Unity Ads', logo: 'U', priority: 1, ecpm: 19800, fillRate: 96, adType: '리워드비디오', billingType: 'CPV', integrationMethod: 'SDK' },
      { id: 'adgate', name: '애드게이트', logo: 'AG', priority: 2, ecpm: 18500, fillRate: 94, adType: '리워드비디오', billingType: 'CPV', integrationMethod: 'SDK' },
    ]
  },
  splash_interstitial: {
    id: 'splash_interstitial',
    name: '스플래시 전면',
    pixel: 'Fullscreen',
    code: 'AFIN_SPL_INT_001',
    provider: 'AppLovin',
    providerId: 'applovin',
    content: '앱 실행',
    adType: '전면',
    billingType: 'CPM',
    integrationMethod: 'SDK',
    status: 'pending',
    ecpm: 0,
    fillRate: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    revenue: 0,
    todayRevenue: 0,
    monthRevenue: 0,
    refreshEnabled: false,
    refreshInterval: 0,
    frequencyCap: { enabled: true, limit: 3, period: 'daily' },
    scriptCode: null,
    networks: [
      { id: 'applovin', name: 'AppLovin', logo: 'A', priority: 1, ecpm: 0, fillRate: 0, adType: 'Interstitial', billingType: 'CPM', integrationMethod: 'SDK' },
    ]
  },
  article_native: {
    id: 'article_native',
    name: '아티클 네이티브',
    pixel: '300x250',
    code: 'AFIN_ART_NT_001',
    provider: '카울리',
    providerId: 'cauly',
    content: '금융 아티클',
    adType: '네이티브',
    billingType: 'CPC',
    integrationMethod: '스크립트',
    status: 'active',
    ecpm: 7200,
    fillRate: 91,
    impressions: 38500,
    clicks: 1155,
    ctr: 3.0,
    revenue: 277000,
    todayRevenue: 277000,
    monthRevenue: 8310000,
    refreshEnabled: false,
    refreshInterval: 0,
    frequencyCap: { enabled: true, limit: 3, period: 'daily' },
    scriptCode: '<div id="cauly-native-article"></div>\n<script src="https://ads.cauly.net/native/afin_article.js"></script>',
    networks: [
      { id: 'cauly', name: '카울리', logo: 'C', priority: 1, ecpm: 7200, fillRate: 91, adType: '네이티브 띠 배너', billingType: 'CPC', integrationMethod: '스크립트' },
    ]
  },
};

const adTypeColors = {
  '네트워크 띠 배너': { bg: '#dbeafe', color: '#1d4ed8' },
  '전면': { bg: '#fce7f3', color: '#be185d' },
  '동영상': { bg: '#dcfce7', color: '#15803d' },
  '리워드비디오': { bg: '#d1fae5', color: '#047857' },
  'Interstitial': { bg: '#ede9fe', color: '#7c3aed' },
  '네이티브 띠 배너': { bg: '#fef3c7', color: '#d97706' },
  // 기존 데이터 호환성
  '배너': { bg: '#dbeafe', color: '#1d4ed8' },
  '네이티브': { bg: '#fef3c7', color: '#d97706' },
};

// 일자별 성과 데이터 (샘플)
const dailyPerformanceData = {
  home_banner: [
    { date: '2026.03.19', impressions: 43500, clicks: 652, revenue: 222000, ecpm: 5105, fillRate: 95 },
    { date: '2026.03.20', impressions: 44800, clicks: 672, revenue: 230000, ecpm: 5134, fillRate: 96 },
    { date: '2026.03.21', impressions: 43200, clicks: 648, revenue: 218000, ecpm: 5046, fillRate: 94 },
    { date: '2026.03.22', impressions: 45500, clicks: 682, revenue: 238000, ecpm: 5231, fillRate: 97 },
    { date: '2026.03.23', impressions: 44600, clicks: 669, revenue: 232000, ecpm: 5202, fillRate: 96 },
    { date: '2026.03.24', impressions: 45000, clicks: 675, revenue: 234000, ecpm: 5200, fillRate: 96 },
    { date: '2026.03.25', impressions: 45200, clicks: 678, revenue: 235000, ecpm: 5200, fillRate: 96 },
  ],
  feed_native: [
    { date: '2026.03.19', impressions: 50500, clicks: 1515, revenue: 425000, ecpm: 8416, fillRate: 93 },
    { date: '2026.03.20', impressions: 51800, clicks: 1554, revenue: 438000, ecpm: 8456, fillRate: 94 },
    { date: '2026.03.21', impressions: 50200, clicks: 1506, revenue: 420000, ecpm: 8367, fillRate: 93 },
    { date: '2026.03.22', impressions: 53000, clicks: 1590, revenue: 452000, ecpm: 8528, fillRate: 95 },
    { date: '2026.03.23', impressions: 51500, clicks: 1545, revenue: 435000, ecpm: 8447, fillRate: 94 },
    { date: '2026.03.24', impressions: 52500, clicks: 1575, revenue: 448000, ecpm: 8533, fillRate: 94 },
    { date: '2026.03.25', impressions: 52300, clicks: 1569, revenue: 445000, ecpm: 8500, fillRate: 94 },
  ],
  interstitial_tab: [
    { date: '2026.03.19', impressions: 17800, clicks: 890, revenue: 278000, ecpm: 15618, fillRate: 91 },
    { date: '2026.03.20', impressions: 18200, clicks: 910, revenue: 288000, ecpm: 15824, fillRate: 92 },
    { date: '2026.03.21', impressions: 17500, clicks: 875, revenue: 272000, ecpm: 15543, fillRate: 90 },
    { date: '2026.03.22', impressions: 18800, clicks: 940, revenue: 298000, ecpm: 15851, fillRate: 93 },
    { date: '2026.03.23', impressions: 18000, clicks: 900, revenue: 285000, ecpm: 15833, fillRate: 92 },
    { date: '2026.03.24', impressions: 18600, clicks: 930, revenue: 294000, ecpm: 15806, fillRate: 92 },
    { date: '2026.03.25', impressions: 18500, clicks: 925, revenue: 292000, ecpm: 15784, fillRate: 92 },
  ],
  reward_mission: [
    { date: '2026.03.19', impressions: 31500, clicks: 30555, revenue: 708000, ecpm: 22476, fillRate: 97 },
    { date: '2026.03.20', impressions: 32200, clicks: 31234, revenue: 725000, ecpm: 22516, fillRate: 98 },
    { date: '2026.03.21', impressions: 31000, clicks: 30070, revenue: 695000, ecpm: 22419, fillRate: 97 },
    { date: '2026.03.22', impressions: 33500, clicks: 32495, revenue: 755000, ecpm: 22537, fillRate: 98 },
    { date: '2026.03.23', impressions: 32000, clicks: 31040, revenue: 720000, ecpm: 22500, fillRate: 98 },
    { date: '2026.03.24', impressions: 33000, clicks: 32010, revenue: 742000, ecpm: 22485, fillRate: 98 },
    { date: '2026.03.25', impressions: 32800, clicks: 31816, revenue: 738000, ecpm: 22500, fillRate: 98 },
  ],
  reward_attendance: [
    { date: '2026.03.19', impressions: 27000, clicks: 26190, revenue: 542000, ecpm: 20074, fillRate: 96 },
    { date: '2026.03.20', impressions: 27800, clicks: 26966, revenue: 558000, ecpm: 20072, fillRate: 97 },
    { date: '2026.03.21', impressions: 26500, clicks: 25705, revenue: 532000, ecpm: 20075, fillRate: 96 },
    { date: '2026.03.22', impressions: 28500, clicks: 27645, revenue: 575000, ecpm: 20175, fillRate: 97 },
    { date: '2026.03.23', impressions: 27500, clicks: 26675, revenue: 555000, ecpm: 20182, fillRate: 97 },
    { date: '2026.03.24', impressions: 28200, clicks: 27354, revenue: 570000, ecpm: 20213, fillRate: 97 },
    { date: '2026.03.25', impressions: 28100, clicks: 27257, revenue: 567000, ecpm: 20178, fillRate: 97 },
  ],
  reward_walking: [
    { date: '2026.03.19', impressions: 14500, clicks: 14065, revenue: 285000, ecpm: 19655, fillRate: 95 },
    { date: '2026.03.20', impressions: 15000, clicks: 14550, revenue: 296000, ecpm: 19733, fillRate: 96 },
    { date: '2026.03.21', impressions: 14200, clicks: 13774, revenue: 278000, ecpm: 19577, fillRate: 95 },
    { date: '2026.03.22', impressions: 15500, clicks: 15035, revenue: 308000, ecpm: 19871, fillRate: 97 },
    { date: '2026.03.23', impressions: 14800, clicks: 14356, revenue: 292000, ecpm: 19730, fillRate: 96 },
    { date: '2026.03.24', impressions: 15300, clicks: 14841, revenue: 304000, ecpm: 19869, fillRate: 96 },
    { date: '2026.03.25', impressions: 15200, clicks: 14744, revenue: 301000, ecpm: 19803, fillRate: 96 },
  ],
  splash_interstitial: [
    { date: '2026.03.19', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.20', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.21', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.22', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.23', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.24', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.25', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
  ],
  article_native: [
    { date: '2026.03.19', impressions: 37000, clicks: 1110, revenue: 265000, ecpm: 7162, fillRate: 90 },
    { date: '2026.03.20', impressions: 38000, clicks: 1140, revenue: 274000, ecpm: 7211, fillRate: 91 },
    { date: '2026.03.21', impressions: 36500, clicks: 1095, revenue: 260000, ecpm: 7123, fillRate: 90 },
    { date: '2026.03.22', impressions: 39000, clicks: 1170, revenue: 282000, ecpm: 7231, fillRate: 92 },
    { date: '2026.03.23', impressions: 37800, clicks: 1134, revenue: 272000, ecpm: 7196, fillRate: 91 },
    { date: '2026.03.24', impressions: 38800, clicks: 1164, revenue: 280000, ecpm: 7216, fillRate: 91 },
    { date: '2026.03.25', impressions: 38500, clicks: 1155, revenue: 277000, ecpm: 7195, fillRate: 91 },
  ],
};

const billingTypeColors = {
  'CPM': { bg: '#e0e7ff', color: '#4338ca' },
  'CPC': { bg: '#ccfbf1', color: '#0d9488' },
  'CPV': { bg: '#fae8ff', color: '#a21caf' },
};

// 추가 가능한 네트워크 목록
const availableNetworks = [
  { id: 'admob', name: 'Google AdMob', logo: 'G' },
  { id: 'adgate', name: '애드게이트', logo: 'AG' },
  { id: 'cauly', name: '카울리', logo: 'C' },
  { id: 'unity', name: 'Unity Ads', logo: 'U' },
  { id: 'applovin', name: 'AppLovin', logo: 'A' },
  { id: 'meta', name: 'Meta Audience', logo: 'M' },
  { id: 'ironsource', name: 'ironSource', logo: 'IS' },
  { id: 'vungle', name: 'Vungle', logo: 'V' },
];

// 네트워크 추가 모달
function AddWaterfallNetworkModal({ isOpen, onClose, onSubmit, existingNetworkIds }) {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [formData, setFormData] = useState({
    adType: '네트워크 띠 배너',
    billingType: 'CPM',
    integrationMethod: 'SDK',
  });

  const filteredNetworks = availableNetworks.filter(
    net => !existingNetworkIds.includes(net.id)
  );

  const handleSubmit = () => {
    if (!selectedNetwork) {
      alert('네트워크를 선택해주세요.');
      return;
    }
    onSubmit({
      ...selectedNetwork,
      ...formData,
      ecpm: 0,
      fillRate: 0,
    });
    setSelectedNetwork(null);
    setFormData({
      adType: '네트워크 띠 배너',
      billingType: 'CPM',
      integrationMethod: 'SDK',
    });
    onClose();
  };

  const handleClose = () => {
    setSelectedNetwork(null);
    setFormData({
      adType: '네트워크 띠 배너',
      billingType: 'CPM',
      integrationMethod: 'SDK',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="admed-modal-overlay" onClick={handleClose}>
      <div className="admed-modal" onClick={e => e.stopPropagation()}>
        <div className="admed-modal-header">
          <h3 className="admed-modal-title">
            <span className="admed-modal-title-icon">➕</span>
            워터폴에 네트워크 추가
          </h3>
          <button className="admed-modal-close" onClick={handleClose}>✕</button>
        </div>
        <div className="admed-modal-body">
          <div className="admed-form-group">
            <label className="admed-form-label">네트워크 선택 *</label>
            {filteredNetworks.length > 0 ? (
              <div className="admed-network-select-grid">
                {filteredNetworks.map(network => (
                  <div
                    key={network.id}
                    className={`admed-network-select-item ${selectedNetwork?.id === network.id ? 'selected' : ''}`}
                    onClick={() => setSelectedNetwork(network)}
                  >
                    <div className={`admed-network-logo ${network.id}`}>{network.logo}</div>
                    <div className="admed-network-select-info">
                      <div className="admed-network-select-name">{network.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#64748b', fontSize: 14 }}>
                모든 네트워크가 이미 추가되어 있습니다.
              </p>
            )}
          </div>

          {selectedNetwork && (
            <>
              <div className="admed-form-group">
                <label className="admed-form-label">광고 유형</label>
                <select
                  className="admed-form-select"
                  value={formData.adType}
                  onChange={(e) => setFormData({ ...formData, adType: e.target.value })}
                >
                  <option value="네트워크 띠 배너">네트워크 띠 배너</option>
                  <option value="네이티브 띠 배너">네이티브 띠 배너</option>
                  <option value="전면">전면</option>
                  <option value="동영상">동영상</option>
                  <option value="리워드비디오">리워드비디오(30초)</option>
                  <option value="Interstitial">Interstitial(15초)</option>
                </select>
              </div>
              <div className="admed-form-row">
                <div className="admed-form-group">
                  <label className="admed-form-label">과금 기준</label>
                  <select
                    className="admed-form-select"
                    value={formData.billingType}
                    onChange={(e) => setFormData({ ...formData, billingType: e.target.value })}
                  >
                    <option value="CPM">CPM</option>
                    <option value="CPC">CPC</option>
                    <option value="CPV">CPV</option>
                    <option value="CPA">CPA</option>
                  </select>
                </div>
                <div className="admed-form-group">
                  <label className="admed-form-label">연동 방식</label>
                  <select
                    className="admed-form-select"
                    value={formData.integrationMethod}
                    onChange={(e) => setFormData({ ...formData, integrationMethod: e.target.value })}
                  >
                    <option value="SDK">SDK</option>
                    <option value="스크립트">스크립트</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="admed-modal-footer">
          <button className="admed-btn admed-btn-secondary" onClick={handleClose}>
            취소
          </button>
          <button
            className="admed-btn admed-btn-primary"
            onClick={handleSubmit}
            disabled={!selectedNetwork || filteredNetworks.length === 0}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

function AdUnitDetail() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const unit = adUnitsDetailData[unitId];
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [frequencyCapEnabled, setFrequencyCapEnabled] = useState(unit?.frequencyCap?.enabled || false);
  const [dateRange, setDateRange] = useState('7d');

  // 선택한 기간에 따른 데이터 계산
  const dailyData = dailyPerformanceData[unitId] || [];
  const filteredData = dateRange === '7d' ? dailyData : dailyData.slice(-3);

  const periodStats = filteredData.reduce((acc, day) => ({
    impressions: acc.impressions + day.impressions,
    clicks: acc.clicks + day.clicks,
    revenue: acc.revenue + day.revenue,
  }), { impressions: 0, clicks: 0, revenue: 0 });

  const avgEcpm = filteredData.length > 0
    ? Math.round(filteredData.reduce((sum, d) => sum + d.ecpm, 0) / filteredData.length)
    : 0;
  const avgFillRate = filteredData.length > 0
    ? Math.round(filteredData.reduce((sum, d) => sum + d.fillRate, 0) / filteredData.length)
    : 0;
  const avgCtr = periodStats.impressions > 0
    ? ((periodStats.clicks / periodStats.impressions) * 100).toFixed(1)
    : 0;

  // 기본정보 편집 상태
  const [editBasicData, setEditBasicData] = useState({
    name: unit?.name || '',
    pixel: unit?.pixel || '',
    content: unit?.content || '',
  });

  // 워터폴 관리 상태
  const [waterfallNetworks, setWaterfallNetworks] = useState(unit?.networks || []);
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [showAddNetworkModal, setShowAddNetworkModal] = useState(false);

  // 네트워크 순서 위로 이동
  const moveNetworkUp = (index) => {
    if (index === 0) return;
    const newNetworks = [...waterfallNetworks];
    [newNetworks[index - 1], newNetworks[index]] = [newNetworks[index], newNetworks[index - 1]];
    // priority 재정렬
    newNetworks.forEach((net, idx) => {
      net.priority = idx + 1;
    });
    setWaterfallNetworks(newNetworks);
  };

  // 네트워크 순서 아래로 이동
  const moveNetworkDown = (index) => {
    if (index === waterfallNetworks.length - 1) return;
    const newNetworks = [...waterfallNetworks];
    [newNetworks[index], newNetworks[index + 1]] = [newNetworks[index + 1], newNetworks[index]];
    // priority 재정렬
    newNetworks.forEach((net, idx) => {
      net.priority = idx + 1;
    });
    setWaterfallNetworks(newNetworks);
  };

  // 네트워크 삭제
  const removeNetwork = (networkId) => {
    if (window.confirm('이 네트워크를 워터폴에서 제거하시겠습니까?')) {
      const newNetworks = waterfallNetworks.filter(net => net.id !== networkId);
      // priority 재정렬
      newNetworks.forEach((net, idx) => {
        net.priority = idx + 1;
      });
      setWaterfallNetworks(newNetworks);
      alert('네트워크가 제거되었습니다.');
    }
  };

  // 네트워크 추가
  const addNetwork = (networkData) => {
    const newNetwork = {
      ...networkData,
      priority: waterfallNetworks.length + 1,
    };
    setWaterfallNetworks([...waterfallNetworks, newNetwork]);
    alert(`${networkData.name}이(가) 워터폴에 추가되었습니다.`);
  };

  // 순서 편집 저장
  const saveOrder = () => {
    setIsEditingOrder(false);
    alert('워터폴 순서가 저장되었습니다.');
  };

  // 순서 편집 취소
  const cancelEditOrder = () => {
    setWaterfallNetworks(unit?.networks || []);
    setIsEditingOrder(false);
  };

  if (!unit) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h3 style={{ margin: '0 0 8px', color: '#1a1a1a' }}>광고 지면을 찾을 수 없습니다</h3>
        <p style={{ color: '#64748b', marginBottom: 24 }}>요청하신 광고 지면이 존재하지 않습니다.</p>
        <button
          className="admed-btn admed-btn-primary"
          onClick={() => navigate('/admin/admediation/units')}
        >
          지면 목록으로
        </button>
      </div>
    );
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num) => {
    return '₩' + num.toLocaleString();
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        alert('복사되었습니다.');
      });
    } else {
      // fallback for HTTP
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('복사되었습니다.');
      } catch (err) {
        alert('복사에 실패했습니다.');
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div>
      {/* 상세 페이지 헤더 */}
      <div className="admed-detail-header">
        <Link to="/admin/admediation/units" className="admed-detail-back">←</Link>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>{unit.name}</h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <code style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>
              {unit.code}
            </code>
            <span style={{ color: '#94a3b8' }}>·</span>
            <span style={{ fontSize: 13, color: '#64748b' }}>{unit.pixel}</span>
            <span style={{ color: '#94a3b8' }}>·</span>
            <span style={{ fontSize: 13, color: '#64748b' }}>{unit.content}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className={`admed-status ${unit.status}`}>
            <span className="admed-status-dot"></span>
            {unit.status === 'active' ? '활성' : '대기'}
          </span>
        </div>
      </div>

      {/* 기간 선택 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <div className="admed-chart-filter">
          <button
            className={`admed-filter-btn ${dateRange === '3d' ? 'active' : ''}`}
            onClick={() => setDateRange('3d')}
          >최근 3일</button>
          <button
            className={`admed-filter-btn ${dateRange === '7d' ? 'active' : ''}`}
            onClick={() => setDateRange('7d')}
          >최근 7일</button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="admed-stats-grid">
        <div className="admed-stat-card highlight">
          <div className="admed-stat-header">
            <span className="admed-stat-label">기간 수익</span>
            <div className="admed-stat-icon">💵</div>
          </div>
          <div className="admed-stat-value">{formatCurrency(periodStats.revenue)}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>{dateRange === '7d' ? '최근 7일' : '최근 3일'}</div>
        </div>
        <div className="admed-stat-card">
          <div className="admed-stat-header">
            <span className="admed-stat-label">평균 eCPM</span>
            <div className="admed-stat-icon blue">📈</div>
          </div>
          <div className="admed-stat-value">{avgEcpm > 0 ? formatCurrency(avgEcpm) : '—'}</div>
        </div>
        <div className="admed-stat-card">
          <div className="admed-stat-header">
            <span className="admed-stat-label">평균 Fill Rate</span>
            <div className="admed-stat-icon green">📊</div>
          </div>
          <div className="admed-stat-value">{avgFillRate > 0 ? `${avgFillRate}%` : '—'}</div>
        </div>
        <div className="admed-stat-card">
          <div className="admed-stat-header">
            <span className="admed-stat-label">총 노출수</span>
            <div className="admed-stat-icon purple">👁️</div>
          </div>
          <div className="admed-stat-value">{formatNumber(periodStats.impressions)}</div>
        </div>
      </div>

      {/* 탭 */}
      <div className="admed-tabs" style={{ margin: '0 0 24px' }}>
        <button
          className={`admed-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className="admed-tab-icon">📋</span>
          지면 정보
        </button>
        <button
          className={`admed-tab ${activeTab === 'waterfall' ? 'active' : ''}`}
          onClick={() => setActiveTab('waterfall')}
        >
          <span className="admed-tab-icon">📊</span>
          워터폴 ({waterfallNetworks.length})
        </button>
        <button
          className={`admed-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <span className="admed-tab-icon">⚙️</span>
          설정
        </button>
      </div>

      {/* 지면 정보 탭 */}
      {activeTab === 'overview' && (
        <div className="admed-settings-grid">
          <div className="admed-settings-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 className="admed-settings-card-title" style={{ margin: 0 }}>
                <span className="admed-settings-card-title-icon">📋</span>
                기본 정보
              </h3>
              {!isEditingBasic && (
                <button
                  className="admed-action-btn"
                  onClick={() => {
                    setEditBasicData({ name: unit.name, pixel: unit.pixel, content: unit.content });
                    setIsEditingBasic(true);
                  }}
                  title="편집"
                >
                  ✏️
                </button>
              )}
            </div>
            {isEditingBasic ? (
              <>
                <div className="admed-form-group">
                  <label className="admed-form-label">지면명</label>
                  <input
                    type="text"
                    className="admed-form-input"
                    value={editBasicData.name}
                    onChange={(e) => setEditBasicData({ ...editBasicData, name: e.target.value })}
                  />
                </div>
                <div className="admed-form-group">
                  <label className="admed-form-label">픽셀 (사이즈)</label>
                  <input
                    type="text"
                    className="admed-form-input"
                    value={editBasicData.pixel}
                    onChange={(e) => setEditBasicData({ ...editBasicData, pixel: e.target.value })}
                  />
                </div>
                <div className="admed-form-group">
                  <label className="admed-form-label">지면 콘텐츠</label>
                  <input
                    type="text"
                    className="admed-form-input"
                    value={editBasicData.content}
                    onChange={(e) => setEditBasicData({ ...editBasicData, content: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button
                    className="admed-btn admed-btn-primary admed-btn-sm"
                    onClick={() => {
                      alert('기본 정보가 저장되었습니다.');
                      setIsEditingBasic(false);
                    }}
                  >
                    저장
                  </button>
                  <button
                    className="admed-btn admed-btn-secondary admed-btn-sm"
                    onClick={() => setIsEditingBasic(false)}
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="admed-toggle-row">
                  <div className="admed-toggle-info">
                    <h5>지면명</h5>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{unit.name}</span>
                </div>
                <div className="admed-toggle-row">
                  <div className="admed-toggle-info">
                    <h5>지면코드</h5>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <code style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, fontSize: 13 }}>
                      {unit.code}
                    </code>
                    <button
                      className="admed-action-btn"
                      onClick={() => copyToClipboard(unit.code)}
                      title="복사"
                    >
                      📋
                    </button>
                  </div>
                </div>
                <div className="admed-toggle-row">
                  <div className="admed-toggle-info">
                    <h5>픽셀 (사이즈)</h5>
                  </div>
                  <span style={{ fontSize: 14, color: '#374151' }}>{unit.pixel}</span>
                </div>
                <div className="admed-toggle-row">
                  <div className="admed-toggle-info">
                    <h5>지면 콘텐츠</h5>
                  </div>
                  <span style={{ fontSize: 14, color: '#374151' }}>{unit.content}</span>
                </div>
              </>
            )}
          </div>

          <div className="admed-settings-card">
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">💰</span>
              과금 정보 요약
            </h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
              각 네트워크별 과금 정보는 워터폴 탭에서 확인할 수 있습니다.
            </p>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>연결된 네트워크</h5>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1a2e71' }}>
                {waterfallNetworks.length}개
              </span>
            </div>
            {unit.adType === '동영상' && unit.rewardAmount && (
              <div className="admed-toggle-row">
                <div className="admed-toggle-info">
                  <h5>보상</h5>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1a2e71' }}>
                  {unit.rewardAmount} {unit.rewardType}
                </span>
              </div>
            )}
          </div>

          <div className="admed-settings-card">
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">📊</span>
              요약 정보
            </h3>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>이번 달 누적 수익</h5>
              </div>
              <span style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: 700, color: '#1a2e71' }}>
                {formatCurrency(unit.monthRevenue)}
              </span>
            </div>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>평균 CTR</h5>
              </div>
              <span style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: 700, color: '#1a2e71' }}>
                {avgCtr > 0 ? `${avgCtr}%` : '—'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 일자별 성과 테이블 - 지면 정보 탭 */}
      {activeTab === 'overview' && (
        <div className="admed-table-card" style={{ marginTop: 24 }}>
          <div className="admed-table-header">
            <h3 className="admed-table-title">일자별 성과</h3>
            <span style={{ fontSize: 12, color: '#64748b' }}>
              * SSP 정산 규칙에 따라 D+2 또는 주간 단위로 데이터가 반영됩니다
            </span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="admed-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>노출수</th>
                  <th>클릭수</th>
                  <th>eCPM</th>
                  <th>Fill Rate</th>
                  <th>수익</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice().reverse().map((day) => (
                  <tr key={day.date}>
                    <td style={{ fontWeight: 500 }}>{day.date}</td>
                    <td>{formatNumber(day.impressions)}</td>
                    <td>{formatNumber(day.clicks)}</td>
                    <td>
                      <span className="admed-ecpm-value">
                        {day.ecpm > 0 ? formatCurrency(day.ecpm) : '—'}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        background: day.fillRate >= 95 ? '#dcfce7' : day.fillRate >= 85 ? '#fef9c3' : '#fee2e2',
                        color: day.fillRate >= 95 ? '#166534' : day.fillRate >= 85 ? '#854d0e' : '#dc2626',
                      }}>
                        {day.fillRate > 0 ? `${day.fillRate}%` : '—'}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'Outfit', fontWeight: 600, color: '#1a2e71' }}>
                      {day.revenue > 0 ? formatCurrency(day.revenue) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f8fafc', fontWeight: 600 }}>
                  <td>합계</td>
                  <td>{formatNumber(periodStats.impressions)}</td>
                  <td>{formatNumber(periodStats.clicks)}</td>
                  <td>
                    <span className="admed-ecpm-value">{formatCurrency(avgEcpm)}</span>
                    <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 4 }}>(평균)</span>
                  </td>
                  <td>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
                      {avgFillRate}%
                    </span>
                    <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 4 }}>(평균)</span>
                  </td>
                  <td style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1a2e71' }}>
                    {formatCurrency(periodStats.revenue)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* 워터폴 탭 */}
      {activeTab === 'waterfall' && (
        <div className="admed-waterfall-card" style={{ marginBottom: 24 }}>
          <div className="admed-waterfall-header">
            <h4 className="admed-waterfall-title">
              <span className="admed-waterfall-title-icon">📊</span>
              워터폴 설정
              {isEditingOrder && (
                <span style={{ fontSize: 12, color: '#f59e0b', marginLeft: 8, fontWeight: 500 }}>
                  (편집 중)
                </span>
              )}
            </h4>
            <div style={{ display: 'flex', gap: 8 }}>
              {isEditingOrder ? (
                <>
                  <button
                    className="admed-btn admed-btn-primary admed-btn-sm"
                    onClick={saveOrder}
                  >
                    저장
                  </button>
                  <button
                    className="admed-btn admed-btn-secondary admed-btn-sm"
                    onClick={cancelEditOrder}
                  >
                    취소
                  </button>
                </>
              ) : (
                <button
                  className="admed-btn admed-btn-secondary admed-btn-sm"
                  onClick={() => setIsEditingOrder(true)}
                >
                  순서 편집
                </button>
              )}
            </div>
          </div>
          <div className="admed-waterfall-list">
            {waterfallNetworks.length > 0 ? (
              waterfallNetworks.map((network, index) => (
                <div
                  key={network.id}
                  className="admed-waterfall-item"
                  style={{ cursor: isEditingOrder ? 'default' : 'pointer' }}
                  onClick={() => !isEditingOrder && navigate(`/admin/admediation/networks/${network.id}`)}
                >
                  {isEditingOrder ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <button
                        className="admed-action-btn"
                        style={{ width: 24, height: 20, fontSize: 10, padding: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveNetworkUp(index);
                        }}
                        disabled={index === 0}
                        title="위로 이동"
                      >
                        ▲
                      </button>
                      <button
                        className="admed-action-btn"
                        style={{ width: 24, height: 20, fontSize: 10, padding: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveNetworkDown(index);
                        }}
                        disabled={index === waterfallNetworks.length - 1}
                        title="아래로 이동"
                      >
                        ▼
                      </button>
                    </div>
                  ) : (
                    <span className="admed-waterfall-drag">⋮⋮</span>
                  )}
                  <span className="admed-waterfall-rank">{network.priority}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    <div className={`admed-network-logo ${network.id}`} style={{ width: 32, height: 32, fontSize: 12 }}>
                      {network.logo}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: 13 }}>{network.name}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>Fill Rate: {network.fillRate}%</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: 8,
                        fontSize: 10,
                        fontWeight: 600,
                        background: adTypeColors[network.adType]?.bg || '#f1f5f9',
                        color: adTypeColors[network.adType]?.color || '#475569',
                      }}
                    >
                      {network.adType}
                    </span>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: 8,
                        fontSize: 10,
                        fontWeight: 600,
                        background: billingTypeColors[network.billingType]?.bg || '#f1f5f9',
                        color: billingTypeColors[network.billingType]?.color || '#475569',
                      }}
                    >
                      {network.billingType}
                    </span>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: 8,
                        fontSize: 10,
                        fontWeight: 600,
                        background: network.integrationMethod === 'SDK' ? '#f0fdf4' : '#fefce8',
                        color: network.integrationMethod === 'SDK' ? '#166534' : '#a16207',
                      }}
                    >
                      {network.integrationMethod}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: 80 }}>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>eCPM</div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#1a2e71' }}>
                      {network.ecpm > 0 ? formatCurrency(network.ecpm) : '—'}
                    </div>
                  </div>
                  {isEditingOrder ? (
                    <button
                      className="admed-action-btn"
                      style={{ marginLeft: 12, background: '#fee2e2', color: '#dc2626' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNetwork(network.id);
                      }}
                      title="삭제"
                    >
                      🗑️
                    </button>
                  ) : (
                    <span className={`admed-status ${network.ecpm > 0 ? 'active' : 'pending'}`} style={{ marginLeft: 12 }}>
                      <span className="admed-status-dot"></span>
                      {network.ecpm > 0 ? '활성' : '대기'}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: 32, color: '#94a3b8' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📦</div>
                <p>연결된 네트워크가 없습니다.</p>
                <p style={{ fontSize: 13 }}>네트워크를 추가하여 워터폴을 구성하세요.</p>
              </div>
            )}
          </div>
          <button
            className="admed-btn admed-btn-secondary admed-btn-sm"
            style={{ marginTop: 16 }}
            onClick={() => setShowAddNetworkModal(true)}
          >
            <span>➕</span> 네트워크 추가
          </button>
        </div>
      )}

      {/* 네트워크 추가 모달 */}
      <AddWaterfallNetworkModal
        isOpen={showAddNetworkModal}
        onClose={() => setShowAddNetworkModal(false)}
        onSubmit={addNetwork}
        existingNetworkIds={waterfallNetworks.map(n => n.id)}
      />

      {/* 설정 탭 */}
      {activeTab === 'settings' && (
        <div className="admed-settings-grid">
          <div className="admed-settings-card">
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">📋</span>
              기본 설정
            </h3>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>지면명</h5>
              </div>
              <span style={{ fontSize: 14, color: '#374151' }}>{unit.name}</span>
            </div>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>지면 콘텐츠</h5>
              </div>
              <span style={{ fontSize: 14, color: '#374151' }}>{unit.content}</span>
            </div>
            <p style={{ marginTop: 16, fontSize: 12, color: '#94a3b8' }}>
              기본 정보 및 과금 정보는 "지면 정보" 탭에서 편집할 수 있습니다.
            </p>
          </div>

          <div className="admed-settings-card">
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">⚡</span>
              Frequency Cap
            </h3>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>Frequency Cap 사용</h5>
                <p>사용자별 노출 횟수 제한</p>
              </div>
              <div
                className={`admed-toggle-switch ${frequencyCapEnabled ? 'active' : ''}`}
                onClick={() => setFrequencyCapEnabled(!frequencyCapEnabled)}
              />
            </div>
            {frequencyCapEnabled && (
              <div className="admed-form-row" style={{ marginTop: 16 }}>
                <div className="admed-form-group">
                  <label className="admed-form-label">제한 횟수</label>
                  <input
                    type="number"
                    className="admed-form-input"
                    defaultValue={unit.frequencyCap.limit || 5}
                  />
                </div>
                <div className="admed-form-group">
                  <label className="admed-form-label">기간</label>
                  <select
                    className="admed-form-input"
                    defaultValue={unit.frequencyCap.period || 'daily'}
                  >
                    <option value="hourly">시간당</option>
                    <option value="daily">일간</option>
                    <option value="weekly">주간</option>
                  </select>
                </div>
              </div>
            )}

            {unit.adType === '배너' && (
              <>
                <div className="admed-toggle-row" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
                  <div className="admed-toggle-info">
                    <h5>자동 새로고침</h5>
                    <p>일정 시간마다 배너 새로고침</p>
                  </div>
                  <div className={`admed-toggle-switch ${unit.refreshEnabled ? 'active' : ''}`} />
                </div>
                {unit.refreshEnabled && (
                  <div className="admed-form-group" style={{ marginTop: 12 }}>
                    <label className="admed-form-label">새로고침 간격 (초)</label>
                    <input
                      type="number"
                      className="admed-form-input"
                      defaultValue={unit.refreshInterval}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* 위험 영역 */}
          <div className="admed-settings-card" style={{ gridColumn: '1 / -1' }}>
            <h3 className="admed-settings-card-title" style={{ color: '#dc2626' }}>
              <span className="admed-settings-card-title-icon">⚠️</span>
              위험 영역
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: '#374151' }}>지면 비활성화</h5>
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>이 지면을 비활성화하면 광고가 노출되지 않습니다.</p>
              </div>
              <button
                className="admed-btn"
                style={{ background: '#fef3c7', color: '#d97706' }}
              >
                비활성화
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
              <div>
                <h5 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: '#374151' }}>지면 삭제</h5>
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>이 지면을 삭제하면 관련 데이터가 모두 삭제됩니다.</p>
              </div>
              <button
                className="admed-btn"
                style={{ background: '#fee2e2', color: '#dc2626' }}
                onClick={() => {
                  if (window.confirm('정말로 이 지면을 삭제하시겠습니까?')) {
                    alert('삭제되었습니다.');
                    navigate('/admin/admediation/units');
                  }
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdUnitDetail;
