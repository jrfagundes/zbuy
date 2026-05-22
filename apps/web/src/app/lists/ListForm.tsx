"use client";

import React, { FormEvent, useEffect, useState } from "react";
import type { ShoppingListSummaryDto, UpsertShoppingListRequest } from "@zbuy/shared";

export function ListForm({
  editingList,
  onSubmit,
  onCancel
}: {
  editingList: ShoppingListSummaryDto | null;
  onSubmit: (input: UpsertShoppingListRequest) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(editingList?.name ?? "");
    setDescription(editingList?.description ?? "");
  }, [editingList]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({ name, description: description || null });
      setName("");
      setDescription("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="resource-form compact-form" onSubmit={submit}>
      <label>
        Nome da lista
        <input value={name} onChange={(event) => setName(event.target.value)} required />
      </label>
      <label>
        Descrição
        <input value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <div className="form-actions span-2">
        {editingList ? (
          <button type="button" className="button secondary" onClick={onCancel}>
            Cancelar
          </button>
        ) : null}
        <button type="submit" className="button primary" disabled={saving}>
          {editingList ? "Salvar lista" : "Criar lista"}
        </button>
      </div>
    </form>
  );
}
