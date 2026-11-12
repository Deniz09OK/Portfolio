<script setup lang="ts">
import { LANG_PATHS, SITE_LANGS, langFromFirstSegment, type SiteLang } from '~/shared/site'

// Rendered for unknown URLs (prerendered as 404.html for GitHub Pages).
//
// GitHub Pages serves this one prerendered file for every unknown URL, so its HTML is always in French. The
// language is then picked in the browser, once mounted: the first segment of the path (/en/..., /tr/...), else
// the language the visitor chose on the site, else French. It does not go through useLang(), which would rewrite
// the address to /en/ or /tr/ and hide the URL that was not found.
const lang = ref<SiteLang>('fr')
onMounted(() => {
  let saved: string | null = null
  try {
    saved = localStorage.getItem('deniz-arena-lang')
  } catch { /* storage unavailable: French */ }
  lang.value =
    langFromFirstSegment(window.location.pathname) ??
    (SITE_LANGS.includes(saved as SiteLang) ? (saved as SiteLang) : 'fr')
})
const home = computed(() => LANG_PATHS[lang.value])

const t = computed(() => ({
  fr: { title: 'Hors du terrain', lead: 'Cette page n’existe pas.', cta: 'Retour à l’accueil' },
  en: { title: 'Out of bounds', lead: 'This page does not exist.', cta: 'Back to home' },
  tr: { title: 'Saha dışı', lead: 'Bu sayfa mevcut değil.', cta: 'Ana sayfaya dön' },
}[lang.value]))

useHead(() => ({
  htmlAttrs: { lang: lang.value },
  title: `404 — ${t.value.title} · Deniz OK`,
  meta: [{ name: 'robots', content: 'noindex' }],
}))
</script>

<template>
  <main class="contact">
    <div class="container">
      <h1 class="contact-title">404</h1>
      <p class="contact-lead">{{ t.title }} — {{ t.lead }}</p>
      <a class="contact-email" :href="home"><span>{{ t.cta }}</span><span class="cta-arr" aria-hidden="true">→</span></a>
    </div>
  </main>
</template>
