import type { SiteContent } from '@/lib/content';

type DeliverablesProps = {
  deliverables: SiteContent['deliverables'];
};

export default function Deliverables({ deliverables }: DeliverablesProps) {
  return (
    <section id="deliverables" className="section-panel flex flex-col gap-8 p-8">
      <header className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-white">{deliverables.title}</h2>
        <p className="text-sm text-mistMuted">{deliverables.subtitle}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {deliverables.items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/5 bg-night/40 p-6">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-mistMuted">{item.copy}</p>
          </article>
        ))}
      </div>
      <div className="rounded-2xl border border-teal/40 bg-teal/10 p-4 text-center text-sm font-semibold text-teal">
        {deliverables.callout}
      </div>
    </section>
  );
}
