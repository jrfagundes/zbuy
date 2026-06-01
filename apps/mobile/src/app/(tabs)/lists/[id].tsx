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
  ProductDto,
  ShoppingListDetailDto,
  ShoppingListItemDto,
  UnitDto,
  UpsertShoppingListItemRequest,
} from '@zbuy/shared';

import { FormSheet } from '@/components/ui/FormSheet';
import { ListItemForm } from '@/components/lists/ListItemForm';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import {
  addShoppingListItem,
  deleteShoppingListItem,
  getShoppingList,
  listProducts,
  listUnits,
  updateShoppingListItem,
} from '@/lib/resources';

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [list, setList] = useState<ShoppingListDetailDto | null>(null);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [units, setUnits] = useState<UnitDto[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<ShoppingListItemDto | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      const [listDetail, productsRes, unitsRes] = await Promise.all([
        getShoppingList(id),
        listProducts(),
        listUnits(),
      ]);
      setList(listDetail);
      setProducts(productsRes.products);
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
            </Text>
          ) : null}
        </View>
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
        <ListItemForm
          products={products}
          units={units}
          editing={editing}
          onSubmit={handleSubmit}
        />
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
