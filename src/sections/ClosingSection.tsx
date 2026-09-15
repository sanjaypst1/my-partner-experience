import { Linkedin } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { LinkButton } from '@/components/ui/Button';
import { ConfidentialityNotice } from '@/components/accessibility/ConfidentialityNotice';
import { closingContent, contactActions, person } from '@/data/portfolio';

export function ClosingSection() {
  const linkedIn = contactActions.find((action) => action.kind === 'linkedin') ?? contactActions[0];

  return (
    <Section
      id="closing"
      eyebrow={closingContent.eyebrow}
      title={closingContent.headline}
      lead={<p>{closingContent.statement}</p>}
    >
      <div className="space-y-10">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {closingContent.summary.map((item, itemIndex) => (
            <li key={item.id} data-animate="pending" className="glass p-5">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-slateMuted-500">
                Pillar {itemIndex + 1}
              </p>
              <p className="mt-2 font-display text-[1.05rem] font-semibold text-slateMuted-100">
                {item.employer}
              </p>
              <p className="mt-1 text-[0.88rem] text-signal-cyan">{item.contribution}</p>
            </li>
          ))}
        </ol>

        <div data-animate="pending" className="glass-strong p-6 sm:p-8">
          <h3 className="text-fluid-h3">Continue the conversation</h3>
          <p className="prose-readable mt-3">
            I would welcome a conversation about the {person.targetRole} position and where this
            experience would be most useful to your team.
          </p>

          <div className="mt-6">
            <LinkButton
              href={linkedIn.href}
              variant="primary"
              icon={<Linkedin aria-hidden="true" className="h-4 w-4" />}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkedIn.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </LinkButton>
          </div>
        </div>

        <ConfidentialityNotice variant="card" />
      </div>
    </Section>
  );
}
