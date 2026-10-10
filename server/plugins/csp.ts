// Content-Security-Policy as a <meta> tag: GitHub Pages cannot send custom HTTP headers.
// frame-ancestors, report-uri and sandbox are ignored in a <meta> CSP, so they are left out.
// Inline scripts (the theme snippet from nuxt.config.ts, Nuxt's window.__NUXT__ config, which embeds the
// build id) are allowed by their SHA-256 hash, computed on the final HTML of every prerendered page.

function policy(scriptHashes: string[]) {
  return {
    'default-src': ["'self'"],
    'script-src': ["'self'", ...scriptHashes],
    // Vue renders :style and v-show as style attributes and Nuxt inlines the global CSS: no hash can cover them.
    'style-src': ["'self'", "'unsafe-inline'"],
    // data: for the SVG favicon declared in nuxt.config.ts.
    'img-src': ["'self'", 'data:'],
    'font-src': ["'self'"],
    // Browser requests are same-origin only: Nuxt's app manifest checks (/_nuxt/builds/*.json), and
    // /data/htb.json if the prerendered payload lacks the HTB stats.
    'connect-src': ["'self'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'object-src': ["'none'"],
  }
}

const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi
// type="application/json" (Nuxt payload, unhead payload) is data, never executed: no hash needed.
const EXECUTABLE_TYPE = /^(|module|text\/javascript|application\/javascript)$/i

async function sha256(code: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code))
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
}

async function inlineScriptHashes(chunks: string[]) {
  const hashes = new Set<string>()
  for (const chunk of chunks) {
    for (const [, attrs = '', code = ''] of chunk.matchAll(SCRIPT)) {
      const type = /\btype\s*=\s*["']?([^"'\s>]*)/i.exec(attrs)?.[1] ?? ''
      if (/\bsrc\s*=/i.test(attrs) || !EXECUTABLE_TYPE.test(type)) continue
      hashes.add(`'sha256-${await sha256(code)}'`)
    }
  }
  return [...hashes]
}

export default defineNitroPlugin((nitroApp) => {
  // Development: Vite's HMR client needs eval and a websocket, so the CSP only exists in production builds.
  if (import.meta.dev) return

  nitroApp.hooks.hook('render:html', async (html) => {
    const hashes = await inlineScriptHashes([...html.head, ...html.bodyPrepend, ...html.body, ...html.bodyAppend])
    const content = Object.entries(policy(hashes)).map(([name, values]) => `${name} ${values.join(' ')}`).join('; ')
    const meta = `<meta http-equiv="Content-Security-Policy" content="${content}">`

    // A <meta> CSP only applies to what follows it: put it right after <meta charset>, before any script.
    const charset = html.head.findIndex((chunk) => /<meta charset=/i.test(chunk))
    if (charset === -1) html.head.unshift(meta)
    else html.head[charset] = html.head[charset]!.replace(/<meta charset=[^>]*>/i, (tag) => tag + meta)
  })
})
