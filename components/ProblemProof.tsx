import type { SiteContent } from '@/lib/content';

type ProblemProofProps = {
  problem: SiteContent['problem'];
};

export default function ProblemProof({ problem }: ProblemProofProps) {
  return (
    <section id="problem" className="section-panel grid gap-8 p-8 md:grid-cols-3 md:gap-10">
      {problem.map((item) => (
        <article key={item.title} className="flex flex-col gap-4">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue/80">{item.proof}</div>
          <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
          <p className="text-sm leading-relaxed text-mistMuted">{item.copy}</p>
        </article>
      ))}
    </section>
  );
}
