'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    gajoTrack: (event: string, payload?: Record<string, unknown>) => void;
  }
}

const googleId = process.env.NEXT_PUBLIC_GTAG_ID;
const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function AnalyticsProvider() {
  useEffect(() => {
    if (googleId && typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`;
      document.head.append(gtagScript);
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', googleId, { anonymize_ip: true });
    }

    if (metaId && typeof window !== 'undefined') {
      const fbScript = document.createElement('script');
      fbScript.async = true;
      fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.append(fbScript);
      window.fbq = function fbq(...args: unknown[]) {
        if (!(window.fbq as { queue?: unknown[] }).queue) {
          (window.fbq as { queue: unknown[] }).queue = [];
        }
        (window.fbq as { queue: unknown[] }).queue?.push(args);
      } as unknown as typeof window.fbq;
      window.fbq('init', metaId);
      window.fbq('track', 'PageView');
    }

    if (typeof window !== 'undefined') {
      window.gajoTrack = (event: string, payload?: Record<string, unknown>) => {
        if (googleId && window.gtag) {
          window.gtag('event', event, payload ?? {});
        }
        if (metaId && window.fbq) {
          window.fbq('trackCustom', event, payload ?? {});
        }
      };
    }
  }, []);

  return null;
}
