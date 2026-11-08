// Easter egg des notes HTB : une énigme d'invitation dans le style de l'API d'onboarding de la machine
// TwoMillion, jouée dans la vraie console du navigateur (jamais dans l'UI) — elle ne s'active donc que pour
// un visiteur qui ouvre les DevTools et explore par lui-même. Le chronomètre démarre au premier appel.
//
// window.HTB.help()         -> message d'accueil, démarre le chrono, oriente vers howToUnlock()
// window.HTB.howToUnlock()  -> payload JSON dont le hint est en ROT13 (à décoder pour trouver le prochain appel)
// window.HTB.generateCode() -> renvoie le code d'accès final, encodé en Base64

function rot13(input: string): string {
  return input.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

const HINT_PLAIN = 'Call HTB.generateCode() to get your access code.'
// Décode en HTB-DENIZ-PWN3D-2027 (voir shared/htb-scoreboard.ts et HtbTerminalModal.vue pour la vérification).
const CODE_BASE64 = 'SFRCLURFTklaLVBXTjNELTIwMjc='

export default defineNuxtPlugin(() => {
  function help() {
    markHtbStarted()
    console.log('%cHTB ACCESS TERMINAL', 'color:#00D9A3;font-family:monospace;font-weight:700;font-size:14px')
    console.log('%cWelcome, operator. The clock just started. Try HTB.howToUnlock() next.', 'font-family:monospace')
  }

  function howToUnlock() {
    markHtbStarted()
    const payload = { status: 'locked', hint: rot13(HINT_PLAIN) }
    console.log(JSON.stringify(payload, null, 2))
    return payload
  }

  function generateCode() {
    markHtbStarted()
    console.log('%cAccess code (base64): ' + CODE_BASE64, 'color:#00D9A3;font-family:monospace')
    return CODE_BASE64
  }

  Object.defineProperty(window, 'HTB', {
    value: Object.freeze({ help, howToUnlock, generateCode }),
    writable: false,
    configurable: false,
  })
})
