"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { services } from "@/content/site";
import type { ImageAsset } from "@/lib/media";

/** Palavras-chave pra casar cada categoria com uma foto real disponível,
 * sem depender de nome de arquivo fixo — qualquer foto cujo nome contenha
 * uma dessas palavras representa aquela categoria. Sem foto correspondente,
 * o card usa um fundo em degradê da paleta (nunca quebra). */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Cozinhas planejadas": ["cozinha"],
  "Quartos e closets": ["quarto", "closet"],
  "Salas e painéis": ["sala", "painel"],
  "Banheiros e lavabos": ["banheiro", "lavabo"],
  "Studios e compactos": ["studio", "compacto"],
  "Ambientes corporativos": ["corporativo", "escritorio", "escritório"],
};

function findImageFor(title: string, images: ImageAsset[]) {
  const keywords = CATEGORY_KEYWORDS[title] ?? [];
  return (
    images.find((img) =>
      keywords.some((kw) => img.filename.toLowerCase().includes(kw)),
    ) ?? null
  );
}

export function Services({ images }: { images: ImageAsset[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".service-slide", { opacity: 0, x: 40 });
        gsap.to(".service-slide", {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: trackRef },
  );

  const updateActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => track.removeEventListener("scroll", updateActiveFromScroll);
  }, [updateActiveFromScroll]);

  function scrollToIndex(i: number) {
    const card = cardRefs.current[i];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  function scrollBy(direction: 1 | -1) {
    const next = Math.min(Math.max(activeIndex + direction, 0), services.length - 1);
    scrollToIndex(next);
  }

  return (
    <section className="bg-navy py-24 text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-3xl md:text-4xl">
            Marcenaria sob medida para cada ambiente
          </h2>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              aria-label="Categoria anterior"
              onClick={() => scrollBy(-1)}
              disabled={activeIndex === 0}
              className="flex h-11 w-11 items-center justify-center border border-cream/30 text-cream transition-colors hover:border-tan hover:text-tan disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Próxima categoria"
              onClick={() => scrollBy(1)}
              disabled={activeIndex === services.length - 1}
              className="flex h-11 w-11 items-center justify-center border border-cream/30 text-cream transition-colors hover:border-tan hover:text-tan disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service, i) => {
            const image = findImageFor(service.title, images);
            return (
              <div
                key={service.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="service-slide group relative aspect-[3/4] w-[78vw] shrink-0 snap-center overflow-hidden sm:w-[46vw] md:w-[30vw] lg:w-[26vw]"
              >
                {image ? (
                  <Image
                    src={image.src}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 78vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-tan/25 via-navy to-navy-deep" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent transition-opacity group-hover:from-navy/95" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="h-px w-8 origin-left scale-x-0 bg-tan transition-transform duration-500 group-hover:scale-x-100" />
                  <h3 className="mt-3 font-display text-xl text-cream">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-cream/80 opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {services.map((service, i) => (
            <button
              key={service.title}
              type="button"
              aria-label={`Ver ${service.title}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 transition-all ${
                i === activeIndex ? "w-6 bg-tan" : "w-1.5 bg-cream/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
