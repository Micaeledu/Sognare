"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { textTestimonials } from "@/content/site";
import type { ImageAsset } from "@/lib/media";

const ROTATE_MS = 6000;

export function Testimonials({
  serviceImage,
}: {
  serviceImage: ImageAsset | null;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (textTestimonials.length < 2) return;
    const id = setInterval(() => {
      if (!paused.current) setActiveIndex((i) => (i + 1) % textTestimonials.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  if (textTestimonials.length === 0) return null;

  return (
    <section className="bg-navy py-24 text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="max-w-xl font-display text-3xl md:text-4xl">
          Depoimentos reais de clientes
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-stretch">
          <div className="relative hidden min-h-[22rem] overflow-hidden md:block">
            {serviceImage ? (
              <Image
                src={serviceImage.src}
                alt="Marcenaria de acabamento fino assinada pela Sognare"
                fill
                sizes="40vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-tan/30 to-navy-deep" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-sm text-cream/90">
              Cada projeto passa pelas mãos da mesma equipe, do desenho à instalação.
            </p>
          </div>

          <div
            className="relative flex min-h-[18rem] flex-col justify-center"
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
          >
            <span className="font-display text-6xl leading-none text-tan/50">
              “
            </span>
            <div className="relative -mt-6 h-64 overflow-hidden md:h-52">
              {textTestimonials.map((t, i) => (
                <div
                  key={t.author}
                  aria-hidden={i !== activeIndex}
                  // Crossfade em CSS puro (transition-opacity), sem GSAP: é só
                  // uma troca de opacidade simples, e uma tentativa anterior
                  // controlando isso via GSAP ficava com citações sobrepostas
                  // (a animação nunca "assentava" num estado limpo). CSS
                  // transition resolve isso sem essa complexidade.
                  className={`absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                    i === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <p className="font-display text-xl leading-snug text-cream md:text-2xl">
                    {t.quote}
                  </p>
                  <footer className="mt-5 text-sm uppercase tracking-widest text-cream/60">
                    {t.author}
                    {t.project ? ` — ${t.project}` : ""}
                  </footer>
                </div>
              ))}
            </div>

            {textTestimonials.length > 1 && (
              <div className="mt-8 flex gap-2">
                {textTestimonials.map((t, i) => (
                  <button
                    key={t.author}
                    type="button"
                    aria-label={`Ver depoimento de ${t.author}`}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 w-6 transition-colors ${
                      i === activeIndex ? "bg-tan" : "bg-cream/25"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
