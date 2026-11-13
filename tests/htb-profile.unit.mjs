// Tests unitaires de scripts/htb-profile.mjs : `npm run test:unit` (node:test, sans navigateur ni appel à l'API HTB).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { publicProfile } from '../scripts/htb-profile.mjs'

// Profil brut factice, au format de `/profile/<id>` : tous les champs, y compris ceux qu'on ne publie pas.
const raw = {
  id: 1234567,
  name: 'Testeur',
  rank: 'Script Kiddie',
  next_rank: 'Hacker',
  current_rank_progress: 33.64,
  points: 12,
  ranking: 1007,
  system_owns: 10,
  user_owns: 11,
  user_bloods: 1,
  system_bloods: 2,
  challenge_bloods: 3,
  respects: 4,
  country_code: 'FR',
  joined_date: '2026-09-23T10:00:00.000000Z',
}

const REMOVED = ['id', 'rank', 'nextRank', 'rankProgress', 'points', 'globalRanking', 'country', 'joinedAt']

test('le profil publié ne contient que les champs affichés ou comparés', () => {
  assert.deepEqual(publicProfile(raw, 1234567), {
    name: 'Testeur',
    systemOwns: 10,
    userOwns: 11,
    bloods: 6,
    respects: 4,
    url: 'https://app.hackthebox.com/users/1234567',
  })
})

test('aucun champ de rang, de points, de classement, de pays ni de date n’est publié', () => {
  const out = publicProfile(raw, 1234567)
  for (const key of REMOVED) assert.equal(key in out, false, `${key} ne doit pas être publié`)
  const json = JSON.stringify(out)
  for (const secret of ['Script Kiddie', 'Hacker', '1007', 'FR', '2026-09-23', '33.6']) {
    assert.equal(json.includes(secret), false, `${secret} ne doit pas apparaître`)
  }
})

test('les compteurs absents valent 0 et ne produisent pas NaN', () => {
  const out = publicProfile({ name: 'Vide', system_owns: 0, user_owns: 0 }, 1)
  assert.equal(out.bloods, 0)
  assert.equal(out.respects, 0)
})

test('le public/data/htb.json commité ne contient aucun champ retiré du profil', () => {
  const { profile } = JSON.parse(readFileSync(new URL('../public/data/htb.json', import.meta.url), 'utf8'))
  for (const key of REMOVED) assert.equal(key in profile, false, `profile.${key} ne doit pas être dans htb.json`)
})
