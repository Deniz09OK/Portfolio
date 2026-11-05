// https://nuxt.com/docs/api/configuration/nuxt-config
// Configured for GitHub Pages deployment
export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  devtools: { enabled: false },

  modules: ['@nuxt/image'],

  app: {
    baseURL: '/',
    head: {
      title: 'Deniz OK — Portfolio',
      htmlAttrs: { lang: 'fr' },
      // Apply the saved theme before first paint, so light-mode visitors never see the dark page flash.
      // Must stay in sync with STORAGE_KEY in composables/useTheme.ts.
      script: [
        {
          innerHTML: "try{if(localStorage.getItem('deniz-arena-theme')==='light')document.documentElement.classList.add('light')}catch(e){}",
          tagPriority: 'critical',
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: "Deniz OK — alternant en cybersécurité & développement web, MSc à Epitech Nancy. Disponible dès maintenant jusqu'en 09/2027, Grand Est & Luxembourg." },
        { name: 'author', content: 'Deniz OK' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { name: 'theme-color', content: '#0c0c10' },
        { property: 'og:title', content: 'Deniz OK — Portfolio' },
        { property: 'og:description', content: "Deniz OK — alternant en cybersécurité & développement web, MSc à Epitech Nancy. Disponible dès maintenant jusqu'en 09/2027, Grand Est & Luxembourg." },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://portfolio-deniz.me/portrait.jpg' },
        { property: 'og:url', content: 'https://portfolio-deniz.me/' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Deniz OK — Portfolio' },
        { name: 'twitter:description', content: "Deniz OK — alternant en cybersécurité & développement web, MSc à Epitech Nancy. Disponible dès maintenant jusqu'en 09/2027, Grand Est & Luxembourg." },
        { name: 'twitter:image', content: 'https://portfolio-deniz.me/portrait.jpg' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%226%22 fill=%22%230c0c10%22/%3E%3Ctext x=%2216%22 y=%2222%22 font-family=%22Arial,Helvetica,sans-serif%22 font-weight=%22700%22 font-size=%2215%22 fill=%22%23fff%22 text-anchor=%22middle%22%3E23%3C/text%3E%3C/svg%3E',
        },
        { rel: 'canonical', href: 'https://portfolio-deniz.me/' },
      ],
    },
  },

  // Global stylesheet (the original arena design system).
  css: ['~/assets/css/arena.css'],

  // Pure static front-end — no server runtime needed. `nuxt generate`
  // produces a fully static site for Netlify / Vercel / GitHub Pages.
  ssr: true,

  // GitHub Pages serves 404.html for unknown URLs. Nuxt always prerenders /404.html as an
  // empty SPA shell, so render /404 (error.vue, server-side) and write it to 404.html instead.
  nitro: {
    // /en/ and /tr/: the same page, prerendered in English and Turkish (the language comes from the URL).
    prerender: { routes: ['/404', '/en/', '/tr/'] },
  },
  hooks: {
    'nitro:init'(nitro) {
      nitro.hooks.hook('prerender:generate', (route: { route: string; skip?: boolean; error?: unknown; fileName?: string }) => {
        if (route.route === '/404.html') route.skip = true
        if (route.route === '/404') {
          route.error = undefined
          route.fileName = '404.html'
        }
      })
    },
  },

  // The payload preload was never used on this single static page and triggered
  // a console warning in Safari and Firefox.
  experimental: {
    payloadExtraction: false,
  },
})
