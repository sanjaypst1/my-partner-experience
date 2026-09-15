import { siteConfig } from '@/data/portfolio';
import type { Verifiable } from '@/types/portfolio';

/** True when a Verifiable field has a confirmed value we can print. */
export function hasVerifiedValue(field: Verifiable): boolean {
  return field.verified && Boolean(field.value);
}

/**
 * True when a field would render nothing at all, so callers can drop the label,
 * separator or wrapper around it instead of leaving an orphan.
 */
export function isHiddenField(field: Verifiable): boolean {
  return !hasVerifiedValue(field) && !siteConfig.showUnverifiedPlaceholders;
}

/** True when open verification questions should be listed for review. */
export function showOpenVerifications(): boolean {
  return siteConfig.showUnverifiedPlaceholders;
}
