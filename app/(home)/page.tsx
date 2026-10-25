import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, AudioLines, Check, Plug, Repeat2, ShieldCheck } from 'lucide-react';
import { SignalMeter } from '@/components/signal-meter';
import { Ticker } from '@/components/ticker';

const loop = [
  {
    verb: 'Listen',
    body: 'Local speech recognition tells reading apart from paraphrasing, improvising, questions, topic changes, singing, and silence.',
  },
  {
    verb: 'Decide',
    body: 'Audience activity, character rules, memories, recent topics, and your session instructions shape the director’s next move.',
  },
  {
    verb: 'Prepare',
    body: 'Upcoming lines are buffered ahead of your reading speed. New signals rewrite future lines and never touch the words already on screen.',
  },
];

const features = [
  {
    name: 'Character Studio',
    pitch: 'Give the director a point of view.',
    body: 'Define identity, worldview, speaking rhythm, humor, hard boundaries, and example dialogue. Everything the director writes stays scoped to the character you select.',
    points: [
      'Memories and viewer profiles isolated per character',
      'Explicit behavioral boundaries',
      'Reusable profiles for different channels',
    ],
    image: '/assets/app-character-studio.jpg',
    alt: 'Character Studio, showing a character profile with identity, speaking tone, and boundary fields',
  },
  {
    name: 'Live Rehearsal',
    pitch: 'Pressure-test the show before the show.',
    body: 'Rehearse with simulated audience activity and your real microphone. It is the same director you go live with, and rehearsal memories stay in their own sandbox.',
    points: [
      'Audience activity from none to high, or a custom interval',
      'Chinese, Japanese, and English recognition',
      'Separate rehearsal memory',
    ],
    image: '/assets/app-rehearsal.jpg',
    alt: 'Live Rehearsal setup, with character, instructions, and simulated audience activity controls',
  },
  {
    name: 'Pre-Stream Setup',
    pitch: 'Brief the session in plain language.',
    body: 'Describe the format, energy, restrictions, and interaction style. The app turns your note into a director policy you can review before you start.',
    points: [
      'Optional TXT or Markdown manuscript',
      'Bilibili Open Live identity-code connection',
      'Microphone and recognition test before going live',
    ],
    image: '/assets/app-prestream.jpg',
    alt: 'Pre-Stream Setup, with session instructions and the interpreted director policy',
  },
];

