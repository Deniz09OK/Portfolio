// Site-wide constants shared by the app and the Nitro server routes (sitemap).
// One page per language: French at the root, English and Turkish in their own prerendered folder.

export const SITE_URL = 'https://portfolio-deniz.me'

export const SITE_LANGS = ['fr', 'en', 'tr'] as const
export type SiteLang = (typeof SITE_LANGS)[number]

/** Path of each language version (trailing slash: GitHub Pages serves en/index.html at /en/). */
export const LANG_PATHS: Record<SiteLang, string> = { fr: '/', en: '/en/', tr: '/tr/' }

/** Open Graph locale of each language version. */
export const OG_LOCALES: Record<SiteLang, string> = { fr: 'fr_FR', en: 'en_GB', tr: 'tr_TR' }

/** Normalises a path to one of the language paths when it is one ('/en', '/en/index.html' -> '/en/'), else returns it. */
export function normalizeLangPath(path: string): string {
  const p = path.replace(/index\.html$/, '')
  if (/^\/(en|tr)$/.test(p)) return `${p}/`
  return p
}

/** True when the path names a language explicitly (/en/ or /tr/). The root stays implicit (French or the saved choice). */
export function hasLangInPath(path: string): boolean {
  return /^\/(en|tr)\/$/.test(normalizeLangPath(path))
}

/** Language given by a path: /en/ -> en, /tr/ -> tr, anything else -> fr. */
export function langFromPath(path: string): SiteLang {
  const p = normalizeLangPath(path)
  return p === '/en/' ? 'en' : p === '/tr/' ? 'tr' : 'fr'
}

/** Paths the single-page app renders; anything else is a 404. */
export function isKnownPagePath(path: string): boolean {
  const p = normalizeLangPath(path)
  return p === '/' || hasLangInPath(p)
}
