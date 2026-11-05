// Sitemap prerendered as /sitemap.xml: the three language pages, each listing its alternates (hreflang),
// with lastmod = date of the last commit (computed at build time in nuxt.config.ts, build date as a fallback).
import { LANG_PATHS, SITE_LANGS, SITE_URL } from '../../shared/site'

export default defineEventHandler((event) => {
  const lastmod = String(useRuntimeConfig(event).sitemapLastmod)
  const alternates = [
    ...SITE_LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${LANG_PATHS[l]}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${LANG_PATHS.fr}"/>`,
  ].join('\n')
  const urls = SITE_LANGS.map((l) => `  <url>
    <loc>${SITE_URL}${LANG_PATHS[l]}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`).join('\n')

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
})
