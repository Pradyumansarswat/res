import { siteProfile } from "../config/site";
import type { Media } from "../components/MediaRenderer";

export type Client = {
  name: string;
  logo: string;
  bg: string;
  w: number;
  h: number;
};

export const clients: Client[] = [
  {
    name: "Acasa Studios",
    logo: "/images/client/acasa-studio-client.jpeg",
    bg: "#274c55",
    w: 133,
    h: 167,
  },
  {
    name: "Genex",
    logo: "/images/client/genex-client.jpeg",
    bg: "#feffff",
    w: 204,
    h: 85,
  },
  {
    name: "Hero Homes",
    logo: "/images/client/hero-homes-client.jpeg",
    bg: "#ffffff",
    w: 330,
    h: 122,
  },
  {
    name: "High Performance Sports Academy",
    logo: "/images/client/high-performance-sports-academy-client.jpeg",
    bg: "#ffffff",
    w: 304,
    h: 64,
  },
  {
    name: "Holymont Udaipur",
    logo: "/images/client/holymont-client.jpeg",
    bg: "#2e323b",
    w: 656,
    h: 245,
  },
  {
    name: "ITC Mughal",
    logo: "/images/client/itc-mughal-client.jpeg",
    bg: "#6c6c6c",
    w: 563,
    h: 143,
  },
  {
    name: "Jaypee Greens",
    logo: "/images/client/jaypee-greens-client.jpeg",
    bg: "#ffffff",
    w: 178,
    h: 97,
  },
  {
    name: "Jindal Steel & Power",
    logo: "/images/client/jindal-steel-client.jpeg",
    bg: "#101015",
    w: 391,
    h: 147,
  },
  {
    name: "Muthoot Finance",
    logo: "/images/client/muthoot-finance-client.jpeg",
    bg: "#ffffff",
    w: 313,
    h: 117,
  },
  {
    name: "MVN Group",
    logo: "/images/client/mvn-group-client.jpeg",
    bg: "#433535",
    w: 122,
    h: 74,
  },
  {
    name: "MVN School",
    logo: "/images/client/mvn-satyameva-jayate-client.jpeg",
    bg: "#3165a1",
    w: 112,
    h: 69,
  },
  {
    name: "Nilaya Heights Dehradun",
    logo: "/images/client/nilaya-heights-client.jpeg",
    bg: "#6c5837",
    w: 224,
    h: 91,
  },
  {
    name: "Nitara Projects Limited",
    logo: "/images/client/nitara-client.jpeg",
    bg: "#ffffff",
    w: 358,
    h: 154,
  },
  {
    name: "Oxirich Group",
    logo: "/images/client/oxirich-client.jpeg",
    bg: "#000000",
    w: 166,
    h: 90,
  },
  {
    name: "Reecons Engineering",
    logo: "/images/client/reecons-client.jpeg",
    bg: "#ffffff",
    w: 288,
    h: 92,
  },
  {
    name: "Delhi Public School",
    logo: "/images/client/delhi-public-school-client.jpeg",
    bg: "#ffffff",
    w: 134,
    h: 91,
  }, // TODO: confirm real client name
  {
    name: "Shapoorji Pallonji",
    logo: "/images/client/shapoorji-pallonji-client.jpeg",
    bg: "#ffffff",
    w: 221,
    h: 57,
  },
  {
    name: "The Sirmour Retreat",
    logo: "/images/client/sirmour-retreat-client.jpeg",
    bg: "#fcfcfc",
    w: 272,
    h: 125,
  },
  {
    name: "TDI",
    logo: "/images/client/tdi-client.jpeg",
    bg: "#f8f9fb",
    w: 250,
    h: 132,
  },
];

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
    { label: "Facebook", url: siteProfile.socials[0] },
    { label: "YouTube", url: siteProfile.socials[1] },
    { label: "LinkedIn", url: siteProfile.socials[2] },
    { label: "Instagram", url: siteProfile.socials[3] },
  ],
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  image: string;
  media: Media;
  icon: string;
  stat: { value: string; label: string };
};

