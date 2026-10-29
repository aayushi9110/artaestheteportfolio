/**
 * Single source of truth for "what must be reachable in production".
 *
 * Both the jsdom routing tests and the live smoke test read this list, so a new
 * route is covered everywhere the moment it is added here.
 */
export type RouteCheck = {
  /** Path to visit. */
  path: string;
  /** Human label used in test names and the smoke-test report. */
  name: string;
  /** CSS selector that must exist once the page has settled. */
  marker: string;
  /** Text that must appear somewhere in the rendered page. */
  expectText?: string;
  /** Path we should end up on, when the route is a redirect. */
  redirectsTo?: string;
  /** Routes that intentionally render without Header/Footer/Cursor. */
  bareShell?: boolean;
};

export const PRIMARY_ROUTES: RouteCheck[] = [
  { path: '/', name: 'Home', marker: '.hero', expectText: 'Plans. Pieces. Polish' },
  { path: '/about', name: 'About', marker: '.ab-hero' },
  { path: '/portfolio', name: 'Portfolio', marker: '.gall-hero' },
  { path: '/process', name: 'Process', marker: '.how-hero' },
  { path: '/virtual', name: 'Virtual', marker: '.vc-hero' },
  { path: '/book', name: 'Book', marker: '.book-page' },
];

export const SERVICE_ROUTES: RouteCheck[] = [
  { path: '/service/the-plan', name: 'Service — The Plan', marker: '.sd-hero' },
  { path: '/service/the-furnishing', name: 'Service — The Furnishing', marker: '.sd-hero' },
  { path: '/service/the-refresh', name: 'Service — The Refresh', marker: '.sd-hero' },
  { path: '/service/the-trade-program', name: 'Service — The Trade Program', marker: '.sd-hero' },
];

export const STORY_ROUTES: RouteCheck[] = [
  { path: '/interior-story/homeOffices', name: 'Interior story', marker: '.cs-hero' },
  { path: '/fine-art-story/orangeSeriesPainting', name: 'Fine-art story', marker: '.cs-hero' },
];

/** Legacy URLs that must keep resolving — old links and shared PDFs point at them. */
export const LEGACY_REDIRECTS: RouteCheck[] = [
  {
    path: '/case-study/homeOffices',
    name: 'Legacy /case-study → interior',
    marker: '.cs-hero',
    redirectsTo: '/interior-story/homeOffices',
  },
  {
    path: '/project/orangeSeriesPainting',
    name: 'Legacy /project → fine-art',
    marker: '.cs-hero',
    redirectsTo: '/fine-art-story/orangeSeriesPainting',
  },
];

export const TOOL_ROUTES: RouteCheck[] = [
  {
    path: '/portfolio-pdf-preview',
    name: 'PDF preview',
    marker: '#pdf-export-root',
    bareShell: true,
  },
];

export const ALL_ROUTES: RouteCheck[] = [
  ...PRIMARY_ROUTES,
  ...SERVICE_ROUTES,
  ...STORY_ROUTES,
  ...LEGACY_REDIRECTS,
  ...TOOL_ROUTES,
];

/** Routes the header links to; every one of these must be in ALL_ROUTES. */
export const NAV_PATHS = ['/', '/portfolio', '/process', '/about', '/book'] as const;
