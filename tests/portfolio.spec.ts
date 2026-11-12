import { readFileSync } from 'node:fs'
import { test, expect, type Page } from '@playwright/test'
import { portfolio } from '../data/portfolio'
import { woff2CodePoints } from './woff2-cmap'

const LANGS = ['fr', 'en', 'tr'] as const
type Lang = (typeof LANGS)[number]

const SECTIONS = ['roster', 'matches', 'career', 'drills', 'htb', 'off', 'languages', 'contact']
const OPPONENT_LABEL: Record<Lang, string> = { fr: 'ADVERSAIRE', en: 'OPPONENT', tr: 'RAKİP' }
const HOST_LABEL: Record<string, string> = { 'github.com': 'GITHUB', 'gitlab.com': 'GITLAB' }

/** Opens the site in a given language and fails the test on any JS error. */
async function openSite(page: Page, lang: Lang = 'fr') {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
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

    await expect(page).toHaveTitle(content.seoTitle)
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toHaveCount(1)
    await expect(page.locator('.match-vs-side-opp .micro').first()).toHaveText(OPPONENT_LABEL[lang])
    await expect(page.locator('.ticker-track span').nth(2)).toHaveText(content.ticker[2])
    await expect(page.locator('.hero-tape .tape-v').nth(2)).toHaveText(content.hero.tale[2].v)
    expect(errors).toEqual([])
  })
}

const TIERS = ['pro', 'project', 'lab'] as const

test('skills data: same skills, levels and proofs in every language', () => {
  const shape = (lang: Lang) => portfolio[lang].drills.groups.map((g) => g.items.map((s) => s.tier))
  for (const lang of LANGS) {
    const { drills } = portfolio[lang]
    expect(drills.groups, `${lang}: 8 categories`).toHaveLength(8)
    const items = drills.groups.flatMap((g) => g.items)
    expect(items, `${lang}: 31 skills`).toHaveLength(31)
    for (const s of items) {
      expect(TIERS, `${lang}: level of ${s.name}`).toContain(s.tier)
      expect(s.evidence.trim(), `${lang}: proof of ${s.name}`).not.toBe('')
    }
    for (const tier of TIERS) {
      const level = drills.legend[tier]
      expect([level.label, level.clear, level.text].every((t) => t.trim()), `${lang}: legend ${tier}`).toBe(true)
    }
    expect(shape(lang), `${lang}: same levels as FR, in the same order`).toEqual(shape('fr'))
  }
})

for (const lang of LANGS) {
  test(`the ${lang.toUpperCase()} skills section shows three levels and a proof under each skill`, async ({ page }) => {
    await openSite(page, lang)
    const { drills } = portfolio[lang]

    // Legend: themed label, clear label under it and meaning, in the pro > project > lab order.
    const legend = page.locator('.drills-legend-item')
    await expect(legend).toHaveCount(3)
    for (const [i, tier] of TIERS.entries()) {
      await expect(legend.nth(i).locator('.drills-legend-label')).toHaveText(drills.legend[tier].label)
      await expect(legend.nth(i).locator('.drills-legend-clear')).toHaveText(drills.legend[tier].clear)
      await expect(legend.nth(i).locator('.drills-legend-desc')).toHaveText(drills.legend[tier].text)
    }

    // Every skill: its name, its level marker and its proof, in the data order.
    const items = page.locator('#drills .drill-item')
    const expected = drills.groups.flatMap((g) => g.items)
    await expect(items).toHaveCount(expected.length)
    for (const [i, s] of expected.entries()) {
      const item = items.nth(i)
      await expect(item).toHaveAttribute('data-tier', s.tier)
      await expect(item.locator('.drill-name')).toHaveText(s.name)
      await expect(item.locator('.drill-evidence')).toHaveText(s.evidence)
      await expect(item.locator(`.drill-dot--${s.tier}`)).toHaveCount(1)
      // The diamond is decorative: the level must also be readable as text by screen readers.
      await expect(item.locator('.visually-hidden')).toContainText(drills.legend[s.tier].clear)
    }
  })
}

