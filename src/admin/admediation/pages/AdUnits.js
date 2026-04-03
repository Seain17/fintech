import React, { useState } from 'react';
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

// 지면 추가 모달 컴포넌트
function AddAdUnitModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    pixel: '320x50',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('지면명을 입력해주세요.');
      return;
    }
    if (!formData.content.trim()) {
      alert('지면 콘텐츠를 입력해주세요.');
      return;
    }
    onSubmit(formData);
    setFormData({
      name: '',
      content: '',
      pixel: '320x50',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="admed-modal-overlay" onClick={onClose}>
      <div className="admed-modal" onClick={e => e.stopPropagation()}>
        <div className="admed-modal-header">
          <h3 className="admed-modal-title">
            <span className="admed-modal-title-icon">📱</span>
            새 광고 지면 추가
          </h3>
          <button className="admed-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="admed-modal-body">
          <div className="admed-form-group">
            <label className="admed-form-label">지면명 *</label>
            <input
              type="text"
              className="admed-form-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="예: 홈 하단 배너"
            />
          </div>
          <div className="admed-form-group">
            <label className="admed-form-label">지면 콘텐츠 *</label>
            <input
              type="text"
              className="admed-form-input"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="예: 홈 화면, 혜택탭 피드"
            />
          </div>
          <div className="admed-form-group">
            <label className="admed-form-label">픽셀 사이즈</label>
            <select
              className="admed-form-select"
              name="pixel"
              value={formData.pixel}
              onChange={handleChange}
            >
              <option value="320x50">320x50 (배너)</option>
              <option value="300x250">300x250 (미디엄)</option>
              <option value="360x200">360x200 (네이티브)</option>
              <option value="Fullscreen">Fullscreen (전면/리워드)</option>
            </select>
          </div>
          <div className="admed-form-group">
            <p className="admed-form-hint">
              * 지면코드는 자동으로 생성됩니다. 생성 후 워터폴 설정에서 네트워크를 추가하고 광고유형, 과금기준 등을 설정할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="admed-modal-footer">
          <button className="admed-btn admed-btn-secondary" onClick={onClose}>
            취소
          </button>
          <button className="admed-btn admed-btn-primary" onClick={handleSubmit}>
            지면 추가
          </button>
        </div>
      </div>
    </div>
  );
}

const adUnitsData = [
  {
    id: 'home_banner',
    name: '홈 하단 배너',
    pixel: '320x50',
    code: 'AFIN_HOME_BN_001',
    content: '홈 화면',
    currentNetwork: 'Google AdMob',
    currentNetworkId: 'admob',
    networkCount: 2,
    status: 'active',
    ecpm: 5200,
    impressions: 45200,
  },
  {
    id: 'feed_native',
    name: '피드 네이티브',
    pixel: '360x200',
    code: 'AFIN_FEED_NT_001',
    content: '혜택탭 피드',
    currentNetwork: '카울리',
    currentNetworkId: 'cauly',
    networkCount: 2,
    status: 'active',
    ecpm: 8500,
    impressions: 52300,
  },
  {
    id: 'interstitial_tab',
    name: '탭 전환 전면',
    pixel: 'Fullscreen',
    code: 'AFIN_TAB_INT_001',
    content: '탭 전환',
    currentNetwork: 'Google AdMob',
    currentNetworkId: 'admob',
    networkCount: 3,
    status: 'active',
    ecpm: 15800,
    impressions: 18500,
  },
  {
    id: 'reward_mission',
    name: '핀 적립 리워드',
    pixel: 'Fullscreen',
    code: 'AFIN_RWD_MSN_001',
    content: '혜택탭 미션',
    currentNetwork: '애드게이트',
    currentNetworkId: 'adgate',
    networkCount: 3,
    status: 'active',
    ecpm: 22500,
    impressions: 32800,
  },
  {
    id: 'reward_attendance',
    name: '출석체크 보너스',
    pixel: 'Fullscreen',
    code: 'AFIN_RWD_ATT_001',
    content: '출석체크',
    currentNetwork: '애드게이트',
    currentNetworkId: 'adgate',
    networkCount: 2,
    status: 'active',
    ecpm: 20200,
    impressions: 28100,
  },
  {
    id: 'reward_walking',
    name: '만보기 보상',
    pixel: 'Fullscreen',
    code: 'AFIN_RWD_WLK_001',
    content: '에코만보기',
    currentNetwork: 'Unity Ads',
    currentNetworkId: 'unity',
    networkCount: 2,
    status: 'active',
    ecpm: 19800,
    impressions: 15200,
  },
  {
    id: 'splash_interstitial',
    name: '스플래시 전면',
    pixel: 'Fullscreen',
    code: 'AFIN_SPL_INT_001',
    content: '앱 실행',
    currentNetwork: 'AppLovin',
    currentNetworkId: 'applovin',
    networkCount: 1,
    status: 'pending',
    ecpm: 0,
    impressions: 0,
  },
  {
    id: 'article_native',
    name: '아티클 네이티브',
    pixel: '300x250',
    code: 'AFIN_ART_NT_001',
    content: '금융 아티클',
    currentNetwork: '카울리',
    currentNetworkId: 'cauly',
    networkCount: 1,
    status: 'active',
    ecpm: 7200,
    impressions: 38500,
  },
];


