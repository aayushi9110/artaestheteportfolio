/**
 * Single source of truth for per-route metadata.
 *
 * Read by:
 *   - scripts/prerender.mts  → writes <head> tags into each pre-rendered HTML file
 *   - src/seo/useDocumentMeta.ts → keeps the title/description correct after
 *     client-side navigation, where the pre-rendered <head> no longer applies
 *   - scripts/prerender.mts  → sitemap.xml and llms.txt route lists
 *
 * Project routes are derived from PROJECTS, never hard-coded, so adding a case
 * study automatically adds a pre-rendered page, a sitemap entry and an llms.txt line.
 */
import { PROJECTS, type Project } from '../pages/CaseStudy/caseStudyData.ts';
import { SITE } from './siteConfig.ts';

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  /** Site-relative image path used for og:image. */
  image: string;
  ogType: 'website' | 'article' | 'profile';
  /** Set for project pages so the prerender step can emit CreativeWork JSON-LD. */
  projectId?: string;
};

/** `/interior-story/:id` or `/fine-art-story/:id`, decided by the project's storyType. */
export const storyPathFor = (id: string, project: Project): string =>
  project.storyType === 'fine-art' ? `/fine-art-story/${id}` : `/interior-story/${id}`;

/** Trim overview copy down to a usable meta description. */
const toDescription = (text: string, limit = 158): string => {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= limit) return flat;
  const cut = flat.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

const STATIC_ROUTES: RouteSeo[] = [
  {
    path: '/',
    title: 'Art Aesthete — Interior Design & Fine Art Studio',
    description:
      'Editorial furnishing for your home. Art Aesthete takes newly-renovated condos, family homes and apartments from empty to finished in six to ten weeks.',
    image: '/images/home/Heroimages/heroStudioimage.webp',
    ogType: 'website',
  },
  {
    path: '/about',
    title: 'About Aayushi Shah — Art Aesthete',
    description:
      'Seven years selling furniture at Crate & Barrel, West Elm and BoConcept taught Aayushi Shah how badly rooms get furnished. Art Aesthete is the alternative she built.',
    image: '/images/home/aboutAayushiPhotobnw.jpg',
    ogType: 'profile',
  },
  {
    path: '/portfolio',
    title: 'Portfolio — Interior Design & Fine Art Projects | Art Aesthete',
    description:
      'A curated collection of spaces and stories: interior design projects across New York, the Bay Area and Mumbai, alongside commissioned fine art.',
    image: '/images/WestElm/cuppertinoHome/CuppertinoAfterView.png',
    ogType: 'website',
  },
  {
    path: '/process',
    title: 'Services & Process — Art Aesthete',
    description:
      'Services built around your timeline: The Plan, The Furnishing, The Refresh and The Trade Program. Flat fees, real trade discounts, no nine-month timelines.',
    image: '/images/home/Heroimages/heroimagedetail.webp',
    ogType: 'website',
  },
  {
    path: '/virtual',
    title: 'Virtual E-Design Consultation — Art Aesthete',
    description:
      'E-Design for every room, beautifully delivered. Work with Art Aesthete remotely from anywhere in the States — location is never a barrier.',
    image: '/images/home/visualConsult_landingpg.png',
    ogType: 'website',
  },
  {
    path: '/book',
    title: 'Book a Consultation — Art Aesthete',
    description:
      'Tell us about your space and your vision. Initial discovery calls are complimentary and every enquiry gets a reply within 24 hours on weekdays.',
    image: '/images/home/Heroimages/heroStudioimage.webp',
    ogType: 'website',
  },
  {
    path: '/service/the-plan',
    title: 'The Plan — Design Plan Only | Art Aesthete',
    description:
      'A real plan, and you do the shopping. For owners who want a designer’s eye but enjoy the hunt, or who want to spread the spend over time.',
    image: '/images/WestElm/contemporaryLiving/westelm-project-living.png',
    ogType: 'website',
  },
  {
    path: '/service/the-furnishing',
    title: 'The Furnishing — Full Turnkey Service | Art Aesthete',
    description:
      'Empty rooms to finished home. Full turnkey furnishing for newly-renovated condos, co-ops and brownstones in Manhattan and Brooklyn.',
    image: '/images/WestElm/cuppertinoHome/CuppertinoSectional.png',
    ogType: 'website',
  },
  {
    path: '/service/the-refresh',
    title: 'The Refresh — Restyling Finished Homes | Art Aesthete',
    description:
      'You already moved in and you are not in love. A second wind for finished homes: textiles, lighting, art and styling, restyled in a single install day.',
    image: '/images/WestElm/SanFran/sanFransicoBedviewHero.png',
    ogType: 'website',
  },
  {
    path: '/service/the-trade-program',
    title: 'The Trade Program — For Designers, Architects & Realtors | Art Aesthete',
    description:
      'You finished the renovation, let us finish the rooms. Furnishing partnerships for architects, interior designers and realtors in NYC — white-label or co-branded.',
    image: '/images/Boconcept/office/boconcept-bright-office-view-1.png',
    ogType: 'website',
  },
];

const projectRoutes = (): RouteSeo[] =>
  Object.entries(PROJECTS).map(([id, project]) => ({
    path: storyPathFor(id, project),
    title: `${project.title}${project.location ? ` — ${project.location}` : ''} | ${SITE.name}`,
    description: toDescription(project.overviewTextPrimary || project.overviewTitle || SITE.description),
    image: project.heroImageUrl || SITE.defaultImagePath,
    ogType: 'article' as const,
    projectId: id,
  }));

/** Every public route, in sitemap order. Excludes /portfolio-pdf-preview by design. */
export const SEO_ROUTES: RouteSeo[] = [...STATIC_ROUTES, ...projectRoutes()];

export const SEO_BY_PATH: Record<string, RouteSeo> = Object.fromEntries(
  SEO_ROUTES.map((route) => [route.path, route])
);

/** Routes that must never be pre-rendered or advertised to crawlers. */
export const EXCLUDED_PATHS = ['/portfolio-pdf-preview'] as const;

/**
 * Resolve metadata for a live pathname, including the legacy /case-study/:id and
 * /project/:id aliases that redirect to a story route.
 */
export const seoForPathname = (pathname: string): RouteSeo | undefined => {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const direct = SEO_BY_PATH[normalized];
  if (direct) return direct;

  const legacy = normalized.match(/^\/(?:case-study|project)\/(.+)$/);
  if (legacy) {
    const project = PROJECTS[legacy[1]];
    if (project) return SEO_BY_PATH[storyPathFor(legacy[1], project)];
  }

  return undefined;
};
