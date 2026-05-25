"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  PurchaseLocationDto,
  ShoppingListSummaryDto,
  ShoppingSessionContext,
  ShoppingSessionDetailDto,
  StartShoppingSessionRequest,
  UpsertPurchaseLocationRequest
} from "@zbuy/shared";

export function StartPurchaseForm({
  context,
  lists,
  locations,
  onContextChange,
  onCreateLocation,
  onStartSession
}: {
  context: ShoppingSessionContext;
  lists: ShoppingListSummaryDto[];
  locations: PurchaseLocationDto[];
  onContextChange: (context: ShoppingSessionContext) => Promise<void>;
  onCreateLocation: (input: UpsertPurchaseLocationRequest) => Promise<PurchaseLocationDto>;
  onStartSession: (input: StartShoppingSessionRequest) => Promise<ShoppingSessionDetailDto>;
}) {
  const router = useRouter();
  const [sourceListId, setSourceListId] = useState("");
  const [purchaseLocationId, setPurchaseLocationId] = useState("");
  const [showNewLocation, setShowNewLocation] = useState(false);
  const [newLocationName, setNewLocationName] = useState("");
  const [savingLocation, setSavingLocation] = useState(false);
  const [starting, setStarting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function changeContext(nextContext: ShoppingSessionContext) {
    setPurchaseLocationId("");
    setMessage(null);
    await onContextChange(nextContext);
  }

  async function createLocation() {
    const name = newLocationName.trim();
    if (!name) return;

    setSavingLocation(true);
    setMessage(null);
    try {
      const location = await onCreateLocation({ type: context, name });
      setPurchaseLocationId(location.id);
      setNewLocationName("");
      setShowNewLocation(false);
    } catch {
      setMessage("Não foi possível criar o local.");
    } finally {
      setSavingLocation(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!sourceListId || !purchaseLocationId) return;

    setStarting(true);
    setMessage(null);
    try {
      const session = await onStartSession({ sourceListId, purchaseLocationId, context });
      router.push(`/purchases/${session.id}`);
    } catch {
      setMessage("Não foi possível iniciar a compra.");
    } finally {
      setStarting(false);
    }
  }

  return (
    <form className="resource-form compact-form" onSubmit={submit}>
      <label>
        Lista
        <select value={sourceListId} onChange={(event) => setSourceListId(event.target.value)} required>
          <option value="">Selecione uma lista</option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Tipo
        <select value={context} onChange={(event) => void changeContext(event.target.value as ShoppingSessionContext)}>
          <option value="physical">Física</option>
          <option value="online">Online</option>
        </select>
      </label>

      <label className="span-2">
        Local
        <select value={purchaseLocationId} onChange={(event) => setPurchaseLocationId(event.target.value)} required>
          <option value="">Selecione um local</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </label>

      <div className="span-2">
        <button type="button" className="button secondary" onClick={() => setShowNewLocation((current) => !current)}>
          Novo local
        </button>
      </div>

      {showNewLocation ? (
        <>
          <label>
            Nome do local
            <input value={newLocationName} onChange={(event) => setNewLocationName(event.target.value)} />
          </label>
          <div className="form-actions">
            <button type="button" className="button secondary" onClick={createLocation} disabled={savingLocation || !newLocationName.trim()}>
              Criar local
            </button>
          </div>
        </>
      ) : null}

      {message ? <p className="form-message error span-2">{message}</p> : null}

      <div className="form-actions span-2">
        <button type="submit" className="button primary" disabled={starting || !sourceListId || !purchaseLocationId}>
          Iniciar compra
        </button>
      </div>
    </form>
  );
}
