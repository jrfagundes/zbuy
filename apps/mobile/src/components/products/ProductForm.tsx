import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ProductDto, UnitDto, UpsertProductRequest } from '@zbuy/shared';

import { Button } from '@/components/ui/Button';
import { ChipSelect } from '@/components/ui/ChipSelect';
import { Input } from '@/components/ui/Input';
import { Colors, FontSize, Spacing } from '@/constants/theme';

interface ProductFormProps {
  units: UnitDto[];
  editing: ProductDto | null;
  onSubmit: (input: UpsertProductRequest) => Promise<void>;
}

const emptyForm = {
  name: '',
  categoryLabel: '',
  brand: '',
  barcode: '',
  defaultUnitId: '',
  estimatedPrice: '',
  notes: '',
};

export function ProductForm({ units, editing, onSubmit }: ProductFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        categoryLabel: editing.categoryLabel,
        brand: editing.brand ?? '',
        barcode: editing.barcode ?? '',
        defaultUnitId: editing.defaultUnitId,
        estimatedPrice: editing.estimatedPrice ?? '',
        notes: editing.notes ?? '',
      });
    } else {
      setForm({ ...emptyForm, defaultUnitId: units[0]?.id ?? '' });
    }
  }, [editing, units]);

  const isValid =
    form.name.trim().length > 0 &&
    form.categoryLabel.trim().length > 0 &&
    form.defaultUnitId.length > 0;

  async function handleSubmit() {
    if (!isValid || saving) return;
    setError(null);
    setSaving(true);
    try {
      await onSubmit({
        name: form.name.trim(),
        categoryLabel: form.categoryLabel.trim(),
        brand: form.brand.trim() || null,
        barcode: form.barcode.trim() || null,
        defaultUnitId: form.defaultUnitId,
        estimatedPrice: form.estimatedPrice.trim() || null,
        notes: form.notes.trim() || null,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar produto');
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.form}>
      <Input
        label="Nome do produto"
        value={form.name}
        onChangeText={(name) => setForm((f) => ({ ...f, name }))}
        placeholder="Ex: Arroz branco"
        autoCapitalize="sentences"
      />
      <Input
        label="Categoria"
        value={form.categoryLabel}
        onChangeText={(categoryLabel) => setForm((f) => ({ ...f, categoryLabel }))}
        placeholder="Ex: Mercearia"
        autoCapitalize="sentences"
      />
      <Input
        label="Marca (opcional)"
        value={form.brand}
        onChangeText={(brand) => setForm((f) => ({ ...f, brand }))}
        placeholder="Ex: Tio João"
      />

      {units.length > 0 ? (
        <ChipSelect
          label="Unidade padrão"
          options={units.map((u) => ({ value: u.id, label: `${u.name} (${u.abbreviation})` }))}
          value={form.defaultUnitId}
          onChange={(defaultUnitId) => setForm((f) => ({ ...f, defaultUnitId }))}
        />
      ) : null}

      <Input
        label="Preço estimado (opcional)"
        value={form.estimatedPrice}
        onChangeText={(estimatedPrice) => setForm((f) => ({ ...f, estimatedPrice }))}
        placeholder="0,00"
        keyboardType="decimal-pad"
      />
      <Input
        label="Código de barras (opcional)"
        value={form.barcode}
        onChangeText={(barcode) => setForm((f) => ({ ...f, barcode }))}
        placeholder="EAN-13, UPC..."
        keyboardType="number-pad"
      />
      <Input
        label="Observações (opcional)"
        value={form.notes}
        onChangeText={(notes) => setForm((f) => ({ ...f, notes }))}
        placeholder="Notas sobre o produto"
        multiline
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        label={editing ? 'Salvar alterações' : 'Adicionar produto'}
        onPress={handleSubmit}
        loading={saving}
        disabled={!isValid}
        fullWidth
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: Spacing.base,
  },
  error: {
    fontSize: FontSize.sm,
    color: Colors.danger,
    textAlign: 'center',
  },
});
