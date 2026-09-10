import { brand, contact, instagramContent } from "@/content/site";
import { InstagramIcon } from "./icons";

export function InstagramSection() {
  return (
    <section className="bg-tan py-20 text-navy">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center md:px-10">
        <InstagramIcon className="h-9 w-9" />
        <h2 className="font-display text-3xl md:text-4xl">
          {instagramContent.title}
        </h2>
        <p className="max-w-lg text-sm text-navy/80 md:text-base">
          {instagramContent.subtitle}
        </p>
        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 border border-navy px-7 py-3.5 text-sm font-medium tracking-wide text-navy transition-colors hover:bg-navy hover:text-cream"
        >
          {instagramContent.cta} — {brand.instagramHandle}
        </a>
      </div>
    </section>
  );
}
