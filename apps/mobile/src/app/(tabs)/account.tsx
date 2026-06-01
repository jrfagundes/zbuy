import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { LayoutContributionConsentDto } from '@zbuy/shared';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth';
import {
  AuthUser,
  getCurrentUser,
  getLayoutConsent,
  updateLayoutConsent,
} from '@/lib/resources';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === '') return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AccountScreen() {
  const { user: authUser, signOut } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(authUser);
  const [consent, setConsent] = useState<LayoutContributionConsentDto | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [refreshing, setRefreshing] = useState(false);
  const [savingConsent, setSavingConsent] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const load = useCallback(async () => {
    try {
      const [userResponse, consentResponse] = await Promise.all([
        getCurrentUser(),
        getLayoutConsent().catch(() => null),
      ]);
      setUser(userResponse.user);
      setConsent(consentResponse);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  async function toggleConsent(value: boolean) {
    if (savingConsent) return;
    const previous = consent;
    setConsent((c) =>
      c
        ? {
            ...c,
            globalSharedLayoutContributionEnabled: value,
            effectiveSharedLayoutContributionEnabled: c.supermarketOverride ?? value,
          }
        : c
    );
    setSavingConsent(true);
    try {
      const updated = await updateLayoutConsent({
        globalSharedLayoutContributionEnabled: value,
      });
      setConsent(updated);
    } catch {
      setConsent(previous);
      Alert.alert('Erro', 'Não foi possível salvar sua preferência.');
    } finally {
      setSavingConsent(false);
    }
  }

  function confirmSignOut() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          setSigningOut(true);
          await signOut();
        },
      },
    ]);
  }

  if (status === 'loading') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'error') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Conta indisponível</Text>
          <Text style={styles.errorText}>Não foi possível validar sua sessão.</Text>
          <Button label="Tentar novamente" onPress={() => void load()} />
        </View>
      </SafeAreaView>
    );
  }

  const displayUser = user ?? authUser;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Conta</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.accent}
            colors={[Colors.accent]}
          />
        }
      >
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {displayUser ? initials(displayUser.name) : '?'}
            </Text>
          </View>
          <Text style={styles.name}>{displayUser?.name}</Text>
          <Text style={styles.email}>{displayUser?.email}</Text>
        </Card>

        <Text style={styles.sectionLabel}>ATALHOS</Text>
        <Card flush style={styles.menuCard}>
          <MenuRow icon="📋" label="Listas" onPress={() => router.push('/(tabs)/lists')} />
          <View style={styles.divider} />
          <MenuRow icon="📦" label="Produtos" onPress={() => router.push('/(tabs)/products')} />
          <View style={styles.divider} />
          <MenuRow icon="🕐" label="Histórico" onPress={() => router.push('/(tabs)/history')} />
        </Card>

        <Text style={styles.sectionLabel}>PRIVACIDADE</Text>
        <Card>
          <View style={styles.consentRow}>
            <View style={styles.consentInfo}>
              <Text style={styles.consentTitle}>
                Contribuir com layouts compartilhados
              </Text>
              <Text style={styles.consentDescription}>
                Layouts privados continuam privados; a contribuição usa apenas dados
                agregados de posicionamento.
              </Text>
            </View>
            <Switch
              value={consent?.globalSharedLayoutContributionEnabled ?? false}
              onValueChange={toggleConsent}
              disabled={savingConsent || !consent}
              trackColor={{ false: Colors.surfaceInput, true: Colors.accent }}
              thumbColor="#ffffff"
            />
          </View>
          {consent ? (
            <View style={styles.consentStatus}>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: consent.effectiveSharedLayoutContributionEnabled
                      ? Colors.success
                      : Colors.textSecondary,
                  },
                ]}
              />
              <Text style={styles.consentStatusText}>
                {consent.effectiveSharedLayoutContributionEnabled
                  ? 'Compartilhamento ativo'
                  : 'Compartilhamento inativo'}
              </Text>
            </View>
          ) : null}
        </Card>

        <View style={styles.signOutWrapper}>
          <Button
            label="Sair da conta"
            variant="secondary"
            onPress={confirmSignOut}
            loading={signingOut}
            fullWidth
          />
        </View>

        <Text style={styles.version}>ZBuy · versão 0.6</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuRow({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.menuRow, pressed && styles.menuRowPressed]}
      onPress={onPress}
    >
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.menuChevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: Radius.full,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: '#ffffff',
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  email: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.extrabold,
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: -Spacing.sm,
    marginTop: Spacing.xs,
  },
  menuCard: {
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  menuRowPressed: {
    backgroundColor: Colors.overlayLight,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuLabel: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  menuChevron: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 52,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  consentInfo: {
    flex: 1,
  },
  consentTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    marginBottom: 4,
  },
  consentDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  consentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.base,
    paddingTop: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  consentStatusText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  signOutWrapper: {
    marginTop: Spacing.sm,
  },
  version: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  errorIcon: {
    fontSize: 40,
  },
  errorTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
});
