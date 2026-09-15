import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Tag } from '@/components/ui/Badge';
import type { ChallengeResolution } from '@/types/portfolio';

/** Problem on top, program-management response underneath. Same shape for all twelve. */
export function ChallengeResolutionCard({
  challenge,
  expanded,
  onToggle,
}: {
  challenge: ChallengeResolution;
  expanded: boolean;
  onToggle: () => void;
}) {
  const panelId = `challenge-panel-${challenge.id}`;
  const buttonId = `challenge-button-${challenge.id}`;

  return (
    <div
      className={cn(
        'h-full rounded-xl2 border transition-colors duration-300',
        expanded ? 'border-signal-cyan/40 bg-signal-cyan/[0.05]' : 'border-white/12 bg-white/[0.025]',
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start gap-3 p-4 text-left"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/20 font-mono text-[0.68rem] text-slateMuted-300"
          >
            {challenge.number}
          </span>
          <span className="flex-1">
            <span className="block text-[0.95rem] font-semibold text-slateMuted-100">
              {challenge.title}
            </span>
            <span className="mt-1 block text-[0.84rem] leading-relaxed text-slateMuted-300">
              {challenge.problem}
            </span>
          </span>
        </button>
      </h3>

      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded} data-print="block">
        <div className="border-t border-white/10 p-4">
          <p className="flex items-start gap-2 text-[0.7rem] font-mono uppercase tracking-[0.16em] text-signal-cyan">
            <ArrowRight aria-hidden="true" className="mt-0.5 h-3.5 w-3.5" />
            How I would respond
          </p>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-slateMuted-200">{challenge.response}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {challenge.drawsOn ? (
              <span className="text-[0.76rem] text-slateMuted-400">
                Draws on: <span className="text-slateMuted-200">{challenge.drawsOn}</span>
              </span>
            ) : null}
            {challenge.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
