"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { brand, contact } from "@/content/site";
import { WhatsappButton } from "./WhatsappButton";
import { InstagramIcon } from "./icons";

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-navy/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#topo"
          className="flex items-center gap-3 font-display text-xl tracking-wide text-cream"
        >
          <Image
            src="/brand/logo-256.png"
            alt={`${brand.fullName} — logo`}
            width={56}
            height={56}
            priority
            className="h-9 w-9 rounded-full"
          />
          {brand.name}
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-cream/80 transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram da ${brand.name}`}
            className="text-cream/80 transition-colors hover:text-cream"
          >
            <InstagramIcon />
          </a>
          <WhatsappButton
            label="Orçamento"
            className="px-5 py-2 text-xs uppercase tracking-widest"
          />
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-cream transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-cream transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-cream transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-cream/10 px-6 pb-6 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-base text-cream/90"
            >
              {link.label}
            </a>
          ))}
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-3 text-base text-cream/90"
          >
            <InstagramIcon />
            Instagram
          </a>
          <WhatsappButton
            label="Solicitar orçamento"
            className="mt-3 w-full justify-center"
          />
        </div>
      )}
    </header>
  );
}
