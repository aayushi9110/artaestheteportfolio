import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById('root')!
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Pre-rendered pages arrive with markup already in #root, so hydrate them instead
// of throwing the server's HTML away. `npm run dev` serves an empty root and takes
// the createRoot path.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
