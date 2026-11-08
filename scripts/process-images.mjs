// Convert the downloaded source photographs into responsive WebP derivatives.
import { mkdir, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'scripts', 'sources')
const outDir = path.join(root, 'public', 'images')
const widths = [640, 1200, 2000]

await mkdir(outDir, { recursive: true })
const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f) && f !== 'map-reference.jpg')

for (const file of files) {
  const slug = path.basename(file, path.extname(file))
  const input = path.join(srcDir, file)
  const meta = await sharp(input).metadata()
  for (const width of widths) {
    const out = path.join(outDir, `${slug}-${width}.webp`)
    await sharp(input)
      .resize({ width, withoutEnlargement: false, fit: 'inside' })
      .webp({ quality: width >= 2000 ? 82 : 78, effort: 5 })
      .toFile(out)
  }
  console.log(`webp  ${slug}  (source ${meta.width}x${meta.height})`)
}

// Open Graph image, 1200×630, from the hero photograph.
const hero = path.join(srcDir, 'hero-tiger.jpg')
await sharp(hero)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
  .jpeg({ quality: 86 })
  .toFile(path.join(outDir, 'og-bangladesh-national-zoo.jpg'))

console.log('\nDone. WebP derivatives + Open Graph image generated.')
