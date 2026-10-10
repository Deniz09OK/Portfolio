export interface ThmData {
  updatedAt: string
  rooms: number
  topPercent: number
  rank: string
  level: number
  badges: number
  points: number
}

/**
 * TryHackMe stats written by scripts/fetch-thm.mjs (see .github/workflows/htb-sync.yml). Read from disk while the
 * page is prerendered (an HTTP self-request deadlocks the dev server), fetched in the browser otherwise.
 * A missing or malformed file gives null, which renders the proof link without figures.
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
      const d = json as Partial<ThmData> | null
      return d && Number.isInteger(d.rooms) && typeof d.topPercent === 'number' ? (d as ThmData) : null
    } catch {
      return null
    }
  })
  return data
}
