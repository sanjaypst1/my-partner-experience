import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { accent } from '@/lib/accents';
import { ScrollTrigger, getGsap } from '@/lib/gsap';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import type { AccentKey } from '@/types/portfolio';

export interface ChainItem {
  id: string;
  label: string;
  detail: string;
  meta?: string;
}

/**
 * A chain of stages that lights up as the reader scrolls — the "signal travelling
 * through the system" motif used for the partner journey and the benefits chain.
 *
 * With motion disabled every stage renders active from the start, so no information
 * depends on the animation running.
 */
export function SignalChain({
  items,
  accentKey = 'cyan',
  metaLabel,
  className,
}: {
  items: ChainItem[];
  accentKey?: AccentKey;
  metaLabel?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLOListElement | null>(null);
  const { motionEnabled } = useMotionPreference();
  const tokens = accent(accentKey);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const nodes = Array.from(container.querySelectorAll<HTMLElement>('[data-chain-node]'));

    const setAll = (state: 'active' | 'idle') =>
      nodes.forEach((node) => node.setAttribute('data-state', state));

    if (!motionEnabled) {
      setAll('active');
      return;
    }

    setAll('idle');
    const gsap = getGsap();
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        end: 'bottom 55%',
        scrub: true,
        onUpdate: (self) => {
          const reached = Math.round(self.progress * nodes.length);
          nodes.forEach((node, nodeIndex) => {
            node.setAttribute('data-state', nodeIndex < reached ? 'active' : 'idle');
          });
        },
        // Leaving the range downwards should leave the whole chain lit, not dark.
        onLeave: () => setAll('active'),
      });
    }, container);

    return () => context.revert();
  }, [motionEnabled, items.length]);

  return (
    <ol ref={containerRef} className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {items.map((item, itemIndex) => (
        <li
          key={item.id}
          data-chain-node
          data-state="active"
          className={cn(
            'group relative flex h-full flex-col gap-2 rounded-xl2 border p-4 transition-[border-color,background,opacity] duration-500 ease-expressive',
            'border-slateMuted-100/10 bg-slateMuted-100/[0.03] opacity-60 data-[state=active]:opacity-100',
            tokens.activeBorder,
          )}
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={cn(
                'grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-[0.68rem]',
                tokens.border,
                tokens.text,
              )}
            >
              {itemIndex + 1}
            </span>
            <h3 className="text-[0.95rem] font-semibold text-slateMuted-100">{item.label}</h3>
          </div>
          <p className="text-[0.85rem] leading-relaxed text-slateMuted-300">{item.detail}</p>
          {item.meta ? (
            <p className="mt-auto pt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-slateMuted-500">
              {metaLabel ? `${metaLabel}: ` : ''}
              {item.meta}
            </p>
          ) : null}
          {itemIndex < items.length - 1 ? (
            <span
              aria-hidden="true"
              className={cn(
                'absolute -right-3 top-1/2 hidden h-px w-3 lg:block',
                'bg-gradient-to-r from-white/25 to-transparent',
              )}
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
