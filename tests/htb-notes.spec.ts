import { test, expect, type Page } from '@playwright/test'
import { portfolio } from '../data/portfolio'

const PAGES = [
  ['/', 'fr'],
  ['/en/', 'en'],
  ['/tr/', 'tr'],
] as const

const cards = (page: Page) => page.locator('#htb-notes .htb-note-card')
const modal = (page: Page) => page.locator('.htb-note-modal')

/** Opens a page at the HTB notes and fails the test on any console error or page error. */
async function openNotes(page: Page, path: string) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  await page.goto(path)
  await page.locator('#htb-notes').scrollIntoViewIfNeeded()
  return errors
}

for (const [path, lang] of PAGES) {
  test.describe(`HTB notes (${lang})`, () => {
    const content = portfolio[lang].htb.notes

    test('shows the label, the title, the credit line and 3 cards', async ({ page }) => {
      const errors = await openNotes(page, path)
      const section = page.locator('#htb-notes')
      await expect(section).toBeVisible()
      await expect(section.locator('.htb-notes-label')).toHaveText(content.label)
      await expect(section.getByRole('heading', { level: 3, name: content.title })).toBeVisible()
      await expect(section.locator('.htb-notes-credit')).toHaveText(content.credit)

      expect(content.notes).toHaveLength(3)
      await expect(cards(page)).toHaveCount(3)
      for (const [i, note] of content.notes.entries()) {
        const card = cards(page).nth(i)
        await expect(card).toHaveJSProperty('tagName', 'BUTTON')
        await expect(card).toHaveAttribute('type', 'button')
        await expect(card.locator('.htb-note-box')).toHaveText(note.box)
        await expect(card.locator('.htb-os')).toHaveText(note.os)
        // An empty difficulty (not confirmed yet) shows no marker at all.
        await expect(card.locator('.htb-diff')).toHaveText(note.difficulty ? [note.difficulty] : [])
        expect(note.keywords.length).toBeGreaterThanOrEqual(2)
        expect(note.keywords.length).toBeLessThanOrEqual(3)
        await expect(card.locator('.htb-flag')).toHaveText(note.keywords)
        await expect(card).toContainText(content.cta)
      }
      expect(errors).toEqual([])
    })

    test('each card opens its note in a modal, closed by Escape, the close button or the backdrop', async ({ page }) => {
      const errors = await openNotes(page, path)
      const r = content.rubrics
      for (const [i, note] of content.notes.entries()) {
        const card = cards(page).nth(i)
        await card.click()
        const dialog = page.getByRole('dialog', { name: note.box, exact: true })
        await expect(dialog).toBeVisible()
        await expect(modal(page)).toHaveClass(/is-open/)
        await expect(dialog.locator('.off-modal-eyebrow')).toHaveText(`0${i + 1} / 03 · ${content.eyebrow}`)

        const expected = [r.chain, r.flaws, ...(note.pitfalls.length ? [r.pitfalls] : []), r.defense, r.takeaway]
        await expect(dialog.locator('.match-case-label')).toHaveText(expected)
        await expect(dialog.locator('ol.match-case-list li')).toHaveText(note.chain)
        await expect(dialog.locator('.match-case-row').last().locator('.match-case-text')).toHaveText(note.takeaway)
        await expect(dialog.locator('.htb-diff')).toHaveCount(note.difficulty ? 1 : 0)

        // Focus moves into the dialog and Tab keeps it there.
        await expect(dialog.locator('.off-modal-card')).toBeFocused()
        for (let k = 0; k < 3; k++) {
          await page.keyboard.press('Tab')
          expect(await dialog.locator('.off-modal-card').evaluate((el) => el.contains(document.activeElement))).toBe(true)
        }

        const close = ['escape', 'button', 'backdrop'][i % 3]
        if (close === 'escape') await page.keyboard.press('Escape')
        else if (close === 'button') await dialog.getByRole('button', { name: content.closeLabel }).click()
        else await modal(page).locator('.off-modal-backdrop').click({ position: { x: 5, y: 5 } })
        await expect(modal(page)).not.toHaveClass(/is-open/)
        await expect(modal(page)).toHaveAttribute('aria-hidden', 'true')
        await expect(page.getByRole('dialog')).toHaveCount(0)
        await expect(card).toBeFocused()
      }
      // Escape with no note open does nothing.
      await page.keyboard.press('Escape')
      await expect(modal(page)).not.toHaveClass(/is-open/)
      expect(errors).toEqual([])
    })
  })
}

test.describe('HTB notes at 360 px', () => {
  test.use({ viewport: { width: 360, height: 740 } })

  for (const [path, lang] of PAGES) {
    test(`no horizontal overflow, cards stacked and every modal fits (${lang})`, async ({ page }) => {
      await openNotes(page, path)
      const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(await overflow()).toBeLessThanOrEqual(0)

      const boxes = await cards(page).evaluateAll((els) => els.map((e) => e.getBoundingClientRect().toJSON() as DOMRect))
      for (const b of boxes) {
        expect(b.left).toBeGreaterThanOrEqual(0)
        expect(b.right).toBeLessThanOrEqual(360)
      }
      for (let i = 1; i < boxes.length; i++) expect(boxes[i]!.top).toBeGreaterThan(boxes[i - 1]!.bottom)

      for (let i = 0; i < 3; i++) {
        await cards(page).nth(i).click()
        const card = modal(page).locator('.off-modal-card')
        await expect(card).toBeVisible()
        const box = (await card.boundingBox())!
        expect(box.x).toBeGreaterThanOrEqual(0)
        expect(box.x + box.width).toBeLessThanOrEqual(360)
        expect(await card.evaluate((el) => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(0)
        expect(await overflow()).toBeLessThanOrEqual(0)
        await page.keyboard.press('Escape')
        await expect(modal(page)).not.toHaveClass(/is-open/)
      }
    })
  }
})

test('HTB notes hold no flag, instance address or personal path', () => {
  for (const [, lang] of PAGES) {
    const text = JSON.stringify(portfolio[lang].htb.notes)
    expect(text, lang).not.toMatch(/HTB\{|flag\{/i)
    expect(text, lang).not.toMatch(/\b[0-9a-f]{32}\b/i)
    const ips = text.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g) ?? []
    expect(ips.filter((ip) => ip !== '127.0.0.1'), lang).toEqual([])
    expect(text, lang).not.toMatch(/\/home\/|\/root\/|[A-Z]:\\\\Users|\/Users\/|\/mnt\/[a-z]\//i)
  }
})
