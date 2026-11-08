import { test, expect, chromium, type Browser, type LaunchOptions, type Page } from '@playwright/test'

// Opening of the modals (ArenaModal): only transform and opacity are animated, no backdrop-filter, will-change only
// while animating, nothing animated with prefers-reduced-motion, and nothing moves when the scroll is locked.

const MODALS = [
  { name: 'HTB notes', at: '#htb-notes', opener: '#htb-notes > .htb-notes-grid .htb-note-card', root: '.htb-note-modal' },
  { name: 'off-court', at: '#off', opener: '.off-card', root: '.arena-modal.off-modal' },
] as const

async function openAt(page: Page, path: string, at: string) {
  // The HTB notes sit behind an invite-code challenge (tests/htb-challenge.spec.ts covers it): this file is
  // about modal motion, so the notes are unlocked here to go straight to the note modal, like off-court's.
  if (at === '#htb-notes') await page.context().addCookies([{ name: 'htb_unlocked', value: 'true', domain: 'localhost', path: '/' }])
  await page.goto(path)
  await page.locator(at).scrollIntoViewIfNeeded()
}

/**
 * Page with real, classic scrollbars, so that locking the scroll actually removes one: headless Chromium hides
 * scrollbars by default. Desktop Chromium only; the other projects (mobile, WebKit) keep their usual overlay
 * scrollbars, where the lock has no scrollbar to remove (gap 0) and must move nothing either.
 */
async function pageWithScrollbars(
  { browserName, isMobile, launchOptions, page }: { browserName: string; isMobile: boolean; launchOptions: LaunchOptions; page: Page },
  viewport: { width: number; height: number },
): Promise<{ page: Page; browser?: Browser; classic: boolean }> {
  if (browserName !== 'chromium' || isMobile) {
    await page.setViewportSize(viewport)
    return { page, classic: false }
  }
  const browser = await chromium.launch({ ...launchOptions, ignoreDefaultArgs: ['--hide-scrollbars'] })
  return { page: await browser.newPage({ viewport, reducedMotion: 'reduce' }), browser, classic: true }
}

