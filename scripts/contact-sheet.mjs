import sharp from 'sharp'
import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const dir = path.resolve('scripts/sources')
const files = (await readdir(dir)).filter((f) => f.endsWith('.jpg') && f !== 'map-reference.jpg').sort()
const cols = 4
const cellW = 360
const cellH = 270
const rows = Math.ceil(files.length / cols)

const composites = []
for (let i = 0; i < files.length; i += 1) {
  const label = files[i].replace('.jpg', '')
  const left = (i % cols) * cellW
  const top = Math.floor(i / cols) * cellH
  const img = await sharp(path.join(dir, files[i]))
    .resize({ width: cellW, height: cellH - 26, fit: 'cover', position: 'attention' })
    .toBuffer()
  composites.push({ input: img, left, top })
  const svg = `<svg width="${cellW}" height="26"><rect width="100%" height="100%" fill="#0b1f18"/><text x="8" y="18" fill="#f6f2e9" font-family="Arial" font-size="13">${label}</text></svg>`
  composites.push({ input: Buffer.from(svg), left, top: top + cellH - 26 })
}

await sharp({
  create: { width: cols * cellW, height: rows * cellH, channels: 3, background: '#f6f2e9' },
})
  .composite(composites)
  .jpeg({ quality: 82 })
  .toFile('scripts/contact-sheet.jpg')
console.log(`contact sheet: ${composites.length / 2} images, ${cols * cellW}x${rows * cellH}`)
