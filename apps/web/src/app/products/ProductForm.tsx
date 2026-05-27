"use client";

import React, { FormEvent, useEffect, useState } from "react";
import type { ProductDto, UnitDto, UpsertProductRequest } from "@zbuy/shared";
import { BarcodeScanner } from "../../components/BarcodeScanner";

const emptyForm = {
  name: "",
  categoryLabel: "",
  brand: "",
  barcode: "",
  defaultUnitId: "",
  estimatedPrice: "",
  notes: ""
};

export function ProductForm({
  units,
  editingProduct,
  onSubmit,
  onCancel
}: {
  units: UnitDto[];
  editingProduct: ProductDto | null;
  onSubmit: (input: UpsertProductRequest) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        categoryLabel: editingProduct.categoryLabel,
        brand: editingProduct.brand ?? "",
        barcode: editingProduct.barcode ?? "",
        defaultUnitId: editingProduct.defaultUnitId,
        estimatedPrice: editingProduct.estimatedPrice ?? "",
        notes: editingProduct.notes ?? ""
      });
      return;
    }

    setForm({ ...emptyForm, defaultUnitId: units[0]?.id ?? "" });
  }, [editingProduct, units]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        name: form.name,
        categoryLabel: form.categoryLabel,
        brand: form.brand || null,
        barcode: form.barcode || null,
        defaultUnitId: form.defaultUnitId,
        estimatedPrice: form.estimatedPrice || null,
        notes: form.notes || null
      });
      setForm({ ...emptyForm, defaultUnitId: units[0]?.id ?? "" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {scanning ? (
        <BarcodeScanner
          onDetected={(barcode) => {
            setForm((current) => ({ ...current, barcode }));
            setScanning(false);
          }}
          onClose={() => setScanning(false)}
        />
      ) : null}

      <form className="resource-form" onSubmit={submit}>
        <label>
          Nome do produto
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            required
          />
        </label>
        <label>
          Categoria
          <input
            value={form.categoryLabel}
            onChange={(event) => setForm((current) => ({ ...current, categoryLabel: event.target.value }))}
            required
          />
        </label>
        <label>
          Marca
          <input value={form.brand} onChange={(event) => setForm((current) => ({ ...current, brand: event.target.value }))} />
        </label>
        <div className="barcode-field">
          <label>
            Código de barras
            <input
              value={form.barcode}
              onChange={(event) => setForm((current) => ({ ...current, barcode: event.target.value }))}
              placeholder="EAN-13, UPC..."
            />
          </label>
          <button type="button" className="button secondary" onClick={() => setScanning(true)} title="Escanear código de barras">
            Escanear
          </button>
        </div>
        <label>
          Unidade padrão
          <select
            value={form.defaultUnitId}
            onChange={(event) => setForm((current) => ({ ...current, defaultUnitId: event.target.value }))}
            required
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name} ({unit.abbreviation})
              </option>
            ))}
          </select>
        </label>
        <label>
          Preço estimado
          <input
            inputMode="decimal"
            value={form.estimatedPrice}
            onChange={(event) => setForm((current) => ({ ...current, estimatedPrice: event.target.value }))}
          />
        </label>
        <label className="span-2">
          Observações
          <textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
        </label>
        <div className="form-actions span-2">
          {editingProduct ? (
            <button type="button" className="button secondary" onClick={onCancel}>
              Cancelar
            </button>
          ) : null}
          <button type="submit" className="button primary" disabled={saving || units.length === 0}>
            {editingProduct ? "Salvar alterações" : "Salvar produto"}
          </button>
        </div>
      </form>
    </>
  );
}
