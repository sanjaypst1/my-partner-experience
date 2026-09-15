import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/cn';
import { person } from '@/data/portfolio';
import { ExploreNav } from '@/components/navigation/ExploreNav';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { useWalkthrough } from '@/hooks/useWalkthrough';

export function Header() {
  const [condensed, setCondensed] = useState(false);
  const { paused, togglePaused, prefersReducedMotion } = useMotionPreference();
  const { goTo } = useWalkthrough();

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-print="hide"
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-500',
        condensed
          ? 'border-b border-slateMuted-100/10 bg-white/80 backdrop-blur-xl'
          : 'bg-gradient-to-b from-midnight-950/95 to-transparent',
      )}
    >
      <div className="shell flex items-center justify-between gap-4 py-3">
        <button
          type="button"
          onClick={() => goTo('hero')}
          className="group flex items-center gap-3 rounded-full py-1 pr-3 text-left"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-full border border-signal-cyan/40 bg-signal-cyan/10 font-display text-[0.8rem] font-bold text-signal-cyan"
          >
            SR
          </span>
          <span className="hidden sm:block">
            <span className="block font-display text-[0.95rem] font-semibold leading-tight text-slateMuted-100">
              {person.name}
            </span>
            <span className="block text-[0.72rem] leading-tight text-slateMuted-400">
              Partner Experience · {person.location}
            </span>
          </span>
          <span className="sr-only">Return to the top of the walkthrough</span>
        </button>

        <div className="flex items-center gap-2">
          <ExploreNav />
          {!prefersReducedMotion ? (
            <button
              type="button"
              onClick={togglePaused}
              aria-pressed={paused}
              className="touch-target hidden items-center gap-2 rounded-full border border-slateMuted-100/15 bg-slateMuted-100/[0.04] px-3 py-2 text-[0.78rem] text-slateMuted-200 transition-colors hover:text-slateMuted-100 sm:inline-flex"
            >
              {paused ? (
                <Play aria-hidden="true" className="h-3.5 w-3.5" />
              ) : (
                <Pause aria-hidden="true" className="h-3.5 w-3.5" />
              )}
              {paused ? 'Animation paused' : 'Pause animation'}
            </button>
          ) : null}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
