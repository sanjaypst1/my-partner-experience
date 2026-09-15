import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { regionNodes } from '@/data/portfolio';
import { FigureWithDescription } from '@/components/accessibility/FigureWithDescription';
import { useMotionPreference } from '@/hooks/useMotionPreference';

const waveLabels: Record<1 | 2 | 3, string> = {
  1: 'Wave 1 — pilot and core',
  2: 'Wave 2 — readiness confirmed',
  3: 'Wave 3 — remaining markets',
};

/** Bright RGB wave colours tuned for the light canvas. */
const waveColour: Record<1 | 2 | 3, string> = {
  1: '#0071e3',
  2: '#7c3aed',
  3: '#e11d8c',
};

const CORE_ID = 'global-core';

/**
 * An ABSTRACT region network, not a map. No borders or coastlines are drawn.
 * Selecting a wave shows which markets go when — gated on readiness.
 */
export function RegionalScaleMap() {
  const [activeWave, setActiveWave] = useState<1 | 2 | 3>(1);
  const { motionEnabled } = useMotionPreference();
  const timerRef = useRef<number | null>(null);

  const [autoplay, setAutoplay] = useState(true);
  useEffect(() => {
    if (!motionEnabled || !autoplay) return;
    timerRef.current = window.setInterval(() => {
      setActiveWave((wave) => ((wave % 3) + 1) as 1 | 2 | 3);
    }, 3600);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [motionEnabled, autoplay]);

  const core = regionNodes.find((node) => node.id === CORE_ID);
  const description = `An abstract network of region nodes grouped into three rollout waves. ${regionNodes
    .map((node) => `${node.label}: wave ${node.wave}. ${node.note}`)
    .join(' ')} Lines connect each region to the global core where non-negotiable requirements are defined.`;

  const dataTable = (
    <table>
      <caption>Regional rollout waves</caption>
      <thead>
        <tr>
          <th scope="col">Region</th>
          <th scope="col">Wave</th>
          <th scope="col">Consideration</th>
        </tr>
      </thead>
      <tbody>
        {regionNodes.map((node) => (
          <tr key={node.id}>
            <th scope="row">{node.label}</th>
            <td>{node.wave}</td>
            <td>{node.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="glass p-5">
      <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Select a rollout wave">
        {([1, 2, 3] as const).map((wave) => (
          <button
            key={wave}
            type="button"
            onClick={() => {
              setAutoplay(false);
              setActiveWave(wave);
            }}
            aria-pressed={activeWave === wave}
            className={cn(
              'touch-target rounded-full border px-3.5 py-2 text-[0.8rem] transition-colors',
              activeWave === wave
                ? 'border-transparent font-semibold text-white shadow-glow'
                : 'border-slateMuted-100/15 bg-white text-slateMuted-300 hover:text-slateMuted-100',
            )}
            style={activeWave === wave ? { backgroundColor: waveColour[wave] } : undefined}
          >
            {waveLabels[wave]}
          </button>
        ))}
      </div>

      <FigureWithDescription
        title="Regional rollout network"
        description={description}
        dataTable={dataTable}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl2 border border-[#0071e3]/20 bg-gradient-to-br from-[#e8f4ff] via-[#f4ecff] to-[#ffe8f5] shadow-glass">
          <svg viewBox="0 0 100 60" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="region-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0071e3" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0071e3" stopOpacity="0" />
              </radialGradient>
            </defs>

            {core
              ? regionNodes
                  .filter((node) => node.id !== core.id)
                  .map((node) => (
                    <line
                      key={`link-${node.id}`}
                      x1={core.x}
                      y1={core.y * 0.6}
                      x2={node.x}
                      y2={node.y * 0.6}
                      stroke={waveColour[node.wave]}
                      strokeWidth={node.wave <= activeWave ? 0.55 : 0.25}
                      strokeOpacity={node.wave <= activeWave ? 0.85 : 0.28}
                      strokeDasharray={node.wave <= activeWave ? undefined : '1 1.5'}
                    />
                  ))
              : null}

            {regionNodes.map((node) => {
              const reached = node.wave <= activeWave;
              return (
                <g key={node.id}>
                  {reached ? (
                    <circle cx={node.x} cy={node.y * 0.6} r={5} fill="url(#region-halo)" />
                  ) : null}
                  <circle
                    cx={node.x}
                    cy={node.y * 0.6}
                    r={node.id === CORE_ID ? 2.1 : 1.55}
                    fill={reached ? waveColour[node.wave] : '#a1a1a6'}
                    fillOpacity={reached ? 1 : 0.55}
                    stroke="#ffffff"
                    strokeWidth="0.35"
                  />
                  <text
                    x={node.x}
                    y={node.y * 0.6 - 3}
                    textAnchor="middle"
                    fontSize="2.2"
                    fontWeight="600"
                    fill={reached ? '#1d1d1f' : '#6e6e73'}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y={node.y * 0.6 + 4.2}
                    textAnchor="middle"
                    fontSize="1.8"
                    fontWeight="600"
                    fill={reached ? waveColour[node.wave] : '#86868b'}
                  >
                    W{node.wave}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </FigureWithDescription>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {regionNodes
          .filter((node) => node.wave === activeWave)
          .map((node) => (
            <li key={node.id} className="text-[0.85rem] text-slateMuted-300">
              <span className="font-semibold text-slateMuted-100">{node.label}:</span> {node.note}
            </li>
          ))}
      </ul>
      <p className="mt-3 text-[0.75rem] text-slateMuted-500">
        Illustrative network, not a geographic map. Region nodes are positioned for clarity only.
      </p>
    </div>
  );
}
