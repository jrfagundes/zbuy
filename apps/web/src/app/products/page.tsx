"use client";

import React, { useEffect, useState } from "react";
import type { ProductDto, UnitDto, UpsertProductRequest } from "@zbuy/shared";
import { AppShell } from "../../components/AppShell";
import { archiveProduct, createProduct, listProducts, listUnits, updateProduct } from "../../lib/resources";
import { ProductForm } from "./ProductForm";

export default function ProductsPage() {
  const [units, setUnits] = useState<UnitDto[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [query, setQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<ProductDto | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  async function loadProducts(search = query) {
    const [{ units: unitList }, { products: productList }] = await Promise.all([listUnits(), listProducts(search)]);
    setUnits(unitList);
    setProducts(productList);
    setStatus("ready");
  }

  useEffect(() => {
    loadProducts().catch(() => setStatus("error"));
  }, []);

  async function saveProduct(input: UpsertProductRequest) {
    if (editingProduct) {
      await updateProduct(editingProduct.id, input);
      setEditingProduct(null);
    } else {
      await createProduct(input);
    }
    await loadProducts();
  }

  async function archive(id: string) {
    await archiveProduct(id);
    await loadProducts();
  }

  return (
    <AppShell title="Produtos">
      <section className="resource-grid">
        <div className="resource-panel">
          <h2>{editingProduct ? "Editar produto" : "Novo produto"}</h2>
          <ProductForm units={units} editingProduct={editingProduct} onSubmit={saveProduct} onCancel={() => setEditingProduct(null)} />
        </div>
        <div className="resource-panel">
          <div className="panel-heading">
            <h2>Catálogo</h2>
            <label className="search-field">
              Buscar produto
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") void loadProducts(query);
                }}
              />
            </label>
          </div>
          {status === "loading" ? <p className="muted">Carregando produtos.</p> : null}
          {status === "error" ? <p className="form-message error">Não foi possível carregar os produtos.</p> : null}
          {status === "ready" && products.length === 0 ? <p className="muted">Nenhum produto cadastrado.</p> : null}
          <div className="resource-list">
            {products.map((product) => (
              <article className="resource-row" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <span>
                    {product.categoryLabel} · {product.defaultUnit.abbreviation}
                    {product.estimatedPrice ? ` · R$ ${product.estimatedPrice}` : ""}
                  </span>
                </div>
                <div className="row-actions">
                  <button type="button" className="button secondary" onClick={() => setEditingProduct(product)}>
                    Editar
                  </button>
                  <button type="button" className="button danger" onClick={() => archive(product.id)}>
                    Arquivar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
