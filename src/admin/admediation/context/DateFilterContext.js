import React, { createContext, useContext, useState } from 'react';

const DateFilterContext = createContext();

export function DateFilterProvider({ children }) {
  const [dateFilter, setDateFilter] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 날짜 라벨 계산
  const getDateLabel = () => {
    const today = new Date();
    const formatDate = (date) => `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

    switch (dateFilter) {
      case 'today':
        return formatDate(today);
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return formatDate(yesterday);
      case 'thisMonth':
        return `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.01 ~ ${formatDate(today)}`;
      case 'lastMonth':
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        return `${formatDate(lastMonth)} ~ ${formatDate(lastMonthEnd)}`;
      case 'custom':
        if (startDate && endDate) {
          return `${startDate} ~ ${endDate}`;
        }
        return '기간 선택';
      default:
        return formatDate(today);
    }
  };

  // 날짜 필터 라벨 (짧은 버전)
  const getDateFilterLabel = () => {
    switch (dateFilter) {
      case 'today': return '오늘';
      case 'yesterday': return '어제';
      case 'thisMonth': return '이번 달';
      case 'lastMonth': return '저번 달';
      case 'custom': return '직접 설정';
      default: return '오늘';
    }
  };

  const value = {
    dateFilter,
    setDateFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    getDateLabel,
    getDateFilterLabel,
  };

  return (
    <DateFilterContext.Provider value={value}>
      {children}
    </DateFilterContext.Provider>
  );
}

export function useDateFilter() {
  const context = useContext(DateFilterContext);
  if (!context) {
    throw new Error('useDateFilter must be used within a DateFilterProvider');
  }
  return context;
}
