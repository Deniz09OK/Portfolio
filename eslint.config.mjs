// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // Generated, published or non-code folders. .nuxt/, .output/ and node_modules/ are already ignored by Nuxt.
    ignores: ['.nuxt/', '.output/', 'dist/', 'docs/', 'audit/', 'scratchpad/', 'playwright-report/', 'test-results/', 'qa-reports/', '.claude/'],
  },
)
