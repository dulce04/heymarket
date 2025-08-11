// 앱 전체에서 사용되는 색상 상수
export const colors = {
  // 주요 브랜드 색상
  primary: '#ff6b35',
  secondary: '#3b82f6',
  
  // 상태 색상
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  
  // 텍스트 색상
  text: {
    primary: '#111827',
    secondary: '#374151',
    tertiary: '#6b7280',
    disabled: '#9ca3af',
    inverse: '#ffffff',
  },
  
  // 배경 색상
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
  },
  
  // 테두리 색상
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  },
  
  // 그림자 색상
  shadow: {
    light: '#000000',
    primary: '#ff6b35',
  },
  
  // 오버레이 색상
  overlay: {
    dark: 'rgba(0, 0, 0, 0.6)',
    light: 'rgba(255, 255, 255, 0.9)',
  },
} as const;
