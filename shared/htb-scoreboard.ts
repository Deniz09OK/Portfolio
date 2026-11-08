// Validation partagée par l'API Nitro (server/api/scoreboard.*.ts), le composant qui soumet un score
// (HtbTerminalModal.vue) et les tests unitaires (tests/htb-scoreboard.unit.mjs). Des fonctions pures : aucune
// dépendance au système de fichiers ni à la requête HTTP, pour rester testables sans navigateur ni serveur.

export interface ScoreboardEntry {
  pseudo: string
  timeMs: number
  /** ISO 8601, horodatage serveur (jamais fourni par le client). */
  date: string
}

/** Alphanumérique strict + "_", "-", "." : aucun caractère HTML, aucune injection possible. */
export const PSEUDO_PATTERN = /^[a-zA-Z0-9_\-.]{2,16}$/

// Temps minimum réaliste pour taper le code trouvé (anti triche par script qui soumettrait un temps à 0).
const MIN_TIME_MS = 2000
// Au-delà, ce n'est plus un speedrun : la page a probablement été laissée ouverte entre deux sessions.
const MAX_TIME_MS = 60 * 60 * 1000

/** Grossièretés et insultes courantes (FR/EN), comparées sur un pseudo normalisé (minuscules, chiffres repliés sur
 * les lettres qu'ils imitent). Liste volontairement courte : un filtre strict mais permissif sur les faux positifs. */
const BLOCKLIST = [
  'merde', 'putain', 'connard', 'conard', 'salope', 'enculé', 'encule', 'batard', 'bâtard', 'pute', 'nazi',
  'fuck', 'shit', 'bitch', 'cunt', 'asshole', 'nigger', 'nigga', 'faggot', 'whore', 'slut',
]

function normalize(pseudo: string): string {
  return pseudo
    .toLowerCase()
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
}

export type ScoreboardRejection = 'shape' | 'profanity' | 'time-too-fast' | 'time-too-slow'

/** `null` si le pseudo est recevable, sinon le motif du rejet (jamais le détail exact du mot bloqué). */
export function pseudoError(pseudo: unknown): ScoreboardRejection | null {
  if (typeof pseudo !== 'string' || !PSEUDO_PATTERN.test(pseudo)) return 'shape'
  const n = normalize(pseudo)
  if (BLOCKLIST.some((bad) => n.includes(bad))) return 'profanity'
  return null
}

export function timeError(timeMs: unknown): ScoreboardRejection | null {
  if (typeof timeMs !== 'number' || !Number.isFinite(timeMs) || !Number.isInteger(timeMs)) return 'shape'
  if (timeMs < MIN_TIME_MS) return 'time-too-fast'
  if (timeMs > MAX_TIME_MS) return 'time-too-slow'
  return null
}
