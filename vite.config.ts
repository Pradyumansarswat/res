import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

function seoFilesPlugin(): Plugin {
  return {
    name: 'generate-seo-files',
    buildStart() {
      const root = process.cwd()
      const env = loadEnv('production', root, ['VITE_', 'NEXT_PUBLIC_'])
      const rawSiteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || '').trim()
      const siteUrl = (rawSiteUrl || 'https://res-tf9c.vercel.app').replace(/\/+$/, '')

      const siteJsonPath = path.join(root, 'src/config/site.json')
      const profile = JSON.parse(fs.readFileSync(siteJsonPath, 'utf8'))
      const routes = [
        ...profile.routes,
        ...profile.services.map((service: { slug: string }) => `/services/${service.slug}`),
      ]
      const sitemapRoutes = routes.filter((route: string) => route !== '/privacy-policy')
      const buildDate = new Date().toISOString().split('T')[0]

      const sitemapXml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...sitemapRoutes.map((route: string) => {
          const loc = route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </url>`
        }),
        '</urlset>',
      ].join('\n')

      const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`

      const publicDir = path.join(root, 'public')
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true })
      }
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8')
      fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8')
    },
  }
}

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [react(), tailwindcss(), seoFilesPlugin()]
  try {
    // @ts-expect-error - optional local dev-only module, not type-checked
    const m = await import('./.vite-source-tags.js')
    plugins.push(m.sourceTags())
  } catch {
    // optional module not present — safe to ignore
  }

  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_'])
  const processEnvDefines: Record<string, string> = {}
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value)
  }

  return {
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: processEnvDefines,
  }
})
