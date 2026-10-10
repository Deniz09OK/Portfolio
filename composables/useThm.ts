export interface ThmData {
  updatedAt: string
  rooms: number
  topPercent: number
  rank: string
  level: number
  badges: number
  points: number
}

const isCount = (v: unknown) => typeof v === 'number' && Number.isInteger(v) && v >= 0

/** Shape and bounds check of a parsed thm.json: anything else is treated as "no data". */
function isThmData(v: unknown): v is ThmData {
  const d = v as Partial<Record<keyof ThmData, unknown>> | null
  return (
    !!d &&
    typeof d === 'object' &&
    typeof d.updatedAt === 'string' &&
    !Number.isNaN(Date.parse(d.updatedAt)) &&
    isCount(d.rooms) &&
    typeof d.topPercent === 'number' &&
    d.topPercent >= 0 &&
    d.topPercent <= 100 &&
    typeof d.rank === 'string' &&
    isCount(d.level) &&
    isCount(d.badges) &&
    isCount(d.points)
  )
}

/**
 * TryHackMe stats written by scripts/fetch-thm.mjs (see .github/workflows/htb-sync.yml). Read from disk while the
 * page is prerendered (an HTTP self-request deadlocks the dev server), fetched in the browser otherwise.
 * A missing or malformed file gives null, which renders the fallback state without figures.
 */
export async function useThm() {
  const { data } = await useAsyncData<ThmData | null>('thm-stats', async () => {
    try {
      let json: unknown
      if (import.meta.server) {
        const { readFile } = await import('node:fs/promises')
        const { join } = await import('node:path')
        json = JSON.parse(await readFile(join(process.cwd(), 'public', 'data', 'thm.json'), 'utf8'))
      } else {
        json = await $fetch('/data/thm.json')
      }
      return isThmData(json) ? json : null
    } catch {
      return null
    }
  })
  return data
}
