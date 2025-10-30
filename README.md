# GAJO Marketing Site

A marketing site for GAJO — performance marketing for martial-arts gyms. Built with Next.js 14 App Router, Tailwind CSS, and TypeScript. All copy is sourced from [`data/site.json`](data/site.json) for simple content management.

## Quickstart

```bash
npm install
npm run dev
```

The project expects Node.js 18.17 or later. The dev server runs on [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file with the following keys:

```
NEXT_PUBLIC_SITE_URL=https://your-production-domain
NEXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890
NEXT_PUBLIC_WEBHOOK_URL=https://hooks.zapier.com/... (CRM webhook)
```

Analytics scripts only load when their respective IDs are defined. The webhook URL is optional for local development; submissions are skipped if it is missing.

## Content Model

All visible copy, labels, and lists live inside [`data/site.json`](data/site.json). Update this file to change the site copy. The shape aligns with the sections rendered in `app/page.tsx`.

Key sections:

- `navigation`, `hero`, `problem`, `services`, `scoreboard`, `timeline`, `deliverables`, `metrics`
- `pricing`: calculator tabs, slider settings, guardrails copy
- `faq`: accordion entries
- `form`: two-step audit request form, honeypot, success/error copy
- `footer`, `consent`, `policies`: legal + consent text

## Analytics Event Map

See [`docs/ANALYTICS.md`](docs/ANALYTICS.md) for the Meta Pixel and Google Tag events emitted across the experience.

## Accessibility & UX

- Semantic sections with skip-link, sticky navigation, and mobile menu.
- Visible focus styles via Tailwind utilities.
- Pricing calculator exposes ARIA-compliant tab/slider semantics.
- Lead form supports keyboard navigation, honeypot field, and UTM capture via query parameters.

## Deployment Notes

- Deploy to Vercel for optimal App Router support.
- Ensure the environment variables above are defined in the Vercel dashboard.
- The `sitemap` and `robots` routes read `NEXT_PUBLIC_SITE_URL` for canonical URLs.

## Scripts

- `npm run dev` — start the development server.
- `npm run build` — create an optimized production build.
- `npm start` — run the production server.
- `npm run lint` — run ESLint using Next.js defaults.
- `npm run type-check` — validate TypeScript types without emitting files.

## Folder Structure

```
app/          # App Router routes and layout
components/   # UI components mapped to sections
styles/       # Tailwind globals
public/       # Static assets (logo, OG image)
data/         # Content JSON consumed by components
lib/          # Content typing helper
```

## Testing Checklist

- Hero CTA scrolls to the lead form and fires analytics events.
- Pricing calculator tabs, slider, cap toggle, and copy button behave as expected.
- FAQ accordion opens/closes with keyboard input (`Enter`/`Space`).
- Lead form advances steps, blocks honeypot submissions, and posts to the webhook when configured.
- Consent banner respects prior choices via `localStorage`.
