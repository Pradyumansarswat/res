import { siteProfile } from './site'

export const pageSEO = {
  home: {
    title: `Swimming Pool Construction Across India | ${siteProfile.shortName}`,
    description: `${siteProfile.name} builds and renovates swimming pools across India, with pool heating, lighting, waterproofing and water feature services.`,
  },
  about: {
    title: `About ${siteProfile.name} | ${siteProfile.shortName}`,
    description: `Established in Noida in ${siteProfile.established}, ${siteProfile.name} is led by ${siteProfile.owner} and serves pool and water engineering needs across India.`,
  },
  services: {
    title: `Pool & Water Engineering Services | ${siteProfile.shortName}`,
    description: `Explore pool construction, renovation, heating, lighting, jacuzzi, waterproofing, spa, tiles, fountains and water feature services from RES across India.`,
  },
  projects: {
    title: `Swimming Pool Project Portfolio | ${siteProfile.shortName}`,
    description: `${siteProfile.name} project portfolio. No project records are listed. Contact RES to discuss pool construction and renovation services across India.`,
  },
  gallery: {
    title: `Swimming Pool & Water Feature Gallery | ${siteProfile.shortName}`,
    description: `Browse swimming pool, spa, fountain and engineering images. Contact RES to discuss pool construction, renovation, heating and lighting services across India.`,
  },
  contact: {
    title: `Contact RES | Pool Services in Noida`,
    description: `Contact ${siteProfile.name} in Noida for pool construction, renovation, heating, lighting and water engineering enquiries across India.`,
  },
  notFound: {
    title: `Page Not Found | ${siteProfile.name}`,
    description: `The page could not be found. Return to the ${siteProfile.name} home page or browse pool construction, engineering services and contact information.`,
  },
  privacy: {
    title: `Privacy Policy | ${siteProfile.shortName}`,
    description: `Read the privacy policy for ${siteProfile.name}. Contact RES in Noida with questions about personal information and website enquiries across India.`,
  },
}

export function serviceSEO(name: string) {
  return {
    title: `${name} Service Across India | ${siteProfile.shortName}`,
    description: `${name} across India from ${siteProfile.name} (${siteProfile.shortName}), established in ${siteProfile.established}. Contact our team to discuss project requirements.`,
  }
}