import { credibilityStats } from "@/content/site";
import { Reveal } from "./Reveal";

export function CredibilityBar() {
  if (credibilityStats.length === 0) return null;

  return (
    <section className="border-y border-beige bg-cream">
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-beige px-6 py-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10">
        {credibilityStats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
            <div className="flex flex-col items-center gap-1 py-6 text-center sm:py-0">
              <span className="font-display text-3xl text-wood md:text-4xl">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-stone">
                {stat.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
