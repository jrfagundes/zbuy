import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';

interface CardProps extends ViewProps {
  /** Use the muted (slightly lighter) surface instead of the default surface. */
  muted?: boolean;
  /** Remove the inner padding (for cards that host their own rows). */
  flush?: boolean;
}

export function Card({ children, style, muted, flush, ...rest }: CardProps) {
  return (
    <View
      {...rest}
      style={[
        styles.card,
        muted && styles.muted,
        flush && styles.flush,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    ...Shadow.card,
  },
  muted: {
    backgroundColor: Colors.surfaceMuted,
  },
  flush: {
    padding: 0,
  },
});
