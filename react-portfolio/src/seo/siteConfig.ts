/**
 * Canonical facts about the site, used by the SEO metadata map, the JSON-LD
 * builders, the prerender script and the generated crawl files.
 *
 * Only put things here that are actually stated on the site. Structured data
 * that invents an address or a phone number is worse than omitting it.
 */
export const SITE_ORIGIN = 'https://www.byaayushi.com';

export const SITE = {
  name: 'Art Aesthete',
  legalName: 'Art Aesthete',
  founder: 'Aayushi Shah',
  tagline: 'Interior Design & Fine Art',
  description:
    'Art Aesthete is an interior design and fine art studio founded by Aayushi Shah, furnishing newly-renovated condos, family homes and apartments from empty to finished in six to ten weeks.',
  logoPath: '/images/logos/artAesthete.png',
  defaultImagePath: '/images/home/Heroimages/heroStudioimage.webp',
  /** Places named in the site copy and project data. Do not add unstated locations. */
  areaServed: [
    'New York City',
    'Manhattan',
    'Brooklyn',
    'San Francisco',
    'Palo Alto',
    'Cupertino',
    'Foster City',
    'San Jose',
    'Mumbai',
  ],
} as const;

/** Absolute URL for a site-relative path, safe to put in canonical/OG tags. */
export const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith('/') ? '' : '/'}${encodeURI(path)}`;
};
