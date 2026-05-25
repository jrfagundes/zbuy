"use client";

import React, { DragEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  ShoppingSessionDetailDto,
  ShoppingSessionItemDto,
  ShoppingSessionItemStatus
} from "@zbuy/shared";
import {
  cancelShoppingSession,
  completeShoppingSession,
  updateShoppingSessionItem
} from "../../../lib/resources";

type BoardStatus = Extract<ShoppingSessionItemStatus, "pending" | "bought" | "not_found">;
type BoardUpdate = {
  status?: BoardStatus;
  actualPrice?: string | null;
  notes?: string | null;
};

const columns: Array<{ status: BoardStatus; title: string }> = [
  { status: "pending", title: "Pendente" },
  { status: "bought", title: "Comprado" },
  { status: "not_found", title: "Não encontrado" }
];

function itemAmount(item: ShoppingSessionItemDto) {
  return `${item.quantity} ${item.snapshotUnitAbbreviation}`;
}

function statusLabel(status: BoardStatus) {
  if (status === "bought") return "comprado";
  if (status === "not_found") return "não encontrado";
  return "pendente";
}

export function SessionBoard({ session: initialSession }: { session: ShoppingSessionDetailDto }) {
  const router = useRouter();
  const [session, setSession] = useState(initialSession);
  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>({});
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const sessionActionRunning = finishing || canceling;

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession]);

  const groupedItems = useMemo(() => {
    return columns.reduce(
      (groups, column) => {
        groups[column.status] = session.items.filter((item) => item.status === column.status);
        return groups;
      },
      { pending: [], bought: [], not_found: [] } as Record<BoardStatus, ShoppingSessionItemDto[]>
    );
  }, [session.items]);

  const unprocessedItems = session.items.filter((item) => item.status === "unprocessed");

  async function updateItem(item: ShoppingSessionItemDto, input: BoardUpdate) {
    if (savingId) return;

    setSavingId(item.id);
    setMessage(null);
    try {
      const updatedSession = await updateShoppingSessionItem(session.id, item.id, input);
      setSession(updatedSession);
    } catch {
      setMessage("Não foi possível atualizar o item.");
    } finally {
      setSavingId(null);
    }
  }

  function onDragStart(event: DragEvent<HTMLElement>, item: ShoppingSessionItemDto) {
    if (savingId) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData("text/plain", item.id);
    event.dataTransfer.effectAllowed = "move";
    setDraggedItemId(item.id);
  }

  function onDragOver(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  async function onDrop(event: DragEvent<HTMLElement>, targetStatus: BoardStatus) {
    event.preventDefault();
    if (savingId) return;

    const itemId = event.dataTransfer.getData("text/plain") || draggedItemId;
    setDraggedItemId(null);
    if (!itemId) return;

    const item = session.items.find((candidate) => candidate.id === itemId);
    if (!item || item.status === targetStatus) return;
    await updateItem(item, { status: targetStatus });
  }

  async function savePrice(item: ShoppingSessionItemDto) {
    if (savingId) return;

    const currentValue = item.actualPrice ?? "";
    const nextValue = (priceDrafts[item.id] ?? currentValue).trim();
    if (nextValue === currentValue) return;
    await updateItem(item, { actualPrice: nextValue || null });
  }

  async function saveNotes(item: ShoppingSessionItemDto) {
    if (savingId) return;

    const currentValue = item.notes ?? "";
    const nextValue = (noteDrafts[item.id] ?? currentValue).trim();
    if (nextValue === currentValue) return;
    await updateItem(item, { notes: nextValue || null });
  }

  async function completeSession() {
    if (sessionActionRunning) return;

    setFinishing(true);
    setMessage(null);
    try {
      await completeShoppingSession(session.id);
      router.push(`/history/${session.id}`);
    } catch {
      setMessage("Não foi possível finalizar a compra.");
    } finally {
      setFinishing(false);
    }
  }

  async function cancelSession() {
    if (sessionActionRunning) return;

    setCanceling(true);
    setMessage(null);
    try {
      await cancelShoppingSession(session.id);
      router.push("/purchases");
    } catch {
      setMessage("Não foi possível cancelar a sessão.");
    } finally {
      setCanceling(false);
    }
  }

  return (
    <section className="detail-stack">
      <div className="form-actions">
        <button type="button" className="button primary" onClick={() => void completeSession()} disabled={sessionActionRunning}>
          Finalizar compra
        </button>
        <button type="button" className="button danger" onClick={() => void cancelSession()} disabled={sessionActionRunning}>
          Cancelar sessão
        </button>
      </div>

      {message ? <p className="form-message error">{message}</p> : null}

      <div className="kanban-board" aria-label="Itens da sessão">
        {columns.map((column) => (
          <section
            className="kanban-column"
            key={column.status}
            onDragOver={onDragOver}
            onDrop={(event) => void onDrop(event, column.status)}
          >
            <div className="metric-row">
              <h2>{column.title}</h2>
              <span className="status-pill">{groupedItems[column.status].length}</span>
            </div>

            {groupedItems[column.status].length === 0 ? <p className="muted">Nenhum item.</p> : null}

            {groupedItems[column.status].map((item) => {
              const priceValue = priceDrafts[item.id] ?? item.actualPrice ?? "";
              const notesValue = noteDrafts[item.id] ?? item.notes ?? "";
              return (
                <article className="session-card" key={item.id} draggable={!savingId} onDragStart={(event) => onDragStart(event, item)}>
                  <div>
                    <strong>{item.snapshotProductName}</strong>
                    <p className="muted">
                      {item.snapshotCategoryLabel} · {itemAmount(item)}
                      {item.snapshotBrand ? ` · ${item.snapshotBrand}` : ""}
                    </p>
                  </div>

                  <div className="metric-row">
                    <span className="muted">Esperado: {item.expectedPrice ?? "-"}</span>
                    <span className="status-pill">{statusLabel(column.status)}</span>
                  </div>

                  {column.status === "bought" ? (
                    <label className="search-field">
                      Preço real de {item.snapshotProductName}
                      <input
                        inputMode="decimal"
                        value={priceValue}
                        disabled={Boolean(savingId)}
                        onBlur={() => void savePrice(item)}
                        onChange={(event) => setPriceDrafts((current) => ({ ...current, [item.id]: event.target.value }))}
                      />
                    </label>
                  ) : null}

                  <label className="search-field">
                    Notas de {item.snapshotProductName}
                    <input
                      value={notesValue}
                      disabled={Boolean(savingId)}
                      onBlur={() => void saveNotes(item)}
                      onChange={(event) => setNoteDrafts((current) => ({ ...current, [item.id]: event.target.value }))}
                    />
                  </label>

                  <div className="row-actions">
                    {column.status !== "bought" ? (
                      <button
                        type="button"
                        className="button secondary"
                        onClick={() => void updateItem(item, { status: "bought" })}
                        disabled={Boolean(savingId)}
                      >
                        Marcar {item.snapshotProductName} como comprado
                      </button>
                    ) : null}
                    {column.status !== "not_found" ? (
                      <button
                        type="button"
                        className="button secondary"
                        onClick={() => void updateItem(item, { status: "not_found" })}
                        disabled={Boolean(savingId)}
                      >
                        Marcar {item.snapshotProductName} como não encontrado
                      </button>
                    ) : null}
                    {column.status !== "pending" ? (
                      <button
                        type="button"
                        className="button secondary"
                        onClick={() => void updateItem(item, { status: "pending" })}
                        disabled={Boolean(savingId)}
                      >
                        Voltar {item.snapshotProductName} para pendente
                      </button>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </section>
        ))}
      </div>

      {unprocessedItems.length > 0 ? (
        <section className="resource-panel">
          <h2>Itens não processados</h2>
          <div className="resource-list">
            {unprocessedItems.map((item) => (
              <article className="resource-row" key={item.id}>
                <div>
                  <strong>{item.snapshotProductName}</strong>
                  <span>{itemAmount(item)}</span>
                </div>
                <span className="status-pill">unprocessed</span>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
