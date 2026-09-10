"use client";

import Image from "next/image";
import { textTestimonials } from "@/content/site";
import type { ImageAsset } from "@/lib/media";
import { useLightbox } from "./Lightbox";
import { Reveal } from "./Reveal";

export function Testimonials({ avaliacoes }: { avaliacoes: ImageAsset[] }) {
  const { open } = useLightbox();

  if (avaliacoes.length === 0 && textTestimonials.length === 0) return null;

  return (
    <section className="bg-navy py-24 text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-tan-light">
            Quem já confiou na Sognare
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl md:text-4xl">
            Depoimentos reais de clientes
          </h2>
        </Reveal>

        {avaliacoes.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-12 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:-mx-10 md:px-10">
              {avaliacoes.map((item) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() =>
                    open(
                      <Image
                        src={item.src}
                        alt="Avaliação de cliente da Sognare"
                        width={item.width}
                        height={item.height}
                        className="max-h-[85vh] w-auto object-contain"
                      />,
                    )
                  }
                  className="group relative shrink-0 snap-start overflow-hidden border border-cream/15 bg-cream p-2 shadow-xl transition-transform hover:-translate-y-1"
                  style={{ height: "22rem" }}
                >
                  <Image
                    src={item.src}
                    alt="Avaliação de cliente da Sognare"
                    width={item.width}
                    height={item.height}
                    className="h-full w-auto object-contain"
                  />
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-cream/50">
              Arraste para o lado para ver mais avaliações →
            </p>
          </Reveal>
        )}

        {textTestimonials.length > 0 && (
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {textTestimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.08}>
                <blockquote className="border-l-2 border-tan pl-5">
                  <p className="text-sm italic leading-relaxed text-cream/85">
                    “{t.quote}”
                  </p>
                  <footer className="mt-3 text-xs uppercase tracking-widest text-cream/60">
                    {t.author}
                    {t.project ? ` — ${t.project}` : ""}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
