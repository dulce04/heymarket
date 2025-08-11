import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../utils/colors';
import { commonStyles } from '../../utils/styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  // 버튼 스타일 조합
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  // 텍스트 스타일 조합
  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyleCombined}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 기본 버튼 스타일
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: commonStyles.borderRadius.medium,
  },
  
  // 변형 스타일
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    ...commonStyles.border.medium,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  
  // 크기별 스타일
  small: {
    paddingHorizontal: commonStyles.padding.medium,
    paddingVertical: commonStyles.padding.small,
    borderRadius: commonStyles.borderRadius.small,
  },
  medium: {
    paddingHorizontal: commonStyles.padding.medium,
    paddingVertical: commonStyles.padding.medium,
    borderRadius: commonStyles.borderRadius.medium,
  },
  large: {
    paddingHorizontal: commonStyles.padding.large,
    paddingVertical: commonStyles.padding.medium,
    borderRadius: commonStyles.borderRadius.large,
  },
  
  // 텍스트 스타일
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: colors.text.inverse,
  },
  secondaryText: {
    color: colors.text.inverse,
  },
  outlineText: {
    color: colors.text.secondary,
  },
  dangerText: {
    color: colors.text.inverse,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // 상태별 스타일
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.text.disabled,
  },
});
