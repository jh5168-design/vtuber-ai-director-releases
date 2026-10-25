import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import { BrandMark } from '@/components/brand-mark';
import { appName } from './shared';
import { release } from './release';

export const navLinks: LinkItemType[] = [
  { text: 'Docs', url: '/docs', active: 'nested-url' },
  { text: 'Setup guide', url: '/onboarding' },
  { text: 'Download', url: '/download' },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <BrandMark className="size-7 shrink-0" />
          <span className="text-[0.9375rem] tracking-[-0.01em]">{appName}</span>
        </>
      ),
    },
    githubUrl: release.repoUrl,
    links: navLinks,
  };
}
