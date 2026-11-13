import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe.configure({ timeout: 90_000 })

// WCAG 1.4.3 (AA): axe checks the real rendered colours, opacities included.
const PAGES = ['/', '/en/', '/tr/']
const THEMES = ['dark', 'light'] as const

for (const path of PAGES) {
  for (const theme of THEMES) {
    test(`contrast AA on ${path} (${theme} theme)`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem('deniz-arena-theme', t), theme)
      await page.goto(path)
      await page.locator('.off-card').first().waitFor()
      // Axe ignores elements still at opacity 0: show the scroll-reveal blocks in their final state.
      await page.addStyleTag({
        content: '.reveal { opacity: 1 !important; transform: none !important; transition: none !important; }',
      })
      await page.evaluate(() => document.fonts.ready)

      const { violations } = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
      const report = violations.flatMap((v) =>
        v.nodes.map((n) => {
          const d = (n.any[0]?.data ?? {}) as Record<string, unknown>
          return `${n.target.join(' ')} | ${d.fgColor} sur ${d.bgColor} = ${d.contrastRatio} (${d.fontSize})`
        }),
      )
      expect(report, report.join('\n')).toEqual([])
    })

    // Axe cannot judge `.off-role` (the card stripe is a pseudo-element over it): compare its colour with the card background.
    test(`.off-role text is AA on ${path} (${theme} theme)`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem('deniz-arena-theme', t), theme)
      await page.goto(path)
      await page.locator('.off-card').first().waitFor()

      const ratios = await page.evaluate(() => {
        const rgb = (css: string) => (css.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number)
        const lum = ([r, g, b]: number[]) => {
          const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
          return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
        }
        return [...document.querySelectorAll<HTMLElement>('.off-role')].map((el) => {
          const a = lum(rgb(getComputedStyle(el).color))
          const b = lum(rgb(getComputedStyle(el.closest('.off-card')!).backgroundColor))
          return { role: el.textContent, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) }
        })
      })
      expect(ratios).toHaveLength(5)
      for (const { role, ratio } of ratios) expect(ratio, `${role} (10 px, AA = 4.5)`).toBeGreaterThanOrEqual(4.5)
    })
  }
}
