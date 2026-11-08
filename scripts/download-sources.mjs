// Download curated, licensed source photography from Wikimedia Commons.
import { mkdir, readFile, writeFile, access } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'scripts', 'sources')
await mkdir(outDir, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const exists = (p) => access(p).then(() => true, () => false)

async function download(url, destination, slug) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (res.ok) {
      await writeFile(destination, Buffer.from(await res.arrayBuffer()))
      return
    }
    if (res.status === 429 || res.status >= 500) {
      const wait = attempt * 4000
      console.log(`retry ${slug} in ${wait / 1000}s (${res.status})`)
      await sleep(wait)
      continue
    }
    throw new Error(`Download failed ${slug}: ${res.status}`)
  }
  throw new Error(`Download failed after retries: ${slug}`)
}

const sources = JSON.parse(await readFile(path.join(root, 'scripts', 'sources.json'), 'utf8'))
const entries = Object.entries(sources)
const UA = 'BNZooWebsiteBuild/1.0 (local build; respectful API use)'

const chunks = []
for (let i = 0; i < entries.length; i += 45) chunks.push(entries.slice(i, i + 45))

const credits = {}
let count = 0

for (const chunk of chunks) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    titles: chunk.map(([, title]) => title).join('|'),
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: '2400',
  })
  const data = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { 'User-Agent': UA },
  }).then((r) => r.json())

  const pages = Object.values(data?.query?.pages ?? {})
  const byTitle = new Map()
  for (const page of pages) {
    const info = page.imageinfo?.[0]
    if (info) byTitle.set(page.title, info)
  }

  for (const [slug, title] of chunk) {
    const info = byTitle.get(title)
    if (!info) {
      console.warn(`MISS  ${slug} — ${title}`)
      continue
    }
    const meta = info.extmetadata ?? {}
    const artist = (meta.Artist?.value ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    const license = meta.LicenseShortName?.value ?? 'See source'
    const isMapRef = slug === 'map-reference'

    credits[slug] = {
      title: info.descriptionurl ? title.replace(/^File:/, '') : title,
      author: artist || 'Unknown',
      license,
      source: info.descriptionurl,
    }

    if (!isMapRef) {
      const url = info.thumburl || info.url
      const destination = path.join(outDir, `${slug}.jpg`)
      if (await exists(destination)) {
        console.log(`skip  ${slug}`)
        continue
      }
      await download(url, destination, slug)
    } else {
      const res = await fetch(info.thumburl || info.url, { headers: { 'User-Agent': UA } })
      if (res.ok) await writeFile(path.join(outDir, `map-reference.jpg`), Buffer.from(await res.arrayBuffer()))
    }
    count += 1
    console.log(`ok    ${slug}  ${info.width}x${info.height}  ${license}`)
    await sleep(900)
  }
}

await writeFile(path.join(root, 'scripts', 'image-credits.json'), JSON.stringify(credits, null, 2))
console.log(`\nDownloaded ${count} images. Credits written to scripts/image-credits.json`)
