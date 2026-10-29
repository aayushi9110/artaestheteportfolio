import { BrowserRouter as Router } from 'react-router-dom';
import AppShell, { ScrollToTop } from './AppShell.tsx';

/**
 * Client entry point. The server renders the same <AppShell /> under a
 * StaticRouter in src/entry-server.tsx — keep the tree below identical to it so
 * hydration matches.
 */
const App = () => (
  <Router>
    <ScrollToTop />
    <AppShell />
  </Router>
);

export default App;
