import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PROJECTS } from '../../src/pages/CaseStudy/caseStudyData.ts';
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
const InteriorStory = lazy(() => import('../../src/pages/InteriorStory/InteriorStory.tsx'));
const FineArtStory = lazy(() => import('../../src/pages/FineArtStory/FineArtStory.tsx'));
const PortfolioPdfPreview = lazy(() => import('../../src/pages/PortfolioPdfPreview/PortfolioPdfPreview.tsx'));

// Rebuild StoryRouteResolver logic here to match App.tsx
function StoryRouteResolver() {
  const { id = '' } = useParams();
  const project = PROJECTS[id];
  const target = project?.storyType === 'fine-art' ? `/fine-art-story/${id}` : `/interior-story/${id}`;
  return <Navigate to={target} replace />;
}

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

  describe('STORY_ROUTES', () => {
    it.each(STORY_ROUTES)('renders $name at path $path', async (route) => {
      const { container } = render(
        <MemoryRouter initialEntries={[route.path]}>
          <TestAppShell>
            <Routes>
              <Route path="/interior-story/:id" element={<InteriorStory />} />
              <Route path="/fine-art-story/:id" element={<FineArtStory />} />
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

  describe('LEGACY_REDIRECTS', () => {
    it.each(LEGACY_REDIRECTS)(
      'redirects $name from $path to $redirectsTo',
      async (route) => {
        const { container } = render(
          <MemoryRouter initialEntries={[route.path]}>
            <TestAppShell>
              <Routes>
                <Route path="/case-study/:id" element={<StoryRouteResolver />} />
                <Route path="/project/:id" element={<StoryRouteResolver />} />
                <Route path="/interior-story/:id" element={<InteriorStory />} />
                <Route path="/fine-art-story/:id" element={<FineArtStory />} />
              </Routes>
              <LocationCapture />
            </TestAppShell>
          </MemoryRouter>
        );

        await waitFor(() => {
          const locationOutput = screen.getByTestId('location-output');
          expect(locationOutput.textContent).toBe(route.redirectsTo);
        });

        // Also assert the marker appears
        await waitFor(() => {
          const marker = container.querySelector(route.marker);
          expect(marker).toBeInTheDocument();
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
    it('resolves homeOffices (interior) to /interior-story/homeOffices', async () => {
      render(
        <MemoryRouter initialEntries={['/case-study/homeOffices']}>
          <TestAppShell>
            <Routes>
              <Route path="/case-study/:id" element={<StoryRouteResolver />} />
              <Route path="/interior-story/:id" element={<InteriorStory />} />
              <Route path="/fine-art-story/:id" element={<FineArtStory />} />
            </Routes>
            <LocationCapture />
          </TestAppShell>
        </MemoryRouter>
      );

      await waitFor(() => {
        const locationOutput = screen.getByTestId('location-output');
        expect(locationOutput.textContent).toBe('/interior-story/homeOffices');
      });
    });

    it('resolves orangeSeriesPainting (fine-art) to /fine-art-story/orangeSeriesPainting', async () => {
      render(
        <MemoryRouter initialEntries={['/project/orangeSeriesPainting']}>
          <TestAppShell>
            <Routes>
              <Route path="/project/:id" element={<StoryRouteResolver />} />
              <Route path="/interior-story/:id" element={<InteriorStory />} />
              <Route path="/fine-art-story/:id" element={<FineArtStory />} />
            </Routes>
            <LocationCapture />
          </TestAppShell>
        </MemoryRouter>
      );

      await waitFor(() => {
        const locationOutput = screen.getByTestId('location-output');
        expect(locationOutput.textContent).toBe('/fine-art-story/orangeSeriesPainting');
      });
    });

    it('handles unknown id by defaulting to interior story (fallback behavior)', async () => {
      render(
        <MemoryRouter initialEntries={['/case-study/doesNotExist']}>
          <TestAppShell>
            <Routes>
              <Route path="/case-study/:id" element={<StoryRouteResolver />} />
              <Route path="/interior-story/:id" element={<InteriorStory />} />
              <Route path="/fine-art-story/:id" element={<FineArtStory />} />
            </Routes>
            <LocationCapture />
          </TestAppShell>
        </MemoryRouter>
      );

      await waitFor(() => {
        const locationOutput = screen.getByTestId('location-output');
        // Unknown id defaults to interior-story (not fine-art)
        expect(locationOutput.textContent).toBe('/interior-story/doesNotExist');
      });
    });

    it('handles empty id without crashing', async () => {
      render(
        <MemoryRouter initialEntries={['/case-study/']}>
          <TestAppShell>
            <Routes>
              <Route path="/case-study/:id" element={<StoryRouteResolver />} />
              <Route path="/interior-story/:id" element={<InteriorStory />} />
            </Routes>
          </TestAppShell>
        </MemoryRouter>
      );

      // Should not throw; component should render
      await waitFor(() => {
        // Just verify no error occurred by waiting for the page to render
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      });
    });

    it('handles URL-encoded characters in id without crashing', async () => {
      render(
        <MemoryRouter initialEntries={['/case-study/some%20id']}>
          <TestAppShell>
            <Routes>
              <Route path="/case-study/:id" element={<StoryRouteResolver />} />
              <Route path="/interior-story/:id" element={<InteriorStory />} />
            </Routes>
          </TestAppShell>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
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

  describe('App.tsx file text guard', () => {
    it('all route patterns from ALL_ROUTES appear in src/App.tsx', () => {
      const appPath = resolve(__dirname, '../../src/App.tsx');
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
        expect(appContent).toContain(
          `path="${pattern}"`,
          `Route pattern "${pattern}" not found in App.tsx`
        );
      });
    });
  });
});
