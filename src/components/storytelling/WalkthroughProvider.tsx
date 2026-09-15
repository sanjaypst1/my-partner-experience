import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { WalkthroughContext } from '@/lib/walkthroughContext';
import { sections } from '@/data/portfolio';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { useSectionInView } from '@/hooks/useSectionInView';
import type { SectionId } from '@/types/portfolio';

const sectionIds = sections.map((section) => section.id);

/**
 * Drives the guided walkthrough: which section we are on, how much narration is
 * left, and the keyboard shortcuts. It also tracks the section in view during free
 * exploration so navigation always reflects reality.
 */
export function WalkthroughProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [visibleSection, setVisibleSection] = useState<SectionId>('hero');
  const { motionEnabled } = useMotionPreference();
  /** Ignore scroll-driven index sync briefly after we scroll on purpose. */
  const programmaticUntil = useRef(0);

  const scrollToSection = useCallback(
    (id: SectionId) => {
      const element = document.getElementById(id);
      if (!element) return;
      programmaticUntil.current = Date.now() + 900;
      element.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto', block: 'start' });
      // Send screen-reader focus to the section that just became current.
      const heading = element.querySelector<HTMLElement>('h1, h2');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    },
    [motionEnabled],
  );

  const goToIndex = useCallback(
    (nextIndex: number) => {
      const clamped = Math.min(Math.max(nextIndex, 0), sections.length - 1);
      setIndex(clamped);
      scrollToSection(sections[clamped].id);
    },
    [scrollToSection],
  );

  const start = useCallback(() => {
    setActive(true);
    goToIndex(1); // Section 1 is the hero the visitor is already looking at.
  }, [goToIndex]);

  const exit = useCallback(() => setActive(false), []);
  const next = useCallback(() => goToIndex(index + 1), [goToIndex, index]);
  const previous = useCallback(() => goToIndex(index - 1), [goToIndex, index]);

  const goTo = useCallback(
    (id: SectionId) => {
      const target = sections.findIndex((section) => section.id === id);
      if (target >= 0) goToIndex(target);
      else scrollToSection(id);
    },
    [goToIndex, scrollToSection],
  );

  const registerVisible = useCallback((id: SectionId) => {
    setVisibleSection(id);
  }, []);

  useSectionInView(sectionIds, registerVisible);

  // While the walkthrough is running, manual scrolling should still update the controller.
  useEffect(() => {
    if (!active) return;
    if (Date.now() < programmaticUntil.current) return;
    const visibleIndex = sections.findIndex((section) => section.id === visibleSection);
    if (visibleIndex >= 0) setIndex(visibleIndex);
  }, [active, visibleSection]);

  // Keyboard control, only while the walkthrough is running and focus is not in a field.
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        next();
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        previous();
      } else if (event.key === 'Escape') {
        exit();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, next, previous, exit]);

  const minutesRemaining = useMemo(
    () => sections.slice(index).reduce((total, section) => total + section.minutes, 0),
    [index],
  );

  const value = useMemo(
    () => ({
      active,
      index,
      current: sections[index],
      total: sections.length,
      progress: sections.length > 1 ? index / (sections.length - 1) : 1,
      minutesRemaining,
      start,
      exit,
      next,
      previous,
      goTo,
      visibleSection,
      registerVisible,
    }),
    [active, index, minutesRemaining, start, exit, next, previous, goTo, visibleSection, registerVisible],
  );

  return <WalkthroughContext.Provider value={value}>{children}</WalkthroughContext.Provider>;
}
