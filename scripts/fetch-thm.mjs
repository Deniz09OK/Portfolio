// Récupère les stats publiques TryHackMe et écrit public/data/thm.json.
//
//   node scripts/fetch-thm.mjs
//
// L'API publique de TryHackMe renvoie 429 aux runners GitHub Actions : l'appel passe par un relais
// Cloudflare Worker qui interroge TryHackMe (le nom d'utilisateur est fixé côté Worker).
// Variables d'environnement requises (leurs valeurs ne sont jamais affichées) :
//   THM_PROXY_URL    URL du Worker
//   THM_PROXY_TOKEN  jeton envoyé dans l'en-tête X-Sync-Token
// En cas d'échec, l'ancien thm.json est conservé tel quel.
// Seuls les champs réellement affichés sont gardés : ni avatar (l'URL contient un hachage de l'e-mail),
// ni identifiant interne, ni donnée personnelle.
import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'data', 'thm.json')
const TIMEOUT_MS = 10000
const MAX_BYTES = 1_000_000
const MAX_ATTEMPTS = 3
const BASE_DELAY_MS = 5000
const JITTER_MS = 1000
const UA = 'portfolio-deniz.me thm-sync (+https://portfolio-deniz.me)'

/** Lit THM_PROXY_URL / THM_PROXY_TOKEN ; les messages d'erreur ne contiennent jamais leur valeur. */
function readConfig() {
  const url = process.env.THM_PROXY_URL
  const token = process.env.THM_PROXY_TOKEN
  const missing = [!url && 'THM_PROXY_URL', !token && 'THM_PROXY_TOKEN'].filter(Boolean)
  if (missing.length) throw new ThmError(`variable d'environnement manquante : ${missing.join(', ')}`, false)
  let parsed
  try {
    parsed = new URL(url)
  } catch {
    throw new ThmError("THM_PROXY_URL n'est pas une URL valide", false)
  }
  const local = ['127.0.0.1', 'localhost'].includes(parsed.hostname)
  if (parsed.protocol !== 'https:' && !(local && parsed.protocol === 'http:')) {
    throw new ThmError('THM_PROXY_URL doit utiliser https', false)
  }
  return { url, token }
}

class ThmError extends Error {
  /** transient : panne passagère (réseau, filtrage, 5xx) ; sinon réponse inattendue à corriger. */
  constructor(message, transient) {
    super(message)
    this.transient = transient
  }
}

async function fetchProfile({ url, token }) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  let res, text
  try {
    res = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': UA, 'X-Sync-Token': token }, signal: ctrl.signal })
    text = await res.text()
  } catch (e) {
    throw new ThmError(e.name === 'AbortError' ? `timeout après ${TIMEOUT_MS / 1000}s` : 'erreur réseau', true)
  } finally {
    clearTimeout(timer)
  }

  // Filtrage (Cloudflare), limite de requêtes ou panne côté TryHackMe : on ne casse rien.
  if (res.status === 403 || res.status === 429 || res.status >= 500) {
    throw new ThmError(`HTTP ${res.status} (accès filtré, limite atteinte ou panne côté TryHackMe)`, true)
  }
  if (!res.ok) throw new ThmError(`HTTP ${res.status} inattendu`, false)
  if (text.length > MAX_BYTES) throw new ThmError('réponse anormalement volumineuse', false)
  try {
    return JSON.parse(text)
  } catch {
    throw new ThmError('réponse non JSON', false)
  }
}

/** Retente fetchProfile() avec un backoff exponentiel + gigue, uniquement sur les erreurs transientes. */
async function fetchProfileWithRetry(config) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fetchProfile(config)
    } catch (e) {
      if (!e.transient || attempt >= MAX_ATTEMPTS) throw e
      const delay = BASE_DELAY_MS * 2 ** (attempt - 1) + Math.random() * JITTER_MS
      console.error(`[thm] tentative ${attempt}/${MAX_ATTEMPTS} échouée (${e.message}), nouvel essai dans ${Math.round(delay / 1000)}s`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}

const isCount = (v) => Number.isInteger(v) && v >= 0 && v <= 1_000_000_000

/** Valide la forme et les bornes, puis ne retient que les champs affichés. */
function parse(body) {
  if (!body || typeof body !== 'object' || body.status !== 'success') throw new ThmError('status différent de "success"', false)
  const d = body.data
  if (!d || typeof d !== 'object') throw new ThmError('champ data absent', false)

  const bad = []
  if (!isCount(d.completedRoomsNumber)) bad.push('completedRoomsNumber')
  if (!(typeof d.topPercentage === 'number' && Number.isFinite(d.topPercentage) && d.topPercentage >= 0 && d.topPercentage <= 100)) bad.push('topPercentage')
  if (!(typeof d.rank === 'string' && d.rank.length > 0 && d.rank.length <= 40 && !/[\u0000-\u001f<>]/.test(d.rank))) bad.push('rank')
  if (!isCount(d.level)) bad.push('level')
  if (!isCount(d.badgesNumber)) bad.push('badgesNumber')
  if (!isCount(d.totalPoints)) bad.push('totalPoints')
  if (bad.length) throw new ThmError(`champs invalides ou absents : ${bad.join(', ')}`, false)

  return {
    rooms: d.completedRoomsNumber,
    topPercent: d.topPercentage,
    rank: d.rank,
    level: d.level,
    badges: d.badgesNumber,
    points: d.totalPoints,
  }
}

function readPrevious() {
  try { return JSON.parse(readFileSync(OUT, 'utf8')) } catch { return null }
}

async function sync() {
  const next = parse(await fetchProfileWithRetry(readConfig()))
  const previous = readPrevious()

  // updatedAt ne bouge que si les données ont changé : pas de commit inutile côté CI.
  const { updatedAt: _old, ...before } = previous ?? {}
  if (previous && JSON.stringify(before) === JSON.stringify(next)) {
    console.log('[thm] aucune modification, fichier conservé')
    return
  }
  mkdirSync(dirname(OUT), { recursive: true })
  const tmp = `${OUT}.tmp`
  writeFileSync(tmp, JSON.stringify({ updatedAt: new Date().toISOString(), ...next }, null, 2) + '\n')
  renameSync(tmp, OUT)
  console.log(`[thm] écrit public/data/thm.json (${next.rooms} rooms, Top ${next.topPercent} %, niveau ${next.level})`)
}

sync().catch((e) => {
  const kept = existsSync(OUT) ? 'ancien public/data/thm.json conservé' : 'aucun JSON existant'
  console.error(`[thm] échec : ${e.message} (${kept})`)
  // Panne passagère : on ne casse rien (exit 0). Réponse invalide ou inattendue : à corriger, donc visible (exit 1).
  process.exitCode = e.transient ? 0 : 1
  if (e.transient) console.error('::warning::THM sync ignorée, données précédentes conservées')
})
