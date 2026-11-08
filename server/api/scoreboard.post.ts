import { pseudoError, timeError, type ScoreboardEntry, type ScoreboardRejection } from '../../shared/htb-scoreboard'
import { appendScoreboard, readScoreboard, top } from '../utils/htbScoreboardStore'

/** Motif du rejet renvoyé au client dans statusMessage : les erreurs de forme/modération, plus l'anti-spam propre à cette route. */
type SubmitRejection = ScoreboardRejection | 'spam'

// Anti-spam minimal : un throttle par IP en mémoire. Suffisant pour un unique process Nitro de démo (npm run
// dev) ; réinitialisé à chaque redémarrage et non partagé entre instances, ce qui est sans conséquence ici.
const lastSubmitAt = new Map<string, number>()
const THROTTLE_MS = 5000

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const pseudo = typeof body?.pseudo === 'string' ? body.pseudo.trim() : body?.pseudo
  const timeMs = body?.timeMs

  const pErr = pseudoError(pseudo)
  if (pErr) throw createError({ statusCode: 422, statusMessage: pErr satisfies SubmitRejection })
  const tErr = timeError(timeMs)
  if (tErr) throw createError({ statusCode: 422, statusMessage: tErr satisfies SubmitRejection })

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const now = Date.now()
  const last = lastSubmitAt.get(ip)
  if (last !== undefined && now - last < THROTTLE_MS) {
    throw createError({ statusCode: 429, statusMessage: 'spam' satisfies SubmitRejection })
  }
  lastSubmitAt.set(ip, now)

  const entry: ScoreboardEntry = { pseudo, timeMs, date: new Date().toISOString() }
  await appendScoreboard(entry)
  return top(await readScoreboard())
})
