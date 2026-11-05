// Génère les images Open Graph (1200×630) de chaque langue : public/og/og-fr.png, og-en.png, og-tr.png.
//
//   node scripts/og-images.mjs
//
// Les PNG sont commités : ce script ne tourne pas au build, il sert à les régénérer après un changement de texte.
// Rendu avec Playwright (Chromium), à partir d'un gabarit HTML qui n'utilise que les couleurs du site et ses polices
// auto-hébergées (public/fonts, licence SIL OFL). Aucune photo ni image tierce.
// Chromium : celui de Playwright par défaut, ou un autre via CHROMIUM_PATH=/chemin/vers/chrome.
import { mkdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'og')
const MAX_BYTES = 300 * 1024

// Intitulé affiché sous le nom, par langue.
const TITLES = {
  fr: 'Alternant cybersécurité & dev web',
  en: 'Cybersecurity & web dev apprentice',
  tr: 'Siber güvenlik & web geliştirme · dönüşümlü eğitim',
}

// Mêmes découpages Unicode que assets/css/fonts.css : latin, puis latin-ext pour les caractères turcs (ğ, ş, İ...).
const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
const LATIN_EXT = 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'
// Polices intégrées en base64 : Chromium refuse les polices file:// dans une page injectée avec setContent.
const font = (family, file, range) => {
  const data = readFileSync(join(ROOT, 'public', 'fonts', file)).toString('base64')
  return `@font-face{font-family:'${family}';src:url(data:font/woff2;base64,${data}) format('woff2');unicode-range:${range};font-display:block}`
}

const page = (lang) => `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
${font('Bebas Neue', 'bebas-neue-latin.woff2', LATIN)}
${font('Bebas Neue', 'bebas-neue-latin-ext.woff2', LATIN_EXT)}
${font('Space Grotesk', 'space-grotesk-latin.woff2', LATIN)}
${font('Space Grotesk', 'space-grotesk-latin-ext.woff2', LATIN_EXT)}
${font('JetBrains Mono', 'jetbrains-mono-latin.woff2', LATIN)}
${font('JetBrains Mono', 'jetbrains-mono-latin-ext.woff2', LATIN_EXT)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
body{background:#0c0c10;color:#f1ede2;font-family:'Space Grotesk',sans-serif;position:relative;overflow:hidden}
.bar{position:absolute;left:0;top:0;bottom:0;width:14px;background:#e63946}
.stripes{position:absolute;inset:0;background:repeating-linear-gradient(180deg,transparent 0 60px,rgba(241,237,226,.04) 60px 61px)}
.wrap{position:absolute;left:96px;right:96px;top:72px;bottom:72px;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:20px;font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.16em;font-weight:700}
.num{font-family:'Bebas Neue',sans-serif;font-size:44px;color:#e63946;border:2px solid #e63946;padding:2px 12px 0;letter-spacing:.04em;line-height:1.1}
.name{margin-top:auto;font-family:'Bebas Neue',sans-serif;font-size:190px;line-height:.86;letter-spacing:-.005em}
.name .ok{color:transparent;-webkit-text-stroke:3px #f1ede2}
.title{margin-top:28px;font-size:44px;font-weight:700;line-height:1.15;border-left:5px solid #e63946;padding-left:22px}
.foot{margin-top:28px;font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.12em;color:#868893}
</style></head><body><div class="stripes"></div><div class="bar"></div><div class="wrap">
<div class="top"><span class="num">23</span><span>DENIZ.OK</span></div>
<div class="name">DENIZ <span class="ok">OK</span></div>
<div class="title">${TITLES[lang]}</div>
<div class="foot">EPITECH NANCY · PORTFOLIO-DENIZ.ME</div>
</div></body></html>`

mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
try {
  for (const lang of Object.keys(TITLES)) {
    const tab = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
    await tab.setContent(page(lang), { waitUntil: 'load' })
    await tab.evaluate(() => document.fonts.ready)
    const loaded = await tab.evaluate(() => ['Bebas Neue', 'Space Grotesk', 'JetBrains Mono'].filter((f) => !document.fonts.check(`16px '${f}'`)))
    if (loaded.length) throw new Error(`polices non chargées : ${loaded.join(', ')}`)
    const file = join(OUT, `og-${lang}.png`)
    await tab.screenshot({ path: file, type: 'png' })
    await tab.close()
    const { size } = statSync(file)
    if (size > MAX_BYTES) throw new Error(`${file} : ${Math.round(size / 1024)} Ko, au-delà de ${MAX_BYTES / 1024} Ko`)
    console.log(`[og] public/og/og-${lang}.png (${Math.round(size / 1024)} Ko)`)
  }
} finally {
  await browser.close()
}
