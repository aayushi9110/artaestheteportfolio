import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PROJECTS } from '../../src/pages/CaseStudy/caseStudyData.ts';
import AppShell from '../../src/AppShell.tsx';
import {
  PRIMARY_ROUTES,
  SERVICE_ROUTES,
  STORY_ROUTES,
  LEGACY_REDIRECTS,
  TOOL_ROUTES,
  ALL_ROUTES,
  NAV_PATHS,
} from '../routes.ts';

// Lazy-load all pages exactly as App.tsx does
const Home = lazy(() => import('../../src/pages/Home/Home.tsx'));
const About = lazy(() => import('../../src/pages/About/About.tsx'));
const Portfolio = lazy(() => import('../../src/pages/Portfolio/Portfolio.tsx'));
const Process = lazy(() => import('../../src/pages/Process/Process.tsx'));
const Virtual = lazy(() => import('../../src/pages/Virtual/Virtual.tsx'));
const Book = lazy(() => import('../../src/pages/Book/Book.tsx'));
const ThePlan = lazy(() => import('../../src/pages/ServiceDetails/ThePlan.tsx'));
const TheFurnishing = lazy(() => import('../../src/pages/ServiceDetails/TheFurnishing.tsx'));
const TheRefresh = lazy(() => import('../../src/pages/ServiceDetails/TheRefresh.tsx'));
const TheTradeProgram = lazy(() => import('../../src/pages/ServiceDetails/TheTradeProgram.tsx'));
const PortfolioPdfPreview = lazy(() => import('../../src/pages/PortfolioPdfPreview/PortfolioPdfPreview.tsx'));

// Helper component to capture location after navigation
function LocationCapture() {
  const location = useLocation();
  return <div data-testid="location-output">{location.pathname}</div>;
}

// Minimal test shell (no Cursor/Header/Footer like in App.tsx for simplicity)
function TestAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="App">
      <Suspense fallback={<div data-testid="loader">Loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
}

