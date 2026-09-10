"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/content/site";
import type { ImageAsset, VideoAsset } from "@/lib/media";
import { WhatsappButton } from "./WhatsappButton";
import { useLightbox } from "./Lightbox";

export function Hero({
  image,
  heroVideo,
  narratedVideos,
}: {
  image: ImageAsset | null;
  heroVideo: VideoAsset | null;
  narratedVideos: VideoAsset[];
}) {
  const reduceMotion = useReducedMotion();
  const { open } = useLightbox();
  const watchVideo = narratedVideos[0] ?? null;

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      id="topo"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy text-cream"
    >
      <div className="absolute inset-0">
        {heroVideo ? (
          <>
            {/* Vídeo só no desktop: em mobile priorizamos leveza e usamos a
                imagem/poster estática abaixo. Também respeita
                prefers-reduced-motion não autoplayando o vídeo. */}
            {!reduceMotion && (
              <video
                src={heroVideo.src}
                poster={heroVideo.poster ?? undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="hidden h-full w-full object-cover md:block"
              />
            )}
            <div className="absolute inset-0 md:hidden">
              {heroVideo.poster || image ? (
                <Image
                  src={heroVideo.poster ?? image!.src}
                  alt="Ambiente planejado assinado pela Sognare"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-tan/40 to-navy" />
              )}
            </div>
          </>
        ) : image ? (
          <Image
            src={image.src}
            alt="Ambiente planejado assinado pela Sognare"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-tan/40 to-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/20" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-32 md:px-10">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-tan-light"
        >
          {heroContent.eyebrow}
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl font-display text-4xl leading-[1.1] md:text-6xl"
        >
          {heroContent.headline}
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-base text-cream/85 md:text-lg"
        >
          {heroContent.subheadline}
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <WhatsappButton label={heroContent.primaryCta} />
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 border border-cream/40 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors hover:border-cream hover:bg-cream/5"
          >
            {heroContent.secondaryCta}
          </a>

          {watchVideo && (
            <button
              type="button"
              onClick={() =>
                open(
                  <video
                    src={watchVideo.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[80vh] max-w-[90vw]"
                  />,
                )
              }
              className="inline-flex items-center gap-2 text-sm text-cream/80 underline decoration-tan underline-offset-4 transition-colors hover:text-cream"
            >
              ▶ Assistir vídeo
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
