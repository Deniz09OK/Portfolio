import { test, expect, type Page } from '@playwright/test'
import { portfolio } from '../data/portfolio'

const SITE = 'https://portfolio-deniz.me'
const OG_LOCALE = { fr: 'fr_FR', en: 'en_GB', tr: 'tr_TR' } as const

// One page per language: French at the root, English and Turkish in their own prerendered folder.
const PAGES = [
  { lang: 'fr', path: '/' },
  { lang: 'en', path: '/en/' },
  { lang: 'tr', path: '/tr/' },
] as const

/** Collects page errors, console errors and warnings (hydration mismatches, CSP violations...). */
function watchConsole(page: Page) {
  const problems: string[] = []
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') problems.push(`${m.type()}: ${m.text()}`)
  })
  return problems
}

for (const { lang, path } of PAGES) {
  test(`${path} is prerendered in ${lang.toUpperCase()}, before any JavaScript`, async ({ request }) => {
    const res = await request.get(path)
    expect(res.status()).toBe(200)
    const html = await res.text()
    expect(html).toMatch(new RegExp(`<html[^>]*\\blang="${lang}"`))
    // A title only found in this language (no character that HTML would escape) is already in what crawlers read.
    expect(html).toContain(`>${portfolio[lang].drills.title}<`)
  })

  test(`${path} hydrates with no error or warning in the console`, async ({ page }) => {
    const problems = watchConsole(page)
    await page.goto(path)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await page.waitForLoadState('networkidle')
    expect(problems).toEqual([])
  })
}

test('choosing a language moves the address to its page, without reloading and keeping the anchor', async ({ page }) => {
  await page.goto('/#drills')
  // A marker that a reload would erase.
  await page.evaluate(() => ((window as unknown as { __noReload: boolean }).__noReload = true))
  const historyLength = await page.evaluate(() => history.length)

  for (const [code, path] of [['en', '/en/'], ['tr', '/tr/'], ['fr', '/']] as const) {
    await page.locator('.lang-btn', { hasText: new RegExp(`^${code}$`, 'i') }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', code)
    await expect.poll(() => page.evaluate(() => location.pathname + location.hash)).toBe(`${path}#drills`)
  }
  expect(await page.evaluate(() => (window as unknown as { __noReload?: boolean }).__noReload)).toBe(true)
  // replaceState: no new history entry for a language change.
  expect(await page.evaluate(() => history.length)).toBe(historyLength)
})

test('on the root, a saved language is restored and the address follows it', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('deniz-arena-lang', 'en'))
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect.poll(() => page.evaluate(() => location.pathname)).toBe('/en/')
})

test('a language in the URL wins over the saved choice, which is kept', async ({ page }) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem('seeded')) {
      localStorage.setItem('deniz-arena-lang', 'tr')
      sessionStorage.setItem('seeded', '1')
    }
  })
  await page.goto('/en/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('.lang-btn[aria-checked="true"]')).toHaveText(/en/i)
  expect(await page.evaluate(() => location.pathname)).toBe('/en/')
  expect(await page.evaluate(() => localStorage.getItem('deniz-arena-lang'))).toBe('tr')
})

test('unknown paths, including under /en/ and /tr/, still get the noindex 404 page', async ({ request }) => {
  for (const path of ['/nope', '/en/nope', '/tr/x/y']) {
    const res = await request.get(path)
    expect(res.status(), path).toBe(404)
    expect(await res.text(), path).toMatch(/<meta name="robots" content="noindex"/)
  }
})

/** Attribute values of the tags matching `tag` (e.g. 'link', 'meta') whose attributes contain all of `where`. */
function tags(html: string, tag: string, where: Record<string, string>) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'g'))]
    .map((m) => Object.fromEntries([...m[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]])))
    .filter((attrs) => Object.entries(where).every(([k, v]) => attrs[k] === v))
}
const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"')

for (const { lang, path } of PAGES) {
  test(`${path} has its own title, canonical, hreflang alternates and og:locale`, async ({ request }) => {
    const html = await (await request.get(path)).text()
    const content = portfolio[lang]

    expect(decode(/<title>([^<]*)<\/title>/.exec(html)![1]!)).toBe(content.seoTitle)
    expect(tags(html, 'link', { rel: 'canonical' }).map((t) => t.href)).toEqual([SITE + path])
    expect(tags(html, 'meta', { property: 'og:url' }).map((t) => t.content)).toEqual([SITE + path])
    expect(decode(tags(html, 'meta', { property: 'og:title' })[0]!.content!)).toBe(content.seoTitle)
    expect(decode(tags(html, 'meta', { name: 'description' })[0]!.content!)).toBe(content.seoDescription)

    // Every page lists all three versions and x-default (the root), with absolute URLs.
    const alternates = Object.fromEntries(tags(html, 'link', { rel: 'alternate' }).map((t) => [t.hreflang, t.href]))
    expect(alternates).toEqual({ fr: `${SITE}/`, en: `${SITE}/en/`, tr: `${SITE}/tr/`, 'x-default': `${SITE}/` })

    expect(tags(html, 'meta', { property: 'og:locale' }).map((t) => t.content)).toEqual([OG_LOCALE[lang]])
    const others = PAGES.filter((p) => p.lang !== lang).map((p) => OG_LOCALE[p.lang]).sort()
    expect(tags(html, 'meta', { property: 'og:locale:alternate' }).map((t) => t.content).sort()).toEqual(others)
  })
}

