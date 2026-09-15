import { CircleCheck, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/cn';
import { scalingPatterns } from '@/data/portfolio';

/**
 * Three ways to scale a program, two of which fail. The judgement is stated in words
 * and with an icon, never by colour alone.
 */
export function ScalingComparison() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {scalingPatterns.map((pattern) => {
        const isGood = pattern.verdict === 'good';
        return (
          <li
            key={pattern.id}
            data-animate="pending"
            className={cn(
              'flex h-full flex-col rounded-xl2 border p-5',
              isGood
                ? 'border-signal-cyan/45 bg-signal-cyan/[0.06] shadow-glow'
                : 'border-slateMuted-100/12 bg-slateMuted-100/[0.025]',
            )}
          >
            <p
              className={cn(
                'inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em]',
                isGood ? 'text-signal-cyan' : 'text-signal-amber',
              )}
            >
              {isGood ? (
                <CircleCheck aria-hidden="true" className="h-4 w-4" />
              ) : (
                <TriangleAlert aria-hidden="true" className="h-4 w-4" />
              )}
              {isGood ? 'Good scaling' : 'Bad scaling'}
            </p>
            <h3 className="mt-3 text-fluid-h3">{pattern.label}</h3>
            <p className="mt-2 text-[0.88rem] text-slateMuted-200">{pattern.approach}</p>
            <p className="mt-4 border-t border-slateMuted-100/10 pt-4 text-[0.86rem] leading-relaxed text-slateMuted-300">
              {pattern.consequence}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
