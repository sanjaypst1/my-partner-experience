import { MessageCircleQuestion } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { conversationContent } from '@/data/pax8Alignment';

export function ConversationSection() {
  return (
    <Section
      id="conversation"
      eyebrow="Section 14 — Interview discussion"
      title={conversationContent.title}
      lead={<p>{conversationContent.intro}</p>}
    >
      <ol className="grid gap-3 lg:grid-cols-2">
        {conversationContent.questions.map((item, itemIndex) => (
          <li key={item.id} data-animate="pending" className="glass h-full p-5">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-signal-cyan/40 font-mono text-[0.66rem] text-signal-cyan"
              >
                {itemIndex + 1}
              </span>
              <div>
                <p className="text-[0.98rem] font-semibold leading-snug text-slateMuted-100">
                  {item.question}
                </p>
                <p className="mt-2 flex items-start gap-2 text-[0.85rem] leading-relaxed text-slateMuted-300">
                  <MessageCircleQuestion
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slateMuted-500"
                  />
                  <span>
                    <span className="sr-only">Why I am asking: </span>
                    {item.why}
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
