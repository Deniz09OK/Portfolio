<script setup lang="ts">
// Static marquee strip. Duplicated once so the CSS -50% scroll loops seamlessly.
const items = [
  'LIVE', '·', 'PORTFOLIO 2026', '·', 'MSc CYBERSECURITY & CLOUD', '·',
  'EPITECH NANCY', '·', 'QUALITEST WORK-STUDY', '·', 'TRILINGUAL FR/TR/EN', '·',
]
const track = [...items, ...items]
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <span v-for="(t, i) in track" :key="i">{{ t }}</span>
    </div>
  </div>
</template>
