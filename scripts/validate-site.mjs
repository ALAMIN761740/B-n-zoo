import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const root = process.cwd()
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')

const sandbox = { window: {} }
vm.createContext(sandbox)
vm.runInContext(fs.readFileSync(path.join(root, 'js/data.js'), 'utf8'), sandbox)
const zoo = sandbox.window.ZOO
const translations = zoo.translations

function get(object, keyPath) {
  return keyPath.split('.').reduce((value, key) => (value == null ? undefined : value[key]), object)
}

const i18nKeys = [...html.matchAll(/data-i18n(?:-aria|-placeholder)?="([^"]+)"/g)].map((match) => match[1])
const uniqueKeys = [...new Set(i18nKeys)]
const missingKeys = uniqueKeys.filter(
  (key) => get(translations.en, key) === undefined || get(translations.bn, key) === undefined,
)

const imageBases = new Set()
const htmlImages = [...html.matchAll(/images\/([a-z0-9-]+)\.(?:webp|jpg|jpeg|png|svg)/gi)].map((match) => match[1])
for (const name of htmlImages) {
  if (/-(640|1200|2000)$/.test(name)) {
    imageBases.add(name.replace(/-(640|1200|2000)$/, ''))
  } else if (name !== 'favicon' && !name.startsWith('og-')) {
    imageBases.add(name)
  }
}

function walk(value) {
  if (Array.isArray(value)) {
    value.forEach(walk)
    return
  }
  if (!value || typeof value !== 'object') return
  for (const [key, entry] of Object.entries(value)) {
    if (key === 'image' && typeof entry === 'string') imageBases.add(entry)
    walk(entry)
  }
}
walk(zoo)

const missingImages = []
for (const base of imageBases) {
  for (const width of [640, 1200, 2000]) {
    const file = path.join(root, 'images', `${base}-${width}.webp`)
    if (!fs.existsSync(file)) missingImages.push(path.relative(root, file))
  }
}

const dataScripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1])
const cssLinks = [...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map((match) => match[1])
const assetProblems = [...dataScripts, ...cssLinks].filter(
  (file) => !file.startsWith('http') && !fs.existsSync(path.join(root, file)),
)

console.log(`i18n keys: ${uniqueKeys.length}, missing: ${missingKeys.length}`)
if (missingKeys.length) console.log(missingKeys)
console.log(`image bases: ${imageBases.size}, missing variants: ${missingImages.length}`)
if (missingImages.length) console.log(missingImages)
console.log(`local assets referenced: ${dataScripts.length + cssLinks.length}, missing: ${assetProblems.length}`)
if (assetProblems.length) console.log(assetProblems)

const anchorTargets = [...new Set([...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]))]
const missingAnchors = anchorTargets.filter((id) => !new RegExp(`id="${id}"`).test(html))
console.log(`in-page anchors: ${anchorTargets.length}, missing targets: ${missingAnchors.length}`)
if (missingAnchors.length) console.log(missingAnchors)

const cardCounts = {
  attractions: zoo.attractions.length,
  animals: zoo.animals.length,
  news: zoo.news.length,
  faqs: zoo.faqs.length,
}
console.log('content counts:', cardCounts)

const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
const schemaTypes = []
for (const block of jsonLdBlocks) {
  const parsed = JSON.parse(block[1])
  schemaTypes.push(...(parsed['@graph'] || [parsed]).map((item) => item['@type']))
}
console.log(`JSON-LD blocks: ${jsonLdBlocks.length}, types: ${schemaTypes.join(', ')}`)

if (missingKeys.length || missingImages.length || assetProblems.length || missingAnchors.length) {
  process.exitCode = 1
}
