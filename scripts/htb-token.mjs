// Vérification de la forme du jeton Hack The Box, sans jamais l'afficher.
// Un App Token Hack The Box est un JWT : trois segments non vides séparés par des points (en-tête.charge.signature).
// Un jeton d'une autre forme (copie partielle, autre type de clé...) est refusé avant tout appel à l'API.

/** Message d'erreur si le jeton n'a pas la forme d'un App Token, sinon null. Le message ne contient jamais le jeton. */
export function tokenShapeError(token) {
  if (typeof token !== 'string' || token.length === 0) return 'API_TOKEN absent (variable d\'environnement ou .env)'
  if (/\s/.test(token)) return 'API_TOKEN invalide : il contient un espace ou un retour à la ligne (copie incomplète ?). Le jeton n\'est pas affiché.'
  const segments = token.split('.')
  if (segments.length !== 3) {
    return `API_TOKEN invalide : ${segments.length} segment${segments.length > 1 ? 's' : ''} séparé${segments.length > 1 ? 's' : ''} par des points au lieu de 3. `
      + 'Un App Token Hack The Box (app.hackthebox.com, Profile Settings, App Tokens) est un JWT en trois parties. Le jeton n\'est pas affiché.'
  }
  if (segments.some((s) => s.length === 0)) return 'API_TOKEN invalide : l\'un de ses 3 segments est vide. Le jeton n\'est pas affiché.'
  return null
}
