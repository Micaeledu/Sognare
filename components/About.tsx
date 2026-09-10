"use client";

import Image from "next/image";
import { aboutContent } from "@/content/site";
import type { ImageAsset, VideoAsset } from "@/lib/media";
import { useLightbox } from "./Lightbox";
import { Reveal } from "./Reveal";

function VideoCard({ video, label }: { video: VideoAsset; label: string }) {
  const { open } = useLightbox();

  return (
    <button
      type="button"
      onClick={() =>
        open(
          <video
            src={video.src}
            controls
            autoPlay
            playsInline
            className="max-h-[80vh] max-w-[90vw]"
          />,
        )
      }
      className="group relative flex h-40 w-28 shrink-0 items-center justify-center overflow-hidden bg-navy md:h-52 md:w-36"
    >
      {video.poster ? (
        <Image
          src={video.poster}
          alt={label}
          fill
          sizes="144px"
          className="object-cover opacity-70 transition-opacity group-hover:opacity-90"
        />
      ) : (
        <video
          src={video.src}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90"
        />
      )}
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-tan/90 text-navy">
        ▶
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-navy/70 px-2 py-1.5 text-center text-[11px] leading-tight text-cream">
        {label}
      </span>
    </button>
  );
}

export function About({
  portrait,
  videos,
}: {
  portrait: ImageAsset | null;
  videos: VideoAsset[];
}) {
  return (
    <section id="sobre" className="bg-cream py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:items-center md:px-10">
        <Reveal>
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden bg-beige">
            {portrait ? (
              <Image
                src={portrait.src}
                alt={`${aboutContent.founderNote}`}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-tan to-navy" />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl text-navy md:text-4xl">
            {aboutContent.title}
          </h2>
          {aboutContent.paragraphs.map((p) => (
            <p
              key={p}
              className="mt-4 text-sm leading-relaxed text-stone md:text-base"
            >
              {p}
            </p>
          ))}
          <p className="mt-4 text-sm font-medium text-navy">
            {aboutContent.founderNote}
          </p>

          {videos.length > 0 && (
            <div className="mt-8">
              <div className="flex gap-3">
                {videos.map((video, i) => (
                  <VideoCard
                    key={video.src}
                    video={video}
                    label={i === 0 ? "Conheça o ateliê" : "Nosso trabalho"}
                  />
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
