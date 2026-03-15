import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Portfolio from './pages/Portfolio/Portfolio';
import Process from './pages/Process/Process';
import Virtual from './pages/Virtual/Virtual';
import Book from './pages/Book/Book';
import CaseStudy from './pages/CaseStudy/CaseStudy';
import Header from './components/Header';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import { useState, useEffect } from 'react';

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
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/project/:id" element={<CaseStudy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;