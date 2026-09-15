import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Registers ScrollTrigger once, on the client only. Callers should still check
 * `useMotionPreference()` before creating animations.
 */
export function getGsap(): typeof gsap {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export { ScrollTrigger };

/** Shared easing so every animation on the site feels like one system. */
export const EASE = 'power3.out';
export const EASE_EXPRESSIVE = 'expo.out';
