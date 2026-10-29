/**
 * JSON-LD builders. Emitted into each pre-rendered page's <head> by
 * scripts/prerender.mts.
 *
 * Rule: only state facts that already appear on the site. No invented address,
 * phone number, price or rating — fabricated structured data is a liability,
 * and an omitted property is always allowed.
 */
import { PROJECTS } from '../pages/CaseStudy/caseStudyData.ts';
import { CONTENT } from '../data/contentData.ts';
import { SITE, SITE_ORIGIN, absoluteUrl } from './siteConfig.ts';
import { storyPathFor } from './routes.ts';

type Json = Record<string, unknown>;

/** The four named services plus the remote option, as described on /process. */
const SERVICES: { name: string; description: string; path: string }[] = [
  {
    name: 'The Plan',
    description:
      'A design plan you shop yourself: layouts, specifications and sourcing guidance for owners who want a designer’s eye but enjoy the hunt.',
    path: '/service/the-plan',
  },
  {
    name: 'The Furnishing',
    description:
      'Full turnkey furnishing for newly-renovated condos, co-ops and brownstones — empty rooms to finished home.',
    path: '/service/the-furnishing',
  },
  {
    name: 'The Refresh',
    description:
      'Restyling for homes that are already lived in: textiles, lighting, art and styling, installed in a single day.',
    path: '/service/the-refresh',
  },
  {
    name: 'The Trade Program',
    description:
      'Furnishing partnerships for architects, interior designers and realtors — white-label, co-branded, or behind the scenes.',
    path: '/service/the-trade-program',
  },
  {
    name: 'Virtual Consultation (E-Design)',
    description:
      'Remote e-design delivered over video for clients anywhere in the United States.',
    path: '/virtual',
  },
];

const founder = (): Json => ({
  '@type': 'Person',
  name: SITE.founder,
  jobTitle: 'Interior Designer and Artist',
  url: absoluteUrl('/about'),
  image: absoluteUrl(SITE.logoPath),
});

export const professionalServiceLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': `${SITE_ORIGIN}/#business`,
  name: SITE.name,
  legalName: SITE.legalName,
  description: SITE.description,
  url: SITE_ORIGIN,
  logo: absoluteUrl(SITE.logoPath),
  image: absoluteUrl(SITE.defaultImagePath),
  slogan: CONTENT.home.punchline,
  founder: founder(),
  areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
  knowsAbout: [
    'Interior design',
    'Furniture specification',
    'Space planning',
    'Fine art curation',
    'Colour consultancy',
  ],
  makesOffer: SERVICES.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.name,
      description: service.description,
      url: absoluteUrl(service.path),
      provider: { '@id': `${SITE_ORIGIN}/#business` },
    },
  })),
});

export const personLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_ORIGIN}/about#person`,
  name: SITE.founder,
  jobTitle: 'Interior Designer and Artist',
  description:
    'Founder of Art Aesthete. Seven years on the floor at Crate & Barrel, West Elm and BoConcept before starting a studio that furnishes homes from empty to finished.',
  url: absoluteUrl('/about'),
  image: absoluteUrl('/images/home/aboutAayushiPhotobnw.jpg'),
  worksFor: { '@id': `${SITE_ORIGIN}/#business` },
});

export const creativeWorkLd = (projectId: string): Json | undefined => {
  const project = PROJECTS[projectId];
  if (!project) return undefined;

  const path = storyPathFor(projectId, project);
  const images = [project.heroImageUrl, project.afterImageUrl, ...project.galleryItems.map((item) => item.url)]
    .filter(Boolean)
    .filter((url, index, all) => all.indexOf(url) === index)
    .slice(0, 6)
    .map((url) => absoluteUrl(url));

  return {
    '@context': 'https://schema.org',
    '@type': project.storyType === 'fine-art' ? ['CreativeWork', 'VisualArtwork'] : ['CreativeWork'],
    '@id': `${SITE_ORIGIN}${path}#work`,
    name: project.title,
    headline: project.overviewTitle || project.title,
    description: (project.overviewTextPrimary || '').replace(/\s+/g, ' ').trim(),
    url: absoluteUrl(path),
    image: images,
    ...(project.location ? { locationCreated: { '@type': 'Place', name: project.location } } : {}),
    ...(project.tagLabels.length ? { keywords: project.tagLabels.join(', ') } : {}),
    creator: founder(),
    provider: { '@id': `${SITE_ORIGIN}/#business` },
  };
};

/** Only emitted where the page genuinely has Q&A content on it. */
export const faqLd = (faqs: { question: string; answer: string }[]): Json | undefined => {
  if (faqs.length === 0) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
};

export const breadcrumbLd = (trail: { name: string; path: string }[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

/** Service page structured data, one per /service/* route. */
export const serviceLd = (route: { path: string; title: string; description: string; image: string }): Json => {
  const match = SERVICES.find((service) => service.path === route.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_ORIGIN}${route.path}#service`,
    name: match?.name ?? route.title.split(' — ')[0],
    description: match?.description ?? route.description,
    url: absoluteUrl(route.path),
    image: absoluteUrl(route.image),
    serviceType: 'Interior design and furnishing',
    provider: { '@id': `${SITE_ORIGIN}/#business` },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
  };
};

/** /portfolio as a browsable collection, so the project pages are discoverable. */
export const portfolioCollectionLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_ORIGIN}/portfolio#collection`,
  name: `Portfolio — ${SITE.name}`,
  description:
    'Interior design projects across New York, the Bay Area and Mumbai, alongside commissioned fine art.',
  url: absoluteUrl('/portfolio'),
  isPartOf: { '@id': `${SITE_ORIGIN}/#business` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: Object.keys(PROJECTS).length,
    itemListElement: Object.entries(PROJECTS).map(([id, project], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.title,
      url: absoluteUrl(storyPathFor(id, project)),
    })),
  },
});
