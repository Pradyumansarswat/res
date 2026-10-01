import { siteProfile } from '../config/site'

export const site = {
  name: siteProfile.shortName,
  fullName: siteProfile.name,
  established: siteProfile.established,
  phone: siteProfile.phone,
  phoneHref: siteProfile.phoneHref,
  email: siteProfile.email,
  address: {
    full: siteProfile.address.full,
    locality: siteProfile.address.addressLocality,
  },
  hours: siteProfile.openingHoursStatus,
  mapsLink: siteProfile.mapsLink,
  whatsApp: siteProfile.whatsApp,
  socials: [
    { label: 'Facebook', url: siteProfile.socials[0] },
    { label: 'YouTube', url: siteProfile.socials[1] },
    { label: 'LinkedIn', url: siteProfile.socials[2] },
    { label: 'Instagram', url: siteProfile.socials[3] },
  ],
}

export type Service = {
  slug: string
  title: string
  short: string
  description: string
  features: string[]
  image: string
  icon: string
  stat: { value: string; label: string }
}

// TODO(client): Add confirmed deliverables, project details and service-specific copy.
export const services: Service[] = siteProfile.services.map((service) => ({
  ...service,
  title: service.name,
  short: `${service.name} services from ${siteProfile.name} in ${siteProfile.serviceAreaName}. Contact RES to discuss your site and project requirements.`,
  description: `${service.name} services in ${siteProfile.serviceAreaName} from ${siteProfile.name}. Contact the RES team to discuss your site and project requirements.`,
  features: [service.name],
  stat: { value: 'RES', label: service.name },
}))

export const values = [
  {
    number: '01',
    title: 'Experience',
    text: `Established in ${siteProfile.established} with experience in swimming pool and water engineering services.`,
  },
  {
    number: '02',
    title: 'Complete Solutions',
    text: 'Design, construction, equipment, heating, lighting, renovation and related services.',
  },
  {
    number: '03',
    title: 'Engineering Focus',
    text: 'Combining design, technical planning and execution around project requirements and site conditions.',
  },
]

export const stats = [
  { value: 0, suffix: '', label: 'Established', prefix: '', display: String(siteProfile.established) },
  { value: 0, suffix: '', label: 'Service area', prefix: '', display: 'Delhi NCR' },
  { value: 0, suffix: '', label: 'Swimming pool construction', prefix: '', display: 'Pools' },
  { value: 0, suffix: '', label: 'Swimming pool renovation', prefix: '', display: 'Renovation' },
  { value: 0, suffix: '', label: 'Pool heating', prefix: '', display: 'Heat pumps' },
]

export const process = [
  {
    step: '01',
    title: 'Consult & Site Study',
    text: 'We begin with your project requirements, site conditions and intended application.',
  },
  {
    step: '02',
    title: 'Design & Engineering',
    text: 'Technical planning, pool layouts, architectural design and 3D visualization are developed for the project.',
  },
  {
    step: '03',
    title: 'Construction & QA',
    text: 'Construction, waterproofing, finishing and equipment installation are coordinated around the approved design.',
  },
  {
    step: '04',
    title: 'Commissioning & Care',
    text: 'Equipment commissioning and project handover complete the delivery of the swimming pool solution.',
  },
]

export type Project = {
  title: string
  category: string
  status: string
  location: string
  scope: string
  image: string
}

// TODO(client): Add real project details, locations, images and permissions.
export const projects: Project[] = []

// TODO(client): Add approved testimonials only, with client consent.
export const testimonials: { quote: string; name: string; org: string }[] = []

export const faqs = [
  {
    q: 'How long does it take to build a swimming pool?',
    a: 'Project timelines depend on the pool type, size, construction requirements, finishes and equipment. The schedule is determined after reviewing the site and project scope.',
  },
  {
    q: 'Which areas does RES serve?',
    a: 'RES serves Delhi NCR, including Delhi, Noida, Gurugram, Ghaziabad and Faridabad.',
  },
  {
    q: 'What kind of maintenance support do you provide?',
    a: 'Please contact RES with your pool requirements to discuss the appropriate service, repair or equipment support.',
  },
  {
    q: 'Can you renovate or repair an existing pool?',
    a: 'Yes. RES provides leak repair, structural repair, crack repair, tile repair, plumbing repair, equipment repair, lighting repair, surface restoration and pool renovation.',
  },
  {
    q: 'How do you keep running costs low?',
    a: 'RES can recommend suitable pool equipment, heating, lighting and covering solutions based on the pool design and operating requirements.',
  },
]

export const timeline = [
  {
    year: String(siteProfile.established),
    title: 'Established in Greater Noida West',
    text: `${siteProfile.name} was established in ${siteProfile.established}.`,
  },
]

export const marqueeWords = [
  'Swimming Pools',
  'Pool Design',
  'Pool Construction',
  'Pool Equipment',
  'Pool Heating',
  'Pool Lighting',
  'Pool Covering',
  'Waterproofing',
  'Expansion Joints',
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export const galleryImages = [
  { src: '/images/hero-pool.jpg', caption: 'Residential pool solutions', tag: 'Residential Pools' },
  { src: '/images/pool-aerial.jpg', caption: 'Commercial pool solutions', tag: 'Commercial Pools' },
  { src: '/images/fountain.jpg', caption: 'Pool lighting solutions', tag: 'Pool Lighting' },
  { src: '/images/spa.jpg', caption: 'Jacuzzi pool solutions', tag: 'Jacuzzi Pools' },
  { src: '/images/sauna.jpg', caption: 'Pool engineering solutions', tag: 'Engineering' },
  { src: '/images/indoor-pool.jpg', caption: 'Pool heating solutions', tag: 'Pool Heating' },
  { src: '/images/water-texture.jpg', caption: 'Pool surface solutions', tag: 'Pool Renovation' },
  { src: '/images/engineering.jpg', caption: 'Technical planning', tag: 'Engineering' },
  { src: '/images/team.jpg', caption: siteProfile.name, tag: 'RES' },
]
