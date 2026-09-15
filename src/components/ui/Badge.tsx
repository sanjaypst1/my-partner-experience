import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { accent } from '@/lib/accents';
import type { AccentKey } from '@/types/portfolio';

export function Badge({
  children,
  accentKey = 'cyan',
  icon,
  className,
}: {
  children: ReactNode;
  accentKey?: AccentKey;
  icon?: ReactNode;
  className?: string;
}) {
  const tokens = accent(accentKey);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em]',
        tokens.border,
        tokens.bg,
        tokens.text,
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-slateMuted-100/12 bg-slateMuted-100/[0.04] px-2.5 py-1 text-[0.75rem] text-slateMuted-300">
      {children}
    </span>
  );
}
