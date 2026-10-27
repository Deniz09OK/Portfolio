// Décide si une nouvelle synchro Hack The Box mérite d'être écrite dans public/data/htb.json.
//
// Certains champs bougent à chaque exécution (classements, nombre de joueurs...) sans que le site les affiche
// (components/HtbStats.vue) : les comparer provoquerait un commit et un déploiement toutes les 6 h pour rien.
// Ces champs restent écrits dans le JSON quand il est réécrit, ils sont seulement ignorés par la comparaison.

/** Champs volatils non affichés, par section du JSON. À garder en phase avec components/HtbStats.vue. */
export const VOLATILE_FIELDS = {
  profile: ['globalRanking', 'rankProgress', 'points', 'respects'],
  season: ['rank', 'totalPlayers'],
}

/** Copie profonde dont les clés d'objets sont triées : deux données identiques donnent le même JSON. */
function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sortKeys(value[k])]))
  }
  return value
}

/** Les données sans updatedAt ni champs volatils, dans un ordre de clés stable. L'entrée n'est pas modifiée. */
export function comparableView(data) {
  const { updatedAt: _updatedAt, ...rest } = structuredClone(data ?? {})
  for (const [section, fields] of Object.entries(VOLATILE_FIELDS)) {
    if (rest[section] && typeof rest[section] === 'object') for (const f of fields) delete rest[section][f]
  }
  return sortKeys(rest)
}

/** Vrai quand une donnée affichée a changé (ou qu'il n'y a pas encore de fichier précédent). */
export function hasMeaningfulChange(previous, next) {
  if (!previous) return true
  return JSON.stringify(comparableView(previous)) !== JSON.stringify(comparableView(next))
}
