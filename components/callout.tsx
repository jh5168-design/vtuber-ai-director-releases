import type { CSSProperties, ReactNode } from 'react';
import { CircleCheck, Info, Lightbulb, OctagonAlert, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/cn';

type CalloutType = 'info' | 'warn' | 'warning' | 'error' | 'success' | 'idea';

const tone: Record<CalloutType, { color: string; Icon: typeof Info; label: string }> = {
  info: { color: 'var(--color-fd-primary)', Icon: Info, label: 'Note' },
  success: { color: 'var(--color-fd-primary)', Icon: CircleCheck, label: 'Success' },
  idea: { color: 'var(--color-signal)', Icon: Lightbulb, label: 'Tip' },
  warn: { color: 'var(--color-caution)', Icon: TriangleAlert, label: 'Warning' },
  warning: { color: 'var(--color-caution)', Icon: TriangleAlert, label: 'Warning' },
  error: { color: 'var(--color-fd-error)', Icon: OctagonAlert, label: 'Important' },
};

/** Tinted note with a drawn icon. Replaces the stock callout's coloured side bar. */
export function Callout({
  type = 'info',
  title,
  children,
  className,
}: {
  type?: CalloutType;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const { color, Icon, label } = tone[type];

  return (
    <aside
      role="note"
      aria-label={typeof title === 'string' ? title : label}
      style={{ '--callout': color } as CSSProperties}
      className={cn(
        'not-prose my-6 flex gap-3 rounded-xl border px-4 py-3.5 text-[0.9375rem] leading-relaxed',
        'border-[color-mix(in_oklab,var(--callout)_28%,transparent)] bg-[color-mix(in_oklab,var(--callout)_7%,var(--color-fd-background))]',
        className,
      )}
    >
      <Icon aria-hidden className="mt-0.5 size-[1.125rem] shrink-0 text-(--callout)" strokeWidth={2} />
      <div className="min-w-0 space-y-1 [&_a]:font-medium [&_a]:underline [&_a]:decoration-(--callout) [&_code]:rounded [&_code]:bg-fd-muted [&_code]:px-1 [&_code]:py-px [&_code]:font-mono [&_code]:text-[0.85em] [&_p]:m-0">
        {title ? <p className="font-semibold text-fd-foreground">{title}</p> : null}
        <div className="space-y-2 text-fd-foreground/80">{children}</div>
      </div>
    </aside>
  );
}
