import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {
  ProductDto,
  ShoppingListItemDto,
  UnitDto,
  UpsertShoppingListItemRequest,
} from '@zbuy/shared';

import { Button } from '@/components/ui/Button';
import { ChipSelect } from '@/components/ui/ChipSelect';
import { Input } from '@/components/ui/Input';
import { createProduct, listProducts } from '@/lib/resources';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';

type Scope = 'all' | 'mine';

// Quantos resultados renderizar de uma vez (o catálogo tem milhares de itens).
const RESULT_LIMIT = 50;

interface ListItemFormProps {
  units: UnitDto[];
  editing: ShoppingListItemDto | null;
  onSubmit: (input: UpsertShoppingListItemRequest) => Promise<void>;
}

export function ListItemForm({ units, editing, onSubmit }: ListItemFormProps) {
  const [productId, setProductId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null);
  const [quantity, setQuantity] = useState('1');
  const [unitId, setUnitId] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Busca de produtos (ao vivo, direto na API — sempre fresca e com escopo).
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<Scope>('all');
  const [results, setResults] = useState<ProductDto[]>([]);
  const [searching, setSearching] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (editing) {
      setProductId(editing.productId);
      setQuantity(editing.quantity);
      setUnitId(editing.unitId);
      setExpectedPrice(editing.expectedPrice ?? '');
    } else {
      setProductId('');
      setSelectedProduct(null);
      setQuantity('1');
      setUnitId('');
      setExpectedPrice('');
      setQuery('');
      setScope('all');
    }
  }, [editing]);

  // Busca com debounce, refazendo a cada digitação ou troca de escopo.
  useEffect(() => {
    if (editing) return;
    let cancelled = false;
    setSearching(true);
    const handle = setTimeout(async () => {
      try {
        const { products } = await listProducts(query, scope);
        if (!cancelled) setResults(products);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [query, scope, editing]);

  function pickProduct(product: ProductDto) {
    setProductId(product.id);
    setSelectedProduct(product);
    if (!editing) setUnitId(product.defaultUnitId);
  }

  // Unidade padrão para o cadastro rápido: a já escolhida, senão "unit".
  function resolveDefaultUnitId(): string {
    if (unitId) return unitId;
    const unit = units.find((u) => u.abbreviation === 'unit');
    return unit?.id ?? units[0]?.id ?? '';
  }

  async function handleQuickCreate() {
    const name = query.trim();
    const defaultUnitId = resolveDefaultUnitId();
    if (!name || !defaultUnitId || creating) return;
    setCreating(true);
    setError(null);
    try {
      const created = await createProduct({
        name,
        categoryLabel: 'Geral',
        defaultUnitId,
      });
      pickProduct(created);
      setQuery('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Não foi possível cadastrar o produto');
    } finally {
      setCreating(false);
    }
  }

  const isValid =
    productId.length > 0 && unitId.length > 0 && quantity.trim().length > 0;

  const visibleResults = results.slice(0, RESULT_LIMIT);
  const hiddenCount = results.length - visibleResults.length;
  const trimmedQuery = query.trim();
  const showQuickCreate = !searching && trimmedQuery.length > 0 && results.length === 0;

  async function handleSubmit() {
    if (!isValid || saving) return;
    setError(null);
    setSaving(true);
    try {
      await onSubmit({
        productId,
        quantity: quantity.trim(),
        unitId,
        expectedPrice: expectedPrice.trim() || null,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar item');
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.form}>
      {/* Product picker (only when adding new) */}
      {editing ? (
        <View>
          <Text style={styles.label}>PRODUTO</Text>
          <Text style={styles.editingProduct}>{editing.productName}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>PRODUTO</Text>

          {/* Produto selecionado */}
          {selectedProduct ? (
            <View style={styles.selectedBanner}>
              <Text style={styles.selectedCheck}>✓</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.selectedName} numberOfLines={1}>
                  {selectedProduct.name}
                </Text>
                <Text style={styles.selectedMeta} numberOfLines={1}>
                  {selectedProduct.brand ? `${selectedProduct.brand} · ` : ''}
                  {selectedProduct.categoryLabel}
                </Text>
              </View>
            </View>
          ) : null}

          {/* Toggle Todos / Meus produtos */}
          <View style={styles.segment}>
            <Pressable
              style={[styles.segmentBtn, scope === 'all' && styles.segmentBtnActive]}
              onPress={() => setScope('all')}
            >
              <Text
                style={[styles.segmentText, scope === 'all' && styles.segmentTextActive]}
              >
                Todos
              </Text>
            </Pressable>
            <Pressable
              style={[styles.segmentBtn, scope === 'mine' && styles.segmentBtnActive]}
              onPress={() => setScope('mine')}
            >
              <Text
                style={[styles.segmentText, scope === 'mine' && styles.segmentTextActive]}
              >
                Meus produtos
              </Text>
            </Pressable>
          </View>

          {/* Campo de busca */}
          <Input
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar produto por nome, marca ou código…"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            style={styles.searchInput}
          />

          {searching ? (
            <View style={styles.searchingRow}>
              <ActivityIndicator size="small" color={Colors.accent} />
              <Text style={styles.searchingText}>Buscando…</Text>
            </View>
          ) : showQuickCreate ? (
            <View style={styles.emptyBox}>
              <Text style={styles.empty}>
                Nenhum produto encontrado para “{trimmedQuery}”.
              </Text>
              <Button
                label={`+ Cadastrar “${trimmedQuery}”`}
                onPress={handleQuickCreate}
                loading={creating}
                variant="secondary"
                fullWidth
              />
            </View>
          ) : results.length === 0 ? (
            <Text style={styles.empty}>
              {scope === 'mine'
                ? 'Você ainda não cadastrou produtos. Digite um nome acima para criar.'
                : 'Nenhum produto disponível.'}
            </Text>
          ) : (
            <ScrollView
              style={styles.productList}
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
            >
              {visibleResults.map((p) => {
                const selected = p.id === productId;
                return (
                  <Pressable
                    key={p.id}
                    onPress={() => pickProduct(p)}
                    style={({ pressed }) => [
                      styles.productOption,
                      selected && styles.productOptionSelected,
                      pressed && !selected && styles.productOptionPressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.productName,
                        selected && styles.productNameSelected,
                      ]}
                      numberOfLines={1}
                    >
                      {p.name}
                    </Text>
                    <Text style={styles.productCategory} numberOfLines={1}>
                      {p.brand ? `${p.brand} · ` : ''}
                      {p.categoryLabel}
                    </Text>
                  </Pressable>
                );
              })}
              {hiddenCount > 0 ? (
                <Text style={styles.moreHint}>
                  +{hiddenCount} resultado{hiddenCount > 1 ? 's' : ''} — refine a busca
                  para ver mais
                </Text>
              ) : null}
            </ScrollView>
          )}
        </View>
      )}

      <Input
        label="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="1"
        keyboardType="decimal-pad"
      />

      {units.length > 0 ? (
        <ChipSelect
          label="Unidade"
          options={units.map((u) => ({ value: u.id, label: u.abbreviation }))}
          value={unitId}
          onChange={setUnitId}
        />
      ) : null}

      <Input
        label="Preço esperado (opcional)"
        value={expectedPrice}
        onChangeText={setExpectedPrice}
        placeholder="0,00"
        keyboardType="decimal-pad"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        label={editing ? 'Salvar alterações' : 'Adicionar à lista'}
        onPress={handleSubmit}
        loading={saving}
        disabled={!isValid}
        fullWidth
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: Spacing.base },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  empty: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  emptyBox: {
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  editingProduct: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },

  // Produto selecionado
  selectedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: `${Colors.accent}22`,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.accent,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  selectedCheck: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.accent,
  },
  selectedName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  selectedMeta: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  // Toggle de escopo
  segment: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceInput,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 3,
    gap: 3,
    marginBottom: Spacing.sm,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: { backgroundColor: Colors.accent },
  segmentText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  segmentTextActive: { color: '#ffffff' },

  searchInput: { marginBottom: Spacing.sm },
  searchingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  searchingText: { fontSize: FontSize.sm, color: Colors.textSecondary },

  productList: {
    maxHeight: 220,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceInput,
  },
  moreHint: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: Spacing.sm,
  },
  productOption: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  productOptionSelected: {
    backgroundColor: `${Colors.accent}22`,
  },
  productOptionPressed: {
    backgroundColor: Colors.surfaceMuted,
  },
  productName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  productNameSelected: {
    color: Colors.accent,
  },
  productCategory: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  error: {
    fontSize: FontSize.sm,
    color: Colors.danger,
    textAlign: 'center',
  },
});
