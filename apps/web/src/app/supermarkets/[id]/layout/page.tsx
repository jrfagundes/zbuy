"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { LayoutContributionConsentDto, SupermarketDto, SupermarketLayoutDto } from "@zbuy/shared";
import { AppShell } from "../../../../components/AppShell";
import {
  acceptSharedLayoutSuggestion,
  createSupermarketCorridor,
  deleteSupermarketCorridor,
  getSupermarketLayout,
  getSupermarketLayoutConsent,
  listSupermarkets,
  reorderSupermarketCorridors,
  updateSupermarket,
  updateSupermarketCorridor,
  updateSupermarketLayoutConsent
} from "../../../../lib/resources";

type CorridorDrafts = Record<string, string>;

function routeParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function consentValue(value: boolean | null) {
  if (value === null) return "inherit";
  return value ? "true" : "false";
}

function parseConsentValue(value: string) {
  if (value === "inherit") return null;
  return value === "true";
}

export default function SupermarketLayoutPage() {
  const params = useParams();
  const supermarketId = routeParam(params.id);
  const [supermarket, setSupermarket] = useState<SupermarketDto | null>(null);
  const [layout, setLayout] = useState<SupermarketLayoutDto | null>(null);
  const [consent, setConsent] = useState<LayoutContributionConsentDto | null>(null);
  const [radius, setRadius] = useState("");
  const [newCorridorName, setNewCorridorName] = useState("");
  const [corridorDrafts, setCorridorDrafts] = useState<CorridorDrafts>({});
  const [consentOverride, setConsentOverride] = useState("inherit");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    Promise.all([listSupermarkets(), getSupermarketLayout(supermarketId), getSupermarketLayoutConsent(supermarketId)])
      .then(([supermarketResponse, layoutResponse, consentResponse]) => {
        if (!active) return;
        setSupermarket(supermarketResponse.supermarkets.find((item) => item.id === supermarketId) ?? null);
        setLayout(layoutResponse);
        setConsent(consentResponse);
        setRadius(String(layoutResponse.presenceRadiusMeters));
        setConsentOverride(consentValue(consentResponse.supermarketOverride));
        setCorridorDrafts(Object.fromEntries(layoutResponse.corridors.map((corridor) => [corridor.id, corridor.name])));
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [supermarketId]);

  const placementsByCorridor = useMemo(() => {
    const groups: Record<string, string[]> = {};
    for (const placement of layout?.placements ?? []) {
      groups[placement.corridorId] = [...(groups[placement.corridorId] ?? []), placement.productId];
    }
    return groups;
  }, [layout]);

  async function saveRadius(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const updated = await updateSupermarket(supermarketId, { presenceRadiusMeters: Number(radius) });
      setSupermarket(updated);
      setLayout((current) => (current ? { ...current, presenceRadiusMeters: updated.presenceRadiusMeters } : current));
    } finally {
      setSaving(false);
    }
  }

  async function createCorridor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = newCorridorName.trim();
    if (!layout || !name || saving) return;
    setSaving(true);
    try {
      const corridor = await createSupermarketCorridor(supermarketId, { name });
      setLayout({ ...layout, corridors: [...layout.corridors, corridor] });
      setCorridorDrafts((current) => ({ ...current, [corridor.id]: corridor.name }));
      setNewCorridorName("");
    } finally {
      setSaving(false);
    }
  }

  async function renameCorridor(corridorId: string) {
    if (!layout || saving) return;
    const name = corridorDrafts[corridorId]?.trim();
    if (!name) return;
    setSaving(true);
    try {
      const corridor = await updateSupermarketCorridor(supermarketId, corridorId, { name });
      setLayout({ ...layout, corridors: layout.corridors.map((item) => (item.id === corridor.id ? corridor : item)) });
    } finally {
      setSaving(false);
    }
  }

  async function moveCorridor(corridorId: string, direction: -1 | 1) {
    if (!layout || saving) return;
    const index = layout.corridors.findIndex((corridor) => corridor.id === corridorId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= layout.corridors.length) return;
    const nextCorridors = [...layout.corridors];
    const [corridor] = nextCorridors.splice(index, 1);
    nextCorridors.splice(nextIndex, 0, corridor);
    setSaving(true);
    try {
      const updated = await reorderSupermarketCorridors(supermarketId, { corridorIds: nextCorridors.map((item) => item.id) });
      setLayout(updated);
      setCorridorDrafts(Object.fromEntries(updated.corridors.map((item) => [item.id, item.name])));
    } finally {
      setSaving(false);
    }
  }

  async function deleteCorridor(corridorId: string) {
    if (!layout || saving) return;
    setSaving(true);
    try {
      await deleteSupermarketCorridor(supermarketId, corridorId);
      setLayout({ ...layout, corridors: layout.corridors.filter((corridor) => corridor.id !== corridorId) });
    } finally {
      setSaving(false);
    }
  }

  async function acceptSuggestion(suggestionId: string, corridorName: string) {
    if (saving) return;
    setSaving(true);
    try {
      await acceptSharedLayoutSuggestion(supermarketId, suggestionId, { corridorName });
    } finally {
      setSaving(false);
    }
  }

  async function saveConsent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      const updated = await updateSupermarketLayoutConsent(supermarketId, { supermarketOverride: parseConsentValue(consentOverride) });
      setConsent(updated);
      setConsentOverride(consentValue(updated.supermarketOverride));
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell title="Layout do supermercado">
      <section className="detail-stack">
        {status === "loading" ? <p className="muted">Carregando layout.</p> : null}
        {status === "error" ? <p className="form-message error">Não foi possível carregar o layout.</p> : null}
        {status === "ready" && layout ? (
          <>
            <section className="resource-panel">
              <div className="panel-heading">
                <h2>{supermarket?.name ?? "Supermercado"}</h2>
                <span className="status-pill">{layout.presenceRadiusMeters} m</span>
              </div>
              <form className="resource-form compact-form" onSubmit={(event) => void saveRadius(event)}>
                <label>
                  Raio de presença em metros
                  <input inputMode="numeric" value={radius} onChange={(event) => setRadius(event.target.value)} />
                </label>
                <div className="form-actions">
                  <button type="submit" className="button primary" disabled={saving}>
                    Salvar raio
                  </button>
                </div>
              </form>
            </section>

            <section className="resource-panel">
              <h2>Corredores</h2>
              <form className="resource-form compact-form" onSubmit={(event) => void createCorridor(event)}>
                <label>
                  Nome do novo corredor
                  <input value={newCorridorName} onChange={(event) => setNewCorridorName(event.target.value)} />
                </label>
                <div className="form-actions">
                  <button type="submit" className="button primary" disabled={saving || !newCorridorName.trim()}>
                    Criar corredor
                  </button>
                </div>
              </form>
              <div className="layout-editor">
                {layout.corridors.map((corridor, index) => (
                  <article className="corridor-group" key={corridor.id}>
                    <div className="metric-row">
                      <h3>{corridor.name}</h3>
                      <span className="status-pill">{corridor.productCount}</span>
                    </div>
                    <label className="search-field">
                      Nome do corredor {corridor.name}
                      <input
                        value={corridorDrafts[corridor.id] ?? corridor.name}
                        onChange={(event) => setCorridorDrafts((current) => ({ ...current, [corridor.id]: event.target.value }))}
                      />
                    </label>
                    <div className="row-actions">
                      <button type="button" className="button secondary" disabled={saving} onClick={() => void renameCorridor(corridor.id)}>
                        Renomear {corridor.name}
                      </button>
                      <button
                        type="button"
                        className="button secondary"
                        disabled={saving || index === 0}
                        onClick={() => void moveCorridor(corridor.id, -1)}
                      >
                        Mover {corridor.name} para cima
                      </button>
                      <button
                        type="button"
                        className="button secondary"
                        disabled={saving || index === layout.corridors.length - 1}
                        onClick={() => void moveCorridor(corridor.id, 1)}
                      >
                        Mover {corridor.name} para baixo
                      </button>
                      <button type="button" className="button secondary" disabled={saving} onClick={() => void deleteCorridor(corridor.id)}>
                        Excluir {corridor.name}
                      </button>
                    </div>
                    <div className="resource-list">
                      {(placementsByCorridor[corridor.id] ?? []).map((productId) => (
                        <span className="status-pill" key={productId}>
                          {productId}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
                <article className="undefined-corridor">
                  <h3>Sem corredor definido</h3>
                  <p className="muted">Produtos ainda sem posição privada neste supermercado.</p>
                </article>
              </div>
            </section>

            <section className="resource-panel">
              <h2>Sugestões compartilhadas</h2>
              <div className="resource-list">
                {layout.suggestions.map((suggestion) => (
                  <article className="suggestion-row" key={suggestion.id}>
                    <div>
                      <strong>{suggestion.productId}</strong>
                      <span>{suggestion.suggestedCorridorName}</span>
                    </div>
                    <button
                      type="button"
                      className="button secondary"
                      disabled={saving}
                      onClick={() => void acceptSuggestion(suggestion.id, suggestion.suggestedCorridorName)}
                    >
                      Aceitar sugestão {suggestion.suggestedCorridorName} para {suggestion.productId}
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="consent-panel">
              <h2>Compartilhamento</h2>
              <p className="muted">
                Layouts privados continuam privados; esta opção controla apenas contribuições agregadas para sugestões.
              </p>
              <form className="resource-form compact-form" onSubmit={(event) => void saveConsent(event)}>
                <label>
                  Compartilhamento deste supermercado
                  <select value={consentOverride} onChange={(event) => setConsentOverride(event.target.value)}>
                    <option value="inherit">Usar preferência global</option>
                    <option value="true">Permitir</option>
                    <option value="false">Não permitir</option>
                  </select>
                </label>
                <div className="form-actions">
                  <button type="submit" className="button primary" disabled={saving}>
                    Salvar compartilhamento do supermercado
                  </button>
                </div>
              </form>
              {consent ? (
                <p className="muted">
                  Estado efetivo: {consent.effectiveSharedLayoutContributionEnabled ? "permitido" : "bloqueado"}
                </p>
              ) : null}
            </section>
          </>
        ) : null}
      </section>
    </AppShell>
  );
}
