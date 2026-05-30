import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Button({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  onPress,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style ?? null,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#fff' : Colors.accent}
        />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'primary' && styles.labelPrimary,
            variant === 'secondary' && styles.labelSecondary,
            variant === 'ghost' && styles.labelGhost,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  fullWidth: {
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.accent,
    ...Shadow.button,
  },
  secondary: {
    backgroundColor: Colors.surfaceMuted,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  labelPrimary: {
    color: '#ffffff',
  },
  labelSecondary: {
    color: Colors.text,
  },
  labelGhost: {
    color: Colors.accent,
  },
});
