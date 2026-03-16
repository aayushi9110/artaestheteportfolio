import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Portfolio from './pages/Portfolio/Portfolio';
import Process from './pages/Process/Process';
import Virtual from './pages/Virtual/Virtual';
import Book from './pages/Book/Book';
import CaseStudy from './pages/CaseStudy/CaseStudy';
import InteriorStory from './pages/InteriorStory/InteriorStory';
import FineArtStory from './pages/FineArtStory/FineArtStory';
import Header from './components/Header';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import { useState, useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function StoryRouteResolver() {
  const { id = '' } = useParams();
  const fineArtIds = new Set(['earth', 'sienna', 'clay']);
  const target = fineArtIds.has(id) ? `/fine-art-story/${id}` : `/interior-story/${id}`;

  return <Navigate to={target} replace />;
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
      <div className="App">
        <Cursor />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/process" element={<Process />} />
          <Route path="/virtual" element={<Virtual />} />
          <Route path="/book" element={<Book />} />
          <Route path="/case-study/:id" element={<StoryRouteResolver />} />
          <Route path="/interior-story/:id" element={<InteriorStory />} />
          <Route path="/fine-art-story/:id" element={<FineArtStory />} />
          <Route path="/project/:id" element={<StoryRouteResolver />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;