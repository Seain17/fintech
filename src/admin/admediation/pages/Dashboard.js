import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 대시보드 데이터
const statsData = {
  todayRevenue: 2847500,
  avgEcpm: 8420,
  totalImpressions: 338200,
  avgFillRate: 94.2,
};

const chartData = [
  { date: '3/18', value: 2100000 },
  { date: '3/19', value: 2500000 },
  { date: '3/20', value: 2300000 },
  { date: '3/21', value: 2700000 },
  { date: '3/22', value: 2400000 },
  { date: '3/23', value: 2600000 },
  { date: '3/24', value: 2850000 },
];

const networkPerformance = [
  { id: 'admob', name: 'Google AdMob', logo: 'G', status: 'active', ecpm: 12500, fillRate: 98, impressions: 118420, revenue: 1480250 },
  { id: 'adgate', name: '애드게이트', logo: 'AG', status: 'active', ecpm: 8200, fillRate: 92, impressions: 69390, revenue: 568998 },
  { id: 'cauly', name: '카울리', logo: 'C', status: 'active', ecpm: 6800, fillRate: 89, impressions: 62850, revenue: 427380 },
  { id: 'unity', name: 'Unity Ads', logo: 'U', status: 'active', ecpm: 5500, fillRate: 95, impressions: 52180, revenue: 286990 },
  { id: 'applovin', name: 'AppLovin', logo: 'A', status: 'pending', ecpm: 0, fillRate: 0, impressions: 0, revenue: 0 },
];

const adUnitPerformance = [
  { id: 'reward_mission', name: '핀 적립 리워드', type: '동영상', code: 'AFIN_RWD_MSN_001', ecpm: 22500, impressions: 32800, revenue: 738000 },
  { id: 'reward_attendance', name: '출석체크 보너스', type: '동영상', code: 'AFIN_RWD_ATT_001', ecpm: 20200, impressions: 28100, revenue: 567000 },
  { id: 'feed_native', name: '피드 네이티브', type: '네이티브 띠 배너', code: 'AFIN_FEED_NT_001', ecpm: 8500, impressions: 52300, revenue: 445000 },
  { id: 'interstitial_tab', name: '탭 전환 전면', type: '전면', code: 'AFIN_TAB_INT_001', ecpm: 15800, impressions: 18500, revenue: 292000 },
  { id: 'home_banner', name: '홈 하단 배너', type: '네트워크 띠 배너', code: 'AFIN_HOME_BN_001', ecpm: 5200, impressions: 45200, revenue: 235000 },
];

const networkShares = [
  { name: 'AdMob', color: '#1a2e71', share: 52 },
  { name: '애드게이트', color: '#3d5a9e', share: 20 },
  { name: '카울리', color: '#6b7db3', share: 15 },
  { name: 'Unity Ads', color: '#9eadd1', share: 10 },
  { name: 'AppLovin', color: '#d1d9eb', share: 3 },
];

const adTypeColors = {
  '네트워크 띠 배너': { bg: '#dbeafe', color: '#1d4ed8' },
  '전면': { bg: '#fce7f3', color: '#be185d' },
  '동영상': { bg: '#dcfce7', color: '#15803d' },
  '리워드비디오': { bg: '#d1fae5', color: '#047857' },
  'Interstitial': { bg: '#ede9fe', color: '#7c3aed' },
  '네이티브 띠 배너': { bg: '#fef3c7', color: '#d97706' },
};

