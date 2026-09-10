import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { brand, contact } from "@/content/site";
import { Analytics } from "@/components/Analytics";
import { WhatsappFloatingButton } from "@/components/WhatsappButton";
import { LightboxProvider } from "@/components/Lightbox";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sognare.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.fullName} — Marcenaria de alto padrão em ${brand.city}`,
    template: `%s — ${brand.name}`,
  },
  description: `Móveis planejados e sob medida em ${brand.city}. Há ${brand.yearsOfMarket} anos transformando espaços com design inteligente e marcenaria fina. Solicite um orçamento sem compromisso.`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: brand.fullName,
    title: `${brand.fullName} — Marcenaria de alto padrão em ${brand.city}`,
    description: `Móveis planejados e sob medida em ${brand.city}. Design inteligente, execução artesanal.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.fullName} — Marcenaria de alto padrão`,
    description: `Móveis planejados sob medida em ${brand.city}.`,
  },
  robots: { index: true, follow: true },
};

function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: brand.fullName,
    image: `${siteUrl}/opengraph-image`,
    url: siteUrl,
    areaServed: `${brand.city}, ${brand.state}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: brand.city,
      addressRegion: brand.state,
      addressCountry: "BR",
    },
    sameAs: [contact.instagramUrl],
    ...(contact.whatsappNumber
      ? { telephone: `+${contact.whatsappNumber}` }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body className="min-h-full font-sans antialiased">
        <LocalBusinessJsonLd />
        <LightboxProvider>
          {children}
          <WhatsappFloatingButton />
        </LightboxProvider>
        <Analytics />
      </body>
    </html>
  );
}
