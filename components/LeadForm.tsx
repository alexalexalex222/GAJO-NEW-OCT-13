'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import type { SiteContent } from '@/lib/content';

type LeadFormProps = {
  form: SiteContent['form'];
};

type Status = 'idle' | 'loading' | 'success' | 'error';

const webhook = process.env.NEXT_PUBLIC_WEBHOOK_URL;

export default function LeadForm({ form }: LeadFormProps) {
  const params = useSearchParams();
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [values, setValues] = useState<Record<string, string>>({});
  const focusRef = useRef<HTMLDivElement>(null);

  const currentStep = form.steps[stepIndex];

  const utmValues = useMemo(() => {
    const tracked: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach((key) => {
      const value = params?.get(key);
      if (value) {
        tracked[key] = value;
      }
    });
    if (params?.get('city_zip')) {
      tracked.city_zip = params.get('city_zip') as string;
    }
    return tracked;
  }, [params]);

  useEffect(() => {
    setValues((prev) => ({ ...utmValues, ...prev }));
  }, [utmValues]);

  useEffect(() => {
    window.gajoTrack?.('lead_step_view', { step: currentStep.id });
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [currentStep.id]);

  const handleChange = (fieldId: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const requiredMissing = currentStep.fields
    .filter((field) => field.required && field.type !== 'hidden')
    .some((field) => !(values[field.id] && values[field.id].trim().length > 0));

  const nextStep = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (requiredMissing) {
      return;
    }

    if (stepIndex < form.steps.length - 1) {
      setStepIndex((index) => index + 1);
      return;
    }

    if (values[form.honeypot.id]) {
      return;
    }

    setStatus('loading');
    window.gajoTrack?.('lead_submit');

    try {
      if (webhook) {
        const response = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...values,
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!response.ok) {
          throw new Error('Webhook error');
        }
      }
      setStatus('success');
      window.gajoTrack?.('lead_success');
    } catch (error) {
      console.error(error);
      setStatus('error');
      window.gajoTrack?.('lead_error');
    }
  };

  if (status === 'success') {
    return (
      <section id="lead" className="section-panel flex flex-col gap-4 p-8">
        <h2 className="text-3xl font-semibold text-white">{form.successTitle}</h2>
        <p className="text-sm text-mistMuted">{form.successBody}</p>
      </section>
    );
  }

  return (
    <section id="lead" className="section-panel flex flex-col gap-6 p-8">
      <header className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-white">{form.title}</h2>
        <p className="text-sm text-mistMuted">{form.subtitle}</p>
      </header>
      <form className="flex flex-col gap-5" onSubmit={nextStep}>
        <div
          ref={focusRef}
          tabIndex={-1}
          className="rounded-2xl border border-white/5 bg-night/40 p-6"
        >
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-mistMuted">
            {form.stepIndicator.replace("{current}", String(stepIndex + 1)).replace("{total}", String(form.steps.length))}
          </div>
          <h3 className="mt-2 text-xl font-semibold text-white">{currentStep.title}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {currentStep.fields.map((field) => {
              const commonProps = {
                id: field.id,
                name: field.id,
                value: values[field.id] ?? '',
                onChange: (event: ChangeEvent<HTMLInputElement>) => handleChange(field.id, event.target.value),
              };

              if (field.type === 'hidden') {
                return <input key={field.id} type="hidden" {...commonProps} />;
              }

              return (
                <label key={field.id} className="flex flex-col gap-2 text-sm text-mist">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mistMuted">
                    {field.label}
                    {field.required ? '*' : ''}
                  </span>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    {...commonProps}
                    className="rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white focus:outline-none focus-visible:focus-ring"
                  />
                </label>
              );
            })}
            <label className="sr-only" htmlFor={form.honeypot.id}>
              {form.honeypot.label}
            </label>
            <input
              id={form.honeypot.id}
              name={form.honeypot.id}
              type="text"
              value={values[form.honeypot.id] ?? ''}
              onChange={(event) => handleChange(form.honeypot.id, event.target.value)}
              placeholder={form.honeypot.placeholder}
              aria-label={form.honeypot.aria}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
        </div>
        {status === 'error' && <p className="text-sm text-red-300">{form.error}</p>}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mistMuted">{form.privacy}</p>
          <button
            type="submit"
            className="rounded-full bg-blue px-6 py-3 text-sm font-semibold text-night transition hover:bg-blue/80 focus:outline-none focus-visible:focus-ring"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? form.loadingLabel : currentStep.cta}
          </button>
        </div>
        <p className="text-xs text-mistMuted">{form.webhookNote}</p>
      </form>
    </section>
  );
}
