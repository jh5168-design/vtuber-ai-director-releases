import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, navLinks } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      // The sidebar already is the docs; keep only the other destinations.
      links={navLinks.filter((link) => !('url' in link) || link.url !== '/docs')}
      tabs={false}
    >
      {children}
    </DocsLayout>
  );
}
