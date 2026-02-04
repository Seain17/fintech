import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import Toggle from '../components/Toggle';

const benefitsTabs = [
  { id: 'raffle', label: '래플' },
  { id: 'shopping', label: '쇼핑적립' },
  { id: 'partner', label: '제휴사 상품' },
];

const raffleCards = [
  { id: 1, icon: '🎧', name: '에어팟 프로 2세대', current: 342, max: 500, status: 'primary', statusText: '진행중' },
  { id: 2, icon: '💻', name: '맥북 프로 14', current: 128, max: 1000, status: 'primary', statusText: '진행중' },
  { id: 3, icon: '☕', name: '스타벅스 기프티콘', current: 500, max: 500, status: 'success', statusText: '추첨완료' },
];

const initialRaffleData = [
  { id: 1, icon: '🎧', name: '에어팟 프로 2세대', max: '500명', current: '342명', period: '2026-01-20 ~ 01-31', active: true },
  { id: 2, icon: '💻', name: '맥북 프로 14', max: '1000명', current: '128명', period: '2026-01-15 ~ 02-15', active: true },
  { id: 3, icon: '☕', name: '스타벅스 기프티콘', max: '500명', current: '500명', period: '2026-01-10 ~ 01-20', active: false },
];

const initialShoppingData = [
  { id: 1, name: '쿠팡', rate: '2.5%', active: true, date: '2026-01-20' },
  { id: 2, name: 'G마켓', rate: '3.0%', active: true, date: '2026-01-18' },
  { id: 3, name: '11번가', rate: '2.0%', active: false, date: '2026-01-15' },
];

const initialPartnerData = [
  { id: 1, partner: '신한카드', product: '신한카드 체크카드', fee: '50,000원', active: true, date: '2026-01-22' },
  { id: 2, partner: '삼성화재', product: '자동차보험', fee: '80,000원', active: true, date: '2026-01-20' },
  { id: 3, partner: '카카오페이', product: '카카오페이 가입', fee: '10,000원', active: false, date: '2026-01-15' },
];

const raffleParticipants = [
  { no: 1, name: '홍길동', date: '2026-01-25 14:20', status: 'gray', statusText: '추첨 대기' },
  { no: 2, name: '김영희', date: '2026-01-25 13:15', status: 'gray', statusText: '추첨 대기' },
  { no: 3, name: '박철수', date: '2026-01-25 11:30', status: 'gray', statusText: '추첨 대기' },
];

