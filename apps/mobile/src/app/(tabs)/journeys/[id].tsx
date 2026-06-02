import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ShoppingJourneyDetailDto, ShoppingJourneyItemDto } from '@zbuy/shared';

import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import {
  cancelJourney,
  completeJourney,
  getJourney,
  updateJourneyStopItem,
} from '@/lib/resources';
import { useFocusEffect } from 'expo-router';

type ItemStatus = 'pending' | 'bought' | 'not_found';

function statusColor(status: string) {
  if (status === 'bought') return Colors.success;
  if (status === 'not_found') return Colors.danger;
  return Colors.textSecondary;
}

function statusLabel(status: string) {
  if (status === 'bought') return 'Comprado';
  if (status === 'not_found') return 'Não encontrado';
  return 'Pendente';
}

function priorityLabel(p: string) {
  if (p === 'high') return '🔴';
  if (p === 'low') return '🟢';
  return '🟡';
}

interface ItemRowProps {
  item: ShoppingJourneyItemDto;
  journeyId: string;
  activeStopId: string | null;
  onUpdate: () => void;
}

function ItemRow({ item, journeyId, activeStopId, onUpdate }: ItemRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [priceInput, setPriceInput] = useState(item.activeStopItem?.actualPrice ?? '');
  const [saving, setSaving] = useState(false);

  const currentStatus = item.activeStopItem?.status ?? 'pending';

  async function setStatus(status: ItemStatus) {
    if (!activeStopId || !item.activeStopItem) return;
    setSaving(true);
    try {
      await updateJourneyStopItem(journeyId, activeStopId, item.activeStopItem.id, { status });
      onUpdate();
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar o item.');
    } finally {
      setSaving(false);
    }
  }

  async function savePrice() {
    if (!activeStopId || !item.activeStopItem) return;
    const trimmed = priceInput.trim().replace(',', '.');
    if (trimmed && !/^\d+(\.\d{1,2})?$/.test(trimmed)) {
      Alert.alert('Preço inválido', 'Use o formato 9.99');
      return;
    }
    setSaving(true);
    try {
      await updateJourneyStopItem(journeyId, activeStopId, item.activeStopItem.id, {
        actualPrice: trimmed || null,
      });
      onUpdate();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o preço.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={[styles.itemCard, currentStatus === 'bought' && styles.itemCardBought]}>
      <Pressable onPress={() => setExpanded((v) => !v)} style={styles.itemRow}>
        <Text style={styles.itemPriority}>{priorityLabel(item.priority)}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.itemName, currentStatus === 'bought' && styles.itemNameBought]}>
            {item.snapshotProductName}
          </Text>
          <Text style={styles.itemQty}>
            {item.quantity} {item.snapshotUnitAbbreviation}
            {item.snapshotBrand ? ` · ${item.snapshotBrand}` : ''}
          </Text>
        </View>
        <View style={styles.itemStatusBadge}>
          <Text style={[styles.itemStatusText, { color: statusColor(currentStatus) }]}>
            {statusLabel(currentStatus)}
          </Text>
        </View>
      </Pressable>

      {expanded && activeStopId && item.activeStopItem && (
        <View style={styles.itemActions}>
          <View style={styles.statusButtons}>
            {(['pending', 'bought', 'not_found'] as ItemStatus[]).map((s) => (
              <Pressable
                key={s}
                style={[styles.statusBtn, currentStatus === s && statusBtnActiveStyle(s)]}
                onPress={() => setStatus(s)}
                disabled={saving}
              >
                <Text style={[styles.statusBtnText, currentStatus === s && { color: '#fff' }]}>
                  {statusLabel(s)}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.priceRow}>
            <TextInput
              style={styles.priceInput}
              value={priceInput}
              onChangeText={setPriceInput}
              placeholder="Preço (ex: 5.99)"
              placeholderTextColor={Colors.textSecondary}
              keyboardType="decimal-pad"
              returnKeyType="done"
              onSubmitEditing={savePrice}
            />
            <Pressable style={styles.savePriceBtn} onPress={savePrice} disabled={saving}>
              <Text style={styles.savePriceBtnText}>Salvar</Text>
            </Pressable>
          </View>

          {item.placement && (
            <Text style={styles.corridorTag}>📍 {item.placement.corridorName}</Text>
          )}
        </View>
      )}
    </View>
  );
}

export default function JourneyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [journey, setJourney] = useState<ShoppingJourneyDetailDto | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await getJourney(id);
      setJourney(data);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [id]);

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

  async function handleComplete() {
    if (!journey) return;
    Alert.alert('Concluir jornada', 'Finalizar esta jornada?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Concluir',
        onPress: async () => {
          try {
            await completeJourney(journey.id);
            router.back();
          } catch {
            Alert.alert('Erro', 'Não foi possível concluir a jornada.');
          }
        },
      },
    ]);
  }

  async function handleCancel() {
    if (!journey) return;
    Alert.alert('Cancelar jornada', 'Tem certeza?', [
      { text: 'Voltar', style: 'cancel' },
      {
        text: 'Cancelar jornada',
        style: 'destructive',
        onPress: async () => {
          try {
            await cancelJourney(journey.id);
            router.back();
          } catch {
            Alert.alert('Erro', 'Não foi possível cancelar a jornada.');
          }
        },
      },
    ]);
  }

  if (status === 'loading') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator color={Colors.accent} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'error' || !journey) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Jornada não encontrada.</Text>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const activeStopId = journey.activeStop?.id ?? null;
  const boughtCount = journey.items.filter((i) => i.finalStatus === 'bought').length;
  const totalCount = journey.items.length;
  const progress = totalCount > 0 ? boughtCount / totalCount : 0;
  const isActive = journey.status === 'active';

  // Group items by corridor, then uncategorized
  const withCorridor = new Map<string, { name: string; items: ShoppingJourneyItemDto[] }>();
  const uncategorized: ShoppingJourneyItemDto[] = [];

  for (const item of journey.items) {
    if (item.placement) {
      const { corridorId, corridorName } = item.placement;
      if (!withCorridor.has(corridorId)) {
        withCorridor.set(corridorId, { name: corridorName, items: [] });
      }
      withCorridor.get(corridorId)!.items.push(item);
    } else {
      uncategorized.push(item);
    }
  }

  const groups = [
    ...Array.from(withCorridor.entries()).map(([id, g]) => ({ id, name: g.name, items: g.items })),
    ...(uncategorized.length > 0
      ? [{ id: '__uncategorized__', name: 'Sem corredor', items: uncategorized }]
      : []),
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View style={{ flex: 1, marginLeft: Spacing.md }}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {journey.sourceLists.map((l) => l.name).join(', ')}
          </Text>
          <Text style={styles.headerSub}>
            {journey.activeStop?.supermarketName ?? 'Sem supermercado'}
          </Text>
        </View>
        {isActive && (
          <View style={styles.headerActions}>
            <Pressable style={styles.completeBtn} onPress={handleComplete}>
              <Text style={styles.completeBtnText}>Concluir</Text>
            </Pressable>
            <Pressable style={styles.cancelBtnSmall} onPress={handleCancel}>
              <Text style={styles.cancelBtnSmallText}>✕</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Progress bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          {boughtCount}/{totalCount} comprados · R$ {journey.knownTotal}
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent} />}
      >
        {groups.map((group) => (
          <View key={group.id} style={styles.group}>
            <Text style={styles.groupTitle}>{group.name.toUpperCase()}</Text>
            {group.items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                journeyId={journey.id}
                activeStopId={activeStopId}
                onUpdate={load}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const statusBtnActiveStyle = (s: ItemStatus) => ({
  backgroundColor:
    s === 'bought' ? Colors.success : s === 'not_found' ? Colors.danger : Colors.accent,
  borderColor:
    s === 'bought' ? Colors.success : s === 'not_found' ? Colors.danger : Colors.accent,
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.md },
  errorText: { fontSize: FontSize.base, color: Colors.textSecondary },
  backBtn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
  },
  backBtnText: { color: Colors.accent, fontWeight: FontWeight.bold },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backArrow: {
    fontSize: FontSize.xl,
    color: Colors.accent,
    fontWeight: FontWeight.bold,
  },
  headerTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  headerSub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  completeBtn: {
    backgroundColor: `${Colors.success}22`,
    borderRadius: Radius.md,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: `${Colors.success}55`,
  },
  completeBtnText: { color: Colors.success, fontSize: FontSize.xs, fontWeight: FontWeight.bold },
  cancelBtnSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${Colors.danger}15`,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: `${Colors.danger}33`,
  },
  cancelBtnSmallText: { color: Colors.danger, fontSize: FontSize.sm, fontWeight: FontWeight.bold },

  progressWrap: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    gap: 4,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: Radius.full,
  },
  progressLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },

  scroll: { flex: 1 },
  content: { padding: Spacing.xl, gap: Spacing.lg },

  group: { gap: Spacing.sm },
  groupTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.extrabold,
    color: Colors.textSecondary,
    letterSpacing: 1,
    paddingLeft: 2,
  },

  // Item card
  itemCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  itemCardBought: {
    opacity: 0.6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  itemPriority: { fontSize: FontSize.sm },
  itemName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  itemNameBought: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  itemQty: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  itemStatusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceInput,
  },
  itemStatusText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },

  // Item expanded actions
  itemActions: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  statusBtnText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  priceInput: {
    flex: 1,
    backgroundColor: Colors.surfaceInput,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  savePriceBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savePriceBtnText: {
    color: '#fff',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  corridorTag: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});
