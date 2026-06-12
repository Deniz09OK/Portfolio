const STORAGE_KEY = 'deniz-arena-theme'


export function useTheme() {
  const isLight = useState<boolean>('theme-light', () => false)

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

  return { isLight, toggle }
}
