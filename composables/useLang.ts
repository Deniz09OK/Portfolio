import { portfolio } from '~/data/portfolio'
import type { LangCode } from '~/types/portfolio'

const STORAGE_KEY = 'deniz-arena-lang'
const SUPPORTED: LangCode[] = ['fr', 'en', 'tr']

export function useLang() {
  // useState gives one shared, SSR-safe reactive value across components.
  const lang = useState<LangCode>('lang', () => 'fr')

  function setLang(next: LangCode) {
    if (!SUPPORTED.includes(next)) return
    lang.value = next
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.setAttribute('lang', next)
    }
  }

  // Restore the saved choice once, on the client.
  if (import.meta.client) {
    onMounted(() => {
      const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null
      if (saved && SUPPORTED.includes(saved)) setLang(saved)
      else document.documentElement.setAttribute('lang', lang.value)
    })
  }

  return { lang, setLang, supported: SUPPORTED }
}

/** Reactive content for the active language. */
export function usePortfolio() {
  const { lang } = useLang()
  return computed(() => portfolio[lang.value])
}
