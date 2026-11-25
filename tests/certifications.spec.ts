import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { portfolio } from '../data/portfolio'

const LANGS = ['fr', 'en', 'tr'] as const
type Lang = (typeof LANGS)[number]
const THEMES = ['dark', 'light'] as const

const VERIFY_URL = /^https:\/\/academy\.claude\.com\/verify\/[0-9a-f]{32}$/
/** Largeur (px) en dessous de laquelle les cartes passent sur une colonne (assets/css/career.css). */
const BREAKPOINT = 880

/** Téléphone, tablette (portrait et paysage) et ordinateur, quel que soit le projet Playwright qui exécute le test. */
const VIEWPORTS = [
  { name: 'téléphone', width: 390, height: 844 },
  { name: 'tablette portrait', width: 712, height: 1138 },
  { name: 'tablette iPad portrait', width: 834, height: 1194 },
  { name: 'tablette paysage', width: 1138, height: 712 },
  { name: 'ordinateur', width: 1280, height: 800 },
]

/** Ouvre le site dans une langue, descend jusqu'au bloc des certifications et échoue sur toute erreur JS. */
async function openCerts(page: Page, lang: Lang = 'fr', theme: (typeof THEMES)[number] = 'dark') {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  await page.addInitScript(
    ([l, t]) => {
      localStorage.setItem('deniz-arena-lang', l)
      localStorage.setItem('deniz-arena-theme', t)
    },
    [lang, theme],
  )
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', lang)
  await page.locator('.certs').scrollIntoViewIfNeeded()
  return errors
}

/** Attend la fin de l'animation d'entrée : la classe `reveal` est retirée une fois la transition terminée. */
async function waitRevealed(page: Page) {
  for (const card of await page.locator('.cert').all()) await expect(card).not.toHaveClass(/reveal/)
}

test.describe('certifications : données', () => {
  test('trois badges, mêmes données dans toutes les langues', () => {
    const fr = portfolio.fr.certs
    expect(fr).toHaveLength(3)
    for (const lang of LANGS) {
      const { certs, career } = portfolio[lang]
      expect(certs, `${lang} : mêmes badges que le français`).toEqual(fr)
      expect(career.certsLabel.trim(), `${lang} : titre du bloc`).not.toBe('')
      expect(career.certsVerify.trim(), `${lang} : libellé du lien`).not.toBe('')
    }
    expect(new Set(LANGS.map((l) => portfolio[l].career.certsLabel)).size, 'titre traduit').toBe(3)
    expect(new Set(LANGS.map((l) => portfolio[l].career.certsVerify)).size, 'lien traduit').toBe(3)
  })

  test('chaque badge a un nom, un organisme, une date MM/AAAA et un lien de vérification unique', () => {
    const certs = portfolio.fr.certs
    for (const c of certs) {
      expect(c.name.trim(), 'nom').not.toBe('')
      expect(c.issuer.trim(), `organisme de ${c.name}`).not.toBe('')
      expect(c.year, `date de ${c.name}`).toMatch(/^(0[1-9]|1[0-2])\/20\d{2}$/)
      expect(c.url, `lien de ${c.name}`).toMatch(VERIFY_URL)
    }
    expect(new Set(certs.map((c) => c.url)).size, 'liens uniques').toBe(certs.length)
    expect(new Set(certs.map((c) => c.name)).size, 'noms uniques').toBe(certs.length)
  })
})

