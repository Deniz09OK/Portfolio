<script setup lang="ts">
const content = usePortfolio()
const label = computed(() => content.value.a11y.backToTop)

// Shown once the visitor has scrolled past one screen.
const visible = ref(false)

function update() {
  visible.value = window.scrollY > window.innerHeight
}

function toTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <button type="button" class="back-to-top" :class="{ 'is-visible': visible }" :aria-label="label" @click="toTop">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  </button>
</template>
