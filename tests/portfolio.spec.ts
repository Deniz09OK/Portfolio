import { test, expect, type Page } from '@playwright/test'
import { portfolio } from '../data/portfolio'

const LANGS = ['fr', 'en', 'tr'] as const
type Lang = (typeof LANGS)[number]

const SECTIONS = ['roster', 'matches', 'career', 'drills', 'off', 'languages', 'contact']
const OPPONENT_LABEL: Record<Lang, string> = { fr: 'ADVERSAIRE', en: 'OPPONENT', tr: 'RAKİP' }
const HOST_LABEL: Record<string, string> = { 'github.com': 'GITHUB', 'gitlab.com': 'GITLAB' }

/** Opens the site in a given language and fails the test on any JS error. */
async function openSite(page: Page, lang: Lang = 'fr') {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    // Google Fonts is a third party: a network hiccup there is not a site bug.
    if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)\.com/.test(m.text())) errors.push(m.text())
  })
  await page.addInitScript((l) => localStorage.setItem('deniz-arena-lang', l), lang)
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', lang)
  return errors
}

async function switchLang(page: Page, lang: Lang) {
  await page.locator('.lang-btn', { hasText: new RegExp(`^${lang}$`, 'i') }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', lang)
}

for (const lang of LANGS) {
  test(`renders the ${lang.toUpperCase()} version without errors`, async ({ page }) => {
    const errors = await openSite(page, lang)
    const content = portfolio[lang]

    await expect(page).toHaveTitle('Deniz OK — Portfolio')
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toHaveCount(1)
    await expect(page.locator('.match-vs-side-opp .micro').first()).toHaveText(OPPONENT_LABEL[lang])
    await expect(page.locator('.ticker-track span').nth(2)).toHaveText(content.ticker[2])
    await expect(page.locator('.hero-tape .tape-v').nth(2)).toHaveText(content.hero.tale[2].v)
    expect(errors).toEqual([])
  })
}

test('every project card shows exactly one status', async ({ page }) => {
  await openSite(page)
  const cards = page.locator('article.match')
  const projects = portfolio.fr.projects
  await expect(cards).toHaveCount(projects.length)

  for (const [i, p] of projects.entries()) {
    const card = cards.nth(i)
    await expect(card).toHaveAttribute('data-idx', p.idx)
    const locked = card.locator('.match-link-locked')

    if (p.link) {
      const host = HOST_LABEL[new URL(p.link).hostname.replace(/^www\./, '')] ?? 'LE CODE'
      const link = card.locator(`a.match-link[href="${p.link}"]`)
      await expect(link).toHaveCount(1)
      await expect(link).toContainText(host)
      await expect(locked, `${p.name} must not look private`).toHaveCount(0)
    } else {
      await expect(locked).toHaveCount(1)
      await expect(locked).toContainText(p.wip ? 'EN DÉVELOPPEMENT' : 'CONFIDENTIEL')
      await expect(card.locator('a.match-link[href*="github.com"], a.match-link[href*="gitlab.com"]')).toHaveCount(0)
    }
  }
})

test('the menu reaches every section', async ({ page }) => {
  await openSite(page)
  const burger = page.locator('.nav-toggle')

  for (const id of SECTIONS) {
    if (await burger.isVisible()) {
      await burger.click()
      await page.locator(`.mobile-nav a[href="#${id}"]`).click()
    } else {
      await page.locator(`.bar-nav a[href="#${id}"]`).click()
    }
    await expect(page.locator(`#${id}`)).toBeInViewport()
  }
})

test('off-court modals open and close', async ({ page }) => {
  await openSite(page)
  const modal = page.locator('.off-modal')
  const cards = page.locator('.off-card')
  await expect(cards).toHaveCount(portfolio.fr.off.items.length)

  for (let i = 0; i < portfolio.fr.off.items.length; i++) {
    await cards.nth(i).click()
    await expect(modal).toHaveClass(/is-open/)
    await expect(page.locator('#offModalTitle')).toHaveText(portfolio.fr.off.items[i].label)
    const close = page.locator('.off-modal-close')
    await expect(close).toHaveAttribute('aria-label', portfolio.fr.off.close)
    if (i === 0) await page.keyboard.press('Escape')
    else await close.click()
    await expect(modal).not.toHaveClass(/is-open/)
  }
})

test('no horizontal overflow at 320px in any language', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await openSite(page)
  for (const lang of LANGS) {
    await switchLang(page, lang)
    const widths = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth])
    expect(widths[0], `page wider than the screen in ${lang}`).toBeLessThanOrEqual(widths[1])
  }
})

test('touch targets are at least 44x44px', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'touch devices only')
  await openSite(page)
  const selectors = ['.bar-brand', '.lang-btn', '.theme-btn', '.nav-toggle', '.contact-socials a']
  for (const selector of selectors) {
    for (const el of await page.locator(selector).all()) {
      const box = await el.boundingBox()
      expect(box, selector).not.toBeNull()
      expect(Math.round(box!.width), `${selector} width`).toBeGreaterThanOrEqual(44)
      expect(Math.round(box!.height), `${selector} height`).toBeGreaterThanOrEqual(44)
    }
  }
})

test('the saved light theme is applied before the app loads', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('deniz-arena-theme', 'light'))
  // Block the Nuxt bundle: only the inline head script can set the class, as on first paint.
  await page.route('**/_nuxt/**', (route) => route.abort())
  await page.goto('/')
  await expect(page.locator('html')).toHaveClass(/(^|\s)light(\s|$)/)
})

test('the theme toggle is remembered after a reload', async ({ page }) => {
  await openSite(page)
  const html = page.locator('html')
  await expect(html).not.toHaveClass(/(^|\s)light(\s|$)/)
  await page.locator('.theme-btn').click()
  await expect(html).toHaveClass(/(^|\s)light(\s|$)/)
  await page.reload()
  await expect(html).toHaveClass(/(^|\s)light(\s|$)/)
})

test('unknown URLs get a real 404 page', async ({ page, request }) => {
  const res = await request.get('/cette-page-n-existe-pas')
  expect(res.status()).toBe(404)
  expect(await res.text()).toContain('Hors du terrain')

  await page.goto('/cette-page-n-existe-pas')
  await expect(page.locator('h1')).toHaveText('404')
  await expect(page.locator('a[href="/"]')).toBeVisible()
})
