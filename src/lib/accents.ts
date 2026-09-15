import type { AccentKey } from '@/types/portfolio';

/**
 * Accent tokens. Colour never carries meaning on its own anywhere on this site —
 * every accented element also has a text label, icon or number.
 */
interface AccentTokens {
  text: string;
  border: string;
  bg: string;
  bgSolid: string;
  ring: string;
  hex: string;
  gradient: string;
  /** Full literal class so Tailwind can see it — never build these by interpolation. */
  activeBorder: string;
}

export const accentTokens: Record<AccentKey, AccentTokens> = {
  cyan: {
    text: 'text-signal-cyan',
    border: 'border-signal-cyan/45',
    bg: 'bg-signal-cyan/12',
    bgSolid: 'bg-signal-cyan',
    ring: 'shadow-[0_0_0_1px_rgb(62_232_242_/_0.35)]',
    hex: '#3ee8f2',
    gradient: 'from-signal-cyan/70 to-signal-cyan/0',
    activeBorder: 'data-[state=active]:border-signal-cyan/45',
  },
  violet: {
    text: 'text-signal-violet',
    border: 'border-signal-violet/45',
    bg: 'bg-signal-violet/12',
    bgSolid: 'bg-signal-violet',
    ring: 'shadow-[0_0_0_1px_rgb(139_108_255_/_0.35)]',
    hex: '#8b6cff',
    gradient: 'from-signal-violet/70 to-signal-violet/0',
    activeBorder: 'data-[state=active]:border-signal-violet/45',
  },
  magenta: {
    text: 'text-signal-magenta',
    border: 'border-signal-magenta/45',
    bg: 'bg-signal-magenta/12',
    bgSolid: 'bg-signal-magenta',
    ring: 'shadow-[0_0_0_1px_rgb(255_107_196_/_0.35)]',
    hex: '#ff6bc4',
    gradient: 'from-signal-magenta/70 to-signal-magenta/0',
    activeBorder: 'data-[state=active]:border-signal-magenta/45',
  },
  amber: {
    text: 'text-signal-amber',
    border: 'border-signal-amber/45',
    bg: 'bg-signal-amber/12',
    bgSolid: 'bg-signal-amber',
    ring: 'shadow-[0_0_0_1px_rgb(255_180_84_/_0.35)]',
    hex: '#ffb454',
    gradient: 'from-signal-amber/70 to-signal-amber/0',
    activeBorder: 'data-[state=active]:border-signal-amber/45',
  },
};

export function accent(key: AccentKey) {
  return accentTokens[key];
}