function AdUnits() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddUnit = (formData) => {
    // 실제로는 API 호출
    const newCode = `AFIN_${formData.name.toUpperCase().slice(0,3)}_${Date.now().toString().slice(-6)}`;
    alert(`새 지면이 추가되었습니다!\n\n지면명: ${formData.name}\n지면코드: ${newCode}\n\n워터폴 설정에서 네트워크를 추가해주세요.`);
  };

  const filteredUnits = adUnitsData.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(search.toLowerCase()) ||
                          unit.code.toLowerCase().includes(search.toLowerCase()) ||
                          unit.currentNetwork.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  // eslint-disable-next-line no-unused-vars
  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num) => {
    return '₩' + num.toLocaleString();
  };

  return (
    <div>
      {/* 검색 및 추가 */}
      <div className="admed-table-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <input
              type="text"
              className="admed-form-input"
              placeholder="지면명, 지면코드, 네트워크 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ margin: 0 }}
            />
          </div>
          <button
            className="admed-btn admed-btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <span>➕</span> 지면 추가
          </button>
        </div>
      </div>

      {/* 지면 테이블 */}
      <div className="admed-table-card">
        <div className="admed-table-header">
          <h3 className="admed-table-title">광고 지면 목록</h3>
          <span style={{ fontSize: 13, color: '#64748b' }}>
            총 {filteredUnits.length}개 지면
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admed-table">
            <thead>
              <tr>
                <th>지면명</th>
                <th>지면 콘텐츠</th>
                <th>지면코드</th>
                <th>현재 적용된 네트워크</th>
                <th>상태</th>
                <th>eCPM</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnits.map((unit) => (
                <tr
                  key={unit.id}
                  onClick={() => navigate(`/admin/admediation/units/${unit.id}`)}
                >
                  <td>
                    <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{unit.name}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: 13, color: '#475569' }}>{unit.content}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <code style={{
                        background: '#f1f5f9',
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontFamily: 'monospace'
                      }}>
                        {unit.code}
                      </code>
                      <button
                        className="admed-action-btn"
                        style={{ width: 24, height: 24, fontSize: 12 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(unit.code);
                        }}
                        title="지면코드 복사"
                      >
                        📋
                      </button>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div
                        className={`admed-network-logo ${unit.currentNetworkId}`}
                        style={{ width: 24, height: 24, fontSize: 10 }}
                      >
                        {unit.currentNetwork.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 13, color: '#1a1a1a' }}>{unit.currentNetwork}</div>
                        {unit.networkCount > 1 && (
                          <div style={{ fontSize: 11, color: '#94a3b8' }}>+{unit.networkCount - 1} 네트워크</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`admed-toggle-switch ${unit.status === 'active' ? 'active' : ''}`}
                      style={{ width: 40, height: 22 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`${unit.name} 상태 변경 (현재: ${unit.status === 'active' ? '활성' : '비활성'})`);
                      }}
                    />
                  </td>
                  <td>
                    <span className="admed-ecpm-value">
                      {unit.ecpm > 0 ? formatCurrency(unit.ecpm) : '—'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="admed-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/admediation/units/${unit.id}`);
                        }}
                        title="편집"
                      >
                        ✏️
                      </button>
                      <button
                        className="admed-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          const password = window.prompt('삭제하려면 관리자 비밀번호를 입력하세요:');
                          if (password === null) return;
                          if (password === '1234') {
                            alert(`${unit.name} 지면이 삭제되었습니다.`);
                          } else {
                            alert('비밀번호가 올바르지 않습니다.');
                          }
                        }}
                        title="삭제"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* 지면 추가 모달 */}
      <AddAdUnitModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddUnit}
      />
    </div>
  );
}

export default AdUnits;
