import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextStyle, TextInputProps } from 'react-native';
import { colors } from '../../utils/colors';
import { commonStyles } from '../../utils/styles';

interface InputProps extends TextInputProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  style,
  textStyle,
  error = false,
  ...props
}) => {
  // 입력 필드 스타일 조합
  const inputStyle = [
    styles.base,
    error && styles.error,
    style,
  ];

  return (
    <TextInput
      style={inputStyle}
      placeholderTextColor={colors.text.disabled}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  // 기본 입력 필드 스타일
  base: {
    ...commonStyles.border.medium,
    borderRadius: commonStyles.borderRadius.medium,
    paddingHorizontal: commonStyles.padding.medium,
    paddingVertical: commonStyles.padding.medium,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.background.primary,
  },
  
  // 오류 상태 스타일
  error: {
    borderColor: colors.danger,
  },
});
