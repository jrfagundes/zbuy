"use client";

import React from "react";
import { useEffect, useState } from "react";
import type { CurrentUserDto } from "@zbuy/shared";
import { apiRequest } from "../../lib/api";

export default function AccountPage() {
  const [user, setUser] = useState<CurrentUserDto | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("error");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    apiRequest<{ user: CurrentUserDto }>("/me")
      .then((response) => {
        if (!active) return;
        setUser(response.user);
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
