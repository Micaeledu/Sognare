"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { processSteps } from "@/content/site";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const line = containerRef.current?.querySelector(".process-line");
        const steps = gsap.utils.toArray<HTMLElement>(".process-step");

        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 65%",
                end: "bottom 60%",
                scrub: 0.6,
              },
            },
          );
        }

        steps.forEach((step) => {
          const dot = step.querySelector(".process-dot");
          const content = step.querySelector(".process-content");
          gsap.fromTo(
            content,
            { opacity: 0, x: -16 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: step,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            },
          );
          if (dot) {
            gsap.fromTo(
              dot,
              { backgroundColor: "var(--color-beige)", scale: 0.7 },
              {
                backgroundColor: "var(--color-tan)",
                scale: 1,
                duration: 0.4,
                scrollTrigger: {
                  trigger: step,
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section id="processo" className="bg-cream py-24">
      <div ref={containerRef} className="mx-auto max-w-3xl px-6 md:px-10">
        <h2 className="font-display text-3xl text-navy md:text-4xl">
          Do projeto à instalação, sem surpresas
        </h2>

        <div role="list" className="relative mt-16 flex flex-col gap-14">
          <div className="process-line absolute left-[7px] top-2 h-full w-px bg-tan" />

          {processSteps.map((step) => (
            <div
              key={step.number}
              role="listitem"
              className="process-step relative flex gap-6 pl-0"
            >
              <span className="process-dot relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-beige" />
              <div className="process-content -mt-1 flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg text-tan">
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg text-navy">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-stone">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
