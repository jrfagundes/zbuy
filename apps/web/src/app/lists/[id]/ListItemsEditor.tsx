"use client";

import React, { FormEvent, useEffect, useState } from "react";
import type {
  ListItemPriority,
  ProductDto,
  ShoppingListDetailDto,
  ShoppingListItemDto,
  UnitDto,
  UpsertShoppingListItemRequest
} from "@zbuy/shared";
import {
  addShoppingListItem,
  deleteShoppingListItem,
  reorderShoppingListItems,
  updateShoppingListItem
} from "../../../lib/resources";

type ItemFormState = {
  productId: string;
  quantity: string;
  unitId: string;
  expectedPrice: string;
  priority: ListItemPriority;
  notes: string;
};

const emptyItemForm: ItemFormState = {
  productId: "",
  quantity: "1",
  unitId: "",
  expectedPrice: "",
  priority: "normal" as const,
  notes: ""
};

export function ListItemsEditor({
  list,
  products,
  units,
  onChange
}: {
  list: ShoppingListDetailDto;
  products: ProductDto[];
  units: UnitDto[];
  onChange: (list: ShoppingListDetailDto) => void;
}) {
  const [form, setForm] = useState(emptyItemForm);
  const [editingItem, setEditingItem] = useState<ShoppingListItemDto | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setForm({
        productId: editingItem.productId,
        quantity: editingItem.quantity,
        unitId: editingItem.unitId,
        expectedPrice: editingItem.expectedPrice ?? "",
        priority: editingItem.priority,
        notes: editingItem.notes ?? ""
      });
      return;
    }

    setForm({
      ...emptyItemForm,
      productId: products[0]?.id ?? "",
      unitId: products[0]?.defaultUnitId ?? units[0]?.id ?? ""
    });
  }, [editingItem, products, units]);

  function selectProduct(productId: string) {
    const product = products.find((candidate) => candidate.id === productId);
    setForm((current) => ({ ...current, productId, unitId: product?.defaultUnitId ?? current.unitId }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input: UpsertShoppingListItemRequest = {
      productId: form.productId,
      quantity: form.quantity,
      unitId: form.unitId,
      expectedPrice: form.expectedPrice || null,
      priority: form.priority,
      notes: form.notes || null
    };
    setSaving(true);
    try {
      const nextList = editingItem
        ? await updateShoppingListItem(list.id, editingItem.id, input)
        : await addShoppingListItem(list.id, input);
      setEditingItem(null);
      onChange(nextList);
    } finally {
      setSaving(false);
    }
  }

  async function removeItem(itemId: string) {
    onChange(await deleteShoppingListItem(list.id, itemId));
  }

  async function moveItem(itemId: string, direction: -1 | 1) {
    const currentIndex = list.items.findIndex((item) => item.id === itemId);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= list.items.length) return;
    const itemIds = list.items.map((item) => item.id);
    [itemIds[currentIndex], itemIds[nextIndex]] = [itemIds[nextIndex], itemIds[currentIndex]];
    onChange(await reorderShoppingListItems(list.id, { itemIds }));
  }

  return (
    <section className="resource-panel">
      <h2>Itens da lista</h2>
      <form className="resource-form" onSubmit={submit}>
        <label>
          Produto
          <select value={form.productId} onChange={(event) => selectProduct(event.target.value)} required>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantidade
          <input value={form.quantity} onChange={(event) => setForm((current) => ({ ...current, quantity: event.target.value }))} required />
        </label>
        <label>
          Unidade
          <select value={form.unitId} onChange={(event) => setForm((current) => ({ ...current, unitId: event.target.value }))} required>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name} ({unit.abbreviation})
              </option>
            ))}
          </select>
        </label>
        <label>
          Preço esperado
          <input
            inputMode="decimal"
            value={form.expectedPrice}
            onChange={(event) => setForm((current) => ({ ...current, expectedPrice: event.target.value }))}
          />
        </label>
        <label>
          Prioridade
          <select
            value={form.priority}
            onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value as "low" | "normal" | "high" }))}
          >
            <option value="low">Baixa</option>
            <option value="normal">Normal</option>
            <option value="high">Alta</option>
          </select>
        </label>
        <label className="span-2">
          Observações
          <textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
        </label>
        <div className="form-actions span-2">
          {editingItem ? (
            <button type="button" className="button secondary" onClick={() => setEditingItem(null)}>
              Cancelar
            </button>
          ) : null}
          <button type="submit" className="button primary" disabled={saving || products.length === 0 || units.length === 0}>
            {editingItem ? "Salvar item" : "Adicionar item"}
          </button>
        </div>
      </form>

      <div className="resource-list">
        {list.items.map((item) => (
          <article className="resource-row" key={item.id}>
            <div>
              <strong>{item.productName}</strong>
              <span>
                {item.quantity} {item.unit.abbreviation}
                {item.expectedPrice ? ` · R$ ${item.expectedPrice}` : ""} · {item.priority}
              </span>
            </div>
            <div className="row-actions">
              <button type="button" className="button secondary" onClick={() => moveItem(item.id, -1)}>
                Subir
              </button>
              <button type="button" className="button secondary" onClick={() => moveItem(item.id, 1)}>
                Descer
              </button>
              <button type="button" className="button secondary" onClick={() => setEditingItem(item)}>
                Editar
              </button>
              <button type="button" className="button danger" onClick={() => removeItem(item.id)}>
                Remover
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
