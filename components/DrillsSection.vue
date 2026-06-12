<script setup lang="ts">
const content = usePortfolio()
const drills = computed(() => content.value.drills)
</script>

<template>
  <section class="drills" id="drills">
    <div class="container">
      <h2 class="display">{{ drills.title }}</h2>
      <div class="drills-grid">
        <div v-for="(g, i) in drills.groups" :key="i" v-reveal class="drill">
          <div class="drill-head">
            <span class="drill-label">{{ g.label }}</span>
            <span class="drill-pos">{{ g.pos }}</span>
          </div>
          <ul class="drill-list">
            <li v-for="(s, j) in g.items" :key="j">{{ s }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
