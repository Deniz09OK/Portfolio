// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // Generated, published or non-code folders. .nuxt/, .output/ and node_modules/ are already ignored by Nuxt.
    ignores: ['.nuxt/', '.output/', 'dist/', 'docs/', 'audit/', 'scratchpad/', 'playwright-report/', 'test-results/', 'qa-reports/', '.claude/'],
  },
  {
    rules: {
      // Pure style, auto-fixable, but it would touch 13 component files for no behaviour change.
      // Turned off rather than reformatting the codebase: re-enable together with a dedicated `eslint --fix` pass.
      'vue/html-self-closing': 'off',
      'vue/attributes-order': 'off',
    },
  },
  {
    // Plain .mjs files use ESLint's base rule (the TypeScript one, in .ts and .vue, already ignores rest siblings and `_` names).
    // `const { updatedAt: _old, ...rest } = obj` is the idiom to drop a key: the dropped value is unused on purpose.
    files: ['**/*.mjs'],
    rules: {
      'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
  },
)
