"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import type {
  PurchaseLocationDto,
  ShoppingJourneyDetailDto,
  ShoppingListSummaryDto,
  ShoppingSessionContext,
  ShoppingSessionSummaryDto,
  StartShoppingSessionRequest,
  UpsertPurchaseLocationRequest
} from "@zbuy/shared";
import { AppShell } from "../../components/AppShell";
import {
  cancelShoppingSession,
  createPurchaseLocation,
  getActiveShoppingJourney,
  getActiveShoppingSession,
  listPurchaseLocations,
  listShoppingLists,
  listShoppingSessions,
  startShoppingSession
} from "../../lib/resources";
import { PhysicalJourneyStartForm } from "./PhysicalJourneyStartForm";
import { StartPurchaseForm } from "./StartPurchaseForm";

const recentSessionsLimit = 5;

function sessionDate(session: ShoppingSessionSummaryDto) {
  return session.completedAt ?? session.canceledAt ?? session.startedAt;
}

async function loadRecentSessions() {
  const [completed, canceled] = await Promise.all([
    listShoppingSessions("completed", recentSessionsLimit),
    listShoppingSessions("canceled", recentSessionsLimit)
  ]);

  return [...completed.shoppingSessions, ...canceled.shoppingSessions]
    .sort((left, right) => sessionDate(right).localeCompare(sessionDate(left)))
    .slice(0, recentSessionsLimit);
}

function sessionLink(session: ShoppingSessionSummaryDto) {
  if (session.status === "active") return `/purchases/${session.id}`;
  if (session.status === "completed") return `/history/${session.id}`;
  return null;
}

function SessionFacts({ session }: { session: ShoppingSessionSummaryDto }) {
  return (
    <div className="purchase-summary">
      <div>
        <span className="muted">Local</span>
        <strong>{session.purchaseLocation.name}</strong>
      </div>
      <div>
        <span className="muted">Lista</span>
        <strong>{session.sourceListName}</strong>
      </div>
      <div>
        <span className="muted">Status</span>
        <strong>{session.status}</strong>
      </div>
      <div>
        <span className="muted">Itens</span>
        <strong>{session.itemCounts.pending + session.itemCounts.bought + session.itemCounts.notFound + session.itemCounts.unprocessed}</strong>
      </div>
    </div>
  );
}

