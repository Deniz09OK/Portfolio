<script setup lang="ts">
import type { LangCode } from '~/types/portfolio'

interface HtbBox {
  name: string
  difficulty: string
  os: string
  solved: 'root' | 'user'
  solvedAt: string | null
}
interface HtbData {
  updatedAt: string
  profile: {
    name: string
    rank: string
    nextRank: string | null
    rankProgress: number | null
    points: number
    globalRanking: number | null
    systemOwns: number
    userOwns: number
    bloods: number
    url: string
  }
  boxes: HtbBox[]
  season: {
    name: string
    league: string
    rank: number
    totalPlayers: number
    points: number
    nextLeague: string | null
    flags: { obtained: number; total: number }
  } | null
}

const content = usePortfolio()
const { lang } = useLang()
const htb = computed(() => content.value.htb)
const t = computed(() => htb.value.labels)

// Written by scripts/fetch-htb.mjs (see .github/workflows/htb-sync.yml). Read from disk while the page is
// prerendered (an HTTP self-request deadlocks the dev server), fetched in the browser otherwise.
// A missing or empty file gives null, which renders the fallback state.
const { data: raw } = await useAsyncData<HtbData | null>('htb-stats', async () => {
  try {
    if (import.meta.server) {
      const { readFile } = await import('node:fs/promises')
      const { join } = await import('node:path')
      return JSON.parse(await readFile(join(process.cwd(), 'public', 'data', 'htb.json'), 'utf8'))
    }
    return await $fetch<HtbData>('/data/htb.json')
  } catch {
    return null
  }
})
const data = computed(() => (raw.value?.profile ? raw.value : null))
const profileUrl = computed(() => data.value?.profile.url ?? 'https://app.hackthebox.com/users/4005432')

