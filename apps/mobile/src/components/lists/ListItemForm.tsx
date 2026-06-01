import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type {
  ProductDto,
  ShoppingListItemDto,
  UnitDto,
  UpsertShoppingListItemRequest,
} from '@zbuy/shared';

import { Button } from '@/components/ui/Button';
import { ChipSelect } from '@/components/ui/ChipSelect';
import { Input } from '@/components/ui/Input';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';

interface ListItemFormProps {
  products: ProductDto[];
  units: UnitDto[];
  editing: ShoppingListItemDto | null;
  onSubmit: (input: UpsertShoppingListItemRequest) => Promise<void>;
}

export function ListItemForm({ products, units, editing, onSubmit }: ListItemFormProps) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unitId, setUnitId] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editing) {
      setProductId(editing.productId);
      setQuantity(editing.quantity);
      setUnitId(editing.unitId);
      setExpectedPrice(editing.expectedPrice ?? '');
    } else {
      setProductId('');
      setQuantity('1');
      setUnitId('');
      setExpectedPrice('');
    }
  }, [editing]);

  // When a product is picked, default the unit to its default unit
  function pickProduct(id: string) {
    setProductId(id);
    const product = products.find((p) => p.id === id);
    if (product && !editing) {
      setUnitId(product.defaultUnitId);
    }
  }

  const isValid =
    productId.length > 0 && unitId.length > 0 && quantity.trim().length > 0;

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
          {products.length === 0 ? (
            <Text style={styles.empty}>
              Cadastre produtos primeiro na aba Produtos.
            </Text>
          ) : (
            <ScrollView style={styles.productList} nestedScrollEnabled>
              {products.map((p) => {
                const selected = p.id === productId;
                return (
                  <Pressable
                    key={p.id}
                    onPress={() => pickProduct(p.id)}
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
                      {p.categoryLabel}
                    </Text>
                  </Pressable>
                );
              })}
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
  editingProduct: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  productList: {
    maxHeight: 180,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceInput,
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
