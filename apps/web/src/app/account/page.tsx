"use client";

import React from "react";
import { useEffect, useState } from "react";
import type { CurrentUserDto, LayoutContributionConsentDto } from "@zbuy/shared";
import { apiRequest } from "../../lib/api";
import { getLayoutContributionConsent, updateLayoutContributionConsent } from "../../lib/resources";

export default function AccountPage() {
  const [user, setUser] = useState<CurrentUserDto | null>(null);
  const [consent, setConsent] = useState<LayoutContributionConsentDto | null>(null);
  const [globalContributionEnabled, setGlobalContributionEnabled] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("error");
  const [savingConsent, setSavingConsent] = useState(false);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    apiRequest<{ user: CurrentUserDto }>("/me")
      .then(async (response) => {
        if (!active) return;
        setUser(response.user);
        const consentResponse = await getLayoutContributionConsent().catch(() => null);
        if (!active) return;
        setConsent(consentResponse);
        setGlobalContributionEnabled(consentResponse?.globalSharedLayoutContributionEnabled ?? false);
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

  async function logout() {
    await apiRequest<void>("/auth/logout", { method: "POST" }).catch(() => undefined);
    setUser(null);
    setStatus("error");
  }

  async function saveLayoutConsent() {
    setSavingConsent(true);
    try {
      const updated = await updateLayoutContributionConsent({
        globalSharedLayoutContributionEnabled: globalContributionEnabled
      });
      setConsent(updated);
      setGlobalContributionEnabled(updated.globalSharedLayoutContributionEnabled);
    } finally {
      setSavingConsent(false);
    }
  }

  return (
    <main className="account-shell">
      <section className="account-panel">
        <div className="brand-row compact">
          <div className="brand-mark" aria-hidden="true">
            Z
          </div>
          <span>ZBuy</span>
        </div>
        {status === "ready" && user ? (
          <>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <div className="account-actions">
              <a className="button secondary" href="/products">
                Produtos
              </a>
              <a className="button secondary" href="/lists">
                Listas
              </a>
            </div>
            <section className="consent-panel">
              <h2>Layouts compartilhados</h2>
              <p>Layouts privados continuam privados; a contribuição usa apenas dados agregados de posicionamento.</p>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={globalContributionEnabled}
                  onChange={(event) => setGlobalContributionEnabled(event.target.checked)}
                />
                Contribuir com layouts compartilhados
              </label>
              <button type="button" className="button primary" disabled={savingConsent} onClick={() => void saveLayoutConsent()}>
                Salvar preferências de layout
              </button>
              {consent ? (
                <p>{consent.effectiveSharedLayoutContributionEnabled ? "Compartilhamento ativo" : "Compartilhamento inativo"}</p>
              ) : null}
            </section>
            <button type="button" onClick={logout}>
              Sair
            </button>
          </>
        ) : status === "loading" ? (
          <>
            <h1>Carregando conta</h1>
            <p>Validando sua sessão.</p>
          </>
        ) : (
          <>
            <h1>Conta indisponível</h1>
            <p>Entre novamente para continuar usando o ZBuy.</p>
          </>
        )}
      </section>
    </main>
  );
}
