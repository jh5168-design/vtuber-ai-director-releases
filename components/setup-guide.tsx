'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Callout } from '@/components/callout';
import { CopyButton } from '@/components/copy-button';
import { cn } from '@/lib/cn';

function Panel({ title, intro, children }: { title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <div className="rounded-xl border bg-fd-card p-5 md:p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      {intro ? <p className="mt-1.5 text-fd-muted-foreground">{intro}</p> : null}
      {children}
    </div>
  );
}

type Row = { label: string; value: string; mono?: boolean; copy?: boolean };

function SettingsList({ rows, copyAllLabel }: { rows: Row[]; copyAllLabel?: string }) {
  return (
    <div className="mt-5 overflow-hidden rounded-lg border bg-fd-background">
      <dl className="divide-y text-[0.9375rem]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-x-4 gap-y-0.5 px-4 py-3 sm:grid-cols-[9.5rem_minmax(0,1fr)_5.25rem] sm:items-center"
          >
            <dt className="text-sm text-fd-muted-foreground">{row.label}</dt>
            <dd className={cn('min-w-0 break-words', row.mono && 'font-mono text-[0.875rem]')}>{row.value}</dd>
            {row.copy ? <CopyButton value={row.value} className="-my-1 justify-self-start sm:justify-self-end" /> : <span className="max-sm:hidden" />}
          </div>
        ))}
      </dl>
      {copyAllLabel ? (
        <div className="flex justify-end border-t px-2 py-1.5">
          <CopyButton
            label={copyAllLabel}
            value={rows.map((row) => `${row.label}: ${row.value}`).join('\n')}
          />
        </div>
      ) : null}
    </div>
  );
}

