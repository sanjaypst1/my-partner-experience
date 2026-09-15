import type { Config } from 'tailwindcss';

/**
 * Bright, high-contrast design system: soft paper substrate, deep ink text,
 * saturated signal accents for structure and storytelling.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          // Kept as the "page substrate" token name so components stay stable —
          // values are now bright paper tones for readability.
          950: '#f5f7fb',
          900: '#eef1f7',
          850: '#ffffff',
          800: '#e3e8f2',
          700: '#d0d7e6',
          600: '#b8c1d4',
        },
        signal: {
          cyan: '#0b8f9c',
          violet: '#5a3fd4',
          magenta: '#c0267a',
          amber: '#b86a0d',
        },
        slateMuted: {
          100: '#0f1729',
          200: '#243044',
          300: '#3d4a63',
          400: '#5a6780',
          500: '#7a869c',
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
        glass: '0 1px 0 0 rgb(255 255 255 / 0.7) inset, 0 18px 40px -28px rgb(15 23 41 / 0.22)',
        glow: '0 0 0 1px rgb(11 143 156 / 0.28), 0 14px 36px -18px rgb(11 143 156 / 0.35)',
        focus: '0 0 0 3px rgb(245 247 251 / 1), 0 0 0 6px rgb(11 143 156 / 0.85)',
      },
      backgroundImage: {
        'ecosystem-radial':
          'radial-gradient(120% 90% at 12% 8%, rgb(90 63 212 / 0.12) 0%, transparent 55%), radial-gradient(100% 80% at 92% 12%, rgb(11 143 156 / 0.12) 0%, transparent 52%), radial-gradient(90% 70% at 60% 105%, rgb(192 38 122 / 0.08) 0%, transparent 60%)',
        'signal-line': 'linear-gradient(90deg, transparent, rgb(11 143 156 / 0.75), transparent)',
        'grid-fine':
          'linear-gradient(to right, rgb(15 23 41 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 23 41 / 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-cell': '58px 58px',
      },
      transitionTimingFunction: {
        expressive: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'node-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
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
