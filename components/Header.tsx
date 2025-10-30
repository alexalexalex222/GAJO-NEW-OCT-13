'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Navigation } from '@/lib/content';
import clsx from 'clsx';

type HeaderProps = {
  navigation: Navigation;
};

export default function Header({ navigation }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-40 transition-transform',
        isScrolled ? 'backdrop-blur bg-night/80 shadow-lg shadow-black/20' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-[1272px] items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="#main"
          className="text-lg font-semibold tracking-tight text-mist focus:outline-none focus-visible:focus-ring"
        >
          {navigation.logo}
        </Link>
        <nav
          aria-label={navigation.ariaLabel}
          className="hidden items-center gap-8 text-sm font-medium text-mist md:flex"
        >
          {navigation.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white focus:outline-none focus-visible:focus-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex">
          <Link
            href={navigation.cta.href}
            className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-mist transition hover:bg-white/20 focus:outline-none focus-visible:focus-ring"
            onClick={() => window.gajoTrack?.('cta_click_nav')}
          >
            {navigation.cta.label}
          </Link>
        </div>
        <button
          type="button"
          className="flex items-center justify-center rounded-full border border-white/20 p-2 text-mist transition hover:border-white/40 focus:outline-none focus-visible:focus-ring md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          {navigation.menuToggleLabel && (<span className="sr-only">{navigation.menuToggleLabel}</span>)}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M3 6h18M3 12h18M3 18h18'}
            />
          </svg>
        </button>
      </div>
      <div
        id="mobile-menu"
        className={clsx(
          'md:hidden',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="mx-4 mb-4 flex flex-col gap-4 rounded-2xl border border-white/10 bg-nightLight/95 p-6 text-sm font-medium text-mist">
          {navigation.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white focus:outline-none focus-visible:focus-ring"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={navigation.cta.href}
            className="rounded-full bg-teal/90 px-5 py-2 text-center font-semibold text-night transition hover:bg-teal focus:outline-none focus-visible:focus-ring"
            onClick={() => {
              setIsOpen(false);
              window.gajoTrack?.('cta_click_nav');
            }}
          >
            {navigation.cta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