test('MediSync stays an honest, in-development case study in every language', () => {
  for (const lang of LANGS) {
    const p = portfolio[lang].projects.find((x) => x.name === 'MediSync')
    expect(p, `${lang}: MediSync`).toBeTruthy()
    // Not in production: in development, no demo, no screenshot or diagram, no public code.
    expect(p!.wip).toBe(true)
    expect(p!.link).toBeNull()
    expect(p!.demo).toBeUndefined()
    expect(p!.schema).toBeUndefined()
    expect(p!.caseStudy, `${lang}: case study`).toHaveLength(4)
    const text = [p!.type, p!.stack, p!.desc, ...p!.caseStudy!.flatMap((c) => [c.label, c.text])].join(' ')
    // Never claim a certification or compliance the project cannot have yet. The texts may say there is *no* claim of
    // compliance ("conformité", "compliance", "uyumluluk"), but never that the project *is* compliant or certified.
    expect(text).not.toMatch(/certifi|sertifik|conforme|compliant|\buyumlu(dur)?\b/i)
    // Backend is FastAPI (Python), not Fastify / Node.js.
    expect(p!.stack).toContain('FASTAPI')
    expect(text).not.toMatch(/fastify|node\.?js/i)
    // Role: Scrum Master only.
    expect(p!.caseStudy![0]!.text).toMatch(/^Scrum Master\./)
  }
})

test('CIA is a finished case study whose infrastructure was taken down, in every language', () => {
  for (const lang of LANGS) {
    const p = portfolio[lang].projects.find((x) => x.name.startsWith('CIA'))
    expect(p, `${lang}: CIA`).toBeTruthy()
    // Finished and taken down: a precise status instead of "confidential", no code, no demo, not in development.
    expect(p!.status, `${lang}: status`).toBeTruthy()
    expect(p!.wip).toBeFalsy()
    expect(p!.link).toBeNull()
    expect(p!.demo).toBeUndefined()
    // The anonymised architecture diagram stays.
    expect(p!.schema).toBe('/diagrams/cia-architecture.svg')
    expect(p!.caseStudy, `${lang}: case study`).toHaveLength(4)
    expect(p!.year).toBe('2026')
    expect(p!.stack).toMatch(/TERRAFORM/)
  }
  expect(portfolio.fr.projects.find((x) => x.name.startsWith('CIA'))!.status).toBe('INFRASTRUCTURE DÉMONTÉE EN FIN DE PROJET')
  expect(portfolio.fr.projects.find((x) => x.name.startsWith('CIA'))!.caseStudy![0]!.text).toMatch(/^Chef de projet/)
})

test('the published architecture diagrams expose no IP address, domain or e-mail', () => {
  for (const file of ['cia', 'nsa']) {
    const svg = readFileSync(`public/diagrams/${file}-architecture.svg`, 'utf8')
    expect(svg, `${file}: IPv4`).not.toMatch(/\b(\d{1,3}\.){3}\d{1,3}\b/)
    expect(svg, `${file}: e-mail`).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/)
    expect(svg, `${file}: domain or host name`).not.toMatch(/\b[\w-]+\.(local|lan|internal|corp|home|fr|com|net|io|eu)\b/i)
  }
})

test('no CTO or Backend Lead role anywhere in the content', () => {
  expect(JSON.stringify(portfolio)).not.toMatch(/\bCTO\b|backend[ -]?lead|lead backend/i)
})