function Dashboard() {
  const navigate = useNavigate();
  const [chartFilter, setChartFilter] = useState('7d');
  const maxChartValue = Math.max(...chartData.map(d => d.value));

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num) => {
    return '₩' + num.toLocaleString();
  };

  // 도넛 차트 각도 계산
  const getDonutGradient = () => {
    let currentAngle = 0;
    const gradientParts = networkShares.map((item) => {
      const startAngle = currentAngle;
      const endAngle = currentAngle + (item.share / 100) * 360;
      currentAngle = endAngle;
      return `${item.color} ${startAngle}deg ${endAngle}deg`;
    });
    return `conic-gradient(${gradientParts.join(', ')})`;
  };

  return (
    <div>
      {/* 통계 카드 */}
      <div className="admed-stats-grid">
        <div className="admed-stat-card highlight">
          <div className="admed-stat-header">
            <span className="admed-stat-label">오늘 총 수익</span>
            <div className="admed-stat-icon">💵</div>
          </div>
          <div className="admed-stat-value">{formatCurrency(statsData.todayRevenue)}</div>
          <div className="admed-stat-change up">▲ 12.5% vs 어제</div>
        </div>
        <div className="admed-stat-card">
          <div className="admed-stat-header">
            <span className="admed-stat-label">평균 eCPM</span>
            <div className="admed-stat-icon blue">📈</div>
          </div>
          <div className="admed-stat-value">{formatCurrency(statsData.avgEcpm)}</div>
          <div className="admed-stat-change up">▲ 3.2%</div>
        </div>
        <div className="admed-stat-card">
          <div className="admed-stat-header">
            <span className="admed-stat-label">총 노출수</span>
            <div className="admed-stat-icon green">👁️</div>
          </div>
          <div className="admed-stat-value">{formatNumber(statsData.totalImpressions)}</div>
          <div className="admed-stat-change up">▲ 8.7%</div>
        </div>
        <div className="admed-stat-card">
          <div className="admed-stat-header">
            <span className="admed-stat-label">평균 Fill Rate</span>
            <div className="admed-stat-icon purple">📊</div>
          </div>
          <div className="admed-stat-value">{statsData.avgFillRate}%</div>
          <div className="admed-stat-change down">▼ 0.8%</div>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="admed-charts-row">
        {/* 일별 수익 차트 */}
        <div className="admed-chart-card">
          <div className="admed-chart-header">
            <h3 className="admed-chart-title">일별 수익 추이</h3>
            <div className="admed-chart-filter">
              <button
                className={`admed-filter-btn ${chartFilter === '7d' ? 'active' : ''}`}
                onClick={() => setChartFilter('7d')}
              >7일</button>
              <button
                className={`admed-filter-btn ${chartFilter === '14d' ? 'active' : ''}`}
                onClick={() => setChartFilter('14d')}
              >14일</button>
              <button
                className={`admed-filter-btn ${chartFilter === '30d' ? 'active' : ''}`}
                onClick={() => setChartFilter('30d')}
              >30일</button>
            </div>
          </div>
          <div className="admed-chart-bars">
            {chartData.map((item, idx) => {
              const heightPercent = (item.value / maxChartValue) * 100;
              return (
                <div key={idx} className="admed-chart-bar-wrap">
                  <div
                    className="admed-chart-bar"
                    style={{ height: `${Math.max(heightPercent, 5)}%` }}
                    title={`${item.date}: ${formatCurrency(item.value)}`}
                  >
                    <span className="admed-chart-bar-value">{formatNumber(item.value)}</span>
                  </div>
                  <span className="admed-chart-bar-label">{item.date}</span>
                </div>
              );
            })}
          </div>
          <div className="admed-chart-summary">
            <div className="admed-chart-summary-item">
              <div className="admed-chart-summary-label">최고</div>
              <div className="admed-chart-summary-value high">
                {formatCurrency(Math.max(...chartData.map(d => d.value)))}
              </div>
            </div>
            <div className="admed-chart-summary-item">
              <div className="admed-chart-summary-label">최저</div>
              <div className="admed-chart-summary-value low">
                {formatCurrency(Math.min(...chartData.map(d => d.value)))}
              </div>
            </div>
            <div className="admed-chart-summary-item">
              <div className="admed-chart-summary-label">평균</div>
              <div className="admed-chart-summary-value avg">
                {formatCurrency(Math.round(chartData.reduce((a, b) => a + b.value, 0) / chartData.length))}
              </div>
            </div>
          </div>
        </div>

        {/* 네트워크별 수익 비중 */}
        <div className="admed-chart-card">
          <div className="admed-chart-header">
            <h3 className="admed-chart-title">네트워크별 수익</h3>
          </div>
          <div className="admed-donut-wrap">
            <div
              className="admed-donut-chart"
              style={{ background: getDonutGradient() }}
            >
              <div className="admed-donut-center">
                <div className="admed-donut-center-value">{networkShares.length}</div>
                <div className="admed-donut-center-label">네트워크</div>
              </div>
            </div>
            <div className="admed-donut-legend">
              {networkShares.map((item, idx) => (
                <div key={idx} className="admed-legend-item">
                  <div className="admed-legend-color" style={{ background: item.color }}></div>
                  <span className="admed-legend-label">{item.name}</span>
                  <span className="admed-legend-value">{item.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 광고 지면별 성과 테이블 */}
      <div className="admed-table-card">
        <div className="admed-table-header">
          <h3 className="admed-table-title">광고 지면별 성과 (오늘)</h3>
          <button
            className="admed-btn admed-btn-secondary admed-btn-sm"
            onClick={() => navigate('/admin/admediation/units')}
          >
            전체 보기
          </button>
        </div>
        <table className="admed-table">
          <thead>
            <tr>
              <th>지면명</th>
              <th>유형</th>
              <th>지면코드</th>
              <th>eCPM</th>
              <th>노출수</th>
              <th>수익</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {adUnitPerformance.map((unit) => (
              <tr
                key={unit.id}
                onClick={() => navigate(`/admin/admediation/units/${unit.id}`)}
              >
                <td>
                  <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{unit.name}</span>
                </td>
                <td>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 600,
                      background: adTypeColors[unit.type]?.bg || '#f1f5f9',
                      color: adTypeColors[unit.type]?.color || '#475569',
                    }}
                  >
                    {unit.type}
                  </span>
                </td>
                <td>
                  <code style={{
                    background: '#f1f5f9',
                    padding: '4px 8px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontFamily: 'monospace'
                  }}>
                    {unit.code}
                  </code>
                </td>
                <td>
                  <span className="admed-ecpm-value">{formatCurrency(unit.ecpm)}</span>
                </td>
                <td>{unit.impressions.toLocaleString()}</td>
                <td>
                  <strong style={{ color: '#1a2e71' }}>{formatCurrency(unit.revenue)}</strong>
                </td>
                <td>
                  <button
                    className="admed-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/admediation/units/${unit.id}`);
                    }}
                  >
                    ⚙️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 네트워크 성과 테이블 */}
      <div className="admed-table-card">
        <div className="admed-table-header">
          <h3 className="admed-table-title">네트워크별 실시간 성과</h3>
          <button
            className="admed-btn admed-btn-secondary admed-btn-sm"
            onClick={() => navigate('/admin/admediation/networks')}
          >
            전체 보기
          </button>
        </div>
        <table className="admed-table">
          <thead>
            <tr>
              <th>네트워크</th>
              <th>상태</th>
              <th>eCPM</th>
              <th>Fill Rate</th>
              <th>노출수</th>
              <th>오늘 수익</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {networkPerformance.map((network) => (
              <tr
                key={network.id}
                onClick={() => navigate(`/admin/admediation/networks/${network.id}`)}
              >
                <td>
                  <div className="admed-network-cell">
                    <div className={`admed-network-logo ${network.id}`}>{network.logo}</div>
                    <div className="admed-network-info">
                      <div className="admed-network-name">{network.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`admed-status ${network.status}`}>
                    <span className="admed-status-dot"></span>
                    {network.status === 'active' ? '활성' : '검토중'}
                  </span>
                </td>
                <td>
                  <span className="admed-ecpm-value">
                    {network.ecpm > 0 ? formatCurrency(network.ecpm) : '—'}
                  </span>
                </td>
                <td>
                  <div className="admed-fill-rate">
                    <div className="admed-fill-bar">
                      <div
                        className="admed-fill-bar-inner"
                        style={{ width: `${network.fillRate}%` }}
                      ></div>
                    </div>
                    <span className="admed-fill-value">
                      {network.fillRate > 0 ? `${network.fillRate}%` : '—'}
                    </span>
                  </div>
                </td>
                <td>{network.impressions > 0 ? network.impressions.toLocaleString() : '—'}</td>
                <td>
                  <strong style={{ color: '#1a2e71' }}>
                    {network.revenue > 0 ? formatCurrency(network.revenue) : '—'}
                  </strong>
                </td>
                <td>
                  <button
                    className="admed-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/admediation/networks/${network.id}`);
                    }}
                  >
                    ⚙️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
