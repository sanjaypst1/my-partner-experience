import { sections } from '@/data/portfolio';
import { cn } from '@/lib/cn';

/**
 * Progress is shown three ways at once — a labelled step count, a percentage on the
 * progress bar's aria value, and segment fills — so it never relies on colour alone.
 */
export function WalkthroughProgress({
  index,
  total,
  className,
}: {
  index: number;
  total: number;
  className?: string;
}) {
  const percent = Math.round(((index + 1) / total) * 100);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`Section ${index + 1} of ${total}, ${percent}% complete`}
        aria-label="Walkthrough progress"
        className="flex h-1.5 flex-1 gap-0.5 overflow-hidden rounded-full"
      >
        {sections.map((section, sectionIndex) => (
          <span
            key={section.id}
            className={cn(
              'h-full flex-1 rounded-full transition-colors duration-500',
              sectionIndex < index
                ? 'bg-signal-cyan/70'
                : sectionIndex === index
                  ? 'bg-signal-cyan'
                  : 'bg-white/12',
            )}
          />
        ))}
      </div>
      <span className="shrink-0 font-mono text-[0.72rem] text-slateMuted-300">
        {index + 1}/{total}
      </span>
    </div>
  );
}
