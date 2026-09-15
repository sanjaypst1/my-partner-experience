import { ecosystemLinks, ecosystemNodes, layerMeta, nodeById } from './ecosystemModel';

const VIEW_W = 100;
const VIEW_H = 105;

// Maps the model's node coordinates into the viewBox with a margin on every side, so no
// column is ever clipped whatever shape the container ends up.
const toX = (x: number) => ((x + 1.35) / 3.3) * VIEW_W;
const toY = (y: number) => VIEW_H / 2 - y * 26;

/**
 * Static SVG version of the hero ecosystem. Shown whenever WebGL is unavailable,
 * motion is reduced, or the device is too small or low-powered to justify a 3D scene.
 * It carries the same information, so nothing is lost by never loading Three.js.
 */
export function EcosystemFallback({ animated = false }: { animated?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hero-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={layerMeta.platform.hex} stopOpacity="0.45" />
          <stop offset="100%" stopColor={layerMeta.platform.hex} stopOpacity="0" />
        </radialGradient>
      </defs>

      {ecosystemLinks.map((link, linkIndex) => {
        const from = nodeById(link.from);
        const to = nodeById(link.to);
        if (!from || !to) return null;
        return (
          <line
            key={`${link.from}-${link.to}`}
            x1={toX(from.x)}
            y1={toY(from.y)}
            x2={toX(to.x)}
            y2={toY(to.y)}
            stroke={layerMeta[to.layer].hex}
            strokeWidth="0.25"
            strokeOpacity="0.32"
            strokeDasharray={animated ? '1.2 2.8' : undefined}
            className={animated ? 'animate-signal-dash' : undefined}
            style={animated ? { animationDelay: `${(linkIndex % 8) * 0.35}s` } : undefined}
          />
        );
      })}

      {ecosystemNodes.map((node, nodeIndex) => {
        const meta = layerMeta[node.layer];
        const isPlatform = node.layer === 'platform';
        return (
          <g key={node.id}>
            {isPlatform ? (
              <circle cx={toX(node.x)} cy={toY(node.y)} r="9" fill="url(#hero-halo)" />
            ) : null}
            <circle
              cx={toX(node.x)}
              cy={toY(node.y)}
              r={isPlatform ? 2.4 : 1.3}
              fill={meta.hex}
              fillOpacity={0.35 + node.intensity * 0.6}
              className={animated ? 'animate-node-glow' : undefined}
              style={animated ? { animationDelay: `${(nodeIndex % 10) * 0.28}s` } : undefined}
            />
          </g>
        );
      })}
    </svg>
  );
}
