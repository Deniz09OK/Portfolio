<script setup lang="ts">
const content = usePortfolio()
const languages = computed(() => content.value.languages)
</script>

<template>
  <section class="languages" id="languages">
    <div class="container">
      <h2 class="display">{{ languages.title }}</h2>
      <div class="languages-list">
        <div v-for="lg in languages.items" :key="lg.code" v-reveal class="lang-row">
          <div class="lang-flag">{{ lg.flag }}</div>
          <div class="lang-label">{{ lg.label }}</div>
          <div class="lang-level">{{ lg.level }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