export default function PurchasesPage() {
  const router = useRouter();
  const [activeSession, setActiveSession] = useState<ShoppingSessionSummaryDto | null>(null);
  const [activeJourney, setActiveJourney] = useState<ShoppingJourneyDetailDto | null>(null);
  const [recentSessions, setRecentSessions] = useState<ShoppingSessionSummaryDto[]>([]);
  const [lists, setLists] = useState<ShoppingListSummaryDto[]>([]);
  const [locations, setLocations] = useState<PurchaseLocationDto[]>([]);
  const [context, setContext] = useState<ShoppingSessionContext>("physical");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [canceling, setCanceling] = useState(false);
  const [locationStatus, setLocationStatus] = useState<"ready" | "loading" | "error">("ready");
  const locationRequestId = useRef(0);

  async function loadDashboard(selectedContext = context) {
    const [active, journey, sessions, shoppingLists, purchaseLocations] = await Promise.all([
      getActiveShoppingSession(),
      getActiveShoppingJourney(),
      loadRecentSessions(),
      listShoppingLists(),
      listPurchaseLocations(selectedContext)
    ]);
    setActiveSession(active);
    setActiveJourney(journey);
    setRecentSessions(sessions);
    setLists(shoppingLists.shoppingLists);
    setLocations(purchaseLocations.purchaseLocations);
    setStatus("ready");
  }

  useEffect(() => {
    loadDashboard().catch(() => setStatus("error"));
  }, []);

  async function changeContext(nextContext: ShoppingSessionContext) {
    const requestId = locationRequestId.current + 1;
    locationRequestId.current = requestId;
    setContext(nextContext);
    setLocationStatus("loading");
    try {
      const response = await listPurchaseLocations(nextContext);
      if (locationRequestId.current !== requestId) return;
      setLocations(response.purchaseLocations);
      setLocationStatus("ready");
    } catch {
      if (locationRequestId.current !== requestId) return;
      setLocations([]);
      setLocationStatus("error");
    }
  }

  async function createLocation(input: UpsertPurchaseLocationRequest) {
    const location = await createPurchaseLocation(input);
    setLocations((current) => [...current.filter((item) => item.id !== location.id), location]);
    return location;
  }

  async function startSession(input: StartShoppingSessionRequest) {
    return startShoppingSession(input);
  }

  async function cancelActiveSession(id: string) {
    setCanceling(true);
    try {
      await cancelShoppingSession(id);
      setActiveSession(null);
      setRecentSessions(await loadRecentSessions());
    } finally {
      setCanceling(false);
    }
  }

  return (
    <AppShell title="Compras">
      <section className="detail-stack">
        {status === "loading" ? <p className="muted">Carregando compras.</p> : null}
        {status === "error" ? <p className="form-message error">Não foi possível carregar as compras.</p> : null}

        {status === "ready" ? (
          <>
            {activeJourney ? (
              <section className="resource-panel">
                <div className="panel-heading">
                  <h2>Compra física ativa</h2>
                  <span className="status-pill">{activeJourney.status}</span>
                </div>
                <div className="purchase-summary">
                  <div>
                    <span className="muted">Supermercado</span>
                    <strong>{activeJourney.activeStop?.supermarketName ?? "Sem parada ativa"}</strong>
                  </div>
                  <div>
                    <span className="muted">{activeJourney.sourceLists.length > 1 ? "Listas" : "Lista"}</span>
                    <strong>{activeJourney.sourceLists.map((l) => l.name).join(", ")}</strong>
                  </div>
                  <div>
                    <span className="muted">Status</span>
                    <strong>{activeJourney.status}</strong>
                  </div>
                  <div>
                    <span className="muted">Itens</span>
                    <strong>{activeJourney.items.length}</strong>
                  </div>
                </div>
                <div className="form-actions">
                  <Link className="button primary" href={`/journeys/${activeJourney.id}`}>
                    Continuar jornada
                  </Link>
                </div>
              </section>
            ) : activeSession ? (
              <section className="resource-panel">
                <div className="panel-heading">
                  <h2>Sessão ativa</h2>
                  <span className="status-pill">{activeSession.status}</span>
                </div>
                <SessionFacts session={activeSession} />
                <div className="form-actions">
                  <Link className="button primary" href={`/purchases/${activeSession.id}`}>
                    Continuar compra
                  </Link>
                  <button
                    type="button"
                    className="button danger"
                    onClick={() => void cancelActiveSession(activeSession.id)}
                    disabled={canceling}
                  >
                    Cancelar sessão
                  </button>
                </div>
              </section>
            ) : (
              <section className="resource-grid">
                <div className="resource-panel">
                  <h2>Iniciar compra</h2>
                  {locationStatus === "loading" ? <p className="muted">Carregando locais.</p> : null}
                  {locationStatus === "error" ? <p className="form-message error">Não foi possível carregar os locais.</p> : null}
                  {context === "physical" ? (
                    <div className="detail-stack">
                      <label className="search-field">
                        Tipo
                        <select value={context} onChange={(event) => void changeContext(event.target.value as ShoppingSessionContext)}>
                          <option value="physical">Física</option>
                          <option value="online">Online</option>
                        </select>
                      </label>
                      <PhysicalJourneyStartForm
                        lists={lists}
                        onStarted={(journeyId) => router.push(`/journeys/${journeyId}`)}
                      />
                    </div>
                  ) : (
                    <StartPurchaseForm
                      context={context}
                      lists={lists}
                      locations={locations}
                      onContextChange={changeContext}
                      onCreateLocation={createLocation}
                      onStartSession={startSession}
                    />
                  )}
                </div>
                <div className="resource-panel">
                  <h2>Listas reutilizáveis</h2>
                  {lists.length === 0 ? <p className="muted">Nenhuma lista reutilizável criada.</p> : null}
                  <div className="resource-list">
                    {lists.map((list) => (
                      <article className="resource-row" key={list.id}>
                        <div>
                          <strong>{list.name}</strong>
                          <span>
                            {list.itemCount} itens{list.description ? ` · ${list.description}` : ""}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section className="resource-panel">
              <div className="panel-heading">
                <h2>Sessões recentes</h2>
                <Link className="button secondary" href="/history">
                  Ver histórico completo
                </Link>
              </div>
              {recentSessions.length === 0 ? <p className="muted">Nenhuma sessão recente.</p> : null}
              <div className="resource-list">
                {recentSessions.map((session) => {
                  const href = sessionLink(session);
                  return (
                    <article className="session-card" key={session.id}>
                      <div className="metric-row">
                        <div>
                          {href ? (
                            <Link href={href}>
                              <strong>{session.sourceListName}</strong>
                            </Link>
                          ) : (
                            <strong>{session.sourceListName}</strong>
                          )}
                          <span className="muted">
                            {session.purchaseLocation.name} · {session.context}
                          </span>
                        </div>
                        <span className="status-pill">{session.status}</span>
                      </div>
                      <SessionFacts session={session} />
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        ) : null}
      </section>
    </AppShell>
  );
}