for (const m of MODALS) {
  test.describe(`${m.name} modal motion`, () => {
    test('animates only transform and opacity, without backdrop-filter, will-change only while animating', async ({ page }) => {
      await openAt(page, '/', m.at)
      await page.locator(m.opener).first().click({ noWaitAfter: true })
      const root = page.locator(`${m.root}.is-open`)
      const card = root.locator('.off-modal-card')

      const during = await root.evaluate((el) => {
        const card = el.querySelector('.off-modal-card')!
        const props = (a: Animation) =>
          a instanceof CSSTransition ? [a.transitionProperty] : (a.effect as KeyframeEffect).getKeyframes().flatMap((k) => Object.keys(k).filter((x) => !['offset', 'computedOffset', 'easing', 'composite'].includes(x)))
        // A bubbling end event from a child must not end the animating state.
        el.querySelector('.off-modal-close')!.dispatchEvent(new TransitionEvent('transitionend', { bubbles: true, propertyName: 'opacity' }))
        el.querySelector('.off-modal-close')!.dispatchEvent(new AnimationEvent('animationend', { bubbles: true, animationName: 'x' }))
        return {
          animated: [...new Set(el.getAnimations({ subtree: true }).flatMap(props))].sort(),
          cardAnimations: card.getAnimations().length,
          animating: el.classList.contains('is-animating'),
          willChange: [getComputedStyle(el).willChange, getComputedStyle(card).willChange],
          backdropFilters: [el, ...el.querySelectorAll('*')].map((e) => getComputedStyle(e).backdropFilter).filter((v) => v && v !== 'none'),
        }
      })
      expect(during.animated).toEqual(['opacity', 'transform'])
      expect(during.cardAnimations).toBe(1)
      expect(during.animating).toBe(true)
      expect(during.willChange).toEqual(['opacity', 'transform'])
      expect(during.backdropFilters).toEqual([])

      // Removed once the animations are over (before the 350 ms fallback is needed).
      await expect(root).not.toHaveClass(/is-animating/, { timeout: 2000 })
      expect(await root.evaluate((el) => getComputedStyle(el).willChange)).toBe('auto')
      expect(await card.evaluate((el) => getComputedStyle(el).willChange)).toBe('auto')
      await expect(card).toBeFocused()

      await page.keyboard.press('Escape')
      await expect(page.locator(m.root)).not.toHaveClass(/is-open/)
      await expect(page.locator(m.root)).not.toHaveClass(/is-animating/, { timeout: 2000 })
    })

    test('animates nothing with prefers-reduced-motion', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await openAt(page, '/', m.at)
      await page.locator(m.root).evaluate((el) => {
        ;(window as Window & { animatingSeen?: boolean }).animatingSeen = false
        new MutationObserver(() => {
          if (el.classList.contains('is-animating')) (window as Window & { animatingSeen?: boolean }).animatingSeen = true
        }).observe(el, { attributes: true, attributeFilter: ['class'] })
      })
      await page.locator(m.opener).first().click()
      const root = page.locator(`${m.root}.is-open`)
      expect(await root.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0)
      await expect(root.locator('.off-modal-card')).toBeFocused()
      await page.keyboard.press('Escape')
      await expect(page.locator(m.root)).not.toHaveClass(/is-open/)
      expect(await page.evaluate(() => (window as Window & { animatingSeen?: boolean }).animatingSeen)).toBe(false)
    })

    test('nothing moves when the scroll is locked and released, and the veil covers the whole width', async ({ browserName, isMobile, launchOptions, page: defaultPage, baseURL }) => {
      const { page, browser, classic } = await pageWithScrollbars({ browserName, isMobile, launchOptions, page: defaultPage }, { width: 1440, height: 900 })
      try {
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await openAt(page, new URL('/', baseURL).href, m.at)
        const edges = () =>
          page.evaluate((opener) => {
            const r = (s: string) => {
              const b = document.querySelector(s)!.getBoundingClientRect()
              return [b.left, b.right]
            }
            return { bar: r('.bar'), ticker: r('.ticker'), toTop: r('.back-to-top'), content: r(opener) }
          }, m.opener)
        const gap = await page.evaluate(() => window.innerWidth - document.documentElement.clientWidth)
        // With classic scrollbars there is a scrollbar to remove: otherwise this test would prove nothing.
        if (classic) expect(gap).toBeGreaterThan(0)
        const before = await edges()

        await page.locator(m.opener).first().click()
        const root = page.locator(`${m.root}.is-open`)
        await expect(root).toBeVisible()
        expect(await edges()).toEqual(before)
        expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--lock-gap').trim())).toBe(`${gap}px`)
        const veil = await root.locator('.off-modal-backdrop').evaluate((el) => {
          const b = el.getBoundingClientRect()
          return [b.left, b.right, window.innerWidth]
        })
        expect(veil[0]).toBe(0)
        expect(veil[1]).toBe(veil[2])

        await page.keyboard.press('Escape')
        await expect(page.locator(m.root)).not.toHaveClass(/is-open/)
        expect(await edges()).toEqual(before)
      } finally {
        await browser?.close()
      }
    })
  })
}

test('the mobile menu locks the scroll without moving the page or the fixed bars', async ({ browserName, isMobile, launchOptions, page: defaultPage, baseURL }) => {
  const { page, browser, classic } = await pageWithScrollbars({ browserName, isMobile, launchOptions, page: defaultPage }, { width: 1000, height: 800 })
  try {
    await openAt(page, new URL('/', baseURL).href, '#htb-notes')
    const edges = () =>
      page.evaluate(() => {
        const r = (s: string) => {
          const b = document.querySelector(s)!.getBoundingClientRect()
          return [b.left, b.right]
        }
        return { bar: r('.bar'), ticker: r('.ticker'), content: r('#htb-notes .htb-note-card') }
      })
    if (classic) expect(await page.evaluate(() => window.innerWidth - document.documentElement.clientWidth)).toBeGreaterThan(0)
    const before = await edges()
    await page.locator('.nav-toggle').click()
    await expect(page.locator('html')).toHaveClass(/nav-lock/)
    expect(await edges()).toEqual(before)
    await page.locator('.nav-toggle').click()
    await expect(page.locator('html')).not.toHaveClass(/nav-lock/)
    expect(await edges()).toEqual(before)
  } finally {
    await browser?.close()
  }
})
