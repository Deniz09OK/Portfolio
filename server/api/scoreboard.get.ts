import { readScoreboard, top } from '../utils/htbScoreboardStore'

// Top 10 du Hall of Fame. N'existe qu'en mode serveur (npm run dev / un vrai Nitro) : sur le site statique
// publié (GitHub Pages), cette route n'est jamais déployée et la modale retombe sur son mode hors-ligne.
export default defineEventHandler(async () => top(await readScoreboard()))
