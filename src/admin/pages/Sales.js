import React, { useState } from 'react';
import Card from '../components/Card';

const salesData = [
  { date: '01-26 (일)', profit: '₩ 5,200,000', shinhan: '3,000,000', hana: '1,500,000', kakao: '500,000', insurance: '1,000,000', video: '1,500,000', da: '500,000', offer: '800,000', cps: '300,000', wdFee: '50,000', exFee: '50,000', withdraw: '3,000,000', coupon: '1,000,000', isHighlight: true },
  { date: '01-25 (토)', profit: '₩ 4,800,000', shinhan: '2,800,000', hana: '1,200,000', kakao: '400,000', insurance: '800,000', video: '1,300,000', da: '600,000', offer: '700,000', cps: '200,000', wdFee: '40,000', exFee: '40,000', withdraw: '2,500,000', coupon: '780,000' },
  { date: '01-24 (금)', profit: '₩ 5,500,000', shinhan: '3,200,000', hana: '1,600,000', kakao: '600,000', insurance: '1,100,000', video: '1,600,000', da: '550,000', offer: '850,000', cps: '350,000', wdFee: '55,000', exFee: '55,000', withdraw: '3,200,000', coupon: '1,100,000' },
  { date: '01-23 (목)', profit: '₩ 4,600,000', shinhan: '2,700,000', hana: '1,300,000', kakao: '450,000', insurance: '900,000', video: '1,400,000', da: '520,000', offer: '720,000', cps: '280,000', wdFee: '45,000', exFee: '45,000', withdraw: '2,800,000', coupon: '850,000' },
  { date: '01-22 (수)', profit: '₩ 5,100,000', shinhan: '2,900,000', hana: '1,450,000', kakao: '550,000', insurance: '950,000', video: '1,550,000', da: '580,000', offer: '780,000', cps: '320,000', wdFee: '48,000', exFee: '48,000', withdraw: '2,900,000', coupon: '920,000' },
];

function Sales() {
  const [selectedMonth, setSelectedMonth] = useState('2026년 1월');

  return (
    <>
      <div className="section-title">
        <span>월간 매출 현황 (손익 계산)</span>
        <select
          className="select-field"
          style={{ width: 150, margin: 0 }}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option>2026년 1월</option>
          <option>2025년 12월</option>
        </select>
      </div>

      <div className="card-grid">
        <Card
          label="총 매출 (수익)"
          value="+ ₩ 85,400,000"
          valueStyle={{ color: 'var(--admin-primary)' }}
        />
        <Card
          label="총 지급액 (비용)"
          value="- ₩ 30,200,000"
          valueStyle={{ color: 'var(--admin-danger)' }}
          sub="출금/기프티콘"
        />
        <Card label="영업 이익 (Net)" value="₩ 55,200,000" />
        <Card label="이익률" value="64.6%" valueStyle={{ fontSize: 24 }} />
      </div>

      <div className="section-title">일자별 상세 매출 (Profit & Loss)</div>
      <div className="table-container" style={{ maxHeight: 600, overflowX: 'auto', overflowY: 'auto' }}>
        <table className="admin-table" style={{ minWidth: 2000 }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <tr>
              <th rowSpan="2" style={{ background: '#fff', position: 'sticky', left: 0, zIndex: 20, borderRight: '2px solid #ddd' }}>일자</th>
              <th rowSpan="2" style={{ background: '#eef6ff' }}>일일 순수익</th>
              <th colSpan="4" className="group-header">제휴 매출 (+)</th>
              <th colSpan="3" className="group-header-ad">광고 매출 (+)</th>
              <th className="group-header-shop">쇼핑 매출 (+)</th>
              <th colSpan="2" className="group-header">수수료 수익 (+)</th>
              <th colSpan="2" className="group-header-cost" style={{ borderLeft: '2px solid #ffcccc' }}>비용/지급 (-)</th>
            </tr>
            <tr>
              <th>신한카드</th><th>하나페이</th><th>카카오페이</th><th>보험/대출</th>
              <th>동영상(Rwd)</th><th>직광고(DA)</th><th>오퍼월</th>
              <th>경유쇼핑(CPS)</th>
              <th>출금 수수료</th><th>교환 수수료</th>
              <th style={{ color: '#e03131', borderLeft: '2px solid #ffcccc' }}>현금 출금액</th>
              <th style={{ color: '#e03131' }}>쿠폰 매입비</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((row, idx) => (
              <tr key={idx} style={row.isHighlight ? { background: '#f0f7ff', fontWeight: 'bold' } : {}}>
                <td style={{ position: 'sticky', left: 0, background: row.isHighlight ? '#f0f7ff' : '#fff', borderRight: '2px solid #ddd' }}>{row.date}</td>
                <td style={{ color: 'var(--admin-primary)' }}>{row.profit}</td>
                <td>{row.shinhan}</td>
                <td>{row.hana}</td>
                <td>{row.kakao}</td>
                <td>{row.insurance}</td>
                <td>{row.video}</td>
                <td>{row.da}</td>
                <td>{row.offer}</td>
                <td>{row.cps}</td>
                <td>{row.wdFee}</td>
                <td>{row.exFee}</td>
                <td style={{ color: 'var(--admin-danger)', borderLeft: '2px solid #ffcccc' }}>- {row.withdraw}</td>
                <td style={{ color: 'var(--admin-danger)' }}>- {row.coupon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Sales;
