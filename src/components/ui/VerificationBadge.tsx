import { CircleCheck, CircleDashed } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Says out loud whether something is evidenced. Used next to metrics and case-study
 * facts so a reader never has to guess which numbers are confirmed.
 */
export function VerificationBadge({
  verified,
  label,
  className,
}: {
  verified: boolean;
  label?: string;
  className?: string;
}) {
  // Kept short so it complements, rather than repeats, the "Evidence being validated"
  // line that the metric card itself shows.
  const text = label ?? (verified ? 'Verified' : 'Unverified');
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.16em]',
        verified
          ? 'border-signal-cyan/50 bg-signal-cyan/10 text-signal-cyan'
          : 'border-slateMuted-500/60 bg-slateMuted-100/[0.03] text-slateMuted-300',
        className,
      )}
    >
      {verified ? (
        <CircleCheck aria-hidden="true" className="h-3.5 w-3.5" />
      ) : (
        <CircleDashed aria-hidden="true" className="h-3.5 w-3.5" />
      )}
      {text}
    </span>
  );
}
