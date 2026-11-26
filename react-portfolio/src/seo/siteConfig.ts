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
  tagline: 'Interior Design & Styling',
  description:
    'Art Aesthete is an interior design and styling studio founded by Aayushi Shah, furnishing newly-renovated condos, family homes and apartments from empty to finished in five to twelve weeks. In person in NYC & North NJ, virtually across the US.',
  logoPath: '/images/logos/artAesthete.png',
  defaultImagePath: '/images/home/Heroimages/heroStudioimage.webp',
  /**
   * Where the studio takes work: in person in NYC & North NJ, virtually across
   * the US (see SITE_FACTS.serviceArea). Past projects elsewhere (Palo Alto,
   * Mumbai, ...) stay on their own pages but are not a service area.
   */
  areaServed: ['New York City', 'North New Jersey', 'United States'],
} as const;

/** Absolute URL for a site-relative path, safe to put in canonical/OG tags. */
export const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith('/') ? '' : '/'}${encodeURI(path)}`;
};
