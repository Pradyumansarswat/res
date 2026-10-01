import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import { loadEnv, preview } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = path.join(root, 'dist')
const profile = JSON.parse(await readFile(path.join(root, 'src/config/site.json'), 'utf8'))
const env = loadEnv('production', root, 'VITE_')
const siteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || profile.siteUrl).replace(/\/+$/, '')
const routes = [...profile.routes, ...profile.services.map((service) => `/services/${service.slug}`)]
const shellHtml = await readFile(path.join(dist, 'index.html'), 'utf8')
const previewServer = await preview({ root, preview: { host: '127.0.0.1', port: 0, strictPort: false } })
const address = previewServer.httpServer.address()
const origin = `http://127.0.0.1:${typeof address === 'object' && address ? address.port : 4173}`
const isLinux = process.platform === 'linux'
let browserOptions = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
}

if (isLinux) {
  try {
    const { default: chromium } = await import('@sparticuz/chromium')
    const executablePath = await chromium.executablePath()
    browserOptions = {
      args: await puppeteer.defaultArgs({ args: chromium.args, headless: 'shell' }),
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: 'shell',
    }
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error)
    throw new Error(`Unable to resolve serverless Chromium for Linux prerendering: ${details}`, { cause: error })
  }
}

let browser

try {
  try {
    browser = await puppeteer.launch(browserOptions)
  } catch (error) {
    if (!isLinux) throw error
    const details = error instanceof Error ? error.message : String(error)
    throw new Error(`Unable to launch serverless Chromium for Linux prerendering: ${details}`, { cause: error })
  }

  const page = await browser.newPage()
  page.setDefaultTimeout(60000)
  const renderedTitles = new Set()
  let homepageHtml = ''
  for (const route of [...routes, '/_prerender-not-found']) {
    await writeFile(path.join(dist, 'index.html'), shellHtml)
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle2', timeout: 60000 })
    await page.waitForSelector('main h1', { timeout: 60000 })
    try {
      await page.waitForFunction(
        (canonical) => document.querySelector('link[rel="canonical"]')?.href === canonical,
        { timeout: 10000 },
        `${siteUrl}${route}`,
      )
    } catch {
      const state = await page.evaluate(() => ({
        pathname: window.location.pathname,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        title: document.title,
        heading: document.querySelector('main h1')?.textContent,
      }))
      throw new Error(`Route did not settle: ${route} ${JSON.stringify(state)}`)
    }
    await page.evaluate(() => document.getElementById('seo-description-fallback')?.remove())
    const metadata = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
      h1Count: document.querySelectorAll('main h1').length,
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
      openGraphTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') || '',
      schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) =>
        JSON.parse(script.textContent || 'null'),
      ),
    }))
    if (metadata.title.length >= 60 || renderedTitles.has(metadata.title)) {
      throw new Error(`Invalid or duplicate title for ${route}: ${metadata.title} (${metadata.title.length})`)
    }
    if (metadata.description.length < 140 || metadata.description.length > 160) {
      throw new Error(`Description length out of range for ${route}: ${metadata.description.length}`)
    }
    if (metadata.h1Count !== 1 || metadata.canonical !== `${siteUrl}${route}`) {
      throw new Error(
        `Invalid page structure or canonical for ${route}: h1=${metadata.h1Count}, canonical=${metadata.canonical}`,
      )
    }
    const schemaTypes = metadata.schemas.map((schema) => schema?.['@type'])
    if (!schemaTypes.includes('HomeAndConstructionBusiness')) {
      throw new Error(`LocalBusiness JSON-LD missing for ${route}`)
    }
    if (route !== '/' && route !== '/_prerender-not-found' && !schemaTypes.includes('BreadcrumbList')) {
      throw new Error(`BreadcrumbList JSON-LD missing for ${route}`)
    }
    if (route.startsWith('/services/') && !schemaTypes.includes('Service')) {
      throw new Error(`Service JSON-LD missing for ${route}`)
    }
    if (route === '/contact' && !schemaTypes.includes('ContactPage')) {
      throw new Error('ContactPage JSON-LD missing for /contact')
    }
    if (metadata.openGraphTitle !== metadata.title || metadata.twitterCard !== 'summary_large_image') {
      throw new Error(`Social metadata missing for ${route}`)
    }
    const noindexExpected = route === '/privacy-policy' || route === '/_prerender-not-found'
    if (noindexExpected !== metadata.robots.includes('noindex')) {
      throw new Error(`Unexpected robots metadata for ${route}`)
    }
    renderedTitles.add(metadata.title)
    const html = await page.content()
    if (route === '/') homepageHtml = html
    const output = route === '/_prerender-not-found'
      ? path.join(dist, '404.html')
      : route === '/'
        ? path.join(dist, 'index.html')
        : path.join(dist, route.slice(1), 'index.html')
    await mkdir(path.dirname(output), { recursive: true })
    await writeFile(output, html)
    if (route !== '/' && route !== '/_prerender-not-found') {
      await writeFile(path.join(dist, `${route.slice(1)}.html`), html)
    }
    console.log(`Prerendered ${route}`)
  }

  await writeFile(path.join(dist, 'index.html'), homepageHtml)
  const sitemapRoutes = routes.filter((route) => route !== '/privacy-policy')
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapRoutes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`),
    '</urlset>',
  ].join('\n')
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap)
  await writeFile(
    path.join(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /dev/\nDisallow: /_dev/\nSitemap: ${siteUrl}/sitemap.xml\n`,
  )
} finally {
  await browser?.close()
  await new Promise((resolve, reject) => previewServer.httpServer.close((error) => error ? reject(error) : resolve()))
}