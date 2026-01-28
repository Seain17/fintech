import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

const csData = [
  { id: 147, status: 'danger', statusText: '대기', title: '입금이 안되요', author: 'hong12', date: '2026-01-25 14:30', manager: '-' },
  { id: 146, status: 'danger', statusText: '대기', title: '래플 응모 오류', author: 'kim98', date: '2026-01-25 13:20', manager: '-' },
  { id: 145, status: 'success', statusText: '완료', title: '회원 탈퇴 문의', author: 'park77', date: '2026-01-25 10:15', manager: '관리자' },
];

const chatHistory = [
  { type: 'user', date: '2026-01-25 14:30', content: '안녕하세요. 포인트 충전을 위해 1만원을 입금했는데 포인트가 충전되지 않았습니다. 확인 부탁드립니다.' },
  { type: 'admin', date: '2026-01-25 15:10', content: '문의 주신 내용 확인하였습니다. 입금 내역 확인 중이오니 잠시만 기다려주시기 바랍니다.' },
  { type: 'user', date: '2026-01-25 16:20', content: '확인은 얼마나 걸리나요?' },
  { type: 'admin', date: '2026-01-25 16:30', content: '안녕하세요. 고객님. 입금 확인이 완료되었으며, 포인트가 정상적으로 충전되었습니다. 감사합니다.' },
];

function CustomerService() {
  const [selectedCS, setSelectedCS] = useState(null);
  const [statusFilter, setStatusFilter] = useState('전체 상태');

  if (selectedCS) {
    return (
      <div className="detail-view-container">
        <div className="detail-header">
          <div className="detail-title">문의 상세</div>
          <div className="detail-actions">
            <Button variant="danger" size="sm">삭제</Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedCS(null)}>닫기</Button>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <div className="info-label">문의 번호</div>
            <div className="info-value">#{selectedCS.id}</div>
          </div>
          <div className="info-item">
            <div className="info-label">작성자</div>
            <div className="info-value">홍*동 (hong@email.com)</div>
          </div>
          <div className="info-item">
            <div className="info-label">작성일시</div>
            <div className="info-value">{selectedCS.date}</div>
          </div>
          <div className="info-item">
            <div className="info-label">상태</div>
            <div className="info-value"><Badge variant={selectedCS.status}>답변 {selectedCS.statusText}</Badge></div>
          </div>
        </div>

        <div className="section-title" style={{ marginTop: 32 }}>문의 내용</div>
        <div className="card" style={{ background: '#f9fafb', padding: 24, marginBottom: 24 }}>
          <h4 style={{ marginBottom: 16, fontSize: 16 }}>{selectedCS.title}</h4>
          <p style={{ lineHeight: 1.8, color: 'var(--admin-text-main)' }}>
            안녕하세요. 포인트 충전을 위해 1만원을 입금했는데 포인트가 충전되지 않았습니다.<br />
            입금 시간: 2026-01-25 14:00<br />
            입금 계좌: 국민은행 123-456-789<br />
            입금자명: 홍길동<br /><br />
            확인 부탁드립니다.
          </p>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--admin-border)', display: 'flex', gap: 10 }}>
            <Button variant="outline" size="sm">첨부파일_1.jpg</Button>
            <Button variant="outline" size="sm">첨부파일_2.jpg</Button>
          </div>
        </div>

        <div className="section-title">답변 히스토리</div>
        <div className="chat-history">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.type}`}>
              <div className={`chat-bubble ${msg.type}`}>
                <div className="chat-meta">
                  <strong>{msg.type === 'user' ? '유저 문의' : '관리자 답변'}</strong> - {msg.date}
                </div>
                <div className="chat-content">{msg.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-title" style={{ marginTop: 32 }}>답변 작성</div>
        <div className="form-group">
          <label className="form-label">답변 내용</label>
          <textarea className="textarea-field" style={{ height: 200 }} placeholder="고객님께 전달할 답변을 작성해주세요."></textarea>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label className="form-label">담당자</label>
            <input type="text" className="input-field" value="관리자" readOnly />
          </div>
          <div className="form-col">
            <label className="form-label">답변 상태</label>
            <select className="select-field">
              <option>답변 완료</option>
              <option>추가 확인 필요</option>
            </select>
          </div>
        </div>

        <div className="action-bar">
          <Button variant="outline">임시 저장</Button>
          <Button variant="outline">재답변</Button>
          <Button variant="primary" onClick={() => { setSelectedCS(null); alert('답변이 등록되었습니다.'); }}>답변 등록</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card-grid">
        <Card label="전체 문의" value="247" />
        <Card label="미답변" value="8" valueStyle={{ color: 'var(--admin-danger)' }} />
        <Card label="답변 완료" value="239" />
        <Card label="평균 응답 시간" value="2.3h" valueStyle={{ fontSize: 20 }} />
      </div>

      <div className="section-title">
        <span>1:1 문의 관리</span>
        <select
          className="select-field"
          style={{ width: 150, margin: 0 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>전체 상태</option>
          <option>대기</option>
          <option>답변완료</option>
        </select>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr><th>No.</th><th>상태</th><th>제목</th><th>작성자</th><th>작성일</th><th>담당자</th><th>관리</th></tr>
          </thead>
          <tbody>
            {csData.map((item) => (
              <tr key={item.id} onClick={() => setSelectedCS(item)}>
                <td>{item.id}</td>
                <td><Badge variant={item.status}>{item.statusText}</Badge></td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.date}</td>
                <td>{item.manager}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  {item.status === 'danger' ? (
                    <Button variant="primary" size="sm" onClick={() => setSelectedCS(item)}>답변</Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setSelectedCS(item)}>상세</Button>
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

export default CustomerService;
