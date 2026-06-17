import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type {
  ShoppingListDetailDto,
  ShoppingListItemDto,
  ShoppingListShareDto,
  UnitDto,
  UpsertShoppingListItemRequest,
} from '@zbuy/shared';

import { Button } from '@/components/ui/Button';
import { FormSheet } from '@/components/ui/FormSheet';
import { Input } from '@/components/ui/Input';
import { ListItemForm } from '@/components/lists/ListItemForm';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import {
  addListShare,
  addShoppingListItem,
  deleteShoppingListItem,
  getShoppingList,
  listListShares,
  listUnits,
  removeListShare,
  updateShoppingListItem,
} from '@/lib/resources';

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [list, setList] = useState<ShoppingListDetailDto | null>(null);
  const [units, setUnits] = useState<UnitDto[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<ShoppingListItemDto | null>(null);

  // Sharing
  const [shareOpen, setShareOpen] = useState(false);
  const [shares, setShares] = useState<ShoppingListShareDto[]>([]);
  const [shareEmail, setShareEmail] = useState('');
  const [shareBusy, setShareBusy] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      const [listDetail, unitsRes] = await Promise.all([
        getShoppingList(id),
        listUnits(),
      ]);
      setList(listDetail);
      setUnits(unitsRes.units);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  function openAdd() {
    setEditing(null);
    setSheetOpen(true);
  }

  function openEdit(item: ShoppingListItemDto) {
    setEditing(item);
    setSheetOpen(true);
  }

  async function handleSubmit(input: UpsertShoppingListItemRequest) {
    if (!id) return;
    const updated = editing
      ? await updateShoppingListItem(id, editing.id, input)
      : await addShoppingListItem(id, input);
    setList(updated);
    setSheetOpen(false);
    setEditing(null);
  }

  async function openShare() {
    if (!id) return;
    setShareError(null);
    setShareEmail('');
    setShareOpen(true);
    try {
      const { shares: current } = await listListShares(id);
      setShares(current);
    } catch {
      setShares([]);
    }
  }

  async function handleAddShare() {
    if (!id || !shareEmail.trim()) return;
    setShareBusy(true);
    setShareError(null);
    try {
      const result = await addListShare(id, shareEmail.trim().toLowerCase());
      setShares(result.shares);
      setShareEmail('');
      if (result.invited) {
        Alert.alert(
          'Convite enviado ✉️',
          `${result.invited.email} ainda não tem conta no ZBuy. Enviamos um e-mail convidando a pessoa a baixar o app e se cadastrar. Depois disso, compartilhe a lista novamente.`,
        );
      }
    } catch (e: unknown) {
      setShareError(e instanceof Error ? e.message : 'Não foi possível compartilhar');
    } finally {
      setShareBusy(false);
    }
  }

  function confirmRemoveShare(member: ShoppingListShareDto) {
    Alert.alert('Remover acesso', `Remover ${member.name} desta lista?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          if (!id) return;
          try {
            const { shares: updated } = await removeListShare(id, member.userId);
            setShares(updated);
          } catch {
            Alert.alert('Erro', 'Não foi possível remover o acesso.');
          }
        },
      },
    ]);
  }

  function confirmDelete(item: ShoppingListItemDto) {
    Alert.alert('Remover item', `Remover "${item.productName}" da lista?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          if (!id) return;
          try {
            const updated = await deleteShoppingListItem(id, item.id);
            setList(updated);
          } catch {
            Alert.alert('Erro', 'Não foi possível remover o item.');
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header with back button */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={({ pressed }) => [styles.backButton, pressed && styles.backPressed]}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <View style={styles.headerTitles}>
          <Text style={styles.title} numberOfLines={1}>
            {list?.name ?? 'Lista'}
          </Text>
          {list ? (
            <Text style={styles.subtitle}>
              {list.itemCount} {list.itemCount === 1 ? 'item' : 'itens'}
              {!list.isOwner && list.sharedByName ? ` · de ${list.sharedByName}` : ''}
            </Text>
          ) : null}
        </View>
        {list?.isOwner ? (
          <Pressable
            onPress={openShare}
            hitSlop={12}
            style={({ pressed }) => [styles.shareButton, pressed && styles.backPressed]}
          >
            <Text style={styles.shareIcon}>👥</Text>
            {list.memberCount > 0 ? (
              <View style={styles.shareCountDot}>
                <Text style={styles.shareCountText}>{list.memberCount}</Text>
              </View>
            ) : null}
          </Pressable>
        ) : null}
      </View>

      {status === 'loading' ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.accent} />
        </View>
      ) : status === 'error' ? (
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>⚠️</Text>
          <Text style={styles.emptyText}>Não foi possível carregar a lista.</Text>
        </View>
      ) : (
        <FlatList
          data={list?.items ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyIcon}>🛒</Text>
              <Text style={styles.emptyText}>Lista vazia.</Text>
              <Text style={styles.emptyHint}>Toque em + para adicionar produtos.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ItemRow
              item={item}
              onPress={() => openEdit(item)}
              onLongPress={() => confirmDelete(item)}
            />
          )}
        />
      )}

      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={openAdd}
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>

      <FormSheet
        visible={sheetOpen}
        title={editing ? 'Editar item' : 'Adicionar produto'}
        onClose={() => {
          setSheetOpen(false);
          setEditing(null);
        }}
      >
        <ListItemForm units={units} editing={editing} onSubmit={handleSubmit} />
      </FormSheet>

      {/* Share sheet */}
      <FormSheet visible={shareOpen} title="Compartilhar lista" onClose={() => setShareOpen(false)}>
        <Text style={styles.shareHint}>
          Convide alguém pelo e-mail da conta ZBuy. A pessoa poderá ver e editar esta lista e
          acompanhar a jornada de compras.
        </Text>
        <Input
          label="E-MAIL"
          value={shareEmail}
          onChangeText={setShareEmail}
          placeholder="pessoa@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          error={shareError ?? undefined}
        />
        <Button
          label="Compartilhar"
          onPress={handleAddShare}
          loading={shareBusy}
          disabled={!shareEmail.trim()}
          style={{ marginTop: Spacing.sm }}
        />

        <Text style={styles.membersTitle}>
          {shares.length > 0 ? 'PESSOAS COM ACESSO' : ''}
        </Text>
        {shares.map((member) => (
          <View key={member.userId} style={styles.memberRow}>
            <View style={styles.memberAvatar}>
              <Text style={styles.memberAvatarText}>{member.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.memberName} numberOfLines={1}>{member.name}</Text>
              <Text style={styles.memberEmail} numberOfLines={1}>{member.email}</Text>
            </View>
            <Pressable onPress={() => confirmRemoveShare(member)} hitSlop={8}>
              <Text style={styles.memberRemove}>✕</Text>
            </Pressable>
          </View>
        ))}
      </FormSheet>
    </SafeAreaView>
  );
}

