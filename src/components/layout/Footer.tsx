import { person } from '@/data/portfolio';
import { ConfidentialityNotice } from '@/components/accessibility/ConfidentialityNotice';

export function Footer() {
  return (
    <footer className="border-t border-slateMuted-100/10 py-14">
      <div className="shell flex flex-col gap-6">
        <div className="hairline" aria-hidden="true" />
        <div>
          <p className="font-display text-[1.05rem] text-slateMuted-100">{person.name}</p>
          <p className="mt-1 text-[0.9rem] text-slateMuted-400">
            {person.role} · {person.location}
          </p>
        </div>
        <ConfidentialityNotice />
      </div>
    </footer>
  );
}
