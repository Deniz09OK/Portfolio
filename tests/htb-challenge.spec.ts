import { test, expect, type Page } from '@playwright/test'
import { portfolio } from '../data/portfolio'

// The invite-code riddle gating the HTB notes (see composables/useHtbChallenge.ts, plugins/htb-console.client.ts
// and HtbTerminalModal.vue). tests/htb-notes.spec.ts covers the notes themselves (always unlocked there); this
// file covers the gate in front of them: the terminal, the console riddle, the chrono and the end screen.
//
// These tests run against the static build (`npm run generate`), where /api/scoreboard does not exist: the Hall
// of Fame (pseudo form + leaderboard) must not be shown and the route must never be called. The Hall of Fame
// itself only exists with a Nitro server (`npm run dev`).

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

/** Records every request to the scoreboard API: there must be none on the static site. */
function watchScoreboardCalls(page: Page) {
  const calls: string[] = []
  page.on('request', (r) => {
    if (new URL(r.url()).pathname.startsWith('/api/')) calls.push(`${r.method()} ${r.url()}`)
  })
  return calls
}

/** Solves the challenge through the terminal with the real code and returns the granted dialog. */
async function solve(page: Page, lang: (typeof PAGES)[number][1]) {
  const t = portfolio[lang].htb.challenge
  await firstCard(page).click()
  const dialog = page.getByRole('dialog', { name: t.restrictedTitle, exact: true })
  await dialog.locator('#htbCode').fill('HTB-DENIZ-PWN3D-2027')
  await dialog.getByRole('button', { name: t.submit }).click()
  const granted = page.getByRole('dialog', { name: t.grantedTitle, exact: true })
  await expect(granted).toBeVisible()
  return granted
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

  test('the code field has the focus when the terminal opens, and Tab stays inside the dialog', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'keyboard focus is a desktop concern')
    await openLocked(page, '/')
    await firstCard(page).click()
    const dialog = page.getByRole('dialog', { name: t.restrictedTitle, exact: true })
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('#htbCode')).toBeFocused()
    // Typing right away fills the field: the dialog frame did not take the focus back.
    await page.keyboard.type('HTB-')
    await expect(dialog.locator('#htbCode')).toHaveValue('HTB-')
    for (let k = 0; k < 6; k++) {
      await page.keyboard.press('Tab')
      expect(await dialog.locator('.off-modal-card').evaluate((el) => el.contains(document.activeElement))).toBe(true)
    }
  })

  test('the console riddle leads to the real code, which unlocks every box and opens the one that was clicked', async ({ page }) => {
    const apiCalls = watchScoreboardCalls(page)
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
    // No server on this static deployment: the time and a message for the visitor, no Hall of Fame at all.
    await expect(granted.getByText(t.staticDone)).toBeVisible()
    await expect(granted.locator('#htbPseudo')).toHaveCount(0)
    await expect(granted.locator('.htb-scoreboard-wrap')).toHaveCount(0)
    await expect(granted.getByText(t.scoreboardTitle)).toHaveCount(0)
    const next = granted.getByRole('button', { name: t.continueToNote })
    await expect(next).toBeFocused()

    // Continuing closes the terminal, which immediately hands off to the note that was originally clicked
    // (unlocked by then) — no intermediate state with every dialog closed.
    await next.click()

    // Unlocked: the note that was originally clicked opens on its own, and the badge + reset button appear.
    await expect(page.getByRole('dialog', { name: note.box, exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.htb-pwned-badge')).toHaveText(t.pwnedBadge)
    await expect(page.getByRole('button', { name: t.resetButton })).toBeVisible()
    // Nothing in the console, and the scoreboard API (absent here) was never called.
    expect(apiCalls).toEqual([])
    expect(errors).toEqual([])
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
  test(`without a scoreboard API, the granted terminal shows the time and a visitor message only (${lang})`, async ({ page }) => {
    const t = portfolio[lang].htb.challenge
    const apiCalls = watchScoreboardCalls(page)
    const errors = await openLocked(page, path)
    const granted = await solve(page, lang)

    await expect(granted.locator('.htb-terminal-chrono--final')).toContainText(/\d{2}:\d{2}\.\d{2}/)
    await expect(granted.getByText(t.staticDone)).toBeVisible()
    await expect(granted.getByRole('button', { name: t.continueToNote })).toBeVisible()
    // Neither the pseudo form nor the leaderboard, and nothing addressed to a developer.
    await expect(granted.locator('form')).toHaveCount(0)
    await expect(granted.locator('.htb-scoreboard-wrap')).toHaveCount(0)
    await expect(granted).not.toContainText('npm run dev')
    await expect(granted).not.toContainText(t.scoreboardTitle)

    // Closing with Escape still counts as granted: the clicked note opens.
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: portfolio[lang].htb.notes.notes[0]!.box, exact: true })).toBeVisible()
    expect(apiCalls).toEqual([])
    expect(errors).toEqual([])
  })

  test(`the restricted terminal shows the right hint and fast-unlock text (${lang})`, async ({ page, isMobile }) => {
    const t = portfolio[lang].htb.challenge
    await openLocked(page, path)
    await firstCard(page).click()
    const dialog = page.getByRole('dialog', { name: t.restrictedTitle, exact: true })
    await expect(dialog).toBeVisible()
    // Below the 920px breakpoint (mobile-chromium/mobile-webkit projects), F12 is a dead end: the hint points to
    // fastUnlock instead (see the mobile/tablet decision in HtbTerminalModal.vue).
    await expect(dialog.locator('.htb-terminal-hint')).toHaveText(isMobile ? t.hintMobile : t.hint)
    await expect(dialog.getByRole('button', { name: t.fastUnlock })).toBeVisible()
  })
}
