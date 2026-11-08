/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        surface: 'var(--surface)',
        body: 'var(--body)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        brand: 'var(--brand)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        forest: '#123D2D',
        'forest-deep': '#09271E',
        amber: '#D98B35',
        cream: '#F6F2E9',
        ink: '#202923',
        moss: '#71866A',
        sand: '#E7D8BC',
        gold: '#B99A62',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        bengali: 'var(--font-bengali)',
      },
      fontSize: {
        'step--1': 'var(--step--1)',
        'step-0': 'var(--step-0)',
        'step-1': 'var(--step-1)',
        'step-2': 'var(--step-2)',
        'step-3': 'var(--step-3)',
        'step-4': 'var(--step-4)',
        'step-5': 'var(--step-5)',
        'step-6': 'var(--step-6)',
      },
      maxWidth: {
        shell: '1440px',
        prose: '68ch',
      },
      letterSpacing: {
        label: '0.18em',
        wide2: '0.12em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      screens: {
        xs: '480px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}
