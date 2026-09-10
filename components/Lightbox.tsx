"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type LightboxContextValue = {
  open: (content: ReactNode) => void;
  close: () => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox precisa estar dentro de LightboxProvider");
  return ctx;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);

  const close = useCallback(() => setContent(null), []);
  const open = useCallback((node: ReactNode) => setContent(node), []);

  useEffect(() => {
    if (!content) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [content, close]);

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      {content && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 md:p-10"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center text-2xl text-cream/80 transition hover:text-cream"
          >
            ×
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full"
          >
            {content}
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}
