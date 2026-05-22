"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { ShoppingListSummaryDto, UpsertShoppingListRequest } from "@zbuy/shared";
import { AppShell } from "../../components/AppShell";
import {
  archiveShoppingList,
  createShoppingList,
  deleteShoppingList,
  duplicateShoppingList,
  listShoppingLists,
  updateShoppingList
} from "../../lib/resources";
import { ListForm } from "./ListForm";

export default function ListsPage() {
  const [lists, setLists] = useState<ShoppingListSummaryDto[]>([]);
  const [editingList, setEditingList] = useState<ShoppingListSummaryDto | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  async function loadLists() {
    const response = await listShoppingLists();
    setLists(response.shoppingLists);
    setStatus("ready");
  }

  useEffect(() => {
    loadLists().catch(() => setStatus("error"));
  }, []);

  async function saveList(input: UpsertShoppingListRequest) {
    if (editingList) {
      await updateShoppingList(editingList.id, input);
      setEditingList(null);
    } else {
      await createShoppingList(input);
    }
    await loadLists();
  }

  async function archive(id: string) {
    await archiveShoppingList(id);
    await loadLists();
  }

  async function remove(id: string) {
    await deleteShoppingList(id);
    await loadLists();
  }

  async function duplicate(id: string) {
    await duplicateShoppingList(id);
    await loadLists();
  }

  return (
    <AppShell title="Listas">
      <section className="resource-grid">
        <div className="resource-panel">
          <h2>{editingList ? "Editar lista" : "Nova lista"}</h2>
          <ListForm editingList={editingList} onSubmit={saveList} onCancel={() => setEditingList(null)} />
        </div>
        <div className="resource-panel">
          <h2>Listas reutilizáveis</h2>
          {status === "loading" ? <p className="muted">Carregando listas.</p> : null}
          {status === "error" ? <p className="form-message error">Não foi possível carregar as listas.</p> : null}
          {status === "ready" && lists.length === 0 ? <p className="muted">Nenhuma lista criada.</p> : null}
          <div className="resource-list">
            {lists.map((list) => (
              <article className="resource-row" key={list.id}>
                <div>
                  <Link href={`/lists/${list.id}`}>
                    <strong>{list.name}</strong>
                  </Link>
                  <span>
                    {list.itemCount} itens{list.description ? ` · ${list.description}` : ""}
                  </span>
                </div>
                <div className="row-actions">
                  <button type="button" className="button secondary" onClick={() => setEditingList(list)}>
                    Editar
                  </button>
                  <button type="button" className="button secondary" onClick={() => duplicate(list.id)} aria-label={`Duplicar ${list.name}`}>
                    Duplicar
                  </button>
                  <button type="button" className="button secondary" onClick={() => archive(list.id)}>
                    Arquivar
                  </button>
                  <button type="button" className="button danger" onClick={() => remove(list.id)}>
                    Excluir
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
