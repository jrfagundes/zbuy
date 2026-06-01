import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ShoppingListSummaryDto, UpsertShoppingListRequest } from '@zbuy/shared';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Colors, FontSize, Spacing } from '@/constants/theme';

interface ListFormProps {
  editing: ShoppingListSummaryDto | null;
  onSubmit: (input: UpsertShoppingListRequest) => Promise<void>;
}

export function ListForm({ editing, onSubmit }: ListFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(editing?.name ?? '');
    setDescription(editing?.description ?? '');
  }, [editing]);

  const isValid = name.trim().length > 0;

  async function handleSubmit() {
    if (!isValid || saving) return;
    setError(null);
    setSaving(true);
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim() || null,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar lista');
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.form}>
      <Input
        label="Nome da lista"
        value={name}
        onChangeText={setName}
        placeholder="Ex: Compra semanal"
        autoCapitalize="sentences"
      />
      <Input
        label="Descrição (opcional)"
        value={description}
        onChangeText={setDescription}
        placeholder="Ex: Mercado do mês"
        autoCapitalize="sentences"
        multiline
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        label={editing ? 'Salvar alterações' : 'Criar lista'}
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
