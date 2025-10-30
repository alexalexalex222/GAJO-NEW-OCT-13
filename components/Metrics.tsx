import type { SiteContent } from '@/lib/content';

type MetricsProps = {
  metrics: SiteContent['metrics'];
};

export default function Metrics({ metrics }: MetricsProps) {
  return (
    <section id="metrics" className="section-panel flex flex-col gap-8 p-8">
      <header className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-white">{metrics.title}</h2>
        <p className="text-sm text-mistMuted">{metrics.description}</p>
      </header>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.items.map((metric) => (
          <li key={metric.name} className="rounded-2xl border border-white/5 bg-night/40 p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-teal/80">{metric.name}</div>
            <p className="mt-3 text-lg font-semibold text-white">{metric.target}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
