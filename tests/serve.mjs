// Minimal static server for the generated site, mimicking GitHub Pages:
// serves .output/public and answers unknown paths with 404.html and a 404 status.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const ROOT = join(process.cwd(), '.output', 'public')
const PORT = Number(process.env.PORT || 4173)
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
}

async function resolveFile(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '')
  let file = join(ROOT, safe)
  if (!file.startsWith(ROOT)) return null
  const info = await stat(file).catch(() => null)
  if (info?.isDirectory()) file = join(file, 'index.html')
  else if (!info) return null
  return (await stat(file).catch(() => null)) ? file : null
}

createServer(async (req, res) => {
  const file = await resolveFile(new URL(req.url, 'http://localhost').pathname)
  const served = file || join(ROOT, '404.html')
  const body = await readFile(served)
  res.writeHead(file ? 200 : 404, { 'Content-Type': TYPES[extname(served)] || 'application/octet-stream' })
  res.end(body)
}).listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`))
