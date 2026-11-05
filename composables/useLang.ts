import { portfolio } from '~/data/portfolio'
import type { LangCode } from '~/types/portfolio'
import { LANG_PATHS, hasLangInPath, langFromPath, normalizeLangPath } from '~/shared/site'

const STORAGE_KEY = 'deniz-arena-lang'
const SUPPORTED: LangCode[] = ['fr', 'en', 'tr']

/** Localised CV files, served statically from /public. Turkish falls back to the English version. */
export const CV_URLS: Record<LangCode, string> = {
  fr: '/cv-deniz-ok-fr.pdf',
  en: '/cv-deniz-ok-en.pdf',
  tr: '/cv-deniz-ok-en.pdf',
}

/** Keeps the address bar on the page of the shown language (/, /en/, /tr/), without reloading or adding history. */
function syncUrl(next: LangCode) {
  const target = LANG_PATHS[next]
  if (normalizeLangPath(window.location.pathname) === target) return
  history.replaceState(history.state, '', target + window.location.search + window.location.hash)
}

export function useLang() {
  // useState gives one shared, SSR-safe reactive value across components. Its first value comes from the URL, so the
  // prerendered /en/ and /tr/ pages are already in their language (what crawlers and visitors without JS see).
  const lang = useState<LangCode>('lang', () =>
    langFromPath(import.meta.server ? useRequestURL().pathname : window.location.pathname),
  )

  function setLang(next: LangCode) {
    if (!SUPPORTED.includes(next)) return
    lang.value = next
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.setAttribute('lang', next)
      syncUrl(next)
    }
  }

  if (import.meta.client) {
    onMounted(() => {
      // An explicit language in the URL (/en/, /tr/: shared link, search result) wins and the saved choice is kept as is.
      // On the root, the saved choice is restored as before, and the address follows it.
      const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null
      if (!hasLangInPath(window.location.pathname) && saved && SUPPORTED.includes(saved) && saved !== lang.value) setLang(saved)
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
