/** Input-level meter: the page's one moving element, standing in for "the director is listening". */
export function SignalMeter() {
  return (
    <span className="flex h-8 w-8 items-end justify-center gap-[3px] rounded-lg bg-fd-primary/12 pb-2" aria-hidden>
      {[0.9, 0.55, 1, 0.7].map((peak, i) => (
        <span
          key={i}
          className="signal-bar w-[3px] origin-bottom rounded-full bg-fd-primary"
          style={{ height: `${peak * 16}px`, animationDelay: `${i * -0.35}s` }}
        />
      ))}
    </span>
  );
}
