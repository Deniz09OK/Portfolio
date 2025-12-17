import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // Désactiver le SSR pour éviter les erreurs d'hydration
  ssr: false,
  
  // Configuration pour GitHub Pages
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/',
    head: {
      title: 'Portfolio de Deniz OK',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio de Deniz OK - Développeur Full Stack' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  css: [
    '~/assets/css/main.css',
    '~/assets/css/components.css',
    '~/assets/css/timeline.css',
    '~/assets/css/animations.css',
    '~/assets/css/theme-optimization.css'
  ],

  // Ensure auto-imports are enabled
  imports: {
    autoImport: true
  }
})