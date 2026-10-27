// Tests unitaires de scripts/htb-compare.mjs : `npm run test:unit` (node:test, sans navigateur).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { comparableView, hasMeaningfulChange, VOLATILE_FIELDS } from '../scripts/htb-compare.mjs'

const base = () => ({
  updatedAt: '2026-10-27T05:08:18.766Z',
  profile: {
    id: 4005432, name: 'Sorouto', rank: 'Script Kiddie', nextRank: 'Hacker', rankProgress: 33.6, points: 12,
    globalRanking: 1007, systemOwns: 10, userOwns: 11, bloods: 0, respects: 0, country: 'FR', joinedAt: '2026-09-23',
    url: 'https://app.hackthebox.com/users/4005432',
  },
  boxes: [
    { name: 'DutyBound', difficulty: 'Medium', os: 'Linux', solved: 'root', solvedAt: '2026-10-26T11:51:21.000Z' },
    { name: 'Layover', difficulty: 'Medium', os: 'Linux', solved: 'user', solvedAt: null },
  ],
  season: {
    id: 21, name: 'Season 12', endsAt: '2026-11-28T19:00:01.000Z', league: 'Silver', rank: 2530, totalPlayers: 5815,
    points: 140, nextLeague: 'Ruby', flags: { obtained: 5, total: 18 }, bloods: 0,
  },
})
const { updatedAt: _u, ...baseNext } = base() // une synchro produit les données sans updatedAt

test('sans fichier précédent, la synchro est écrite', () => {
  assert.equal(hasMeaningfulChange(null, baseNext), true)
})

test('données identiques : rien à écrire', () => {
  assert.equal(hasMeaningfulChange(base(), baseNext), false)
})

test('seuls season.rank et season.totalPlayers changent : rien à écrire', () => {
  const next = structuredClone(baseNext)
  next.season.rank = 2535
  next.season.totalPlayers = 5826
  assert.equal(hasMeaningfulChange(base(), next), false)
})

test('tous les champs volatils changent : rien à écrire', () => {
  const next = structuredClone(baseNext)
  next.profile.globalRanking = 990
  next.profile.rankProgress = 40.2
  next.profile.points = 15
  next.profile.respects = 3
  next.season.rank = 1
  next.season.totalPlayers = 9999
  assert.equal(hasMeaningfulChange(base(), next), false)
})

test("l'ordre des clés n'a pas d'effet", () => {
  const next = { season: baseNext.season, boxes: baseNext.boxes, profile: Object.fromEntries(Object.entries(baseNext.profile).reverse()) }
  assert.equal(hasMeaningfulChange(base(), next), false)
})

test('une box ajoutée est écrite', () => {
  const next = structuredClone(baseNext)
  next.boxes.unshift({ name: 'Cap', difficulty: 'Easy', os: 'Linux', solved: 'root', solvedAt: '2026-10-28T10:00:00.000Z' })
  assert.equal(hasMeaningfulChange(base(), next), true)
})

test('une box qui passe de user à root est écrite', () => {
  const next = structuredClone(baseNext)
  Object.assign(next.boxes[1], { solved: 'root', solvedAt: '2026-10-28T10:00:00.000Z' })
  assert.equal(hasMeaningfulChange(base(), next), true)
})

for (const [label, edit] of [
  ['flag de saison', (n) => { n.season.flags.obtained = 6 }],
  ['points de saison', (n) => { n.season.points = 160 }],
  ['ligue', (n) => { n.season.league = 'Ruby'; n.season.nextLeague = 'Platinum' }],
  ['nouvelle saison', (n) => { n.season.id = 22; n.season.name = 'Season 13' }],
  ['bloods du profil', (n) => { n.profile.bloods = 1 }],
  ['machines root du profil', (n) => { n.profile.systemOwns = 11 }],
  ['machines user du profil', (n) => { n.profile.userOwns = 12 }],
]) {
  test(`${label} : écrit`, () => {
    const next = structuredClone(baseNext)
    edit(next)
    assert.equal(hasMeaningfulChange(base(), next), true)
  })
}

test('la saison qui apparaît ou disparaît est écrite, deux saisons absentes sont égales', () => {
  const noSeason = { ...structuredClone(baseNext), season: null }
  assert.equal(hasMeaningfulChange({ ...base(), season: null }, noSeason), false)
  assert.equal(hasMeaningfulChange(base(), noSeason), true)
  assert.equal(hasMeaningfulChange({ ...base(), season: null }, baseNext), true)
})

test("comparableView n'altère pas ses entrées et retire exactement les champs volatils", () => {
  const data = base()
  const copy = structuredClone(data)
  const view = comparableView(data)
  assert.deepEqual(data, copy)
  assert.equal('updatedAt' in view, false)
  for (const [section, fields] of Object.entries(VOLATILE_FIELDS)) {
    for (const f of fields) assert.equal(f in view[section], false, `${section}.${f}`)
  }
  assert.equal(view.profile.userOwns, 11)
  assert.equal(view.season.flags.obtained, 5)
})
