import { useEffect } from 'react';
import type { SectionId } from '@/types/portfolio';

/**
 * Reports the section closest to the top of the viewport, so navigation and the
 * walkthrough controller stay in sync with free scrolling.
 */
export function useSectionInView(ids: SectionId[], onChange: (id: SectionId) => void): void {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const visible = new Map<SectionId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          if (entry.isIntersecting) visible.set(id, entry.intersectionRatio);
          else visible.delete(id);
        }
        let best: SectionId | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) onChange(best);
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: [0.05, 0.25, 0.5, 0.75] },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [ids, onChange]);
}
