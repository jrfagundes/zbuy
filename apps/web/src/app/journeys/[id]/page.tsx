"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ShoppingJourneyDetailDto } from "@zbuy/shared";
import { AppShell } from "../../../components/AppShell";
import { getShoppingJourney } from "../../../lib/resources";
import { JourneyBoard } from "./JourneyBoard";

function routeParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default function JourneyPage() {
  const params = useParams();
  const id = routeParam(params.id);
  const [journey, setJourney] = useState<ShoppingJourneyDetailDto | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    getShoppingJourney(id)
      .then((response) => {
        if (!active) return;
        setJourney(response);
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
    <AppShell title="Jornada de compra">
      <section className="detail-stack">
        {status === "loading" ? <p className="muted">Carregando jornada.</p> : null}
        {status === "error" ? <p className="form-message error">Não foi possível carregar a jornada.</p> : null}

        {status === "ready" && journey ? (
          <>
            <section className="resource-panel">
              <div className="panel-heading">
                <h2>{journey.sourceListName}</h2>
                <span className="status-pill">{journey.status}</span>
              </div>
              <div className="purchase-summary">
                <div>
                  <span className="muted">Supermercado</span>
                  <strong>{journey.activeStop?.supermarketName ?? "Sem parada ativa"}</strong>
                </div>
                <div>
                  <span className="muted">Lista</span>
                  <strong>{journey.sourceListName}</strong>
                </div>
                <div>
                  <span className="muted">Total conhecido</span>
                  <strong>{journey.knownTotal}</strong>
                </div>
                <div>
                  <span className="muted">Itens</span>
                  <strong>{journey.items.length}</strong>
                </div>
              </div>
            </section>
            <JourneyBoard journey={journey} onJourneyChange={setJourney} />
          </>
        ) : null}
      </section>
    </AppShell>
  );
}
