// Small formatting helpers shared by components and composables.

/** Two-digit counter: 7 -> "07". */
export const pad = (n: number): string => String(n).padStart(2, '0')

/** CSS modifier of an HTB difficulty: "Easy" -> "htb-diff--easy". */
export const diffClass = (d: string): string => `htb-diff--${d.toLowerCase().replace(/[^a-z]/g, '')}`
