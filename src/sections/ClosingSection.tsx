import { CalendarClock, FileDown, Linkedin, Mail, Printer } from 'lucide-react';
import type { ReactNode } from 'react';
import { Section } from '@/components/layout/Section';
import { Button, LinkButton } from '@/components/ui/Button';
import { ConfidentialityNotice } from '@/components/accessibility/ConfidentialityNotice';
import { closingContent, contactActions, person, siteConfig } from '@/data/portfolio';
import type { ContactAction } from '@/types/portfolio';

const icons: Record<ContactAction['kind'], ReactNode> = {
  resume: <FileDown aria-hidden="true" className="h-4 w-4" />,
  linkedin: <Linkedin aria-hidden="true" className="h-4 w-4" />,
  email: <Mail aria-hidden="true" className="h-4 w-4" />,
  booking: <CalendarClock aria-hidden="true" className="h-4 w-4" />,
  print: <Printer aria-hidden="true" className="h-4 w-4" />,
};

export function ClosingSection() {
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

          <ul className="mt-6 flex flex-wrap gap-3">
            {contactActions.map((action) => (
              <li key={action.id}>
                {action.kind === 'print' ? (
                  <Button
                    variant="secondary"
                    onClick={() => window.print()}
                    icon={icons[action.kind]}
                  >
                    {action.label}
                  </Button>
                ) : (
                  <LinkButton
                    href={action.href}
                    variant={action.kind === 'resume' ? 'primary' : 'secondary'}
                    icon={icons[action.kind]}
                    {...(action.kind === 'resume' ? { download: '' } : {})}
                    {...(action.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {action.label}
                    {action.href.startsWith('http') ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </LinkButton>
                )}
              </li>
            ))}
          </ul>

          {/* Review-mode reminder that the contact details are still placeholders. */}
          {siteConfig.showUnverifiedPlaceholders &&
          contactActions.some((action) => action.isPlaceholder) ? (
            <div
              data-testid="contact-placeholder-notice"
              className="mt-6 rounded-xl2 border border-dashed border-signal-amber/45 bg-signal-amber/[0.06] p-4"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-amber">
                Configure before sharing
              </p>
              <ul className="mt-2 space-y-1 text-[0.83rem] text-slateMuted-300">
                {contactActions
                  .filter((action) => action.isPlaceholder)
                  .map((action) => (
                    <li key={action.id}>
                      <span className="text-slateMuted-100">{action.label}:</span>{' '}
                      {action.description}
                    </li>
                  ))}
              </ul>
              <p className="mt-2 text-[0.78rem] text-slateMuted-400">
                Edit <code className="font-mono">contactActions</code> in{' '}
                <code className="font-mono">src/data/portfolio.ts</code>.
              </p>
            </div>
          ) : null}
        </div>

        <ConfidentialityNotice variant="card" />
      </div>
    </Section>
  );
}
