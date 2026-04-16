// 광고 미디에이션 목업 데이터

export const networkData = [
  {
    id: 'admob',
    name: 'Google AdMob',
    logo: '🔵',
    status: 'active',
    ecpm: 2850,
    fillRate: 94.2,
    impressions: 1250000,
    revenue: 3562500,
    appId: 'ca-app-pub-xxxxxxxx~yyyyyyyy',
    adUnits: ['banner_home', 'interstitial', 'reward'],
    priority: 1,
    lastSync: '2024-01-15 14:30:22',
    description: '구글 모바일 광고 네트워크',
    settings: {
      testMode: false,
      bidding: true,
      refreshRate: 30,
    }
  },
  {
    id: 'adgate',
    name: '애드게이트',
    logo: '🟢',
    status: 'active',
    ecpm: 2200,
    fillRate: 88.5,
    impressions: 850000,
    revenue: 1870000,
    appId: 'AG_xxxxxxxx',
    adUnits: ['reward', 'native_feed'],
    priority: 2,
    lastSync: '2024-01-15 14:28:15',
    description: 'CPI/CPA 기반 국내 광고 네트워크',
    settings: {
      testMode: false,
      bidding: false,
      refreshRate: 60,
    }
  },
  {
    id: 'cauly',
    name: '카울리',
    logo: '🟡',
    status: 'active',
    ecpm: 1950,
    fillRate: 82.3,
    impressions: 720000,
    revenue: 1404000,
    appId: 'CAULY_xxxxxxxx',
    adUnits: ['banner_home', 'banner_benefits', 'native_feed'],
    priority: 3,
    lastSync: '2024-01-15 14:25:00',
    description: '국내 대표 모바일 광고 플랫폼',
    settings: {
      testMode: false,
      bidding: false,
      refreshRate: 45,
    }
  },
  {
    id: 'unity',
    name: 'Unity Ads',
    logo: '⚪',
    status: 'active',
    ecpm: 3200,
    fillRate: 76.8,
    impressions: 420000,
    revenue: 1344000,
    appId: 'unity_game_id_xxxx',
    adUnits: ['reward', 'interstitial'],
    priority: 4,
    lastSync: '2024-01-15 14:20:00',
    description: '게임 특화 리워드 광고 네트워크',
    settings: {
      testMode: false,
      bidding: true,
      refreshRate: 0,
    }
  },
  {
    id: 'applovin',
    name: 'AppLovin MAX',
    logo: '🟠',
    status: 'inactive',
    ecpm: 2650,
    fillRate: 0,
    impressions: 0,
    revenue: 0,
    appId: '',
    adUnits: [],
    priority: 5,
    lastSync: '-',
    description: '글로벌 광고 미디에이션 플랫폼',
    settings: {
      testMode: true,
      bidding: true,
      refreshRate: 30,
    }
  },
  {
    id: 'meta',
    name: 'Meta Audience Network',
    logo: '🔷',
    status: 'pending',
    ecpm: 0,
    fillRate: 0,
    impressions: 0,
    revenue: 0,
    appId: '',
    adUnits: [],
    priority: 6,
    lastSync: '-',
    description: 'Facebook/Instagram 광고 네트워크',
    settings: {
      testMode: true,
      bidding: false,
      refreshRate: 30,
    }
  }
];

export const adUnitData = [
  {
    id: 'banner_home',
    name: '홈 배너',
    type: 'banner',
    placement: '홈 화면 상단',
    status: 'active',
    size: '320x50',
    networks: ['admob', 'cauly'],
    impressions: 1850000,
    clicks: 28500,
    ctr: 1.54,
    revenue: 2775000,
    ecpm: 1500,
    settings: {
      refreshEnabled: true,
      refreshInterval: 30,
      frequencyCap: { enabled: false, limit: 0, period: '' },
    }
  },
  {
    id: 'banner_benefits',
    name: '혜택 배너',
    type: 'banner',
    placement: '혜택 탭 하단',
    status: 'active',
    size: '320x100',
    networks: ['cauly'],
    impressions: 920000,
    clicks: 12100,
    ctr: 1.32,
    revenue: 1104000,
    ecpm: 1200,
    settings: {
      refreshEnabled: true,
      refreshInterval: 45,
      frequencyCap: { enabled: false, limit: 0, period: '' },
    }
  },
  {
    id: 'interstitial',
    name: '전면광고',
    type: 'interstitial',
    placement: '화면 전환 시',
    status: 'active',
    size: 'fullscreen',
    networks: ['admob', 'unity'],
    impressions: 185000,
    clicks: 9250,
    ctr: 5.0,
    revenue: 925000,
    ecpm: 5000,
    settings: {
      refreshEnabled: false,
      refreshInterval: 0,
      frequencyCap: { enabled: true, limit: 3, period: 'hourly' },
    }
  },
  {
    id: 'reward',
    name: '리워드 광고',
    type: 'rewarded',
    placement: '포인트 획득',
    status: 'active',
    size: 'fullscreen',
    networks: ['admob', 'adgate', 'unity'],
    impressions: 320000,
    clicks: 310000,
    ctr: 96.9,
    revenue: 2240000,
    ecpm: 7000,
    settings: {
      refreshEnabled: false,
      refreshInterval: 0,
      frequencyCap: { enabled: true, limit: 10, period: 'daily' },
      rewardAmount: 50,
      rewardType: '핀',
    }
  },
  {
    id: 'native_feed',
    name: '네이티브 피드',
    type: 'native',
    placement: '피드 사이',
    status: 'active',
    size: 'fluid',
    networks: ['adgate', 'cauly'],
    impressions: 650000,
    clicks: 19500,
    ctr: 3.0,
    revenue: 1137500,
    ecpm: 1750,
    settings: {
      refreshEnabled: false,
      refreshInterval: 0,
      frequencyCap: { enabled: true, limit: 5, period: 'daily' },
    }
  },
  {
    id: 'native_exit',
    name: '종료 네이티브',
    type: 'native',
    placement: '앱 종료 시',
    status: 'paused',
    size: 'custom',
    networks: [],
    impressions: 0,
    clicks: 0,
    ctr: 0,
    revenue: 0,
    ecpm: 0,
    settings: {
      refreshEnabled: false,
      refreshInterval: 0,
      frequencyCap: { enabled: false, limit: 0, period: '' },
    }
  }
];

