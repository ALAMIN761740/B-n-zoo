import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9336
const PROFILE = path.join(process.env.TEMP || process.cwd(), 'bnzoo-chrome-test')
const PAGE_URL = pathToFileURL(path.join(process.cwd(), 'index.html')).href

fs.rmSync(PROFILE, { recursive: true, force: true })
fs.mkdirSync(PROFILE, { recursive: true })

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--allow-file-access-from-files',
    '--autoplay-policy=no-user-gesture-required',
    '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + PROFILE,
    'about:blank',
  ],
  { stdio: 'ignore' },
)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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

const version = await getJson(`http://127.0.0.1:${PORT}/json/version`)
const targets = await getJson(`http://127.0.0.1:${PORT}/json/list`)
const target = targets.find((item) => item.type === 'page')
if (!target) throw new Error('No page target')

const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

let nextId = 0
const pending = new Map()
const consoleErrors = []
const exceptions = []
const logErrors = []

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(JSON.stringify(message.error)))
    else resolve(message.result)
    return
  }
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
    consoleErrors.push(
      message.params.args.map((arg) => arg.value || arg.description || arg.type).join(' '),
    )
  }
  if (message.method === 'Runtime.exceptionThrown') {
    const detail = message.params.exceptionDetails
    exceptions.push(detail.exception?.description || detail.text)
  }
  if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
    logErrors.push(message.params.entry.text + ' ' + (message.params.entry.url || ''))
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
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text)
  }
  return result.result.value
}

async function waitFor(expression, label, timeout = 8000) {
  const started = Date.now()
  while (Date.now() - started < timeout) {
    if (await evaluate(expression)) return true
    await sleep(120)
  }
  throw new Error('Timed out waiting for: ' + label)
}

async function setViewport(width, height = 900) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await sleep(220)
}

