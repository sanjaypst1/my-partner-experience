import { person } from '@/data/portfolio';
import { ConfidentialityNotice } from '@/components/accessibility/ConfidentialityNotice';

export function Footer() {
  return (
    <footer className="border-t border-slateMuted-100/10 py-12">
      <div className="shell flex flex-col gap-6">
        <div className="hairline" aria-hidden="true" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-[1rem] text-slateMuted-100">{person.name}</p>
            <p className="text-[0.85rem] text-slateMuted-400">
              {person.role} · {person.location}
            </p>
          </div>
          <p className="max-w-sm text-[0.8rem] text-slateMuted-400">
            Prepared as a private walkthrough for a {person.targetCompany} {person.targetRole}{' '}
            conversation. Not affiliated with, endorsed by, or produced on behalf of{' '}
            {person.targetCompany}.
          </p>
        </div>
        <ConfidentialityNotice />
      </div>
    </footer>
  );
}
