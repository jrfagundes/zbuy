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
  const [sourceListId, setSourceListId] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [candidates, setCandidates] = useState<SupermarketDto[]>([]);
  const [selectedSupermarketId, setSelectedSupermarketId] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newSupermarketName, setNewSupermarketName] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [starting, setStarting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
    } catch {
      setMessage("Não foi possível detectar o supermercado.");
    } finally {
      setDetecting(false);
    }
  }

  async function createCurrentSupermarket() {
    const name = newSupermarketName.trim();
    if (!name || !coordinates) return;

    setCreating(true);
    setMessage(null);
    try {
      const supermarket = await createSupermarket({
        name,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        presenceRadiusMeters: 500
      });
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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!sourceListId || !selectedSupermarketId) return;

    setStarting(true);
    setMessage(null);
    try {
      const journey = await startShoppingJourney({
        sourceListId,
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
      <label className="span-2">
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

      <div className="span-2">
        <button type="button" className="button secondary" onClick={() => void detectCurrentSupermarket()} disabled={detecting}>
          Detectar supermercado
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
              Criar supermercado
            </button>
          </div>
        </>
      ) : null}

      {message ? <p className="form-message error span-2">{message}</p> : null}

      <div className="form-actions span-2">
        <button type="submit" className="button primary" disabled={starting || !sourceListId || !selectedSupermarketId}>
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
