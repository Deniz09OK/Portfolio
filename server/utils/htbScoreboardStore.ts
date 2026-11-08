import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { ScoreboardEntry } from '../../shared/htb-scoreboard'

// .data/ est ignoré par git (voir .gitignore) : un fichier simple suffit pour une démo locale, pas besoin d'une
// vraie base. En hébergement statique (GitHub Pages), ce fichier n'existe jamais : voir server/api/scoreboard.*.ts.
const FILE = join(process.cwd(), '.data', 'htb-scoreboard.json')
const MAX_ENTRIES = 50

export async function readScoreboard(): Promise<ScoreboardEntry[]> {
  try {
    const raw = JSON.parse(await readFile(FILE, 'utf8'))
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

/** Ajoute une entrée, garde les MAX_ENTRIES meilleurs temps, et persiste le résultat. */
export async function appendScoreboard(entry: ScoreboardEntry): Promise<ScoreboardEntry[]> {
  const next = [...(await readScoreboard()), entry].sort((a, b) => a.timeMs - b.timeMs).slice(0, MAX_ENTRIES)
  await mkdir(dirname(FILE), { recursive: true })
  await writeFile(FILE, JSON.stringify(next, null, 2))
  return next
}

export function top(entries: ScoreboardEntry[], n = 10): ScoreboardEntry[] {
  return entries.slice(0, n)
}
