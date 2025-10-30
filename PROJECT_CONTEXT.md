# GAJO Marketing Site — Project Brief

```
📋 GAJO Marketing Site — Master Build Prompt

Role: You are the Senior UI/UX Engineering + Conversion agent.
Objective: Ship a fast, high-quality, conversion-focused marketing site for GAJO — Marketing for Martial-Arts Gyms using a componentized stack. Speed with quality: MVP in 72 hours, polish in the following 7–10 days.

0) Inputs & Defaults (fill or keep defaults)

ICP = Independent martial-arts gym owners (BJJ/Muay Thai/MMA), 1–3 locations, US.
Primary Offer = Qualified Trial (paid or free; default $29 for 2 weeks).
Tone = Direct, operator-led, outcomes-first, no fluff.
Brand = Dark glass, teal (#00B887) & blue (#1A9BFF) accents, Inter type.
Primary KPI = Qualified Trials (alt tabs: Shows, New Members).
Pricing Model = PH-386™ (Base $386 + performance tiers; hard cap & fraud rules).
CTA Wording = “Get the 5-Minute Audit” (primary), “See Pricing” (secondary), “Request a Demo” (nav).
Stack = Next.js 14 App Router + Tailwind + TS. Content in JSON.
Repo Starter = gajo-site-starter (provided).
Deploy = Vercel.
Analytics = Meta Pixel, Google Tag, event map provided below.
CRM = Lightweight pipeline (e.g., Airtable/HubSpot/Pipedrive) with webhook.

1) Scope & Information Architecture (single-page first, anchors; add stubs for long-form)
    1.  Hero — dark dojo treatment; badges: Qualified Trials • Ad Campaigns • PH-386™; bold H1, 72-hour subline, trust chips, primary/secondary CTA.
    2.  Problem → Proof — 3–6 cards calling out “generic agency fails,” with counter-proof and stat placeholders.
    3.  Service Ladder (5 pillars) — Website/Funnel, Paid Acquisition, Short-Form Engine, Nurture + CRM, Operator Access.
    4.  PH-386™ Scoreboard — base + variable example math + guardrails (fraud/disqualify rules) + cap note.
    5.  72-Hour Launch Timeline — Day 0–1, 1–3, 4–14, 15–30; compact timeline with CTA per phase.
    6.  Deliverables Grid — tangible outputs per pillar; “you own your assets” callout.
    7.  Success Metrics — CPL, Trial→Show %, Show→Member %, CAC vs First-Month Value, Time-to-first-lead.
    8.  Pricing + Calculator — tabs (Trials / Shows / Members), slider + example math; ARIA-complete.
    9.  FAQ / Objections — contracts, market saturation, red flags, seasonality, content expectations.
    10. Lead Capture — two-step “5-Minute Audit” form, honeypot + UTM capture, success state prompts scheduling.
    11. Footer — GAJO brand, DojoATL note, legal, privacy/cookies.

Narrative thread: “Launch fast, keep what works, kill what doesn’t.”

2) Visual & UX Rails (non-negotiables)
    •   Grid: Centered max-width 1272px, 4/8/16 spacing, rounded 18–24px, “glass” panels (hairline borders) on dark.
    •   Type: Inter 400–900; clamp H1/H2; tracking -0.02em for big headlines.
    •   Color: bg #0F151A / #0B1115; text #E6F0F5/#9FB2BF; accents teal/blue above; AA contrast minimum.
    •   Motion: Subtle (parallax orbs, section reveals). Respect prefers-reduced-motion.
    •   Accessibility: Landmarks, visible focus, semantic structure, color contrast AA+, labels/aria for interactive components.
    •   Mobile parity: Sticky nav + consent banner must not overlap; 390px simulations required.

3) Implementation Details
    •   Stack: Next.js 14 App Router + Tailwind + TypeScript.
    •   Content Model: All copy & lists live in /data/site.json. Sections read from JSON props.
    •   Components (exact filenames):
        •   components/Header.tsx (sticky, anchor nav)
        •   components/Hero.tsx (badges, trust chips, dual CTA)
        •   components/ProblemProof.tsx
        •   components/ServiceLadder.tsx
        •   components/Scoreboard.tsx (PH-386)
        •   components/LaunchTimeline.tsx
        •   components/Deliverables.tsx
        •   components/Metrics.tsx
        •   components/PricingCalculator.tsx
        •   components/FAQ.tsx
        •   components/LeadForm.tsx
        •   components/Footer.tsx
    •   Forms: Two-step form with honeypot and UTM capture. Submit → webhook (Zapier/Make) → CRM.
    •   State: Minimal client state; calculator local state only.
    •   SEO: Title/desc per page; og:* and Twitter summary_large_image; /sitemap.xml; robots.txt.
    •   Security: Basic CSP; register any 3rd-party asset hosts. No inline scripts.
    •   Performance: Static where possible; image next/image; preload primary font; LCP ≤ 2.5s, INP ≤ 200ms, CLS < 0.1.
    •   Internationalization: English only (v1), copy centralized for future i18n.

4) Conversion Copy (starter content hooks)
    •   H1: “Marketing for Martial-Arts Gyms.”
    •   Sub: “Launch in ≈72 hours — we build the funnel, turn on paid, and ship organic clips.”
    •   Trust chips: “No contracts • Own your site & ads • Operator access.”
    •   Checklist bullets: “High-converting website • Performance-based pricing • Dedicated operator.”
    •   PH-386 blurb: “$386 base + performance tiers aligned to Trials/Shows/Members. Hard cap, fraud rules, full audit trail.”

5) Analytics & Events Map
    •   Global: PageView, ScrollDepth(25/50/75), OutboundClick.
    •   Hero: cta_click_primary, cta_click_secondary.
    •   Calculator: calc_tab_change(metric), calc_value_change(value), calc_example_copy.
    •   Form: lead_step_view(step), lead_submit, lead_success, lead_error.
    •   Scoreboard: scoreboard_open_details.
    •   Schema: pass utm_* and city_zip when available.

6) Pricing Calculator Spec
    •   Tabs: Trials / Shows / New Members (one active).
    •   Inputs: Slider (0–200), optional cost per unit, optional hard cap toggle.
    •   Outputs: Base ($386) + units × rate = projected fee; show guardrails note and example.
    •   A11y: Tabs are buttons with aria-selected, panels labelled, slider keyboard-operable with visible value.

7) QA & Definition of Done

Automated checks (desktop & 390px):
    •   Can click Hero primary CTA → lead form; ESC/Tab cycles without trap.
    •   Calculator: tabs switch, slider updates math, copy to clipboard works.
    •   FAQ: expand/collapse via mouse & keyboard; proper ARIA.
    •   Form: honeypot blocks bots; UTM captured in payload; success state shown.

Scores:
    •   Lighthouse: Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
    •   Axe: 0 critical issues.
    •   Web vitals within budgets stated above.

Content review: All text from site.json, no hard-coded strings (except labels/placeholders).

Docs delivered: README quickstart, analytics event map, content schema, env sample, deploy notes.

8) Delivery Plan (fast, not rushed)

Day 0 (2–3h) — Setup & IA
    •   Create repo from gajo-site-starter. Wire sections & anchors; push deploy to Vercel.
    •   Stub all components + JSON schema; load placeholder copy.

Day 1 (4–6h) — Hero, Services, Scoreboard, Form
    •   Build Hero + badges; implement Service Ladder; implement Scoreboard & example math.
    •   LeadForm (two-step) with webhook stub; analytics events.
    •   First pass copy from site.json.

Day 2 (4–6h) — Timeline, Metrics, Calculator, FAQ
    •   Timeline + CTAs; Metrics chips; fully functional Pricing Calculator with ARIA.
    •   FAQ with common objections; polish nav behavior; consent banner.

Day 3 (3–5h) — QA + Perf + A11y + Polish
    •   Lighthouse/Axe, fix regressions; add OG images; mobile QA; deploy notes.
    •   Hand over content checklist.

Post-MVP (week 1): reviews wall, local SEO basics, blog/MDX stubs.

9) What We Need from Client (blockers marked [REQUIRED])
    •   Brand assets: logo/SVG, colors, any font license (optional; Inter by default).
    •   Offer: trial type & price, bonuses, refund rules [REQUIRED].
    •   Testimonials: 3–5 short quotes with names (or placeholders).
    •   Stats/proof: any local wins or numbers.
    •   Content: 10–20 seconds B-roll/class clips (phone ok) or stock until ready.
    •   Tracking IDs: Meta Pixel ID, Google Tag ID [REQUIRED].
    •   CRM: target pipeline + webhook endpoint [REQUIRED].
    •   Legal: privacy policy URL, terms, consent copy (we can stub).
    •   Contact: phone/email, address/catchment area, hours.

10) Risks & Mitigations
    •   Unclear offer → ship with defaults ($29/2-weeks) and mark copy as [[CLIENT TO PROVIDE]].
    •   Slow asset delivery → use gradient/orb hero fallback, swap once photos arrive.
    •   A11y collisions (sticky vs consent) → reserve safe-area in CSS and test at 390px.

11) File/Structure Requirements (exact)

app/
  layout.tsx
  page.tsx
components/
  Header.tsx
  Hero.tsx
  ProblemProof.tsx
  ServiceLadder.tsx
  Scoreboard.tsx
  LaunchTimeline.tsx
  Deliverables.tsx
  Metrics.tsx
  PricingCalculator.tsx
  FAQ.tsx
  LeadForm.tsx
  Footer.tsx
data/
  site.json   // schema below
public/
  logo.svg
styles/
  globals.css

data/site.json schema (extendable)

{
  "hero": {
    "title": "Marketing for Martial-Arts Gyms",
    "subtitle": "Launch in ≈72 hours — we build the funnel, turn on paid, and ship organic clips.",
    "trust": ["No contracts", "Own your site & ads", "Operator access"],
    "ctaPrimary": "Get the 5-Minute Audit",
    "ctaSecondary": "See Pricing",
    "badges": ["Qualified Trials", "Ad Campaigns", "PH-386™"]
  },
  "problem": [{ "title": "", "copy": "" }],
  "services": [
    { "title": "Website & Funnel", "copy": "" },
    { "title": "Paid Acquisition", "copy": "" },
    { "title": "Short-Form Engine", "copy": "" },
    { "title": "Nurture + CRM", "copy": "" },
    { "title": "Operator Access", "copy": "" }
  ],
  "scoreboard": {
    "base": 386,
    "metric": "Trials",
    "ratePerUnit": 26,
    "exampleUnits": 25,
    "notes": ["Hard cap", "Fraud/no-show rules", "Audit trail"]
  },
  "timeline": [
    { "phase": "Day 0–1", "bullets": [] },
    { "phase": "Day 1–3", "bullets": [] },
    { "phase": "Days 4–14", "bullets": [] },
    { "phase": "Days 15–30", "bullets": [] }
  ],
  "deliverables": [{ "title": "", "copy": "" }],
  "metrics": [
    { "name": "CPL", "target": "" },
    { "name": "Trial→Show %", "target": "" },
    { "name": "Show→Member %", "target": "" },
    { "name": "Blended CAC", "target": "" },
    { "name": "Time-to-first-lead", "target": "" }
  ],
  "pricing": { "tabs": ["Trials", "Shows", "New Members"] },
  "faq": [{ "q": "", "a": "" }],
  "contact": { "email": "", "phone": "", "address": "" }
}

12) Hand-off & Deliverables
    •   Live Vercel URL + preview deploys.
    •   Repo with componentized code and this prompt in /PROJECT_CONTEXT.md.
    •   README.md quickstart and analytics event table.
    •   Content checklist for client.
    •   One-page “How to edit site.json” guide.

🔧 Starter Repo

You already have the scaffold I generated earlier. Download if needed:
gajo-site-starter.zip
Run:

npm install
npm run dev

If you want, I’ll pre-wire the remaining sections (ProblemProof, ServiceLadder, Scoreboard, Timeline, Metrics, PricingCalculator, FAQ, LeadForm) into your starter and push a fresh ZIP so you can drop in copy and go.
```
