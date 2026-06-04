import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { isGoogleConfigured, signInWithGoogle } from '@/lib/google';
import { loginWithGoogle, type AuthUser } from '@/lib/resources';

export function GoogleButton({
  onSuccess,
  label = 'Continuar com Google',
}: {
  onSuccess: (user: AuthUser) => void;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    if (!isGoogleConfigured) {
      Alert.alert(
        'Google indisponível',
        'O login com Google ainda não foi configurado neste app. Defina EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID e reconstrua o app.'
      );
      return;
    }
    setLoading(true);
    try {
      const idToken = await signInWithGoogle();
      const { user } = await loginWithGoogle(idToken);
      onSuccess(user);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erro ao entrar com Google';
      // Silently ignore explicit user cancellation.
      if (!/cancel/i.test(message)) {
        Alert.alert('Erro', message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={handlePress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={Colors.text} />
      ) : (
        <View style={styles.content}>
          <View style={styles.gMark}>
            <Text style={styles.gText}>G</Text>
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { backgroundColor: Colors.surfaceMuted },
  content: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  gMark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gText: { fontSize: 14, fontWeight: FontWeight.extrabold, color: '#4285F4' },
  label: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text },
});
