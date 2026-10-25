'use client';
import { useEffect, useState } from 'react';

type Platform = 'mac' | 'windows';

function detect(): Platform | null {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) return 'mac';
  if (ua.includes('win')) return 'windows';
  return null;
}

/** Marks the card that matches the visitor's operating system. Renders nothing until mounted. */
export function PlatformBadge({ platform }: { platform: Platform }) {
  const [current, setCurrent] = useState<Platform | null>(null);

  useEffect(() => setCurrent(detect()), []);

  if (current !== platform) return null;
  return (
    <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-fd-muted-foreground">
      Your platform
    </span>
  );
}
