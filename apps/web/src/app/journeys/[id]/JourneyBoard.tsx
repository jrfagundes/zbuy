"use client";

import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ShoppingJourneyDetailDto, ShoppingJourneyItemDto, SupermarketDto } from "@zbuy/shared";
import {
  completeShoppingJourney,
  continueJourneyStopOutsideRadius,
  createSupermarketCorridor,
  finishJourneyStop,
  getProductByBarcode,
  listSupermarkets,
  switchJourneyStopSupermarket,
  updateShoppingJourneyStopItem
} from "../../../lib/resources";
import { BarcodeScanner } from "../../../components/BarcodeScanner";

type Drafts = Record<string, { corridorId: string; actualPrice: string }>;

type Group = {
  id: string;
  name: string;
  type: "corridor" | "category";
  items: ShoppingJourneyItemDto[];
};

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
  const [scanning, setScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItemIds, setExpandedItemIds] = useState<Set<string>>(new Set());
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

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

  // Progress
  const totalItems = journey.items.length;
  const doneItems = journey.items.filter((i) => i.finalStatus === "bought" || i.finalStatus === "not_found").length;
  const progressPercent = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;
  const boughtItems = journey.items.filter((i) => i.finalStatus === "bought").length;
  const notFoundItems = journey.items.filter((i) => i.finalStatus === "not_found").length;

  // Groups: corridor-assigned items first, then uncategorized split by category
  const groups = useMemo((): Group[] => {
    const corridors = [...(journey.layout?.corridors ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);
    const items = activeItems(journey);
    const withPlacement = items.filter((item) => item.placement);
    const withoutPlacement = items.filter((item) => !item.placement);

    // Split uncategorized items by product category
    const categoryMap = new Map<string, ShoppingJourneyItemDto[]>();
    for (const item of withoutPlacement) {
      const cat = item.snapshotCategoryLabel || "Outros";
      if (!categoryMap.has(cat)) categoryMap.set(cat, []);
      categoryMap.get(cat)!.push(item);
    }
    const categoryGroups: Group[] = Array.from(categoryMap.entries())
      .sort(([a], [b]) => a.localeCompare(b, "pt-BR"))
      .map(([name, catItems]) => ({ id: `cat-${name}`, name, type: "category", items: catItems }));

    return [
      ...corridors.map((corridor) => ({
        id: corridor.id,
        name: corridor.name,
        type: "corridor" as const,
        items: withPlacement.filter((item) => item.placement?.corridorId === corridor.id)
      })),
      ...categoryGroups
    ];
  }, [journey]);

  // Search filter
  const filteredGroups = useMemo((): Group[] => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.snapshotProductName.toLowerCase().includes(q) ||
            item.snapshotCategoryLabel.toLowerCase().includes(q)
        )
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, searchQuery]);

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

  function toggleExpand(itemId: string) {
    setExpandedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
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
      // Collapse expanded card after action
      setExpandedItemIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
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

  const handleBarcodeDetected = useCallback(
    async (barcode: string) => {
      setScanning(false);
      setScanMessage(null);
      setHighlightedItemId(null);
      try {
        const product = await getProductByBarcode(barcode);
        const match = journey.items.find(
          (item) => item.sourceProductId === product.id && item.finalStatus === "active"
        );
        if (match) {
          setHighlightedItemId(match.id);
          itemRefs.current[match.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => setHighlightedItemId(null), 3000);
        } else {
          setScanMessage(`"${product.name}" não está na lista ativa.`);
        }
      } catch {
        setScanMessage("Produto não encontrado para este código de barras.");
      }
    },
    [journey.items]
  );

  return (
    <section className="journey-shell">
      {scanning ? (
        <BarcodeScanner
          onDetected={(barcode) => void handleBarcodeDetected(barcode)}
          onClose={() => setScanning(false)}
        />
      ) : null}

      {journey.activeStop ? (
        <section className="journey-stop-banner">
          <div className="stop-banner-top">
            <div>
              <strong>{journey.activeStop.supermarketName}</strong>
              <p className="muted">Parada ativa neste supermercado.</p>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="button secondary"
                disabled={saving}
                onClick={() => {
                  setScanMessage(null);
                  setScanning(true);
                }}
              >
                Escanear produto
              </button>
              <button
                type="button"
                className="button secondary"
                disabled={saving}
                onClick={() => void continueOutsideRadiusAction()}
              >
                Continuar fora do raio
              </button>
              <button
                type="button"
                className="button secondary"
                disabled={saving}
                onClick={() => void finishStopAction()}
              >
                Finalizar supermercado atual
              </button>
              <button
                type="button"
                className="button primary"
                disabled={saving}
                onClick={() => void completeJourneyAction()}
              >
                Finalizar compra completa
              </button>
            </div>
          </div>

          {totalItems > 0 ? (
            <div className="journey-progress">
              <div className="journey-progress-label">
                <span>
                  {doneItems} de {totalItems} itens concluídos
                </span>
                <span>
                  {boughtItems > 0 ? `${boughtItems} comprado${boughtItems !== 1 ? "s" : ""}` : ""}
                  {boughtItems > 0 && notFoundItems > 0 ? " · " : ""}
                  {notFoundItems > 0 ? `${notFoundItems} não encontrado${notFoundItems !== 1 ? "s" : ""}` : ""}
                </span>
              </div>
              <div className="journey-progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
                <div className="journey-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          ) : null}
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
      {scanMessage ? <p className="form-message error">{scanMessage}</p> : null}

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
        {activeItems(journey).length > 3 ? (
          <div className="journey-search span-full">
            <label className="search-field">
              Buscar item
              <input
                type="search"
                placeholder="Nome ou categoria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>
        ) : null}

        {filteredGroups.map((group) => (
          <section
            className={group.type === "corridor" ? "corridor-group" : "category-group"}
            key={group.id}
          >
            <div className="metric-row">
              <h2>{group.name}</h2>
              <span className="status-pill">{group.items.length}</span>
            </div>
            {group.items.length === 0 ? <p className="muted">Nenhum item.</p> : null}
            {group.items.map((item) => {
              const draft = draftFor(item);
              const isExpanded = expandedItemIds.has(item.id);
              return (
                <article
                  className={`session-card compact${highlightedItemId === item.id ? " highlighted" : ""}`}
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                >
                  <div className="card-header">
                    <div className="card-info">
                      <strong>{item.snapshotProductName}</strong>
                      <span className="muted">
                        {item.snapshotCategoryLabel} · {itemAmount(item)}
                        {item.expectedPrice ? ` · est. ${item.expectedPrice}` : ""}
                        {item.sourceListName && journey.sourceLists.length > 1 ? ` · ${item.sourceListName}` : ""}
                      </span>
                    </div>
                    <div className="card-quick-actions">
                      <button
                        type="button"
                        className="button quick-buy"
                        disabled={saving || !journey.activeStop}
                        onClick={() => void updateItem(item, "bought")}
                        aria-label={`Marcar ${item.snapshotProductName} como comprado`}
                      >
                        ✓
                      </button>
                      <button
                        type="button"
                        className="button quick-not-found"
                        disabled={saving || !journey.activeStop}
                        onClick={() => void updateItem(item, "not_found")}
                        aria-label={`Marcar ${item.snapshotProductName} como não encontrado`}
                      >
                        ✗
                      </button>
                      <button
                        type="button"
                        className="button secondary icon-btn"
                        onClick={() => toggleExpand(item.id)}
                        aria-label={isExpanded ? "Recolher detalhes" : "Expandir detalhes"}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "▲" : "▼"}
                      </button>
                    </div>
                  </div>

                  {isExpanded ? (
                    <div className="card-detail">
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
                        <button
                          type="button"
                          className="button secondary"
                          disabled={saving || !journey.activeStop}
                          onClick={() => void updateItem(item, "bought")}
                        >
                          Salvar e marcar como comprado
                        </button>
                        <button
                          type="button"
                          className="button secondary"
                          disabled={saving || !journey.activeStop}
                          onClick={() => void updateItem(item, "pending")}
                        >
                          Voltar para pendente
                        </button>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </section>
        ))}

        {searchQuery.trim() && filteredGroups.length === 0 ? (
          <p className="muted span-full">Nenhum item encontrado para "{searchQuery}".</p>
        ) : null}
      </section>
    </section>
  );
}
