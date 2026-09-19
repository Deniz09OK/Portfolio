<script setup lang="ts">
// Localised marquee strip. Duplicated once so the CSS -50% scroll loops seamlessly.
const content = usePortfolio()
const track = computed(() => [...content.value.ticker, ...content.value.ticker])
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <span v-for="(t, i) in track" :key="i">{{ t }}</span>
    </div>
  </div>
</template>
