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
// Short day + month ("7 oct.") for the table rows and the latest-machine cell, in the same fixed UTC time zone as fmt().
const dayMonth = (iso: string) =>
  new Intl.DateTimeFormat(LOCALES[lang.value], { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(iso))

// Rank, points and global ranking are left out on purpose: the band shows practice, not a beginner score.
// Machines rooted, most recent first (boxes without a date last); the ones only owned at user level are "in progress".
const rooted = computed(() =>
  (data.value?.boxes ?? [])
    .filter((b) => b.solved === 'root')
    .sort((a, b) => (b.solvedAt ?? '').localeCompare(a.solvedAt ?? '') || a.name.localeCompare(b.name)),
)
const pending = computed(() => (data.value?.boxes ?? []).filter((b) => b.solved !== 'root'))

const DIFFICULTIES = ['easy', 'medium', 'hard', 'insane']
const diffRank = (d: string) => {
  const i = DIFFICULTIES.indexOf(d.toLowerCase())
  return i === -1 ? DIFFICULTIES.length : i
}
const diffClass = (d: string) => `htb-diff--${d.toLowerCase().replace(/[^a-z]/g, '')}`

/** Counts the values of one box field, ordered by `cmp`; ties are sorted by name so the prerendered HTML and the browser agree. */
function tally(values: string[], cmp: (a: [string, number], b: [string, number]) => number) {
  const counts = new Map<string, number>()
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1)
  return [...counts].sort((a, b) => cmp(a, b) || a[0].localeCompare(b[0])).map(([label, count]) => ({ label, count }))
}
// Repartition of the rooted machines, drawn as a small bar: difficulties from easiest to hardest, systems most first.
const diffSplit = computed(() =>
  tally(rooted.value.map((b) => b.difficulty), (a, b) => diffRank(a[0]) - diffRank(b[0])).map((s) => ({ ...s, cls: diffClass(s.label) })),
)
const osSplit = computed(() =>
  tally(rooted.value.map((b) => b.os), (a, b) => b[1] - a[1]).map((s, i) => ({ ...s, cls: `htb-os--${Math.min(i, 2)}` })),
)
const splitLabel = (title: string, split: { label: string; count: number }[]) =>
  `${title} : ${split.map((s) => `${s.label} ${s.count}`).join(', ')}`

// Most recently solved machine, root or user (boxes without a date are skipped).
const latest = computed(() =>
  (data.value?.boxes ?? [])
    .filter((b): b is HtbBox & { solvedAt: string } => !!b.solvedAt)
    .sort((a, b) => b.solvedAt.localeCompare(a.solvedAt))[0],
)

// Filters: one value per group (null = all), combined. The chips come from the data, so a new system or
// difficulty adds its own chip; any change goes back to the first page.
const page = ref(0)
const osFilter = ref<string | null>(null)
const levelFilter = ref<string | null>(null)
const filtersActive = computed(() => osFilter.value !== null || levelFilter.value !== null)
const showFilters = computed(() => osSplit.value.length > 1 || diffSplit.value.length > 1)
const filtered = computed(() =>
  rooted.value.filter((b) => (osFilter.value === null || b.os === osFilter.value) && (levelFilter.value === null || b.difficulty === levelFilter.value)),
)
const setOs = (v: string | null) => {
  osFilter.value = v
  page.value = 0
}
const setLevel = (v: string | null) => {
  levelFilter.value = v
  page.value = 0
}
const resetFilters = () => {
  osFilter.value = null
  levelFilter.value = null
  page.value = 0
}

// Pagination: 5 boxes per page. The page is clamped when read, so a shorter list never leaves it out of range.
const PAGE_SIZE = 5
const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const currentPage = computed(() => Math.min(page.value, pageCount.value - 1))
const pageItems = computed(() => filtered.value.slice(currentPage.value * PAGE_SIZE, (currentPage.value + 1) * PAGE_SIZE))
const rangeFrom = computed(() => (filtered.value.length ? currentPage.value * PAGE_SIZE + 1 : 0))
const rangeTo = computed(() => Math.min(filtered.value.length, (currentPage.value + 1) * PAGE_SIZE))
const goTo = (n: number) => {
  page.value = Math.min(Math.max(n, 0), pageCount.value - 1)
}

