import React, { useState } from 'react';

function Settings() {
  const [targetingSettings, setTargetingSettings] = useState([
    { key: 'personalized', title: '개인화 광고', desc: '사용자 관심사 기반 광고 노출', enabled: true },
    { key: 'location', title: '위치 기반 광고', desc: '사용자 위치 정보 활용', enabled: false },
    { key: 'ageRestricted', title: '연령 제한 콘텐츠', desc: '성인 대상 광고 허용', enabled: false },
  ]);

  const [reportingSettings, setReportingSettings] = useState([
    { key: 'dailyReport', title: '일일 리포트 이메일', desc: '매일 오전 9시 수익 리포트 발송', enabled: true },
    { key: 'anomalyAlert', title: '이상 탐지 알림', desc: '수익 급감 시 Slack 알림', enabled: true },
    { key: 'weeklySummary', title: '주간 성과 요약', desc: '매주 월요일 종합 리포트', enabled: true },
  ]);

  const toggleTargeting = (key) => {
    setTargetingSettings(prev => prev.map(s =>
      s.key === key ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const toggleReporting = (key) => {
    setReportingSettings(prev => prev.map(s =>
      s.key === key ? { ...s, enabled: !s.enabled } : s
    ));
  };

  return (
    <div>
      <div className="admed-settings-grid">
        {/* 타게팅 설정 */}
        <div className="admed-settings-card">
          <h3 className="admed-settings-card-title">
            <span className="admed-settings-card-title-icon">🎯</span>
            타게팅 설정
          </h3>
          {targetingSettings.map((setting) => (
            <div key={setting.key} className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>{setting.title}</h5>
                <p>{setting.desc}</p>
              </div>
              <div
                className={`admed-toggle-switch ${setting.enabled ? 'active' : ''}`}
                onClick={() => toggleTargeting(setting.key)}
              />
            </div>
          ))}
        </div>

        {/* 리포팅 설정 */}
        <div className="admed-settings-card">
          <h3 className="admed-settings-card-title">
            <span className="admed-settings-card-title-icon">📊</span>
            리포팅 설정
          </h3>
          {reportingSettings.map((setting) => (
            <div key={setting.key} className="admed-toggle-row">
              <div className="admed-toggle-info">
                <h5>{setting.title}</h5>
                <p>{setting.desc}</p>
              </div>
              <div
                className={`admed-toggle-switch ${setting.enabled ? 'active' : ''}`}
                onClick={() => toggleReporting(setting.key)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
