"use client";

import { buildWhatsappUrl } from "@/content/site";
import { trackConversion } from "@/lib/analytics";

type Props = {
  label?: string;
  message?: string;
  className?: string;
  variant?: "solid" | "outline";
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide transition-colors";
const variants = {
  solid: "bg-tan text-navy hover:bg-tan-light",
  outline:
    "border border-cream/40 text-cream hover:border-cream hover:bg-cream/5",
};

export function WhatsappButton({
  label = "Solicitar orçamento",
  message,
  className = "",
  variant = "solid",
}: Props) {
  const url = buildWhatsappUrl(message);

  if (!url) {
    return (
      <span
        className={`${baseClasses} ${variants[variant]} cursor-not-allowed opacity-60 ${className}`}
        title="WhatsApp ainda não configurado (NEXT_PUBLIC_WHATSAPP)"
      >
        {label}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion("click_whatsapp")}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {label}
    </a>
  );
}

export function WhatsappFloatingButton() {
  const url = buildWhatsappUrl();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion("click_whatsapp")}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:bottom-8 md:right-8"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.647 4.53 1.77 6.4L4 29l7.77-1.73A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.6c-2.02 0-3.9-.58-5.49-1.58l-.394-.24-4.61 1.027 1.05-4.49-.256-.41A9.55 9.55 0 0 1 5.4 15c0-5.85 4.755-10.6 10.604-10.6S26.6 9.15 26.6 15 21.85 24.6 16.004 24.6Zm5.85-7.94c-.32-.16-1.9-.938-2.194-1.045-.294-.108-.508-.16-.722.16-.213.32-.83 1.045-1.017 1.26-.187.213-.374.24-.694.08-.32-.16-1.35-.498-2.573-1.59-.951-.848-1.594-1.895-1.78-2.216-.187-.32-.02-.494.14-.654.144-.144.32-.374.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.722-1.74-.99-2.383-.26-.626-.526-.54-.722-.55l-.615-.01c-.213 0-.56.08-.854.4-.294.32-1.12 1.094-1.12 2.668 0 1.574 1.147 3.094 1.307 3.308.16.213 2.257 3.446 5.468 4.833.764.33 1.36.527 1.826.674.767.244 1.465.21 2.017.127.615-.092 1.9-.777 2.168-1.527.267-.75.267-1.393.187-1.527-.08-.133-.294-.213-.614-.373Z" />
      </svg>
    </a>
  );
}