// TODO(client): Add confirmed deliverables, project details and service-specific copy.
export const services: Service[] = siteProfile.services.map((service) => ({
  ...service,
  media:
    service.media.type === "youtube"
      ? { type: "youtube", src: service.media.src }
      : { type: "image", src: service.media.src },
  title: service.name,
  short: `${service.name} services from ${siteProfile.name} in ${siteProfile.serviceAreaName}. Contact RES to discuss your site and project requirements.`,
  description: `${service.name} services in ${siteProfile.serviceAreaName} from ${siteProfile.name}. Contact the RES team to discuss your site and project requirements.`,
  features: [service.name],
  stat: { value: "RES", label: service.name },
}));

export const values = [
  {
    number: "01",
    title: "Experience",
    text: `Established in ${siteProfile.established} with experience in swimming pool and water engineering services.`,
  },
  {
    number: "02",
    title: "Complete Solutions",
    text: "Design, construction, equipment, heating, lighting, renovation and related services.",
  },
  {
    number: "03",
    title: "Engineering Focus",
    text: "Combining design, technical planning and execution around project requirements and site conditions.",
  },
];

export const stats = [
  {
    value: 0,
    suffix: "",
    label: "Established",
    prefix: "",
    display: String(siteProfile.established),
  },
  {
    value: 0,
    suffix: "",
    label: "Service area",
    prefix: "",
    display: "North India",
  },
  {
    value: 0,
    suffix: "",
    label: "Swimming pool construction",
    prefix: "",
    display: "Pools",
  },
  {
    value: 0,
    suffix: "",
    label: "Swimming pool renovation",
    prefix: "",
    display: "Renovation",
  },
  {
    value: 0,
    suffix: "",
    label: "Pool heating",
    prefix: "",
    display: "Heat pumps",
  },
];

export const process = [
  {
    step: "01",
    title: "Consult & Site Study",
    text: "We begin with your project requirements, site conditions and intended application.",
  },
  {
    step: "02",
    title: "Design & Engineering",
    text: "Technical planning, pool layouts, architectural design and 3D visualization are developed for the project.",
  },
  {
    step: "03",
    title: "Construction & QA",
    text: "Construction, waterproofing, finishing and equipment installation are coordinated around the approved design.",
  },
  {
    step: "04",
    title: "Commissioning & Care",
    text: "Equipment commissioning and project handover complete the delivery of the swimming pool solution.",
  },
];

export type Project = {
  title: string;
  category: string;
  status: string;
  location: string;
  scope: string;
  image: string;
  media?: Media;
  logo?: string;
};

// TODO(client): Add real project details, locations, images and permissions.
// export const projects: Project[] = []

