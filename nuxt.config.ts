// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  devtools: { enabled: true },

  modules: ['@nuxt/image'],

  // Dark canvas by default — set before hydration to avoid a flash.
  app: {
    head: {
      title: 'Deniz OK — Portfolio',
      htmlAttrs: { lang: 'fr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio de Deniz OK, Ingénieur Cybersécurité & Cloud et Développeur.' },
        { name: 'author', content: 'Deniz OK' },
        { name: 'theme-color', content: '#0c0c10' },
        { property: 'og:title', content: 'Deniz OK — Portfolio' },
        { property: 'og:description', content: 'Portfolio de Deniz OK, Ingénieur Cybersécurité & Cloud et Développeur.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/portrait.jpg' },
        { property: 'og:url', content: 'https://portfolio-deniz.netlify.app/' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Deniz OK — Portfolio' },
        { name: 'twitter:description', content: 'Portfolio de Deniz OK, Ingénieur Cybersécurité & Cloud et Développeur.' },
        { name: 'twitter:image', content: '/portrait.jpg' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=Noto+Serif+JP:wght@400;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap',
        },
      ],
    },
  },

  // Global stylesheet (the original arena design system).
  css: ['~/assets/css/arena.css'],

  // Pure static front-end — no server runtime needed. `nuxt generate`
  // produces a fully static site for Netlify / Vercel / GitHub Pages.
  ssr: true,
})
