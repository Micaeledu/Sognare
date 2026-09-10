"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { credibilityStats } from "@/content/site";

export function CredibilityBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".credibility-stat",
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: { trigger: containerRef.current, start: "top 90%" },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  if (credibilityStats.length === 0) return null;

  return (
    <section className="border-y border-beige bg-cream">
      <div
        ref={containerRef}
        className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-beige px-6 py-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10"
      >
        {credibilityStats.map((stat) => (
          <div
            key={stat.label}
            className="credibility-stat flex flex-col items-center gap-1 py-6 text-center sm:py-0"
          >
            <span className="font-display text-3xl text-tan md:text-4xl">
              {stat.value}
            </span>
            <span className="text-xs uppercase tracking-widest text-stone">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
