import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextStyle, TextInputProps } from 'react-native';

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
  const inputStyle = [
    styles.base,
    error && styles.error,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    error && styles.errorText,
    textStyle,
  ];

  return (
    <TextInput
      style={inputStyle}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#111827',
  },
  error: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
  },
});