describe('routing', () => {
  describe('PRIMARY_ROUTES', () => {
    it.each(PRIMARY_ROUTES)('renders $name at path $path', async (route) => {
      const { container } = render(
        <MemoryRouter initialEntries={[route.path]}>
          <TestAppShell>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/process" element={<Process />} />
              <Route path="/virtual" element={<Virtual />} />
              <Route path="/book" element={<Book />} />
            </Routes>
          </TestAppShell>
        </MemoryRouter>
      );

      // Wait for lazy component to load
      await waitFor(() => {
        const marker = container.querySelector(route.marker);
        expect(marker).toBeInTheDocument();
      });
    });
  });

  describe('SERVICE_ROUTES', () => {
    it.each(SERVICE_ROUTES)('renders $name at path $path', async (route) => {
      const { container } = render(
        <MemoryRouter initialEntries={[route.path]}>
          <TestAppShell>
            <Routes>
              <Route path="/service/the-plan" element={<ThePlan />} />
              <Route path="/service/the-furnishing" element={<TheFurnishing />} />
              <Route path="/service/the-refresh" element={<TheRefresh />} />
              <Route path="/service/the-trade-program" element={<TheTradeProgram />} />
            </Routes>
          </TestAppShell>
        </MemoryRouter>
      );

      await waitFor(() => {
        const marker = container.querySelector(route.marker);
        expect(marker).toBeInTheDocument();
      });
    });
  });

  // Story and legacy routes go through the real AppShell, so publish guards and
  // StoryRouteResolver are tested as shipped rather than as a copy.
  const renderRealShell = (path: string) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <AppShell />
        <LocationCapture />
      </MemoryRouter>
    );

  /** Amplify serves directory routes with a trailing slash; treat both as one. */
  const samePath = (a: string) => a.replace(/\/+$/, '');

  describe('STORY_ROUTES', () => {
    it.each(STORY_ROUTES)('renders $name at path $path', async (route) => {
      const { container } = renderRealShell(route.path);

      await waitFor(() => {
        expect(container.querySelector(route.marker)).toBeInTheDocument();
      });
    });
  });

  describe('LEGACY_REDIRECTS', () => {
    it.each(LEGACY_REDIRECTS)(
      'redirects $name from $path to $redirectsTo',
      async (route) => {
        const { container } = renderRealShell(route.path);

        await waitFor(() => {
          expect(samePath(screen.getByTestId('location-output').textContent ?? '')).toBe(samePath(route.redirectsTo!));
        });

        await waitFor(() => {
          expect(container.querySelector(route.marker)).toBeInTheDocument();
        });
      }
    );
  });

  describe('TOOL_ROUTES', () => {
    it.each(TOOL_ROUTES)('renders $name at path $path', async (route) => {
      const { container } = render(
        <MemoryRouter initialEntries={[route.path]}>
          <TestAppShell>
            <Routes>
              <Route path="/portfolio-pdf-preview" element={<PortfolioPdfPreview />} />
            </Routes>
          </TestAppShell>
        </MemoryRouter>
      );

      await waitFor(() => {
        const marker = container.querySelector(route.marker);
        expect(marker).toBeInTheDocument();
      });
    });
  });

  describe('StoryRouteResolver edge cases', () => {
    const landsOn = async (path: string, expected: string) => {
      renderRealShell(path);
      await waitFor(() => {
        expect(screen.getByTestId('location-output').textContent).toBe(expected);
      });
    };

    it('resolves homeOffices (interior) to /interior-story/homeOffices', async () => {
      await landsOn('/case-study/homeOffices', '/interior-story/homeOffices');
    });

    it('resolves a hidden project (orangeSeriesPainting) to /portfolio', async () => {
      expect(PROJECTS.orangeSeriesPainting.isPublished).toBe(false);
      await landsOn('/project/orangeSeriesPainting', '/portfolio');
    });

    it('handles unknown id by defaulting to interior story (fallback behavior)', async () => {
      // Unknown id defaults to interior-story (not fine-art)
      await landsOn('/case-study/doesNotExist', '/interior-story/doesNotExist');
    });

    it('handles empty id without crashing', () => {
      // "/case-study/" matches no route, so the shell renders around an empty body.
      const { container } = renderRealShell('/case-study/');
      expect(container.querySelector('nav#nav')).toBeInTheDocument();
    });

    it('handles URL-encoded characters in id without crashing', async () => {
      renderRealShell('/case-study/some%20id');
      // React Router decodes the param, so either spelling is the same destination.
      await waitFor(() => {
        expect(screen.getByTestId('location-output').textContent).toMatch(/^\/interior-story\/some(%20| )id$/);
      });
    });
  });

  describe('unknown route edge case', () => {
    it('unknown path renders no page content (no 404 route is defined)', async () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/nonsense']}>
          <TestAppShell>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </TestAppShell>
        </MemoryRouter>
      );

      // No page should render for /nonsense
      // The shell renders but with no content
      expect(container.querySelector('.hero')).not.toBeInTheDocument();
      expect(container.querySelector('.ab-hero')).not.toBeInTheDocument();
    });
  });

  describe('manifest consistency', () => {
    it('every NAV_PATHS entry appears in ALL_ROUTES', () => {
      const routePaths = ALL_ROUTES.map((r) => r.path);

      NAV_PATHS.forEach((navPath) => {
        expect(routePaths).toContain(
          navPath,
          `NAV_PATHS includes "${navPath}" but it is not in ALL_ROUTES`
        );
      });
    });
  });

  describe('AppShell.tsx file text guard', () => {
    it('all route patterns from ALL_ROUTES appear in src/AppShell.tsx', () => {
      // The <Routes> tree lives in AppShell so the client (BrowserRouter) and the
      // prerenderer (StaticRouter) share one definition. App.tsx is just the
      // client-side router wrapper.
      const appPath = resolve(__dirname, '../../src/AppShell.tsx');
      const appContent = readFileSync(appPath, 'utf-8');

      // Extract all unique route patterns (not instance values like homeOffices)
      const routePatterns = new Set<string>();
      ALL_ROUTES.forEach((route) => {
        // Normalize routes to their parameterized form
        // Routes with specific id values (e.g., /interior-story/homeOffices) become /interior-story/:id
        let pattern = route.path;
        // Match paths like /interior-story/homeOffices, /fine-art-story/orangeSeriesPainting, etc.
        if (pattern.match(/^\/(interior-story|fine-art-story|case-study|project)\/[a-zA-Z0-9]+$/)) {
          pattern = pattern.replace(/\/[a-zA-Z0-9]+$/, '/:id');
        }
        routePatterns.add(pattern);
      });

      routePatterns.forEach((pattern) => {
        // Most routes are written as a literal path="...", but /portfolio-pdf-preview
        // is referenced through the PDF_PREVIEW_PATH constant (the shell also uses it
        // to strip Header/Footer/Cursor), so accept the bare quoted string too.
        const present =
          appContent.includes(`path="${pattern}"`) ||
          appContent.includes(`'${pattern}'`) ||
          appContent.includes(`"${pattern}"`);

        expect(present, `Route pattern "${pattern}" not found in AppShell.tsx`).toBe(true);
      });
    });
  });
});
