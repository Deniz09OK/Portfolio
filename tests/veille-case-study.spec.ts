import { test, expect } from '@playwright/test'
import { portfolio } from '../data/portfolio'

// The "Veille DevSecOps IA" project shows its case study under the description, like MediSync and CIA.
for (const [path, lang] of [['/', 'fr'], ['/en/', 'en'], ['/tr/', 'tr']] as const) {
  test(`the Veille DevSecOps IA card shows its case study (${lang})`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text())
    })
    await page.goto(path)

    const p = portfolio[lang].projects.find((x) => x.idx === '02')!
    expect(p.link).toBe('https://github.com/Deniz09OK/veille-devsecops-ia')
    // The 4 usual sections, with the same titles as the MediSync case study of the same language.
    const medisync = portfolio[lang].projects.find((x) => x.name === 'MediSync')!
    expect(p.caseStudy?.map((c) => c.label)).toEqual(medisync.caseStudy!.map((c) => c.label))

    const card = page.locator('#match-02')
    await card.scrollIntoViewIfNeeded()
    await expect(card.locator('.match-name')).toHaveText(p.name)
    const block = card.locator('.match-case')
    await expect(block).toBeVisible()
    const rows = block.locator('.match-case-row')
    await expect(rows).toHaveCount(4)
    for (const [i, c] of p.caseStudy!.entries()) {
      await expect(rows.nth(i).locator('.match-case-label')).toHaveText(c.label)
      await expect(rows.nth(i).locator('.match-case-text')).toHaveText(c.text)
    }
    // Shown under the description, before the GitHub link, as on the other projects.
    const order = await card.evaluate((el) => {
      const desc = el.querySelector('.match-desc')!
      const cs = el.querySelector('.match-case')!
      const links = el.querySelector('.match-links')!
      const follows = (a: Element, b: Element) => !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)
      return follows(desc, cs) && follows(cs, links)
    })
    expect(order).toBe(true)
    await expect(card.locator('.match-links a[href="https://github.com/Deniz09OK/veille-devsecops-ia"]')).toBeVisible()
    expect(errors).toEqual([])
  })
}

test('the French case study of Veille DevSecOps IA keeps the given texts', () => {
  const p = portfolio.fr.projects.find((x) => x.idx === '02')!
  expect(p.caseStudy![0]!.text).toBe('Projet personnel conçu, développé et maintenu seul : collecte des offres, filtres, scoring par IA, rapports et automatisation.')
  expect(p.caseStudy![1]!.text).toBe('Python 3.11, Playwright, API France Travail et La Bonne Alternance, Groq et Mistral, ChromaDB, pandas et openpyxl, pytest, GitHub Actions.')
  expect(p.caseStudy![2]!.text).toMatch(/^Secrets dans GitHub Secrets, jamais dans le dépôt\..*retirés, pas contournés\.$/)
  expect(p.caseStudy![3]!.text).toMatch(/^Faire se contre-vérifier deux modèles.*sans que personne ne le voie\.$/)
})
