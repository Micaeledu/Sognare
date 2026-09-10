import type { Metadata } from "next";
import { brand, contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como a ${brand.fullName} trata os dados de quem visita e entra em contato pelo site.`,
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-navy md:px-10">
      <h1 className="font-display text-3xl">Política de Privacidade</h1>
      <p className="mt-2 text-sm text-stone">Última atualização: 10 de setembro de 2026</p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-stone">
        <p>
          A <strong>{brand.fullName}</strong> respeita sua privacidade, em
          conformidade com a Lei Geral de Proteção de Dados (Lei nº
          13.709/2018 — LGPD).
        </p>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">1. Quem somos</h2>
          <p>
            Marcenaria de alto padrão sediada em {brand.city}, {brand.state}.
            Este site é institucional/vitrine e serve para apresentar nosso
            trabalho e receber contatos de orçamento.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">2. Dados que coletamos</h2>
          <p>
            Dados que você envia voluntariamente no formulário de contato ou
            pelo WhatsApp (nome, contato, mensagem) e dados de navegação
            (via Google Analytics e/ou Meta Pixel, quando você aceita
            cookies no banner do site).
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">3. Uso dos dados</h2>
          <p>
            Usamos seus dados para responder seu contato, elaborar
            orçamentos, melhorar o site e medir o resultado das nossas
            divulgações. Não vendemos nem alugamos seus dados a terceiros.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">4. Compartilhamento</h2>
          <p>
            Compartilhamos dados apenas com provedores de análise (Google,
            Meta) e de e-mail, exclusivamente para as finalidades acima.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">5. Cookies</h2>
          <p>
            Usamos cookies para o funcionamento do site e para análise de
            audiência. Você pode recusá-los no banner exibido na primeira
            visita ou nas configurações do seu navegador.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">6. Seus direitos (LGPD)</h2>
          <p>
            Você pode solicitar acesso, correção, exclusão ou revogação do
            consentimento sobre seus dados a qualquer momento, pelos canais
            de contato abaixo.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">7. Segurança</h2>
          <p>
            Adotamos medidas técnicas razoáveis para proteger seus dados,
            ciente de que nenhum sistema é 100% seguro.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg text-navy">8. Contato</h2>
          <p>
            {brand.fullName} — {brand.city}, {brand.state}
            {contact.whatsappNumber ? ` — WhatsApp: +${contact.whatsappNumber}` : ""}
          </p>
        </section>
      </div>
    </main>
  );
}
