import Link from "next/link";
import { brand } from "@/content/site";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-charcoal px-6 text-center text-cream">
      <p className="font-display text-6xl text-gold-light">404</p>
      <h1 className="font-display text-2xl md:text-3xl">
        Essa página não existe.
      </h1>
      <p className="max-w-md text-sm text-cream/70">
        Mas o restante do ateliê {brand.name} está logo ali.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 border border-cream/40 px-6 py-3 text-sm tracking-wide transition-colors hover:border-cream hover:bg-cream/5"
      >
        Voltar para o início
      </Link>
    </main>
  );
}
