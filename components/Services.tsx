"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { services } from "@/content/site";

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".service-card", { opacity: 0, y: 16 });
        ScrollTrigger.batch(".service-card", {
          start: "top 85%",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: "power2.out",
            }),
        });
        gsap.set(".service-line", { scaleX: 0 });
        ScrollTrigger.batch(".service-line", {
          start: "top 85%",
          onEnter: (batch) =>
            gsap.to(batch, {
              scaleX: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: "power2.out",
            }),
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section className="bg-navy py-24 text-cream">
      <div ref={containerRef} className="mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="max-w-xl font-display text-3xl md:text-4xl">
          Marcenaria sob medida para cada ambiente
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <div className="service-line h-px w-10 origin-left bg-tan" />
              <h3 className="mt-5 font-display text-xl text-cream">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