test('the MediSync card shows its case study sections', async ({ page }) => {
  await openSite(page)
  const p = portfolio.fr.projects.find((x) => x.name === 'MediSync')!
  const card = page.locator(`#match-${p.idx}`)
  const rows = card.locator('.match-case-row')
  await expect(rows).toHaveCount(p.caseStudy!.length)
  for (const [i, c] of p.caseStudy!.entries()) {
    await expect(rows.nth(i).locator('.match-case-label')).toHaveText(c.label)
    await expect(rows.nth(i).locator('.match-case-text')).toHaveText(c.text)
  }
  // Only the projects that have a case study show one: the other cards are unchanged.
  await expect(page.locator('.match-case')).toHaveCount(portfolio.fr.projects.filter((x) => x.caseStudy?.length).length)
})

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
      await expect(locked).toContainText(p.status ?? (p.wip ? 'EN DÉVELOPPEMENT' : 'CONFIDENTIEL'))
      await expect(card.locator('a.match-link[href*="github.com"], a.match-link[href*="gitlab.com"]')).toHaveCount(0)
    }
  }
})

test('the menu reaches every section', async ({ page }) => {
  // One menu round-trip per section: WebKit mobile needs about 5s each.
  test.setTimeout(90_000)
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

test('the theme button is a toggle that reports the light theme state', async ({ page }) => {
  await openSite(page)
  const btn = page.locator('.theme-btn')
  await expect(btn).toHaveAttribute('type', 'button')
  await expect(btn).toHaveAttribute('aria-pressed', 'false')
  await btn.click()
  await expect(btn).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('html')).toHaveClass(/light/)
})

test('kanji carry lang="ja" and decorative glyphs are hidden from screen readers', async ({ page }) => {
  await openSite(page)
  for (const sel of ['.match-kanji', '.hero-kanji-overlay']) {
    for (const el of await page.locator(sel).all()) {
      await expect(el).toHaveAttribute('lang', 'ja')
      await expect(el).toHaveAttribute('aria-hidden', 'true')
    }
  }
  for (const el of await page.locator('.off-kanji').all()) await expect(el).toHaveAttribute('lang', 'ja')

  // Every emoji or arrow glyph sits inside an aria-hidden element.
  const exposed = await page.evaluate(() => {
    const glyph = /[\u{1F300}-\u{1FAFF}\u2600-\u27BF\u2190-\u21FF]/u
    const walker = document.createTreeWalker(document.querySelector('main')!, NodeFilter.SHOW_TEXT)
    const out: string[] = []
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (glyph.test(n.textContent ?? '') && !n.parentElement?.closest('[aria-hidden="true"]')) out.push(n.textContent!.trim())
    }
    return out
  })
  expect(exposed).toEqual([])
})

test('the CSP is set and blocks nothing on the page', async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as Window & { cspViolations?: string[] }
    w.cspViolations = []
    document.addEventListener('securitypolicyviolation', (e) => w.cspViolations!.push(`${e.violatedDirective} ${e.blockedURI}`))
  })
  const errors = await openSite(page)
  const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content')
  expect(csp).toMatch(/script-src 'self' 'sha256-/)
  expect(csp).not.toMatch(/unsafe-eval|fonts\.g/)

  // Content shown later: the blocks revealed on scroll and an off-court modal.
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.locator('.off-card').first().click()
  await expect(page.locator('.off-modal')).toHaveClass(/is-open/)

  expect(await page.evaluate(() => (window as Window & { cspViolations?: string[] }).cspViolations)).toEqual([])
  expect(errors).toEqual([])
})

// Japanese and CJK scripts, as in scripts/kanji-font.py: punctuation, kana, ideographs, full-width forms.
const JAPANESE = /[\u3000-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]/gu
const KANJI_FONT = 'public/fonts/noto-serif-jp-kanji.woff2'

