import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ShoppingJourneyHistoryStopDto } from '@zbuy/shared';

import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { listHistoryJourneyStops } from '@/lib/resources';

// ─── helpers ────────────────────────────────────────────────────────────────

/** Agrupa paradas pelo journeyId e calcula totais por jornada */
interface JourneyGroup {
  journeyId: string;
  sourceLists: { id: string; name: string }[];
  supermarkets: string[];
  knownTotal: string;
  itemCounts: { bought: number; notFound: number; unprocessed: number };
  completedAt: string; // data da última parada
}

function groupByJourney(stops: ShoppingJourneyHistoryStopDto[]): JourneyGroup[] {
  const map = new Map<string, JourneyGroup>();

  for (const stop of stops) {
    if (!map.has(stop.journeyId)) {
      map.set(stop.journeyId, {
        journeyId: stop.journeyId,
        sourceLists: stop.sourceLists,
        supermarkets: [],
        knownTotal: stop.knownTotal,
        itemCounts: { bought: 0, notFound: 0, unprocessed: 0 },
        completedAt: stop.finishedAt ?? stop.startedAt,
      });
    }
    const g = map.get(stop.journeyId)!;

    if (!g.supermarkets.includes(stop.supermarketName)) {
      g.supermarkets.push(stop.supermarketName);
    }
    g.itemCounts.bought += stop.itemCounts.bought;
    g.itemCounts.notFound += stop.itemCounts.notFound;
    g.itemCounts.unprocessed += stop.itemCounts.unprocessed;
    // knownTotal vem já acumulado do backend (total da jornada)
    g.knownTotal = stop.knownTotal;
    if (stop.finishedAt && stop.finishedAt > g.completedAt) {
      g.completedAt = stop.finishedAt;
    }
  }

  return Array.from(map.values());
}

/** Agrupa jornadas por mês/ano para usar como seções */
interface Section {
  title: string; // ex: "Junho 2026"
  data: JourneyGroup[];
}

function toMonthLabel(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
}

function formatCurrency(value: string): string {
  const n = parseFloat(value);
  if (isNaN(n)) return 'R$ —';
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function buildSections(groups: JourneyGroup[]): Section[] {
  const byMonth = new Map<string, JourneyGroup[]>();
  for (const g of groups) {
    const label = toMonthLabel(g.completedAt);
    if (!byMonth.has(label)) byMonth.set(label, []);
    byMonth.get(label)!.push(g);
  }
  return Array.from(byMonth.entries()).map(([title, data]) => ({ title, data }));
}

// ─── sub-components ──────────────────────────────────────────────────────────

function JourneyCard({ group, onPress }: { group: JourneyGroup; onPress: () => void }) {
  const total = parseFloat(group.knownTotal);
  const allItems = group.itemCounts.bought + group.itemCounts.notFound + group.itemCounts.unprocessed;
  const pct = allItems > 0 ? Math.round((group.itemCounts.bought / allItems) * 100) : 0;

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={onPress}>
      {/* Data + supermercados */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardDate}>{formatDate(group.completedAt)}</Text>
        <Text style={styles.cardTotal}>{isNaN(total) ? '—' : formatCurrency(group.knownTotal)}</Text>
      </View>

      <Text style={styles.cardSuper} numberOfLines={1}>
        🏪 {group.supermarkets.join(' → ')}
      </Text>

      <Text style={styles.cardLists} numberOfLines={1}>
        📋 {group.sourceLists.map((l) => l.name).join(', ')}
      </Text>

      {/* Barra de progresso */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct}%` }]} />
      </View>

      {/* Contadores */}
      <View style={styles.counters}>
        <View style={styles.counter}>
          <Text style={[styles.counterValue, { color: Colors.success }]}>{group.itemCounts.bought}</Text>
          <Text style={styles.counterLabel}>comprados</Text>
        </View>
        <View style={styles.counter}>
          <Text style={[styles.counterValue, { color: Colors.danger }]}>{group.itemCounts.notFound}</Text>
          <Text style={styles.counterLabel}>não encontr.</Text>
        </View>
        {group.itemCounts.unprocessed > 0 && (
          <View style={styles.counter}>
            <Text style={[styles.counterValue, { color: Colors.textSecondary }]}>
              {group.itemCounts.unprocessed}
            </Text>
            <Text style={styles.counterLabel}>não marcados</Text>
          </View>
        )}
        <View style={[styles.counter, styles.counterRight]}>
          <Text style={[styles.counterValue, { color: Colors.accent }]}>{pct}%</Text>
          <Text style={styles.counterLabel}>taxa</Text>
        </View>
      </View>
    </Pressable>
  );
}

// ─── screen ──────────────────────────────────────────────────────────────────

export default function HistoryScreen() {
  const router = useRouter();
  const [stops, setStops] = useState<ShoppingJourneyHistoryStopDto[]>([]);
  const [loadStatus, setLoadStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const { shoppingJourneyStops } = await listHistoryJourneyStops();
      setStops(shoppingJourneyStops);
      setLoadStatus('ready');
    } catch {
      setLoadStatus('error');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const sections = useMemo(() => {
    const groups = groupByJourney(stops);
    return buildSections(groups);
  }, [stops]);

  if (loadStatus === 'loading') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator color={Colors.accent} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico</Text>
        {stops.length > 0 && (
          <Text style={styles.subtitle}>{groupByJourney(stops).length} jornadas</Text>
        )}
      </View>

      {loadStatus === 'error' ? (
        <View style={styles.center}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>Não foi possível carregar o histórico.</Text>
          <Pressable style={styles.retryBtn} onPress={load}>
            <Text style={styles.retryBtnText}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : sections.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>Sem jornadas concluídas</Text>
          <Text style={styles.emptyDesc}>
            Suas compras físicas concluídas aparecerão aqui.
          </Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.journeyId}
          renderItem={({ item }) => (
            <JourneyCard
              group={item}
              onPress={() => router.push(`/journeys/${item.journeyId}`)}
            />
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent} />
          }
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled
        />
      )}
    </SafeAreaView>
  );
}

// ─── styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.xl,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },

  // Section header
  sectionHeader: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.extrabold,
    color: Colors.textSecondary,
    letterSpacing: 1.2,
  },

  // List
  listContent: {
    paddingBottom: Spacing['2xl'],
  },

  // Card
  card: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  cardPressed: {
    opacity: 0.75,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  cardDate: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  cardTotal: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.extrabold,
    color: Colors.accent,
  },
  cardSuper: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  cardLists: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: Radius.full,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: Radius.full,
  },
  counters: {
    flexDirection: 'row',
    gap: Spacing.base,
    marginTop: 2,
  },
  counter: {
    alignItems: 'center',
  },
  counterRight: {
    marginLeft: 'auto',
  },
  counterValue: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.extrabold,
  },
  counterLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },

  // Empty / Error
  emptyIcon: { fontSize: 40 },
  emptyTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: 'center',
  },
  emptyDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorIcon: { fontSize: 36 },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  retryBtnText: {
    color: Colors.accent,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm,
  },
});
