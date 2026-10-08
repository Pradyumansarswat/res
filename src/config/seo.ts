import { siteProfile } from './site'

const { name, shortName, owner, established, serviceAreaName: area } = siteProfile

export const pageSEO = {
  home: {
    title: `Swimming Pool Construction in Noida & ${area} | ${shortName}`,
    description: `${name} builds and renovates swimming pools across ${area}, with pool heating, lighting, waterproofing and water feature services.`,
  },
  about: {
    title: `About ${name} | ${shortName}`,
    description: `${name}, based in Noida and established in ${established}, is led by ${owner} and delivers pool and water engineering across ${area}.`,
  },
  services: {
    title: `Pool & Water Engineering Services | ${shortName}`,
    description: `Pool construction, renovation, heating, lighting, jacuzzi, waterproofing, spa, tiles, fountains and water features from ${shortName} across ${area}.`,
  },
  projects: {
    title: `Swimming Pool Projects | ${shortName}`,
    description: `Selected swimming pool, heating and renovation projects by ${name}. Contact ${shortName} to discuss your own pool project.`,
  },
  gallery: {
    title: `Swimming Pool & Water Feature Gallery | ${shortName}`,
    description: `Browse swimming pool, spa, fountain and engineering images from ${name}.`,
  },
  contact: {
    title: `Contact ${shortName} | Swimming Pool Services in Noida`,
    description: `Contact ${name} in Noida for pool construction, renovation, heating, lighting and water engineering enquiries across ${area}.`,
  },
  notFound: {
    title: `Page Not Found | ${name}`,
    description: `The page could not be found. Return to the ${name} home page.`,
  },
  privacy: {
    title: `Privacy Policy | ${shortName}`,
    description: `Privacy policy for ${name}, covering personal information shared through website enquiries.`,
  },
}

export function serviceSEO(name: string, detail?: string) {
  return {
    title: `${name} in Noida & ${area} | ${siteProfile.shortName}`,
    description: `${name} from ${siteProfile.name} across ${area}. ${
      detail ?? 'Contact our team to discuss your site and project requirements.'
    }`,
  }
}