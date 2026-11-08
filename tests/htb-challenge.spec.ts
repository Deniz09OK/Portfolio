import { test, expect, type Page } from '@playwright/test'
import { portfolio } from '../data/portfolio'

// The invite-code riddle gating the HTB notes (see composables/useHtbChallenge.ts, plugins/htb-console.client.ts
// and HtbTerminalModal.vue). tests/htb-notes.spec.ts covers the notes themselves (always unlocked there); this
// file covers the gate in front of them: the terminal, the console riddle, the chrono and the Hall of Fame.

const PAGES = [
  ['/', 'fr'],
  ['/en/', 'en'],
  ['/tr/', 'tr'],
] as const

function rot13(input: string): string {
  return input.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

// Direct child of #htb-notes: the retired-note cards, never the always-unlocked active-box cards.
const firstCard = (page: Page) => page.locator('#htb-notes > .htb-notes-grid .htb-note-card').first()

/** Opens a page at the HTB notes, unlock cookie untouched (locked on a fresh context), failing on any JS error. */
async function openLocked(page: Page, path: string) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  await page.goto(path)
  await page.locator('#htb-notes').scrollIntoViewIfNeeded()
  return errors
}

test.describe('HTB invite-code challenge (fr)', () => {
  const t = portfolio.fr.htb.challenge
  const note = portfolio.fr.htb.notes.notes[0]!

  test('a locked box opens the restricted terminal, never the note', async ({ page }) => {
    const errors = await openLocked(page, '/')
    await firstCard(page).click()
    await expect(page.getByRole('dialog', { name: t.restrictedTitle, exact: true })).toBeVisible()
    await expect(page.getByRole('dialog', { name: note.box })).toHaveCount(0)
    expect(errors).toEqual([])
  })

  test('the console riddle leads to the real code, which unlocks every box and opens the one that was clicked', async ({ page }) => {
    const errors = await openLocked(page, '/')
    await firstCard(page).click()
    const dialog = page.getByRole('dialog', { name: t.restrictedTitle, exact: true })
    await expect(dialog).toBeVisible()

    // A wrong guess is rejected and never unlocks anything.
    await dialog.locator('#htbCode').fill('HTB-WRONG-CODE-0000')
    await dialog.getByRole('button', { name: t.submit }).click()
    await expect(dialog.locator('#htbCodeError')).toHaveText(t.invalidCode)

    // Solved the way a visitor actually would: in the real browser console, never through the UI. Each
    // page.evaluate below must cast `window` inline — Playwright serialises the callback and runs it in the
    // browser, so it cannot close over a Node-side helper or type alias.
    await page.evaluate(() => (window as unknown as { HTB: { help(): void } }).HTB.help())
    const hint = await page.evaluate(() => (window as unknown as { HTB: { howToUnlock(): { hint: string } } }).HTB.howToUnlock().hint)
    expect(rot13(hint)).toMatch(/generateCode/)
    const b64 = await page.evaluate(() => (window as unknown as { HTB: { generateCode(): string } }).HTB.generateCode())
    const code = Buffer.from(b64, 'base64').toString('utf8')
    expect(code).toBe('HTB-DENIZ-PWN3D-2027')

    // The chrono started on the first console call and is now visible in the still-open terminal.
    await expect(dialog.locator('.htb-terminal-chrono')).toContainText(/\d{2}:\d{2}\.\d{2}/)

    await dialog.locator('#htbCode').fill(code)
    await dialog.getByRole('button', { name: t.submit }).click()

    const granted = page.getByRole('dialog', { name: t.grantedTitle, exact: true })
    await expect(granted).toBeVisible()
    await expect(granted.locator('.htb-terminal-chrono--final')).toContainText(/\d{2}:\d{2}\.\d{2}/)
    // No server on this static deployment: the Hall of Fame always falls back to its offline message.
    await expect(granted.getByText(t.scoreboardOffline)).toBeVisible()

    // Skipping the Hall of Fame closes the terminal, which immediately hands off to the note that was
    // originally clicked (unlocked by then) — no intermediate state with every dialog closed.
    await granted.getByRole('button', { name: t.skipSave }).click()

    // Unlocked: the note that was originally clicked opens on its own, and the badge + reset button appear.
    await expect(page.getByRole('dialog', { name: note.box, exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.htb-pwned-badge')).toHaveText(t.pwnedBadge)
    await expect(page.getByRole('button', { name: t.resetButton })).toBeVisible()
    // The one expected console entry: the browser itself logs the failed /api/scoreboard request (404 on this
    // static deployment) as an error, on top of the graceful offline message already asserted above.
    expect(errors.filter((e) => !/Failed to load resource.*404/.test(e))).toEqual([])
  })

  test("the recruiter's fast-unlock button skips the riddle and the Hall of Fame entirely", async ({ page }) => {
    await openLocked(page, '/')
    await firstCard(page).click()
    const dialog = page.getByRole('dialog', { name: t.restrictedTitle, exact: true })
    await dialog.getByRole('button', { name: t.fastUnlock }).click()
    await expect(page.getByRole('dialog', { name: note.box, exact: true })).toBeVisible()
    await expect(page.locator('#htbPseudo')).toHaveCount(0)
  })

  test('the reset button locks the notes again', async ({ page }) => {
    await page.context().addCookies([{ name: 'htb_unlocked', value: 'true', url: 'http://localhost:4173' }])
    const errors = await openLocked(page, '/')
    await expect(page.locator('.htb-pwned-badge')).toBeVisible()

    await page.getByRole('button', { name: t.resetButton }).click()
    await expect(page.locator('.htb-pwned-badge')).toHaveCount(0)
    await firstCard(page).click()
    await expect(page.getByRole('dialog', { name: t.restrictedTitle, exact: true })).toBeVisible()
    expect(errors).toEqual([])
  })

  test('Escape closes the terminal and gives focus back to the clicked card', async ({ page, isMobile }) => {
    await openLocked(page, '/')
    await firstCard(page).click()
    await expect(page.getByRole('dialog', { name: t.restrictedTitle, exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    // Keyboard focus restoration is a desktop concern (see the equivalent off-court check in portfolio.spec.ts).
    if (!isMobile) await expect(firstCard(page)).toBeFocused()
  })
})

for (const [path, lang] of PAGES) {
  test(`the restricted terminal shows the right hint and fast-unlock text (${lang})`, async ({ page }) => {
    const t = portfolio[lang].htb.challenge
    await openLocked(page, path)
    await firstCard(page).click()
    const dialog = page.getByRole('dialog', { name: t.restrictedTitle, exact: true })
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('.htb-terminal-hint')).toHaveText(t.hint)
    await expect(dialog.getByRole('button', { name: t.fastUnlock })).toBeVisible()
  })
}
