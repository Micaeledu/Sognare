import { processSteps } from "@/content/site";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section id="processo" className="bg-cream py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-tan">
            Como trabalhamos
          </p>
          <h2 className="mt-3 font-display text-3xl text-navy md:text-4xl">
            Do projeto à instalação, sem surpresas
          </h2>
        </Reveal>

        <ol className="mt-14 flex flex-col">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <li className="flex gap-6 border-t border-beige py-7 first:border-t-0">
                <span className="font-display text-2xl text-tan">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-lg text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
