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
import { signup } from '@/lib/resources';

export default function SignupScreen() {
  const { signIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!name.trim() || !email.trim() || !password) return;
    setError(null);
    setLoading(true);
    try {
      const { user } = await signup(name.trim(), email.trim().toLowerCase(), password);
      signIn(user);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  }

  const isValid = name.trim().length >= 1 && email.trim().length >= 3 && password.length >= 6;

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
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>
              Comece a organizar suas compras de forma inteligente.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Nome"
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              autoCapitalize="words"
              autoComplete="name"
            />
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
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              autoComplete="new-password"
            />

            {error ? (
              <Text style={styles.errorMessage}>{error}</Text>
            ) : null}

            <Button
              label="Criar conta"
              onPress={handleSignup}
              loading={loading}
              fullWidth
              disabled={!isValid}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem conta?</Text>
            <Link href="/(auth)/login" style={styles.link}>
              Entrar
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

  form: {
    gap: Spacing.base,
    marginBottom: Spacing.xl,
  },
  errorMessage: {
    fontSize: FontSize.sm,
    color: Colors.danger,
    textAlign: 'center',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  footerText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  link: {
    fontSize: FontSize.sm,
    color: Colors.accent,
    fontWeight: FontWeight.semibold,
  },
});
