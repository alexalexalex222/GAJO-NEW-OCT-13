'use client';

import { useState } from 'react';
import type { SiteContent } from '@/lib/content';

type FAQProps = {
  faq: SiteContent['faq'];
};

export default function FAQ({ faq }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-panel flex flex-col gap-6 p-8">
      <header className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-white">{faq.title}</h2>
      </header>
      <div className="flex flex-col divide-y divide-white/10">
        {faq.items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.q} className="py-4">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left text-sm text-mist transition hover:text-white focus-visible"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-lg font-semibold text-white">{item.q}</span>
                <span aria-hidden className="text-2xl font-semibold">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <p className="mt-3 text-sm text-mistMuted">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
