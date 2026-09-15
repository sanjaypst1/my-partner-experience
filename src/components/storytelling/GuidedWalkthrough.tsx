import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Presentation, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { WalkthroughProgress } from './WalkthroughProgress';
import { Button } from '@/components/ui/Button';
import { useWalkthrough } from '@/hooks/useWalkthrough';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { formatMinutes } from '@/lib/format';

/**
 * The sticky presentation controller. It is the difference between "a long page" and
 * "a walkthrough somebody is being taken through": one current section, time left,
 * explicit next/previous, and a way out.
 */
export function GuidedWalkthrough() {
  const { active, index, total, current, minutesRemaining, next, previous, exit, start } =
    useWalkthrough();
  const { prefersReducedMotion, paused, togglePaused } = useMotionPreference();
  // The hero already has a full-width primary CTA, so the floating launcher only
  // appears once the visitor has scrolled past it.
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const atStart = index === 0;
  const atEnd = index === total - 1;
  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' as const };

  return (
    <AnimatePresence initial={false}>
      {active ? (
        <motion.aside
          key="walkthrough-bar"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={transition}
          aria-label="Guided walkthrough controls"
          data-print="hide"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-slateMuted-100/10 bg-white/90 backdrop-blur-xl"
        >
          <div className="shell flex flex-col gap-3 py-3">
            <WalkthroughProgress index={index} total={total} />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-signal-cyan">
                  Now presenting · Section {index + 1} of {total}
                </p>
                {/* Announce section changes to screen readers without stealing focus. */}
                <p aria-live="polite" className="truncate text-[0.98rem] font-semibold text-slateMuted-100">
                  {current.walkthroughTitle}
                </p>
                <p className="text-[0.78rem] text-slateMuted-400">{formatMinutes(minutesRemaining)}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={togglePaused}
                  aria-pressed={paused}
                  icon={
                    paused ? (
                      <Play aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <Pause aria-hidden="true" className="h-4 w-4" />
                    )
                  }
                >
                  {paused ? 'Resume animation' : 'Pause animation'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={previous}
                  disabled={atStart}
                  className="disabled:opacity-40"
                  icon={<ChevronLeft aria-hidden="true" className="h-4 w-4" />}
                >
                  Previous section
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={atEnd ? exit : next}
                  iconAfter={<ChevronRight aria-hidden="true" className="h-4 w-4" />}
                >
                  {atEnd ? 'Finish walkthrough' : 'Next section'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={exit}
                  icon={<X aria-hidden="true" className="h-4 w-4" />}
                >
                  Exit walkthrough
                </Button>
              </div>
            </div>

            <p className="text-[0.72rem] text-slateMuted-500">
              Keyboard: arrow right for next, arrow left for previous, Escape to exit.
            </p>
          </div>
        </motion.aside>
      ) : pastHero ? (
        <motion.div
          key="walkthrough-launcher"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={transition}
          data-print="hide"
          className="fixed bottom-5 right-5 z-50"
        >
          <Button
            magnetic
            onClick={start}
            icon={<Presentation aria-hidden="true" className="h-4 w-4" />}
          >
            Start walkthrough
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
