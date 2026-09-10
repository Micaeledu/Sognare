import { finalCta } from "@/content/site";
import { Reveal } from "./Reveal";
import { WhatsappButton } from "./WhatsappButton";

export function FinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden bg-charcoal py-28 text-cream">
      <div className="gold-divider absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl">
            {finalCta.title}
          </h2>
          <p className="mt-4 text-base text-cream/80 md:text-lg">
            {finalCta.subtitle}
          </p>
          <div className="mt-10 flex justify-center">
            <WhatsappButton label="Falar no WhatsApp agora" />
          </div>
        </Reveal>
      </div>
      <div className="gold-divider absolute inset-x-0 bottom-0" />
    </section>
  );
}
