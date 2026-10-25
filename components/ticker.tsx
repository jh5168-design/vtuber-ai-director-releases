const items = [
  'Speech-aware teleprompter',
  'Character memory',
  'Bilibili Open Live',
  'Live rehearsal',
  'Local Whisper',
];

// Each half must be wider than the widest viewport so the loop never shows a gap.
const half = [...items, ...items, ...items];

/** Broadcast-style crawl of the product's capabilities. Decorative: the same facts appear in the page below. */
export function Ticker() {
  return (
    <div className="ticker overflow-hidden border-b bg-fd-card" aria-hidden>
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {half.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-10 py-4 ps-10 font-display text-[1.0625rem] font-semibold tracking-[0.06em] text-fd-muted-foreground uppercase"
              >
                <span className="size-1.5 rounded-full bg-fd-primary" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
