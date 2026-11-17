export default defineNuxtConfig({
  compatibilityDate: '2026-07-23',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/google-fonts'
  ],

  supabase: {
    redirect: false
  },

  googleFonts: {
    families: {
      Orbitron: [600, 700, 800],
      'Space Grotesk': [400, 500, 600, 700],
      'Fira Code': [400, 500, 600]
    },
    display: 'swap',
    preconnect: true,
    prefetch: true,
    useStylesheet: true,
    download: false
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'SUKUROS',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#05080c' },
        {
          name: 'description',
          content: 'SUKUR.OS — Personal Cyber-Feline OS Portal, Original Characters, Zwasonia Lore & Media Archives.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://api.iconify.design', crossorigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://api.iconify.design' }
      ]
    },
    pageTransition: {
      name: 'os-page',
      mode: 'out-in'
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    }
  }
})
