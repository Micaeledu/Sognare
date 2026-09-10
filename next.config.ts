import type { NextConfig } from "next";

// CSP permite apenas o necessário: GA4/Meta Pixel (scripts + beacons) e o
// próprio domínio para tudo o resto. 'unsafe-inline' em script-src é
// necessário para os snippets de inicialização do gtag/fbq injetados via
// next/script; como o site não reflete input de usuário em HTML (o
// formulário de contato só envia dados para o servidor), o risco de XSS
// armazenado que o nonce normalmente mitiga não se aplica aqui — e usar
// nonce exigiria SSR dinâmico por requisição, custando a página estática.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
