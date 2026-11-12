// Also read by the inline anti-flash script in nuxt.config.ts.
const STORAGE_KEY = 'deniz-arena-theme'

/** Browser UI colour (meta theme-color) of each theme: the page background, --bg in assets/css/variables.css. */
export const THEME_COLORS = { dark: '#0c0c10', light: '#f0ede4' } as const

export function useTheme() {
  const isLight = useState<boolean>('theme-light', () => false)
  /** Follows the theme: read by the document head (app.vue), so the meta tag changes with the toggle. */
  const themeColor = computed(() => (isLight.value ? THEME_COLORS.light : THEME_COLORS.dark))

  function apply(light: boolean) {
    isLight.value = light
    if (import.meta.client) {
      document.documentElement.classList.toggle('light', light)
      localStorage.setItem(STORAGE_KEY, light ? 'light' : 'dark')
    }
  }

  function toggle() {
    apply(!isLight.value)
  }

  if (import.meta.client) {
    onMounted(() => {
      const saved = localStorage.getItem(STORAGE_KEY)
      apply(saved === 'light')
    })
  }

  return { isLight, toggle, themeColor }
}