test('the 404 page is noindex and claims no canonical URL', async ({ request }) => {
  const html = await (await request.get('/nope')).text()
  expect(html).toMatch(/<meta name="robots" content="noindex"/)
  expect(tags(html, 'link', { rel: 'canonical' })).toEqual([])
})

for (const { lang, path } of PAGES) {
  test(`${path} has valid JSON-LD Person data in its language`, async ({ request }) => {
    const html = await (await request.get(path)).text()
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]!)
    expect(blocks).toHaveLength(1)
    const person = JSON.parse(blocks[0]!)
    expect(person['@context']).toBe('https://schema.org')
    expect(person['@type']).toBe('Person')
    expect(person.name).toBe('Deniz OK')
    expect(person.jobTitle).toBe(portfolio[lang].seoJobTitle)
    expect(person.description).toBe(portfolio[lang].seoDescription)
    expect(person.url).toBe(SITE + path)
    expect(person.affiliation).toEqual({ '@type': 'EducationalOrganization', name: 'Epitech Nancy' })
    expect(person.sameAs).toEqual(['https://github.com/Deniz09OK', 'https://www.linkedin.com/in/deniz-ok/'])
    // Nothing more than what was agreed: no e-mail, address or employer in the structured data.
    expect(Object.keys(person).sort()).toEqual(['@context', '@type', 'affiliation', 'description', 'image', 'jobTitle', 'knowsLanguage', 'name', 'sameAs', 'url'])
  })
}

/** Width and height read from the IHDR chunk of a PNG file. */
function pngSize(buf: Buffer) {
  expect(buf.subarray(1, 4).toString('latin1')).toBe('PNG')
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
}

for (const { lang, path } of PAGES) {
  test(`${path} shares its own 1200×630 Open Graph image, under 300 KB`, async ({ request }) => {
    const html = await (await request.get(path)).text()
    const image = `${SITE}/og/og-${lang}.png`
    expect(tags(html, 'meta', { property: 'og:image' }).map((t) => t.content)).toEqual([image])
    expect(tags(html, 'meta', { name: 'twitter:image' }).map((t) => t.content)).toEqual([image])
    expect(tags(html, 'meta', { property: 'og:image:width' })[0]!.content).toBe('1200')
    expect(tags(html, 'meta', { property: 'og:image:height' })[0]!.content).toBe('630')
    expect(decode(tags(html, 'meta', { property: 'og:image:alt' })[0]!.content!)).toBe(portfolio[lang].ogImageAlt)

    // The image itself is published next to the page (same path on the local server).
    const res = await request.get(`/og/og-${lang}.png`)
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toBe('image/png')
    const body = await res.body()
    expect(pngSize(body)).toEqual({ width: 1200, height: 630 })
    expect(body.length).toBeLessThan(300 * 1024)
  })
}

test('the sitemap lists the three language pages with a lastmod and their alternates', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toContain('xml')
  const xml = await res.text()
  expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')

  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]!)
  expect(urls.map((u) => /<loc>([^<]*)<\/loc>/.exec(u)![1])).toEqual(PAGES.map((p) => SITE + p.path))
  for (const u of urls) {
    // lastmod: a full W3C date-time (date of the last commit, or of the build).
    const lastmod = /<lastmod>([^<]*)<\/lastmod>/.exec(u)![1]!
    expect(lastmod).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/)
    expect(Number.isNaN(Date.parse(lastmod))).toBe(false)
    const alternates = Object.fromEntries([...u.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]))
    expect(alternates).toEqual({ fr: `${SITE}/`, en: `${SITE}/en/`, tr: `${SITE}/tr/`, 'x-default': `${SITE}/` })
  }
})

test('robots.txt points to the sitemap', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text()
  expect(robots).toMatch(/^Sitemap: https:\/\/portfolio-deniz\.me\/sitemap\.xml$/m)
})

test('security.txt is published with the four RFC 9116 fields', async ({ request }) => {
  const res = await request.get('/.well-known/security.txt')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toContain('text/plain')
  const lines = (await res.text()).split(/\r?\n/).filter((l) => l.trim() && !l.startsWith('#'))
  // Format only ("Field: value" lines); the expiry date is not compared with today (renewal is a manual task).
  for (const line of lines) expect(line).toMatch(/^[A-Za-z-]+: \S.*$/)
  const fields = Object.fromEntries(lines.map((l) => [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1).trim()]))
  expect(Object.keys(fields).sort()).toEqual(['Canonical', 'Contact', 'Expires', 'Preferred-Languages'])
  expect(fields.Contact).toBe('mailto:deniz16ok@gmail.com')
  expect(fields.Expires).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/)
  expect(Number.isNaN(Date.parse(fields.Expires!))).toBe(false)
  expect(fields['Preferred-Languages']).toBe('fr, en, tr')
  expect(fields.Canonical).toBe('https://portfolio-deniz.me/.well-known/security.txt')
})
