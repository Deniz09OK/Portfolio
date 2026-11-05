// Tests unitaires des métadonnées des CV publiés : `npm run test:unit` (node:test, sans navigateur).
// Échoue si un CV exporté (Canva ou autre) est publié sans passer par scripts/clean-cv.py.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const CVS = [
  { file: 'cv-deniz-ok-fr.pdf', title: 'Deniz OK — CV', lang: 'fr' },
  { file: 'cv-deniz-ok-en.pdf', title: 'Deniz OK — CV (English)', lang: 'en' },
]
const AUTHOR = 'Deniz OK'
const FIX = 'relancer python3 scripts/clean-cv.py'

// PDFDocEncoding : seuls les octets 0x80-0x9E diffèrent de Latin-1 (PDF 32000-1, annexe D).
const PDFDOC = '•†‡…—–ƒ⁄‹›−‰„“”‘’‚™ﬁﬂŁŒŠŸŽıłœšž'

/** Décode une chaîne PDF littérale « (...) » ou hexadécimale « <...> » (UTF-16BE avec BOM, sinon PDFDocEncoding). */
export function pdfString(raw) {
  let bytes = []
  if (raw.startsWith('<')) {
    const hex = raw.slice(1, -1).replace(/\s+/g, '')
    for (let i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.slice(i, i + 2).padEnd(2, '0'), 16))
  } else {
    const body = raw.slice(1, -1)
    const esc = { n: 10, r: 13, t: 9, b: 8, f: 12, '(': 40, ')': 41, '\\': 92 }
    for (let i = 0; i < body.length; i++) {
      const c = body[i]
      if (c !== '\\') { bytes.push(c.charCodeAt(0)); continue }
      const n = body[++i]
      const oct = body.slice(i).match(/^[0-7]{1,3}/)
      if (oct) { bytes.push(parseInt(oct[0], 8) & 0xff); i += oct[0].length - 1 } else if (n in esc) bytes.push(esc[n])
      else if (n === '\r' || n === '\n') { if (n === '\r' && body[i + 1] === '\n') i++ } else bytes.push(n.charCodeAt(0))
    }
  }
  if (bytes[0] === 0xfe && bytes[1] === 0xff) {
    let s = ''
    for (let i = 2; i + 1 < bytes.length; i += 2) s += String.fromCharCode((bytes[i] << 8) | bytes[i + 1])
    return s
  }
  return bytes.map((b) => (b >= 0x80 && b <= 0x9e ? PDFDOC[b - 0x80] : String.fromCharCode(b))).join('')
}

/** Dictionnaire Info du PDF (objet désigné par le dernier /Info du fichier), clé -> chaîne brute. */
function infoDict(pdf) {
  const refs = [...pdf.matchAll(/\/Info\s+(\d+)\s+(\d+)\s+R/g)]
  assert.ok(refs.length, 'aucun dictionnaire /Info')
  const [, num, gen] = refs.at(-1)
  const obj = pdf.match(new RegExp(`(?:^|[\\r\\n])${num}\\s+${gen}\\s+obj\\s*<<([\\s\\S]*?)>>\\s*endobj`))
  assert.ok(obj, `objet ${num} ${gen} introuvable (dictionnaire Info compressé ?)`)
  const entries = {}
  for (const m of obj[1].matchAll(/\/(\w+)\s*(\((?:\\.|[^\\)])*\)|<[0-9a-fA-F\s]*>|\/\w+|[\w.+-]+)/g)) entries[m[1]] = m[2]
  return entries
}

test('décode les chaînes PDF', () => {
  assert.equal(pdfString('(Deniz OK \\204 CV)'), 'Deniz OK — CV')
  assert.equal(pdfString('<FEFF00440020004F004B>'), 'D OK')
  assert.equal(pdfString('(a\\(b\\)c)'), 'a(b)c')
})

for (const { file, title, lang } of CVS) {
  test(`${file} : métadonnées nettoyées`, () => {
    const pdf = readFileSync(join(ROOT, 'public', file)).toString('latin1')
    const utf8 = readFileSync(join(ROOT, 'public', file)).toString('utf8')

    const info = infoDict(pdf)
    assert.deepEqual(Object.keys(info).sort(), ['Author', 'Title'], `Info : titre et auteur seulement, ${FIX}`)
    assert.equal(pdfString(info.Title), title)
    assert.equal(pdfString(info.Author), AUTHOR)

    const langs = [...pdf.matchAll(/\/Lang\s*(\([^)]*\))/g)].map((m) => pdfString(m[1]))
    assert.deepEqual(langs, [lang], 'langue du document')

    const xmp = utf8.match(/<x:xmpmeta[\s\S]*?<\/x:xmpmeta>/g)
    assert.equal(xmp?.length, 1, `un seul flux XMP lisible, ${FIX}`)
    assert.ok(xmp[0].includes(`<rdf:li xml:lang="x-default">${title}</rdf:li>`), 'dc:title')
    assert.ok(xmp[0].includes(`<rdf:li>${AUTHOR}</rdf:li>`), 'dc:creator')
    assert.match(xmp[0], new RegExp(`<dc:language>\\s*<rdf:Bag>\\s*<rdf:li>${lang}</rdf:li>`), 'dc:language')

    assert.doesNotMatch(pdf, /canva/i, `trace du logiciel de conception, ${FIX}`)
    for (const key of ['/Producer', '/Creator', '/Keywords', '/CreationDate', '/ModDate', 'CreatorTool', 'CreateDate', 'ModifyDate', 'MetadataDate', 'pdf:Producer', 'pdf:Keywords']) {
      assert.ok(!pdf.includes(key), `${key} présent, ${FIX}`)
    }
  })
}
