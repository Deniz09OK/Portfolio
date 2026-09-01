// https://nuxt.com/docs/api/configuration/nuxt-config
// Configured for GitHub Pages deployment
export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  devtools: { enabled: true },

  modules: ['@nuxt/image'],

app: {
    baseURL: '/',    
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
        { property: 'og:image', content: 'https://portfolio-deniz.me/portrait.jpg' },
        { property: 'og:url', content: 'https://portfolio-deniz.me/' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Deniz OK — Portfolio' },
        { name: 'twitter:description', content: 'Portfolio de Deniz OK, Ingénieur Cybersécurité & Cloud et Développeur.' },
        { name: 'twitter:image', content: 'https://portfolio-deniz.me/portrait.jpg' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%226%22 fill=%22%230c0c10%22/%3E%3Ctext x=%2216%22 y=%2222%22 font-family=%22Arial,Helvetica,sans-serif%22 font-weight=%22700%22 font-size=%2215%22 fill=%22%23fff%22 text-anchor=%22middle%22%3E23%3C/text%3E%3C/svg%3E',
        },
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
