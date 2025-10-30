import site from '@/data/site.json';

type Link = {
  label: string;
  href: string;
};

type Navigation = {
  logo: string;
  ariaLabel: string;
  links: Link[];
  cta: Link;
  menuToggleLabel: string;
};

type Hero = {
  title: string;
  subtitle: string;
  trust: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryHref: string;
  ctaSecondaryHref: string;
  badges: string[];
  checklist: string[];
  backgroundAlt: string;
};

type ProblemCard = {
  title: string;
  copy: string;
  proof: string;
};

type ServiceItem = {
  title: string;
  copy: string;
  deliverables: string[];
};

type Services = {
  title: string;
  intro: string;
  items: ServiceItem[];
};

type Scoreboard = {
  title: string;
  description: string;
  base: number;
  metric: string;
  ratePerUnit: number;
  exampleUnits: number;
  guardrailsTitle: string;
  notes: string[];
  exampleBreakdown: string[];
  detailToggle: string;
  detailCopy: string;
  metricLabel: string;
  targetLabel: string;
  variableLabel: string;
  totalLabel: string;
};

type TimelinePhase = {
  phase: string;
  cta: string;
  href: string;
  bullets: string[];
};

type Timeline = {
  title: string;
  summary: string;
  phases: TimelinePhase[];
};

type DeliverableItem = {
  title: string;
  copy: string;
};

type Deliverables = {
  title: string;
  subtitle: string;
  items: DeliverableItem[];
  callout: string;
};

type MetricItem = {
  name: string;
  target: string;
};

type Metrics = {
  title: string;
  description: string;
  items: MetricItem[];
};

type PricingTab = {
  id: string;
  label: string;
  unit: string;
  rate: number;
  example: string;
  description: string;
};

type Pricing = {
  title: string;
  tabs: PricingTab[];
  slider: {
    label: string;
    srLabel: string;
    min: number;
    max: number;
    step: number;
  };
  base: number;
  copyButton: string;
  copiedLabel: string;
  hardCapToggle: string;
  hardCapNote: string;
  hardCapLabel: string;
  hardCapPlaceholder: string;
  guardrail: string;
  unitInputLabel: string;
  unitInputPlaceholder: string;
  resultLabel: string;
  baseLabel: string;
  rateLabel: string;
  copyExample: string;
  capApplied: string;
  unitValueLabel: string;
  aria: {
    tabs: string;
    tabPanel: string;
    slider: string;
    rate: string;
    base: string;
  };
};

type FAQItem = {
  q: string;
  a: string;
};

type FAQ = {
  title: string;
  items: FAQItem[];
};

type FormField = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
};

type FormStep = {
  id: string;
  title: string;
  cta: string;
  fields: FormField[];
};

type Form = {
  title: string;
  subtitle: string;
  steps: FormStep[];
  honeypot: {
    id: string;
    label: string;
    placeholder: string;
    aria: string;
  };
  successTitle: string;
  successBody: string;
  error: string;
  privacy: string;
  webhookNote: string;
  stepIndicator: string;
  loadingLabel: string;
};

type Footer = {
  legal: string;
  legalSuffix: string;
  links: Link[];
  address: string;
  contact: {
    email: string;
    phone: string;
  };
};

type SEO = {
  title: string;
  description: string;
  ogImage: string;
  twitterHandle: string;
};

type Consent = {
  message: string;
  accept: string;
  deny: string;
  manage: string;
  ariaLabel: string;
};

type SiteContent = {
  seo: SEO;
  navigation: Navigation;
  hero: Hero;
  problem: ProblemCard[];
  services: Services;
  scoreboard: Scoreboard;
  timeline: Timeline;
  deliverables: Deliverables;
  metrics: Metrics;
  pricing: Pricing;
  faq: FAQ;
  form: Form;
  footer: Footer;
  consent: Consent;
  policies: {
    privacyTitle: string;
    privacyBody: string;
    cookiesTitle: string;
    cookiesBody: string;
  };
  a11y: {
    skipToContent: string;
  };
};

const siteContent = site as SiteContent;

export type { SiteContent, Navigation, Hero, PricingTab, FormStep, Consent };
export default siteContent;
