'use client';

import type { SiteContent } from '@/lib/content';

type LaunchTimelineProps = {
  timeline: SiteContent['timeline'];
};

export default function LaunchTimeline({ timeline }: LaunchTimelineProps) {
  return (
    <section id="timeline" className="section-panel flex flex-col gap-8 p-8">
      <header className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-white">{timeline.title}</h2>
        <p className="text-sm text-mistMuted">{timeline.summary}</p>
      </header>
      <ol className="grid gap-6 md:grid-cols-2">
        {timeline.phases.map((phase) => (
          <li key={phase.phase} className="rounded-2xl border border-white/5 bg-night/40 p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-white">{phase.phase}</h3>
              <a
                href={phase.href}
                className="text-sm font-semibold text-blue transition hover:text-blue/80 focus:outline-none focus-visible:focus-ring"
                onClick={() => window.gajoTrack?.('timeline_phase_cta', { phase: phase.phase })}
              >
                {phase.cta}
              </a>
            </div>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-mist">
              {phase.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-blue" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
