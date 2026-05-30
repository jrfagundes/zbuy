import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...rest}
        style={[
          styles.input,
          focused && styles.focused,
          error ? styles.errored : null,
          style,
        ]}
        placeholderTextColor={Colors.textSecondary}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  input: {
    height: 50,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.base,
    fontSize: FontSize.base,
    color: Colors.text,
  },
  focused: {
    borderColor: Colors.accent,
  },
  errored: {
    borderColor: Colors.danger,
  },
  errorText: {
    fontSize: FontSize.xs,
    color: Colors.danger,
  },
});
