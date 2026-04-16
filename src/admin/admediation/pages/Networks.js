import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const networksData = [
  {
    id: 'admob',
    name: 'Google AdMob',
    logo: 'G',
    desc: '광고 네트워크',
    status: 'active',
    appId: 'ca-app-pub-3940256099942544',
    connectedAt: '2026.01.15',
    lastSync: '5분 전'
  },
  {
    id: 'adgate',
    name: '애드게이트',
    logo: 'AG',
    desc: '리워드 광고',
    status: 'active',
    appId: 'adgate_app_12345',
    connectedAt: '2026.01.20',
    lastSync: '10분 전'
  },
  {
    id: 'cauly',
    name: '카울리',
    logo: 'C',
    desc: '배너/전면 광고',
    status: 'active',
    appId: 'cauly_key_abcde',
    connectedAt: '2026.02.01',
    lastSync: '3분 전'
  },
  {
    id: 'unity',
    name: 'Unity Ads',
    logo: 'U',
    desc: '리워드 광고',
    status: 'active',
    appId: 'unity_game_12345',
    connectedAt: '2026.02.10',
    lastSync: '8분 전'
  },
  {
    id: 'applovin',
    name: 'AppLovin',
    logo: 'A',
    desc: '전면/리워드 광고',
    status: 'pending',
    appId: 'applovin_sdk_key',
    connectedAt: '2026.03.20',
    lastSync: '—'
  },
];

function Networks() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="admed-table-card">
        <div className="admed-table-header">
          <h3 className="admed-table-title">연동된 광고 네트워크</h3>
        </div>
        <table className="admed-table">
          <thead>
            <tr>
              <th>네트워크</th>
              <th>연동 상태</th>
              <th>App ID</th>
              <th>연동일</th>
              <th>마지막 동기화</th>
            </tr>
          </thead>
          <tbody>
            {networksData.map((network) => (
              <tr
                key={network.id}
                onClick={() => navigate(`/admin/admediation/networks/${network.id}`)}
              >
                <td>
                  <div className="admed-network-cell">
                    <div className={`admed-network-logo ${network.id}`}>{network.logo}</div>
                    <div className="admed-network-info">
                      <div className="admed-network-name">{network.name}</div>
                      <div className="admed-network-id">{network.desc}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`admed-status ${network.status}`}>
                    <span className="admed-status-dot"></span>
                    {network.status === 'active' ? '연동 완료' : '검토중'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <code style={{
                      background: '#f1f5f9',
                      padding: '4px 8px',
                      borderRadius: 4,
                      fontSize: 12
                    }}>
                      {network.appId}
                    </code>
                    <button
                      className="admed-action-btn"
                      style={{ width: 24, height: 24, fontSize: 12 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(network.appId);
                      }}
                      title="App ID 복사"
                    >
                      📋
                    </button>
                  </div>
                </td>
                <td>{network.connectedAt}</td>
                <td>{network.lastSync}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Networks;
