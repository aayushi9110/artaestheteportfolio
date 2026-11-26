/**
 * One source of truth for the services, their prices and timelines, and the
 * studio-wide claims (reply time, service area). The homepage services strip,
 * /services, and every /service/* price box read from here, so a price or a
 * timeline is changed in exactly one place.
 */

export const SITE_FACTS = {
  replyTime: 'Within 24 hours on weekdays',
  serviceArea: 'In person in NYC & North NJ · Virtual design across the US',
  serviceAreaSentence: 'In person in NYC & North NJ, virtually across the US.',
} as const;

export type ServiceId = 'design-consult' | 'the-plan' | 'the-furnishing' | 'the-refresh';

export type Service = {
  id: ServiceId;
  name: string;
  path: `/service/${ServiceId}`;
  oneLine: string;
  /**
   * Headline price as shown on cards, e.g. "From $N,NNN". `null` until Aayushi
   * confirms it: prices are only entered here once they are final, because this
   * repository is public and anything committed is effectively published.
   * Components must render nothing (not a placeholder) for a `null` price.
   */
  price: string | null;
  /** Qualifier under the price, e.g. "furnishings billed separately". */
  priceNote?: string;
  timeline: string;
  rentalExtras: string;
  isMostPopular: boolean;
};

export type FurnishingTier = {
  homeSize: string;
  /** `null` until confirmed; see `Service.price`. */
  designFee: string | null;
  timeline: string;
};

/** Card order on /services and the homepage: Consult, Plan, Furnishing, Refresh. */
export const SERVICES: readonly Service[] = [
  {
    id: 'design-consult',
    name: 'Design Consult',
    path: '/service/design-consult',
    oneLine: 'One room or one big decision, virtual or in person',
    price: null,
    priceNote: 'credited to any package',
    timeline: '90 minutes',
    rentalExtras: 'Rental-readiness review of your listing',
    isMostPopular: false,
  },
  {
    id: 'the-plan',
    name: 'The Plan',
    path: '/service/the-plan',
    oneLine: 'A full design plan and shopping list; you buy it yourself',
    price: null,
    timeline: '2 weeks, discovery to delivered plan',
    rentalExtras: 'Remote plan for properties outside NYC',
    isMostPopular: false,
  },
  {
    id: 'the-furnishing',
    name: 'The Furnishing',
    path: '/service/the-furnishing',
    oneLine: 'Designed, sourced, delivered, installed. Done.',
    price: null,
    priceNote: 'furnishings billed separately',
    timeline: '5–12 weeks by size',
    rentalExtras: 'Rental-Ready Setup: durable pieces, turnover kit, inventory list, photo-ready',
    isMostPopular: true,
  },
  {
    id: 'the-refresh',
    name: 'The Refresh',
    path: '/service/the-refresh',
    oneLine: 'Restyle the home you already have',
    price: null,
    priceNote: 'new pieces billed separately',
    timeline: 'About 1 week, walk-through to install',
    rentalExtras: 'Annual Rental Refresh',
    isMostPopular: false,
  },
];

/** The Furnishing tiers. Timelines are final; fees are entered once confirmed. */
export const FURNISHING_TIERS: readonly FurnishingTier[] = [
  { homeSize: 'Studio', designFee: null, timeline: '5–6 weeks' },
  { homeSize: '1-Bedroom', designFee: null, timeline: '6–8 weeks' },
  { homeSize: '2-Bedroom', designFee: null, timeline: '8–10 weeks' },
  { homeSize: '3-Bedroom+', designFee: null, timeline: '10–12 weeks' },
];

export const serviceById = (id: ServiceId): Service => {
  const service = SERVICES.find((entry) => entry.id === id);
  if (!service) throw new Error(`Unknown service id: ${id}`);
  return service;
};
