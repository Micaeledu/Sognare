"use client";

type ConversionEvent = "click_orcamento" | "click_whatsapp";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Dispara um evento de conversão no GA4 e no Meta Pixel, se estiverem carregados. */
export function trackConversion(event: ConversionEvent) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event);
  window.fbq?.("trackCustom", event);
}
