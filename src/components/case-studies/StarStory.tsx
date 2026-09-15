import { useState } from 'react';
import { cn } from '@/lib/cn';
import { accent } from '@/lib/accents';
import type { AccentKey, CaseStudy } from '@/types/portfolio';

type PanelId = 'situation' | 'task' | 'action' | 'challenges' | 'resolution' | 'outputs';

const panelLabels: Record<PanelId, string> = {
  situation: 'Situation',
  task: 'Task',
  action: 'Action',
  challenges: 'Challenges',
  resolution: 'Resolution',
  outputs: 'Reusable outputs',
};

/**
 * STAR in a tab set rather than six stacked walls of text — a hiring manager can read
 * the situation, then choose depth. All panels stay in the DOM for printing and search.
 */
export function StarStory({
  study,
  accentKey,
}: {
  study: CaseStudy;
  accentKey: AccentKey;
}) {
  const [activePanel, setActivePanel] = useState<PanelId>('situation');
  const tokens = accent(accentKey);
  const panels: PanelId[] = ['situation', 'task', 'action', 'challenges', 'resolution', 'outputs'];

  const listFor = (panel: PanelId): string[] => {
    switch (panel) {
      case 'action':
        return study.actions;
      case 'challenges':
        return study.challenges;
      case 'resolution':
        return study.resolutions;
      case 'outputs':
        return study.reusableOutputs;
      default:
        return [];
    }
  };

  return (
    <div className="glass overflow-hidden">
      <div
        role="tablist"
        aria-label={`${study.employer} case study detail`}
        className="flex flex-wrap gap-1 border-b border-white/10 p-2"
        data-print="hide"
      >
        {panels.map((panel) => {
          const isActive = panel === activePanel;
          return (
            <button
              key={panel}
              role="tab"
              type="button"
              id={`${study.id}-tab-${panel}`}
              aria-selected={isActive}
              aria-controls={`${study.id}-panel-${panel}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActivePanel(panel)}
              onKeyDown={(event) => {
                const currentIndex = panels.indexOf(activePanel);
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  setActivePanel(panels[(currentIndex + 1) % panels.length]);
                } else if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  setActivePanel(panels[(currentIndex - 1 + panels.length) % panels.length]);
                }
              }}
              className={cn(
                'touch-target rounded-full px-3.5 py-2 text-[0.82rem] transition-colors',
                isActive
                  ? cn('bg-white/10 font-semibold text-slateMuted-100', tokens.text)
                  : 'text-slateMuted-300 hover:bg-white/[0.06] hover:text-slateMuted-100',
              )}
            >
              {panelLabels[panel]}
            </button>
          );
        })}
      </div>

      {panels.map((panel) => {
        const isActive = panel === activePanel;
        const items = listFor(panel);
        return (
          <div
            key={panel}
            role="tabpanel"
            id={`${study.id}-panel-${panel}`}
            aria-labelledby={`${study.id}-tab-${panel}`}
            hidden={!isActive}
            data-print="block"
            className="p-5 sm:p-6"
          >
            <h4 className={cn('eyebrow', tokens.text)}>{panelLabels[panel]}</h4>
            {panel === 'situation' ? (
              <p className="prose-readable mt-3">{study.situation}</p>
            ) : null}
            {panel === 'task' ? <p className="prose-readable mt-3">{study.task}</p> : null}
            {items.length > 0 ? (
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-slateMuted-200">
                    <span
                      aria-hidden="true"
                      className={cn('mt-2 h-1.5 w-1.5 shrink-0 rounded-full', tokens.bgSolid)}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