export const projects: Project[] = [
  /* ---------------- Residential ---------------- */
  {
    title: "Murali Wala Farm",
    category: "Residential",
    status: "Completed",
    location: "Chattarpur, New Delhi",
    scope: "Swimming Pool",
    image: "/images/hero-pool.jpeg",
    media: { type: "image", src: "/images/hero-pool.jpeg" },
  },
  {
    title: "Dr. Arvind Dahiya",
    category: "Residential",
    status: "Completed",
    location: "Rohtak, Haryana",
    scope: "Swimming Pool Heating System",
    image: "/images/indoor-pool.jpg",
    media: { type: "image", src: "/images/indoor-pool.jpg" },
  },
  {
    title: "Anish Ahmed",
    category: "Residential",
    status: "Completed",
    location: "Mayur Vihar Phase-1, New Delhi",
    scope: "Swimming Pool",
    image: "/images/hero-pool.jpeg",
    media: { type: "image", src: "/images/hero-pool.jpeg" },
  },
  {
    title: "Sham Lal & Sons",
    category: "Residential",
    status: "Completed",
    location: "Bhaktawarpur, New Delhi",
    scope: "Swimming Pool",
    image: "/images/hero-pool.jpeg",
    media: { type: "image", src: "/images/hero-pool.jpeg" },
  },
  {
    title: "Akhilesh Chaturvedi",
    category: "Residential",
    status: "Completed",
    location: "Etawah, Uttar Pradesh",
    scope: "Swimming Pool",
    image: "/images/hero-pool.jpeg",
    media: { type: "image", src: "/images/hero-pool.jpeg" },
  },
  {
    title: "Mr. JD Bedi",
    category: "Residential",
    status: "Completed",
    location: "Greater Noida, Uttar Pradesh",
    scope: "Swimming Pool Filtration",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
  },
  {
    title: "Mr. Pratul Potdar",
    category: "Residential",
    status: "Completed",
    location: "Vapi, Gujarat",
    scope: "Swimming Pool Filtration",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
  },

  /* ---------------- Commercial ---------------- */
  {
    title: "Bios Landscape",
    category: "Commercial",
    status: "Completed",
    location: "Kanpur, Uttar Pradesh",
    scope: "Water Body",
    image: "/images/fountain.jpg",
    media: { type: "image", src: "/images/fountain.jpeg" },
  },
  {
    title: "Ashok Construction",
    category: "Commercial",
    status: "Completed",
    location: "Shahpur Jat, New Delhi",
    scope: "Swimming Pool",
    image: "/images/hero-pool.jpeg",
    media: { type: "image", src: "/images/hero-pool.jpeg" },
  },
  {
    title: "Gold Star",
    category: "Commercial",
    status: "Completed",
    location: "Sector-110, Noida, Uttar Pradesh",
    scope: "Expansion Joints",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
  },
  {
    title: "Shapoorji Pallonji",
    category: "Commercial",
    status: "Completed",
    location: "Lucknow, Uttar Pradesh",
    scope: "Waterbody",
    image: "/images/fountain.jpg",
    media: { type: "image", src: "/images/client/shapoorji-pallonji-client.jpeg" },
    logo: "/images/client/shapoorji-pallonji-client.jpeg",
  },
  {
    title: "Oxirich",
    category: "Commercial",
    status: "Completed",
    location: "Indirapuram, Ghaziabad, Uttar Pradesh",
    scope: "Swimming Pool",
    image: "/images/hero-pool.jpeg",
    media: { type: "image", src: "/images/hero-pool.jpeg" },
    logo: "/images/client/oxirich-client.jpeg",
  },
  {
    title: "GST Mall",
    category: "Commercial",
    status: "Completed",
    location: "Ghaziabad, Uttar Pradesh",
    scope: "Waterbody",
    image: "/images/fountain.jpg",
    media: { type: "image", src: "/images/fountain.jpg" },
  },
  {
    title: "Nitara Limited",
    category: "Commercial",
    status: "Completed",
    location: "Sector-65, Gurugram, Haryana",
    scope: "Waterbody",
    image: "/images/fountain.jpg",
    media: { type: "image", src: "/images/fountain.jpg" },
    logo: "/images/client/nitara-client.jpeg",
  },
  {
    title: "Assotech",
    category: "Commercial",
    status: "Completed",
    location: "ABC Creasta", // TODO: add city / sector
    scope: "Expansion Joints",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
  },
  {
    title: "M/s CK Enterprises",
    category: "Commercial",
    status: "Completed",
    location: "Ashok Vihar, New Delhi",
    scope: "Swimming Pool Filtration",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
  },
  {
    title: "Shri Ambe Shelters",
    category: "Commercial",
    status: "Completed",
    location: "Gwalior Road, Agra, Uttar Pradesh",
    scope: "Swimming Pool Filtration",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
  },
  {
    title: "TDI Infracrop",
    category: "Commercial",
    status: "Completed",
    location: "Kundli, Sonipat, Haryana", // TODO: confirm (your list said "Kundli Lake Groove, Delhi")
    scope: "Swimming Pool Filtration",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
    logo: "/images/client/tdi-client.jpeg",
  },

  /* ---------------- Hospitality ---------------- */
  {
    title: "ITC Mughal",
    category: "Hospitality",
    status: "Completed",
    location: "Agra, Uttar Pradesh",
    scope: "Swimming Pool Renovation work",
    image: "/images/water-texture.jpg",
    media: { type: "image", src: "/images/water-texture.jpg" },
    logo: "/images/client/itc-mughal-client.jpeg",
  },
  {
    title: "Sirmour Retreat Hotel",
    category: "Hospitality",
    status: "Completed",
    location: "Himachal Pradesh", // TODO: add town (e.g. Nahan) if known
    scope: "Swimming Pool",
    image: "/images/spa.jpg",
    media: { type: "image", src: "/images/spa.jpg" },
    logo: "/images/client/sirmour-retreat-client.jpeg",
  },

  /* ---------------- Institutional ---------------- */
  {
    title: "RD Pandey",
    category: "Institutional",
    status: "Completed",
    location: "Government School, Mandawali, New Delhi",
    scope: "Swimming Pool",
    image: "/images/hero-pool.jpeg",
    media: { type: "image", src: "/images/hero-pool.jpeg" },
  },
  {
    title: "Reecon Engineering",
    category: "Institutional",
    status: "Completed",
    location: "ESIC Hospital, Okhla, New Delhi",
    scope: "Expansion Joints",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
    logo: "/images/client/reecons-client.jpeg",
  },
  {
    title: "SR & Ashok Associates",
    category: "Institutional",
    status: "Completed",
    location: "DRDO, Wazirpur, New Delhi",
    scope: "Expansion Joints",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
  },
  {
    title: "Surya Hi Tech",
    category: "Institutional",
    status: "Completed",
    location: "MVN School, Sector-43, Faridabad, Haryana",
    scope: "Swimming Pool Filtration",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
    logo: "/images/client/mvn-satyameva-jayate-client.jpeg",
  },
  {
    title: "Maa Narayan Cons.",
    category: "Institutional",
    status: "Completed",
    location: "Sarvodya Kanya Vidhyalay", // TODO: add area and city
    scope: "Swimming Pool Filtration",
    image: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
  },
];
/* Map client logos onto matching project entries */
const projectLogoMap: Record<string, string> = {
  "Shapoorji Pallonji": "/images/client/shapoorji-pallonji-client.jpeg",
  "ITC Mughal": "/images/client/itc-mughal-client.jpeg",
  Oxirich: "/images/client/oxirich-client.jpeg",
  "Nitara Limited": "/images/client/nitara-client.jpeg",
  "Reecon Engineering": "/images/client/reecons-client.jpeg",
  "TDI Infracrop": "/images/client/tdi-client.jpeg",
  "Sirmour Retreat Hotel": "/images/client/sirmour-retreat-client.jpeg",
  "Surya Hi Tech": "/images/client/mvn-satyameva-jayate-client.jpeg",
};
for (const p of projects) {
  const logo = projectLogoMap[p.title];
  if (logo) p.logo = logo;
}

