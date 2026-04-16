import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// HTTP에서도 동작하는 복사 함수
const copyToClipboard = (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      alert('복사되었습니다.');
    });
  } else {
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

// 네트워크 상세 데이터
const networksDetailData = {
  admob: {
    id: 'admob',
    name: 'Google AdMob',
    logo: 'G',
    desc: '구글 모바일 광고 네트워크',
    status: 'active',
    appId: 'ca-app-pub-3940256099942544',
    appIdAndroid: 'ca-app-pub-3940256099942544~3347511713',
    appIdIos: 'ca-app-pub-3940256099942544~1458002511',
    connectedAt: '2026.01.15',
    lastSync: '5분 전',
    ecpm: 12500,
    fillRate: 98,
    impressions: 118420,
    revenue: 1480250,
    todayRevenue: 1480250,
    monthRevenue: 42500000,
    testMode: false,
    bidding: true,
    adUnits: [
      { id: 'banner_home', name: '홈 하단 배너', type: 'banner', ecpm: 5200, impressions: 45200 },
      { id: 'interstitial', name: '화면 전환 전면광고', type: 'interstitial', ecpm: 15800, impressions: 18500 },
      { id: 'reward_mission', name: '핀 적립 리워드', type: 'rewarded', ecpm: 22500, impressions: 32800 },
    ]
  },
  adgate: {
    id: 'adgate',
    name: '애드게이트',
    logo: 'AG',
    desc: 'CPI/CPA 기반 국내 리워드 광고 네트워크',
    status: 'active',
    appId: 'adgate_app_12345',
    appKey: 'AG_AFIN_2026',
    hashKey: '********',
    connectedAt: '2026.01.20',
    lastSync: '10분 전',
    ecpm: 8200,
    fillRate: 92,
    impressions: 69390,
    revenue: 568998,
    todayRevenue: 568998,
    monthRevenue: 15800000,
    testMode: false,
    bidding: false,
    adUnits: [
      { id: 'reward_mission', name: '핀 적립 리워드', type: 'rewarded', ecpm: 22500, impressions: 32800 },
      { id: 'reward_attendance', name: '출석체크 보너스', type: 'rewarded', ecpm: 20200, impressions: 28100 },
    ]
  },
  cauly: {
    id: 'cauly',
    name: '카울리',
    logo: 'C',
    desc: '국내 대표 모바일 광고 플랫폼',
    status: 'active',
    appId: 'cauly_key_abcde',
    appCode: 'CAULY_AFIN_2026',
    connectedAt: '2026.02.01',
    lastSync: '3분 전',
    ecpm: 6800,
    fillRate: 89,
    impressions: 62850,
    revenue: 427380,
    todayRevenue: 427380,
    monthRevenue: 12500000,
    testMode: false,
    bidding: false,
    adUnits: [
      { id: 'banner_home', name: '홈 하단 배너', type: 'banner', ecpm: 5200, impressions: 45200 },
      { id: 'native_feed', name: '피드 네이티브', type: 'native', ecpm: 8500, impressions: 52300 },
    ]
  },
  unity: {
    id: 'unity',
    name: 'Unity Ads',
    logo: 'U',
    desc: '게임 특화 리워드 광고 네트워크',
    status: 'active',
    appId: 'unity_game_12345',
    gameId: '4567890',
    connectedAt: '2026.02.10',
    lastSync: '8분 전',
    ecpm: 5500,
    fillRate: 95,
    impressions: 52180,
    revenue: 286990,
    todayRevenue: 286990,
    monthRevenue: 8200000,
    testMode: false,
    bidding: true,
    adUnits: [
      { id: 'reward_mission', name: '핀 적립 리워드', type: 'rewarded', ecpm: 18800, impressions: 28000 },
      { id: 'reward_walking', name: '에코만보기 보상', type: 'rewarded', ecpm: 19800, impressions: 15200 },
    ]
  },
  applovin: {
    id: 'applovin',
    name: 'AppLovin',
    logo: 'A',
    desc: '글로벌 광고 미디에이션 플랫폼',
    status: 'pending',
    appId: 'applovin_sdk_key',
    sdkKey: 'applovin_sdk_key_xxxxx',
    connectedAt: '2026.03.20',
    lastSync: '—',
    ecpm: 0,
    fillRate: 0,
    impressions: 0,
    revenue: 0,
    todayRevenue: 0,
    monthRevenue: 0,
    testMode: true,
    bidding: true,
    adUnits: []
  },
};

const typeIcons = {
  banner: '🖼️',
  interstitial: '📱',
  rewarded: '🎁',
  native: '📰',
};

// 일자별 성과 데이터 (샘플)
const dailyPerformanceData = {
  admob: [
    { date: '2026.03.19', impressions: 115200, clicks: 2304, revenue: 1420000, ecpm: 12320, fillRate: 97 },
    { date: '2026.03.20', impressions: 118400, clicks: 2368, revenue: 1465000, ecpm: 12375, fillRate: 98 },
    { date: '2026.03.21', impressions: 112800, clicks: 2256, revenue: 1385000, ecpm: 12278, fillRate: 96 },
    { date: '2026.03.22', impressions: 120500, clicks: 2410, revenue: 1510000, ecpm: 12531, fillRate: 98 },
    { date: '2026.03.23', impressions: 116700, clicks: 2334, revenue: 1445000, ecpm: 12382, fillRate: 97 },
    { date: '2026.03.24', impressions: 119200, clicks: 2384, revenue: 1488000, ecpm: 12483, fillRate: 98 },
    { date: '2026.03.25', impressions: 118420, clicks: 2368, revenue: 1480250, ecpm: 12500, fillRate: 98 },
  ],
  adgate: [
    { date: '2026.03.19', impressions: 67200, clicks: 1344, revenue: 545000, ecpm: 8110, fillRate: 91 },
    { date: '2026.03.20', impressions: 68500, clicks: 1370, revenue: 558000, ecpm: 8146, fillRate: 92 },
    { date: '2026.03.21', impressions: 66800, clicks: 1336, revenue: 540000, ecpm: 8084, fillRate: 90 },
    { date: '2026.03.22', impressions: 70200, clicks: 1404, revenue: 572000, ecpm: 8148, fillRate: 93 },
    { date: '2026.03.23', impressions: 68900, clicks: 1378, revenue: 560000, ecpm: 8128, fillRate: 91 },
    { date: '2026.03.24', impressions: 69800, clicks: 1396, revenue: 568000, ecpm: 8138, fillRate: 92 },
    { date: '2026.03.25', impressions: 69390, clicks: 1388, revenue: 568998, ecpm: 8200, fillRate: 92 },
  ],
  cauly: [
    { date: '2026.03.19', impressions: 60500, clicks: 1815, revenue: 408000, ecpm: 6744, fillRate: 88 },
    { date: '2026.03.20', impressions: 62100, clicks: 1863, revenue: 420000, ecpm: 6764, fillRate: 89 },
    { date: '2026.03.21', impressions: 61200, clicks: 1836, revenue: 412000, ecpm: 6732, fillRate: 88 },
    { date: '2026.03.22', impressions: 63500, clicks: 1905, revenue: 432000, ecpm: 6803, fillRate: 90 },
    { date: '2026.03.23', impressions: 62000, clicks: 1860, revenue: 418000, ecpm: 6742, fillRate: 89 },
    { date: '2026.03.24', impressions: 63200, clicks: 1896, revenue: 428000, ecpm: 6772, fillRate: 89 },
    { date: '2026.03.25', impressions: 62850, clicks: 1886, revenue: 427380, ecpm: 6800, fillRate: 89 },
  ],
  unity: [
    { date: '2026.03.19', impressions: 50200, clicks: 1506, revenue: 272000, ecpm: 5418, fillRate: 94 },
    { date: '2026.03.20', impressions: 51500, clicks: 1545, revenue: 280000, ecpm: 5437, fillRate: 95 },
    { date: '2026.03.21', impressions: 50800, clicks: 1524, revenue: 275000, ecpm: 5413, fillRate: 94 },
    { date: '2026.03.22', impressions: 52800, clicks: 1584, revenue: 290000, ecpm: 5492, fillRate: 96 },
    { date: '2026.03.23', impressions: 51200, clicks: 1536, revenue: 278000, ecpm: 5430, fillRate: 95 },
    { date: '2026.03.24', impressions: 52500, clicks: 1575, revenue: 286000, ecpm: 5448, fillRate: 95 },
    { date: '2026.03.25', impressions: 52180, clicks: 1565, revenue: 286990, ecpm: 5500, fillRate: 95 },
  ],
  applovin: [
    { date: '2026.03.19', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.20', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.21', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.22', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.23', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.24', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
    { date: '2026.03.25', impressions: 0, clicks: 0, revenue: 0, ecpm: 0, fillRate: 0 },
  ],
};

function NetworkDetail() {
  const { networkId } = useParams();
  const navigate = useNavigate();
  const network = networksDetailData[networkId];
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [testMode, setTestMode] = useState(network?.testMode || false);
  const [dateRange, setDateRange] = useState('7d');

  // 선택한 기간에 따른 데이터 계산
  const dailyData = dailyPerformanceData[networkId] || [];
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

  if (!network) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h3 style={{ margin: '0 0 8px', color: '#1a1a1a' }}>네트워크를 찾을 수 없습니다</h3>
        <p style={{ color: '#64748b', marginBottom: 24 }}>요청하신 네트워크가 존재하지 않습니다.</p>
        <button
          className="admed-btn admed-btn-primary"
          onClick={() => navigate('/admin/admediation/networks')}
        >
          네트워크 목록으로
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

  return (
    <div>
      {/* 상세 페이지 헤더 */}
      <div className="admed-detail-header">
        <Link to="/admin/admediation/networks" className="admed-detail-back">←</Link>
        <div className={`admed-network-logo ${network.id}`} style={{ width: 48, height: 48, fontSize: 18 }}>
          {network.logo}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>{network.name}</h2>
          <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>{network.desc}</p>
        </div>
        <span className={`admed-status ${network.status}`}>
          <span className="admed-status-dot"></span>
          {network.status === 'active' ? '활성' : '검토중'}
        </span>
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
          개요
        </button>
        <button
          className={`admed-tab ${activeTab === 'units' ? 'active' : ''}`}
          onClick={() => setActiveTab('units')}
        >
          <span className="admed-tab-icon">📱</span>
          연결된 유닛 ({network.adUnits.length})
        </button>
        <button
          className={`admed-tab ${activeTab === 'integration' ? 'active' : ''}`}
          onClick={() => setActiveTab('integration')}
        >
          <span className="admed-tab-icon">🔗</span>
          연동 정보
        </button>
        <button
          className={`admed-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <span className="admed-tab-icon">⚙️</span>
          설정
        </button>
      </div>

      {/* 개요 탭 */}
      {activeTab === 'overview' && (
        <div className="admed-settings-grid">
          <div className="admed-settings-card">
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">📋</span>
              네트워크 정보
            </h3>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>App ID</h5>
                <p>네트워크 연동 키</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <code style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, fontSize: 13 }}>
                  {network.appId}
                </code>
                <button
                  className="admed-action-btn"
                  style={{ width: 28, height: 28, fontSize: 12 }}
                  onClick={() => copyToClipboard(network.appId)}
                  title="복사"
                >
                  📋
                </button>
              </div>
            </div>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>연동일</h5>
                <p>네트워크 연동 날짜</p>
              </div>
              <span style={{ fontSize: 14, color: '#374151' }}>{network.connectedAt}</span>
            </div>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>마지막 동기화</h5>
                <p>데이터 동기화 시각</p>
              </div>
              <span style={{ fontSize: 14, color: '#374151' }}>{network.lastSync}</span>
            </div>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>비딩 지원</h5>
                <p>실시간 비딩 사용 가능</p>
              </div>
              <span className={`admed-status ${network.bidding ? 'active' : 'inactive'}`}>
                <span className="admed-status-dot"></span>
                {network.bidding ? '지원' : '미지원'}
              </span>
            </div>
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
                {formatCurrency(network.monthRevenue)}
              </span>
            </div>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>연결된 광고 유닛</h5>
              </div>
              <span style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: 700, color: '#1a2e71' }}>
                {network.adUnits.length}개
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 일자별 성과 테이블 - 개요 탭 */}
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

      {/* 연결된 유닛 탭 */}
      {activeTab === 'units' && (
        <div className="admed-table-card">
          <div className="admed-table-header">
            <h3 className="admed-table-title">연결된 광고 유닛</h3>
          </div>
          {network.adUnits.length > 0 ? (
            <table className="admed-table">
              <thead>
                <tr>
                  <th>유닛</th>
                  <th>유형</th>
                  <th>eCPM</th>
                  <th>오늘 노출</th>
                </tr>
              </thead>
              <tbody>
                {network.adUnits.map((unit) => (
                  <tr
                    key={unit.id}
                    onClick={() => navigate(`/admin/admediation/units/${unit.id}`)}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className={`admed-unit-type-icon ${unit.type}`} style={{ width: 36, height: 36, fontSize: 16 }}>
                          {typeIcons[unit.type]}
                        </div>
                        <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{unit.name}</span>
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{unit.type}</td>
                    <td>
                      <span className="admed-ecpm-value">{formatCurrency(unit.ecpm)}</span>
                    </td>
                    <td>{formatNumber(unit.impressions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: 'center', padding: 48, color: '#64748b' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
              <p>연결된 광고 유닛이 없습니다</p>
            </div>
          )}
        </div>
      )}

      {/* 연동 정보 탭 */}
      {activeTab === 'integration' && (
        <div className="admed-settings-grid">
          <div className="admed-settings-card" style={{ gridColumn: '1 / -1' }}>
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">🔗</span>
              연동 정보
            </h3>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>연동 방식</h5>
                <p>SDK를 통한 네이티브 연동</p>
              </div>
              <span style={{
                padding: '6px 14px',
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                background: '#f0fdf4',
                color: '#166534',
              }}>
                SDK
              </span>
            </div>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>App ID</h5>
                <p>앱에서 광고를 요청할 때 사용하는 고유 키</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <code style={{ background: '#f1f5f9', padding: '8px 14px', borderRadius: 6, fontSize: 14, fontFamily: 'monospace' }}>
                  {network.appId}
                </code>
                <button
                  className="admed-btn admed-btn-secondary admed-btn-sm"
                  onClick={() => copyToClipboard(network.appId)}
                >
                  복사
                </button>
              </div>
            </div>
          </div>

          {/* SDK 연동 가이드 */}
          <div className="admed-settings-card" style={{ gridColumn: '1 / -1' }}>
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">📱</span>
              SDK 연동 가이드
            </h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
              {network.name} SDK를 사용하여 광고를 연동합니다. 아래 가이드를 참고하세요.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="admed-btn admed-btn-secondary">
                📄 Android 가이드
              </button>
              <button className="admed-btn admed-btn-secondary">
                📄 iOS 가이드
              </button>
              <button className="admed-btn admed-btn-secondary">
                📄 React Native 가이드
              </button>
              <button className="admed-btn admed-btn-secondary">
                📄 Flutter 가이드
              </button>
            </div>
          </div>

          {/* 스크립트 코드 (웹용) */}
          <div className="admed-settings-card" style={{ gridColumn: '1 / -1' }}>
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">📝</span>
              웹 연동 스크립트
            </h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
              웹페이지에서 광고를 표시하려면 아래 스크립트를 삽입하세요.
            </p>
            <div style={{ position: 'relative' }}>
              <pre style={{
                background: '#1e293b',
                color: '#e2e8f0',
                padding: 16,
                borderRadius: 8,
                fontSize: 13,
                overflow: 'auto',
                fontFamily: 'monospace',
              }}>
{`<!-- ${network.name} SDK -->
<script src="https://ads.${network.id}.com/sdk/v1/loader.js"></script>
<script>
  window.${network.id}SDK.init({
    appId: '${network.appId}',
    testMode: ${network.testMode}
  });
</script>

<!-- 광고 표시 영역 -->
<div id="${network.id}-ad-container"></div>
<script>
  window.${network.id}SDK.showAd({
    containerId: '${network.id}-ad-container',
    adType: 'banner'
  });
</script>`}
              </pre>
              <button
                className="admed-btn admed-btn-secondary admed-btn-sm"
                style={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => copyToClipboard(`<!-- ${network.name} SDK -->
<script src="https://ads.${network.id}.com/sdk/v1/loader.js"></script>
<script>
  window.${network.id}SDK.init({
    appId: '${network.appId}',
    testMode: ${network.testMode}
  });
</script>`)}
              >
                📋 복사
              </button>
            </div>
          </div>

          {/* API 엔드포인트 */}
          <div className="admed-settings-card">
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">🌐</span>
              API 엔드포인트
            </h3>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>Production</h5>
              </div>
              <code style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, fontSize: 12 }}>
                https://api.{network.id}.com/v1
              </code>
            </div>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>Sandbox</h5>
              </div>
              <code style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, fontSize: 12 }}>
                https://sandbox.{network.id}.com/v1
              </code>
            </div>
          </div>

          {/* 콜백 URL */}
          <div className="admed-settings-card">
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">🔄</span>
              콜백 설정
            </h3>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>Postback URL</h5>
                <p>전환 콜백을 받을 URL</p>
              </div>
              <code style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, fontSize: 11 }}>
                https://your-server.com/callback/{network.id}
              </code>
            </div>
            <p style={{ marginTop: 12, fontSize: 12, color: '#94a3b8' }}>
              * 콜백 URL은 {network.name} 대시보드에서 설정해주세요.
            </p>
          </div>
        </div>
      )}

      {/* 설정 탭 */}
      {activeTab === 'settings' && (
        <div className="admed-settings-grid">
          <div className="admed-settings-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 className="admed-settings-card-title" style={{ margin: 0 }}>
                <span className="admed-settings-card-title-icon">🔑</span>
                API 설정
              </h3>
              {!isEditing && (
                <button
                  className="admed-btn admed-btn-secondary admed-btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  <span>✏️</span> 편집
                </button>
              )}
            </div>
            {isEditing ? (
              <>
                <div className="admed-form-group">
                  <label className="admed-form-label">App ID</label>
                  <input
                    type="text"
                    className="admed-form-input"
                    defaultValue={network.appId}
                  />
                </div>
                {network.id === 'admob' && (
                  <>
                    <div className="admed-form-group">
                      <label className="admed-form-label">App ID (iOS)</label>
                      <input
                        type="text"
                        className="admed-form-input"
                        defaultValue={network.appIdIos}
                      />
                    </div>
                    <div className="admed-form-group">
                      <label className="admed-form-label">App ID (Android)</label>
                      <input
                        type="text"
                        className="admed-form-input"
                        defaultValue={network.appIdAndroid}
                      />
                    </div>
                  </>
                )}
                <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                  <button
                    className="admed-btn admed-btn-primary"
                    onClick={() => {
                      alert('저장되었습니다.');
                      setIsEditing(false);
                    }}
                  >
                    저장
                  </button>
                  <button
                    className="admed-btn admed-btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="admed-toggle-row">
                  <div className="admed-toggle-info">
                    <h5>App ID</h5>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <code style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, fontSize: 13 }}>
                      {network.appId}
                    </code>
                    <button
                      className="admed-action-btn"
                      style={{ width: 28, height: 28, fontSize: 12 }}
                      onClick={() => copyToClipboard(network.appId)}
                      title="복사"
                    >
                      📋
                    </button>
                  </div>
                </div>
                {network.id === 'admob' && (
                  <>
                    <div className="admed-toggle-row">
                      <div className="admed-toggle-info">
                        <h5>App ID (iOS)</h5>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <code style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, fontSize: 12 }}>
                          {network.appIdIos}
                        </code>
                        <button
                          className="admed-action-btn"
                          style={{ width: 28, height: 28, fontSize: 12 }}
                          onClick={() => copyToClipboard(network.appIdIos)}
                          title="복사"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                    <div className="admed-toggle-row">
                      <div className="admed-toggle-info">
                        <h5>App ID (Android)</h5>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <code style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, fontSize: 12 }}>
                          {network.appIdAndroid}
                        </code>
                        <button
                          className="admed-action-btn"
                          style={{ width: 28, height: 28, fontSize: 12 }}
                          onClick={() => copyToClipboard(network.appIdAndroid)}
                          title="복사"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="admed-settings-card">
            <h3 className="admed-settings-card-title">
              <span className="admed-settings-card-title-icon">⚙️</span>
              네트워크 설정
            </h3>
            <div className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>테스트 모드</h5>
                <p>테스트 광고만 표시합니다</p>
              </div>
              <div
                className={`admed-toggle-switch ${testMode ? 'active' : ''}`}
                onClick={() => setTestMode(!testMode)}
              />
            </div>
          </div>

          {/* 위험 영역 */}
          <div className="admed-settings-card" style={{ gridColumn: '1 / -1', borderColor: '#fee2e2' }}>
            <h3 className="admed-settings-card-title" style={{ color: '#dc2626' }}>
              <span className="admed-settings-card-title-icon">⚠️</span>
              위험 영역
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: '#374151' }}>네트워크 연동 해제</h5>
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>이 네트워크를 삭제하면 관련 데이터가 모두 삭제됩니다.</p>
              </div>
              <button
                className="admed-btn"
                style={{ background: '#fee2e2', color: '#dc2626' }}
                onClick={() => {
                  const password = window.prompt('삭제하려면 관리자 비밀번호를 입력하세요:');
                  if (password === null) return; // 취소 클릭
                  if (password === '1234') {
                    alert(`${network.name} 네트워크가 삭제되었습니다.`);
                    navigate('/admin/admediation/networks');
                  } else {
                    alert('비밀번호가 올바르지 않습니다.');
                  }
                }}
              >
                연동 해제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NetworkDetail;
