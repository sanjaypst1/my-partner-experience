import { Section } from '@/components/layout/Section';
import { OperatingModelPillars } from '@/components/storytelling/OperatingModelPillars';
import { person } from '@/data/portfolio';

export function OperatingModelSection() {
  return (
    <Section
      id="operating-model"
      eyebrow="Section 03 — My operating model"
      title="Four programs, one capability"
      lead={
        <p>
          These are not four unrelated employers. Each one taught me a different part of the same
          discipline, and I use all four together. Select a pillar to see the problem, what I did and
          how it reads across to Pax8.
        </p>
      }
    >
      <div className="space-y-8">
        <p
          data-animate="pending"
          className="font-display text-fluid-h2 text-balance bg-gradient-to-r from-signal-cyan via-signal-violet to-signal-amber bg-clip-text text-transparent"
        >
          {person.modelStatement}
        </p>

        <div data-animate="pending">
          <OperatingModelPillars />
        </div>
      </div>
    </Section>
  );
}
