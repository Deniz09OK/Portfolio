<script setup lang="ts">
const content = usePortfolio()
const drills = computed(() => content.value.drills)
</script>

<template>
  <section class="drills" id="drills">
    <div class="container">
      <span class="section-label">{{ content.sectionLabels.drills }}</span>
      <h2 class="display">{{ drills.title }}</h2>
      <p class="display-sub drills-sub">{{ drills.sub }}</p>
      <ul class="drills-legend" :aria-label="content.a11y.legend">
        <li><span class="drill-dot drill-dot--starter" aria-hidden="true"></span>{{ drills.legend.starter }}</li>
        <li><span class="drill-dot drill-dot--bench" aria-hidden="true"></span>{{ drills.legend.bench }}</li>
      </ul>
      <div class="drills-grid">
        <div v-for="(g, i) in drills.groups" :key="i" v-reveal class="drill">
          <div class="drill-head">
            <span class="drill-label">{{ g.label }}</span>
            <span class="drill-pos">{{ g.pos }}</span>
          </div>
          <ul class="drill-list">
            <li v-for="(s, j) in g.items" :key="j" :class="`drill-item drill-item--${s.tier}`">
              <span class="drill-dot" :class="`drill-dot--${s.tier}`" aria-hidden="true"></span>
              <span class="drill-name">{{ s.name }}</span>
            </li>
          </ul>
          <a v-for="p in g.proofs" :key="p.url" class="drill-proof" :href="p.url" target="_blank" rel="noopener">
            {{ p.label }} <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
