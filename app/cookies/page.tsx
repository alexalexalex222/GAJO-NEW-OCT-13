import type { Metadata } from 'next';
import siteContent from '@/lib/content';

export const metadata: Metadata = {
  title: `${siteContent.policies.cookiesTitle} — GAJO`,
  description: siteContent.policies.cookiesBody,
};

export default function CookiesPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 py-24">
      <h1 className="text-4xl font-semibold text-white">{siteContent.policies.cookiesTitle}</h1>
      <p className="text-sm leading-relaxed text-mistMuted">{siteContent.policies.cookiesBody}</p>
    </div>
  );
}
