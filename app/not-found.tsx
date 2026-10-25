import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <section className="shell flex flex-1 flex-col justify-center py-24 md:py-32">
        <p className="text-sm font-medium text-fd-muted-foreground tabular">404</p>
        <h1 className="display-lg mt-4 max-w-[14ch]">This page is not in the rundown.</h1>
        <p className="lede mt-6 max-w-[34rem]">
          The link may be out of date, or the page moved when the documentation was reorganized.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/docs" className="btn btn-primary">
            Browse the docs
          </Link>
          <Link href="/" className="btn">
            Go to the homepage
          </Link>
        </div>
      </section>
      <SiteFooter />
    </HomeLayout>
  );
}
