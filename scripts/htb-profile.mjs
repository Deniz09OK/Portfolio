// Profil Hack The Box tel qu'il est publié dans public/data/htb.json.
//
// Le fichier est lisible par tous à /data/htb.json : on n'y écrit que ce que components/HtbStats.vue affiche
// (machines user/root, bloods, lien du profil) et ce que la comparaison de scripts/htb-compare.mjs utilise
// (respects). Le rang, les points, le classement global, le pays et la date d'inscription ne sont pas affichés
// et ne sont donc pas publiés. Fonction pure : testée sans appel à l'API (tests/htb-profile.unit.mjs).

/** @param p profil brut renvoyé par `/profile/<id>`, @param userId identifiant du profil affiché */
export function publicProfile(p, userId) {
  return {
    name: p.name,
    systemOwns: p.system_owns,
    userOwns: p.user_owns,
    bloods: (p.user_bloods ?? 0) + (p.system_bloods ?? 0) + (p.challenge_bloods ?? 0),
    respects: p.respects ?? 0,
    url: `https://app.hackthebox.com/users/${userId}`,
  }
}
