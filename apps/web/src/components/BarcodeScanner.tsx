"use client";

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

interface BarcodeScannerProps {
  onDetected: (barcode: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onDetected, onClose }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    reader
      .decodeFromConstraints(
        { video: { facingMode: "environment" } },
        videoRef.current!,
        (result, err) => {
          if (result) {
            onDetected(result.getText());
          }
          if (err && !(err instanceof NotFoundException)) {
            setError("Erro ao acessar a câmera. Verifique as permissões.");
          }
        }
      )
      .catch(() => {
        setError("Câmera não disponível ou permissão negada.");
      });

    return () => {
      reader.reset();
    };
  }, [onDetected]);

  return (
    <div className="scanner-overlay" role="dialog" aria-modal="true" aria-label="Scanner de código de barras">
      <div className="scanner-modal">
        <div className="scanner-header">
          <h2>Escanear código de barras</h2>
          <button type="button" className="button secondary" onClick={onClose}>
            Fechar
          </button>
        </div>
        {error ? (
          <p className="form-message error">{error}</p>
        ) : (
          <p className="muted">Aponte a câmera para o código de barras do produto.</p>
        )}
        <div className="scanner-viewport">
          <video ref={videoRef} className="scanner-video" />
          <div className="scanner-reticle" />
        </div>
      </div>
    </div>
  );
}
