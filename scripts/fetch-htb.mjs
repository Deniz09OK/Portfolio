// Récupère les stats publiques Hack The Box et écrit public/data/htb.json.
//
//   node scripts/fetch-htb.mjs           écrit le JSON (conserve l'ancien en cas d'échec)
//   node scripts/fetch-htb.mjs --probe   teste des chemins candidats (statut HTTP + clés uniquement)
//
// Le jeton est lu dans process.env.API_TOKEN, ou à défaut dans .env. Il n'est jamais affiché.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { hasMeaningfulChange } from './htb-compare.mjs'
import { tokenShapeError } from './htb-token.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'data', 'htb.json')
const BASE = 'https://labs.hackthebox.com/api/v4'
const USER_ID = 4005432
const TIMEOUT_MS = 15000
const UA = 'portfolio-deniz.me htb-sync (+https://portfolio-deniz.me)'

function loadToken() {
  if (process.env.API_TOKEN) return process.env.API_TOKEN.trim()
  const envFile = join(ROOT, '.env')
  if (!existsSync(envFile)) return ''
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*API_TOKEN\s*=\s*(.*?)\s*$/)
    if (m) return m[1].replace(/^(['"])(.*)\1$/, '$2')
  }
  return ''
}

const TOKEN = loadToken()

class HtbError extends Error {
  /**
   * status : code HTTP (0 = réseau ou timeout). html : la réponse était une page HTML, pas du JSON.
   * config : problème de configuration (jeton absent ou mal formé), détecté avant tout appel.
   */
  constructor(message, status, { html = false, config = false } = {}) {
    super(message)
    this.status = status
    this.html = html
    this.config = config
  }
}

/** Titre d'une page HTML, nettoyé et tronqué, pour l'afficher dans un message d'erreur. */
function htmlTitle(text) {
  const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(text)
  if (!m) return null
  const title = m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  return title ? title.slice(0, 120) : null
}

/** Un message ne doit jamais contenir le jeton, même s'il était renvoyé dans une réponse. */
const redact = (msg) => (TOKEN ? msg.split(TOKEN).join('***') : msg)

async function api(path) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(BASE + path, {
      headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json', 'User-Agent': UA },
      signal: ctrl.signal,
    })
    const text = await res.text()
    let body = null
    try { body = JSON.parse(text) } catch { /* corps non JSON */ }
    const isHtml = body === null && /^\s*(<!doctype html|<html)/i.test(text)
    return { status: res.status, body, isHtml, title: isHtml ? htmlTitle(text) : null }
  } catch (e) {
    throw new HtbError(e.name === 'AbortError' ? `timeout après ${TIMEOUT_MS / 1000}s sur ${path}` : `erreur réseau sur ${path}`, 0)
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Appel qui lève une erreur lisible : chemin appelé, code HTTP, et nature de la réponse quand ce n'est pas du JSON.
 * Une page HTML (page de connexion, défi anti-robot, route déplacée...) est signalée avec son titre.
 */
async function get(path) {
  const { status, body, isHtml, title } = await api(path)
  const where = `HTTP ${status} sur ${path}`
  if (isHtml) {
    throw new HtbError(redact(`${where} : réponse HTML au lieu de JSON${title ? ` (titre : « ${title} »)` : ''}. Page de connexion, protection anti-robot ou route déplacée ?`), status, { html: true })
  }
  if (status === 401) throw new HtbError(`${where} : authentification refusée. Vérifier le jeton (App Token valide, non expiré) et que cette route l'accepte toujours.`, status)
  if (status === 403) throw new HtbError(`${where} : accès refusé (droits du jeton, User-Agent ou filtrage côté Hack The Box ?)`, status)
  if (status === 429) throw new HtbError(`${where} : limite de requêtes atteinte, réessayer plus tard`, status)
  if (status >= 400) throw new HtbError(`${where}${body?.message ? ` : ${redact(String(body.message)).slice(0, 200)}` : ''}`, status)
  if (body === null) throw new HtbError(`${where} : réponse vide ou non JSON`, status)
  return body
}

function keysOf(v, depth = 0) {
  if (Array.isArray(v)) return `[${v.length}] ` + (v[0] && typeof v[0] === 'object' ? `{${Object.keys(v[0]).join(',')}}` : typeof v[0])
  if (v && typeof v === 'object') {
    const ks = Object.keys(v)
    if (depth >= 1) return `{${ks.join(',')}}`
    return ks.map((k) => (v[k] && typeof v[k] === 'object' ? `${k}:${keysOf(v[k], depth + 1)}` : k)).join(' | ')
  }
  return typeof v
}

async function probe() {
  const id = USER_ID
  const paths = [
    '/user/info',
    `/user/profile/basic/${id}`,
    `/user/profile/overview/${id}`,
    `/user/profile/progress/machines/os/${id}`,
    `/user/profile/progress/challenges/${id}`,
    `/user/profile/activity/${id}`,
    `/user/profile/badges/${id}`,
    `/user/profile/content/machines/${id}`,
    `/profile/${id}`,
    `/rankings/user/ranking_bracket/${id}`,
    `/rankings/users`,
    `/season/list`,
    `/season/user/rank/${id}`,
    `/season/user/rank`,
    `/season/leaderboard/user`,
  ]
  const extra = process.argv.slice(process.argv.indexOf('--probe') + 1).filter((a) => a.startsWith('/'))
  for (const p of extra.length ? extra : paths) {
    try {
      const { status, body } = await api(p)
      console.log(`${String(status).padEnd(4)} ${p}\n     ${body ? keysOf(body) : '(corps non JSON)'}${status >= 400 && body?.message ? ' => ' + JSON.stringify(body.message).slice(0, 200) : ''}`)
    } catch (e) {
      console.log(`ERR  ${p}\n     ${e.message}`)
    }
  }
}

const ERRORS_FATAL = new Set([0, 401, 403, 429])
const round = (n, d = 1) => (typeof n === 'number' ? Math.round(n * 10 ** d) / 10 ** d : null)

async function fetchProfile() {
  const { profile: p } = await get(`/profile/${USER_ID}`)
  return {
    id: p.id,
    name: p.name,
    rank: p.rank,
    nextRank: p.next_rank ?? null,
    rankProgress: round(p.current_rank_progress),
    points: p.points,
    globalRanking: p.ranking ?? null,
    systemOwns: p.system_owns,
    userOwns: p.user_owns,
    bloods: (p.user_bloods ?? 0) + (p.system_bloods ?? 0) + (p.challenge_bloods ?? 0),
    respects: p.respects ?? 0,
    country: p.country_code ?? null,
    joinedAt: p.joined_date ? new Date(p.joined_date).toISOString().slice(0, 10) : null,
    url: `https://app.hackthebox.com/users/${USER_ID}`,
  }
}

async function fetchMachines() {
  // Les flags "résolu" de la liste des machines concernent le propriétaire du jeton : on vérifie que c'est bien le profil affiché.
  const me = await get('/user/info')
  if (me?.info?.id !== USER_ID) throw new HtbError(`le jeton n'appartient pas au profil ${USER_ID}, boxes ignorées`, 400)

  const owned = []
  for (const base of ['/machine/paginated', '/machine/list/retired/paginated']) {
    for (let page = 1, last = 1; page <= last && page <= 40; page++) {
      const body = await get(`${base}?per_page=100&page=${page}`)
      last = body.meta?.last_page ?? 1
      for (const m of body.data ?? []) {
        if (m.authUserInUserOwns || m.authUserInRootOwns) owned.push(m)
      }
    }
  }

  const boxes = []
  for (const m of owned) {
    let solvedAt = null
    try {
      const { info } = await get(`/machine/profile/${encodeURIComponent(m.name)}`)
      if (info?.machinePwnedDate) solvedAt = new Date(info.machinePwnedDate.replace(' ', 'T') + 'Z').toISOString()
    } catch (e) {
      if (ERRORS_FATAL.has(e.status) || e.html) throw e
    }
    boxes.push({
      name: m.name,
      difficulty: m.difficultyText,
      os: m.os,
      solved: m.authUserInRootOwns ? 'root' : 'user',
      solvedAt,
    })
  }
  // Plus récentes d'abord ; sans date à la fin.
  boxes.sort((a, b) => (b.solvedAt ?? '').localeCompare(a.solvedAt ?? '') || a.name.localeCompare(b.name))
  return boxes
}

async function fetchSeason() {
  const { data: seasons } = await get('/season/list')
  const current = seasons.find((s) => s.active)
  if (!current) return null
  const { data: r } = await get(`/season/user/rank/${current.id}`)
  return {
    id: current.id,
    name: current.name,
    endsAt: current.end_date ? new Date(current.end_date).toISOString() : null,
    league: r.league,
    rank: r.rank,
    totalPlayers: r.total_ranks,
    points: r.total_season_points,
    nextLeague: r.next_rank?.title ?? null,
    flags: r.total_season_flags,
    bloods: r.total_season_bloods ?? 0,
  }
}

function readPrevious() {
  try { return JSON.parse(readFileSync(OUT, 'utf8')) } catch { return null }
}

async function sync() {
  const previous = readPrevious()
  const next = { profile: await fetchProfile() }

  // Sections secondaires : en cas d'échec non fatal (route modifiée...), on garde la version précédente.
  for (const [key, fn] of [['boxes', fetchMachines], ['season', fetchSeason]]) {
    try {
      next[key] = await fn()
    } catch (e) {
      if (ERRORS_FATAL.has(e.status) || e.html) throw e
      console.warn(`[htb] section "${key}" ignorée : ${e.message}`)
      next[key] = previous?.[key] ?? (key === 'boxes' ? [] : null)
    }
  }

  const serialized = JSON.stringify(next)
  if (TOKEN && serialized.includes(TOKEN)) throw new HtbError('le jeton apparaît dans les données, écriture annulée', 0)

  // Le fichier n'est réécrit (updatedAt compris) que si une donnée affichée par le site a changé : les champs
  // volatils (classements...) sont ignorés par la comparaison, ce qui évite un commit et un déploiement inutiles.
  if (!hasMeaningfulChange(previous, next)) {
    console.log('[htb] aucune modification significative, fichier conservé')
    return
  }
  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), ...next }, null, 2) + '\n')
  console.log(`[htb] écrit public/data/htb.json (${next.boxes.length} boxes, rang ${next.profile.rank}, saison ${next.season?.name ?? 'n/a'})`)
}

async function main() {
  // Forme du jeton vérifiée avant tout appel : un jeton mal formé ne part jamais vers l'API.
  const tokenError = tokenShapeError(TOKEN)
  if (tokenError) throw new HtbError(tokenError, 0, { config: true })
  if (process.argv.includes('--probe')) return probe()
  return sync()
}

main().catch((e) => {
  const kept = existsSync(OUT) ? 'ancien public/data/htb.json conservé' : 'aucun JSON existant'
  console.error(`[htb] échec : ${e.message} (${kept})`)
  // Authentification refusée ou page HTML à la place du JSON : à corriger, donc visible (exit 1).
  // Panne passagère (429, timeout, 5xx) : on ne casse rien.
  process.exitCode = e.config || e.status === 401 || e.status === 403 || e.html ? 1 : 0
  if (process.exitCode === 0) console.error('::warning::HTB sync ignorée, données précédentes conservées')
})
