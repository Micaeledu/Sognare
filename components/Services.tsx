"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { services } from "@/content/site";
import type { ImageAsset } from "@/lib/media";

/** Palavras-chave pra casar cada categoria com uma foto real disponível,
 * sem depender de nome de arquivo fixo — qualquer foto cujo nome contenha
 * uma dessas palavras representa aquela categoria. Sem foto correspondente,
 * o card usa um fundo em degradê da paleta com a marca d'água da logo. */
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

function ServiceCard({
  service,
  image,
}: {
  service: (typeof services)[number];
  image: ImageAsset | null;
}) {
  return (
    <div className="service-slide group relative aspect-[3/4] w-[78vw] shrink-0 overflow-hidden sm:w-[46vw] md:w-[30vw] lg:w-[26vw]">
      {image ? (
        <Image
          src={image.src}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 78vw, 30vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-tan/25 via-navy to-navy-deep">
          <Image
            src="/brand/logo-256.png"
            alt=""
            aria-hidden="true"
            width={96}
            height={96}
            className="h-24 w-24 opacity-15"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent transition-opacity group-hover:from-navy/95" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="h-px w-8 origin-left scale-x-0 bg-tan transition-transform duration-500 group-hover:scale-x-100" />
        <h3 className="mt-3 font-display text-xl text-cream">{service.title}</h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-cream/80 opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export function Services({ images }: { images: ImageAsset[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!trackRef.current) return;
      tweenRef.current = gsap.fromTo(
        trackRef.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: services.length * 3,
          ease: "none",
          repeat: -1,
        },
      );
    });
    return () => mm.revert();
  }, [images.length]);

  const loopedServices = [...services, ...services];

  return (
    <section className="bg-navy py-24 text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="max-w-xl font-display text-3xl md:text-4xl">
          Marcenaria sob medida para cada ambiente
        </h2>
      </div>

      <div
        className="mt-10 overflow-hidden"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.resume()}
      >
        <div ref={trackRef} className="flex w-max gap-5 px-6 md:px-10">
          {loopedServices.map((service, i) => (
            <ServiceCard
              key={`${service.title}-${i}`}
              service={service}
              image={findImageFor(service.title, images)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
