"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ShoppingSessionDetailDto } from "@zbuy/shared";
import { AppShell } from "../../../components/AppShell";
import { getShoppingSession } from "../../../lib/resources";
import { SessionBoard } from "./SessionBoard";

function routeParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default function PurchaseSessionPage() {
  const params = useParams();
  const id = routeParam(params.id);
  const [session, setSession] = useState<ShoppingSessionDetailDto | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    getShoppingSession(id)
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

  return (
    <AppShell title="Sessão de compra">
      <section className="detail-stack">
        {status === "loading" ? <p className="muted">Carregando sessão.</p> : null}
        {status === "error" ? <p className="form-message error">Não foi possível carregar a sessão.</p> : null}

        {status === "ready" && session ? (
          <>
            <section className="resource-panel">
              <div className="panel-heading">
                <h2>{session.sourceListName}</h2>
                <span className="status-pill">{session.status}</span>
              </div>

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
                  <span className="muted">Total conhecido</span>
                  <strong>{session.knownTotal}</strong>
                </div>
              </div>

              {session.boughtItemsWithoutPriceCount > 0 ? (
                <p className="form-message error">
                  {session.boughtItemsWithoutPriceCount} item(ns) comprado(s) ainda estão sem preço real.
                </p>
              ) : null}
            </section>

            <SessionBoard session={session} />
          </>
        ) : null}
      </section>
    </AppShell>
  );
}
