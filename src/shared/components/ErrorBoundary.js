import React, { Component } from 'react';
import './ErrorBoundary.css';

/**
 * 에러 바운더리 컴포넌트
 * React 컴포넌트 트리에서 발생하는 JavaScript 에러를 잡아서
 * 폴백 UI를 보여주고 앱 전체가 크래시되는 것을 방지
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태 업데이트
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 (프로덕션에서는 에러 리포팅 서비스에 전송)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });

    // TODO: 프로덕션 환경에서는 에러 리포팅 서비스 연동
    // Example: Sentry.captureException(error);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // 커스텀 폴백이 제공된 경우
      if (fallback) {
        return fallback;
      }

      // 기본 에러 UI
      return (
        <div className="error-boundary" role="alert" aria-live="assertive">
          <div className="error-boundary-content">
            <div className="error-boundary-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="error-boundary-title">문제가 발생했습니다</h2>
            <p className="error-boundary-message">
              일시적인 오류가 발생했습니다.<br />
              잠시 후 다시 시도해 주세요.
            </p>
            {process.env.NODE_ENV === 'development' && error && (
              <details className="error-boundary-details">
                <summary>에러 상세 정보</summary>
                <pre>{error.toString()}</pre>
              </details>
            )}
            <div className="error-boundary-actions">
              <button
                className="error-boundary-btn error-boundary-btn--primary"
                onClick={this.handleRetry}
                aria-label="페이지 다시 시도"
              >
                다시 시도
              </button>
              <button
                className="error-boundary-btn error-boundary-btn--secondary"
                onClick={this.handleGoHome}
                aria-label="홈 페이지로 이동"
              >
                홈으로
              </button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