function Alternatives({ items }: { items: { title: string; body: ReactNode }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border p-5">
          <p className="font-semibold">{item.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

function NumberedChecks({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mt-5 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5 rounded-lg border bg-fd-background px-4 py-3.5 text-[0.9375rem] leading-relaxed">
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-fd-primary/6 text-xs font-semibold text-fd-primary tabular dark:bg-fd-primary/12">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function Checklist({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item, i) => (
        <li key={i}>
          <label className="flex cursor-pointer gap-3.5 rounded-lg border bg-fd-background px-4 py-3.5 text-[0.9375rem] leading-relaxed transition-colors has-checked:border-fd-primary/40 has-checked:bg-fd-primary/6">
            <input type="checkbox" className="mt-1 size-4 shrink-0 cursor-pointer" />
            <span>{item}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

type Step = { label: string; short: string; title: string; lede: string; body: ReactNode };

const steps: Step[] = [
  {
    label: 'Model connection',
    short: 'Model',
    title: 'Connect the model that does the directing.',
    lede: 'VTuber AI Director works with any OpenAI-compatible endpoint. A local service is the most private place to start; a cloud provider helps when you need more capacity.',
    body: (
      <>
        <Panel
          title="Recommended: LM Studio"
          intro={
            <>
              Load an instruction-capable model, open the Developer tab, and start the local server on port 1234. Then
              enter these values in <strong className="font-semibold text-fd-foreground">Settings → AI model service</strong>.
            </>
          }
        >
          <SettingsList
            rows={[
              { label: 'Service URL', value: 'http://localhost:1234/v1', mono: true, copy: true },
              { label: 'API key', value: 'Leave blank' },
              { label: 'Model', value: 'Select Fetch models, then pick the model you loaded' },
            ]}
          />
        </Panel>
        <Alternatives
          items={[
            {
              title: 'Ollama',
              body: (
                <>
                  Use <code className="font-mono text-[0.9em] text-fd-foreground">http://localhost:11434/v1</code> and the
                  name of the model you pulled.
                </>
              ),
            },
            {
              title: 'Cloud provider',
              body: 'Enter the provider’s compatible base URL, the model name, and your API key.',
            },
          ]}
        />
        <Callout title="Test, then save">
          Select <strong>Test connection</strong>. When it reports <strong>Connected</strong>, select <strong>Save</strong>;
          testing alone stores nothing. The <Link href="/docs/model-service">model service guide</Link> covers each option
          and every error message.
        </Callout>
      </>
    ),
  },
  {
    label: 'Speech input',
    short: 'Speech',
    title: 'Let the director follow your performance.',
    lede: 'Local Whisper tracks your speech on your own computer. Download its model once, then check your microphone.',
    body: (
      <>
        <Panel
          title="Download the recognition model"
          intro={
            <>
              In <strong className="font-semibold text-fd-foreground">Settings → Local speech recognition</strong>, keep{' '}
              <strong className="font-semibold text-fd-foreground">small</strong> as the recognition model, select Save, then
              select Preload recognition model. Wait until the status line says ready.
            </>
          }
        >
          <SettingsList
            rows={[
              { label: 'Recognition model', value: 'small', mono: true },
              { label: 'Download', value: 'About 484 MB, once' },
              {
                label: 'Stored in',
                value: '~/Library/Application Support/vtuber-ai-director-desktop/models',
                mono: true,
                copy: true,
              },
            ]}
          />
        </Panel>
        <Callout type="idea" title="Hugging Face slow or blocked?">
          Open the app with a mirror, or download the model files yourself and enter their folder path. The{' '}
          <Link href="/docs/speech-recognition#if-hugging-face-is-slow-or-blocked">speech recognition guide</Link> shows both.
        </Callout>
        <Panel title="Configure speech input" intro="In Live Stream or Live Rehearsal, work through these checks in order.">
          <NumberedChecks
            items={[
              <>
                Choose <strong>Local Whisper (recommended, offline)</strong> as the recognition engine.
              </>,
              'Set the recognition language: Chinese, Japanese, English, or automatic detection.',
              <>
                Select <strong>Allow access and refresh microphones</strong>, then choose the right input.
              </>,
              'Run the five-second audio input test. Confirm the level moves and your sample is transcribed.',
            ]}
          />
        </Panel>
        <Callout type="warn" title="Browser recognition is optional">
          It depends on browser and operating-system support and may send audio to the browser vendor. Local Whisper is
          the predictable path in the desktop app.
        </Callout>
      </>
    ),
  },
  {
    label: 'Character profile',
    short: 'Character',
    title: 'Teach the director who is on camera.',
    lede: 'A character profile is more than a prompt. It is the identity boundary for memories, viewer relationships, language, humor, and behavior.',
    body: (
      <>
        <Panel title="A useful first profile" intro="Start small and concrete. You can refine it after you hear a rehearsal.">
          <SettingsList
            copyAllLabel="Copy profile"
            rows={[
              { label: 'Character name', value: 'Astra Vale' },
              { label: 'Occupation', value: 'Night-shift archivist' },
              { label: 'Personality traits', value: 'Observant, warm, quietly mischievous' },
              { label: 'Speaking tone', value: 'Conversational; short, vivid metaphors' },
              { label: 'Typical phrases', value: '“Let’s open that file.”' },
              { label: 'Boundaries', value: 'Never invent personal facts about viewers' },
            ]}
          />
        </Panel>
        <Alternatives
          items={[
            {
              title: 'Write positive direction',
              body: 'Show the rhythm and vocabulary you want with example lines.',
            },
            {
              title: 'Set hard boundaries',
              body: 'List the topics, claims, and behaviors the character must avoid.',
            },
          ]}
        />
        <Callout title="Memory is scoped to the character">
          A stream using Astra never reads another character’s memories or viewer profiles. Rehearsals and live streams
          are separate environments, too.
        </Callout>
      </>
    ),
  },
  {
    label: 'First rehearsal',
    short: 'Rehearsal',
    title: 'Run one safe, observable rehearsal.',
    lede: 'Start with low simulated audience activity. Read naturally, improvise once on purpose, and watch the director update only the lines ahead of you.',
    body: (
      <>
        <Panel title="Five-minute acceptance run" intro="Tick each check as you go.">
          <Checklist
            items={[
              'Select your new character and leave the rehearsal instructions blank.',
              <>
                Set <strong>Simulated audience activity</strong> to <strong>Low activity</strong> and start the rehearsal.
              </>,
              'Read several sentences. Confirm the highlight advances with your speech, not with time.',
              'Say something that is not in the script. Confirm the director marks it as improvisation and adapts the upcoming lines.',
              'Stop the rehearsal. In Memory Studio, confirm the new entry sits under Live rehearsal.',
            ]}
          />
        </Panel>
        <Callout type="success" title="You are ready to go live when…">
          Audio is stable, generation finishes before your ready buffer runs out, and the character sounds right when you
          say the lines out loud.
        </Callout>
      </>
    ),
  },
];

const clamp = (value: number) => Math.min(steps.length - 1, Math.max(0, value));

export function SetupGuide() {
  const [index, setIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const headings = useRef<(HTMLHeadingElement | null)[]>([]);
  const moved = useRef(false);

  useEffect(() => {
    const match = /^#step-(\d+)$/.exec(window.location.hash);
    if (match) setIndex(clamp(Number(match[1]) - 1));
  }, []);

  useEffect(() => {
    if (!moved.current) return;
    const content = contentRef.current;
    if (content && content.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      content.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
    }
    headings.current[index]?.focus({ preventScroll: true });
  }, [index]);

  function go(next: number) {
    const target = clamp(next);
    moved.current = true;
    setIndex(target);
    history.replaceState(null, '', `#step-${target + 1}`);
  }

  const minutesLeft = Math.max(2, 8 - index * 2);

  return (
    <div className="shell grid gap-10 py-12 md:py-16 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:gap-24">
      <nav aria-label="Setup steps" className="lg:sticky lg:top-24 lg:self-start">
        <ol className="grid grid-cols-4 gap-1.5 lg:grid-cols-1 lg:gap-1">
          {steps.map((step, i) => {
            const active = i === index;
            const done = i < index;
            return (
              <li key={step.label}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={active ? 'step' : undefined}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg p-2 text-start text-sm transition-colors max-lg:flex-col max-lg:gap-1.5 max-lg:text-center',
                    active ? 'font-medium text-fd-foreground' : 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-7 shrink-0 place-items-center rounded-md border text-xs font-semibold tabular',
                      active && 'border-transparent bg-brand text-brand-ink',
                      done && 'border-fd-primary/40 text-fd-primary',
                    )}
                  >
                    {done ? <Check className="size-3.5" aria-label="Done" /> : i + 1}
                  </span>
                  <span className="max-lg:text-xs lg:hidden">{step.short}</span>
                  <span className="max-lg:hidden">{step.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-fd-secondary" aria-hidden>
          <div
            className="h-full rounded-full bg-fd-primary transition-[width] duration-300 ease-out"
            style={{ width: `${((index + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-fd-muted-foreground tabular" aria-live="polite">
          Step {index + 1} of {steps.length} · about {minutesLeft} min left
        </p>
      </nav>

      <div ref={contentRef} className="min-w-0 scroll-mt-20">
        {steps.map((step, i) => (
          <section key={step.label} id={`step-${i + 1}`} hidden={i !== index} aria-labelledby={`step-${i + 1}-title`}>
            <h2
              id={`step-${i + 1}-title`}
              ref={(node) => {
                headings.current[i] = node;
              }}
              tabIndex={-1}
              className="display-md max-w-[20ch] outline-none"
            >
              <span className="me-3 text-fd-primary tabular">{i + 1}</span>
              {step.title}
            </h2>
            <p className="lede mt-5 max-w-[40rem]">{step.lede}</p>
            <div className="mt-10 max-w-[46rem] space-y-6">{step.body}</div>
            <div className="mt-12 flex max-w-[46rem] flex-wrap items-center justify-between gap-3 border-t pt-6">
              {i === 0 ? (
                <Link href="/download" className="btn btn-quiet">
                  <ArrowLeft aria-hidden />
                  Download
                </Link>
              ) : (
                <button type="button" onClick={() => go(i - 1)} className="btn btn-quiet">
                  <ArrowLeft aria-hidden />
                  {steps[i - 1].label}
                </button>
              )}
              {i < steps.length - 1 ? (
                <button type="button" onClick={() => go(i + 1)} className="btn btn-primary">
                  Next: {steps[i + 1].label}
                  <ArrowRight aria-hidden />
                </button>
              ) : (
                <Link href="/docs" className="btn btn-primary">
                  Open the documentation
                  <ArrowRight aria-hidden />
                </Link>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
