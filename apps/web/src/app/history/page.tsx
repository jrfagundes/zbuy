"use client";

import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import type {
  PurchaseLocationDto,
  PurchaseLocationType,
  ShoppingListSummaryDto,
  ShoppingSessionSummaryDto
} from "@zbuy/shared";
import { AppShell } from "../../components/AppShell";
import { listPurchaseHistorySessions, listPurchaseLocations, listShoppingLists } from "../../lib/resources";

type HistoryFilterForm = {
  dateFrom: string;
  dateTo: string;
  locationId: string;
  locationType: "" | PurchaseLocationType;
  productQuery: string;
  sourceListId: string;
  itemStatus: "" | "bought" | "not_found" | "unprocessed";
  minPrice: string;
  maxPrice: string;
  withoutPrice: boolean;
};

const initialFilters: HistoryFilterForm = {
  dateFrom: "",
  dateTo: "",
  locationId: "",
  locationType: "",
  productQuery: "",
  sourceListId: "",
  itemStatus: "",
  minPrice: "",
  maxPrice: "",
  withoutPrice: false
};

function toHistoryFilters(filters: HistoryFilterForm) {
  return {
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
    locationId: filters.locationId || undefined,
    locationType: filters.locationType || undefined,
    productQuery: filters.productQuery.trim() || undefined,
    sourceListId: filters.sourceListId || undefined,
    itemStatus: filters.itemStatus || undefined,
    minPrice: filters.minPrice.trim() || undefined,
    maxPrice: filters.maxPrice.trim() || undefined,
    withoutPrice: filters.withoutPrice || undefined
  };
}

function completedDate(session: ShoppingSessionSummaryDto) {
  if (!session.completedAt) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR").format(new Date(session.completedAt));
}

function countTotal(session: ShoppingSessionSummaryDto) {
  return (
    session.itemCounts.pending +
    session.itemCounts.bought +
    session.itemCounts.notFound +
    session.itemCounts.unprocessed
  );
}

export default function HistoryPage() {
  const [filters, setFilters] = useState<HistoryFilterForm>(initialFilters);
  const [locations, setLocations] = useState<PurchaseLocationDto[]>([]);
  const [lists, setLists] = useState<ShoppingListSummaryDto[]>([]);
  const [sessions, setSessions] = useState<ShoppingSessionSummaryDto[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  async function loadHistory(nextFilters = filters) {
    setStatus("loading");
    const response = await listPurchaseHistorySessions(toHistoryFilters(nextFilters));
    setSessions(response.shoppingSessions);
    setStatus("ready");
  }

  useEffect(() => {
    let active = true;

    Promise.all([listPurchaseLocations(), listShoppingLists(), listPurchaseHistorySessions()])
      .then(([purchaseLocations, shoppingLists, historySessions]) => {
        if (!active) return;
        setLocations(purchaseLocations.purchaseLocations);
        setLists(shoppingLists.shoppingLists);
        setSessions(historySessions.shoppingSessions);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  async function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await loadHistory(filters);
    } catch {
      setStatus("error");
    }
  }

  return (
    <AppShell title="Histórico">
      <section className="detail-stack">
        <section className="resource-panel">
          <h2>Filtros</h2>
          <form className="history-filters" onSubmit={(event) => void applyFilters(event)}>
            <label>
              Data inicial
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(event) => setFilters((current) => ({ ...current, dateFrom: event.target.value }))}
              />
            </label>
            <label>
              Data final
              <input
                type="date"
                value={filters.dateTo}
                onChange={(event) => setFilters((current) => ({ ...current, dateTo: event.target.value }))}
              />
            </label>
            <label>
              Local
              <select
                value={filters.locationId}
                onChange={(event) => setFilters((current) => ({ ...current, locationId: event.target.value }))}
              >
                <option value="">Todos</option>
                {locations.map((location) => (
                  <option value={location.id} key={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tipo de local
              <select
                value={filters.locationType}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, locationType: event.target.value as HistoryFilterForm["locationType"] }))
                }
              >
                <option value="">Todos</option>
                <option value="physical">Físico</option>
                <option value="online">Online</option>
              </select>
            </label>
            <label>
              Produto
              <input
                value={filters.productQuery}
                onChange={(event) => setFilters((current) => ({ ...current, productQuery: event.target.value }))}
              />
            </label>
            <label>
              Lista origem
              <select
                value={filters.sourceListId}
                onChange={(event) => setFilters((current) => ({ ...current, sourceListId: event.target.value }))}
              >
                <option value="">Todas</option>
                {lists.map((list) => (
                  <option value={list.id} key={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Status do item
              <select
                value={filters.itemStatus}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, itemStatus: event.target.value as HistoryFilterForm["itemStatus"] }))
                }
              >
                <option value="">Todos</option>
                <option value="bought">Comprado</option>
                <option value="not_found">Não encontrado</option>
                <option value="unprocessed">Não processado</option>
              </select>
            </label>
            <label>
              Preço mínimo
              <input
                inputMode="decimal"
                value={filters.minPrice}
                onChange={(event) => setFilters((current) => ({ ...current, minPrice: event.target.value }))}
              />
            </label>
            <label>
              Preço máximo
              <input
                inputMode="decimal"
                value={filters.maxPrice}
                onChange={(event) => setFilters((current) => ({ ...current, maxPrice: event.target.value }))}
              />
            </label>
            <label>
              <span>Somente comprados sem preço</span>
              <input
                type="checkbox"
                checked={filters.withoutPrice}
                onChange={(event) => setFilters((current) => ({ ...current, withoutPrice: event.target.checked }))}
              />
            </label>
            <button type="submit" className="button primary">
              Aplicar filtros
            </button>
          </form>
        </section>

        <section className="resource-panel">
          <h2>Sessões concluídas</h2>
          {status === "loading" ? <p className="muted">Carregando histórico.</p> : null}
          {status === "error" ? <p className="form-message error">Não foi possível carregar o histórico.</p> : null}
          {status === "ready" && sessions.length === 0 ? <p className="muted">Nenhum histórico encontrado.</p> : null}

          <div className="resource-list">
            {sessions.map((session) => (
              <article className="session-card" key={session.id}>
                <div className="metric-row">
                  <div>
                    <strong>{session.sourceListName}</strong>
                    <p className="muted">
                      {completedDate(session)} · {session.purchaseLocation.name} · {session.context}
                    </p>
                  </div>
                  <Link className="button secondary" href={`/history/${session.id}`} aria-label={`Ver detalhes de ${session.sourceListName}`}>
                    Ver detalhes
                  </Link>
                </div>

                <div className="purchase-summary">
                  <span>Local: {session.purchaseLocation.name}</span>
                  <span>Contexto: {session.context}</span>
                  <span>Lista origem: {session.sourceListName}</span>
                  <span>Total conhecido: R$ {session.knownTotal}</span>
                  <span>Comprados: {session.itemCounts.bought}</span>
                  <span>Não encontrados: {session.itemCounts.notFound}</span>
                  <span>Não processados: {session.itemCounts.unprocessed}</span>
                  <span>Itens: {countTotal(session)}</span>
                </div>

                {session.boughtItemsWithoutPriceCount > 0 ? (
                  <p className="form-message error">{session.boughtItemsWithoutPriceCount} comprado(s) sem preço real.</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </section>
    </AppShell>
  );
}