const LOCALES: Record<LangCode, string> = { fr: 'fr-FR', en: 'en-GB', tr: 'tr-TR' }
// Fixed UTC time zone: the prerendered HTML and the browser must print the same text.
function fmt(iso: string | null, withTime = false) {
  if (!iso) return t.value.noDate
  return new Intl.DateTimeFormat(LOCALES[lang.value], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' } : {}),
    timeZone: 'UTC',
  }).format(new Date(iso))
}
const num = (n: number) => new Intl.NumberFormat(LOCALES[lang.value]).format(n)
// Short day + month ("7 oct.") for the latest-machine tile, in the same fixed UTC time zone as fmt().
const dayMonth = (iso: string) =>
  new Intl.DateTimeFormat(LOCALES[lang.value], { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(iso))

const solvedCount = computed(() => data.value?.boxes.filter((b) => b.solved === 'root').length ?? 0)
// Rank, points and global ranking are left out on purpose: the tiles show practice, not a beginner score.
const tiles = computed(() => {
  const d = data.value
  if (!d) return []
  const p = d.profile
  // Root machines per OS, most first; ties sorted by name so the prerendered HTML and the browser agree.
  const perOs = new Map<string, number>()
  for (const b of d.boxes) if (b.solved === 'root') perOs.set(b.os, (perOs.get(b.os) ?? 0) + 1)
  const systems = [...perOs].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  // Most recently solved machine, root or user (boxes without a date are skipped).
  // OS and machine names are English proper nouns: lang="en" keeps them out of Turkish uppercasing (i → İ).
  const latest = d.boxes
    .filter((b): b is HtbBox & { solvedAt: string } => !!b.solvedAt)
    .sort((a, b) => b.solvedAt.localeCompare(a.solvedAt))[0]
  return [
    { k: t.value.boxes, v: String(solvedCount.value), sub: `USER ${p.userOwns} · ROOT ${p.systemOwns}` },
    ...(systems.length
      ? [{ k: systems.map(([os]) => os).join(' / '), kLang: 'en', v: systems.map(([, n]) => n).join(' / '), sub: t.value.systemsSub }]
      : []),
    ...(latest ? [{ k: t.value.latest, v: dayMonth(latest.solvedAt), sub: latest.name, subLang: 'en' }] : []),
    ...(p.bloods > 0 ? [{ k: t.value.bloods, v: String(p.bloods), sub: '' }] : []),
  ]
})

const season = computed(() => data.value?.season ?? null)
const seasonPct = computed(() => {
  const f = season.value?.flags
  return f && f.total ? Math.round((f.obtained / f.total) * 100) : 0
})
const diffClass = (d: string) => `htb-diff--${d.toLowerCase().replace(/[^a-z]/g, '')}`
</script>

<template>
  <section class="htb" id="htb">
    <div class="container">
      <span class="section-label">{{ content.sectionLabels.htb }}</span>
      <h2 class="display">{{ htb.title }}</h2>
      <p class="display-sub htb-sub">{{ htb.sub }}</p>

      <template v-if="data">
        <ul class="htb-tiles" :aria-label="t.statsLabel">
          <li v-for="tile in tiles" :key="tile.k" v-reveal class="htb-tile">
            <span class="htb-tile-k" :lang="tile.kLang">{{ tile.k }}</span>
            <span class="htb-tile-v">{{ tile.v }}</span>
            <span v-if="tile.sub" class="htb-tile-sub" :lang="tile.subLang">{{ tile.sub }}</span>
          </li>
        </ul>

        <div class="htb-grid">
          <article v-if="season" v-reveal class="htb-season" aria-labelledby="htbSeasonTitle">
            <header class="htb-season-head">
              <span id="htbSeasonTitle" class="htb-box-title">{{ t.season }} · {{ season.name }}</span>
              <span class="htb-league">{{ season.league }}</span>
            </header>
            <p class="htb-season-flags">
              <span class="htb-season-flags-v">{{ season.flags.obtained }}</span>
              <span class="htb-season-flags-of">/ {{ season.flags.total }} {{ t.seasonFlags }}</span>
            </p>
            <dl class="htb-season-stats">
              <div>
                <dt>{{ t.seasonPoints }}</dt>
                <dd>{{ num(season.points) }}</dd>
              </div>
              <div v-if="season.nextLeague">
                <dt>{{ t.nextLeague }}</dt>
                <dd>{{ season.nextLeague }}</dd>
              </div>
            </dl>
            <div
              class="htb-meter"
              role="progressbar"
              :aria-label="t.seasonFlags"
              aria-valuemin="0"
              :aria-valuemax="season.flags.total"
              :aria-valuenow="season.flags.obtained"
            >
              <span class="htb-meter-fill" :style="{ width: `${seasonPct}%` }"></span>
            </div>
          </article>

          <section v-reveal class="htb-boxes" aria-labelledby="htbBoxesTitle">
            <h3 id="htbBoxesTitle" class="htb-box-title">{{ t.boxesTitle }} · {{ data.boxes.length }}</h3>
            <ul class="htb-list">
              <li class="htb-row htb-row--head" aria-hidden="true">
                <span>{{ t.colBox }}</span>
                <span>{{ t.colDifficulty }}</span>
                <span>{{ t.colOs }}</span>
                <span>{{ t.colFlag }}</span>
                <span>{{ t.colDate }}</span>
              </li>
              <li v-for="b in data.boxes" :key="b.name" class="htb-row">
                <span class="htb-name">{{ b.name }}</span>
                <span class="htb-cell" :data-label="t.colDifficulty">
                  <span class="htb-diff" :class="diffClass(b.difficulty)">{{ b.difficulty }}</span>
                </span>
                <span class="htb-cell" :data-label="t.colOs">{{ b.os }}</span>
                <span class="htb-cell" :data-label="t.colFlag">
                  <span class="htb-flag" :class="`htb-flag--${b.solved}`">{{ b.solved === 'root' ? t.root : t.user }}</span>
                </span>
                <span class="htb-cell htb-date" :data-label="t.colDate">
                  <time v-if="b.solvedAt" :datetime="b.solvedAt">{{ fmt(b.solvedAt) }}</time>
                  <template v-else>{{ t.noDate }}</template>
                </span>
              </li>
            </ul>
          </section>
        </div>

        <p class="htb-foot">
          <span>{{ t.updated }} : <time :datetime="data.updatedAt">{{ fmt(data.updatedAt, true) }}</time></span>
          <a class="drill-proof htb-link" :href="profileUrl" target="_blank" rel="noopener">{{ t.profile }} <span>↗</span></a>
        </p>
      </template>

      <div v-else class="htb-empty" role="status">
        <p>{{ t.empty }}</p>
        <a class="drill-proof htb-link" :href="profileUrl" target="_blank" rel="noopener">{{ t.emptyLink }} <span>↗</span></a>
      </div>
    </div>
  </section>
</template>
