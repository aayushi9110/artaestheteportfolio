import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { PROJECTS } from './data/appData.ts';
import { storyPathFor } from './seo/routes.ts';
import { useDocumentMeta } from './seo/useDocumentMeta.ts';
import Header from './components/Header';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Home from './pages/Home/Home.tsx';
import About from './pages/About/About.tsx';
import Portfolio from './pages/Portfolio/Portfolio.tsx';
import Process from './pages/Process/Process.tsx';
import Virtual from './pages/Virtual/Virtual.tsx';
import Book from './pages/Book/Book.tsx';
import ThePlan from './pages/ServiceDetails/ThePlan.tsx';
import TheFurnishing from './pages/ServiceDetails/TheFurnishing.tsx';
import TheRefresh from './pages/ServiceDetails/TheRefresh.tsx';
import TheTradeProgram from './pages/ServiceDetails/TheTradeProgram.tsx';
import InteriorStory from './pages/InteriorStory/InteriorStory.tsx';
import FineArtStory from './pages/FineArtStory/FineArtStory.tsx';

/**
 * Content routes are imported eagerly so the server renderer and the first client
 * render produce identical markup — a lazy route would hydrate as <Loader /> over
 * pre-rendered content and throw a hydration mismatch.
 *
 * The PDF preview stays lazy: it pulls in jspdf/html2canvas/html2pdf (~750kB) and
 * touches `window` at import time, so it must never enter the server bundle. It is
 * excluded from pre-rendering, so it is always a client-only render.
 */
const PortfolioPdfPreview = lazy(() => import('./pages/PortfolioPdfPreview/PortfolioPdfPreview.tsx'));

const PDF_PREVIEW_PATH = '/portfolio-pdf-preview';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

/**
 * Legacy /case-study/:id and /project/:id URLs predate the split into interior and
 * fine-art stories. Old links and shared PDFs still point at them.
 */
function StoryRouteResolver() {
  const { id = '' } = useParams();
  const project = PROJECTS[id];
  const target = project ? storyPathFor(id, project) : `/interior-story/${id}`;

  return <Navigate to={target} replace />;
}

const AppShell = () => {
  const { pathname } = useLocation();
  const isPdfPreviewRoute = pathname === PDF_PREVIEW_PATH;

  useDocumentMeta(pathname);

  return (
    <div className="App">
      {!isPdfPreviewRoute && <Cursor />}
      {!isPdfPreviewRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/process" element={<Process />} />
        <Route path="/virtual" element={<Virtual />} />
        <Route path="/book" element={<Book />} />
        <Route path="/service/the-plan" element={<ThePlan />} />
        <Route path="/service/the-furnishing" element={<TheFurnishing />} />
        <Route path="/service/the-refresh" element={<TheRefresh />} />
        <Route path="/service/the-trade-program" element={<TheTradeProgram />} />
        <Route path="/case-study/:id" element={<StoryRouteResolver />} />
        <Route path="/interior-story/:id" element={<InteriorStory />} />
        <Route path="/fine-art-story/:id" element={<FineArtStory />} />
        <Route path="/project/:id" element={<StoryRouteResolver />} />
        <Route
          path={PDF_PREVIEW_PATH}
          element={
            <Suspense fallback={<Loader />}>
              <PortfolioPdfPreview />
            </Suspense>
          }
        />
      </Routes>
      {!isPdfPreviewRoute && <Footer />}
    </div>
  );
};

export { ScrollToTop };
export default AppShell;
