import { execSync } from 'node:child_process'

/**
 * Date of the last commit (ISO 8601), for the sitemap lastmod. Works with the shallow checkout of GitHub Actions
 * (the HEAD commit is always there); falls back to the build date when git or the history is unavailable.
 */
function lastCommitDate(): string {
  try {
    const date = execSync('git log -1 --format=%cI', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
    if (date && !Number.isNaN(Date.parse(date))) return date
  } catch { /* no git: build date below */ }
  return new Date().toISOString()
}

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
        { name: 'author', content: 'Deniz OK' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { name: 'theme-color', content: '#0c0c10' },
        // Title, description, canonical, hreflang and Open Graph tags (text and image) are set per language page in app.vue.
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%226%22 fill=%22%230c0c10%22/%3E%3Ctext x=%2216%22 y=%2222%22 font-family=%22Arial,Helvetica,sans-serif%22 font-weight=%22700%22 font-size=%2215%22 fill=%22%23fff%22 text-anchor=%22middle%22%3E23%3C/text%3E%3C/svg%3E',
        },
      ],
    },
  },

  // Server-only (not "public"): never sent to the browser. Read by server/routes/sitemap.xml.ts at prerender time.
  runtimeConfig: {
    sitemapLastmod: lastCommitDate(),
    public: {
      // Whether /api/scoreboard exists (the Hall of Fame of the HTB challenge). True with a Nitro server
      // (`nuxt dev`, `nuxt build`); forced to false by the nitro:config hook below for `nuxt generate`, where no
      // API is deployed: the terminal then never calls the route and hides the pseudo form and the leaderboard.
      scoreboardApi: true,
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
    prerender: { routes: ['/404', '/en/', '/tr/', '/sitemap.xml'] },
  },
  hooks: {
    // `nuxt generate` is `nuxt build` with nitro.static: a static site has no server routes, so no scoreboard API.
    'nitro:config'(nitroConfig) {
      if (nitroConfig.static && nitroConfig.runtimeConfig?.public) nitroConfig.runtimeConfig.public.scoreboardApi = false
    },
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
