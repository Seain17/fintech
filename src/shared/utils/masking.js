/**
 * 개인정보 마스킹 유틸리티 함수
 * 이름, 이메일, 전화번호, 계좌번호 등의 민감 정보를 마스킹 처리
 */

/**
 * 이름 마스킹
 * @param {string} name - 마스킹할 이름
 * @returns {string} 첫 글자만 표시하고 나머지는 * 처리
 * @example maskName('김철수') => '김**'
 */
export const maskName = (name) => {
  if (!name || name.length < 2) return name;
  return name[0] + '*'.repeat(name.length - 1);
};

/**
 * 이메일 마스킹
 * @param {string} email - 마스킹할 이메일
 * @returns {string} 로컬 파트의 앞 2글자만 표시
 * @example maskEmail('kim@email.com') => 'ki*@email.com'
 */
export const maskEmail = (email) => {
  if (!email) return email;
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const maskedLocal = local.length > 2
    ? local.slice(0, 2) + '*'.repeat(local.length - 2)
    : local[0] + '*';
  return maskedLocal + '@' + domain;
};

/**
 * 전화번호 마스킹
 * @param {string} phone - 마스킹할 전화번호
 * @returns {string} 중간 번호 마스킹
 * @example maskPhone('010-1234-5678') => '010-****-78**'
 */
export const maskPhone = (phone) => {
  if (!phone) return phone;
  const parts = phone.split('-');
  if (parts.length === 3) {
    return parts[0] + '-****-' + parts[2].slice(-2) + '**';
  }
  return phone.slice(0, 3) + '****' + phone.slice(-2);
};

/**
 * 계좌번호 마스킹 (간단 버전)
 * @param {string} accountNumber - 마스킹할 계좌번호
 * @returns {string} 중간 부분 마스킹
 * @example maskAccount('123-456-789') => '12*-***-9*'
 */
export const maskAccount = (accountNumber) => {
  if (!accountNumber) return accountNumber;
  const parts = accountNumber.split('-');
  if (parts.length >= 2) {
    return parts[0].slice(0, 2) + '*-***-' + parts[parts.length - 1].slice(-2) + '*';
  }
  return accountNumber.slice(0, 3) + '***' + accountNumber.slice(-2);
};

/**
 * 계좌번호 마스킹 (은행명 포함 버전)
 * @param {string} account - 은행명과 계좌번호 (예: "국민은행 123-456-789")
 * @returns {string} 중간 부분 마스킹
 * @example maskAccountWithBank('국민은행 123-456-789') => '국민은행 123-***-789'
 */
export const maskAccountWithBank = (account) => {
  if (!account) return account;

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

/**
 * 주민등록번호 마스킹
 * @param {string} ssn - 주민등록번호 (예: "901225-1234567")
 * @returns {string} 뒷자리 전체 마스킹
 * @example maskSSN('901225-1234567') => '901225-*******'
 */
export const maskSSN = (ssn) => {
  if (!ssn) return ssn;
  const parts = ssn.split('-');
  if (parts.length === 2) {
    return parts[0] + '-*******';
  }
  // 하이픈 없는 경우
  if (ssn.length === 13) {
    return ssn.slice(0, 6) + '*******';
  }
  return ssn;
};

/**
 * 카드번호 마스킹
 * @param {string} cardNumber - 카드번호 (예: "1234-5678-9012-3456")
 * @returns {string} 중간 8자리 마스킹
 * @example maskCardNumber('1234-5678-9012-3456') => '1234-****-****-3456'
 */
export const maskCardNumber = (cardNumber) => {
  if (!cardNumber) return cardNumber;
  const parts = cardNumber.split('-');
  if (parts.length === 4) {
    return parts[0] + '-****-****-' + parts[3];
  }
  // 하이픈 없는 16자리
  if (cardNumber.length === 16) {
    return cardNumber.slice(0, 4) + '********' + cardNumber.slice(-4);
  }
  return cardNumber;
};
