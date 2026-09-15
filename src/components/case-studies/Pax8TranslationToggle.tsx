import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { pax8Translation } from '@/data/pax8Alignment';
import { HypotheticalFrame } from '@/components/storytelling/HypotheticalFrame';
import { FigureWithDescription } from '@/components/accessibility/FigureWithDescription';

type ModelKey = keyof typeof pax8Translation;

/**
 * Relabels the same four-node value chain from the generic channel model I have
 * worked in to its hypothetical Pax8 equivalent. The Pax8 view is always wrapped in
 * <HypotheticalFrame>, so the label travels with it.
 */
export function Pax8TranslationToggle() {
  const [model, setModel] = useState<ModelKey>('generic');
  const active = pax8Translation[model];

  const chain = (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {active.nodes.map((node, nodeIndex) => (
        <li key={node.id} className="relative flex h-full flex-col gap-1.5 rounded-xl2 border border-slateMuted-100/12 bg-slateMuted-100/[0.04] p-4">
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-slateMuted-500">
            Step {nodeIndex + 1}
          </span>
          <span className="text-[0.95rem] font-semibold text-slateMuted-100">{node.label}</span>
          <span className="text-[0.84rem] leading-relaxed text-slateMuted-300">{node.role}</span>
          {nodeIndex < active.nodes.length - 1 ? (
            <ArrowRight
              aria-hidden="true"
              className="absolute -right-3 top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 text-slateMuted-500 lg:block"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );

  const description = `${active.label}: ${active.nodes
    .map((node, index) => `step ${index + 1}, ${node.label} — ${node.role}`)
    .join('; ')}.`;

  const figure = (
    <FigureWithDescription title={active.label} description={description}>
      {chain}
    </FigureWithDescription>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Choose how the value chain is labelled">
        {(Object.keys(pax8Translation) as ModelKey[]).map((key) => {
          const option = pax8Translation[key];
          const isActive = key === model;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setModel(key)}
              aria-pressed={isActive}
              className={cn(
                'touch-target rounded-full border px-4 py-2 text-[0.84rem] transition-colors',
                isActive
                  ? 'border-signal-cyan/50 bg-signal-cyan/10 font-semibold text-slateMuted-100'
                  : 'border-slateMuted-100/15 bg-slateMuted-100/[0.03] text-slateMuted-300 hover:text-slateMuted-100',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="text-[0.85rem] text-slateMuted-400">
        {active.caption}
      </p>

      {model === 'pax8' ? (
        <HypotheticalFrame note="Relabelling only. It illustrates where the same coordination problems would sit in the Pax8 ecosystem; it does not describe work I have done for Pax8.">
          {figure}
        </HypotheticalFrame>
      ) : (
        figure
      )}
    </div>
  );
}
