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
    <section className="bg-charcoal py-24 text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
            Quem já confiou na Sognare
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl md:text-4xl">
            Depoimentos reais de clientes
          </h2>
        </Reveal>

        {avaliacoes.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {avaliacoes.map((item, i) => (
              <Reveal key={item.src} delay={(i % 4) * 0.06}>
                <button
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
                  className="group relative block w-full overflow-hidden border border-cream/10 bg-cream shadow-lg transition-transform hover:-translate-y-1"
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                >
                  <Image
                    src={item.src}
                    alt="Avaliação de cliente da Sognare"
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        )}

        {textTestimonials.length > 0 && (
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {textTestimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.08}>
                <blockquote className="border-l-2 border-gold pl-5">
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
