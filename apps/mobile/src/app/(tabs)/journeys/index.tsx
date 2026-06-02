import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type {
  ShoppingJourneyDetailDto,
  ShoppingListSummaryDto,
  StartShoppingJourneyRequest,
  SupermarketDto,
} from '@zbuy/shared';

import { Button } from '@/components/ui/Button';
import { FormSheet } from '@/components/ui/FormSheet';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import {
  cancelJourney,
  completeJourney,
  getActiveJourney,
  listShoppingLists,
  listSupermarkets,
  startJourney,
} from '@/lib/resources';

export default function JourneysScreen() {
  const router = useRouter();
  const [activeJourney, setActiveJourney] = useState<ShoppingJourneyDetailDto | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [refreshing, setRefreshing] = useState(false);
  const [startSheetOpen, setStartSheetOpen] = useState(false);

  // Start journey form state
  const [lists, setLists] = useState<ShoppingListSummaryDto[]>([]);
  const [supermarkets, setSupermarkets] = useState<SupermarketDto[]>([]);
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [selectedSupermarketId, setSelectedSupermarketId] = useState<string>('');
  const [starting, setStarting] = useState(false);

  const load = useCallback(async () => {
    try {
      const journey = await getActiveJourney();
      setActiveJourney(journey);
      setStatus('ready');
    } catch {
      setStatus('error');
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

  async function openStartSheet() {
    try {
      const [{ shoppingLists }, { supermarkets: sups }] = await Promise.all([
        listShoppingLists(),
        listSupermarkets(),
      ]);
      const activeLists = shoppingLists.filter((l) => l.status === 'active');
      setLists(activeLists);
      setSupermarkets(sups);
      setSelectedListIds([]);
      setSelectedSupermarketId(sups[0]?.id ?? '');
      setStartSheetOpen(true);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar listas e supermercados.');
    }
  }

  function toggleListSelection(id: string) {
    setSelectedListIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleStartJourney() {
    if (selectedListIds.length === 0) {
      Alert.alert('Atenção', 'Selecione ao menos uma lista.');
      return;
    }
    if (!selectedSupermarketId) {
      Alert.alert('Atenção', 'Selecione um supermercado.');
      return;
    }
    setStarting(true);
    try {
      const req: StartShoppingJourneyRequest = {
        sourceListIds: selectedListIds,
        supermarketId: selectedSupermarketId,
      };
      const journey = await startJourney(req);
      setStartSheetOpen(false);
      setActiveJourney(journey);
      router.push(`/journeys/${journey.id}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erro ao iniciar jornada.';
      Alert.alert('Erro', msg);
    } finally {
      setStarting(false);
    }
  }

  async function handleComplete() {
    if (!activeJourney) return;
    Alert.alert('Concluir jornada', 'Deseja finalizar esta jornada de compras?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Concluir',
        onPress: async () => {
          try {
            await completeJourney(activeJourney.id);
            setActiveJourney(null);
          } catch {
            Alert.alert('Erro', 'Não foi possível concluir a jornada.');
          }
        },
      },
    ]);
  }

  async function handleCancel() {
    if (!activeJourney) return;
    Alert.alert('Cancelar jornada', 'Tem certeza que deseja cancelar esta jornada?', [
      { text: 'Voltar', style: 'cancel' },
      {
        text: 'Cancelar jornada',
        style: 'destructive',
        onPress: async () => {
          try {
            await cancelJourney(activeJourney.id);
            setActiveJourney(null);
          } catch {
            Alert.alert('Erro', 'Não foi possível cancelar a jornada.');
          }
        },
      },
    ]);
  }

  const boughtCount = activeJourney?.items.filter((i) => i.finalStatus === 'bought').length ?? 0;
  const totalCount = activeJourney?.items.length ?? 0;
  const progress = totalCount > 0 ? boughtCount / totalCount : 0;

  if (status === 'loading') {
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
        <Text style={styles.title}>Compras</Text>
        {!activeJourney && (
          <Pressable style={styles.startBtn} onPress={openStartSheet}>
            <Text style={styles.startBtnText}>+ Nova jornada</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent} />}
      >
        {activeJourney ? (
          <View style={styles.activeCard}>
            <View style={styles.activeCardHeader}>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>EM ANDAMENTO</Text>
              </View>
              <Text style={styles.activeSuper}>{activeJourney.activeStop?.supermarketName ?? '—'}</Text>
            </View>

            <Text style={styles.activeListName}>
              {activeJourney.sourceLists.map((l) => l.name).join(', ')}
            </Text>

            {/* Progress bar */}
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
            </View>
            <Text style={styles.progressLabel}>
              {boughtCount} de {totalCount} itens comprados
            </Text>

            <View style={styles.activeActions}>
              <Pressable
                style={styles.viewBtn}
                onPress={() => router.push(`/journeys/${activeJourney.id}`)}
              >
                <Text style={styles.viewBtnText}>Ver painel</Text>
              </Pressable>
              <Pressable style={styles.completeBtn} onPress={handleComplete}>
                <Text style={styles.completeBtnText}>Concluir</Text>
              </Pressable>
              <Pressable style={styles.cancelBtn} onPress={handleCancel}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Nenhuma jornada ativa</Text>
            <Text style={styles.emptyDesc}>Inicie uma nova jornada para começar suas compras.</Text>
            <Button label="Iniciar jornada" onPress={openStartSheet} style={styles.emptyBtn} />
          </View>
        )}
      </ScrollView>

      {/* Start journey bottom sheet */}
      <FormSheet
        visible={startSheetOpen}
        title="Iniciar jornada"
        onClose={() => setStartSheetOpen(false)}
      >
        <Text style={styles.fieldLabel}>LISTAS</Text>
        {lists.length === 0 ? (
          <Text style={styles.noItemsText}>Nenhuma lista ativa encontrada.</Text>
        ) : (
          lists.map((list) => {
            const selected = selectedListIds.includes(list.id);
            return (
              <Pressable
                key={list.id}
                style={[styles.selectRow, selected && styles.selectRowActive]}
                onPress={() => toggleListSelection(list.id)}
              >
                <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                  {selected && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.selectRowText, selected && styles.selectRowTextActive]}>
                  {list.name}
                </Text>
                <Text style={styles.selectRowMeta}>{list.itemCount} itens</Text>
              </Pressable>
            );
          })
        )}

        <Text style={[styles.fieldLabel, { marginTop: Spacing.lg }]}>SUPERMERCADO</Text>
        {supermarkets.length === 0 ? (
          <Text style={styles.noItemsText}>Nenhum supermercado cadastrado.</Text>
        ) : (
          supermarkets.map((sup) => {
            const selected = selectedSupermarketId === sup.id;
            return (
              <Pressable
                key={sup.id}
                style={[styles.selectRow, selected && styles.selectRowActive]}
                onPress={() => setSelectedSupermarketId(sup.id)}
              >
                <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                  {selected && <View style={styles.radioInner} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.selectRowText, selected && styles.selectRowTextActive]}>
                    {sup.name}
                  </Text>
                  {sup.address ? (
                    <Text style={styles.selectRowMeta}>{sup.address}</Text>
                  ) : null}
                </View>
              </Pressable>
            );
          })
        )}

        <Button
          label={starting ? 'Iniciando…' : 'Iniciar jornada'}
          onPress={handleStartJourney}
          disabled={starting}
          style={{ marginTop: Spacing.xl }}
        />
      </FormSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  startBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: 6,
  },
  startBtnText: {
    color: '#fff',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },

  scroll: { flex: 1 },
  content: { padding: Spacing.xl, gap: Spacing.lg },

  // Active journey card
  activeCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.borderAccent,
    ...Shadow.card,
  },
  activeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  activeBadge: {
    backgroundColor: `${Colors.success}22`,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: `${Colors.success}55`,
  },
  activeBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.extrabold,
    color: Colors.success,
    letterSpacing: 0.8,
  },
  activeSuper: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  activeListName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.base,
  },
  progressTrack: {
    height: 6,
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
  progressLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.base,
  },
  activeActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  viewBtn: {
    flex: 1,
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 100,
  },
  viewBtnText: { color: '#fff', fontSize: FontSize.sm, fontWeight: FontWeight.bold },
  completeBtn: {
    backgroundColor: `${Colors.success}22`,
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: Spacing.base,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${Colors.success}55`,
  },
  completeBtnText: { color: Colors.success, fontSize: FontSize.sm, fontWeight: FontWeight.bold },
  cancelBtn: {
    backgroundColor: `${Colors.danger}15`,
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: Spacing.base,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${Colors.danger}33`,
  },
  cancelBtnText: { color: Colors.danger, fontSize: FontSize.sm, fontWeight: FontWeight.bold },

  // Empty state
  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing['2xl'],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  emptyIcon: { fontSize: 40, marginBottom: Spacing.md },
  emptyTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  emptyDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  emptyBtn: { alignSelf: 'stretch' },

  // Form sheet
  fieldLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.extrabold,
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  noItemsText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.surfaceInput,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectRowActive: {
    borderColor: Colors.accent,
    backgroundColor: `${Colors.accent}11`,
  },
  selectRowText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  selectRowTextActive: { color: Colors.text },
  selectRowMeta: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accent,
  },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: FontWeight.bold },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: { borderColor: Colors.accent },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
  },
});
