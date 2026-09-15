/** Formats a decimal minute total as a short, readable estimate. */
export function formatMinutes(minutes: number): string {
  if (minutes <= 0) return 'Final section';
  if (minutes < 1) return 'Under a minute left';
  const rounded = Math.round(minutes);
  return `About ${rounded} ${rounded === 1 ? 'minute' : 'minutes'} left`;
}

/**
 * A tight range around the narration budget. Deliberately not padded — the estimate
 * should match what the walkthrough controller counts down.
 */
export function formatRange(total: number): string {
  const low = Math.max(1, Math.floor(total));
  const high = Math.max(low + 1, Math.ceil(total));
  return `${low}–${high} minutes`;
}

export function formatMetricValue(value: string | number | null, unit?: string): string {
  if (value === null) return '';
  const base = typeof value === 'number' ? value.toLocaleString('en-AU') : value;
  if (!unit) return base;
  return unit === '%' ? `${base}%` : `${base} ${unit}`;
}
