import Image from "next/image";
import { brand, contact } from "@/content/site";
import { InstagramIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream py-14 text-navy">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between md:px-10">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/logo-256.png"
            alt={`${brand.fullName} — logo`}
            width={40}
            height={40}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <p className="font-display text-2xl">{brand.name}</p>
            <p className="mt-1 max-w-xs text-sm text-stone">
              {brand.fullName} — {brand.city}, {brand.state}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-stone">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium text-navy transition-colors hover:text-tan"
          >
            <InstagramIcon className="h-5 w-5" />
            {brand.instagramHandle}
          </a>
          {contact.whatsappNumber && (
            <span>WhatsApp: +{contact.whatsappNumber}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 text-sm text-stone">
          <a href="/privacidade" className="transition-colors hover:text-navy">
            Política de Privacidade
          </a>
          <a href="/termos" className="transition-colors hover:text-navy">
            Termos de Uso
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6 text-xs text-stone/70 md:px-10">
        © {year} {brand.fullName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
