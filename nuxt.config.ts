export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/images/logo/logo.jpeg' }
      ]
    }
  },

  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    { path: '~/components/gallery', pathPrefix: false },
    { path: '~/components/forms', pathPrefix: false },
    { path: '~/components/integrations', pathPrefix: false },
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/content',
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      // Polices principales
      'Playfair Display': [400, 600, 700],
      'Inter': [400, 500, 600, 700],
      'Bebas Neue': [400],
      'Hanken Grotesk': [300, 400, 700],
      'Anton': [400],
    },
    display: 'swap'
  },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    recaptchaSecret: process.env.RECAPTCHA_SECRET,
    public: {
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      gaId: process.env.NUXT_PUBLIC_GA_ID,
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
    }
  },

  nitro: {
    preset: 'vercel'
  },

  typescript: {
    strict: true
  },

  image: {
    provider: 'none'
  },

  plugins: [
    { src: '~/plugins/gsap.client.ts', mode: 'client' }
  ],

  content: {
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    },
    highlight: {
      theme: 'github-dark'
    }
  }
})