// TODO(client): Add approved testimonials only, with client consent.
// export const testimonials: { quote: string; name: string; org: string }[] = []

export const testimonials: {
  quote: string;
  name: string;
  org: string;
}[] = [
  {
    quote:
      "We approached Reliance Engineering Solutions for our swimming pool heating requirements in Rohtak. The team understood our requirements, explained the heating system clearly and handled the work professionally.",
    name: "Dr. Arvind Dahiya",
    org: "Swimming Pool Heating System · Rohtak, Haryana",
  },
  {
    quote:
      "RES provided a reliable filtration solution for our swimming pool in Greater Noida. Their team explained the technical requirements properly and helped us understand the equipment and system. The work was handled professionally.",
    name: "Mr. JD Bedi",
    org: "Swimming Pool Filtration · Greater Noida, Uttar Pradesh",
  },
  {
    quote:
      "We worked with Reliance Engineering Solutions for our swimming pool project at Murali Wala Farm in Chattarpur. The team was responsive throughout the project and understood the site requirements well.",
    name: "Murali Wala Farm",
    org: "Swimming Pool · Chattarpur, New Delhi",
  },
  {
    quote:
      "Reliance Engineering Solutions handled the waterbody requirements for our project in Lucknow with a professional and technically focused approach. The team coordinated the work well and paid close attention to the project requirements.",
    name: "Shapoorji Pallonji",
    org: "Waterbody · Lucknow, Uttar Pradesh",
  },
  {
    quote:
      "RES provided swimming pool solutions for our hospitality project in Himachal Pradesh. The team demonstrated good technical understanding and maintained a professional approach throughout the work.",
    name: "Sirmour Retreat Hotel",
    org: "Swimming Pool · Himachal Pradesh",
  },
];

