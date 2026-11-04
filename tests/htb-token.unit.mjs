// Tests unitaires de scripts/htb-token.mjs : `npm run test:unit` (node:test, sans navigateur).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { tokenShapeError } from '../scripts/htb-token.mjs'

// Faux jetons : jamais de vrai App Token dans le dépôt.
const VALID = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMjMifQ.c2lnbmF0dXJl'

test('accepte un jeton à 3 segments non vides', () => {
  assert.equal(tokenShapeError(VALID), null)
})

test('refuse un jeton absent ou vide', () => {
  assert.match(tokenShapeError(''), /absent/)
  assert.match(tokenShapeError(undefined), /absent/)
})

for (const [label, token, count] of [
  ['6 segments (ancien jeton refusé par Hack The Box)', 'aaa.bbb.ccc.ddd.eee.fff', 6],
  ['2 segments', 'aaa.bbb', 2],
  ['4 segments', 'aaa.bbb.ccc.ddd', 4],
  ['1 seul segment', 'aaabbbccc', 1],
]) {
  test(`refuse un jeton à ${label} en indiquant le nombre de segments`, () => {
    const msg = tokenShapeError(token)
    assert.ok(msg, 'une erreur est attendue')
    assert.match(msg, new RegExp(`${count} segments? .* au lieu de 3`))
  })
}

test('refuse un segment vide', () => {
  assert.match(tokenShapeError('aaa..ccc'), /segments est vide/)
  assert.match(tokenShapeError('.bbb.ccc'), /segments est vide/)
})

test('refuse un jeton contenant un espace ou un retour à la ligne', () => {
  assert.match(tokenShapeError('aaa.bb b.ccc'), /espace ou un retour à la ligne/)
  assert.match(tokenShapeError('aaa.bbb\n.ccc'), /espace ou un retour à la ligne/)
})

test("le message d'erreur ne contient jamais le jeton", () => {
  // Fragments distinctifs (Zq7…) : un fragment court comme « A » se retrouverait par hasard dans « API_TOKEN ».
  const secrets = [
    'Zq7aaa.Zq7bbb.Zq7ccc.Zq7ddd.Zq7eee.Zq7fff',
    'Zq7aaa.Zq7bbb',
    'Zq7aaa..Zq7ccc',
    'Zq7a aa.Zq7bbb.Zq7ccc',
  ]
  for (const token of secrets) {
    const msg = tokenShapeError(token)
    assert.ok(msg, `une erreur est attendue pour ${token.split('.').length} segments`)
    for (const part of token.split(/[.\s]/).filter((p) => p.length >= 4)) {
      assert.ok(!msg.includes(part), 'le message ne doit contenir aucun morceau du jeton')
    }
  }
})
