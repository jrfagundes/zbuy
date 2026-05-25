"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { ShoppingListDetailDto, ShoppingSessionDetailDto, ShoppingSessionItemDto } from "@zbuy/shared";
import { AppShell } from "../../../components/AppShell";
import { createContinuationList, getPurchaseHistorySession } from "../../../lib/resources";

function routeParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function formatDate(value: string | null) {
  if (!value) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
}

function itemAmount(item: ShoppingSessionItemDto) {
  return `${item.quantity} ${item.snapshotUnitAbbreviation}`;
}

function priceLabel(value: string | null) {
  return value ? `R$ ${value}` : "-";
}

function HistoryItemCard({ item }: { item: ShoppingSessionItemDto }) {
  return (
    <article className="session-card">
      <div>
        <strong>{item.snapshotProductName}</strong>
        <p className="muted">
          {item.snapshotCategoryLabel} · {itemAmount(item)}
          {item.snapshotBrand ? ` · ${item.snapshotBrand}` : ""}
        </p>
      </div>
      <div className="metric-row">
        <span>Esperado: {priceLabel(item.expectedPrice)}</span>
        <span>Real: {priceLabel(item.actualPrice)}</span>
      </div>
      {item.notes ? <p className="muted">{item.notes}</p> : null}
    </article>
  );
}

export default function HistoryDetailPage() {
  const params = useParams();
  const id = routeParam(params.id);
  const [session, setSession] = useState<ShoppingSessionDetailDto | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [creating, setCreating] = useState(false);
  const [continuationList, setContinuationList] = useState<ShoppingListDetailDto | null>(null);
  const [actionError, setActionError] = useState(false);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    getPurchaseHistorySession(id)
      .then((response) => {
        if (!active) return;
        setSession(response);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [id]);

  const groups = useMemo(() => {
    const items = session?.items ?? [];
    return [
      { title: "Comprados", items: items.filter((item) => item.status === "bought") },
      { title: "Não encontrados", items: items.filter((item) => item.status === "not_found") },
      { title: "Não processados", items: items.filter((item) => item.status === "unprocessed") }
    ];
  }, [session?.items]);

  async function createList() {
    if (creating) return;

    setCreating(true);
    setActionError(false);
    try {
      const response = await createContinuationList(id, {});
      setContinuationList(response);
    } catch {
      setActionError(true);
    } finally {
      setCreating(false);
    }
  }

  return (
    <AppShell title="Histórico">
      <section className="detail-stack">
        {status === "loading" ? <p className="muted">Carregando histórico.</p> : null}
        {status === "error" ? <p className="form-message error">Não foi possível carregar esta sessão do histórico.</p> : null}

        {status === "ready" && session ? (
          <>
            <section className="resource-panel">
              <div className="panel-heading">
                <h2>{session.sourceListName}</h2>
                <span className="status-pill">{session.status}</span>
              </div>

              <div className="purchase-summary">
                <span>Data: {formatDate(session.completedAt)}</span>
                <span>Local: {session.purchaseLocation.name}</span>
                <span>Contexto: {session.context}</span>
                <span>Lista origem: {session.sourceListName}</span>
                <span>Total conhecido: R$ {session.knownTotal}</span>
                <span>Comprados: {session.itemCounts.bought}</span>
                <span>Não encontrados: {session.itemCounts.notFound}</span>
                <span>Não processados: {session.itemCounts.unprocessed}</span>
              </div>

              {session.boughtItemsWithoutPriceCount > 0 ? (
                <p className="form-message error">
                  {session.boughtItemsWithoutPriceCount} item(ns) comprado(s) ainda estão sem preço real.
                </p>
              ) : null}

              <div className="form-actions">
                <button type="button" className="button primary" disabled={creating} onClick={() => void createList()}>
                  Criar lista de continuação
                </button>
                {continuationList ? (
                  <Link className="button secondary" href={`/lists/${continuationList.id}`}>
                    Abrir lista {continuationList.name}
                  </Link>
                ) : null}
              </div>
              {actionError ? <p className="form-message error">Não foi possível criar a lista de continuação.</p> : null}
            </section>

            {groups.map((group) => (
              <section className="resource-panel" key={group.title}>
                <div className="metric-row">
                  <h2>{group.title}</h2>
                  <span className="status-pill">{group.items.length}</span>
                </div>
                {group.items.length === 0 ? <p className="muted">Nenhum item.</p> : null}
                <div className="resource-list">
                  {group.items.map((item) => (
                    <HistoryItemCard item={item} key={item.id} />
                  ))}
                </div>
              </section>
            ))}
          </>
        ) : null}
      </section>
    </AppShell>
  );
}
