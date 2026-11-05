import { test, expect, type Page } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { portfolio } from '../data/portfolio'

interface Box {
  name: string
  difficulty: string
  os: string
  solved: 'root' | 'user'
  solvedAt: string | null
}

const PAGE_SIZE = 5
const boxes: Box[] = JSON.parse(readFileSync(join(process.cwd(), 'public', 'data', 'htb.json'), 'utf8')).boxes
// Expectations come from the data file itself, which the sync workflow keeps rewriting.
const rooted = boxes
  .filter((b) => b.solved === 'root')
  .sort((a, b) => (b.solvedAt ?? '').localeCompare(a.solvedAt ?? '') || a.name.localeCompare(b.name))

const rows = (page: Page) => page.locator('#htb .htb-list .htb-row')
const range = (page: Page) => page.locator('#htb .htb-range')

async function openHtb(page: Page) {
  await page.goto('/')
  await page.locator('#htb').scrollIntoViewIfNeeded()
}

test.describe('HTB boxes pagination', () => {
  test.skip(rooted.length <= PAGE_SIZE, 'needs more than one page of boxes')

  test('shows the most recent page first, with a computed counter', async ({ page }) => {
    await openHtb(page)
    await expect(rows(page)).toHaveCount(PAGE_SIZE)
    await expect(rows(page).first().locator('.htb-name')).toHaveText(rooted[0].name)
    await expect(range(page)).toHaveText(`1–${PAGE_SIZE} / ${rooted.length}`)
    await expect(page.locator('#htb .htb-arrow').first()).toHaveAttribute('aria-disabled', 'true')
  })

  test('arrows move between pages and are usable with the keyboard', async ({ page }) => {
    await openHtb(page)
    const next = page.locator('#htb .htb-arrow').last()
    await next.focus()
    await page.keyboard.press('Enter')
    const last = Math.min(rooted.length, PAGE_SIZE * 2)
    await expect(range(page)).toHaveText(`${PAGE_SIZE + 1}–${last} / ${rooted.length}`)
    await expect(rows(page).first().locator('.htb-name')).toHaveText(rooted[PAGE_SIZE].name)
    await expect(page.locator('#htb .htb-arrow').first()).toHaveAttribute('aria-disabled', 'false')
    if (rooted.length <= PAGE_SIZE * 2) await expect(next).toHaveAttribute('aria-disabled', 'true')
  })

  test('keeps a constant table height between pages', async ({ page }) => {
    await openHtb(page)
    const viewport = page.locator('#htb .htb-viewport')
    const first = (await viewport.boundingBox())!.height
    await page.locator('#htb .htb-arrow').last().click()
    await expect(range(page)).toHaveText(new RegExp(`^${PAGE_SIZE + 1}`))
    // Within half a pixel: boundingBox() returns fractional heights (219.99997 vs 220), the layout itself does not move.
    expect((await viewport.boundingBox())!.height).toBeCloseTo(first, 0)
  })
})

test('lists the rooted boxes only in the table and the others under "in progress"', async ({ page }) => {
  await openHtb(page)
  const pending = boxes.filter((b) => b.solved !== 'root')
  await expect(page.locator('#htb .htb-wip-item')).toHaveCount(pending.length)
  for (const b of pending) {
    await expect(page.locator('#htb .htb-wip-item', { hasText: b.name }).locator('.htb-flag')).toHaveText('USER')
    await expect(rows(page).filter({ hasText: b.name })).toHaveCount(0)
  }
  await expect(page.locator('#htb .htb-row .htb-flag')).toHaveCount(0)
})

const unique = (values: string[]) => [...new Set(values)]
const systems = unique(rooted.map((b) => b.os))
const levels = unique(rooted.map((b) => b.difficulty))

test.describe('HTB boxes filters', () => {
  test('builds one chip per system and per difficulty found in the data', async ({ page }) => {
    await openHtb(page)
    const chips = (group: string) => page.locator(`#htb [aria-labelledby="${group}"] .htb-chip`)
    await expect(chips('htbFilterOs')).toHaveCount(systems.length + 1)
    await expect(chips('htbFilterLevel')).toHaveCount(levels.length + 1)
    for (const level of levels) await expect(chips('htbFilterLevel').filter({ hasText: level })).toHaveCount(1)
  })

  test('combines both filters, goes back to page 1 and resets', async ({ page }) => {
    await openHtb(page)
    // Move to page 2 first (when there is one), then filter: the page must go back to 1.
    if (rooted.length > PAGE_SIZE) await page.locator('#htb .htb-arrow').last().click()
    const os = systems[0]
    const level = levels[0]
    await page.locator('#htb .htb-chip', { hasText: new RegExp(`^${os}$`) }).click()
    await page.locator('#htb .htb-chip', { hasText: new RegExp(`^${level}$`) }).click()

    const expected = rooted.filter((b) => b.os === os && b.difficulty === level)
    if (expected.length) {
      await expect(range(page)).toHaveText(`1–${Math.min(PAGE_SIZE, expected.length)} / ${expected.length}`)
      await expect(rows(page).first().locator('.htb-name')).toHaveText(expected[0].name)
    }
    await expect(page.locator('#htb .htb-chip.is-active')).toHaveCount(2)

    await page.locator('#htb .htb-reset').click()
    await expect(page.locator('#htb .htb-reset')).toBeHidden()
    await expect(range(page)).toHaveText(`1–${Math.min(PAGE_SIZE, rooted.length)} / ${rooted.length}`)
  })

  test('shows a message when no box matches', async ({ page }) => {
    const empty = systems.flatMap((os) => levels.map((level) => ({ os, level }))).find(({ os, level }) => !rooted.some((b) => b.os === os && b.difficulty === level))
    test.skip(!empty, 'every system / difficulty pair has a box')
    await openHtb(page)
    await page.locator('#htb .htb-chip', { hasText: new RegExp(`^${empty!.os}$`) }).click()
    await page.locator('#htb .htb-chip', { hasText: new RegExp(`^${empty!.level}$`) }).click()
    await expect(page.locator('#htb .htb-no-result')).toHaveText('Aucune box pour ce filtre')
    await expect(rows(page)).toHaveCount(0)
    await expect(page.locator('#htb .htb-arrow')).toHaveCount(0)
  })

  test('chips are toggle buttons usable with the keyboard', async ({ page }) => {
    await openHtb(page)
    const chip = page.locator('#htb .htb-chip', { hasText: new RegExp(`^${levels[0]}$`) })
    await chip.focus()
    await page.keyboard.press('Enter')
    await expect(chip).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('#htb [aria-labelledby="htbFilterLevel"] .htb-chip', { hasText: /^Tous$/ })).toHaveAttribute('aria-pressed', 'false')
  })
})

