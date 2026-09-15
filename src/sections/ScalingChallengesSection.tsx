import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { ChallengeResolutionCard } from '@/components/case-studies/ChallengeResolutionCard';
import { Button } from '@/components/ui/Button';
import { scalingChallenges } from '@/data/pax8Alignment';

export function ScalingChallengesSection() {
  const [expanded, setExpanded] = useState<string[]>([scalingChallenges[0].id]);
  const allOpen = expanded.length === scalingChallenges.length;

  const toggle = (id: string) =>
    setExpanded((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <Section
      id="scaling-challenges"
      eyebrow="Section 11 — Challenges"
      title="Twelve things that break Partner Experience programs at scale"
      lead={
        <p>
          None of these are hypothetical problems. Each card states the problem and the response I
          would bring to it. Select a challenge to see the response.
        </p>
      }
    >
      <div className="space-y-6">
        <div data-animate="pending">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              setExpanded(allOpen ? [] : scalingChallenges.map((challenge) => challenge.id))
            }
          >
            {allOpen ? 'Collapse all responses' : 'Expand all responses'}
          </Button>
        </div>

        <ul className="grid gap-3 lg:grid-cols-2">
          {scalingChallenges.map((challenge) => (
            <li key={challenge.id} data-animate="pending">
              <ChallengeResolutionCard
                challenge={challenge}
                expanded={expanded.includes(challenge.id)}
                onToggle={() => toggle(challenge.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
