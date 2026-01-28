import React, { useState } from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Table from '../components/Table';
import Tabs from '../components/Tabs';

const membersData = [
  { no: 1024, name: '홍*동', email: 'hong@email.com', joinDate: '2025-08-15', birth: '1995-**-**', points: '26,350 P', totalWithdraw: '₩ 450,000', status: 'success', statusText: '정상' },
  { no: 1023, name: '김*희', email: 'kim@email.com', joinDate: '2025-09-20', birth: '1998-**-**', points: '15,200 P', totalWithdraw: '₩ 280,000', status: 'success', statusText: '정상' },
  { no: 1022, name: '박*수', email: 'park@email.com', joinDate: '2025-07-10', birth: '1992-**-**', points: '8,900 P', totalWithdraw: '₩ 120,000', status: 'gray', statusText: '휴면' },
];

const columns = [
  { key: 'no', header: 'No.' },
  { key: 'name', header: '회원명' },
  { key: 'email', header: '이메일' },
  { key: 'joinDate', header: '가입일' },
  { key: 'birth', header: '생년월일' },
  { key: 'points', header: '보유 포인트' },
  { key: 'totalWithdraw', header: '누적 출금' },
  {
    key: 'status',
    header: '상태',
    render: (_, row) => <Badge variant={row.status}>{row.statusText}</Badge>
  },
];

const memberTabs = [
  { id: 'point', label: '포인트 내역' },
  { id: 'withdrawal', label: '출금 내역' },
  { id: 'raffle', label: '래플 참여' },
  { id: 'gifticon', label: '기프티콘 교환' },
  { id: 'activity', label: '활동 로그' },
];

const pointHistory = [
  { date: '2026-01-25 14:20', content: '래플 응모', amount: '-500 P', balance: '26,350 P', isDeduct: true },
  { date: '2026-01-24 10:15', content: '출석 체크 보너스', amount: '+100 P', balance: '26,850 P', isDeduct: false },
  { date: '2026-01-23 18:30', content: '친구 추천 적립', amount: '+1,000 P', balance: '26,750 P', isDeduct: false },
];

const withdrawalHistory = [
  { id: 'WD-20260120-1024', date: '2026-01-20 13:20', amount: '₩ 100,000', account: '국민은행 123-456-789', status: 'success', statusText: '완료' },
  { id: 'WD-20260115-1024', date: '2026-01-15 09:30', amount: '₩ 50,000', account: '국민은행 123-456-789', status: 'success', statusText: '완료' },
];

// 계좌번호 마스킹 함수
const maskAccountNumber = (account) => {
  // "국민은행 123-456-789" -> "국민은행 123-***-789"
  const parts = account.split(' ');
  if (parts.length < 2) return account;

  const bankName = parts[0];
  const accountNum = parts.slice(1).join(' ');
  const numParts = accountNum.split('-');

  if (numParts.length >= 3) {
    // 중간 부분 마스킹
    const masked = numParts.map((part, idx) => {
      if (idx === 1) return '***';
      return part;
    }).join('-');
    return `${bankName} ${masked}`;
  }

  // 하이픈이 없는 경우 중간 4자리 마스킹
  if (accountNum.length > 6) {
    const start = accountNum.slice(0, 3);
    const end = accountNum.slice(-3);
    return `${bankName} ${start}****${end}`;
  }

  return account;
};

const raffleHistory = [
  { name: '에어팟 프로 2세대', date: '2026-01-25 14:20', status: 'gray', statusText: '추첨 대기' },
  { name: '갤럭시 버즈 프로', date: '2026-01-22 16:45', status: 'danger', statusText: '미당첨' },
  { name: '스타벅스 기프티콘', date: '2026-01-20 11:30', status: 'success', statusText: '당첨' },
];

const activityLog = [
  { date: '2026-01-25 14:32', content: '로그인 - 모바일 앱 (iOS)' },
  { date: '2026-01-25 14:20', content: '래플 응모 - 에어팟 프로 2세대' },
  { date: '2026-01-24 10:15', content: '출석 체크 - 연속 7일' },
  { date: '2026-01-23 18:30', content: '친구 추천 - kim@email.com 가입' },
];

function Members() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeTab, setActiveTab] = useState('point');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체 상태');

  const handleRowClick = (member) => {
    setSelectedMember(member);
    setActiveTab('point');
  };

  if (selectedMember) {
    return (
      <div className="detail-view-container">
        <div className="detail-header">
          <div className="detail-title">회원 상세 정보</div>
          <div className="detail-actions">
            <Button variant="danger" size="sm">회원 차단</Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedMember(null)}>닫기</Button>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-img">👤</div>
            <div className="profile-main">
              <div className="profile-name">{selectedMember.name}</div>
              <div className="profile-email">{selectedMember.email}</div>
              <div style={{ marginTop: 10 }}><Badge variant="success">정상 회원</Badge></div>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-label">보유 포인트</div>
              <div className="stat-value">26,350</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">누적 출금</div>
              <div className="stat-value">₩ 450K</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">래플 참여</div>
              <div className="stat-value">12회</div>
            </div>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <div className="info-label">회원번호</div>
            <div className="info-value">#{selectedMember.no}</div>
          </div>
          <div className="info-item">
            <div className="info-label">가입일</div>
            <div className="info-value">{selectedMember.joinDate}</div>
          </div>
          <div className="info-item">
            <div className="info-label">최근 접속</div>
            <div className="info-value">2026년 1월 25일 14:32</div>
          </div>
          <div className="info-item">
            <div className="info-label">연락처</div>
            <div className="info-value">010-1234-5678</div>
          </div>
        </div>

        <Tabs tabs={memberTabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'point' && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr><th>일시</th><th>내용</th><th>포인트</th><th>잔액</th></tr>
              </thead>
              <tbody>
                {pointHistory.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.date}</td>
                    <td>{item.content}</td>
                    <td style={{ color: item.isDeduct ? 'var(--admin-danger)' : 'var(--admin-success)' }}>{item.amount}</td>
                    <td>{item.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'withdrawal' && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr><th>신청번호</th><th>일시</th><th>금액</th><th>계좌정보</th><th>상태</th></tr>
              </thead>
              <tbody>
                {withdrawalHistory.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td>{maskAccountNumber(item.account)}</td>
                    <td><Badge variant={item.status}>{item.statusText}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'raffle' && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr><th>래플명</th><th>응모일</th><th>당첨 여부</th></tr>
              </thead>
              <tbody>
                {raffleHistory.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td><Badge variant={item.status}>{item.statusText}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="timeline">
            {activityLog.map((item, idx) => (
              <div className="timeline-item" key={idx}>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-content">{item.content}</div>
              </div>
            ))}
          </div>
        )}

        <div className="action-bar">
          <Button variant="outline">이메일 발송</Button>
          <Button variant="outline">포인트 지급</Button>
          <Button variant="danger">회원 차단</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="section-title">
        <span>회원 목록</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="text"
            className="input-field"
            style={{ width: 250, margin: 0 }}
            placeholder="이름, 이메일 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select-field"
            style={{ width: 150, margin: 0 }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>전체 상태</option>
            <option>정상</option>
            <option>휴면</option>
            <option>차단</option>
          </select>
          <Button variant="outline">엑셀 다운로드 (비밀번호 필요)</Button>
        </div>
      </div>
      <Table
        columns={columns}
        data={membersData}
        onRowClick={handleRowClick}
        renderActions={(row) => (
          <Button variant="outline" size="sm" onClick={() => handleRowClick(row)}>상세</Button>
        )}
      />
    </>
  );
}

export default Members;
