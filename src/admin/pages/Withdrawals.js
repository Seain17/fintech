import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import { maskName, maskEmail, maskPhone, maskAccount } from '../../shared/utils';

const withdrawalTabs = [
  { id: 'all', label: '전체' },
  { id: 'pending', label: '대기' },
  { id: 'approved', label: '승인' },
  { id: 'rejected', label: '거부' },
];

const withdrawalsData = [
  { id: 'WD-20260125-001', name: '김철수', email: 'kim@email.com', phone: '010-1234-5678', date: '2026-01-25 14:20', amount: '₩ 100,000', amountRaw: 100000, bank: '국민은행', accountNumber: '123-456-789', status: 'pending', statusText: '대기', statusVariant: 'warning' },
  { id: 'WD-20260125-002', name: '이영희', email: 'lee@email.com', phone: '010-2345-6789', date: '2026-01-25 12:30', amount: '₩ 50,000', amountRaw: 50000, bank: '신한은행', accountNumber: '987-654-321', status: 'pending', statusText: '대기', statusVariant: 'warning' },
  { id: 'WD-20260124-050', name: '박민수', email: 'park@email.com', phone: '010-3456-7890', date: '2026-01-24 16:45', amount: '₩ 200,000', amountRaw: 200000, bank: '우리은행', accountNumber: '555-666-777', status: 'approved', statusText: '승인', statusVariant: 'success' },
];

const historyData = [
  { date: '2026-01-20', amount: '₩ 50,000', status: '완료' },
  { date: '2026-01-15', amount: '₩ 80,000', status: '완료' },
  { date: '2026-01-10', amount: '₩ 100,000', status: '완료' },
];

// 엑셀 다운로드 함수
const downloadExcel = (data) => {
  // CSV 형식으로 생성 (엑셀에서 열 수 있음)
  const headers = ['신청번호', '신청자', '이메일', '연락처', '신청일시', '금액', '은행', '계좌번호', '상태'];
  const rows = data.map(row => [
    row.id,
    row.name,
    row.email,
    row.phone,
    row.date,
    row.amountRaw,
    row.bank,
    row.accountNumber,
    row.statusText
  ]);

  // BOM 추가 (한글 깨짐 방지)
  const BOM = '\uFEFF';
  const csvContent = BOM + [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `출금신청_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

function Withdrawals() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  const filteredData = activeTab === 'all'
    ? withdrawalsData
    : withdrawalsData.filter(w => w.status === activeTab);

  if (selectedWithdrawal) {
    return (
      <div className="detail-view-container">
        <div className="detail-header">
          <div className="detail-title">출금 신청 상세</div>
          <div className="detail-actions">
            <Button variant="success" size="sm" onClick={() => alert('승인되었습니다.')}>승인</Button>
            <Button variant="danger" size="sm" onClick={() => alert('거부되었습니다.')}>거부</Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedWithdrawal(null)}>닫기</Button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24, background: '#fff9e6', borderColor: 'var(--admin-warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>⚠️</span>
            <div>
              <h3 style={{ marginBottom: 4 }}>출금 신청 대기 중</h3>
              <p style={{ color: 'var(--admin-text-sub)', fontSize: 13 }}>신청자 정보와 계좌 정보를 확인한 후 승인해주세요.</p>
            </div>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <div className="info-label">신청번호</div>
            <div className="info-value">{selectedWithdrawal.id}</div>
          </div>
          <div className="info-item">
            <div className="info-label">신청일시</div>
            <div className="info-value">{selectedWithdrawal.date}</div>
          </div>
          <div className="info-item">
            <div className="info-label">신청자</div>
            <div className="info-value">{maskName(selectedWithdrawal.name)}</div>
          </div>
          <div className="info-item">
            <div className="info-label">이메일</div>
            <div className="info-value">{maskEmail(selectedWithdrawal.email)}</div>
          </div>
          <div className="info-item">
            <div className="info-label">연락처</div>
            <div className="info-value">{maskPhone(selectedWithdrawal.phone)}</div>
          </div>
          <div className="info-item">
            <div className="info-label">회원번호</div>
            <div className="info-value">#1023</div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 24, marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16 }}>출금 정보</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">출금 금액</div>
              <div className="info-value" style={{ color: 'var(--admin-primary)', fontWeight: 700, fontSize: 24 }}>{selectedWithdrawal.amount}</div>
            </div>
            <div className="info-item">
              <div className="info-label">수수료</div>
              <div className="info-value">₩ 1,000</div>
            </div>
            <div className="info-item">
              <div className="info-label">실 지급액</div>
              <div className="info-value" style={{ fontWeight: 700, fontSize: 18 }}>₩ 99,000</div>
            </div>
            <div className="info-item">
              <div className="info-label">출금 후 잔액</div>
              <div className="info-value">₩ 250,000</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16 }}>계좌 정보</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">은행</div>
              <div className="info-value">{selectedWithdrawal.bank}</div>
            </div>
            <div className="info-item">
              <div className="info-label">계좌번호</div>
              <div className="info-value">{maskAccount(selectedWithdrawal.accountNumber)}</div>
            </div>
            <div className="info-item">
              <div className="info-label">예금주</div>
              <div className="info-value">{maskName(selectedWithdrawal.name)}</div>
            </div>
            <div className="info-item">
              <div className="info-label">확인 상태</div>
              <div className="info-value"><Badge variant="success">확인 완료</Badge></div>
            </div>
          </div>
        </div>

        <div className="section-title">신청자 출금 이력</div>
        <div className="table-container">
          <table className="admin-table">
            <thead><tr><th>신청일</th><th>금액</th><th>상태</th></tr></thead>
            <tbody>
              {historyData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td><Badge variant="success">{item.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-group" style={{ marginTop: 24 }}>
          <label className="form-label">관리자 메모</label>
          <textarea className="textarea-field" placeholder="출금 처리 시 메모를 남겨주세요."></textarea>
        </div>

        <div className="action-bar">
          <Button variant="success" onClick={() => alert('승인되었습니다.')}>승인 처리</Button>
          <Button variant="danger" onClick={() => alert('거부되었습니다.')}>거부 처리</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card-grid">
        <Card label="대기 중" value="23" />
        <Card label="오늘 처리" value="8" />
        <Card label="대기 금액" value="₩ 2.3M" />
        <Card label="오늘 지급" value="₩ 850K" />
      </div>

      <div className="section-title">
        <span>출금 신청 목록</span>
        <Button variant="outline" onClick={() => downloadExcel(filteredData)}>📥 엑셀 다운로드</Button>
      </div>

      <Tabs tabs={withdrawalTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <p style={{ fontSize: 12, color: 'var(--admin-text-sub)', marginBottom: 12 }}>
        ⚠️ 개인정보 보호를 위해 마스킹 처리되어 있습니다. 전체 정보는 엑셀 다운로드를 이용하세요.
      </p>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr><th>신청번호</th><th>신청자</th><th>신청일시</th><th>금액</th><th>계좌 정보</th><th>상태</th><th>관리</th></tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} onClick={() => setSelectedWithdrawal(row)}>
                <td>{row.id}</td>
                <td>{maskName(row.name)} ({maskEmail(row.email)})</td>
                <td>{row.date}</td>
                <td>{row.amount}</td>
                <td>{row.bank} {maskAccount(row.accountNumber)}</td>
                <td><Badge variant={row.statusVariant}>{row.statusText}</Badge></td>
                <td onClick={(e) => e.stopPropagation()}>
                  {row.status === 'pending' ? (
                    <Button variant="primary" size="sm">승인</Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setSelectedWithdrawal(row)}>상세</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Withdrawals;
