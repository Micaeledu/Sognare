"use client";

import { useState } from "react";
import { faqItems } from "@/content/site";

function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqItems.length === 0) return null;

  return (
    <section className="bg-cream py-24">
      <FaqJsonLd />
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <h2 className="font-display text-3xl text-navy md:text-4xl">
          Perguntas frequentes
        </h2>

        <div className="mt-10 divide-y divide-beige border-t border-b border-beige">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base text-navy md:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 text-xl text-tan transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-relaxed text-stone">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
