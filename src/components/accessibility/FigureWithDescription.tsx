import { useId } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Wraps every diagram and chart on the site. The visual is marked decorative and the
 * meaning is carried by `description` (always announced) plus an optional data table,
 * so nothing is conveyed by shape or colour alone.
 */
export function FigureWithDescription({
  title,
  description,
  children,
  dataTable,
  className,
  visibleCaption = false,
  fill = false,
}: {
  title: string;
  description: string;
  children: ReactNode;
  dataTable?: ReactNode;
  className?: string;
  visibleCaption?: boolean;
  /**
   * Stretch the figure to fill a positioned parent (the hero uses this). Set through a
   * prop rather than a `className`, because passing `absolute` alongside the default
   * `relative` loses to Tailwind's output order and silently collapses the figure.
   */
  fill?: boolean;
}) {
  const descriptionId = useId();

  return (
    <figure
      className={cn(fill ? 'absolute inset-0' : 'relative', className)}
      role="group"
      aria-describedby={descriptionId}
    >
      <div aria-hidden="true" className={fill ? 'h-full w-full' : undefined}>
        {children}
      </div>
      <figcaption
        id={descriptionId}
        className={visibleCaption ? 'mt-3 text-[0.85rem] text-slateMuted-400' : 'sr-only'}
      >
        <span className="font-semibold">{title}. </span>
        {description}
      </figcaption>
      {dataTable ? <div className="sr-only">{dataTable}</div> : null}
    </figure>
  );
}
