/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base:    '#080808',
        s1:      '#0f0f0f',
        s2:      '#171717',
        s3:      '#242424',
        border:  '#565656',
        ghost:   '#2a2a2a',
        text:    '#f5f5f5',
        muted:   '#5c5c5c',
        indigo:  '#473198',
        'indigo-dim': 'rgba(71,49,152,0.12)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        mono:    ['"Geist Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': 'clamp(5rem, 16vw, 14rem)',
        'display-lg': 'clamp(3rem, 8vw, 7rem)',
        'display-md': 'clamp(2rem, 4vw, 3.5rem)',
      },
      borderRadius: {
        card:  '16px',
        stack: '12px',
        pill:  '9999px',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
        tight:    '-0.02em',
        mono:     '0.06em',
        wide:     '0.12em',
      },
    },
  },
  plugins: [],
}