function Benefits() {
  const [activeTab, setActiveTab] = useState('raffle');
  const [detailView, setDetailView] = useState(null);
  const [raffles, setRaffles] = useState(initialRaffleData);
  const [shopping, setShopping] = useState(initialShoppingData);
  const [partners, setPartners] = useState(initialPartnerData);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragTarget, setDragTarget] = useState(null); // 'raffle' | 'shopping' | 'partner'
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // 래플 상태 토글
  const handleRaffleToggle = (id, checked) => {
    setRaffles(raffles.map(item =>
      item.id === id ? { ...item, active: checked } : item
    ));
  };

  // 쇼핑적립 상태 토글
  const handleShoppingToggle = (id, checked) => {
    setShopping(shopping.map(item =>
      item.id === id ? { ...item, active: checked } : item
    ));
  };

  // 제휴사 상품 상태 토글
  const handlePartnerToggle = (id, checked) => {
    setPartners(partners.map(item =>
      item.id === id ? { ...item, active: checked } : item
    ));
  };

  // 드래그 시작
  const handleDragStart = (e, index, target) => {
    setDraggedIndex(index);
    setDragTarget(target || 'raffle');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragTarget(null);
    setDragOverIndex(null);
  };

  // 드래그 오버 (드롭 허용)
  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  // 드롭 시 순서 변경 (공통)
  const handleDrop = (e, dropIndex, target) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    if (target === 'shopping') {
      const newList = [...shopping];
      const item = newList[draggedIndex];
      newList.splice(draggedIndex, 1);
      newList.splice(dropIndex, 0, item);
      setShopping(newList);
    } else if (target === 'partner') {
      const newList = [...partners];
      const item = newList[draggedIndex];
      newList.splice(draggedIndex, 1);
      newList.splice(dropIndex, 0, item);
      setPartners(newList);
    } else {
      const newRaffles = [...raffles];
      const draggedItem = newRaffles[draggedIndex];
      newRaffles.splice(draggedIndex, 1);
      newRaffles.splice(dropIndex, 0, draggedItem);
      setRaffles(newRaffles);
    }
    setDraggedIndex(null);
    setDragTarget(null);
    setDragOverIndex(null);
  };

  const renderRaffleDetail = () => (
    <div className="detail-view-container">
      <div className="detail-header">
        <div className="detail-title">래플 상품 등록/수정</div>
        <Button variant="outline" size="sm" onClick={() => setDetailView(null)}>취소</Button>
      </div>

      <div className="card" style={{ marginBottom: 24, textAlign: 'center', padding: 40 }}>
        <div className="image-upload-box">
          <div>
            <div style={{ fontSize: 64, marginBottom: 12 }}>🎁</div>
            <div style={{ fontSize: 14, color: 'var(--admin-text-sub)' }}>상품 이미지 업로드</div>
            <div style={{ fontSize: 12, color: 'var(--admin-text-sub)', marginTop: 8 }}>권장 크기: 800 x 800px</div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">상품명</label>
        <input type="text" className="input-field" placeholder="예: 에어팟 프로 2세대" />
      </div>

      <div className="form-group">
        <label className="form-label">상품 설명</label>
        <textarea className="textarea-field" style={{ height: 120 }} placeholder="상품에 대한 상세 설명을 입력하세요"></textarea>
      </div>

      <div className="form-group">
        <label className="form-label">최대 참여 인원</label>
        <input type="number" className="input-field" placeholder="500" min="1" />
      </div>

      <div className="form-row">
        <div className="form-col">
          <label className="form-label">당첨 인원</label>
          <input type="number" className="input-field" defaultValue="1" min="1" />
        </div>
        <div className="form-col">
          <label className="form-label">상품 가치</label>
          <input type="number" className="input-field" placeholder="350000" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-col">
          <label className="form-label">시작일</label>
          <input type="datetime-local" className="input-field" />
        </div>
        <div className="form-col">
          <label className="form-label">종료일</label>
          <input type="datetime-local" className="input-field" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-col">
          <label className="form-label">추첨일</label>
          <input type="datetime-local" className="input-field" />
        </div>
        <div className="form-col">
          <label className="form-label">상태</label>
          <select className="select-field">
            <option>진행 예정</option>
            <option>진행 중</option>
            <option>마감</option>
            <option>추첨 완료</option>
          </select>
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 32 }}>참여자 목록</div>
      <div className="table-container">
        <table className="admin-table">
          <thead><tr><th>No.</th><th>회원명</th><th>응모일시</th><th>당첨 여부</th></tr></thead>
          <tbody>
            {raffleParticipants.map((item) => (
              <tr key={item.no}>
                <td>{item.no}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td><Badge variant={item.status}>{item.statusText}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="action-bar">
        <Button variant="danger">삭제</Button>
        <Button variant="outline">추첨하기</Button>
        <Button variant="primary" onClick={() => { setDetailView(null); alert('저장되었습니다.'); }}>저장</Button>
      </div>
    </div>
  );

  const renderShoppingDetail = () => (
    <div className="detail-view-container">
      <div className="detail-header">
        <div className="detail-title">쇼핑적립 상품 등록/수정</div>
        <Button variant="outline" size="sm" onClick={() => setDetailView(null)}>취소</Button>
      </div>
      <div className="form-group">
        <label className="form-label">쇼핑몰명</label>
        <input type="text" className="input-field" placeholder="예: 쿠팡" />
      </div>
      <div className="form-group">
        <label className="form-label">적립률 (%)</label>
        <input type="number" className="input-field" placeholder="2.5" step="0.1" />
      </div>
      <div className="action-bar">
        <Button variant="danger">삭제</Button>
        <Button variant="primary" onClick={() => { setDetailView(null); alert('저장되었습니다.'); }}>저장</Button>
      </div>
    </div>
  );

  const renderPartnerDetail = () => (
    <div className="detail-view-container">
      <div className="detail-header">
        <div className="detail-title">제휴사 상품 등록/수정</div>
        <Button variant="outline" size="sm" onClick={() => setDetailView(null)}>취소</Button>
      </div>
      <div className="form-group">
        <label className="form-label">제휴사명</label>
        <input type="text" className="input-field" placeholder="예: 신한카드" />
      </div>
      <div className="form-group">
        <label className="form-label">상품명</label>
        <input type="text" className="input-field" placeholder="예: 신한카드 체크카드" />
      </div>
      <div className="form-group">
        <label className="form-label">수수료 (원)</label>
        <input type="number" className="input-field" placeholder="50000" />
      </div>
      <div className="action-bar">
        <Button variant="danger">삭제</Button>
        <Button variant="primary" onClick={() => { setDetailView(null); alert('저장되었습니다.'); }}>저장</Button>
      </div>
    </div>
  );

  if (detailView === 'raffle') return renderRaffleDetail();
  if (detailView === 'shopping') return renderShoppingDetail();
  if (detailView === 'partner') return renderPartnerDetail();

  return (
    <>
      <Tabs tabs={benefitsTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'raffle' && (
        <div className="tab-content active">
          <div className="section-title">
            <span>🎁 래플 관리</span>
            <Button variant="primary" onClick={() => setDetailView('raffle')}>+ 상품 등록</Button>
          </div>

          <div className="card-grid">
            {raffleCards.map((item) => (
              <Card
                key={item.id}
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => setDetailView('raffle')}
              >
                <div style={{ fontSize: 60, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{item.name}</div>
                <div style={{ fontSize: 13, color: 'var(--admin-text-sub)', marginBottom: 12 }}>
                  참여: {item.current}명 / {item.max}명
                </div>
                <Badge variant={item.status}>{item.statusText}</Badge>
              </Card>
            ))}
          </div>

          <div className="section-title" style={{ marginTop: 40 }}>래플 내역</div>
          <p style={{ fontSize: 12, color: 'var(--admin-text-sub)', marginBottom: 12 }}>
            ↕ 행을 드래그하여 순서를 변경할 수 있습니다
          </p>
          <div className="table-container">
            <table className="admin-table">
              <thead><tr><th style={{ width: 60 }}>순서</th><th>상품명</th><th>최대 인원</th><th>현재 참여</th><th>기간</th><th>상태</th><th>관리</th></tr></thead>
              <tbody>
                {raffles.map((item, index) => (
                  <tr
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index, 'raffle')}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index, 'raffle')}
                    style={{ cursor: 'grab' }}
                    className={`${dragTarget === 'raffle' && draggedIndex === index ? 'dragging' : ''} ${dragTarget === 'raffle' && dragOverIndex === index && draggedIndex !== index ? 'drag-over' : ''}`}
                  >
                    <td>
                      <span className="drag-handle">☰</span><span className="order-number">{index + 1}</span>
                    </td>
                    <td onClick={() => setDetailView('raffle')}><span style={{ marginRight: 8 }}>{item.icon}</span>{item.name}</td>
                    <td>{item.max}</td>
                    <td>{item.current}</td>
                    <td>{item.period}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Toggle checked={item.active} onChange={(checked) => handleRaffleToggle(item.id, checked)} />
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm" onClick={() => setDetailView('raffle')}>상세</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'shopping' && (
        <div className="tab-content active">
          <div className="section-title">
            <span>🛒 쇼핑적립 상품 관리</span>
            <Button variant="primary" onClick={() => setDetailView('shopping')}>+ 상품 등록</Button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--admin-text-sub)', marginBottom: 12 }}>
            ↕ 행을 드래그하여 순서를 변경할 수 있습니다
          </p>
          <div className="table-container">
            <table className="admin-table">
              <thead><tr><th style={{ width: 60 }}>순서</th><th>쇼핑몰</th><th>적립률</th><th>상태</th><th>등록일</th><th>관리</th></tr></thead>
              <tbody>
                {shopping.map((item, index) => (
                  <tr
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index, 'shopping')}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index, 'shopping')}
                    style={{ cursor: 'grab' }}
                    className={`${dragTarget === 'shopping' && draggedIndex === index ? 'dragging' : ''} ${dragTarget === 'shopping' && dragOverIndex === index && draggedIndex !== index ? 'drag-over' : ''}`}
                  >
                    <td><span className="drag-handle">☰</span><span className="order-number">{index + 1}</span></td>
                    <td onClick={() => setDetailView('shopping')}>{item.name}</td>
                    <td>{item.rate}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Toggle checked={item.active} onChange={(checked) => handleShoppingToggle(item.id, checked)} />
                    </td>
                    <td>{item.date}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm" onClick={() => setDetailView('shopping')}>수정</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'partner' && (
        <div className="tab-content active">
          <div className="section-title">
            <span>🤝 제휴사 상품 관리</span>
            <Button variant="primary" onClick={() => setDetailView('partner')}>+ 상품 등록</Button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--admin-text-sub)', marginBottom: 12 }}>
            ↕ 행을 드래그하여 순서를 변경할 수 있습니다
          </p>
          <div className="table-container">
            <table className="admin-table">
              <thead><tr><th style={{ width: 60 }}>순서</th><th>제휴사</th><th>상품명</th><th>수수료</th><th>상태</th><th>등록일</th><th>관리</th></tr></thead>
              <tbody>
                {partners.map((item, index) => (
                  <tr
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index, 'partner')}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index, 'partner')}
                    style={{ cursor: 'grab' }}
                    className={`${dragTarget === 'partner' && draggedIndex === index ? 'dragging' : ''} ${dragTarget === 'partner' && dragOverIndex === index && draggedIndex !== index ? 'drag-over' : ''}`}
                  >
                    <td><span className="drag-handle">☰</span><span className="order-number">{index + 1}</span></td>
                    <td onClick={() => setDetailView('partner')}>{item.partner}</td>
                    <td>{item.product}</td>
                    <td>{item.fee}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Toggle checked={item.active} onChange={(checked) => handlePartnerToggle(item.id, checked)} />
                    </td>
                    <td>{item.date}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm" onClick={() => setDetailView('partner')}>수정</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Benefits;