export const waterfallConfig = [
  { networkId: 'admob', unitId: 'banner_home', priority: 1, ecpmFloor: 2000, enabled: true },
  { networkId: 'cauly', unitId: 'banner_home', priority: 2, ecpmFloor: 1500, enabled: true },
  { networkId: 'admob', unitId: 'interstitial', priority: 1, ecpmFloor: 4000, enabled: true },
  { networkId: 'unity', unitId: 'interstitial', priority: 2, ecpmFloor: 3500, enabled: true },
  { networkId: 'unity', unitId: 'reward', priority: 1, ecpmFloor: 6000, enabled: true },
  { networkId: 'admob', unitId: 'reward', priority: 2, ecpmFloor: 5500, enabled: true },
  { networkId: 'adgate', unitId: 'reward', priority: 3, ecpmFloor: 5000, enabled: true },
  { networkId: 'adgate', unitId: 'native_feed', priority: 1, ecpmFloor: 1500, enabled: true },
  { networkId: 'cauly', unitId: 'native_feed', priority: 2, ecpmFloor: 1200, enabled: true },
  { networkId: 'cauly', unitId: 'banner_benefits', priority: 1, ecpmFloor: 1000, enabled: true },
];

export const revenueStats = {
  today: {
    revenue: 385000,
    impressions: 125000,
    ecpm: 3080,
    change: 12.5,
  },
  yesterday: {
    revenue: 342000,
    impressions: 118000,
    ecpm: 2898,
  },
  thisWeek: {
    revenue: 2450000,
    impressions: 820000,
    ecpm: 2988,
    change: 8.3,
  },
  thisMonth: {
    revenue: 9180500,
    impressions: 3240000,
    ecpm: 2833,
    change: 15.2,
  },
  chartData: [
    { date: '01/09', revenue: 285000, impressions: 95000 },
    { date: '01/10', revenue: 312000, impressions: 102000 },
    { date: '01/11', revenue: 298000, impressions: 98500 },
    { date: '01/12', revenue: 345000, impressions: 112000 },
    { date: '01/13', revenue: 378000, impressions: 120000 },
    { date: '01/14', revenue: 342000, impressions: 118000 },
    { date: '01/15', revenue: 385000, impressions: 125000 },
  ]
};

export const settingsConfig = {
  global: {
    testMode: false,
    gdprEnabled: true,
    ccpaEnabled: false,
    ageRestriction: 'none',
    defaultTimeout: 10000,
  },
  frequencyCap: {
    globalEnabled: true,
    interstitialLimit: 3,
    interstitialPeriod: 'hourly',
    rewardedLimit: 10,
    rewardedPeriod: 'daily',
  },
  targeting: {
    geoEnabled: true,
    countries: ['KR', 'US', 'JP'],
    deviceTypes: ['phone', 'tablet'],
    osVersionMin: { ios: '14.0', android: '8.0' },
  },
  apiKeys: {
    admob: { appId: 'ca-app-pub-xxxxxxxx~yyyyyyyy', testDevices: ['device1', 'device2'] },
    adgate: { appKey: 'AG_xxxxxxxx', hashKey: 'xxxxxxxx' },
    cauly: { appCode: 'CAULY_xxxxxxxx' },
    unity: { gameId: 'unity_game_id_xxxx' },
  }
};
