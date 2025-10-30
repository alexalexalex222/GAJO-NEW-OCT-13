import type { SiteContent } from '@/lib/content';

type ServiceLadderProps = {
  services: SiteContent['services'];
};

export default function ServiceLadder({ services }: ServiceLadderProps) {
  return (
    <section id="services" className="section-panel flex flex-col gap-10 p-8">
      <header className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold text-white">{services.title}</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-mistMuted">{services.intro}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {services.items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/5 bg-night/40 p-6">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-mistMuted">{item.copy}</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-mist">
              {item.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-blue" />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
