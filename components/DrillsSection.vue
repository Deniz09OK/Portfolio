<script setup lang="ts">
import type { DrillTier } from '~/types/portfolio'

const content = usePortfolio()
const drills = computed(() => content.value.drills)

// Legend order: from the strongest proof (at work) to practice (labs, class).
const TIERS: DrillTier[] = ['pro', 'project', 'lab']
</script>

<template>
  <section class="drills" id="drills">
    <div class="container">
      <span class="section-label">{{ content.sectionLabels.drills }}</span>
      <h2 class="display">{{ drills.title }}</h2>
      <p class="display-sub drills-sub">{{ drills.sub }}</p>
      <ul class="drills-legend" :aria-label="content.a11y.legend">
        <li v-for="tier in TIERS" :key="tier" :class="`drills-legend-item drills-legend-item--${tier}`">
          <span class="drill-dot" :class="`drill-dot--${tier}`" aria-hidden="true"></span>
          <span class="drills-legend-text">
            <span class="drills-legend-label">{{ drills.legend[tier].label }}</span>
            <span class="drills-legend-clear">{{ drills.legend[tier].clear }}</span>
            <span class="drills-legend-desc">{{ drills.legend[tier].text }}</span>
          </span>
        </li>
      </ul>
      <div class="drills-grid">
        <div v-for="(g, i) in drills.groups" :key="i" v-reveal class="drill">
          <div class="drill-head">
            <span class="drill-label">{{ g.label }}</span>
            <span class="drill-pos">{{ g.pos }}</span>
          </div>
          <ul class="drill-list">
            <li v-for="(s, j) in g.items" :key="j" :class="`drill-item drill-item--${s.tier}`" :data-tier="s.tier">
              <span class="drill-dot" :class="`drill-dot--${s.tier}`" aria-hidden="true"></span>
              <span class="drill-text">
                <span class="drill-name">{{ s.name }}</span>
                <!-- The diamond is decorative: the level is also given in text for screen readers. -->
                <span class="visually-hidden">, {{ drills.legend[s.tier].clear }} :</span>
                <span class="drill-evidence">{{ s.evidence }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
