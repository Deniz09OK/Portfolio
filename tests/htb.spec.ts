import { test, expect, type Page } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

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
    expect((await viewport.boundingBox())!.height).toBe(first)
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
