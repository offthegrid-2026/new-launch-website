// Layout + interaction checks across breakpoints. Needs the dev server running.
//   npm run dev  →  node scripts/verify-layout.mjs [baseUrl] [screenshotDir]
import { chromium } from 'playwright'

const BASE = process.argv[2] || 'http://localhost:5173'
const SHOTS = process.argv[3]
const WIDTHS = [360, 390, 430, 768, 1280, 1440]
const results = []
const fail = (msg) => results.push(`FAIL ${msg}`)
const pass = (msg) => results.push(`ok   ${msg}`)

const browser = await chromium.launch()

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: width < 768 ? 800 : 900 } })
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(BASE, { waitUntil: 'networkidle' })

  // scroll through so lazy images + in-view animations settle
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms))
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y)
      await wait(120)
    }
    await wait(800)
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(600)

  const m = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const containers = [...document.querySelectorAll('.page > section, footer')].map((s) => {
      const c = s.querySelector(':scope > div[class*="container"]')
      const r = c.getBoundingClientRect()
      return { id: s.id || 'footer', left: Math.round(r.left), right: Math.round(vw - r.right) }
    })
    const eye = document.querySelector('#why img')?.getBoundingClientRect()
    const heading = document.querySelector('#why-title')?.getBoundingClientRect()
    return {
      vw,
      scrollW: document.documentElement.scrollWidth,
      containers,
      eye: eye && { w: eye.width, h: eye.height, top: eye.top, right: eye.right },
      headingTop: heading?.top,
      vh: window.innerHeight,
      h1: document.querySelectorAll('h1').length,
    }
  })

  m.scrollW > m.vw ? fail(`${width}: horizontal overflow (${m.scrollW} > ${m.vw})`) : pass(`${width}: no horizontal overflow`)
  const edges = new Set(m.containers.map((c) => `${c.left}/${c.right}`))
  edges.size === 1
    ? pass(`${width}: all ${m.containers.length} sections share edges ${[...edges][0]}`)
    : fail(`${width}: edges differ ${JSON.stringify(m.containers)}`)
  if (m.eye) {
    // phones: the eye sits below the heading; wider: beside it
    const ok = m.eye.h <= m.vh * 0.4 + 1 && m.eye.right <= m.vw && (width >= 768 || m.eye.top > m.headingTop)
    ;(ok ? pass : fail)(`${width}: eye ${Math.round(m.eye.w)}×${Math.round(m.eye.h)} (cap ${Math.round(m.vh * 0.4)}h)`)
  }
  m.h1 === 1 ? pass(`${width}: one h1`) : fail(`${width}: ${m.h1} h1 elements`)

  // pass flip: mouse there, keyboard back
  const card = page.locator('#passes article').first()
  const front = card.getByRole('button', { name: 'View inclusions' })
  await front.scrollIntoViewIfNeeded()
  await front.click()
  await page.waitForTimeout(900)
  const flipped = await card.evaluate((el) => ({
    expanded: el.querySelector('button').getAttribute('aria-expanded'),
    frontInert: el.querySelectorAll('[class*="face"]')[0].inert,
    backInert: el.querySelectorAll('[class*="face"]')[1].inert,
    focus: document.activeElement?.textContent,
    sameSize: (() => {
      const [a, b] = [...el.querySelectorAll('[class*="face"]')].map((f) => [f.offsetWidth, f.offsetHeight].join('x'))
      return a === b
    })(),
  }))
  const flipOk = flipped.expanded === 'true' && flipped.frontInert && !flipped.backInert && /Back to pass/.test(flipped.focus) && flipped.sameSize
  ;(flipOk ? pass : fail)(`${width}: flip by mouse ${JSON.stringify(flipped)}`)
  await page.keyboard.press('Enter')
  await page.waitForTimeout(900)
  const back = await card.evaluate((el) => ({
    expanded: el.querySelector('button').getAttribute('aria-expanded'),
    focus: document.activeElement?.textContent,
  }))
  ;(back.expanded === 'false' && back.focus === 'View inclusions' ? pass : fail)(`${width}: flip back by keyboard ${JSON.stringify(back)}`)

  // FAQ accordion
  const q = page.locator('#faq button').nth(1)
  await q.scrollIntoViewIfNeeded()
  await q.click()
  await page.waitForTimeout(600)
  const opened = await q.evaluate((b) => [b.getAttribute('aria-expanded'), document.getElementById(b.getAttribute('aria-controls')).getBoundingClientRect().height])
  await q.click()
  await page.waitForTimeout(600)
  const closed = await q.evaluate((b) => [b.getAttribute('aria-expanded'), document.getElementById(b.getAttribute('aria-controls')).getBoundingClientRect().height])
  ;(opened[0] === 'true' && opened[1] > 20 && closed[0] === 'false' && closed[1] < 1 ? pass : fail)(
    `${width}: FAQ open ${JSON.stringify(opened)} / close ${JSON.stringify(closed)}`,
  )
  const faqCount = await page.locator('#faq li[class*="item"]').count()
  faqCount === 19 ? pass(`${width}: 19 FAQs`) : fail(`${width}: ${faqCount} FAQs`)

  // nav anchor lands below the fixed header
  if (width >= 1280) {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.locator('header nav a', { hasText: 'Schedule' }).click()
    await page.waitForTimeout(1800)
    const off = await page.evaluate(() => [
      Math.round(document.getElementById('schedule').getBoundingClientRect().top),
      document.querySelector('header').offsetHeight,
    ])
    Math.abs(off[0] - off[1]) <= 4 ? pass(`${width}: nav → #schedule top ${off[0]} = header ${off[1]}`) : fail(`${width}: nav offset ${off}`)
  }

  errors.length ? fail(`${width}: console errors ${errors.join(' | ')}`) : pass(`${width}: no console errors`)
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/full-${width}.png`, fullPage: true })
  await page.close()
}

// reduced motion: flip should crossfade (no rotation)
const rm = await browser.newPage({ viewport: { width: 390, height: 800 }, reducedMotion: 'reduce' })
await rm.goto(BASE, { waitUntil: 'networkidle' })
const rmCard = rm.locator('#passes article').first()
await rmCard.getByRole('button', { name: 'View inclusions' }).click()
await rm.waitForTimeout(600)
const rmState = await rmCard.evaluate((el) => {
  const [f, b] = el.querySelectorAll('[class*="face"]')
  return { inner: getComputedStyle(el.querySelector('[class*="inner"]')).transform, front: getComputedStyle(f).opacity, back: getComputedStyle(b).opacity }
})
rmState.inner === 'none' && rmState.front === '0' && rmState.back === '1'
  ? pass(`reduced motion: crossfade ${JSON.stringify(rmState)}`)
  : fail(`reduced motion: ${JSON.stringify(rmState)}`)

await browser.close()
console.log(results.join('\n'))
process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0)
