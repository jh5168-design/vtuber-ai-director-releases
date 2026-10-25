import type { ReactNode } from 'react';

/** Title block for the secondary marketing pages (download, setup guide). */
export function PageHero({
  title,
  lede,
  meta,
}: {
  title: ReactNode;
  lede: ReactNode;
  meta?: ReactNode[];
}) {
  return (
    <header className="border-b">
      <div className="shell pt-16 pb-14 md:pt-24 md:pb-20">
        <h1 className="display-lg max-w-[13ch]">{title}</h1>
        <p className="lede mt-6 max-w-[38rem]">{lede}</p>
        {meta?.length ? (
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fd-muted-foreground">
            {meta.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 before:size-1 before:rounded-full before:bg-fd-primary"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </header>
  );
}