const results = []
function check(label, pass, detail = '') {
  results.push({ label, pass: Boolean(pass), detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? ' — ' + detail : ''}`)
}

await send('Runtime.enable')
await send('Page.enable')
await send('Log.enable')
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] })
await setViewport(1280)

await send('Page.navigate', { url: PAGE_URL })
await waitFor("document.readyState === 'complete'", 'page load')
await waitFor("document.querySelectorAll('#animal-grid .animal-card').length > 0", 'animal cards rendered')

const initial = await evaluate(`(() => ({
  lang: document.documentElement.lang,
  theme: document.documentElement.dataset.theme,
  title: document.title,
  attractions: document.querySelectorAll('#attraction-grid .attraction-card').length,
  animals: document.querySelectorAll('#animal-grid .animal-card').length,
  news: document.querySelectorAll('#news-grid article, #news-grid .news-card').length,
  faqs: document.querySelectorAll('#faq-list .faq-item').length,
  currentNav: [...document.querySelectorAll('.primary-nav a')].map(a => a.textContent.trim()),
  status: document.querySelector('#zoo-status')?.textContent.trim(),
  statusDetail: document.querySelector('#zoo-status-detail')?.textContent.trim(),
  dhaka: document.querySelector('#dhaka-time')?.textContent.trim(),
  year: document.querySelector('#footer-year')?.textContent.trim(),
  h1: document.querySelector('h1')?.textContent.replace(/\\s+/g, ' ').trim(),
}))()`)

check('Page loads via file://', initial.lang === 'en', initial.title)
check('Attractions rendered', initial.attractions === 8, String(initial.attractions))
check('Animals rendered', initial.animals === 23, String(initial.animals))
check('News shows three cards', initial.news === 3, String(initial.news))
check('FAQs rendered', initial.faqs === 8, String(initial.faqs))
check(
  'Navigation labels match brief',
  JSON.stringify(initial.currentNav) ===
    JSON.stringify(['Home', 'Plan a Visit', 'Animals & Exhibits', 'Map', 'Learn & Conserve', 'News & Notices', 'Contact']),
  initial.currentNav.join(' | '),
)
check('Today status populated', Boolean(initial.status && initial.status !== '—'), `${initial.status} / ${initial.statusDetail}`)
check('Dhaka clock populated', Boolean(initial.dhaka && initial.dhaka !== '—'), initial.dhaka)
check('Footer year current', initial.year === String(new Date().getFullYear()), initial.year)

const overflow = []
for (const width of [360, 414, 768, 1024, 1280, 1440]) {
  await setViewport(width)
  const data = await evaluate(`(() => {
    const doc = document.documentElement;
    const header = document.querySelector('.header-inner');
    const wide = [...document.querySelectorAll('body *')].filter(el => {
      const style = getComputedStyle(el);
      if (style.position === 'fixed') return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1);
    }).slice(0, 8).map(el => el.tagName + '.' + String(el.className).split(' ').slice(0, 2).join('.') + ' [' + Math.round(el.getBoundingClientRect().left) + ',' + Math.round(el.getBoundingClientRect().right) + ']');
    return { inner: window.innerWidth, scroll: doc.scrollWidth, headerFit: header.scrollWidth <= header.clientWidth, wide };
  })()`)
  overflow.push({ width, ...data })
  check(`No horizontal scroll at ${width}px`, data.scroll <= data.inner + 1, `scrollWidth ${data.scroll}`)
  check(`Header fits its content at ${width}px`, data.headerFit, data.headerFit ? '' : 'header content overflows')
}
console.log('Overflow detail:', JSON.stringify(overflow.filter((row) => row.scroll > row.inner + 1 || row.wide.length)))

await setViewport(360)
const brandFit = await evaluate(`(() => {
  const name = document.querySelector('.brand-name');
  return { scroll: name.scrollWidth, client: name.clientWidth, text: name.textContent.trim() };
})()`)
check('Brand name readable at 360px', brandFit.scroll <= brandFit.client + 1, JSON.stringify(brandFit))

await setViewport(1280)
await evaluate(`document.querySelector('[data-lang="bn"]').click()`)
await sleep(400)
const bengali = await evaluate(`(() => ({
  lang: document.documentElement.lang,
  nav: document.querySelector('.primary-nav a').textContent.trim(),
  visit: document.querySelectorAll('.primary-nav a')[1].textContent.trim(),
  title: document.title,
  animals: document.querySelectorAll('#animal-grid .animal-card').length,
  date: document.querySelector('#today-date').textContent.trim(),
  navPressed: document.querySelector('[data-lang="bn"]').getAttribute('aria-pressed'),
}))()`)
check('Bengali toggle switches language', bengali.lang === 'bn' && bengali.nav === 'হোম', bengali.nav)
check('Bengali nav uses Plan a Visit translation', bengali.visit === 'ভ্রমণের পরিকল্পনা', bengali.visit)
check('Bengali re-renders content', bengali.animals === 23 && Boolean(bengali.date), `${bengali.animals} cards / ${bengali.date}`)
check('Bengali title updates', bengali.title.startsWith('বাংলাদেশ'), bengali.title)
check('Bengali button pressed state', bengali.navPressed === 'true', bengali.navPressed)

await evaluate(`document.querySelector('[data-lang="en"]').click()`)
await sleep(400)
const englishAgain = await evaluate(`document.documentElement.lang + '|' + document.querySelector('.primary-nav a').textContent.trim()`)
check('Language returns to English', englishAgain === 'en|Home', englishAgain)

const themeBefore = await evaluate(`document.documentElement.dataset.theme`)
await evaluate(`document.querySelector('#theme-toggle').click()`)
await sleep(250)
const themeDark = await evaluate(`(() => ({
  theme: document.documentElement.dataset.theme,
  pressed: document.querySelector('#theme-toggle').getAttribute('aria-pressed'),
  bg: getComputedStyle(document.body).backgroundColor,
  stored: (() => { try { return localStorage.getItem('bnzoo.theme') } catch { return null } })(),
}))()`)
check('Dark mode toggles', themeDark.theme === 'dark' && themeDark.pressed === 'true', `${themeBefore} → ${themeDark.theme}, ${themeDark.bg}`)
check('Theme preference stored', themeDark.stored === 'dark', String(themeDark.stored))
await evaluate(`document.querySelector('#theme-toggle').click()`)
await sleep(250)
check('Light mode restores', (await evaluate(`document.documentElement.dataset.theme`)) === 'light')

const filterAll = await evaluate(`(() => {
  const before = document.querySelectorAll('#animal-grid .animal-card').length;
  const mammalButton = [...document.querySelectorAll('#animal-filters [data-category]')].find(b => b.dataset.category === 'mammals');
  mammalButton.click();
  return { before, pressed: mammalButton.getAttribute('aria-pressed'), after: document.querySelectorAll('#animal-grid .animal-card').length };
})()`)
await sleep(250)
const mammalCount = await evaluate(`document.querySelectorAll('#animal-grid .animal-card').length`)
check('Mammal filter narrows results', mammalCount > 0 && mammalCount < 23, `${filterAll.before} → ${mammalCount}`)

await evaluate(`(() => {
  const allButton = [...document.querySelectorAll('#animal-filters [data-category]')].find(b => b.dataset.category === 'all');
  allButton.click();
})()`)
await sleep(200)
const searchCount = await evaluate(`(() => {
  const input = document.querySelector('#animal-search');
  input.value = 'tiger';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  const cards = [...document.querySelectorAll('#animal-grid .animal-card')];
  return { count: cards.length, text: cards.map(c => c.textContent.toLowerCase()).join(' ') };
})()`)
await sleep(250)
const searchResult = await evaluate(`(() => {
  const cards = [...document.querySelectorAll('#animal-grid .animal-card')];
  return { count: cards.length, titles: cards.map(c => c.querySelector('.animal-card__title')?.textContent.trim()) };
})()`)
check('Search finds tiger', searchResult.count >= 1 && searchResult.titles.some((title) => /tiger/i.test(title)), JSON.stringify(searchResult))

const noResult = await evaluate(`(() => {
  const input = document.querySelector('#animal-search');
  input.value = 'zzzzzz';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  return new Promise(resolve => setTimeout(() => resolve({
    count: document.querySelectorAll('#animal-grid .animal-card').length,
    emptyVisible: !document.querySelector('#animal-empty').hidden
  }), 120));
})()`)
check('Empty search state appears', noResult.count === 0 && noResult.emptyVisible === true, JSON.stringify(noResult))
await evaluate(`document.querySelector('#animal-reset').click()`)
await sleep(250)
check('Reset restores all animals', (await evaluate(`document.querySelectorAll('#animal-grid .animal-card').length`)) === 23)

const faq = await evaluate(`(() => {
  const button = document.querySelector('#faq-list .faq-question');
  const panel = document.querySelector('#faq-list .faq-answer');
  button.click();
  const opened = { expanded: button.getAttribute('aria-expanded'), hidden: panel.hidden };
  button.click();
  const closed = { expanded: button.getAttribute('aria-expanded'), hidden: panel.hidden };
  return { opened, closed };
})()`)
check('FAQ accordion opens and closes', faq.opened.expanded === 'true' && faq.opened.hidden === false && faq.closed.expanded === 'false' && faq.closed.hidden === true, JSON.stringify(faq))

async function testDialog(trigger, label) {
  const data = await evaluate(`(() => {
    const trigger = ${trigger};
    trigger.click();
    const dialog = document.querySelector('#detail-dialog');
    return {
      open: dialog.open,
      title: document.querySelector('#dialog-title')?.textContent.trim(),
      body: document.querySelector('#dialog-body')?.textContent.replace(/\\s+/g, ' ').trim().slice(0, 120),
    };
  })()`)
  await sleep(200)
  const isOpen = await evaluate(`document.querySelector('#detail-dialog').open`)
  check(`${label} dialog opens`, isOpen && Boolean(data.title || data.body), `${data.title || ''} ${data.body || ''}`.slice(0, 130))
  await evaluate(`document.querySelector('#dialog-close').click()`)
  await sleep(220)
  const closed = await evaluate(`document.querySelector('#detail-dialog').open`)
  check(`${label} dialog closes`, closed === false, String(closed))
}

await testDialog(`document.querySelector('#attraction-grid [data-attraction]')`, 'Attraction')
await testDialog(`document.querySelector('#animal-grid [data-animal]')`, 'Animal')
await testDialog(`document.querySelector('#news-grid [data-news]')`, 'News')
await testDialog(`document.querySelector('#credits-open')`, 'Photo credits')

const counters = await evaluate(`(() => {
  document.querySelector('.stats-section').scrollIntoView({ block: 'center' });
  return new Promise(resolve => setTimeout(() => resolve([...document.querySelectorAll('.stat-value')].map(el => el.textContent.trim())), 1800));
})()`)
check(
  'Animated counters reach targets',
  counters[0] === '186' && counters[1] === '137+' && counters[2] === '3,000+' && counters[3] === '1974',
  counters.join(' / '),
)

await setViewport(360, 800)
await evaluate(`window.scrollTo(0, 0)`)
await sleep(250)
const menu = await evaluate(`(() => {
  const button = document.querySelector('#menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  button.click();
  const opened = { expanded: button.getAttribute('aria-expanded'), hidden: menu.getAttribute('aria-hidden'), inert: menu.inert };
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  return new Promise(resolve => setTimeout(() => resolve({ opened, closed: button.getAttribute('aria-expanded'), inert: menu.inert }), 300));
})()`)
check('Mobile menu opens and closes', menu.opened.expanded === 'true' && menu.closed === 'false', JSON.stringify(menu))

await evaluate(`document.querySelector('#menu-toggle').click()`)
await sleep(250)
const focusable = await evaluate(`(() => {
  const panel = document.querySelector('#mobile-menu');
  const nodes = [...panel.querySelectorAll('a, button')].filter(el => !el.disabled && el.getClientRects().length);
  const first = nodes[0];
  if (first) first.focus();
  return { count: nodes.length, focusInside: panel.contains(document.activeElement) };
})()`)
check('Mobile menu is keyboard focusable', focusable.count >= 7 && focusable.focusInside, JSON.stringify(focusable))
await evaluate(`document.querySelector('#menu-close').click()`)

await setViewport(360, 800)
const reduced = await evaluate(`(() => {
  const style = getComputedStyle(document.querySelector('.hero'));
  return { overflowX: getComputedStyle(document.body).overflowX, scrollWidth: document.documentElement.scrollWidth, inner: window.innerWidth };
})()`)
check('360px viewport remains within bounds', reduced.scrollWidth <= reduced.inner + 1, JSON.stringify(reduced))

await evaluate(`document.querySelector('[data-lang="bn"]').click()`)
await sleep(400)
const bengali360 = await evaluate(`(() => {
  const header = document.querySelector('.header-inner');
  return {
    inner: window.innerWidth,
    scroll: document.documentElement.scrollWidth,
    headerFit: header.scrollWidth <= header.clientWidth,
    lang: document.documentElement.lang,
  };
})()`)
check(
  '360px layout holds in Bengali',
  bengali360.lang === 'bn' && bengali360.scroll <= bengali360.inner + 1 && bengali360.headerFit,
  JSON.stringify(bengali360),
)
await evaluate(`document.querySelector('[data-lang="en"]').click()`)
await sleep(350)

const brokenImages = await evaluate(`[...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc || img.src)`)
check('All rendered images load', brokenImages.length === 0, brokenImages.join(', '))

const errors = [...consoleErrors, ...exceptions, ...logErrors].filter(
  (message) => !/favicon|OpenStreetMap|tile\.openstreetmap|ERR_BLOCKED|net::/i.test(message),
)
check('No JavaScript console errors', errors.length === 0, errors.join(' || ').slice(0, 500))

const summary = {
  passed: results.filter((row) => row.pass).length,
  failed: results.filter((row) => !row.pass).length,
  results,
}
console.log('\nSUMMARY', JSON.stringify({ passed: summary.passed, failed: summary.failed }))
fs.writeFileSync(path.join(process.env.TEMP || '.', 'bnzoo-browser-results.json'), JSON.stringify(summary, null, 2))

socket.close()
chrome.kill()
await sleep(300)
if (summary.failed) process.exitCode = 1
