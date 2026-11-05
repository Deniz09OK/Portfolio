// Tests unitaires : tout lien ouvert dans un nouvel onglet porte rel="noopener noreferrer".
// `npm run test:unit` (node:test, sans navigateur). Parcourt les sources, donc aussi les liens que les tests
// Playwright n'affichent jamais (états vides, branches v-if).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const SOURCES = ['app.vue', 'error.vue', 'components', 'layouts', 'pages', 'data']

function files(path) {
  let entries
  try {
    entries = readdirSync(path, { withFileTypes: true })
  } catch (e) {
    if (e.code === 'ENOTDIR') return [path]
    if (e.code === 'ENOENT') return []
    throw e
  }
  return entries.flatMap((e) => files(join(path, e.name)))
}

/** Balises ouvrantes <a ...> d'un texte, en ignorant les > placés dans des valeurs entre guillemets. */
function anchorTags(text) {
  const tags = []
  for (const m of text.matchAll(/<a(?=[\s>])/g)) {
    let quote = null
    for (let i = m.index + 2; i < text.length; i++) {
      const c = text[i]
      if (quote) {
        if (c === quote) quote = null
      } else if (c === '"' || c === "'") quote = c
      else if (c === '>') {
        tags.push({ tag: text.slice(m.index, i + 1), line: text.slice(0, m.index).split('\n').length })
        break
      }
    }
  }
  return tags
}

/** Problème d'une balise <a>, ou null : un target autre que _self impose rel="noopener noreferrer" en dur. */
export function linkProblem(tag) {
  if (!/\s:?target\s*=/.test(tag) || /\starget\s*=\s*["']_self["']/.test(tag)) return null
  const rel = tag.match(/\srel\s*=\s*"([^"]*)"|\srel\s*=\s*'([^']*)'/)
  if (!rel) return 'target sans attribut rel'
  const tokens = (rel[1] ?? rel[2]).split(/\s+/)
  const missing = ['noopener', 'noreferrer'].filter((t) => !tokens.includes(t))
  return missing.length ? `rel sans ${missing.join(' ni ')}` : null
}

test('détecte un lien target="_blank" incomplet', () => {
  assert.equal(linkProblem('<a href="x" target="_blank" rel="noopener noreferrer">'), null)
  assert.equal(linkProblem('<a href="x" target="_blank" rel="noreferrer noopener">'), null)
  assert.equal(linkProblem('<a href="x">'), null)
  assert.equal(linkProblem('<a href="x" target="_self">'), null)
  assert.match(linkProblem('<a href="x" target="_blank">'), /sans attribut rel/)
  assert.match(linkProblem('<a href="x" target="_blank" rel="noopener">'), /sans noreferrer/)
  assert.match(linkProblem('<a\n  href="x"\n  target="_blank"\n  rel="external"\n>'), /sans noopener ni noreferrer/)
  assert.match(linkProblem('<a :href="u" :target="t">'), /sans attribut rel/)
})

test('repère les balises <a> sur plusieurs lignes et avec des > entre guillemets', () => {
  const tags = anchorTags('<p>\n<a\n  @click="() => go(1)"\n  target="_blank"\n>x</a><abbr>y</abbr>')
  assert.equal(tags.length, 1)
  assert.equal(tags[0].line, 2)
  assert.match(tags[0].tag, /target="_blank"\n>$/)
})

test('tous les liens target="_blank" du site ont rel="noopener noreferrer"', () => {
  const problems = []
  let count = 0
  for (const file of SOURCES.flatMap((s) => files(join(ROOT, s)))) {
    if (!/\.(vue|ts)$/.test(file)) continue
    for (const { tag, line } of anchorTags(readFileSync(file, 'utf8'))) {
      if (/\s:?target\s*=/.test(tag)) count++
      const problem = linkProblem(tag)
      if (problem) problems.push(`${relative(ROOT, file)}:${line} : ${problem}`)
    }
  }
  assert.ok(count > 0, 'aucun lien target trouvé : le parcours des sources ne fonctionne plus')
  assert.deepEqual(problems, [])
})
