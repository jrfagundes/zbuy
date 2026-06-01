import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ShoppingListSummaryDto, UpsertShoppingListRequest } from '@zbuy/shared';

import { FormSheet } from '@/components/ui/FormSheet';
import { ListForm } from '@/components/lists/ListForm';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import {
  archiveShoppingList,
  createShoppingList,
  deleteShoppingList,
  duplicateShoppingList,
  listShoppingLists,
  updateShoppingList,
} from '@/lib/resources';

export default function ListsScreen() {
  const router = useRouter();
  const [lists, setLists] = useState<ShoppingListSummaryDto[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [refreshing, setRefreshing] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<ShoppingListSummaryDto | null>(null);

  const load = useCallback(async () => {
    try {
      const { shoppingLists } = await listShoppingLists();
      setLists(shoppingLists);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  // Reload whenever the screen regains focus (e.g. returning from detail)
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

  function openCreate() {
    setEditing(null);
    setSheetOpen(true);
  }

  async function handleSubmit(input: UpsertShoppingListRequest) {
    if (editing) {
      await updateShoppingList(editing.id, input);
    } else {
      await createShoppingList(input);
    }
    setSheetOpen(false);
    setEditing(null);
    await load();
  }

  function openActions(list: ShoppingListSummaryDto) {
    Alert.alert(list.name, undefined, [
      { text: 'Editar', onPress: () => { setEditing(list); setSheetOpen(true); } },
      {
        text: 'Duplicar',
        onPress: async () => {
          try {
            await duplicateShoppingList(list.id);
            await load();
          } catch {
            Alert.alert('Erro', 'Não foi possível duplicar a lista.');
          }
        },
      },
      {
        text: 'Arquivar',
        onPress: async () => {
          try {
            await archiveShoppingList(list.id);
            await load();
          } catch {
            Alert.alert('Erro', 'Não foi possível arquivar a lista.');
          }
        },
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => confirmDelete(list),
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  }

  function confirmDelete(list: ShoppingListSummaryDto) {
    Alert.alert('Excluir lista', `Excluir "${list.name}" permanentemente?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteShoppingList(list.id);
            await load();
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir a lista.');
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Listas</Text>
        <Text style={styles.count}>{status === 'ready' ? `${lists.length}` : ''}</Text>
      </View>

      {status === 'loading' ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.accent} />
        </View>
      ) : status === 'error' ? (
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>⚠️</Text>
          <Text style={styles.emptyText}>Não foi possível carregar as listas.</Text>
        </View>
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.accent}
              colors={[Colors.accent]}
            />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyText}>Nenhuma lista ainda.</Text>
              <Text style={styles.emptyHint}>Toque em + para criar sua primeira lista.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ListRow
              list={item}
              onPress={() =>
                router.push({ pathname: '/(tabs)/lists/[id]', params: { id: item.id } })
              }
              onLongPress={() => openActions(item)}
            />
          )}
        />
      )}

      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={openCreate}
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>

      <FormSheet
        visible={sheetOpen}
        title={editing ? 'Editar lista' : 'Nova lista'}
        onClose={() => {
          setSheetOpen(false);
          setEditing(null);
        }}
      >
        <ListForm editing={editing} onSubmit={handleSubmit} />
      </FormSheet>
    </SafeAreaView>
  );
}

function ListRow({
  list,
  onPress,
  onLongPress,
}: {
  list: ShoppingListSummaryDto;
  onPress: () => void;
  onLongPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.rowIcon}>
        <Text style={styles.rowIconText}>📋</Text>
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.rowName} numberOfLines={1}>
          {list.name}
        </Text>
        <Text style={styles.rowMeta} numberOfLines={1}>
          {list.itemCount} {list.itemCount === 1 ? 'item' : 'itens'}
          {list.description ? ` · ${list.description}` : ''}
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
    alignItems: 'baseline',
    gap: Spacing.sm,
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
  count: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.textSecondary },
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
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowIconText: { fontSize: 20 },
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
