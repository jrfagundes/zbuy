"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ShoppingJourneyDetailDto, ShoppingJourneyItemDto, SupermarketDto } from "@zbuy/shared";
import {
  completeShoppingJourney,
  continueJourneyStopOutsideRadius,
  createSupermarketCorridor,
  finishJourneyStop,
  listSupermarkets,
  switchJourneyStopSupermarket,
  updateShoppingJourneyStopItem
} from "../../../lib/resources";

type Drafts = Record<string, { corridorId: string; actualPrice: string }>;

function itemAmount(item: ShoppingJourneyItemDto) {
  return `${item.quantity} ${item.snapshotUnitAbbreviation}`;
}

function activeItems(journey: ShoppingJourneyDetailDto) {
  return journey.items.filter((item) => item.finalStatus === "active");
}

export function JourneyBoard({
  journey: initialJourney,
  onJourneyChange
}: {
  journey: ShoppingJourneyDetailDto;
  onJourneyChange?: (journey: ShoppingJourneyDetailDto) => void;
}) {
  const router = useRouter();
  const [journey, setJourney] = useState(initialJourney);
  const [drafts, setDrafts] = useState<Drafts>({});
  const [supermarkets, setSupermarkets] = useState<SupermarketDto[]>([]);
  const [nextSupermarketId, setNextSupermarketId] = useState("");
  const [lastStopId, setLastStopId] = useState(initialJourney.activeStop?.id ?? "");
  const [showCorridorForm, setShowCorridorForm] = useState(false);
  const [newCorridorName, setNewCorridorName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setJourney(initialJourney);
    if (initialJourney.activeStop) {
      setLastStopId(initialJourney.activeStop.id);
    }
  }, [initialJourney]);

  useEffect(() => {
    if (!journey.activeStop && journey.status === "active") {
      listSupermarkets().then((response) => setSupermarkets(response.supermarkets)).catch(() => setSupermarkets([]));
    }
  }, [journey.activeStop, journey.status]);

  const groups = useMemo(() => {
    const corridors = [...(journey.layout?.corridors ?? [])].sort((left, right) => left.sortOrder - right.sortOrder);
    const items = activeItems(journey);
    return [
      ...corridors.map((corridor) => ({
        id: corridor.id,
        name: corridor.name,
        items: items.filter((item) => item.placement?.corridorId === corridor.id)
      })),
      {
        id: "undefined",
        name: "Sem corredor definido",
        items: items.filter((item) => !item.placement)
      }
    ];
  }, [journey]);

  function updateLocal(updated: ShoppingJourneyDetailDto) {
    setJourney(updated);
    onJourneyChange?.(updated);
  }

  function draftFor(item: ShoppingJourneyItemDto) {
    return {
      corridorId: drafts[item.id]?.corridorId ?? item.placement?.corridorId ?? "",
      actualPrice: drafts[item.id]?.actualPrice ?? item.activeStopItem?.actualPrice ?? ""
    };
  }

  async function updateItem(item: ShoppingJourneyItemDto, status: "pending" | "bought" | "not_found") {
    if (!journey.activeStop || !item.activeStopItem || saving) return;
    const draft = draftFor(item);
    setSaving(true);
    setMessage(null);
    try {
      const updated = await updateShoppingJourneyStopItem(journey.id, journey.activeStop.id, item.activeStopItem.id, {
        status,
        ...(status === "bought" ? { actualPrice: draft.actualPrice || null, corridorId: draft.corridorId || null } : {})
      });
      updateLocal(updated);
    } catch {
      setMessage("Não foi possível atualizar o item.");
    } finally {
      setSaving(false);
    }
  }

  async function finishStopAction() {
    if (!journey.activeStop || saving) return;
    setSaving(true);
    setMessage(null);
    try {
      const updated = await finishJourneyStop(journey.id, journey.activeStop.id);
      updateLocal(updated);
    } catch {
      setMessage("Não foi possível finalizar o supermercado atual.");
    } finally {
      setSaving(false);
    }
  }

  async function continueOutsideRadiusAction() {
    if (!journey.activeStop || saving) return;
    setSaving(true);
    try {
      updateLocal(await continueJourneyStopOutsideRadius(journey.id, journey.activeStop.id));
    } finally {
      setSaving(false);
    }
  }

  async function switchSupermarketAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nextSupermarketId || !lastStopId || saving) return;
    setSaving(true);
    setMessage(null);
    try {
      updateLocal(await switchJourneyStopSupermarket(journey.id, lastStopId, { supermarketId: nextSupermarketId }));
    } catch {
      setMessage("Não foi possível continuar no supermercado selecionado.");
    } finally {
      setSaving(false);
    }
  }

  async function completeJourneyAction() {
    if (saving) return;
    setSaving(true);
    setMessage(null);
    try {
      await completeShoppingJourney(journey.id);
      router.push("/history");
    } catch {
      setMessage("Não foi possível finalizar a compra completa.");
    } finally {
      setSaving(false);
    }
  }

  async function createCorridorAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supermarketId = journey.activeStop?.supermarketId;
    const name = newCorridorName.trim();
    if (!supermarketId || !name || saving) return;
    setSaving(true);
    setMessage(null);
    try {
      const corridor = await createSupermarketCorridor(supermarketId, { name });
      updateLocal({
        ...journey,
        layout: {
          supermarketId,
          presenceRadiusMeters: journey.layout?.presenceRadiusMeters ?? 500,
          placements: journey.layout?.placements ?? [],
          suggestions: journey.layout?.suggestions ?? [],
          corridors: [...(journey.layout?.corridors ?? []), corridor]
        }
      });
      setNewCorridorName("");
      setShowCorridorForm(false);
    } catch {
      setMessage("Não foi possível criar o corredor.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="journey-shell">
      {journey.activeStop ? (
        <section className="journey-stop-banner">
          <div>
            <strong>{journey.activeStop.supermarketName}</strong>
            <p className="muted">Parada ativa neste supermercado.</p>
          </div>
          <div className="form-actions">
            <button type="button" className="button secondary" disabled={saving} onClick={() => void continueOutsideRadiusAction()}>
              Continuar fora do raio
            </button>
            <button type="button" className="button secondary" disabled={saving} onClick={() => void finishStopAction()}>
              Finalizar supermercado atual
            </button>
            <button type="button" className="button primary" disabled={saving} onClick={() => void completeJourneyAction()}>
              Finalizar compra completa
            </button>
          </div>
        </section>
      ) : (
        <section className="resource-panel">
          <h2>Escolher próximo supermercado</h2>
          <div className="resource-list">
            {activeItems(journey).map((item) => (
              <article className="resource-row" key={item.id}>
                <strong>{item.snapshotProductName}</strong>
                <span>{itemAmount(item)}</span>
              </article>
            ))}
          </div>
          <form className="resource-form compact-form" onSubmit={(event) => void switchSupermarketAction(event)}>
            <label className="span-2">
              Próximo supermercado
              <select value={nextSupermarketId} onChange={(event) => setNextSupermarketId(event.target.value)}>
                <option value="">Selecione</option>
                {supermarkets.map((supermarket) => (
                  <option key={supermarket.id} value={supermarket.id}>
                    {supermarket.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-actions span-2">
              <button type="submit" className="button primary" disabled={saving || !nextSupermarketId || !lastStopId}>
                Continuar no supermercado
              </button>
              <button type="button" className="button secondary" disabled={saving} onClick={() => void completeJourneyAction()}>
                Finalizar compra completa
              </button>
            </div>
          </form>
        </section>
      )}

      {message ? <p className="form-message error">{message}</p> : null}

      {journey.activeStop ? (
        <section className="resource-panel">
          <div className="panel-heading">
            <h2>Corredores</h2>
            <button type="button" className="button secondary" onClick={() => setShowCorridorForm((current) => !current)}>
              Novo corredor
            </button>
          </div>
          {showCorridorForm ? (
            <form className="resource-form compact-form" onSubmit={(event) => void createCorridorAction(event)}>
              <label>
                Nome do corredor
                <input value={newCorridorName} onChange={(event) => setNewCorridorName(event.target.value)} />
              </label>
              <div className="form-actions">
                <button type="submit" className="button primary" disabled={saving || !newCorridorName.trim()}>
                  Salvar corredor
                </button>
              </div>
            </form>
          ) : null}
        </section>
      ) : null}

      <section className="layout-editor" aria-label="Itens da jornada">
        {groups.map((group) => (
          <section className={group.id === "undefined" ? "undefined-corridor" : "corridor-group"} key={group.id}>
            <div className="metric-row">
              <h2>{group.name}</h2>
              <span className="status-pill">{group.items.length}</span>
            </div>
            {group.items.length === 0 ? <p className="muted">Nenhum item.</p> : null}
            {group.items.map((item) => {
              const draft = draftFor(item);
              return (
                <article className="session-card" key={item.id}>
                  <div>
                    <strong>{item.snapshotProductName}</strong>
                    <p className="muted">
                      {item.snapshotCategoryLabel} · {itemAmount(item)}
                      {item.expectedPrice ? ` · Esperado: ${item.expectedPrice}` : ""}
                      {item.sourceListName && journey.sourceLists.length > 1 ? ` · ${item.sourceListName}` : ""}
                    </p>
                  </div>
                  <label className="search-field">
                    Corredor de {item.snapshotProductName}
                    <select
                      value={draft.corridorId}
                      onChange={(event) =>
                        setDrafts((current) => ({
                          ...current,
                          [item.id]: { ...draftFor(item), corridorId: event.target.value }
                        }))
                      }
                    >
                      <option value="">Sem corredor definido</option>
                      {(journey.layout?.corridors ?? []).map((corridor) => (
                        <option key={corridor.id} value={corridor.id}>
                          {corridor.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="search-field">
                    Preço real de {item.snapshotProductName}
                    <input
                      inputMode="decimal"
                      value={draft.actualPrice}
                      onChange={(event) =>
                        setDrafts((current) => ({
                          ...current,
                          [item.id]: { ...draftFor(item), actualPrice: event.target.value }
                        }))
                      }
                    />
                  </label>
                  <div className="row-actions">
                    <button type="button" className="button secondary" disabled={saving} onClick={() => void updateItem(item, "bought")}>
                      Marcar {item.snapshotProductName} como comprado
                    </button>
                    <button type="button" className="button secondary" disabled={saving} onClick={() => void updateItem(item, "not_found")}>
                      Marcar {item.snapshotProductName} como não encontrado
                    </button>
                    <button type="button" className="button secondary" disabled={saving} onClick={() => void updateItem(item, "pending")}>
                      Voltar {item.snapshotProductName} para pendente
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        ))}
      </section>
    </section>
  );
}
