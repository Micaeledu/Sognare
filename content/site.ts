/**
 * Conteúdo central do site. Edite este arquivo para atualizar textos,
 * serviços, etapas e depoimentos — nada disso está espalhado pelos
 * componentes.
 *
 * Dados marcados como REAL vêm do perfil público @sognareambientes no
 * Instagram (confirmados com o cliente em 2026-09-10). Dados marcados como
 * PLACEHOLDER são texto de exemplo verossímil e devem ser revisados com a
 * Sognare antes de publicar em produção.
 */

export const brand = {
  name: "Sognare",
  fullName: "Sognare Ambientes Planejados", // REAL
  founderName: "Rafael", // REAL
  yearsOfMarket: 12, // REAL — bio do Instagram
  city: "Salvador", // REAL
  state: "BA", // REAL
  instagramHandle: "@sognareambientes", // REAL
  instagramUrl: "https://www.instagram.com/sognareambientes",
} as const;

export const heroContent = {
  eyebrow: "Marcenaria de alto padrão em Salvador",
  headline: "Ambientes planejados que carregam a sua história",
  subheadline:
    "Há 12 anos transformando espaços com móveis sob medida, do projeto à instalação — com a precisão e o acabamento de um ateliê que trata cada detalhe como definitivo.",
  primaryCta: "Solicitar orçamento",
  secondaryCta: "Ver projetos",
} as const;

export const credibilityStats: { value: string; label: string }[] = [
  { value: "12", label: "anos de mercado" }, // REAL
  { value: "39,8 mil", label: "seguidores no Instagram" }, // REAL
  { value: "Salvador, BA", label: "atendimento e entregas" }, // REAL
];

export type Service = {
  title: string;
  description: string;
};

// PLACEHOLDER (categorias inspiradas nos destaques reais do Instagram:
// Studios, Sala, Cozinha, Quarto, Banheiro) — revisar texto com a Sognare.
export const services: Service[] = [
  {
    title: "Cozinhas planejadas",
    description:
      "Layouts que unem fluxo de trabalho e estética, com materiais resistentes ao dia a dia.",
  },
  {
    title: "Quartos e closets",
    description:
      "Organização sob medida para cada estilo de vida, sem abrir mão do conforto.",
  },
  {
    title: "Salas e painéis",
    description:
      "Painéis de TV, racks e composições que viram o ponto focal do ambiente.",
  },
  {
    title: "Banheiros e lavabos",
    description: "Marcenaria resistente à umidade, com acabamento fino.",
  },
  {
    title: "Studios e compactos",
    description:
      "Soluções multiuso que otimizam cada metro quadrado sem parecer apertado.",
  },
  {
    title: "Ambientes corporativos",
    description:
      "Escritórios e espaços comerciais com identidade e funcionalidade.",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

// PLACEHOLDER — fluxo de trabalho ilustrativo, confirmar etapas reais com a Sognare.
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Briefing e visita técnica",
    description:
      "Entendemos o espaço, a rotina e o estilo de quem vai viver ali.",
  },
  {
    number: "02",
    title: "Projeto e escolha de materiais",
    description:
      "Desenho personalizado em 3D, com curadoria de madeiras e acabamentos.",
  },
  {
    number: "03",
    title: "Produção artesanal",
    description:
      "Fabricação sob medida, com precisão milimétrica em cada peça.",
  },
  {
    number: "04",
    title: "Instalação",
    description: "Equipe própria cuida da montagem com cuidado e capricho.",
  },
  {
    number: "05",
    title: "Acompanhamento pós-entrega",
    description: "Suporte e garantia depois que o projeto já está em uso.",
  },
];

export const aboutContent = {
  title: `${brand.yearsOfMarket} anos transformando espaços em ${brand.city}`,
  paragraphs: [
    // REAL, adaptado da bio do Instagram
    `A Sognare Ambientes Planejados nasceu em ${brand.city} com um propósito simples: transformar espaços com móveis planejados que unem design inteligente e execução sob medida.`,
    // PLACEHOLDER — história detalhada a confirmar com o Rafael
    "Cada projeto passa pelas mãos da mesma equipe, do desenho à instalação — o que garante coerência entre o que foi combinado e o que chega pronto na casa do cliente.",
  ],
  founderNote: `${brand.founderName}, fundador da Sognare, acompanha pessoalmente projetos e entregas.`,
} as const;

export type Testimonial = {
  author: string;
  project?: string;
  quote: string;
};

// Nenhum depoimento em texto solto por enquanto — a prova social real já
// está nos prints de public/media/avaliacoes (Testimonials os renderiza
// automaticamente). Preencha este array se a Sognare quiser destacar algum
// depoimento em texto além dos prints.
export const textTestimonials: Testimonial[] = [];

export const finalCta = {
  title: "Vamos desenhar o seu próximo ambiente?",
  subtitle:
    "Fale agora com a Sognare e receba uma proposta sem compromisso.",
} as const;

export const contact = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? brand.instagramUrl,
  whatsappMessage:
    "Olá! Vim pelo site da Sognare e gostaria de solicitar um orçamento.",
} as const;

export function buildWhatsappUrl(message: string = contact.whatsappMessage) {
  if (!contact.whatsappNumber) return null;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${contact.whatsappNumber}?text=${encoded}`;
}
