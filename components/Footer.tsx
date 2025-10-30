import Link from 'next/link';
import type { SiteContent } from '@/lib/content';

type FooterProps = {
  footer: SiteContent['footer'];
};

export default function Footer({ footer }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 bg-night/80">
      <div className="mx-auto flex max-w-[1272px] flex-col gap-6 px-4 py-10 text-sm text-mistMuted md:flex-row md:items-center md:justify-between md:px-8">
        <div className="space-y-2">
          <p className="font-semibold text-mist">{`${footer.legal}${year}${footer.legalSuffix}`}</p>
          <p>{footer.address}</p>
          <p>
            <a href={`mailto:${footer.contact.email}`} className="hover:text-white focus-visible">
              {footer.contact.email}
            </a>{' '}
            •{' '}
            <a href={`tel:${footer.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white focus-visible">
              {footer.contact.phone}
            </a>
          </p>
        </div>
        <nav className="flex gap-4">
          {footer.links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white focus-visible">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
