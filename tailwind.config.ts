import type { Config } from 'tailwindcss';

/**
 * Original design system: "connected partner ecosystem".
 * Midnight substrate + signal colours (cyan / violet / magenta) + amber for outcomes.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#04060f',
          900: '#070b1a',
          850: '#0a1024',
          800: '#0e142e',
          700: '#151d3d',
          600: '#1d2750',
        },
        signal: {
          cyan: '#3ee8f2',
          violet: '#8b6cff',
          magenta: '#ff6bc4',
          amber: '#ffb454',
        },
        slateMuted: {
          100: '#e8ecf7',
          200: '#c6cddf',
          300: '#9aa4bf',
          400: '#7b86a3',
          500: '#5c6684',
        },
      },
      fontFamily: {
        display: [
          '"Space Grotesk"',
          '"Segoe UI Variable Display"',
          'Segoe UI',
          'system-ui',
          '-apple-system',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        sans: [
          'Inter',
          '"Segoe UI Variable Text"',
          'Segoe UI',
          'system-ui',
          '-apple-system',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      fontSize: {
        'fluid-hero': ['clamp(2.6rem, 6.2vw, 5.4rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'fluid-h2': ['clamp(1.85rem, 3.4vw, 3.1rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'fluid-h3': ['clamp(1.25rem, 1.9vw, 1.7rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'fluid-lead': ['clamp(1.02rem, 1.35vw, 1.32rem)', { lineHeight: '1.6' }],
      },
      maxWidth: {
        prose: '68ch',
        shell: '84rem',
      },
      borderRadius: {
        xl2: '1.4rem',
        xl3: '2rem',
      },
      boxShadow: {
        glass: '0 1px 0 0 rgb(255 255 255 / 0.07) inset, 0 24px 60px -30px rgb(4 6 15 / 0.9)',
        glow: '0 0 0 1px rgb(62 232 242 / 0.28), 0 18px 48px -20px rgb(62 232 242 / 0.35)',
        focus: '0 0 0 3px rgb(4 6 15 / 1), 0 0 0 6px rgb(62 232 242 / 0.85)',
      },
      backgroundImage: {
        'ecosystem-radial':
          'radial-gradient(120% 90% at 12% 8%, rgb(139 108 255 / 0.30) 0%, transparent 55%), radial-gradient(100% 80% at 92% 12%, rgb(62 232 242 / 0.22) 0%, transparent 52%), radial-gradient(90% 70% at 60% 105%, rgb(255 107 196 / 0.18) 0%, transparent 60%)',
        'signal-line': 'linear-gradient(90deg, transparent, rgb(62 232 242 / 0.75), transparent)',
        'grid-fine':
          'linear-gradient(to right, rgb(255 255 255 / 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.045) 1px, transparent 1px)',
      },
      backgroundSize: {
        // Distinct key from the `grid-fine` background image so `bg-*` stays unambiguous.
        'grid-cell': '58px 58px',
      },
      transitionTimingFunction: {
        expressive: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // Opacity only. Transforms on SVG shapes move them relative to the viewBox
        // origin rather than their own centre, which throws a diagram out of alignment.
        'node-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        // Signals travel along a line by moving the dash pattern, so the line stays put.
        'signal-dash': {
          from: { strokeDashoffset: '0' },
          to: { strokeDashoffset: '-16' },
        },
        'fade-rise': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'node-glow': 'node-glow 4.2s ease-in-out infinite',
        'signal-dash': 'signal-dash 2.4s linear infinite',
        'fade-rise': 'fade-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
