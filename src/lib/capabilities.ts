/**
 * Capability probes used to decide whether the 3D hero is worth loading.
 * All of them fail closed: if anything is uncertain, the static fallback wins.
 */

export function supportsWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl');
    return Boolean(context);
  } catch {
    return false;
  }
}

/** Small-screen or low-core devices get the CSS/SVG hero instead of a WebGL scene. */
export function isLowPowerDevice(): boolean {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return true;
  const cores = navigator.hardwareConcurrency ?? 2;
  const narrow = window.matchMedia('(max-width: 767px)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  return cores <= 4 || (narrow && coarse);
}

export function shouldRenderThreeScene(motionEnabled: boolean): boolean {
  return motionEnabled && supportsWebGL() && !isLowPowerDevice();
}
