<script setup lang="ts">
const content = usePortfolio()
const { lang } = useLang()

const matches = computed(() => content.value.matches)
const projects = computed(() => content.value.projects)

const labels = computed(() => {
  const l = lang.value
  return {
    link: l === 'tr' ? "GITHUB'DA GÖR" : l === 'en' ? 'VIEW ON GITHUB' : 'VOIR SUR GITHUB',
    locked: l === 'tr' ? 'GİZLİ' : l === 'en' ? 'CONFIDENTIAL' : 'CONFIDENTIEL',
    round: l === 'tr' ? 'RAUND' : 'ROUND',
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
      >
        <div class="match-inner">
          <div class="match-poster">
            <div class="match-poster-head">
              <span class="match-round">{{ labels.round }} {{ p.idx }} / 07</span>
              <span>{{ p.year }}</span>
            </div>
            <div class="match-idx-big">{{ p.idx }}</div>
            <div class="match-kanji">{{ p.kanji }}</div>
            <div class="match-tape">
              <div>
                <div class="match-tape-k">TYPE</div>
                <div class="match-tape-v">{{ p.type }}</div>
              </div>
              <div>
                <div class="match-tape-k">STACK</div>
                <div class="match-tape-v">{{ p.stack }}</div>
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
                <span class="micro">CHALLENGER</span>
                DENIZ #23
              </div>
              <div class="match-vs-x">×</div>
              <div class="match-vs-side match-vs-side-opp match-vs-side-right">
                <span class="micro">OPPONENT</span>
                {{ p.opponent }}
              </div>
            </div>

            <div class="match-verdict">VERDICT — {{ p.verdict }}</div>
            <p class="match-desc">{{ p.desc }}</p>

            <a
              v-if="p.link"
              class="match-link"
              :href="p.link"
              target="_blank"
              rel="noopener"
            >
              {{ labels.link }} <span>↗</span>
            </a>
            <span v-else class="match-link-locked">🔒 {{ labels.locked }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
