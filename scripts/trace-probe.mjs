import { spawn } from 'node:child_process'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9342
const PROFILE = path.join(process.env.TEMP || process.cwd(), 'bnzoo-trace-profile')
const PAGE_URL = pathToFileURL(path.join(process.cwd(), 'index.html')).href
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--allow-file-access-from-files',
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
  throw new Error('Timed out')
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
const traceEvents = []
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(JSON.stringify(message.error)))
    else resolve(message.result)
    return
  }
  if (message.method === 'Tracing.dataCollected') {
    traceEvents.push(...message.params.value)
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

await send('Runtime.enable')
await send('Page.enable')
await send('Network.enable')
await send('Network.emulateNetworkConditions', {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
})
await send('Emulation.setCPUThrottlingRate', { rate: 4 })
await send('Emulation.setDeviceMetricsOverride', {
  width: 412,
  height: 823,
  deviceScaleFactor: 2.625,
  mobile: true,
})

await send('Tracing.start', {
  categories: [
    'devtools.timeline',
    'disabled-by-default-devtools.timeline',
    'disabled-by-default-devtools.timeline.stack',
    'blink',
    'cc',
    'v8',
  ].join(','),
  options: 'sampling-frequency=1000',
  transferMode: 'ReportEvents',
})

const started = Date.now()
await send('Page.navigate', { url: PAGE_URL })
await sleep(7000)
const ended = Date.now()
await send('Tracing.end')
await sleep(1500)

const names = new Map()
const threads = new Map()
for (const event of traceEvents) {
  if (event.ph === 'M' && event.name === 'thread_name') {
    threads.set(`${event.pid}:${event.tid}`, event.args.name)
  }
  if (event.name === 'thread_name' && event.args) {
    threads.set(`${event.pid}:${event.tid}`, event.args.name)
  }
}

const mainKey = [...threads.entries()].find(([, name]) => name === 'CrRendererMain')?.[0]
console.log('trace ms', ended - started, 'events', traceEvents.length, 'main', mainKey)
for (const [key, name] of threads.entries()) {
  if (key === mainKey) console.log('thread', key, name)
}

const interesting = new Set([
  'Layout',
  'UpdateLayoutTree',
  'RecalculateStyles',
  'Paint',
  'PrePaint',
  'Layerize',
  'DecodeImage',
  'ImageDecodeTask',
  'EvaluateScript',
  'FunctionCall',
  'ParseHTML',
  'ParseAuthorStyleSheet',
  'EventDispatch',
  'TimerFire',
  'RunTask',
  'v8.run',
  'V8.Execute',
  'RasterTask',
  'GPUTask',
  'Commit',
])

const byName = new Map()
const top = []
for (const event of traceEvents) {
  if (event.ph !== 'X' || typeof event.dur !== 'number') continue
  const key = `${event.pid}:${event.tid}`
  if (mainKey && key !== mainKey) continue
  if (event.dur < 1000) continue
  const item = {
    name: event.name,
    dur: event.dur / 1000,
    start: event.ts / 1000,
    args: event.args,
  }
  top.push(item)
  if (interesting.has(event.name) || event.dur > 30000) {
    byName.set(event.name, (byName.get(event.name) || 0) + event.dur / 1000)
  }
}

console.log('\nTop main-thread events (>=1ms):')
top
  .sort((a, b) => b.dur - a.dur)
  .slice(0, 40)
  .forEach((item) => {
    console.log(
      `${item.dur.toFixed(1)}ms @${item.start.toFixed(0)}  ${item.name}  ${item.args?.data?.url || item.args?.beginData?.url || item.args?.data?.functionName || ''}`,
    )
  })

console.log('\nTotals by selected names:')
;[...byName.entries()]
  .sort((a, b) => b[1] - a[1])
  .forEach(([name, dur]) => console.log(`${dur.toFixed(1)}ms  ${name}`))

socket.close()
chrome.kill()
