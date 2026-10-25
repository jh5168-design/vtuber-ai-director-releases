import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Download, Minus, TriangleAlert } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { PlatformBadge } from '@/components/platform-badge';
import { release } from '@/lib/release';

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download VTuber AI Director for macOS on Apple silicon. The Windows installer is coming next.',
};

const installSteps = [
  {
    title: 'Install the app',
    body: 'Open the DMG, drag the app into Applications, and open it once. Preview builds need one extra step the first time.',
    href: '/docs/installation',
    guide: 'Installation guide',
  },
  {
    title: 'Connect a model',
    body: 'Run LM Studio or Ollama on your computer, or use a cloud provider. Then test and save the connection in Settings.',
    href: '/docs/model-service',
    guide: 'Model service guide',
  },
  {
    title: 'Set up speech recognition',
    body: 'Download a Whisper model once, allow the microphone, and run the five-second input test.',
    href: '/docs/speech-recognition',
    guide: 'Speech recognition guide',
  },
];

const contents = [
  { item: 'Desktop interface and local backend', included: true, note: 'Packaged together' },
  { item: 'Whisper model weights', included: false, note: 'Downloaded on first use' },
  { item: 'Model API credentials', included: false, note: 'Entered on your computer' },
  { item: 'Characters and memories', included: false, note: 'Created on your computer' },
  { item: 'Code signing and notarization', included: false, note: 'Preview limitation' },
  { item: 'Automatic updates', included: false, note: 'Install new releases manually' },
];

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm">
      <dt className="text-fd-muted-foreground">{label}</dt>
      <dd className="text-end font-medium">{value}</dd>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <>
      <PageHero
        title="Take the director to your desktop."
        lede="The installer packages the interface and a private local backend. No hosted account or shared database is required."
        meta={[`Version ${release.version}`, 'Preview build', 'No account required']}
      />

      <section className="shell py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="flex flex-col rounded-2xl border bg-fd-card p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-fd-primary">
                <span className="size-2 rounded-full bg-fd-primary" aria-hidden />
                Available
              </span>
              <PlatformBadge platform="mac" />
            </div>
            <h2 className="display-sm mt-8">macOS</h2>
            <p className="mt-3 text-fd-muted-foreground">
              For Macs with Apple silicon. Built natively and attached to every tagged release.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={release.mac.dmgUrl} className="btn btn-primary">
                <Download aria-hidden />
                Download .dmg
                <span className="tabular font-normal opacity-70">{release.mac.dmgSize}</span>
              </a>
              <a href={release.mac.zipUrl} className="btn">
                .zip
                <span className="tabular font-normal text-fd-muted-foreground">{release.mac.zipSize}</span>
              </a>
            </div>
            <dl className="mt-8 divide-y border-y">
              <Spec label="Requires" value="Apple silicon (arm64)" />
              <Spec label="Formats" value="DMG, ZIP" />
              <Spec label="Version" value={release.version} />
            </dl>
            <div className="mt-6 flex gap-3 text-sm leading-relaxed text-fd-muted-foreground">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-caution" aria-hidden />
              <p>
                Preview builds are not notarized, so macOS may block the first launch.{' '}
                <Link href="/docs/troubleshooting#macos-blocks-the-first-launch" className="font-medium text-fd-foreground underline">
                  How to open it
                </Link>
              </p>
            </div>
            <p className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm">
              <a href={release.latestUrl} className="inline-flex items-center gap-1 font-medium hover:underline">
                Release notes
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
              <a href={release.checksumsUrl} className="inline-flex items-center gap-1 font-medium hover:underline">
                SHA-256 checksums
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </p>
          </article>

          <article className="flex flex-col rounded-2xl border border-dashed p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-caution">
                <span className="size-2 rounded-full bg-caution" aria-hidden />
                Not yet available
              </span>
              <PlatformBadge platform="windows" />
            </div>
            <h2 className="display-sm mt-8">Windows</h2>
            <p className="mt-3 text-fd-muted-foreground">
              The x64 installer must be built natively on a Windows runner. It will be attached to the public release
              once that build completes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="btn" aria-disabled="true">
                Windows x64 coming next
              </span>
              <a href={release.latestUrl} className="btn btn-quiet">
                Watch releases
                <ArrowUpRight aria-hidden />
              </a>
            </div>
            <dl className="mt-8 divide-y border-y">
              <Spec label="Architecture" value="x64" />
              <Spec label="Format" value="NSIS installer (.exe)" />
              <Spec label="Signing" value="Unsigned preview" />
            </dl>
            <div className="mt-6 flex gap-3 text-sm leading-relaxed text-fd-muted-foreground">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-caution" aria-hidden />
              <p>
                Windows builds will be unsigned, so SmartScreen may warn before installation. Runtime behavior can only
                be confirmed on Windows itself.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t">
        <div className="shell py-20 md:py-28">
          <div className="max-w-2xl">
            <h2 className="display-md">From download to first rehearsal.</h2>
            <p className="lede mt-6">
              Install the app, connect a model, then set up speech recognition before you rehearse. Each step has a full
              guide in the docs.
            </p>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
            {installSteps.map((step, i) => (
              <li key={step.title} className="border-t pt-6">
                <h3 className="flex items-baseline gap-3 text-lg font-semibold">
                  <span className="tabular font-display text-2xl text-fd-primary">{i + 1}</span>
                  {step.title}
                </h3>
                <p className="mt-3 text-fd-muted-foreground">{step.body}</p>
                <Link
                  href={step.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fd-primary hover:underline"
                >
                  {step.guide}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/onboarding" className="btn mt-12">
            Continue with the setup guide
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </section>

      <section className="border-t">
        <div className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h2 className="display-md">Know what ships.</h2>
            <p className="lede mt-6 max-w-[30rem]">
              The installer includes the desktop app, the production interface, and a frozen Python backend. Models,
              secrets, and your local database are never bundled.
            </p>
            <Link
              href="/docs/troubleshooting"
              className="mt-8 inline-flex items-center gap-1.5 font-medium text-fd-primary hover:underline"
            >
              Installation troubleshooting
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-[0.9375rem]">
              <thead>
                <tr className="border-b text-left text-sm text-fd-muted-foreground">
                  <th scope="col" className="py-3 pe-4 font-medium">Component</th>
                  <th scope="col" className="px-4 py-3 font-medium">In the installer</th>
                  <th scope="col" className="py-3 ps-4 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((row) => (
                  <tr key={row.item} className="border-b">
                    <th scope="row" className="py-3.5 pe-4 text-left font-medium">{row.item}</th>
                    <td className="px-4 py-3.5">
                      {row.included ? (
                        <span className="inline-flex items-center gap-1.5 text-fd-primary">
                          <Check className="size-4" aria-hidden />
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-fd-muted-foreground">
                          <Minus className="size-4" aria-hidden />
                          No
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 ps-4 text-fd-muted-foreground">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
