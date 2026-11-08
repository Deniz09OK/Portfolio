/**
 * État du challenge d'invitation des notes HTB : un cookie pour l'accès débloqué (persistant, lu côté serveur pour
 * éviter tout flash de contenu verrouillé au chargement) et un état partagé pour le chronomètre de speedrun, démarré
 * par l'énigme console (plugins/htb-console.client.ts) et lu/arrêté par la modale terminal (HtbTerminalModal.vue).
 */

const UNLOCK_COOKIE = 'htb_unlocked'
const UNLOCK_MAX_AGE = 60 * 60 * 24 * 365 // 1 an

export function useHtbUnlock() {
  // Boolean, not the string '1': useCookie decodes the raw cookie text with destr, which would otherwise turn
  // back into the number 1 and silently break a strict '1' comparison.
  const cookie = useCookie<true | null>(UNLOCK_COOKIE, { maxAge: UNLOCK_MAX_AGE, sameSite: 'lax' })
  // Each component's own useCookie('htb_unlocked') call holds its own ref: writing it here does not reach the
  // ref read by another component (e.g. the terminal unlocking while HtbNotes decides whether to hand off to
  // the clicked note). refreshCookie forces every such ref to re-read the browser cookie that was just written.
  function set(value: true | null) {
    cookie.value = value
    if (import.meta.client) refreshCookie(UNLOCK_COOKIE)
  }
  return {
    unlocked: computed(() => cookie.value === true),
    unlock: () => set(true),
    reset: () => set(null),
  }
}

interface HtbChallengeState {
  /** Horodatage du tout premier appel à une fonction HTB.* dans la console, ou null si l'énigme n'a pas commencé. */
  startedAt: number | null
}

function htbChallengeState() {
  return useState<HtbChallengeState>('htbChallenge', () => ({ startedAt: null }))
}

/** Démarre le chronomètre une seule fois (appels suivants sans effet), au premier HTB.* tapé dans la console. */
export function markHtbStarted() {
  const state = htbChallengeState()
  if (state.value.startedAt === null) state.value.startedAt = Date.now()
}

export function htbTimerRunning(): boolean {
  return htbChallengeState().value.startedAt !== null
}

/** Temps écoulé en millisecondes depuis le premier appel HTB.*, ou 0 si l'énigme n'a pas commencé. */
export function htbElapsedMs(): number {
  const startedAt = htbChallengeState().value.startedAt
  return startedAt === null ? 0 : Date.now() - startedAt
}

/** Arrête le chronomètre et renvoie le temps final en millisecondes. */
export function stopHtbTimer(): number {
  const elapsed = htbElapsedMs()
  htbChallengeState().value.startedAt = null
  return elapsed
}

/** Remet le chronomètre à zéro sans renvoyer de temps (bouton « Réinitialiser le challenge »). */
export function resetHtbTimer() {
  htbChallengeState().value.startedAt = null
}

/** "00:38.45" (minutes:secondes.centièmes), tabulaire pour ne pas sauter pendant le défilement. */
export function formatElapsed(ms: number): string {
  const totalCentis = Math.floor(ms / 10)
  const minutes = Math.floor(totalCentis / 6000)
  const seconds = Math.floor((totalCentis % 6000) / 100)
  const centis = totalCentis % 100
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(minutes)}:${pad(seconds)}.${pad(centis)}`
}
