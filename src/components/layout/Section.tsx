import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import type { SectionId } from '@/types/portfolio';

/**
 * The one section wrapper. Guarantees a landmark, a single h2 tied to it via
 * aria-labelledby, an anchor target for navigation, and scroll-reveal for children
 * marked `data-animate="pending"`.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  contentClassName,
  headingLevel = 'h2',
  aside,
}: {
  id: SectionId;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  headingLevel?: 'h1' | 'h2';
  aside?: ReactNode;
}) {
  const containerRef = useRevealOnScroll<HTMLDivElement>();
  const headingId = `${id}-heading`;
  const Heading = headingLevel;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('relative scroll-mt-28 py-20 sm:py-24 lg:py-28', className)}
    >
      <div ref={containerRef} className="shell">
        {/* A plain div, not <header>: nested headers are announced as extra banner
            landmarks by some assistive tech, which buries the real page banner. */}
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="eyebrow" data-animate="pending">
              {eyebrow}
            </p>
          ) : null}
          <Heading
            id={headingId}
            className={cn('mt-3 text-fluid-h2', headingLevel === 'h1' && 'text-fluid-hero')}
            data-animate="pending"
          >
            {title}
          </Heading>
          {lead ? (
            <div className="prose-readable mt-5" data-animate="pending">
              {lead}
            </div>
          ) : null}
          {aside}
        </div>
        <div className={cn('mt-12', contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
