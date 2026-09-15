import { caseStudies, sections } from '@/data/portfolio';
import type { SectionId } from '@/types/portfolio';

export interface NavItem {
  id: SectionId;
  label: string;
  children?: { id: SectionId; label: string }[];
}

/** The eight "Explore freely" destinations, in story order, with case studies nested. */
export const navItems: NavItem[] = sections
  .filter((section) => Boolean(section.exploreLabel))
  .map((section) => {
    const children = sections
      .filter((candidate) => candidate.parent === section.id)
      .map((candidate) => ({
        id: candidate.id,
        label:
          caseStudies.find((study) => study.id === candidate.id)?.employer ??
          candidate.walkthroughTitle,
      }));

    return {
      id: section.id,
      label: section.exploreLabel as string,
      ...(children.length > 0 ? { children } : {}),
    };
  });

/** Maps a section in view to the nav item that should appear current. */
export function activeNavId(visible: SectionId): SectionId {
  const section = sections.find((candidate) => candidate.id === visible);
  if (section?.parent) return section.parent;
  const isTopLevel = navItems.some((item) => item.id === visible);
  if (isTopLevel) return visible;
  // Sections without their own nav entry belong to the nearest preceding entry.
  const order = sections.findIndex((candidate) => candidate.id === visible);
  for (let i = order; i >= 0; i -= 1) {
    const candidate = sections[i];
    if (navItems.some((item) => item.id === candidate.id)) return candidate.id;
  }
  return 'hero';
}
