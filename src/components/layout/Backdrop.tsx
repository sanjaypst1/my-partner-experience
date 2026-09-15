/**
 * Fixed atmospheric background: gradient wash plus a faint grid. Pure decoration,
 * hidden from assistive technology and cheap enough not to affect scroll performance.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" data-print="hide">
      <div className="absolute inset-0 bg-midnight-950" />
      <div className="absolute inset-0 bg-ecosystem-radial opacity-80" />
      <div className="absolute inset-0 bg-grid-fine bg-grid-cell [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]" />
    </div>
  );
}
