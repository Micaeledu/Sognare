import { services } from "@/content/site";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section className="bg-navy py-24 text-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-tan-light">
            O que fazemos
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl md:text-4xl">
            Marcenaria sob medida para cada ambiente
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.08}>
              <div className="h-full bg-navy p-8">
                <span className="font-display text-sm text-tan-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl text-cream">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
