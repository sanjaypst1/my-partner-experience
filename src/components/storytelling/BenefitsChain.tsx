import { SignalChain } from './SignalChain';
import { FigureWithDescription } from '@/components/accessibility/FigureWithDescription';
import { benefitsChain, measurementLevels } from '@/data/metrics';

/**
 * Awareness through to business benefit. Used in the NAB Compass section to make the
 * argument that a launch is the middle of the story, not the end of it.
 */
export function BenefitsChain() {
  const levelTitle = (levelId: string) =>
    measurementLevels.find((level) => level.id === levelId)?.title ?? levelId;

  const items = benefitsChain.map((link) => ({
    id: link.id,
    label: link.label,
    detail: link.detail,
    meta: levelTitle(link.level),
  }));

  const description = `A six-link benefits chain: ${benefitsChain
    .map((link) => `${link.label} — ${link.detail}`)
    .join(' ')} Each link is measured at a different level of the measurement framework.`;

  return (
    <FigureWithDescription title="Benefits chain" description={description}>
      <SignalChain items={items} accentKey="amber" metaLabel="Measured at" />
    </FigureWithDescription>
  );
}
