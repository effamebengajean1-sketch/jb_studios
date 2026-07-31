import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // === NOIR DOUX ===
        background: '#141414',
        'on-background': '#E8E6E1',
        'on-surface': '#E8E6E1',
        'on-surface-variant': '#B8B5B0',

        // === ROUGE DOUX (au lieu de D91E1E) ===
        'primary-container': '#C62828',
        'on-primary-container': '#FFFFFF',
        'brand-red': '#C62828',
        'brand-red-dark': '#8E0000',
        'brand-red-light': '#EF5350',

        // === GRIS / SURFACES ===
        'surface-container-low': '#1E1E1E',
        'surface-container': '#222222',
        'surface-container-high': '#2A2A2A',
        'outline-variant': '#333333',

        // === COMPATIBILITÉ ===
        'brand-black': '#141414',
        'brand-white': '#E8E6E1',
      },
      fontFamily: {
        'headline-lg-mobile': ['Bebas Neue', 'sans-serif'],
        'headline-md': ['Bebas Neue', 'sans-serif'],
        'display-lg': ['Bebas Neue', 'sans-serif'],
        'display-xl': ['Anton', 'sans-serif'],
        'display-impact': ['Anton', 'Bebas Neue', 'sans-serif'],
        'body-md': ['Hanken Grotesk', 'sans-serif'],
        'body-lg': ['Hanken Grotesk', 'sans-serif'],
        'label-caps': ['Hanken Grotesk', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'headline-lg-mobile': ['48px', { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '400' }],
        'headline-md': ['32px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '400' }],
        'display-lg': ['96px', { lineHeight: '1.0', letterSpacing: '0.02em', fontWeight: '400' }],
        'display-xl': ['120px', { lineHeight: '1.0', letterSpacing: '0.03em', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', letterSpacing: '0px', fontWeight: '400' }],
        'body-lg': ['20px', { lineHeight: '1.8', letterSpacing: '0.01em', fontWeight: '300' }],
        'label-caps': ['12px', { lineHeight: '1.2', letterSpacing: '0.3em', fontWeight: '700' }],
      },
      spacing: {
        gutter: '24px',
        'section-padding-sm': '64px',
        'section-padding-lg': '120px',
        unit: '8px',
        'container-max': '1440px',
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}