"use client";

import Link from "next/link";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import type {
  PurchaseLocationDto,
  PurchaseLocationType,
  ShoppingJourneyHistoryStopDto,
  ShoppingListSummaryDto,
  ShoppingSessionSummaryDto
} from "@zbuy/shared";
import { AppShell } from "../../components/AppShell";
import { listPurchaseHistoryJourneyStops, listPurchaseHistorySessions, listPurchaseLocations, listShoppingLists } from "../../lib/resources";

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
    dateFrom: normalizeDateFrom(filters.dateFrom),
    dateTo: normalizeDateTo(filters.dateTo),
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

function normalizeDateFrom(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? `${trimmed}T00:00:00.000Z` : trimmed;
}

function normalizeDateTo(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? `${trimmed}T23:59:59.999Z` : trimmed;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
}

function completedDate(session: ShoppingSessionSummaryDto) {
  return formatDate(session.completedAt);
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
  const [journeyStops, setJourneyStops] = useState<ShoppingJourneyHistoryStopDto[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const historyRequestId = useRef(0);

  async function loadHistory(nextFilters = filters) {
    const requestId = historyRequestId.current + 1;
    historyRequestId.current = requestId;
    setStatus("loading");
    try {
      const [sessionResponse, journeyResponse] = await Promise.all([
        listPurchaseHistorySessions(toHistoryFilters(nextFilters)),
        listPurchaseHistoryJourneyStops(toHistoryFilters(nextFilters))
      ]);
      if (historyRequestId.current !== requestId) return;
      setSessions(sessionResponse.shoppingSessions);
      setJourneyStops(journeyResponse.shoppingJourneyStops);
      setStatus("ready");
    } catch {
      if (historyRequestId.current !== requestId) return;
      setStatus("error");
    }
  }

  useEffect(() => {
    let active = true;

    Promise.all([listPurchaseLocations(), listShoppingLists()])
      .then(([purchaseLocations, shoppingLists]) => {
        if (!active) return;
        setLocations(purchaseLocations.purchaseLocations);
        setLists(shoppingLists.shoppingLists);
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });
    void loadHistory(initialFilters);

    return () => {
      active = false;
      historyRequestId.current += 1;
    };
  }, []);

  async function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadHistory(filters);
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
          <h2>Jornadas físicas concluídas</h2>
          {status === "loading" ? <p className="muted">Carregando histórico.</p> : null}
          {status === "error" ? <p className="form-message error">Não foi possível carregar o histórico.</p> : null}
          {status === "ready" && journeyStops.length === 0 ? <p className="muted">Nenhuma jornada encontrada.</p> : null}

          <div className="resource-list">
            {journeyStops.map((stop) => (
              <article className="session-card" key={stop.id}>
                <div className="metric-row">
                  <div>
                    <strong>{stop.sourceLists.map((l) => l.name).join(", ")}</strong>
                    <p className="muted">
                      {formatDate(stop.finishedAt)} · {stop.supermarketName}
                    </p>
                  </div>
                </div>

                <div className="purchase-summary">
                  <span>Supermercado: {stop.supermarketName}</span>
                  <span>{stop.sourceLists.length > 1 ? "Listas" : "Lista"} origem: {stop.sourceLists.map((l) => l.name).join(", ")}</span>
                  <span>Total conhecido: R$ {stop.knownTotal}</span>
                  <span>Comprados: {stop.itemCounts.bought}</span>
                  <span>Não encontrados: {stop.itemCounts.notFound}</span>
                  <span>Não processados: {stop.itemCounts.unprocessed}</span>
                </div>

                {stop.boughtItemsWithoutPriceCount > 0 ? (
                  <p className="form-message error">{stop.boughtItemsWithoutPriceCount} comprado(s) sem preço real.</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="resource-panel">
          <h2>Sessões concluídas</h2>
          {status === "loading" ? null : null}
          {status === "ready" && sessions.length === 0 ? <p className="muted">Nenhuma sessão encontrada.</p> : null}

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
