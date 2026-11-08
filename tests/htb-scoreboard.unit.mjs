// Tests unitaires de shared/htb-scoreboard.ts : `npm run test:unit` (node:test, sans navigateur).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pseudoError, timeError } from '../shared/htb-scoreboard.ts'

test('accepte un pseudo alphanumérique simple', () => {
  assert.equal(pseudoError('Deniz_09'), null)
  assert.equal(pseudoError('a1'), null)
  assert.equal(pseudoError('seize-caracteres1'.slice(0, 16)), null)
})

for (const bad of ['', 'a', 'x'.repeat(17), 'avec espace', '<script>', 'nom"injection', "nom'injection", 'émoji😀', 'a;b', 'a\nb']) {
  test(`refuse la forme du pseudo : ${JSON.stringify(bad)}`, () => {
    assert.equal(pseudoError(bad), 'shape')
  })
}

test('refuse un pseudo non-string', () => {
  assert.equal(pseudoError(undefined), 'shape')
  assert.equal(pseudoError(42), 'shape')
  assert.equal(pseudoError(null), 'shape')
})

test('refuse les grossièretés (FR/EN), insensible à la casse et au leetspeak', () => {
  assert.equal(pseudoError('putain'), 'profanity')
  assert.equal(pseudoError('PUTAIN'), 'profanity')
  assert.equal(pseudoError('fuck-you'), 'profanity')
  assert.equal(pseudoError('put4in'), 'profanity')
})

test('un pseudo propre contenant un mot bloqué en sous-chaîne reste accepté si la forme est correcte', () => {
  // "classic" ne contient aucun mot de la liste : vérifie juste qu'on ne bloque pas au hasard.
  assert.equal(pseudoError('classic-player'), null)
})

test('accepte un temps réaliste (entier, en millisecondes)', () => {
  assert.equal(timeError(2000), null)
  assert.equal(timeError(38450), null)
  assert.equal(timeError(60 * 60 * 1000), null)
})

test('refuse un temps trop rapide pour être réaliste (< 2 s)', () => {
  assert.equal(timeError(1999), 'time-too-fast')
  assert.equal(timeError(0), 'time-too-fast')
  assert.equal(timeError(-5), 'time-too-fast')
})

test('refuse un temps trop long (> 1 h) : la page a probablement été laissée ouverte', () => {
  assert.equal(timeError(60 * 60 * 1000 + 1), 'time-too-slow')
})

test('refuse un temps qui ne serait pas un entier de millisecondes', () => {
  assert.equal(timeError('3000'), 'shape')
  assert.equal(timeError(3000.5), 'shape')
  assert.equal(timeError(Number.NaN), 'shape')
  assert.equal(timeError(undefined), 'shape')
})