// Horizontal swipe on touch screens does the same as the arrows (next on a left swipe).
let touchStart: { x: number; y: number } | null = null
const onTouchStart = (e: TouchEvent) => {
  const t = e.changedTouches[0]
  touchStart = { x: t.clientX, y: t.clientY }
}
const onTouchEnd = (e: TouchEvent) => {
  if (!touchStart) return
  const t = e.changedTouches[0]
  const dx = t.clientX - touchStart.x
  const dy = t.clientY - touchStart.y
  touchStart = null
  if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(currentPage.value + (dx < 0 ? 1 : -1))
}

const season = computed(() => data.value?.season ?? null)
const seasonPct = computed(() => {
  const f = season.value?.flags
  return f && f.total ? Math.round((f.obtained / f.total) * 100) : 0
})
</script>

<template>
  <section class="htb" id="htb">
    <div class="container">
      <span class="section-label">{{ content.sectionLabels.htb }}</span>
      <h2 class="display">{{ htb.title }}</h2>
      <p class="display-sub htb-sub">{{ htb.sub }}</p>

      <template v-if="data">
        <ul v-reveal class="htb-band" :aria-label="t.statsLabel">
          <li class="htb-band-cell">
            <span class="htb-band-k">{{ t.boxes }}</span>
            <span class="htb-band-v">{{ rooted.length }}</span>
            <span class="htb-band-sub">
              USER {{ data.profile.userOwns }} · ROOT {{ data.profile.systemOwns }}<template v-if="data.profile.bloods > 0"> · {{ t.bloods }} {{ data.profile.bloods }}</template>
            </span>
          </li>
          <li v-if="diffSplit.length" class="htb-band-cell">
            <span class="htb-band-k">{{ t.colDifficulty }}</span>
            <span class="htb-bar" role="img" :aria-label="splitLabel(t.colDifficulty, diffSplit)">
              <span v-for="s in diffSplit" :key="s.label" class="htb-bar-seg" :class="s.cls" :style="{ flexGrow: s.count }"></span>
            </span>
            <span class="htb-legend" aria-hidden="true">
              <span v-for="s in diffSplit" :key="s.label" class="htb-legend-item" :class="s.cls" lang="en">{{ s.label }} <b>{{ s.count }}</b></span>
            </span>
          </li>
          <li v-if="osSplit.length" class="htb-band-cell">
            <span class="htb-band-k">{{ t.colOs }}</span>
            <span class="htb-bar" role="img" :aria-label="splitLabel(t.colOs, osSplit)">
              <span v-for="s in osSplit" :key="s.label" class="htb-bar-seg" :class="s.cls" :style="{ flexGrow: s.count }"></span>
            </span>
            <span class="htb-legend" aria-hidden="true">
              <span v-for="s in osSplit" :key="s.label" class="htb-legend-item" :class="s.cls" lang="en">{{ s.label }} <b>{{ s.count }}</b></span>
            </span>
          </li>
          <li v-if="latest" class="htb-band-cell">
            <span class="htb-band-k">{{ t.latest }}</span>
            <span class="htb-band-v">{{ dayMonth(latest.solvedAt) }}</span>
            <span class="htb-band-sub" lang="en">{{ latest.name }}</span>
          </li>
          <li v-if="season" class="htb-band-cell htb-band-season">
            <span class="htb-band-k">
              {{ t.season }} · {{ season.name }}
              <span class="htb-league">{{ season.league }}</span>
            </span>
            <span class="htb-season-flags">
              <span class="htb-season-flags-v">{{ season.flags.obtained }}</span>
              <span class="htb-season-flags-of">/ {{ season.flags.total }} {{ t.seasonFlags }}</span>
            </span>
            <span
              class="htb-meter"
              role="progressbar"
              :aria-label="t.seasonFlags"
              aria-valuemin="0"
              :aria-valuemax="season.flags.total"
              :aria-valuenow="season.flags.obtained"
            >
              <span class="htb-meter-fill" :style="{ width: `${seasonPct}%` }"></span>
            </span>
            <span class="htb-band-sub">
              {{ t.points }} {{ num(season.points) }}<template v-if="season.nextLeague"> · {{ t.nextLeague }} {{ season.nextLeague }}</template>
            </span>
          </li>
        </ul>

        <section v-reveal class="htb-boxes" aria-labelledby="htbBoxesTitle" :style="{ '--htb-page': PAGE_SIZE }">
          <div class="htb-boxes-head">
            <h3 id="htbBoxesTitle" class="htb-box-title">{{ t.boxesTitle }} · {{ rooted.length }}</h3>
            <button type="button" class="htb-reset" :class="{ 'is-visible': filtersActive }" @click="resetFilters">{{ t.filterReset }}</button>
          </div>

          <div v-if="pending.length" class="htb-wip">
            <h4 class="htb-box-title">{{ t.inProgress }}</h4>
            <ul class="htb-wip-list">
              <li v-for="b in pending" :key="b.name" class="htb-wip-item">
                <span class="htb-name" lang="en">{{ b.name }}</span>
                <span class="htb-diff" :class="diffClass(b.difficulty)" lang="en">{{ b.difficulty }}</span>
                <span class="htb-os" lang="en">{{ b.os }}</span>
                <span class="htb-flag htb-flag--user">{{ t.user }}</span>
              </li>
            </ul>
          </div>

          <div v-if="showFilters" class="htb-filters">
            <div v-if="osSplit.length > 1" class="htb-filter-group" role="group" aria-labelledby="htbFilterOs">
              <span id="htbFilterOs" class="htb-filter-k">{{ t.filterOs }}</span>
              <button type="button" class="htb-chip" :class="{ 'is-active': osFilter === null }" :aria-pressed="osFilter === null" @click="setOs(null)">{{ t.filterAll }}</button>
              <button
                v-for="o in osSplit"
                :key="o.label"
                type="button"
                class="htb-chip"
                :class="{ 'is-active': osFilter === o.label }"
                :aria-pressed="osFilter === o.label"
                lang="en"
                @click="setOs(o.label)"
              >{{ o.label }}</button>
            </div>
            <div v-if="diffSplit.length > 1" class="htb-filter-group" role="group" aria-labelledby="htbFilterLevel">
              <span id="htbFilterLevel" class="htb-filter-k">{{ t.filterLevel }}</span>
              <button type="button" class="htb-chip" :class="{ 'is-active': levelFilter === null }" :aria-pressed="levelFilter === null" @click="setLevel(null)">{{ t.filterAll }}</button>
              <button
                v-for="d in diffSplit"
                :key="d.label"
                type="button"
                class="htb-chip htb-chip--diff"
                :class="[d.cls, { 'is-active': levelFilter === d.label }]"
                :aria-pressed="levelFilter === d.label"
                lang="en"
                @click="setLevel(d.label)"
              >{{ d.label }}</button>
            </div>
          </div>

          <div class="htb-table">
            <div class="htb-row htb-row--head" aria-hidden="true">
              <span>{{ t.colBox }}</span>
              <span>{{ t.colDifficulty }}</span>
              <span>{{ t.colOs }}</span>
              <span>{{ t.colDate }}</span>
            </div>
            <div class="htb-viewport" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
              <Transition name="htb-page" mode="out-in">
                <ul v-if="filtered.length" :key="`${osFilter}|${levelFilter}|${currentPage}`" class="htb-list">
                  <li v-for="b in pageItems" :key="b.name" class="htb-row">
                    <span class="htb-name" lang="en">{{ b.name }}</span>
                    <span class="htb-diff" :class="diffClass(b.difficulty)" lang="en">{{ b.difficulty }}</span>
                    <span class="htb-os" lang="en">{{ b.os }}</span>
                    <span class="htb-date">
                      <time v-if="b.solvedAt" :datetime="b.solvedAt" :title="fmt(b.solvedAt)">{{ dayMonth(b.solvedAt) }}</time>
                      <template v-else>{{ t.noDate }}</template>
                    </span>
                  </li>
                </ul>
                <p v-else key="empty" class="htb-no-result" role="status">{{ t.noResult }}</p>
              </Transition>
            </div>
          </div>

          <div class="htb-pager">
            <template v-if="filtered.length">
              <button
                v-if="pageCount > 1"
                type="button"
                class="htb-arrow"
                :class="{ 'is-disabled': currentPage === 0 }"
                :aria-label="t.prevPage"
                :aria-disabled="currentPage === 0"
                @click="goTo(currentPage - 1)"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" /></svg>
              </button>
              <span class="htb-range" aria-live="polite">{{ num(rangeFrom) }}–{{ num(rangeTo) }} / {{ num(filtered.length) }}</span>
              <button
                v-if="pageCount > 1"
                type="button"
                class="htb-arrow"
                :class="{ 'is-disabled': currentPage === pageCount - 1 }"
                :aria-label="t.nextPage"
                :aria-disabled="currentPage === pageCount - 1"
                @click="goTo(currentPage + 1)"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" /></svg>
              </button>
            </template>
          </div>
        </section>

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
