import type { SVGProps } from 'react';

/** Clapperboard-and-script mark: the director (clapper) over the teleprompter (script lines). */
export function BrandMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="9" className="fill-brand" />
      <g
        fill="none"
        stroke="var(--color-brand-ink)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.2 10.6 22.6 7.6" strokeWidth="2.2" />
        <rect x="8" y="13" width="16" height="11" rx="2.2" strokeWidth="2" />
        <path d="M11.6 17.4h8.8M11.6 20.4h5.4" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
