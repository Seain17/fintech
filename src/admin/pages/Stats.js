import React from 'react';
import Card from '../components/Card';

const statsData = [
  { date: '01-26 (일)', dau: '3,450', newUser: '120', checkAos: '12,500', checkIos: '8,200', walkAos: '8,400', walkIos: '4,100', missionAos: '6,200', missionIos: '3,800', raffleAos: '2,100', raffleIos: '1,500', shopAos: '1,200', shopIos: '900', content: '450,000 P', hana: '50,000', shinhan: '30,000', paybook: '15,000', kakao: '20,000', isHighlight: true },
  { date: '01-25 (토)', dau: '3,210', newUser: '95', checkAos: '11,800', checkIos: '7,500', walkAos: '8,100', walkIos: '3,900', missionAos: '6,000', missionIos: '3,500', raffleAos: '1,900', raffleIos: '1,300', shopAos: '1,100', shopIos: '800', content: '410,000 P', hana: '45,000', shinhan: '25,000', paybook: '10,000', kakao: '15,000' },
  { date: '01-24 (금)', dau: '3,580', newUser: '110', checkAos: '13,200', checkIos: '8,500', walkAos: '8,700', walkIos: '4,300', missionAos: '6,500', missionIos: '4,000', raffleAos: '2,200', raffleIos: '1,600', shopAos: '1,300', shopIos: '950', content: '480,000 P', hana: '52,000', shinhan: '32,000', paybook: '18,000', kakao: '22,000' },
  { date: '01-23 (목)', dau: '3,320', newUser: '88', checkAos: '12,100', checkIos: '7,800', walkAos: '8,200', walkIos: '3,950', missionAos: '6,100', missionIos: '3,700', raffleAos: '2,000', raffleIos: '1,400', shopAos: '1,150', shopIos: '850', content: '420,000 P', hana: '46,000', shinhan: '28,000', paybook: '12,000', kakao: '18,000' },
  { date: '01-22 (수)', dau: '3,400', newUser: '102', checkAos: '12,400', checkIos: '8,000', walkAos: '8,350', walkIos: '4,050', missionAos: '6,300', missionIos: '3,850', raffleAos: '2,050', raffleIos: '1,450', shopAos: '1,220', shopIos: '880', content: '440,000 P', hana: '48,000', shinhan: '29,000', paybook: '13,000', kakao: '19,000' },
];

function Stats() {
  return (
    <>
      <div className="section-title">유저 활동 지표 (Monthly Total)</div>
      <div className="card-grid">
        <Card label="전체 MAU" value="8,500" />
        <Card label="신규 가입" value="+ 1,240명" valueStyle={{ color: 'var(--admin-success)' }} />
        <Card label="총 PV (AOS/iOS)" value="1.5M" />
        <Card label="포인트 총 전환액" value="3.2M P" />
      </div>

      <div className="section-title">일자별 상세 통계 (Wide View)</div>
      <div className="table-container" style={{ maxHeight: 600, overflowX: 'auto', overflowY: 'auto' }}>
        <table className="admin-table" style={{ minWidth: 1800 }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <tr>
              <th rowSpan="2" style={{ background: '#fff', position: 'sticky', left: 0, zIndex: 20, borderRight: '2px solid #ddd' }}>일자</th>
              <th colSpan="2" className="group-header">유저 지표</th>
              <th colSpan="2" className="group-header">출석체크 (PV)</th>
              <th colSpan="2" className="group-header">만보기 (PV)</th>
              <th colSpan="2" className="group-header">데일리미션 (PV)</th>
              <th colSpan="2" className="group-header">래플 (PV)</th>
              <th colSpan="2" className="group-header" style={{ background: '#f9f9f9' }}>경유쇼핑 (PV)</th>
              <th rowSpan="2" style={{ background: '#fff9e6' }}>콘텐츠 적립금<br/>(Total)</th>
              <th colSpan="4" style={{ background: '#ebfbee', borderLeft: '2px solid #ddd' }}>제휴사 포인트 전환 (P)</th>
            </tr>
            <tr>
              <th>DAU</th><th>신규</th>
              <th>AOS</th><th>iOS</th>
              <th>AOS</th><th>iOS</th>
              <th>AOS</th><th>iOS</th>
              <th>AOS</th><th>iOS</th>
              <th>AOS</th><th>iOS</th>
              <th style={{ borderLeft: '2px solid #ddd' }}>하나머니</th><th>신한카드</th><th>페이북</th><th>카카오페이</th>
            </tr>
          </thead>
          <tbody>
            {statsData.map((row, idx) => (
              <tr key={idx} style={row.isHighlight ? { background: '#f0f7ff', fontWeight: 'bold' } : {}}>
                <td style={{ position: 'sticky', left: 0, background: row.isHighlight ? '#f0f7ff' : '#fff', borderRight: '2px solid #ddd' }}>{row.date}</td>
                <td>{row.dau}</td>
                <td>{row.newUser}</td>
                <td>{row.checkAos}</td>
                <td>{row.checkIos}</td>
                <td>{row.walkAos}</td>
                <td>{row.walkIos}</td>
                <td>{row.missionAos}</td>
                <td>{row.missionIos}</td>
                <td>{row.raffleAos}</td>
                <td>{row.raffleIos}</td>
                <td>{row.shopAos}</td>
                <td>{row.shopIos}</td>
                <td style={{ background: row.isHighlight ? '#fff9e6' : '#fff', color: 'var(--admin-primary)' }}>{row.content}</td>
                <td style={{ borderLeft: '2px solid #ddd' }}>{row.hana}</td>
                <td>{row.shinhan}</td>
                <td>{row.paybook}</td>
                <td>{row.kakao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Stats;
