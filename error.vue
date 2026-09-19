<script setup lang="ts">
// Rendered for unknown URLs (prerendered as 404.html for GitHub Pages).
const { lang } = useLang()

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
      <a class="contact-email" href="/"><span>{{ t.cta }}</span><span class="cta-arr">→</span></a>
    </div>
  </main>
</template>
