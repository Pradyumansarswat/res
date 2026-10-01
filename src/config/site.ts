import profile from './site.json'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || profile.siteUrl).replace(/\/+$/, '')
export const siteProfile = profile
export const SITE_ROUTES = [
  ...profile.routes,
  ...profile.services.map((service) => `/services/${service.slug}`),
]
