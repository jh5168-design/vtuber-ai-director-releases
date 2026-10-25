'use client';
import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';

export function CopyButton({
  value,
  label = 'Copy',
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const timer = window.setTimeout(() => setState('idle'), 1600);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setState('copied');
        } catch {
          setState('failed');
        }
      }}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground',
        className,
      )}
    >
      {state === 'copied' ? <Check className="size-3.5 text-fd-primary" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite">{state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : label}</span>
    </button>
  );
}