const local = [
  {
    Icon: ShieldCheck,
    title: 'Loopback backend',
    body: 'A private, authenticated process that listens only on 127.0.0.1.',
  },
  {
    Icon: AudioLines,
    title: 'On-device speech',
    body: 'Local Whisper transcribes your microphone without a browser vendor in the loop.',
  },
  {
    Icon: Plug,
    title: 'Bring your model',
    body: 'LM Studio, Ollama, or any other OpenAI-compatible provider.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden border-b">
        <div className="shell grid items-center gap-14 pt-14 pb-14 md:pt-20 md:pb-20 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14 lg:pt-24 lg:pb-28">
          <div className="max-w-xl">
            <h1 className="display-xl">
              Your stream.
              <span className="block text-fd-muted-foreground">Never quiet.</span>
            </h1>
            <p className="lede mt-7 max-w-[33rem]">
              A local-first AI director that listens to your performance, tracks your script, reads the room, and
              prepares what comes next, without taking over your voice.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Download the app
                <ArrowRight aria-hidden />
              </Link>
              <Link href="/onboarding" className="btn">
                Follow the 8-minute setup
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fd-muted-foreground">
              {['Runs on your computer', 'Any OpenAI-compatible model', 'macOS now, Windows next'].map((fact) => (
                <li key={fact} className="flex items-center gap-2 before:size-1 before:rounded-full before:bg-fd-primary">
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative min-w-0 [perspective:1600px]">
            <div
              className="absolute inset-x-[15%] -bottom-[12%] -z-10 h-[34%] rounded-full bg-brand opacity-[0.16] blur-[80px] dark:opacity-[0.12]"
              aria-hidden
            />
            {/* The app itself is dark-only, so its window stays dark in both themes. */}
            <div className="stage-window dark overflow-hidden rounded-2xl border bg-fd-card text-fd-foreground shadow-stage">
              <div className="flex h-9 items-center gap-1.5 border-b px-3.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-fd-foreground/15" />
                <span className="size-2.5 rounded-full bg-fd-foreground/15" />
                <span className="size-2.5 rounded-full bg-fd-foreground/15" />
                <span className="ms-auto text-xs text-fd-muted-foreground">Pre-Stream Setup</span>
              </div>
              <Image
                src="/assets/app-overview.png"
                alt="VTuber AI Director’s Pre-Stream Setup: character, session instructions, and speech input checks"
                width={2880}
                height={1834}
                priority
                sizes="(min-width: 1024px) 700px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div className="stage-card absolute -right-5 top-[16%] hidden items-center gap-3 rounded-xl border bg-fd-popover px-3.5 py-3 shadow-stage lg:flex">
              <SignalMeter />
              <div className="text-[0.8125rem] leading-snug">
                <p className="font-semibold">Listening locally</p>
                <p className="text-fd-muted-foreground">Chinese · Whisper</p>
              </div>
            </div>
            <div className="stage-card-alt absolute -left-7 bottom-[14%] hidden items-center gap-3 rounded-xl border bg-fd-popover px-3.5 py-3 shadow-stage lg:flex">
              <span className="grid size-8 place-items-center rounded-lg bg-signal/15 text-signal">
                <Repeat2 className="size-4" aria-hidden />
              </span>
              <div className="text-[0.8125rem] leading-snug">
                <p className="font-semibold tabular">75 s of lines ready</p>
                <p className="text-fd-muted-foreground">Director buffer healthy</p>
              </div>
            </div>
            <figcaption className="sr-only">
              Illustration: the app’s Pre-Stream Setup screen with example status indicators.
            </figcaption>
          </figure>
        </div>
      </section>

      <Ticker />

      <section className="shell py-24 md:py-32">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-14">
          <h2 className="display-md max-w-[15ch]">It follows your performance, not a timer.</h2>
          <p className="lede max-w-[36rem]">
            The director turns real speech and audience signals into an adaptive script buffer. You stay present on
            camera while it quietly handles the next beat.
          </p>
        </div>
        <ol className="mt-16 grid border-t md:grid-cols-3">
          {loop.map((step, i) => (
            <li
              key={step.verb}
              className="relative border-b py-9 last:border-b-0 md:border-e md:border-b-0 md:px-9 md:first:ps-0 md:last:border-e-0 md:last:pe-0"
            >
              <h3 className="display-sm flex items-center gap-3">
                {step.verb}
                {i < loop.length - 1 ? (
                  <ArrowRight className="size-5 text-fd-primary max-md:hidden" aria-hidden />
                ) : (
                  <Repeat2 className="size-5 text-fd-primary max-md:hidden" aria-label="then repeat" />
                )}
              </h3>
              <p className="mt-4 max-w-[30rem] text-fd-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t">
        <div className="shell py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="display-md">From persona to performance.</h2>
            <p className="lede mt-6">
              Plan the character, rehearse the room, then go live with the same director and a separate memory for
              each environment.
            </p>
          </div>

          <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
            {features.map((feature, i) => (
              <article
                key={feature.name}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
              >
                <figure className={i % 2 === 1 ? 'md:order-2' : undefined}>
                  <div className="overflow-hidden rounded-xl border bg-fd-card p-2">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      width={726}
                      height={853}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="aspect-[6/5] h-auto w-full rounded-lg object-cover object-top"
                    />
                  </div>
                </figure>
                <div>
                  <h3 className="display-sm">{feature.name}</h3>
                  <p className="mt-3 text-lg font-medium text-fd-foreground/90">{feature.pitch}</p>
                  <p className="mt-4 max-w-[34rem] text-fd-muted-foreground">{feature.body}</p>
                  <ul className="mt-7 divide-y border-y">
                    {feature.points.map((point) => (
                      <li key={point} className="flex gap-3 py-3 text-[0.9375rem]">
                        <Check className="mt-1 size-4 shrink-0 text-fd-primary" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="shell grid gap-12 py-24 md:py-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
          <div>
            <h2 className="display-md">Your show stays yours.</h2>
            <p className="lede mt-6 max-w-[36rem]">
              The desktop app binds its backend to your computer. Local Whisper processes microphone audio on-device,
              and the model connection is always your choice.
            </p>
            <Link
              href="/docs/privacy"
              className="mt-8 inline-flex items-center gap-1.5 font-medium text-fd-primary hover:underline"
            >
              How your data is handled
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <dl className="divide-y border-y">
            {local.map(({ Icon, title, body }) => (
              <div key={title} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 py-5">
                <Icon className="mt-0.5 size-5 text-fd-primary" aria-hidden />
                <div>
                  <dt className="font-semibold">{title}</dt>
                  <dd className="mt-1 text-fd-muted-foreground">{body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t">
        <div className="shell py-24 text-center md:py-32">
          <h2 className="display-lg mx-auto">
            <span className="block">Perform live.</span> <span className="block">Stay one beat ahead.</span>
          </h2>
          <p className="lede mx-auto mt-6 max-w-[32rem]">
            Download the desktop app, connect a model, and run your first rehearsal.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/download" className="btn btn-primary">
              Download the app
              <ArrowRight aria-hidden />
            </Link>
            <Link href="/docs" className="btn">
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
