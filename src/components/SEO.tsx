import { Helmet } from 'react-helmet-async'
import { SITE_URL, siteProfile } from '../config/site'

type Breadcrumb = { name: string; path: string }

type SEOProps = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  robots?: string
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
  breadcrumbs?: Breadcrumb[]
}

const normalizePath = (rawPath: string): string => {
  const clean = rawPath.split('?')[0].split('#')[0].trim()
  if (!clean || clean === '/') return '/'
  return clean.startsWith('/') ? clean.replace(/\/+$/, '') : `/${clean.replace(/\/+$/, '')}`
}

const getCanonicalUrl = (path: string): string => {
  const normalized = normalizePath(path)
  if (normalized === '/') {
    return `${SITE_URL}/`
  }
  return `${SITE_URL}${normalized}`
}

const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

function businessSchema() {
  const coordinates = siteProfile.coordinates
  const geo =
    typeof coordinates.latitude === 'number' && typeof coordinates.longitude === 'number'
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
        }
      : {}
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#business`,
    name: siteProfile.name,
    url: `${SITE_URL}/`,
    logo: absoluteUrl('/images/logo.svg'),
    image: absoluteUrl('/images/hero-pool.jpeg'),
    telephone: siteProfile.phone,
    email: siteProfile.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteProfile.address.streetAddress,
      addressLocality: siteProfile.address.addressLocality,
      addressRegion: siteProfile.address.addressRegion,
      postalCode: siteProfile.address.postalCode,
      addressCountry: siteProfile.address.addressCountry,
    },
    ...geo,
    areaServed: siteProfile.schemaServiceArea,
    founder: { '@type': 'Person', name: siteProfile.owner },
    foundingDate: String(siteProfile.established),
    sameAs: siteProfile.socials,
    openingHoursSpecification: siteProfile.openingHoursSpecification,
  }
}

function breadcrumbSchema(items: Breadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  }
}

export default function SEO({
  title,
  description,
  path,
  image = '/images/hero-pool.jpeg',
  type = 'website',
  noindex = false,
  robots,
  structuredData,
  breadcrumbs,
}: SEOProps) {
  const schemas: Record<string, unknown>[] = [businessSchema()]
  if (structuredData) schemas.push(...(Array.isArray(structuredData) ? structuredData : [structuredData]))
  if (breadcrumbs?.length) schemas.push(breadcrumbSchema(breadcrumbs))

  const canonicalUrl = getCanonicalUrl(path)
  const imageUrl = absoluteUrl(image)
  const robotsContent = robots || (noindex ? 'noindex, follow' : undefined)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {robotsContent && <meta name="robots" content={robotsContent} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteProfile.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </Helmet>
  )
}
