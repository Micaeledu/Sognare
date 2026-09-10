import type { Metadata } from "next";
import { brand, contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: `Termos de uso do site institucional da ${brand.fullName}.`,
  robots: { index: true, follow: true },
};

export default function TermosPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-navy md:px-10">
      <h1 className="font-display text-3xl">Termos de Uso</h1>
      <p className="mt-2 text-sm text-stone">Última atualização: 10 de setembro de 2026</p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-stone">
        <section>
          <h2 className="mb-2 font-display text-lg text-navy">1. Sobre o site</h2>
          <p>
            Este é um site institucional da <strong>{brand.fullName}</strong>,
            usado para apresentar nosso portfólio e receber pedidos de
            contato/orçamento. Não processamos vendas ou pagamentos online.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">2. Conteúdo</h2>
          <p>
            Imagens, vídeos, projetos e textos exibidos aqui são de autoria
            da {brand.fullName} e não podem ser copiados ou reutilizados sem
            autorização prévia.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">3. Orçamentos</h2>
          <p>
            Valores e prazos são definidos após análise do projeto. As
            informações apresentadas no site têm caráter ilustrativo.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">4. Links externos</h2>
          <p>
            Não nos responsabilizamos pelo conteúdo de sites e redes sociais
            de terceiros eventualmente linkados aqui (Instagram, WhatsApp).
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">5. Contato</h2>
          <p>
            {brand.fullName} — {brand.city}, {brand.state}
            {contact.whatsappNumber ? ` — WhatsApp: +${contact.whatsappNumber}` : ""}
          </p>
        </section>
      </div>
    </main>
  );
}