for (const lang of LANGS) {
  test(`affiche les certifications en ${lang.toUpperCase()} sans erreur`, async ({ page }) => {
    const errors = await openCerts(page, lang)
    const { certs, career } = portfolio[lang]

    await expect(page.locator('.certs h3')).toHaveText(career.certsLabel)
    const cards = page.locator('.cert')
    await expect(cards).toHaveCount(certs.length)

    for (const [i, c] of certs.entries()) {
      const card = cards.nth(i)
      await expect(card).toContainText(c.year)
      await expect(card).toContainText(c.issuer)
      await expect(card).toContainText(c.name)
      await expect(card).toBeVisible()
    }
    await waitRevealed(page)
    for (const card of await cards.all()) await expect(card).toHaveCSS('opacity', '1')
    expect(errors).toEqual([])
  })

  test(`liens de vérification en ${lang.toUpperCase()} : nom accessible, nouvel onglet sûr`, async ({ page }) => {
    await openCerts(page, lang)
    const { certs, career } = portfolio[lang]

    for (const c of certs) {
      const link = page.getByRole('link', { name: `${career.certsVerify} : ${c.name}` })
      await expect(link, c.name).toHaveCount(1)
      await expect(link).toHaveAttribute('href', c.url)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
}

test.describe('certifications : mise en page sur tous les écrans', () => {
  for (const v of VIEWPORTS) {
    test(`${v.name} (${v.width}×${v.height})`, async ({ page }) => {
      await page.setViewportSize({ width: v.width, height: v.height })
      await openCerts(page)
      await waitRevealed(page)

      const boxes = await Promise.all((await page.locator('.cert').all()).map((c) => c.boundingBox()))
      expect(boxes.every((b) => b !== null), 'les trois cartes sont rendues').toBe(true)
      const [a, b, c] = boxes as NonNullable<(typeof boxes)[number]>[]

      if (v.width > BREAKPOINT) {
        // Trois colonnes : même ligne, de gauche à droite.
        expect(Math.abs(a.y - b.y), 'cartes alignées sur une ligne').toBeLessThan(2)
        expect(Math.abs(b.y - c.y)).toBeLessThan(2)
        expect(a.x).toBeLessThan(b.x)
        expect(b.x).toBeLessThan(c.x)
      } else {
        // Une colonne : mêmes x, de haut en bas, sans chevauchement.
        expect(Math.abs(a.x - b.x), 'cartes empilées').toBeLessThan(2)
        expect(Math.abs(b.x - c.x)).toBeLessThan(2)
        expect(a.y + a.height).toBeLessThanOrEqual(b.y + 1)
        expect(b.y + b.height).toBeLessThanOrEqual(c.y + 1)
      }
      for (const box of [a, b, c]) {
        expect(box.x, 'ne dépasse pas à gauche').toBeGreaterThanOrEqual(0)
        expect(box.x + box.width, 'ne dépasse pas à droite').toBeLessThanOrEqual(v.width)
      }

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow, 'aucun défilement horizontal de la page').toBeLessThanOrEqual(1)
    })
  }

  test('les longs intitulés ne débordent pas, même en turc sur téléphone', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 })
    await openCerts(page, 'tr')
    await waitRevealed(page)
    for (const card of await page.locator('.cert').all()) {
      const overflowing = await card.evaluate((el) => el.scrollWidth > el.clientWidth + 1)
      expect(overflowing, await card.innerText()).toBe(false)
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })
})

test.describe('certifications : accessibilité et usage au doigt ou au clavier', () => {
  test('cible du lien assez grande (24 px au minimum, 44 px sur appareil tactile)', async ({ page, isMobile }) => {
    await openCerts(page)
    await waitRevealed(page)
    const min = isMobile ? 44 : 24
    for (const link of await page.locator('.cert-link').all()) {
      const box = await link.boundingBox()
      expect(box?.height, await link.getAttribute('aria-label') ?? '').toBeGreaterThanOrEqual(min)
    }
  })

  test('les liens prennent le focus clavier avec un contour visible, dans l’ordre', async ({ page }) => {
    await openCerts(page)
    await waitRevealed(page)
    const links = await page.locator('.cert-link').all()
    expect(links).toHaveLength(portfolio.fr.certs.length)
    for (const link of links) {
      await link.focus()
      await expect(link).toBeFocused()
      const outline = await link.evaluate((el) => getComputedStyle(el).outlineStyle)
      expect(outline, 'contour de focus').not.toBe('none')
    }
  })

  for (const lang of LANGS) {
    for (const theme of THEMES) {
      test(`axe : aucune violation WCAG A/AA dans le bloc (${lang.toUpperCase()}, thème ${theme})`, async ({ page }) => {
        await openCerts(page, lang, theme)
        // Axe ignore les éléments encore à opacité 0 : on montre les blocs animés dans leur état final.
        await page.addStyleTag({
          content: '.reveal { opacity: 1 !important; transform: none !important; transition: none !important; }',
        })
        await page.evaluate(() => document.fonts.ready)

        const { violations } = await new AxeBuilder({ page })
          .include('.certs')
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze()
        const report = violations.flatMap((v) => v.nodes.map((n) => `${v.id} | ${n.target.join(' ')} | ${n.failureSummary}`))
        expect(report, report.join('\n')).toEqual([])
      })
    }
  }
})
