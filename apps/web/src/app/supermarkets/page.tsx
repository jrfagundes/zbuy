"use client";

import React, { FormEvent, useEffect, useState } from "react";
import type { SupermarketDto } from "@zbuy/shared";
import { AppShell } from "../../components/AppShell";
import { createSupermarket, listSupermarkets } from "../../lib/resources";

export default function SupermarketsPage() {
  const [supermarkets, setSupermarkets] = useState<SupermarketDto[]>([]);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [saving, setSaving] = useState(false);

  async function loadSupermarkets(search = query) {
    setStatus("loading");
    try {
      const response = await listSupermarkets(search);
      setSupermarkets(response.supermarkets.filter((supermarket) => !supermarket.archivedAt));
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    void loadSupermarkets("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadSupermarkets(query);
  }

  async function submitCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || saving) return;
    setSaving(true);
    try {
      const supermarket = await createSupermarket({ name: trimmedName });
      setSupermarkets((current) => [...current, supermarket]);
      setName("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell title="Supermercados">
      <section className="detail-stack">
        <section className="resource-panel">
          <form className="resource-form compact-form" onSubmit={(event) => void submitSearch(event)}>
            <label>
              Buscar supermercado
              <input value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <div className="form-actions">
              <button type="submit" className="button secondary">
                Buscar
              </button>
            </div>
          </form>
        </section>

        <section className="resource-panel">
          <h2>Novo supermercado</h2>
          <form className="resource-form compact-form" onSubmit={(event) => void submitCreate(event)}>
            <label>
              Nome do supermercado
              <input value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <div className="form-actions">
              <button type="submit" className="button primary" disabled={saving || !name.trim()}>
                Criar supermercado
              </button>
            </div>
          </form>
        </section>

        {status === "error" ? <p className="form-message error">Não foi possível carregar os supermercados.</p> : null}
        {status === "loading" ? <p className="muted">Carregando supermercados.</p> : null}

        <section className="supermarket-grid">
          {supermarkets.map((supermarket) => (
            <article className="resource-panel" key={supermarket.id}>
              <div className="panel-heading">
                <h2>{supermarket.name}</h2>
                <span className="status-pill">{supermarket.presenceRadiusMeters} m</span>
              </div>
              <p className="muted">{[supermarket.address, supermarket.city].filter(Boolean).join(" · ") || "Endereço não informado"}</p>
              <a className="button secondary" href={`/supermarkets/${supermarket.id}/layout`}>
                Editar layout de {supermarket.name}
              </a>
            </article>
          ))}
        </section>
      </section>
    </AppShell>
  );
}
