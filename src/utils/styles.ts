import { colors } from './colors';

// 공통 스타일 패턴
export const commonStyles = {
  // 그림자 스타일
  shadow: {
    small: {
      shadowColor: colors.shadow.light,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: colors.shadow.light,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: colors.shadow.light,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    primary: {
      shadowColor: colors.shadow.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
  },
  
  // 테두리 스타일
  border: {
    light: {
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    medium: {
      borderWidth: 1,
      borderColor: colors.border.medium,
    },
    dark: {
      borderWidth: 1,
      borderColor: colors.border.dark,
    },
  },
  
  // 둥근 모서리
  borderRadius: {
    small: 6,
    medium: 8,
    large: 12,
    xlarge: 20,
    round: 50,
  },
  
  // 패딩
  padding: {
    small: 8,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  
  // 마진
  margin: {
    small: 8,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  
  // 간격
  gap: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
  },
} as const;

// 카드 스타일
export const cardStyles = {
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: commonStyles.borderRadius.medium,
    padding: commonStyles.padding.medium,
    marginBottom: commonStyles.margin.medium,
    ...commonStyles.shadow.small,
  },
  imageContainer: {
    backgroundColor: colors.background.primary,
    borderRadius: commonStyles.borderRadius.medium,
    padding: commonStyles.padding.medium,
    marginBottom: commonStyles.margin.medium,
    marginHorizontal: commonStyles.margin.medium,
    ...commonStyles.shadow.small,
  },
} as const;
