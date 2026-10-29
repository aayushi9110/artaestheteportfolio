import { existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * `vite preview` serves dist/ with an SPA fallback, so `/about` (no trailing
 * slash) is rewritten to /index.html instead of resolving dist/about/index.html.
 * That makes the preview hydrate the home page's markup under a different route —
 * a hydration mismatch that production would not have.
 *
 * This mirrors the hosting rule we want on Amplify: an existing file or directory
 * index wins, and only genuinely unknown paths fall through to the SPA shell.
 */
const serveDirectoryIndexes = (): Plugin => ({
  name: 'serve-directory-indexes',
  configurePreviewServer(server) {
    const distDir = resolve(__dirname, 'dist')

    server.middlewares.use((req, _res, next) => {
      if (!req.url) return next()

      const [pathname] = req.url.split('?')
      if (pathname.includes('.') || pathname.endsWith('/')) return next()

      const candidate = resolve(distDir, `.${pathname}`, 'index.html')
      if (candidate.startsWith(distDir) && existsSync(candidate) && statSync(candidate).isFile()) {
        req.url = req.url.replace(pathname, `${pathname}/index.html`)
      }

      return next()
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), serveDirectoryIndexes()],
})
