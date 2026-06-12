<script setup lang="ts">
import type { LangCode } from '~/types/portfolio'

const content = usePortfolio()
const { lang, setLang, supported } = useLang()
const { isLight, toggle } = useTheme()

const nav = computed(() => content.value.nav)

const links = computed(() => [
  { href: '#roster', label: nav.value.roster },
  { href: '#matches', label: nav.value.matches },
  { href: '#career', label: nav.value.career },
  { href: '#drills', label: nav.value.drills },
  { href: '#off', label: nav.value.off },
  { href: '#languages', label: nav.value.languages },
  { href: '#contact', label: nav.value.contact },
])

// Sync the live ticker offset to the real bar height (1 or 2 nav lines).
const bar = ref<HTMLElement | null>(null)
let ro: ResizeObserver | null = null

function syncBarHeight() {
  if (!bar.value) return
  document.documentElement.style.setProperty('--bar-h', `${bar.value.offsetHeight}px`)
}

// Mobile nav (burger) — shown when the desktop .bar-nav is hidden (<= 920px).
const mobileOpen = ref(false)

function toggleMobileNav() {
  mobileOpen.value = !mobileOpen.value
}

function closeMobileNav() {
  mobileOpen.value = false
}

watch(mobileOpen, (open) => {
  if (import.meta.client) document.documentElement.classList.toggle('nav-lock', open)
})

function onResize() {
  syncBarHeight()
  if (window.innerWidth > 920) closeMobileNav()
}

onMounted(() => {
  syncBarHeight()
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(syncBarHeight)
    ro.observe(bar.value!)
  }
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('resize', onResize)
  if (import.meta.client) document.documentElement.classList.remove('nav-lock')
})
</script>

<template>
  <header ref="bar" class="bar">
    <a href="#top" class="bar-brand" aria-label="Deniz OK">
      <span class="bar-num">23</span>
      <span class="bar-name">
        <span>DENIZ.OK</span>
        <small>2026 ROSTER</small>
      </span>
    </a>

    <nav class="bar-nav" aria-label="primary">
      <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
    </nav>

    <div class="bar-tools">
      <div class="lang-pill" role="radiogroup" aria-label="Language">
        <button
          v-for="code in supported"
          :key="code"
          class="lang-btn"
          :class="{ 'is-active': lang === code }"
          @click="setLang(code as LangCode)"
        >
          {{ code.toUpperCase() }}
        </button>
      </div>
      <button class="theme-btn" aria-label="Toggle theme" @click="toggle">
        <span class="theme-sun">☀</span>
        <span class="theme-moon">☾</span>
      </button>
      <button
        class="nav-toggle"
        :class="{ 'is-open': mobileOpen }"
        type="button"
        aria-label="Menu"
        aria-controls="mobileNav"
        :aria-expanded="mobileOpen"
        @click="toggleMobileNav"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <nav
      id="mobileNav"
      class="mobile-nav"
      :class="{ 'is-open': mobileOpen }"
      aria-label="primary mobile"
    >
      <a v-for="l in links" :key="l.href" :href="l.href" @click="closeMobileNav">{{ l.label }}</a>
    </nav>
  </header>
</template>