export const faqs = [
  {
    q: "How long does it take to build a swimming pool?",
    a: "Project timelines depend on the pool type, size, construction requirements, finishes and equipment. The schedule is determined after reviewing the site and project scope.",
  },
  {
    q: "Which areas does RES serve?",
    a: "Reliance Engineering Solutions serves North India, including Delhi, Noida, Gurugram, Ghaziabad and Faridabad, with project support available across India.",
  },
  {
    q: "Does RES provide swimming pool design and construction?",
    a: "Yes. RES provides swimming pool design, construction and engineering solutions for residential, commercial, hospitality and institutional projects.",
  },
  {
    q: "Can RES renovate or repair an existing pool?",
    a: "Yes. RES provides pool renovation and repair solutions including leak repair, structural repair, crack repair, tile repair, plumbing, equipment, lighting and surface restoration.",
  },
  {
    q: "Does RES provide swimming pool waterproofing and filtration?",
    a: "Yes. RES provides swimming pool waterproofing, filtration, pumping and circulation solutions selected according to the pool structure, size and operating requirements.",
  },
  {
    q: "Does RES provide pool heating and heat pump solutions?",
    a: "Yes. RES provides swimming pool heating and heat pump solutions based on the pool size, location, usage pattern and heating requirements.",
  },
  {
    q: "Does RES provide fountains and water feature systems?",
    a: "Yes. RES provides design, supply and installation solutions for fountains and water features for residential, commercial, hospitality and institutional projects.",
  },
  {
    q: "How can I get a swimming pool quotation from RES?",
    a: "Contact RES with your project location, pool requirements and available site details. The RES team can review your requirements and discuss the appropriate design, construction and engineering solution.",
  },
];

export const timeline = [
  {
    year: String(siteProfile.established),
    title: "Established in Greater Noida West",
    text: `${siteProfile.name} was established in ${siteProfile.established}.`,
  },
];

export const marqueeWords = [
  "Swimming Pools",
  "Pool Design",
  "Pool Construction",
  "Pool Equipment",
  "Pool Heating",
  "Pool Lighting",
  "Pool Covering",
  "Waterproofing",
  "Expansion Joints",
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export const galleryImages: {
  src: string;
  media: Media;
  caption: string;
  tag: string;
}[] = [
  {
    src: "/images/hero-pool.jpeg",
    media: { type: "youtube", src: "https://youtube.com/shorts/sCjB5lbZpZM" },
    caption: "Residential pool solutions",
    tag: "Residential Pools",
  },
  {
    src: "/images/pool-aerial.jpg",
    media: {
      type: "youtube",
      src: "https://youtube.com/shorts/EmotFhC4RUw?si=zmVultDbAI9Qz7if",
    },
    caption: "Commercial pool solutions",
    tag: "Commercial Pools",
  },
  {
    src: "/images/fountain.jpg",
    media: { type: "image", src: "/images/fountain.jpeg" },
    caption: "Pool lighting solutions",
    tag: "Pool Lighting",
  },
  {
    src: "/images/spa.jpg",
    media: { type: "image", src: "/images/spa.jpg" },
    caption: "Jacuzzi pool solutions",
    tag: "Jacuzzi Pools",
  },
  {
    src: "/images/sauna.jpg",
    media: { type: "image", src: "/images/sauna.jpeg" },
    caption: "Pool engineering solutions",
    tag: "Engineering",
  },
  {
    src: "/images/indoor-pool.jpg",
    media: { type: "image", src: "/images/indoor-pool.jpg" },
    caption: "Pool heating solutions",
    tag: "Pool Heating",
  },
  {
    src: "/images/water-texture.jpg",
    media: { type: "image", src: "/images/water-texture.jpg" },
    caption: "Pool surface solutions",
    tag: "Pool Renovation",
  },
  {
    src: "/images/engineering.jpg",
    media: { type: "image", src: "/images/engineering.jpg" },
    caption: "Technical planning",
    tag: "Engineering",
  },
  {
    src: "/images/team.jpg",
    media: { type: "image", src: "/images/res.jpeg" },
    caption: siteProfile.name,
    tag: "RES",
  },
  {
    src: "/images/res-video.jpg",
    media: {
      type: "youtube",
      src: "https://youtu.be/V-lgr_8pdRc?si=hdbuERjsRQm3OyAx",
    },
    caption: "Dancing Fountain at night",
    tag: "Res",
  },
];
