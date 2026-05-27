"use client";

import React, { FormEvent, useState } from "react";
import type { SupermarketDto, ShoppingListSummaryDto } from "@zbuy/shared";
import { createSupermarket, detectSupermarket, startShoppingJourney } from "../../lib/resources";

interface PhysicalJourneyStartFormProps {
  lists: ShoppingListSummaryDto[];
  onStarted: (journeyId: string) => void;
  getCurrentPosition?: () => Promise<{ latitude: string; longitude: string }>;
}

type Coordinates = { latitude: string; longitude: string };

export function PhysicalJourneyStartForm({ lists, onStarted, getCurrentPosition = getBrowserPosition }: PhysicalJourneyStartFormProps) {
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [candidates, setCandidates] = useState<SupermarketDto[]>([]);
  const [selectedSupermarketId, setSelectedSupermarketId] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [manualCreate, setManualCreate] = useState(false);
  const [newSupermarketName, setNewSupermarketName] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [starting, setStarting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function toggleList(id: string) {
    setSelectedListIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  async function detectCurrentSupermarket() {
    setDetecting(true);
    setMessage(null);
    try {
      const position = await getCurrentPosition();
      const detection = await detectSupermarket(position);
      setCoordinates(position);
      setCandidates(detection.candidates);
      setSelectedSupermarketId(detection.candidates.length === 1 ? detection.candidates[0].id : "");
      setShowCreate(detection.status === "unknown");
      setManualCreate(false);
    } catch {
      setMessage("Não foi possível detectar o supermercado.");
    } finally {
      setDetecting(false);
    }
  }

  async function createCurrentSupermarket() {
    const name = newSupermarketName.trim();
    if (!name) return;

    setCreating(true);
    setMessage(null);
    try {
      const supermarket = await createSupermarket({
        name,
        ...(coordinates ? { latitude: coordinates.latitude, longitude: coordinates.longitude } : {}),
        presenceRadiusMeters: 500
      });
      if (manualCreate && selectedListIds.length > 0) {
        const journey = await startShoppingJourney({ sourceListIds: selectedListIds, supermarketId: supermarket.id });
        onStarted(journey.id);
        return;
      }
      setCandidates([supermarket]);
      setSelectedSupermarketId(supermarket.id);
      setNewSupermarketName("");
      setShowCreate(false);
    } catch {
      setMessage("Não foi possível criar o supermercado.");
    } finally {
      setCreating(false);
    }
  }

  function showManualCreate() {
    setCoordinates(null);
    setCandidates([]);
    setSelectedSupermarketId("");
    setShowCreate(true);
    setManualCreate(true);
    setMessage(null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedListIds.length === 0 || !selectedSupermarketId) return;

    setStarting(true);
    setMessage(null);
    try {
      const journey = await startShoppingJourney({
        sourceListIds: selectedListIds,
        supermarketId: selectedSupermarketId,
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude
      });
      onStarted(journey.id);
    } catch {
      setMessage("Não foi possível iniciar a compra física.");
    } finally {
      setStarting(false);
    }
  }

  return (
    <form className="resource-form compact-form" onSubmit={submit}>
      <fieldset className="span-2 corridor-group">
        <legend>Listas ({selectedListIds.length} selecionada{selectedListIds.length !== 1 ? "s" : ""})</legend>
        {lists.map((list) => (
          <label key={list.id}>
            <input
              type="checkbox"
              checked={selectedListIds.includes(list.id)}
              onChange={() => toggleList(list.id)}
            />
            {list.name}
            <span className="muted"> · {list.itemCount} {list.itemCount === 1 ? "item" : "itens"}</span>
          </label>
        ))}
        {lists.length === 0 ? <p className="muted">Nenhuma lista disponível.</p> : null}
      </fieldset>

      <div className="span-2">
        <button type="button" className="button secondary" onClick={() => void detectCurrentSupermarket()} disabled={detecting}>
          Detectar supermercado
        </button>
        <button type="button" className="button secondary" onClick={showManualCreate}>
          Criar supermercado manualmente
        </button>
      </div>

      {candidates.length > 0 ? (
        <fieldset className="span-2 corridor-group">
          <legend>{candidates.length > 1 ? "Escolha o supermercado" : "Supermercado detectado"}</legend>
          {candidates.map((candidate) => (
            <label key={candidate.id}>
              <input
                type="radio"
                name="supermarket"
                value={candidate.id}
                checked={selectedSupermarketId === candidate.id}
                onChange={(event) => setSelectedSupermarketId(event.target.value)}
              />
              {candidate.name}
            </label>
          ))}
        </fieldset>
      ) : null}

      {showCreate ? (
        <>
          <label>
            Nome do supermercado
            <input value={newSupermarketName} onChange={(event) => setNewSupermarketName(event.target.value)} />
          </label>
          <div className="form-actions">
            <button
              type="button"
              className="button secondary"
              onClick={() => void createCurrentSupermarket()}
              disabled={creating || !newSupermarketName.trim()}
            >
              {manualCreate ? "Criar e iniciar compra" : "Criar supermercado"}
            </button>
          </div>
        </>
      ) : null}

      {message ? <p className="form-message error span-2">{message}</p> : null}

      <div className="form-actions span-2">
        <button type="submit" className="button primary" disabled={starting || selectedListIds.length === 0 || !selectedSupermarketId}>
          Iniciar compra
        </button>
      </div>
    </form>
  );
}

function getBrowserPosition() {
  return new Promise<Coordinates>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation unavailable"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: String(position.coords.latitude),
          longitude: String(position.coords.longitude)
        }),
      reject
    );
  });
}
