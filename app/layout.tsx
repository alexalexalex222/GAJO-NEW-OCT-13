import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import siteContent from '@/lib/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import ConsentBanner from '@/components/ConsentBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  openGraph: {
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: [{ url: siteContent.seo.ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    site: siteContent.seo.twitterHandle,
  },
};

export const viewport: Viewport = {
  themeColor: '#0F151A',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-night">
      <body className={`${inter.variable} relative min-h-screen bg-night`}
        suppressHydrationWarning
      >
        <AnalyticsProvider />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus-visible">
          {siteContent.a11y.skipToContent}
        </a>
        <Header navigation={siteContent.navigation} />
        <ConsentBanner consent={siteContent.consent} />
        <main id="main" className="relative mx-auto flex max-w-[1272px] flex-col gap-24 px-4 pb-24 pt-28 md:px-8">
          {children}
        </main>
        <Footer footer={siteContent.footer} />
      </body>
    </html>
  );
}
