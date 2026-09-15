import type { Config } from 'tailwindcss';

/**
 * Apple-inspired calm premium surface: soft gray canvas, near-black ink,
 * and lively RGB accents used sparingly for hierarchy and delight.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          // Soft Apple-like substrate (token name kept for component stability).
          950: '#f5f5f7',
          900: '#ececef',
          850: '#ffffff',
          800: '#e8e8ed',
          700: '#d2d2d7',
          600: '#b0b0b8',
        },
        signal: {
          cyan: '#0071e3',
          violet: '#7c3aed',
          magenta: '#e11d8c',
          amber: '#f59e0b',
        },
        slateMuted: {
          100: '#1d1d1f',
          200: '#424245',
          300: '#6e6e73',
          400: '#86868b',
          500: '#a1a1a6',
        },
      },
      fontFamily: {
        display: [
          '"SF Pro Display"',
          '"Segoe UI Variable Display"',
          'Segoe UI',
          'system-ui',
          '-apple-system',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        sans: [
          '"SF Pro Text"',
          '"Segoe UI Variable Text"',
          'Segoe UI',
          'system-ui',
          '-apple-system',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['"SF Mono"', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      fontSize: {
        'fluid-hero': ['clamp(2.75rem, 7vw, 5.6rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'fluid-h2': ['clamp(2rem, 3.8vw, 3.2rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'fluid-h3': ['clamp(1.3rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'fluid-lead': ['clamp(1.1rem, 1.4vw, 1.35rem)', { lineHeight: '1.55' }],
      },
      maxWidth: {
        prose: '66ch',
        shell: '72rem',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      boxShadow: {
        glass: '0 2px 12px rgb(0 0 0 / 0.04), 0 12px 40px rgb(0 0 0 / 0.06)',
        glow: '0 8px 24px rgb(0 113 227 / 0.28)',
        focus: '0 0 0 4px rgb(0 113 227 / 0.35)',
      },
      backgroundImage: {
        'ecosystem-radial':
          'radial-gradient(90% 70% at 15% 0%, rgb(124 58 237 / 0.10) 0%, transparent 55%), radial-gradient(80% 60% at 90% 10%, rgb(0 113 227 / 0.12) 0%, transparent 50%), radial-gradient(70% 50% at 50% 100%, rgb(225 29 140 / 0.08) 0%, transparent 55%)',
        'signal-line': 'linear-gradient(90deg, transparent, rgb(0 113 227 / 0.55), transparent)',
        'grid-fine':
          'linear-gradient(to right, rgb(29 29 31 / 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgb(29 29 31 / 0.035) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-cell': '64px 64px',
      },
      transitionTimingFunction: {
        expressive: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        'node-glow': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        'signal-dash': {
          from: { strokeDashoffset: '0' },
          to: { strokeDashoffset: '-16' },
        },
        'fade-rise': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'node-glow': 'node-glow 4.2s ease-in-out infinite',
        'signal-dash': 'signal-dash 2.4s linear infinite',
        'fade-rise': 'fade-rise 0.55s cubic-bezier(0.25, 0.1, 0.25, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
