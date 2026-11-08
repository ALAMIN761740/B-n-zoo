// Dev helper: search Wikimedia Commons for candidate wildlife photography.
import { writeFile } from 'node:fs/promises'

const terms = process.argv.slice(2)
if (!terms.length) {
  console.error('Usage: node scripts/search-images.mjs "Royal Bengal tiger" "Asian elephant" ...')
  process.exit(1)
}

const UA = 'BNZooWebsiteBuild/1.0 (local development; contact: webmaster@example.com)'
const report = []

for (const term of terms) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: `${term} filetype:bitmap`,
    gsrnamespace: '6',
    gsrlimit: '8',
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: '1400',
  })
  const data = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { 'User-Agent': UA },
  }).then((r) => r.json())

  const pages = Object.values(data?.query?.pages ?? {})
  report.push({ term, results: [] })
  for (const page of pages) {
    const info = page.imageinfo?.[0]
    if (!info || info.mime === 'image/svg+xml') continue
    const meta = info.extmetadata ?? {}
    report.at(-1).results.push({
      title: page.title,
      width: info.width,
      height: info.height,
      thumb: info.thumburl,
      url: info.url,
      page: info.descriptionurl,
      artist: (meta.Artist?.value ?? '').replace(/<[^>]+>/g, '').slice(0, 120),
      license: meta.LicenseShortName?.value ?? '',
      description: (meta.ImageDescription?.value ?? '').replace(/<[^>]+>/g, '').slice(0, 160),
    })
  }
  console.log(`\n### ${term}`)
  report.at(-1).results.forEach((r, i) => {
    console.log(`${i + 1}. ${r.title} [${r.width}x${r.height}] ${r.license} — ${r.artist}`)
    console.log(`   ${r.thumb}`)
  })
}

await writeFile('scripts/image-candidates.json', JSON.stringify(report, null, 2))