test('the kanji font covers every Japanese character of the site', async ({ request }) => {
  // Every Japanese character of the content (all languages) and of the prerendered pages.
  const chars = new Set(JSON.stringify(portfolio).match(JAPANESE) ?? [])
  for (const path of ['/', '/en/', '/tr/']) {
    for (const c of (await (await request.get(path)).text()).match(JAPANESE) ?? []) chars.add(c)
  }
  expect(chars.size).toBeGreaterThan(0)

  const inFont = woff2CodePoints(readFileSync(KANJI_FONT))
  const rule = readFileSync('assets/css/fonts.css', 'utf8').match(/font-family: 'Noto Serif JP';[^}]*?unicode-range: ([^;]*);/)
  expect(rule, 'the Noto Serif JP @font-face rule of assets/css/fonts.css').not.toBeNull()
  const inRange = new Set(rule![1]!.split(',').map((r) => parseInt(r.trim().replace(/^U\+/i, ''), 16)))

  for (const char of [' ', ...chars]) {
    const cp = char.codePointAt(0)!
    const label = `${char === ' ' ? 'space' : char} (U+${cp.toString(16).toUpperCase()}): run python3 scripts/kanji-font.py`
    expect(inFont.has(cp), `${label}, missing from ${KANJI_FONT}`).toBe(true)
    expect(inRange.has(cp), `${label}, missing from the unicode-range`).toBe(true)
  }
})

test('kanji render with the self-hosted kanji font at weight 900', async ({ page }) => {
  const fonts: string[] = []
  page.on('request', (r) => {
    if (r.url().includes('/fonts/noto-serif-jp')) fonts.push(new URL(r.url()).pathname)
  })
  await openSite(page)
  await page.locator('#off').scrollIntoViewIfNeeded()
  await page.evaluate(() => document.fonts.ready)

  const faces = await page.evaluate(() =>
    [...document.fonts]
      .filter((f) => f.family.replace(/["']/g, '') === 'Noto Serif JP')
      .map((f) => ({ weight: f.weight, status: f.status })),
  )
  expect(faces).toEqual([{ weight: '900', status: 'loaded' }])
  expect([...new Set(fonts)]).toEqual(['/fonts/noto-serif-jp-kanji.woff2'])

  for (const sel of ['.hero-kanji-overlay', '.match-kanji', '.off-kanji']) {
    const el = page.locator(sel).first()
    expect(await el.evaluate((e) => getComputedStyle(e).fontWeight), sel).toBe('900')
    expect(await el.evaluate((e) => getComputedStyle(e).fontFamily), sel).toMatch(/^"?Noto Serif JP"?,/)
  }
})

test('unknown URLs get a real 404 page', async ({ page, request }) => {
  const res = await request.get('/cette-page-n-existe-pas')
  expect(res.status()).toBe(404)
  expect(await res.text()).toContain('Hors du terrain')

  await page.goto('/cette-page-n-existe-pas')
  await expect(page.locator('h1')).toHaveText('404')
  await expect(page.locator('a[href="/"]')).toBeVisible()
})

test('off-court modal moves focus in, traps Tab and returns focus to its opener', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'keyboard focus is a desktop concern')
  await openSite(page)
  const card = page.locator('.off-card').first()
  await card.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.off-modal')).toHaveClass(/is-open/)
  await expect(page.locator('.off-modal-card')).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.locator('.off-modal-close')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.locator('.off-modal-close')).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(page.locator('.off-modal-close')).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(page.locator('.off-modal')).not.toHaveClass(/is-open/)
  await expect(card).toBeFocused()
})

test('the language switcher is a radiogroup that follows the active language', async ({ page, isMobile }) => {
  await openSite(page)
  const group = page.getByRole('radiogroup')
  const radios = group.getByRole('radio')
  await expect(radios).toHaveCount(3)
  await expect(radios.nth(0)).toHaveAttribute('aria-checked', 'true')
  await expect(radios.nth(1)).toHaveAttribute('aria-checked', 'false')
  if (isMobile) return
  await radios.nth(0).focus()
  await page.keyboard.press('ArrowRight')
  await expect(radios.nth(1)).toHaveAttribute('aria-checked', 'true')
  await expect(radios.nth(1)).toBeFocused()
  await expect(radios.nth(0)).toHaveAttribute('aria-checked', 'false')
})

