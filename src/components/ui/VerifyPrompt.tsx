import { PenLine } from 'lucide-react';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/data/portfolio';
import type { Verifiable } from '@/types/portfolio';

/**
 * Renders an editable placeholder from the data file — but only in review mode.
 * With `showUnverifiedPlaceholders: false` it returns null, so production output
 * contains no bracketed prompts at all.
 */
export function VerifyPrompt({
  token,
  className,
  srPrefix = 'Detail to verify before sharing:',
}: {
  token: string;
  className?: string;
  srPrefix?: string;
}) {
  if (!siteConfig.showUnverifiedPlaceholders) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-dashed border-signal-amber/50 bg-signal-amber/[0.07] px-2 py-0.5 font-mono text-[0.72rem] text-signal-amber',
        className,
      )}
      data-testid="verify-prompt"
    >
      <PenLine aria-hidden="true" className="h-3 w-3" />
      <span className="sr-only">{srPrefix} </span>
      {token}
    </span>
  );
}

/**
 * Displays a `Verifiable` field: the real value once confirmed, otherwise the
 * editable prompt (review mode) or nothing at all (production mode).
 */
export function VerifiableText({
  field,
  className,
}: {
  field: Verifiable;
  className?: string;
}) {
  if (field.verified && field.value) {
    return <span className={className}>{field.value}</span>;
  }
  return <VerifyPrompt token={field.placeholder} className={className} />;
}
