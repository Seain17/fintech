import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Table from '../components/Table';

const issuesData = [
  { time: '14:00', type: 'primary', typeText: '알림', content: '출금 신청이 5건 접수되었습니다.', status: 'warning', statusText: '대기' },
  { time: '13:30', type: 'success', typeText: '완료', content: '배너 업데이트가 완료되었습니다.', status: 'success', statusText: '처리완료' },
  { time: '12:15', type: 'danger', typeText: '긴급', content: '고객 문의 3건 미처리 상태입니다.', status: 'danger', statusText: '미처리' },
];

const columns = [
  { key: 'time', header: '시간' },
  {
    key: 'type',
    header: '유형',
    render: (_, row) => <Badge variant={row.type}>{row.typeText}</Badge>
  },
  { key: 'content', header: '내용' },
  {
    key: 'status',
    header: '상태',
    render: (_, row) => <Badge variant={row.status}>{row.statusText}</Badge>
  },
];

function Dashboard() {
  return (
    <>
      <div className="card-grid">
        <Card label="총 가입자" value="12,450" />
        <Card label="오늘 매출" value="₩ 850,000" />
        <Card label="대기 중 출금" value="23" />
        <Card label="미답변 문의" value="8" />
      </div>

      <div className="section-title">최근 주요 이슈</div>
      <Table columns={columns} data={issuesData} />
    </>
  );
}

export default Dashboard;
