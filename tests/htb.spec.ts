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
