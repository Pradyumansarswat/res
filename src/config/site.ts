import profile from './site.json'

const rawSiteUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_SITE_URL) ||
  ''

export const SITE_URL = (rawSiteUrl.trim() || 'https://res-tf9c.vercel.app').replace(/\/+$/, '')

export const siteProfile = {
  ...profile,
  siteUrl: SITE_URL,
}

export const SITE_ROUTES = [
  ...profile.routes,
  ...profile.services.map((service) => `/services/${service.slug}`),
]
