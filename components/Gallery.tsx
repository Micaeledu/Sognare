"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLightbox } from "./Lightbox";
import type { ImageAsset } from "@/lib/media";

// Com poucas fotos, um grid fixo de 3-4 colunas deixa buracos vazios
// estranhos. Com 3 ou menos, mostra cards maiores e centralizados; com mais
// fotos, cai no grid normal preenchendo a largura toda.
function cardWidthClass(count: number) {
  if (count <= 2) return "w-full sm:w-[calc(50%-0.5rem)]";
  if (count === 3) return "w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.667rem)]";
  return "w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]";
}

export function Gallery({ images }: { images: ImageAsset[] }) {
  const { open } = useLightbox();
  const containerRef = useRef<HTMLDivElement>(null);
  const isSmallSet = images.length <= 3;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".gallery-card", { opacity: 0, scale: 0.96 });
        ScrollTrigger.batch(".gallery-card", {
          start: "top 88%",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
            }),
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [images.length] },
  );

  return (
    <section id="projetos" className="bg-cream py-24">
      <div ref={containerRef} className="mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="max-w-xl font-display text-3xl text-navy md:text-4xl">
          Projetos que falam por si
        </h2>

        {images.length === 0 ? (
          <div className="mt-12 flex h-64 items-center justify-center border border-dashed border-beige bg-beige/30 text-sm text-stone">
            As fotos dos projetos aparecerão aqui assim que forem adicionadas
            em <code className="mx-1">public/media/images</code>.
          </div>
        ) : (
          <div
            className={`mt-12 flex flex-wrap gap-3 md:gap-4 ${isSmallSet ? "justify-center" : ""}`}
          >
            {images.map((image) => (
              <button
                key={image.src}
                type="button"
                onClick={() =>
                  open(
                    <div className="flex flex-col items-center gap-3">
                      <Image
                        src={image.src}
                        alt="Projeto Sognare em detalhe"
                        width={image.width}
                        height={image.height}
                        className="max-h-[75vh] w-auto object-contain"
                      />
                      <p className="text-sm text-cream/80">
                        Projeto assinado pela Sognare
                      </p>
                    </div>,
                  )
                }
                className={`gallery-card group relative aspect-square overflow-hidden bg-beige ${cardWidthClass(images.length)}`}
              >
                <Image
                  src={image.src}
                  alt="Ambiente planejado pela Sognare"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="p-4 text-xs uppercase tracking-widest text-cream">
                    Ver projeto
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
