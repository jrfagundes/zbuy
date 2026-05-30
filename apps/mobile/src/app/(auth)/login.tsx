import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth';
import { login } from '@/lib/resources';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) return;
    setError(null);
    setLoading(true);
    try {
      const { user } = await login(email.trim().toLowerCase(), password);
      signIn(user);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao entrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Text style={styles.brandLetter}>Z</Text>
            </View>
            <Text style={styles.brandName}>ZBuy</Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Entrar no ZBuy</Text>
            <Text style={styles.subtitle}>
              Acesse suas listas e organize suas compras.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Input
              label="Senha"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              autoComplete="current-password"
            />

            {error ? (
              <Text style={styles.errorMessage}>{error}</Text>
            ) : null}

            <Button
              label="Entrar"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              disabled={!email.trim() || !password}
            />
          </View>

          {/* Footer links */}
          <View style={styles.footer}>
            <Link href="/(auth)/signup" style={styles.link}>
              Criar conta
            </Link>
            <Text style={styles.separator}>·</Text>
            <Link href="/(auth)/forgot-password" style={styles.link}>
              Esqueci minha senha
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing['3xl'],
  },

  // Brand
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing['2xl'],
  },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLetter: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.extrabold,
    color: '#ffffff',
  },
  brandName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
  },

  // Header
  header: {
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  // Form
  form: {
    gap: Spacing.base,
    marginBottom: Spacing.xl,
  },
  errorMessage: {
    fontSize: FontSize.sm,
    color: Colors.danger,
    textAlign: 'center',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  link: {
    fontSize: FontSize.sm,
    color: Colors.accent,
    fontWeight: FontWeight.semibold,
  },
  separator: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
});