for (const [name, btn, note] of [
  ['619', '.hero-number-btn', '#heroNumberNote'],
  ['23', '.bar-num', '#barNote'],
] as const) {
  test(`the ${name} caption is hidden until its button is activated`, async ({ page, isMobile }) => {
    await openSite(page)
    const button = page.locator(btn)
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator(note)).toHaveCount(0)

    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator(note)).toBeVisible()

    await button.click()
    await expect(page.locator(note)).toHaveCount(0)

    await button.click()
    await expect(page.locator(note)).toBeVisible()
    await page.locator('.hero-position').click({ force: true })
    await expect(page.locator(note)).toHaveCount(0)

    if (isMobile) return
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator(note)).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator(note)).toHaveCount(0)
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await page.keyboard.press('Space')
    await expect(page.locator(note)).toBeVisible()
  })
}

test('the brand name never covers the language buttons, whatever the width', async ({ page }) => {
  await openSite(page, 'en')
  for (const width of [320, 360, 390, 400, 401, 412, 414, 430, 431, 432, 436, 460, 461, 480, 768]) {
    await page.setViewportSize({ width, height: 800 })

    // Every control of the bar must receive the click aimed at its centre and at both of its edges.
    const covered = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('.bar-num, .lang-btn, .theme-btn, .nav-toggle')].flatMap((el) => {
        const r = el.getBoundingClientRect()
        const y = r.top + r.height / 2
        return [r.left + 3, r.left + r.width / 2, r.right - 3]
          .filter((x) => {
            const hit = document.elementFromPoint(x, y)
            return !(hit && (hit === el || el.contains(hit)))
          })
          .map(() => el.className)
      }),
    )
    expect(covered, `controls covered by another element at ${width}px`).toEqual([])

    // A visible name must fit in the brand block without being clipped.
    const name = page.locator('.bar-name span')
    if (await name.isVisible()) {
      const clipped = await name.evaluate((el) => el.scrollWidth > el.clientWidth)
      expect(clipped, `brand name clipped at ${width}px`).toBe(false)
    }

    // Real click, like a user would do it: FR must switch the language back from EN.
    await page.locator('.lang-btn', { hasText: /^en$/i }).click({ timeout: 2000 })
    await page.locator('.lang-btn', { hasText: /^fr$/i }).click({ timeout: 2000 })
    await expect(page.locator('html'), `FR click ignored at ${width}px`).toHaveAttribute('lang', 'fr')
    await page.locator('.lang-btn', { hasText: /^en$/i }).click({ timeout: 2000 })
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  }
})

test('the brand name still links to the top and no button sits inside a link', async ({ page }) => {
  await openSite(page)
  await expect(page.locator('a.bar-name')).toHaveAttribute('href', '#top')
  await expect(page.locator('a button, a [role="button"]')).toHaveCount(0)
})

test('the top bar nav stays on one line at 1400px and 1440px', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'desktop widths only')
  for (const width of [1400, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await openSite(page)
    await page.locator('.bar-num').click()
    const bar = await page.locator('.bar').boundingBox()
    expect(bar!.height, `bar height at ${width}`).toBeLessThan(90)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow, `overflow at ${width}`).toBeLessThanOrEqual(0)
  }
})

test('the back-to-top button appears after scrolling and brings the page back to the top', async ({ page }) => {
  await openSite(page)
  const button = page.locator('.back-to-top')
  await expect(button).toBeHidden()

  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2))
  await expect(button).toBeVisible()
  await expect(button).toHaveAttribute('aria-label', portfolio.fr.a11y.backToTop)
  const box = await button.boundingBox()
  expect(box!.width).toBeGreaterThanOrEqual(44)
  expect(box!.height).toBeGreaterThanOrEqual(44)

  await button.click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await expect(button).toBeHidden()
})

test('the back-to-top button hands the keyboard focus to the page content', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'keyboard focus is a desktop concern')
  await openSite(page)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2))
  const button = page.locator('.back-to-top')
  await expect(button).toBeVisible()
  await button.focus()
  await page.keyboard.press('Enter')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await expect(page.locator('main#main')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.locator('main#main')).not.toBeFocused()
})

