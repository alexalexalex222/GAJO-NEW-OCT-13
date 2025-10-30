'use client';

import { useEffect, useMemo, useState } from 'react';
import type { SiteContent } from '@/lib/content';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

type PricingCalculatorProps = {
  pricing: SiteContent['pricing'];
};

type Tab = SiteContent['pricing']['tabs'][number];

type ClipboardState = 'idle' | 'copied';

export default function PricingCalculator({ pricing }: PricingCalculatorProps) {
  const [active, setActive] = useState<Tab>(pricing.tabs[0]);
  const [units, setUnits] = useState(pricing.slider.min);
  const [unitValue, setUnitValue] = useState('');
  const [capEnabled, setCapEnabled] = useState(false);
  const [capValue, setCapValue] = useState('');
  const [clipboard, setClipboard] = useState<ClipboardState>('idle');

  useEffect(() => {
    setClipboard('idle');
  }, [active, units, unitValue, capEnabled, capValue]);

  const variableFee = useMemo(() => units * active.rate, [units, active.rate]);
  const capNumber = useMemo(() => {
    const parsed = Number.parseFloat(capValue.replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : null;
  }, [capValue]);

  const baseFee = pricing.base;
  let projectedTotal = baseFee + variableFee;
  let capped = false;
  if (capEnabled && capNumber) {
    if (projectedTotal > capNumber) {
      projectedTotal = capNumber;
      capped = true;
    }
  }

  const projectedValue = useMemo(() => {
    const numeric = Number.parseFloat(unitValue.replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(numeric)) {
      return null;
    }
    return numeric * units;
  }, [unitValue, units]);

  useEffect(() => {
    window.gajoTrack?.('calc_tab_change', { metric: active.id });
  }, [active.id]);

  const handleUnitsChange = (value: number) => {
    setUnits(value);
    window.gajoTrack?.('calc_value_change', { value });
  };

  const copyBreakdown = async () => {
    const lines = [
      `${pricing.baseLabel}: ${currency.format(baseFee)}`,
      `${pricing.rateLabel}: ${currency.format(variableFee)}`,
      `${pricing.resultLabel}: ${currency.format(projectedTotal)}`,
    ];
    if (projectedValue) {
      lines.push(`${pricing.unitValueLabel.replace('{unit}', active.unit)}: ${currency.format(projectedValue)}`);
    }
    if (capped) {
      lines.push(`${pricing.capApplied}: ${currency.format(projectedTotal)}`);
    }
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setClipboard('copied');
      window.gajoTrack?.('calc_example_copy');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="pricing" className="section-panel flex flex-col gap-8 p-8">
      <header className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-white">{pricing.title}</h2>
      </header>
      <div role="tablist" aria-label={pricing.aria.tabs} className="flex flex-wrap gap-3">
        {pricing.tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active.id === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible ${
              active.id === tab.id ? 'bg-teal text-night' : 'bg-white/10 text-mist hover:bg-white/20'
            }`}
            onClick={() => setActive(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="grid gap-6 rounded-2xl border border-white/5 bg-night/40 p-6 md:grid-cols-[1.2fr_1fr]"
      >
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-sm text-mist">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mistMuted">{pricing.slider.label}</span>
            <input
              type="range"
              min={pricing.slider.min}
              max={pricing.slider.max}
              step={pricing.slider.step}
              value={units}
              onChange={(event) => handleUnitsChange(Number(event.target.value))}
              aria-label={pricing.aria.slider}
            />
            <span className="text-lg font-semibold text-white">{units}</span>
          </label>
          <label className="flex flex-col gap-2 text-sm text-mist">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mistMuted">
              {pricing.unitInputLabel.replace('{unit}', active.unit)}
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={unitValue}
              placeholder={pricing.unitInputPlaceholder}
              onChange={(event) => setUnitValue(event.target.value)}
              className="rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white focus-visible"
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-mist">
            <input
              type="checkbox"
              checked={capEnabled}
              onChange={(event) => setCapEnabled(event.target.checked)}
              className="h-5 w-5 rounded border border-white/20 bg-night/80 focus-visible"
            />
            <span>{pricing.hardCapToggle}</span>
          </label>
          {capEnabled && (
            <label className="flex flex-col gap-2 text-sm text-mist">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mistMuted">{pricing.hardCapLabel}</span>
              <input
                type="text"
                inputMode="decimal"
                value={capValue}
                placeholder={pricing.hardCapPlaceholder}
                onChange={(event) => setCapValue(event.target.value)}
                className="rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white focus-visible"
              />
              <span className="text-xs text-mistMuted">{pricing.hardCapNote}</span>
            </label>
          )}
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-night/50 p-6">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-mistMuted">{pricing.baseLabel}</div>
          <div className="text-3xl font-semibold text-white">{currency.format(baseFee)}</div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-mistMuted">{pricing.rateLabel}</div>
          <div className="text-3xl font-semibold text-white">{currency.format(variableFee)}</div>
          <div className="text-sm text-mistMuted">{active.description}</div>
          <div className="border-t border-white/10 pt-4">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-mistMuted">{pricing.resultLabel}</div>
            <div className="text-4xl font-semibold text-white">{currency.format(projectedTotal)}</div>
            {capped && <p className="text-xs text-teal">{pricing.capApplied}</p>}
            <p className="mt-3 text-xs text-mistMuted">{pricing.guardrail}</p>
          </div>
          {projectedValue && (
            <div className="rounded-xl border border-blue/40 bg-blue/10 p-4 text-sm text-blue">
              {`${pricing.unitValueLabel.replace('{unit}', active.unit)}: ${currency.format(projectedValue)}`}
            </div>
          )}
          <button
            type="button"
            onClick={copyBreakdown}
            className="self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-mist transition hover:border-white/40 focus-visible"
          >
            {clipboard === 'copied' ? pricing.copiedLabel : pricing.copyExample}
          </button>
        </div>
      </div>
    </section>
  );
}
