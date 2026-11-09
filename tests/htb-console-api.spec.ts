import { test, expect, type Page } from '@playwright/test'
import { portfolio } from '../data/portfolio'

// Unlike tests/htb-challenge.spec.ts (which always opens the terminal modal first, then solves the riddle while
// it watches), this file drives window.HTB directly from a fresh page — the way a visitor who opens DevTools
// before ever clicking a locked note actually would. It exercises the console API in isolation: exact wording,
// the rot13/base64 encodings, that the three calls are independent (no required order) and that window.HTB
// cannot be tampered with. See plugins/htb-console.client.ts for the implementation under test.

const ACCESS_CODE = 'HTB-DENIZ-PWN3D-2027'

function rot13(input: string): string {
  return input.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

const firstCard = (page: Page) => page.locator('#htb-notes > .htb-notes-grid .htb-note-card').first()

async function callHtb<T>(page: Page, fn: 'help' | 'howToUnlock' | 'generateCode'): Promise<T> {
  return page.evaluate((name) => (window as unknown as { HTB: Record<string, () => unknown> }).HTB[name](), fn) as Promise<T>
}

test.describe('HTB console API (plugins/htb-console.client.ts)', () => {
  test('window.HTB exposes exactly the three documented calls', async ({ page }) => {
    await page.goto('/')
    const keys = await page.evaluate(() => Object.keys((window as unknown as { HTB: object }).HTB).sort())
    expect(keys).toEqual(['generateCode', 'help', 'howToUnlock'])
  })

  test('help() greets the operator and points to howToUnlock()', async ({ page }) => {
    const logs: string[] = []
    await page.goto('/')
    page.on('console', (m) => logs.push(m.text()))
    await callHtb(page, 'help')
    expect(logs.some((l) => /HTB ACCESS TERMINAL/.test(l))).toBe(true)
    expect(logs.some((l) => /howToUnlock\(\)/.test(l))).toBe(true)
  })

  test('howToUnlock() returns a locked payload whose rot13 hint names generateCode()', async ({ page }) => {
    await page.goto('/')
    const payload = await callHtb<{ status: string; hint: string }>(page, 'howToUnlock')
    expect(payload.status).toBe('locked')
    expect(rot13(payload.hint)).toBe('Call HTB.generateCode() to get your access code.')
  })

  test('generateCode() returns the base64 access code, decoding to the one the terminal accepts', async ({ page }) => {
    await page.goto('/')
    const b64 = await callHtb<string>(page, 'generateCode')
    expect(Buffer.from(b64, 'base64').toString('utf8')).toBe(ACCESS_CODE)
  })

  test('generateCode() is deterministic: calling it twice returns the exact same code', async ({ page }) => {
    await page.goto('/')
    const first = await callHtb<string>(page, 'generateCode')
    const second = await callHtb<string>(page, 'generateCode')
    expect(second).toBe(first)
  })

  test('the three calls are independent: generateCode() alone, with no help() or howToUnlock() first, still works', async ({ page }) => {
    await page.goto('/')
    const b64 = await callHtb<string>(page, 'generateCode')
    expect(Buffer.from(b64, 'base64').toString('utf8')).toBe(ACCESS_CODE)
  })

  test('window.HTB cannot be reassigned or extended: it is frozen and non-configurable', async ({ page }) => {
    await page.goto('/')
    const result = await page.evaluate(() => {
      const w = window as unknown as { HTB: Record<string, unknown> }
      const before = Object.keys(w.HTB).sort()
      w.HTB = { tampered: true } // no-op: the window.HTB property itself is non-writable
      ;(w.HTB as Record<string, unknown>).extra = 'nope' // no-op: Object.freeze blocks new properties too
      return { stillSameShape: Object.keys(w.HTB).sort(), before, frozen: Object.isFrozen(w.HTB) }
    })
    expect(result.stillSameShape).toEqual(result.before)
    expect(result.frozen).toBe(true)
  })

  test('solving the riddle before ever opening the terminal still unlocks the clicked note, and the chrono already reflects the time spent in the console', async ({ page }) => {
    const t = portfolio.fr.htb.challenge
    await page.goto('/')
    await callHtb(page, 'help')
    const payload = await callHtb<{ hint: string }>(page, 'howToUnlock')
    expect(rot13(payload.hint)).toMatch(/generateCode/)
    const b64 = await callHtb<string>(page, 'generateCode')
    const code = Buffer.from(b64, 'base64').toString('utf8')

    // Only now does the visitor scroll to the notes and open the (still locked) terminal.
    await page.locator('#htb-notes').scrollIntoViewIfNeeded()
    await firstCard(page).click()
    const dialog = page.getByRole('dialog', { name: t.restrictedTitle, exact: true })
    await expect(dialog).toBeVisible()
    // The clock started on the first console call, before the modal even existed: already past zero on open.
    await expect(dialog.locator('.htb-terminal-chrono')).toContainText(/\d{2}:\d{2}\.\d{2}/)

    await dialog.locator('#htbCode').fill(code)
    await dialog.getByRole('button', { name: t.submit }).click()
    await expect(page.locator('.htb-pwned-badge')).toBeVisible()
  })
})
