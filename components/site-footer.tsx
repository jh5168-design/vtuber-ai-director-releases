import Link from 'next/link';
import { BrandMark } from '@/components/brand-mark';
import { appName } from '@/lib/shared';
import { release } from '@/lib/release';

const groups = [
  {
    title: 'Product',
    links: [
      { text: 'Download', href: '/download' },
      { text: 'Setup guide', href: '/onboarding' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { text: 'Documentation', href: '/docs' },
      { text: 'Releases on GitHub', href: release.repoUrl, external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="shell grid gap-10 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 md:py-14">
        <div className="max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2.5 font-semibold">
            <BrandMark className="size-7 shrink-0" />
            {appName}
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-fd-muted-foreground">
            An experimental, local-first director for character-driven VTuber chatting streams.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-8 text-sm">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="font-semibold">{group.title}</p>
              <ul className="mt-3 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                      >
                        {link.text}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                      >
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="shell">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t py-6 text-[0.8125rem] text-fd-muted-foreground">
          <p>
            © {new Date().getFullYear()} {appName}
          </p>
          <p>Public binaries · Private source</p>
        </div>
      </div>
    </footer>
  );
}
