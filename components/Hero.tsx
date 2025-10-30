'use client';

import Image from 'next/image';
import type { Hero as HeroContent } from '@/lib/content';

type HeroProps = {
  hero: HeroContent;
};

export default function Hero({ hero }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden rounded-2xl border border-white/5 bg-nightLight/80 p-10 shadow-glass">
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt={hero.backgroundAlt}
          fill
          priority
          className="object-cover opacity-35"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-night via-night/90 to-black/70" aria-hidden="true" />
      </div>
      <div className="relative flex flex-col gap-8">
        <div className="flex flex-wrap gap-3">
          {hero.badges.map((badge) => (
            <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mist">
              {badge}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-2xl text-lg text-mistMuted md:text-xl">{hero.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-mist">
          {hero.trust.map((chip) => (
            <span key={chip} className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
              {chip}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={hero.ctaPrimaryHref}
            className="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3 text-base font-semibold text-night transition hover:bg-teal/90 focus:outline-none focus-visible:focus-ring"
            onClick={() => window.gajoTrack?.('cta_click_primary')}
          >
            {hero.ctaPrimary}
          </a>
          <a
            href={hero.ctaSecondaryHref}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-mist transition hover:border-white/40 focus:outline-none focus-visible:focus-ring"
            onClick={() => window.gajoTrack?.('cta_click_secondary')}
          >
            {hero.ctaSecondary}
          </a>
        </div>
        <ul className="grid gap-3 text-sm text-mistMuted sm:grid-cols-3">
          {hero.checklist.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span aria-hidden className="mt-1 inline-flex h-2 w-2 rounded-full bg-teal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
