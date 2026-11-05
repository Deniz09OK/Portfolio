<script setup lang="ts">
import { LANG_PATHS, OG_LOCALES, SITE_LANGS, SITE_URL, isKnownPagePath } from '~/shared/site'

// Single-page portfolio. All sections are auto-imported components.
const content = usePortfolio()
const { lang } = useLang()

// One page per language (/, /en/, /tr/): any other path (GitHub Pages serves 404.html for it) renders error.vue.
const path = import.meta.server ? useRequestURL().pathname : window.location.pathname
if (!isKnownPagePath(path)) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

// Structured data (schema.org Person), in the language of the page. A JSON block is data, not a script:
// the CSP needs no hash for it (server/plugins/csp.ts only hashes executable scripts).
function personJsonLd(url: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Deniz OK',
    jobTitle: content.value.seoJobTitle,
    description: content.value.seoDescription,
    affiliation: { '@type': 'EducationalOrganization', name: 'Epitech Nancy' },
    url,
    image: `${SITE_URL}/portrait.jpg`,
    sameAs: ['https://github.com/Deniz09OK', 'https://www.linkedin.com/in/deniz-ok/'],
    knowsLanguage: ['fr', 'en', 'tr'],
  })
}

// SEO / document head, reactive to the active language: each language page (/, /en/, /tr/) points to itself as
// canonical and lists the two others as alternates (hreflang), with x-default on the root.
useHead(() => {
  const url = SITE_URL + LANG_PATHS[lang.value]
  // One Open Graph image per language (scripts/og-images.mjs), as an absolute URL.
  const image = `${SITE_URL}/og/og-${lang.value}.png`
  const others = SITE_LANGS.filter((l) => l !== lang.value)
  return {
    htmlAttrs: { lang: lang.value },
    title: content.value.seoTitle,
    script: [{ type: 'application/ld+json', key: 'ld-person', innerHTML: personJsonLd(url) }],
    link: [
      { rel: 'canonical', href: url, key: 'canonical' },
      ...SITE_LANGS.map((l) => ({ rel: 'alternate', hreflang: l, href: SITE_URL + LANG_PATHS[l], key: `alternate-${l}` })),
      { rel: 'alternate', hreflang: 'x-default', href: SITE_URL + LANG_PATHS.fr, key: 'alternate-x-default' },
    ],
    meta: [
      { name: 'description', content: content.value.seoDescription },
      { name: 'theme-color', content: '#0c0c10' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:title', content: content.value.seoTitle },
      { property: 'og:description', content: content.value.seoDescription },
      { property: 'og:locale', content: OG_LOCALES[lang.value] },
      ...others.map((l) => ({ property: 'og:locale:alternate', content: OG_LOCALES[l], key: `og:locale:alternate-${l}` })),
      { property: 'og:image', content: image },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: content.value.ogImageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: content.value.ogImageAlt },
      { name: 'twitter:title', content: content.value.seoTitle },
      { name: 'twitter:description', content: content.value.seoDescription },
    ],
  }
})
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
      <HtbStats />
      <ThmStats />
      <OffCourtSection />
      <LanguagesSection />
      <ContactSection />
    </main>
    <BackToTop />
  </div>
</template>
