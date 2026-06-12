<script setup lang="ts">
// Single-page portfolio. All sections are auto-imported components.
const content = usePortfolio()
const { lang } = useLang()

// SEO / document head, reactive to the active language.
useHead(() => ({
  htmlAttrs: { lang: lang.value },
  title: 'Deniz OK - Portfolio',
  meta: [
    { name: 'description', content: content.value.hero.bio },
    { name: 'theme-color', content: '#0a0a0a' },
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

    <MusicPlayer />
  </div>
</template>
