"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sognare-cookie-consent";
export type ConsentValue = "accepted" | "declined";

export function getStoredConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function CookieConsent({
  onChange,
}: {
  onChange: (consent: ConsentValue) => void;
}) {
  const [consent, setConsent] = useState<ConsentValue | null>(() =>
    getStoredConsent(),
  );

  useEffect(() => {
    if (consent) onChange(consent);
    // Só precisa informar o pai quando já existia um consentimento salvo
    // no primeiro render; escolhas feitas depois passam por choose() abaixo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function choose(value: ConsentValue) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage indisponível (modo privado, etc.) — segue sem persistir.
    }
    setConsent(value);
    onChange(value);
  }

  if (consent) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-tan/30 bg-navy px-6 py-5 text-cream shadow-2xl md:px-10"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-cream/90">
          Usamos cookies para melhorar sua experiência e medir o desempenho
          das nossas divulgações. Você pode aceitar ou recusar os cookies não
          essenciais a qualquer momento.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-none border border-cream/30 px-4 py-2 text-sm text-cream/90 transition hover:border-cream/60"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-none bg-tan px-4 py-2 text-sm font-medium text-navy transition hover:bg-tan-light"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
