import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio'));
const Process = lazy(() => import('./pages/Process/Process'));
const Virtual = lazy(() => import('./pages/Virtual/Virtual'));
const Book = lazy(() => import('./pages/Book/Book'));
const ThePlan = lazy(() => import('./pages/ServiceDetails/ThePlan'));
const TheFurnishing = lazy(() => import('./pages/ServiceDetails/TheFurnishing'));
const TheRefresh = lazy(() => import('./pages/ServiceDetails/TheRefresh'));
const TheTradeProgram = lazy(() => import('./pages/ServiceDetails/TheTradeProgram'));
import { PROJECTS } from './data/appData.ts';
const InteriorStory = lazy(() => import('./pages/InteriorStory/InteriorStory'));
const FineArtStory = lazy(() => import('./pages/FineArtStory/FineArtStory'));
const PortfolioPdfPreview = lazy(() => import('./pages/PortfolioPdfPreview/PortfolioPdfPreview'));
import Header from './components/Header';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function StoryRouteResolver() {
  const { id = '' } = useParams();
  const project = PROJECTS[id];
  const target = project?.storyType === 'fine-art' ? `/fine-art-story/${id}` : `/interior-story/${id}`;

  return <Navigate to={target} replace />;
}

function AppShell() {
  const { pathname } = useLocation();
  const isPdfPreviewRoute = pathname === '/portfolio-pdf-preview';

  return (
    <div className="App">
      {!isPdfPreviewRoute && <Cursor />}
      {!isPdfPreviewRoute && <Header />}
      <Suspense fallback={<Loader />}>
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
          <Route path="/portfolio-pdf-preview" element={<PortfolioPdfPreview />} />
        </Routes>
      </Suspense>
      {!isPdfPreviewRoute && <Footer />}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <ScrollToTop />
      <AppShell />
    </Router>
  );
}

export default App;