for (const lang of LANGS) {
  test(`the skip link is the first tab stop and moves the focus into the main content (${lang})`, async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'keyboard focus is a desktop concern')
    const errors = await openSite(page, lang)
    const skip = page.locator('a.skip-link')
    const main = page.locator('main#main')
    await expect(skip).toHaveText(portfolio[lang].a11y.skipToContent)
    await expect(skip).toHaveAttribute('href', '#main')
    await expect(main).toHaveAttribute('tabindex', '-1')
    // Off-screen until focused.
    await expect(skip).not.toBeInViewport()

    await page.keyboard.press('Tab')
    await expect(skip).toBeFocused()
    await expect(skip).toBeInViewport()
    await page.keyboard.press('Enter')

    // The focus is now in the main content, after the navigation bar: <main> itself, then its first control.
    await expect(main).toBeFocused()
    await page.keyboard.press('Tab')
    const where = await page.evaluate(() => {
      const el = document.activeElement
      return { inMain: !!el?.closest('main#main'), inBar: !!el?.closest('header.bar'), isMain: el?.id === 'main' }
    })
    expect(where).toEqual({ inMain: true, inBar: false, isMain: false })
    expect(errors).toEqual([])
  })
}

test('Escape closes the mobile menu and gives the focus back to the burger', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const errors = await openSite(page)
  const burger = page.locator('.nav-toggle')
  const menu = page.locator('#mobileNav')

  await burger.click()
  await expect(burger).toHaveAttribute('aria-expanded', 'true')
  await expect(menu).toHaveClass(/is-open/)
  await expect(page.locator('html')).toHaveClass(/nav-lock/)

  await page.keyboard.press('Escape')
  await expect(burger).toHaveAttribute('aria-expanded', 'false')
  await expect(menu).not.toHaveClass(/is-open/)
  await expect(page.locator('html')).not.toHaveClass(/nav-lock/)
  await expect(burger).toBeFocused()

  // Escape with the menu closed does nothing.
  await page.keyboard.press('Escape')
  await expect(burger).toHaveAttribute('aria-expanded', 'false')
  expect(errors).toEqual([])
})

test.describe('with prefers-reduced-motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('anchor links jump instead of scrolling smoothly', async ({ page }) => {
    await openSite(page)
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
    expect(await page.evaluate(() => getComputedStyle(document.body).scrollBehavior)).toBe('auto')
  })
})

test('every link opening a new tab has rel="noopener noreferrer"', async ({ page }) => {
  for (const path of ['/', '/en/', '/tr/']) {
    await page.goto(path)
    // Archived project cards stay in the DOM (v-show): their links are checked too.
    const links = await page.locator('a[target]:not([target="_self"])').evaluateAll((els) =>
      els.map((a) => ({ href: a.getAttribute('href'), rel: (a.getAttribute('rel') ?? '').split(/\s+/) })),
    )
    expect(links.length, path).toBeGreaterThan(5)
    for (const { href, rel } of links) {
      expect(rel, `${path} ${href}`).toEqual(expect.arrayContaining(['noopener', 'noreferrer']))
    }
  }
})

test('the CIA and NSA project cards link to their architecture diagram', async ({ page, request }) => {
  await openSite(page)
  for (const [idx, file] of [['01', 'cia'], ['04', 'nsa']] as const) {
    const link = page.locator(`#match-${idx} .match-link`, { hasText: 'SCHÉMA' })
    await expect(link).toHaveAttribute('href', `/diagrams/${file}-architecture.svg`)
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', /noopener/)
    const res = await request.get(`/diagrams/${file}-architecture.svg`)
    expect(res.ok()).toBe(true)
    expect(res.headers()['content-type']).toContain('svg')
  }
  await expect(page.locator('.match-link', { hasText: 'SCHÉMA' })).toHaveCount(2)
})
