import { SignalChain } from './SignalChain';
import { FigureWithDescription } from '@/components/accessibility/FigureWithDescription';
import { journeyStages } from '@/data/portfolio';

/**
 * Section 2's operating chain: strategy through to feedback, with the function that
 * owns each stage. The point of the visual is that a break anywhere breaks the whole
 * partner experience.
 */
export function PartnerJourney() {
  const items = journeyStages.map((stage) => ({
    id: stage.id,
    label: stage.label,
    detail: stage.description,
    meta: stage.owner,
  }));

  const description = `An eight-stage chain, each stage owned by a different function: ${journeyStages
    .map((stage) => `${stage.label}, owned by ${stage.owner}`)
    .join('; ')}. Evidence from the final stage feeds back into strategy and design.`;

  return (
    <FigureWithDescription title="The Partner Experience operating chain" description={description}>
      <SignalChain items={items} accentKey="cyan" metaLabel="Owner" />
    </FigureWithDescription>
  );
}
