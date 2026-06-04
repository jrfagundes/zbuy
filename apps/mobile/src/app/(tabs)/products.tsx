import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ProductDto, UnitDto, UpsertProductRequest } from '@zbuy/shared';

import { FormSheet } from '@/components/ui/FormSheet';
import { ProductForm } from '@/components/products/ProductForm';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import {
  archiveProduct,
  createProduct,
  listProducts,
  listUnits,
  updateProduct,
} from '@/lib/resources';

type Scope = 'mine' | 'all';

export default function ProductsScreen() {
  const [units, setUnits] = useState<UnitDto[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<Scope>('all');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [refreshing, setRefreshing] = useState(false);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<ProductDto | null>(null);

  const load = useCallback(async (search = '', currentScope: Scope = 'all') => {
    try {
      const [{ units: unitList }, { products: productList }] = await Promise.all([
        listUnits(),
        listProducts(search, currentScope),
      ]);
      setUnits(unitList);
      setProducts(productList);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Debounced search + scope changes
  useEffect(() => {
    const handle = setTimeout(() => {
      void load(query, scope);
    }, 350);
    return () => clearTimeout(handle);
  }, [query, scope, load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load(query, scope);
    setRefreshing(false);
  }, [load, query, scope]);

  function openCreate() {
    setEditing(null);
    setSheetOpen(true);
  }

  function openEdit(product: ProductDto) {
    setEditing(product);
    setSheetOpen(true);
  }

  async function handleSubmit(input: UpsertProductRequest) {
    if (editing) {
      await updateProduct(editing.id, input);
    } else {
      await createProduct(input);
    }
    setSheetOpen(false);
    setEditing(null);
    await load(query, scope);
  }

  function confirmArchive(product: ProductDto) {
    Alert.alert('Arquivar produto', `Remover "${product.name}" do catálogo?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Arquivar',
        style: 'destructive',
        onPress: async () => {
          try {
            await archiveProduct(product.id);
            await load(query, scope);
          } catch {
            Alert.alert('Erro', 'Não foi possível arquivar o produto.');
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Produtos</Text>
        <Text style={styles.count}>
          {status === 'ready' ? `${products.length}` : ''}
        </Text>
      </View>

      {/* Scope toggle */}
      <View style={styles.segmentWrapper}>
        <View style={styles.segment}>
          <Pressable
            style={[styles.segmentBtn, scope === 'all' && styles.segmentBtnActive]}
            onPress={() => setScope('all')}
          >
            <Text style={[styles.segmentText, scope === 'all' && styles.segmentTextActive]}>
              Todos
            </Text>
          </Pressable>
          <Pressable
            style={[styles.segmentBtn, scope === 'mine' && styles.segmentBtnActive]}
            onPress={() => setScope('mine')}
          >
            <Text style={[styles.segmentText, scope === 'mine' && styles.segmentTextActive]}>
              Meus produtos
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar produto..."
            placeholderTextColor={Colors.textSecondary}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery('')} hitSlop={8}>
              <Text style={styles.clearIcon}>✕</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Content */}
      {status === 'loading' ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.accent} />
        </View>
      ) : status === 'error' ? (
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>⚠️</Text>
          <Text style={styles.emptyText}>Não foi possível carregar os produtos.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
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
              <Text style={styles.emptyIcon}>📦</Text>
              <Text style={styles.emptyText}>
                {query
                  ? `Nenhum produto para "${query}".`
                  : 'Nenhum produto cadastrado ainda.'}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProductRow
              product={item}
              onEdit={() => openEdit(item)}
              onArchive={() => confirmArchive(item)}
            />
          )}
        />
      )}

      {/* FAB */}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={openCreate}
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>

      {/* Form sheet */}
      <FormSheet
        visible={sheetOpen}
        title={editing ? 'Editar produto' : 'Novo produto'}
        onClose={() => {
          setSheetOpen(false);
          setEditing(null);
        }}
      >
        <ProductForm units={units} editing={editing} onSubmit={handleSubmit} />
      </FormSheet>
    </SafeAreaView>
  );
}

function ProductRow({
  product,
  onEdit,
  onArchive,
}: {
  product: ProductDto;
  onEdit: () => void;
  onArchive: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onEdit}
      onLongPress={onArchive}
    >
      <View style={styles.rowIcon}>
        <Text style={styles.rowIconText}>
          {product.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.rowInfo}>
        <View style={styles.rowNameLine}>
          <Text style={styles.rowName} numberOfLines={1}>
            {product.name}
          </Text>
          {product.origin === 'catalog' && (
            <View style={styles.catalogBadge}>
              <Text style={styles.catalogBadgeText}>catálogo</Text>
            </View>
          )}
        </View>
        <Text style={styles.rowMeta} numberOfLines={1}>
          {product.brand ? `${product.brand} · ` : ''}
          {product.categoryLabel} · {product.defaultUnit.abbreviation}
          {product.estimatedPrice ? ` · R$ ${product.estimatedPrice}` : ''}
        </Text>
      </View>
      <Text style={styles.rowChevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.base,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  count: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
  },

  // Scope segment
  segmentWrapper: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceInput,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 3,
    gap: 3,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: {
    backgroundColor: Colors.accent,
  },
  segmentText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  segmentTextActive: {
    color: '#ffffff',
  },

  // Search
  searchWrapper: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surfaceInput,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.base,
    height: 46,
  },
  searchIcon: {
    fontSize: FontSize.base,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.text,
  },
  clearIcon: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.bold,
  },

  // List
  list: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 120,
    gap: Spacing.sm,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // Row
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
  rowPressed: {
    backgroundColor: Colors.surfaceMuted,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowIconText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.accent,
  },
  rowInfo: {
    flex: 1,
    gap: 2,
  },
  rowNameLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  rowName: {
    flexShrink: 1,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  catalogBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceMuted,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catalogBadgeText: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },
  rowMeta: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  rowChevron: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },

  // FAB
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
  fabPressed: {
    transform: [{ scale: 0.94 }],
  },
  fabIcon: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: FontWeight.regular,
    marginTop: -2,
  },
});
