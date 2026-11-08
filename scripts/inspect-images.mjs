import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const dir = path.resolve('scripts/sources')
const files = (await readdir(dir)).filter((f) => f.endsWith('.jpg'))
for (const file of files) {
  try {
    const m = await sharp(path.join(dir, file)).metadata()
    console.log(`${file}: ${m.format} ${m.width}x${m.height}`)
  } catch (e) {
    console.log(`${file}: ERROR ${e.message}`)
  }
}
