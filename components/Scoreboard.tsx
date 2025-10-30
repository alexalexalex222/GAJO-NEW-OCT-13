'use client';

import { useMemo, useState } from 'react';
import type { SiteContent } from '@/lib/content';

type ScoreboardProps = {
  scoreboard: SiteContent['scoreboard'];
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function Scoreboard({ scoreboard }: ScoreboardProps) {
  const [expanded, setExpanded] = useState(false);

  const variableValue = useMemo(
    () => scoreboard.ratePerUnit * scoreboard.exampleUnits,
    [scoreboard.exampleUnits, scoreboard.ratePerUnit]
  );

  const exampleTotal = useMemo(
    () => scoreboard.base + variableValue,
    [scoreboard.base, variableValue]
  );

  return (
    <section id="scoreboard" className="section-panel flex flex-col gap-8 p-8">
      <header className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-white">{scoreboard.title}</h2>
        <p className="text-sm text-mistMuted">{scoreboard.description}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-night/40 p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-blue/80">{scoreboard.metric}</div>
          <div className="text-4xl font-semibold text-white">{currency.format(scoreboard.ratePerUnit)}</div>
          <p className="text-sm text-mistMuted">{scoreboard.metricLabel.replace('{metric}', scoreboard.metric)}</p>
          <dl className="mt-4 grid gap-3 text-sm text-mist">
            <div className="flex items-center justify-between">
              <dt>{scoreboard.targetLabel.replace('{metric}', scoreboard.metric)}</dt>
              <dd>{scoreboard.exampleUnits}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>{scoreboard.baseLabel}</dt>
              <dd>{currency.format(scoreboard.base)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>{scoreboard.variableLabel}</dt>
              <dd>{currency.format(variableValue)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
              <dt>{scoreboard.totalLabel}</dt>
              <dd>{currency.format(exampleTotal)}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="self-start text-sm font-semibold text-blue transition hover:text-blue/80 focus-visible"
            aria-expanded={expanded}
            onClick={() => {
              setExpanded((value) => !value);
              if (!expanded) {
                window.gajoTrack?.('scoreboard_open_details');
              }
            }}
          >
            {scoreboard.detailToggle}
          </button>
          {expanded && <p className="text-sm text-mistMuted">{scoreboard.detailCopy}</p>}
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-night/40 p-6">
          <h3 className="text-xl font-semibold text-white">{scoreboard.guardrailsTitle}</h3>
          <ul className="flex flex-col gap-3 text-sm text-mist">
            {scoreboard.notes.map((note) => (
              <li key={note} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-teal" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-teal/40 bg-teal/10 p-4 text-sm text-teal">
            <ul className="flex flex-col gap-2">
              {scoreboard.exampleBreakdown.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
