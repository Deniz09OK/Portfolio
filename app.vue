<script setup lang="ts">
// Single-page portfolio. All sections are auto-imported components.
const content = usePortfolio()
const { lang } = useLang()

// Single page: any other path (GitHub Pages serves 404.html for it) renders error.vue.
const path = import.meta.server ? useRequestURL().pathname : window.location.pathname
if (!['/', '/index.html'].includes(path)) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

// SEO / document head, reactive to the active language.
useHead(() => ({
  htmlAttrs: { lang: lang.value },
  title: 'Deniz OK — Portfolio',
  meta: [
    { name: 'description', content: content.value.seoDescription },
    { name: 'theme-color', content: '#0c0c10' },
    { property: 'og:title', content: 'Deniz OK — Portfolio' },
    { property: 'og:description', content: content.value.seoDescription },
    { name: 'twitter:title', content: 'Deniz OK — Portfolio' },
    { name: 'twitter:description', content: content.value.seoDescription },
  ],
}))
</script>

<template>
  <div>
    <TopBar />
    <LiveTicker />

    <main id="top">
      <HeroCard />
      <MatchesSection />
      <CareerSection />
      <DrillsSection />
      <OffCourtSection />
      <LanguagesSection />
      <ContactSection />
    </main>
  </div>
</template>
