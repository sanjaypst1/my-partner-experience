import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/cn';
import { confidentialityNotice } from '@/data/portfolio';

export function ConfidentialityNotice({
  className,
  variant = 'inline',
}: {
  className?: string;
  variant?: 'inline' | 'card';
}) {
  if (variant === 'card') {
    return (
      <aside
        aria-label="Confidentiality note"
        className={cn('glass flex gap-3 p-4 text-[0.85rem] text-slateMuted-300', className)}
      >
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-signal-cyan" />
        <p>{confidentialityNotice}</p>
      </aside>
    );
  }

  return (
    <p
      className={cn('flex items-start gap-2 text-[0.8rem] leading-relaxed text-slateMuted-400', className)}
    >
      <ShieldCheck aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>{confidentialityNotice}</span>
    </p>
  );
}
