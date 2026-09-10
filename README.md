# Sognare — Landing page de orçamento

Landing page de conversão para a Sognare Ambientes Planejados (marcenaria
de alto padrão). Sem e-commerce, sem banco de dados — o objetivo único é
levar o visitante a pedir orçamento via WhatsApp ou formulário.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Conteúdo e mídia

- `content/site.ts` — todos os textos, serviços, etapas e depoimentos em
  texto. Edite este arquivo para atualizar o site sem mexer nos componentes.
- `public/media/images/`, `public/media/videos/`, `public/media/avaliacoes/`
  — coloque aqui as fotos, vídeos e prints de avaliações reais da marca. O
  site distribui tudo automaticamente pelas seções (ver README de cada
  pasta). Pastas vazias caem num fundo sólido da paleta, sem quebrar o
  layout.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

- `NEXT_PUBLIC_WHATSAPP` — número do WhatsApp (só dígitos, com DDI+DDD).
- `NEXT_PUBLIC_GA4_ID` / `NEXT_PUBLIC_META_PIXEL_ID` — opcionais.
- `RESEND_API_KEY` / `CONTATO_EMAIL_DESTINO` — usados pelo formulário de
  contato (Fase 2); sem eles, o formulário cai no fallback de WhatsApp.

## Deploy

Projeto pensado para deploy na [Vercel](https://vercel.com), com as
variáveis de ambiente cadastradas no painel do projeto (nunca no código).
