import { test, expect, type Page } from '@playwright/test'
import { portfolio } from '../data/portfolio'

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
