"use client";

import Image from "next/image";
import { useLightbox } from "./Lightbox";
import { Reveal } from "./Reveal";
import type { ImageAsset } from "@/lib/media";

export function Gallery({ images }: { images: ImageAsset[] }) {
  const { open } = useLightbox();

  return (
    <section id="projetos" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-tan">
            Portfólio
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl text-navy md:text-4xl">
            Projetos que falam por si
          </h2>
        </Reveal>

        {images.length === 0 ? (
          <div className="mt-12 flex h-64 items-center justify-center border border-dashed border-beige bg-beige/30 text-sm text-stone">
            As fotos dos projetos aparecerão aqui assim que forem adicionadas
            em <code className="mx-1">public/media/images</code>.
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {images.map((image, i) => (
              <Reveal
                key={image.src}
                delay={(i % 6) * 0.05}
                className={
                  image.shape === "portrait" ? "row-span-2" : undefined
                }
              >
                <button
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
                  className="group relative block aspect-square w-full overflow-hidden bg-beige"
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
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
