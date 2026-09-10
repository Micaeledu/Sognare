import { brand, contact } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream py-14 text-charcoal">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between md:px-10">
        <div>
          <p className="font-display text-2xl">{brand.name}</p>
          <p className="mt-2 max-w-xs text-sm text-stone">
            {brand.fullName} — {brand.city}, {brand.state}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-stone">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-charcoal"
          >
            Instagram {brand.instagramHandle}
          </a>
          {contact.whatsappNumber && (
            <span>WhatsApp: +{contact.whatsappNumber}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 text-sm text-stone">
          <a href="/privacidade" className="transition-colors hover:text-charcoal">
            Política de Privacidade
          </a>
          <a href="/termos" className="transition-colors hover:text-charcoal">
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
