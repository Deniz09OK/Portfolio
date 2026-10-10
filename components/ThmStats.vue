<script setup lang="ts">
import type { LangCode } from '~/types/portfolio'

const content = usePortfolio()
const { lang } = useLang()
const thm = computed(() => content.value.thm)
const t = computed(() => thm.value.labels)

// Written by scripts/fetch-thm.mjs (see .github/workflows/htb-sync.yml); read like HtbStats reads htb.json.
// A missing or invalid file gives null, which renders the fallback state.
const data = await useThm()
const PROFILE_URL = 'https://tryhackme.com/p/Deniz23Ok'

const LOCALES: Record<LangCode, string> = { fr: 'fr-FR', en: 'en-GB', tr: 'tr-TR' }
// Fixed UTC time zone: the prerendered HTML and the browser must print the same text.
function fmt(iso: string) {
  return new Intl.DateTimeFormat(LOCALES[lang.value], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
    timeZone: 'UTC',
  }).format(new Date(iso))
}
const num = (n: number) => new Intl.NumberFormat(LOCALES[lang.value]).format(n)
// "15 %" (fr), "15%" (en), "%15" (tr): the percent sign follows each locale, next to the "Top" / "İlk" label.
const pct = (n: number) => new Intl.NumberFormat(LOCALES[lang.value], { style: 'percent', maximumFractionDigits: 1 }).format(n / 100)

// Only fields of thm.json are shown. The streak, the league and the avatar are never stored nor displayed.
const tiles = computed(() => {
  const d = data.value
  if (!d) return []
  return [
    { k: t.value.rooms, v: num(d.rooms) },
    { k: t.value.top, v: pct(d.topPercent) },
    { k: t.value.level, v: num(d.level) },
    { k: t.value.badges, v: num(d.badges) },
    { k: t.value.points, v: num(d.points) },
  ]
})
</script>

<template>
  <section class="htb thm" id="thm">
    <div class="container">
      <span class="section-label">{{ content.sectionLabels.thm }}</span>
      <h2 class="display">{{ thm.title }}</h2>
      <p class="display-sub htb-sub">{{ thm.sub }}</p>

      <template v-if="data">
        <ul class="htb-tiles" :aria-label="t.statsLabel">
          <li v-for="tile in tiles" :key="tile.k" v-reveal class="htb-tile">
            <span class="htb-tile-k">{{ tile.k }}</span>
            <span class="htb-tile-v">{{ tile.v }}</span>
          </li>
        </ul>

        <p class="htb-foot">
          <span>{{ t.updated }} : <time :datetime="data.updatedAt">{{ fmt(data.updatedAt) }}</time></span>
          <a class="drill-proof htb-link" :href="PROFILE_URL" target="_blank" rel="noopener noreferrer">{{ t.profile }} <span>↗</span></a>
        </p>
      </template>

      <div v-else class="htb-empty" role="status">
        <p>{{ t.empty }}</p>
        <a class="drill-proof htb-link" :href="PROFILE_URL" target="_blank" rel="noopener noreferrer">{{ t.emptyLink }} <span>↗</span></a>
      </div>
    </div>
  </section>
</template>
