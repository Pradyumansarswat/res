import { siteProfile } from '../config/site'
import type { Media } from '../components/MediaRenderer'

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
  media: Media
  icon: string
  stat: { value: string; label: string }
}

// TODO(client): Add confirmed deliverables, project details and service-specific copy.
export const services: Service[] = siteProfile.services.map((service) => ({
  ...service,
  media: service.media.type === 'youtube'
    ? { type: 'youtube', src: service.media.src }
    : { type: 'image', src: service.media.src },
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
  { value: 0, suffix: '', label: 'Service area', prefix: '', display: 'North India' },
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
  media?: Media
}

// TODO(client): Add real project details, locations, images and permissions.
// export const projects: Project[] = []
export const projects: Project[] = [
  {
    title: 'Residential Swimming Pool',
    category: 'Residential',
    status: 'Featured Project',
    location: 'North India',
    scope: 'Swimming pool design, construction and engineering solutions.',
    image: '/images/hero-pool.jpeg',
    media: {
      type: 'image',
      src: '/images/hero-pool.jpeg',
    },
  },

  {
    title: 'Luxury Residential Pool',
    category: 'Residential',
    status: 'Featured Project',
    location: 'North India',
    scope: 'Luxury swimming pool solutions with design, engineering and equipment integration.',
    image: '/images/pool-aerial.jpg',
    media: {
      type: 'image',
      src: '/images/pool-aerial.jpg',
    },
  },

  {
    title: 'Commercial Swimming Pool',
    category: 'Commercial',
    status: 'Featured Project',
    location: 'North India',
    scope: 'Swimming pool planning, construction and technical engineering solutions.',
    image: '/images/indoor-pool.jpg',
    media: {
      type: 'image',
      src: '/images/indoor-pool-about.jpeg',
    },
  },

  {
    title: 'Commercial Water Feature',
    category: 'Commercial',
    status: 'Featured Project',
    location: 'North India',
    scope: 'Water feature and fountain solutions designed around project requirements.',
    image: '/images/fountain.jpg',
    media: {
      type: 'image',
      src: '/images/fountain.jpeg',
    },
  },

  {
    title: 'Hospitality Pool & Spa',
    category: 'Hospitality',
    status: 'Featured Project',
    location: 'North India',
    scope: 'Swimming pool, spa and aquatic environment solutions for hospitality projects.',
    image: '/images/spa.jpg',
    media: {
      type: 'image',
      src: '/images/spa-sauna.jpg',
    },
  },

  {
    title: 'Institutional Pool Engineering',
    category: 'Institutional',
    status: 'Featured Project',
    location: 'North India',
    scope: 'Technical planning and engineering solutions for institutional swimming pool projects.',
    image: '/images/engineering.jpg',
    media: {
      type: 'image',
      src: '/images/engineering.jpg',
    },
  },
]



// TODO(client): Add approved testimonials only, with client consent.
// export const testimonials: { quote: string; name: string; org: string }[] = []

export const testimonials: {
  quote: string
  name: string
  org: string
}[] = [
  {
    quote:
      'The RES team understood our requirements well and provided a professional approach to the swimming pool project from planning through execution.',
    name: 'Residential Client',
    org: 'Residential Project',
  },
  {
    quote:
      'We appreciated the technical knowledge and attention to detail shown by the RES team. The entire process was handled in a structured and professional manner.',
    name: 'Project Client',
    org: 'Swimming Pool Project',
  },
  {
    quote:
      'RES provided a well-planned solution for our pool requirements and helped us understand the technical aspects, equipment and execution process clearly.',
    name: 'Client',
    org: 'Private Project',
  },
  {
    quote:
      'A professional team with a strong understanding of swimming pool engineering, equipment and construction requirements. Communication throughout the project was smooth.',
    name: 'Project Client',
    org: 'North India',
  },
  {
    quote:
      'The team at Reliance Engineering Solutions was responsive, technically sound and focused on delivering a solution suited to our project requirements.',
    name: 'Client',
    org: 'Pool & Water Feature Project',
  },
]


export const faqs = [
  {
    q: 'How long does it take to build a swimming pool?',
    a: 'Project timelines depend on the pool type, size, construction requirements, finishes and equipment. The schedule is determined after reviewing the site and project scope.',
  },
  {
    q: 'Which areas does RES serve?',
    a: 'RES serves North India, including Delhi, Noida, Gurugram, Ghaziabad and Faridabad.',
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

export const galleryImages: { src: string; media: Media; caption: string; tag: string }[] = [
  { src: '/images/hero-pool.jpeg', media: { type: 'youtube', src: 'https://youtube.com/shorts/sCjB5lbZpZM' }, caption: 'Residential pool solutions', tag: 'Residential Pools' },
  { src: '/images/pool-aerial.jpg', media: { type: 'youtube', src: 'https://youtube.com/shorts/EmotFhC4RUw?si=zmVultDbAI9Qz7if' }, caption: 'Commercial pool solutions', tag: 'Commercial Pools' },
  { src: '/images/fountain.jpg', media: { type: 'image', src: '/images/fountain.jpeg' }, caption: 'Pool lighting solutions', tag: 'Pool Lighting' },
  { src: '/images/spa.jpg', media: { type: 'image', src: '/images/spa.jpg' }, caption: 'Jacuzzi pool solutions', tag: 'Jacuzzi Pools' },
  { src: '/images/sauna.jpg', media: { type: 'image', src: '/images/sauna.jpeg' }, caption: 'Pool engineering solutions', tag: 'Engineering' },
  { src: '/images/indoor-pool.jpg', media: { type: 'image', src: '/images/indoor-pool.jpg' }, caption: 'Pool heating solutions', tag: 'Pool Heating' },
  { src: '/images/water-texture.jpg', media: { type: 'image', src: '/images/water-texture.jpg' }, caption: 'Pool surface solutions', tag: 'Pool Renovation' },
  { src: '/images/engineering.jpg', media: { type: 'image', src: '/images/engineering.jpg' }, caption: 'Technical planning', tag: 'Engineering' },
  { src: '/images/team.jpg', media: { type: 'image', src: '/images/res.jpeg' }, caption: siteProfile.name, tag: 'RES' },
  { src: '/images/res-video.jpg', media: { type: 'youtube', src: 'https://youtu.be/V-lgr_8pdRc?si=hdbuERjsRQm3OyAx' }, caption: 'Dancing Fountain at night', tag: 'Res' },
]
