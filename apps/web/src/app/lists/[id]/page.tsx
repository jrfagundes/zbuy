"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { ProductDto, ShoppingListDetailDto, UnitDto } from "@zbuy/shared";
import { AppShell } from "../../../components/AppShell";
import { getShoppingList, listProducts, listUnits, updateShoppingList } from "../../../lib/resources";
import { ListItemsEditor } from "./ListItemsEditor";

export default function ListDetailPage() {
  const params = useParams<{ id: string }>();
  const listId = params.id;
  const [list, setList] = useState<ShoppingListDetailDto | null>(null);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [units, setUnits] = useState<UnitDto[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  async function loadDetail() {
    const [detail, productResponse, unitResponse] = await Promise.all([getShoppingList(listId), listProducts(), listUnits()]);
    setList(detail);
    setName(detail.name);
    setDescription(detail.description ?? "");
    setProducts(productResponse.products);
    setUnits(unitResponse.units);
    setStatus("ready");
  }

  useEffect(() => {
    loadDetail().catch(() => setStatus("error"));
  }, [listId]);

  async function saveList() {
    const nextList = await updateShoppingList(listId, { name, description: description || null });
    setList(nextList);
  }

  return (
    <AppShell title={list?.name ?? "Lista"}>
      {status === "loading" ? <p className="muted">Carregando lista.</p> : null}
      {status === "error" ? <p className="form-message error">Não foi possível carregar a lista.</p> : null}
      {list ? (
        <section className="detail-stack">
          <div className="resource-panel">
            <h2>Detalhes</h2>
            <div className="resource-form compact-form">
              <label>
                Nome da lista
                <input value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <label>
                Descrição
                <input value={description} onChange={(event) => setDescription(event.target.value)} />
              </label>
              <div className="form-actions span-2">
                <button type="button" className="button primary" onClick={saveList}>
                  Salvar lista
                </button>
              </div>
            </div>
          </div>
          <ListItemsEditor list={list} products={products} units={units} onChange={setList} />
        </section>
      ) : null}
    </AppShell>
  );
}
