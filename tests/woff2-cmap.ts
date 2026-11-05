// Reads the Unicode code points mapped by a WOFF2 font (its cmap table), with Node only: no font library needed.
// WOFF2 = 48-byte header, a table directory, then one Brotli stream holding the tables one after the other.
import { brotliDecompressSync } from 'node:zlib'

const GLYF = 10
const LOCA = 11
const CMAP = 0

/** Variable-length unsigned integer of the WOFF2 table directory. */
function base128(buf: Buffer, pos: { at: number }): number {
  let value = 0
  for (let i = 0; i < 5; i++) {
    const byte = buf[pos.at++]!
    value = value * 128 + (byte & 0x7f)
    if (!(byte & 0x80)) return value
  }
  throw new Error('UIntBase128 too long')
}

function cmapTable(woff2: Buffer): Buffer {
  if (woff2.toString('latin1', 0, 4) !== 'wOF2') throw new Error('not a WOFF2 file')
  const numTables = woff2.readUInt16BE(12)
  const compressedSize = woff2.readUInt32BE(20)
  const pos = { at: 48 }
  const tables: { index: number; length: number }[] = []
  for (let i = 0; i < numTables; i++) {
    const flags = woff2[pos.at++]!
    const index = flags & 0x3f
    if (index === 63) pos.at += 4 // arbitrary tag
    const version = flags >> 6
    const origLength = base128(woff2, pos)
    const transformed = index === GLYF || index === LOCA ? version !== 3 : version !== 0
    tables.push({ index, length: transformed ? base128(woff2, pos) : origLength })
  }
  const data = brotliDecompressSync(woff2.subarray(pos.at, pos.at + compressedSize))
  let offset = 0
  for (const t of tables) {
    if (t.index === CMAP) return data.subarray(offset, offset + t.length)
    offset += t.length
  }
  throw new Error('no cmap table')
}

/** Code points mapped to a glyph by the Unicode subtables (formats 4 and 12) of the font's cmap. */
export function woff2CodePoints(woff2: Buffer): Set<number> {
  const cmap = cmapTable(woff2)
  const points = new Set<number>()
  const count = cmap.readUInt16BE(2)
  for (let i = 0; i < count; i++) {
    const platform = cmap.readUInt16BE(4 + i * 8)
    const encoding = cmap.readUInt16BE(6 + i * 8)
    const unicode = platform === 0 || (platform === 3 && (encoding === 1 || encoding === 10))
    if (!unicode) continue
    const sub = cmap.readUInt32BE(8 + i * 8)
    const format = cmap.readUInt16BE(sub)
    if (format === 4) {
      const segs = cmap.readUInt16BE(sub + 6) / 2
      const ends = sub + 14
      const starts = ends + segs * 2 + 2
      const deltas = starts + segs * 2
      const rangeOffsets = deltas + segs * 2
      for (let s = 0; s < segs; s++) {
        const end = cmap.readUInt16BE(ends + s * 2)
        const start = cmap.readUInt16BE(starts + s * 2)
        const delta = cmap.readUInt16BE(deltas + s * 2)
        const rangeOffset = cmap.readUInt16BE(rangeOffsets + s * 2)
        for (let c = start; c <= end && c !== 0xffff; c++) {
          let glyph: number
          if (rangeOffset === 0) glyph = (c + delta) & 0xffff
          else {
            glyph = cmap.readUInt16BE(rangeOffsets + s * 2 + rangeOffset + (c - start) * 2)
            if (glyph) glyph = (glyph + delta) & 0xffff
          }
          if (glyph) points.add(c)
        }
      }
    } else if (format === 12) {
      const groups = cmap.readUInt32BE(sub + 12)
      for (let g = 0; g < groups; g++) {
        const at = sub + 16 + g * 12
        const first = cmap.readUInt32BE(at)
        const last = cmap.readUInt32BE(at + 4)
        const glyph = cmap.readUInt32BE(at + 8)
        for (let c = first; c <= last; c++) if (glyph + (c - first)) points.add(c)
      }
    }
  }
  return points
}
