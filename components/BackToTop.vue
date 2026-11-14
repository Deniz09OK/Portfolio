<script setup lang="ts">
const content = usePortfolio()
const label = computed(() => content.value.a11y.backToTop)

// Shown once the visitor has scrolled past one screen.
// On a narrow screen (<= 720px) the button would sit over the text column, so it only shows while the visitor
// scrolls up (the moment they want to go back) and hides again after a short idle, or as soon as they scroll down.
const visible = ref(false)
const IDLE_MS = 3000
let lastY = 0
let idleTimer: ReturnType<typeof setTimeout> | undefined
const button = ref<HTMLButtonElement | null>(null)

function update() {
  const y = window.scrollY
  const pastOneScreen = y > window.innerHeight
  if (!window.matchMedia('(max-width: 720px)').matches) {
    clearTimeout(idleTimer)
    visible.value = pastOneScreen
  } else if (!pastOneScreen) {
    clearTimeout(idleTimer)
    visible.value = false
  } else if (y < lastY) {
    clearTimeout(idleTimer)
    visible.value = true
    // Keep it while it is hovered or focused (keyboard, screen reader): it must not vanish under the finger or the focus.
    idleTimer = setTimeout(() => {
      if (document.activeElement !== button.value) visible.value = false
    }, IDLE_MS)
  } else if (y > lastY) {
    clearTimeout(idleTimer)
    visible.value = false
  }
  lastY = y
}

function toTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' })
  focusPageStart()
}

// The button hides once the page is back at the top: hand the focus to the start of the content so keyboard
// users do not lose it. <main> is focusable through its tabindex="-1" (app.vue), also the skip link target.
function focusPageStart() {
  document.getElementById('main')?.focus({ preventScroll: true })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  clearTimeout(idleTimer)
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <button ref="button" type="button" class="back-to-top" :class="{ 'is-visible': visible }" :aria-label="label" @click="toTop">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  </button>
</template>
