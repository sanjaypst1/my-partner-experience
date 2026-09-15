/**
 * Geometry for the hero ecosystem, shared by the WebGL scene and the static SVG
 * fallback so both tell the same story: vendors on one side, the platform in the
 * middle, partners next, end customers on the far side, signals flowing across.
 *
 * Labels are deliberately generic. The Pax8-specific reading of this chain lives in
 * the Daimler section behind the clearly-labelled hypothetical toggle.
 */

export type EcosystemLayer = 'vendor' | 'platform' | 'partner' | 'customer';

export interface EcosystemNode {
  id: string;
  layer: EcosystemLayer;
  /** Normalised coordinates, -1 to 1 on both axes. */
  x: number;
  y: number;
  /** Relative brightness, standing in for readiness and adoption. */
  intensity: number;
}

export const layerMeta: Record<EcosystemLayer, { label: string; description: string; hex: string }> = {
  vendor: {
    label: 'Technology and vendor teams',
    description: 'Build the product and define the technical narrative.',
    hex: '#5a3fd4',
  },
  platform: {
    label: 'Central platform and program',
    description: 'Aggregates, governs and enables at scale.',
    hex: '#0b8f9c',
  },
  partner: {
    label: 'Partners',
    description: 'Package, position and deliver the capability.',
    hex: '#c0267a',
  },
  customer: {
    label: 'End customers',
    description: 'Experience the outcome the whole chain exists for.',
    hex: '#b86a0d',
  },
};

/**
 * Column positions, normalised. Kept deliberately compact: the whole diagram has to sit
 * in the right-hand third of the hero on desktop, clear of the headline.
 */
const columns: Record<EcosystemLayer, number> = {
  vendor: -1,
  platform: -0.05,
  partner: 0.8,
  customer: 1.6,
};

function column(layer: EcosystemLayer, count: number, spread: number, intensity: number): EcosystemNode[] {
  return Array.from({ length: count }, (_, index) => {
    const t = count === 1 ? 0.5 : index / (count - 1);
    return {
      id: `${layer}-${index}`,
      layer,
      x: columns[layer],
      y: (t - 0.5) * spread,
      intensity: intensity * (0.7 + 0.3 * Math.abs(Math.cos(index * 1.7))),
    };
  });
}

export const ecosystemNodes: EcosystemNode[] = [
  ...column('vendor', 4, 2.1, 0.75),
  ...column('platform', 1, 0, 1),
  ...column('partner', 7, 2.8, 0.85),
  ...column('customer', 10, 3.1, 0.6),
];

export interface EcosystemLink {
  from: string;
  to: string;
}

/** Vendors → platform → partners → customers. No partner-to-partner links. */
export const ecosystemLinks: EcosystemLink[] = (() => {
  const links: EcosystemLink[] = [];
  const platform = ecosystemNodes.find((node) => node.layer === 'platform');
  if (!platform) return links;

  for (const node of ecosystemNodes) {
    if (node.layer === 'vendor') links.push({ from: node.id, to: platform.id });
    if (node.layer === 'partner') links.push({ from: platform.id, to: node.id });
  }

  // Each customer connects to the partner nearest it vertically, so the links fan out
  // instead of crossing the whole diagram.
  const partners = ecosystemNodes.filter((node) => node.layer === 'partner');
  const customers = ecosystemNodes.filter((node) => node.layer === 'customer');
  customers.forEach((customer, index) => {
    const ratio = customers.length === 1 ? 0 : index / (customers.length - 1);
    const partner = partners[Math.round(ratio * (partners.length - 1))];
    links.push({ from: partner.id, to: customer.id });
  });

  return links;
})();

export function nodeById(id: string): EcosystemNode | undefined {
  return ecosystemNodes.find((node) => node.id === id);
}
