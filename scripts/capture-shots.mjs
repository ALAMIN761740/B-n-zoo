import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9338
const OUT = path.join(process.cwd(), '.qa-shots')
const PROFILE = path.join(process.env.TEMP || process.cwd(), 'bnzoo-shots-profile')
const PAGE_URL = pathToFileURL(path.join(process.cwd(), 'index.html')).href
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

fs.rmSync(PROFILE, { recursive: true, force: true })
fs.mkdirSync(PROFILE, { recursive: true })
fs.mkdirSync(OUT, { recursive: true })

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--allow-file-access-from-files',
    '--hide-scrollbars',
    '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + PROFILE,
    'about:blank',
  ],
  { stdio: 'ignore' },
)

async function getJson(url) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) return response.json()
    } catch {
      // retry
    }
    await sleep(150)
  }
  throw new Error('Timed out waiting for ' + url)
}

await getJson(`http://127.0.0.1:${PORT}/json/version`)
const target = (await getJson(`http://127.0.0.1:${PORT}/json/list`)).find((item) => item.type === 'page')
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

let nextId = 0
const pending = new Map()
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(JSON.stringify(message.error)))
    else resolve(message.result)
  }
})

function send(method, params = {}) {
  nextId += 1
  const id = nextId
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
  })
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true,
  })
  return result.result.value
}

async function viewport(width, height) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await sleep(220)
}

async function shot(name) {
  await sleep(700)
  const result = await send('Page.captureScreenshot', { format: 'png', fromSurface: true })
  fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(result.data, 'base64'))
  console.log('wrote', name + '.png')
}

await send('Runtime.enable')
await send('Page.enable')
await send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
})
await viewport(1280, 860)
await send('Page.navigate', { url: PAGE_URL })
for (let i = 0; i < 60; i += 1) {
  if (await evaluate("document.readyState === 'complete'")) break
  await sleep(150)
}
await evaluate("document.querySelectorAll('#animal-grid .animal-card').length")
await shot('1280-hero')

const sections = [
  ['1280-today', '#today'],
  ['1280-attractions', '#attractions'],
  ['1280-animals', '#animals'],
  ['1280-visit', '#visit'],
  ['1280-learn', '#learn'],
  ['1280-news', '#news'],
  ['1280-faq', '#faq'],
  ['1280-contact', '#contact'],
]
for (const [name, selector] of sections) {
  await evaluate(`document.querySelector('${selector}').scrollIntoView({ block: 'start' })`)
  await shot(name)
}

await viewport(1280, 860)
await evaluate("document.querySelector('#theme-toggle').click()")
await evaluate('window.scrollTo(0, 0)')
await shot('1280-hero-dark')
await evaluate("document.querySelector('#theme-toggle').click()")

await viewport(360, 780)
await evaluate('window.scrollTo(0, 0)')
await shot('360-hero')
for (const [name, selector] of [
  ['360-today', '#today'],
  ['360-attractions', '#attractions'],
  ['360-animals', '#animals'],
  ['360-visit', '#visit'],
  ['360-learn', '#learn'],
  ['360-contact', '#contact'],
]) {
  await evaluate(`document.querySelector('${selector}').scrollIntoView({ block: 'start' })`)
  await shot(name)
}

await evaluate("document.querySelector('#menu-toggle').click()")
await shot('360-menu')

socket.close()
chrome.kill()