function ItemRow({
  item,
  onPress,
  onLongPress,
}: {
  item: ShoppingListItemDto;
  onPress: () => void;
  onLongPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.qtyBadge}>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <Text style={styles.qtyUnit}>{item.unit.abbreviation}</Text>
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.rowName} numberOfLines={1}>
          {item.productName}
        </Text>
        <Text style={styles.rowMeta} numberOfLines={1}>
          {item.categoryLabel}
          {item.expectedPrice ? ` · R$ ${item.expectedPrice}` : ''}
        </Text>
      </View>
      <Text style={styles.rowChevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backPressed: { opacity: 0.6 },
  backIcon: { fontSize: 26, color: Colors.text, marginTop: -3 },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: { fontSize: 18 },
  shareCountDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareCountText: { fontSize: 10, fontWeight: FontWeight.bold, color: '#fff' },
  shareHint: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 19, marginBottom: Spacing.base },
  membersTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.extrabold,
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  memberAvatar: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatarText: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.accent },
  memberName: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text },
  memberEmail: { fontSize: FontSize.sm, color: Colors.textSecondary },
  memberRemove: { fontSize: FontSize.base, color: Colors.danger, fontWeight: FontWeight.bold, paddingHorizontal: Spacing.sm },
  headerTitles: { flex: 1 },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary },
  list: { padding: Spacing.xl, paddingBottom: 120, gap: Spacing.sm },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyIcon: { fontSize: 40 },
  emptyText: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text },
  emptyHint: { fontSize: FontSize.sm, color: Colors.textSecondary, textAlign: 'center' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  rowPressed: { backgroundColor: Colors.surfaceMuted },
  qtyBadge: {
    minWidth: 48,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceMuted,
    alignItems: 'center',
  },
  qtyText: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.accent },
  qtyUnit: { fontSize: FontSize.xs, color: Colors.textSecondary },
  rowInfo: { flex: 1, gap: 2 },
  rowName: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text },
  rowMeta: { fontSize: FontSize.sm, color: Colors.textSecondary },
  rowChevron: { fontSize: FontSize.lg, color: Colors.textSecondary },
  fab: {
    position: 'absolute',
    right: Spacing.xl,
    bottom: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.button,
  },
  fabPressed: { transform: [{ scale: 0.94 }] },
  fabIcon: { fontSize: 32, color: '#ffffff', fontWeight: FontWeight.regular, marginTop: -2 },
});