test.describe('HTB boxes on small screens', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile projects only')

  test('shows compact cards and changes page with a horizontal swipe', async ({ page }) => {
    test.skip(rooted.length <= PAGE_SIZE, 'needs more than one page of boxes')
    await openHtb(page)
    await expect(page.locator('#htb .htb-row--head')).toBeHidden()
    await expect(rows(page)).toHaveCount(PAGE_SIZE)

    // Plain events carrying `changedTouches`: WebKit has no public Touch constructor.
    const swipe = (fromX: number, toX: number) =>
      page.locator('#htb .htb-viewport').evaluate(
        (el, [a, b]) => {
          const fire = (type: string, x: number) => {
            const e = new Event(type, { bubbles: true })
            Object.defineProperty(e, 'changedTouches', { value: [{ clientX: x, clientY: 200 }] })
            el.dispatchEvent(e)
          }
          fire('touchstart', a)
          fire('touchend', b)
        },
        [fromX, toX],
      )

    await swipe(300, 100)
    await expect(range(page)).toHaveText(new RegExp(`^${PAGE_SIZE + 1}`))
    await swipe(100, 300)
    await expect(range(page)).toHaveText(new RegExp('^1'))
  })
})

test.describe('HTB boxes table semantics', () => {
  for (const [path, lang] of [['/', 'fr'], ['/en/', 'en'], ['/tr/', 'tr']] as const) {
    test(`is a real table with caption and header cells (${lang})`, async ({ page }) => {
      const t = portfolio[lang].htb.labels
      await page.goto(path)
      await page.locator('#htb').scrollIntoViewIfNeeded()

      const table = page.getByRole('table', { name: `${t.boxesTitle} · ${rooted.length}`, exact: true })
      await expect(table).toHaveCount(1)
      await expect(table.locator('caption')).toHaveText(`${t.boxesTitle} · ${rooted.length}`)

      // Column headers: hidden on small screens (display: none), still in the markup.
      const cols = table.locator('thead th[scope="col"]')
      await expect(cols).toHaveText([t.colBox, t.colDifficulty, t.colOs, t.colDate])
      await expect(table.getByRole('columnheader', { includeHidden: true })).toHaveCount(4)

      const bodyRows = table.locator('tbody tr')
      await expect(bodyRows).toHaveCount(Math.min(PAGE_SIZE, rooted.length))
      for (const [i, box] of rooted.slice(0, PAGE_SIZE).entries()) {
        const row = bodyRows.nth(i)
        await expect(row.locator('th[scope="row"]')).toHaveText(box.name)
        await expect(row.locator('td')).toHaveCount(3)
      }
      await expect(table.getByRole('rowheader', { name: rooted[0]!.name, exact: true })).toBeVisible()
      await expect(table.getByRole('cell', { name: rooted[0]!.difficulty, exact: true }).first()).toBeVisible()
    })
  }
})

test.describe('HTB boxes table at 360 px', () => {
  test.use({ viewport: { width: 360, height: 740 } })

  test('shows one card per row, inside the block and without horizontal scrolling', async ({ page }) => {
    await openHtb(page)
    await expect(page.locator('#htb .htb-row--head')).toBeHidden()
    await expect(rows(page)).toHaveCount(Math.min(PAGE_SIZE, rooted.length))

    const layout = await page.evaluate(() => {
      const block = document.querySelector('#htb .htb-boxes')!.getBoundingClientRect()
      const cards = [...document.querySelectorAll('#htb .htb-list .htb-row')].map((r) => r.getBoundingClientRect())
      const cells = [...document.querySelectorAll('#htb .htb-list .htb-row > *')]
      return {
        pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        outside: cards.filter((c) => c.left < block.left || c.right > block.right).length,
        heights: [...new Set(cards.map((c) => Math.round(c.height)))],
        gaps: cards.slice(1).map((c, i) => Math.round(c.top - cards[i]!.bottom)),
        clipped: cells.filter((c) => c.scrollWidth > c.clientWidth + 1).map((c) => c.textContent),
      }
    })
    expect(layout.pageOverflow).toBeLessThanOrEqual(0)
    expect(layout.outside).toBe(0)
    expect(layout.heights).toEqual([64])
    for (const gap of layout.gaps) expect(gap).toBe(8)
    expect(layout.clipped).toEqual([])
  })
})
