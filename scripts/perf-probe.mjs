import { spawn } from 'node:child_process'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9340
const PROFILE = path.join(process.env.TEMP || process.cwd(), 'bnzoo-perf-profile')
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
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
  return result.result.value
}

await send('Runtime.enable')
await send('Page.enable')
await send('Page.addScriptToEvaluateOnNewDocument', {
  source: `
    window.__longTasks = [];
    if ('PerformanceObserver' in window) {
      try {
        new PerformanceObserver(function (list) {
          list.getEntries().forEach(function (entry) {
            window.__longTasks.push({
              start: entry.startTime,
              duration: entry.duration,
              name: entry.name,
              attribution: entry.attribution ? entry.attribution.map(function (a) {
                return { name: a.name, type: a.containerType, src: a.containerSrc, id: a.containerId };
              }) : []
            });
          });
        }).observe({ type: 'longtask', buffered: true });
      } catch (error) {}
    }
    window.__marks = [];
    var mark = window.performance.mark.bind(window.performance);
    window.performance.mark = function (name) {
      window.__marks.push({ name: name, at: performance.now() });
      return mark(name);
    };
  `,
})

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

await send('Page.navigate', { url: PAGE_URL })
await sleep(9000)

const data = await evaluate(`(() => ({
  tasks: window.__longTasks,
  lcp: performance.getEntriesByType('largest-contentful-paint').map(e => ({ start: e.startTime, size: e.size, element: e.element ? e.element.tagName + '#' + (e.element.id || '') : '' })),
  paints: performance.getEntriesByType('paint').map(e => ({ name: e.name, start: e.startTime })),
  nav: performance.getEntriesByType('navigation').map(e => ({ domContentLoaded: e.domContentLoadedEventEnd, load: e.loadEventEnd, responseEnd: e.responseEnd })),
  marks: window.__marks,
  memory: performance.memory ? { used: performance.memory.usedJSHeapSize } : null,
}))()`)

console.log(JSON.stringify(data, null, 2))
socket.close()
chrome.kill()
