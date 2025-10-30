'use client';

import { useEffect, useState } from 'react';
import type { Consent } from '@/lib/content';

const STORAGE_KEY = 'gajo-consent';

type ConsentState = 'accepted' | 'declined' | null;

type ConsentBannerProps = {
  consent: Consent;
};

export default function ConsentBanner({ consent }: ConsentBannerProps) {
  const [state, setState] = useState<ConsentState>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? (window.localStorage.getItem(STORAGE_KEY) as ConsentState | null) : null;
    if (stored) {
      setState(stored);
    } else {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (state) {
      window.localStorage.setItem(STORAGE_KEY, state);
      setIsOpen(false);
    }
  }, [state]);

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      aria-label={consent.ariaLabel}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-[1272px] rounded-2xl border border-white/10 bg-nightLight/90 p-6 backdrop-blur"
    >
      <div className="flex flex-col gap-4 text-sm text-mist">
        <p>{consent.message}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-night transition hover:bg-teal/90 focus-visible"
              onClick={() => {
                setState('accepted');
                window.gajoTrack?.('consent_accept');
              }}
            >
              {consent.accept}
            </button>
            <button
              type="button"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-mist transition hover:border-white/30 focus-visible"
              onClick={() => {
                setState('declined');
                window.gajoTrack?.('consent_decline');
              }}
            >
              {consent.deny}
            </button>
          </div>
          <button
            type="button"
            className="text-xs text-mistMuted underline underline-offset-4 hover:text-mist focus-visible"
            onClick={() => window.gajoTrack?.('consent_manage')}
          >
            {consent.manage}
          </button>
        </div>
      </div>
    </aside>
  );
}
