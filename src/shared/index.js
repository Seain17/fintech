/**
 * Shared 모듈 통합 export
 *
 * 사용 예시:
 * import { TIMING, formatNumber, maskPhone, AppLogo, useToast } from '@/shared';
 * 또는
 * import { TIMING, formatNumber } from '../shared';
 */

// Constants
export {
  TIMING,
  APP_DEFAULTS,
  NAVIGATION,
  STORAGE_KEYS,
  ATTENDANCE_MILESTONES,
  ATTENDANCE_CONFIG,
  BRAND_COLORS,
  LOAN_CATEGORIES,
  INSURANCE_CATEGORIES,
  API_ENDPOINTS,
  VALIDATION,
  PAGINATION,
} from './constants';

// Utils - Masking
export {
  maskName,
  maskEmail,
  maskPhone,
  maskAccount,
  maskAccountWithBank,
  maskSSN,
  maskCardNumber,
} from './utils';

// Utils - Formatting
export {
  formatNumber,
  formatPoints,
  formatCurrency,
  formatCurrencyShort,
  formatDate,
  formatRelativeTime,
  formatPercent,
  formatInterestRange,
  formatPhoneNumber,
} from './utils';

// Components
export {
  AppLogo,
  ErrorBoundary,
  Loading,
  PageLoading,
} from './components';

// Hooks
export {
  useToast,
  usePoints,
} from './hooks';

// Data
export {
  cardProducts,
  loanProducts,
  insuranceProducts,
  stockProducts,
  loanCategories,
  insuranceCategories,
  stockCategories,
} from './data/financeProducts';
