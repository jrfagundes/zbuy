import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth';

export default function PurchasesScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0]} 👋</Text>
          <Text style={styles.title}>Compras</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Start purchase card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>INICIAR COMPRA</Text>
          <Text style={styles.cardDescription}>
            Selecione uma lista e comece sua jornada de compras físicas ou online.
          </Text>
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>Em breve</Text>
          </View>
        </View>

        {/* Recent section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SESSÕES RECENTES</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>Nenhuma sessão recente.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  greeting: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
    marginBottom: 2,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },

  // Card
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  cardLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.extrabold,
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  cardDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.base,
  },
  comingSoon: {
    alignSelf: 'flex-start',
    backgroundColor: `${Colors.accent}22`,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.borderAccent,
  },
  comingSoonText: {
    fontSize: FontSize.xs,
    color: Colors.accent,
    fontWeight: FontWeight.bold,
  },

  // Section
  section: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.extrabold,
    color: Colors.textSecondary,
    letterSpacing: 1,
  },

  // Empty
  emptyState: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing['2xl'],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});
