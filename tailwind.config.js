/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        band: 'rgb(var(--band) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        // Kept so existing border-border call sites resolve to the hairline.
        border: 'rgb(var(--rule) / <alpha-value>)',
        emphasis: 'rgb(var(--emphasis) / <alpha-value>)',
        'on-emphasis': 'rgb(var(--on-emphasis) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-text': 'rgb(var(--accent-text) / <alpha-value>)',
        'accent-fill': 'rgb(var(--accent-fill) / <alpha-value>)',
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        mono: ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.4' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.1' }],
        '5xl': ['3rem', { lineHeight: '1.05' }],
        '6xl': ['3.75rem', { lineHeight: '1.02' }],
        metric: ['2.25rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
