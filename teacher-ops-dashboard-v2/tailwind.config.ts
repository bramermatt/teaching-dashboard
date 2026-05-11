import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ops: {
          bg: '#05080f',
          panel: '#0b1324',
          panel2: '#121e34',
          border: '#1f345a',
          text: '#d6e8ff',
          muted: '#7f9bc2',
          accent: '#57b8ff',
          warn: '#ffb547',
          danger: '#ff6b6b',
          ok: '#5cd390'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px #1f345a, 0 0 18px rgba(87,184,255,.12)'
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Cascadia Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      }
    }
  },
  plugins: []
} satisfies Config;
