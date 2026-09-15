import { FlaskConical } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { HYPOTHETICAL_LABEL } from '@/data/pax8Alignment';

/**
 * Wraps every piece of forward-looking Pax8 content. The label is part of the
 * component, not a prop, so a hypothetical block cannot be rendered without it.
 */
export function HypotheticalFrame({
  children,
  className,
  note,
}: {
  children: ReactNode;
  className?: string;
  note?: string;
}) {
  return (
    <div
      data-testid="hypothetical-frame"
      className={cn(
        'relative rounded-xl3 border border-dashed border-signal-violet/45 bg-signal-violet/[0.05] p-5 sm:p-7',
        className,
      )}
    >
      <p className="inline-flex items-start gap-2 rounded-full border border-signal-violet/50 bg-midnight-900/80 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-signal-violet">
        <FlaskConical aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        {HYPOTHETICAL_LABEL}
      </p>
      {note ? <p className="mt-3 text-[0.82rem] text-slateMuted-400">{note}</p> : null}
      <div className="mt-5">{children}</div>
    </div>
  );
}
