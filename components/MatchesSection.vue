<script setup lang="ts">
const content = usePortfolio()
const { lang } = useLang()

const matches = computed(() => content.value.matches)
const projects = computed(() => content.value.projects)

// Keep each "·" on the same line as the item before it, so a wrapped line never starts with a separator.
const keepSeparators = (stack: string) => stack.replaceAll(' · ', ' · ')

// Name the host the link points to, so a GitLab repository is not labelled "GitHub".
const HOSTS: Record<string, string> = { 'github.com': 'GITHUB', 'gitlab.com': 'GITLAB' }
function linkLabel(url: string) {
  const l = lang.value
  const host = HOSTS[new URL(url).hostname.replace(/^www\./, '')]
  if (!host) return l === 'tr' ? 'KODU GÖR' : l === 'en' ? 'VIEW CODE' : 'VOIR LE CODE'
  return l === 'tr' ? `${host}'DA GÖR` : l === 'en' ? `VIEW ON ${host}` : `VOIR SUR ${host}`
}

const labels = computed(() => {
  const l = lang.value
  return {
    locked: l === 'tr' ? 'GİZLİ' : l === 'en' ? 'CONFIDENTIAL' : 'CONFIDENTIEL',
    wip: l === 'tr' ? 'GELİŞTİRİLİYOR' : l === 'en' ? 'IN DEVELOPMENT' : 'EN DÉVELOPPEMENT',
    round: l === 'tr' ? 'RAUND' : 'ROUND',
    demo: l === 'tr' ? 'DEMOYU GÖR' : l === 'en' ? 'VIEW DEMO' : 'VOIR LA DÉMO',
    type: l === 'tr' ? 'TÜR' : 'TYPE',
    stack: l === 'tr' ? 'TEKNOLOJİLER' : 'STACK',
    challenger: l === 'tr' ? 'MEYDAN OKUYAN' : 'CHALLENGER',
    opponent: l === 'tr' ? 'RAKİP' : l === 'en' ? 'OPPONENT' : 'ADVERSAIRE',
    verdict: l === 'tr' ? 'SONUÇ' : 'VERDICT',
  }
})
</script>

<template>
  <section class="matches" id="matches">
    <div class="matches-head">
      <h2 class="display">{{ matches.title }}</h2>
      <p class="display-sub">{{ matches.sub }}</p>
    </div>

    <div class="match-stream">
      <article
        v-for="p in projects"
        :key="p.idx"
        v-reveal
        class="match"
        :id="`match-${p.idx}`"
        :data-idx="p.idx"
      >
        <div class="match-inner">
          <div class="match-poster">
            <div class="match-poster-head">
              <span class="match-round">{{ labels.round }} {{ p.idx }} / {{ String(projects.length).padStart(2, '0') }}</span>
              <span>{{ p.year }}</span>
            </div>
            <div class="match-idx-big">{{ p.idx }}</div>
            <div class="match-kanji">{{ p.kanji }}</div>
            <div class="match-tape">
              <div>
                <div class="match-tape-k">{{ labels.type }}</div>
                <div class="match-tape-v">{{ p.type }}</div>
              </div>
              <div>
                <div class="match-tape-k">{{ labels.stack }}</div>
                <div class="match-tape-v">{{ keepSeparators(p.stack) }}</div>
              </div>
            </div>
          </div>

          <div class="match-body">
            <div class="match-meta">
              <span class="match-year">{{ p.year }}</span>
              <span>{{ p.type }}</span>
            </div>
            <h3 class="match-name">{{ p.name }}</h3>

            <div class="match-vs">
              <div class="match-vs-side match-vs-side-deniz">
                <span class="micro">{{ labels.challenger }}</span>
                DENIZ #23
              </div>
              <div class="match-vs-x">×</div>
              <div class="match-vs-side match-vs-side-opp match-vs-side-right">
                <span class="micro">{{ labels.opponent }}</span>
                {{ p.opponent }}
              </div>
            </div>

            <div class="match-verdict">{{ labels.verdict }} — {{ p.verdict }}</div>
            <p class="match-desc">{{ p.desc }}</p>

            <div class="match-links">
              <a
                v-if="p.link"
                class="match-link"
                :href="p.link"
                target="_blank"
                rel="noopener"
              >
                {{ linkLabel(p.link) }} <span>↗</span>
              </a>
              <span v-else-if="p.wip" class="match-link-locked">🛠 {{ labels.wip }}</span>
              <span v-else class="match-link-locked">🔒 {{ labels.locked }}</span>
              <a
                v-if="p.demo"
                class="match-link"
                :href="p.demo"
                target="_blank"
                rel="noopener"
              >
                {{ labels.demo }} <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
