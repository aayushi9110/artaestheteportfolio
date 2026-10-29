import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import AppShell from './AppShell.tsx';

/**
 * Server renderer used by scripts/prerender.mts.
 *
 * Every content route in AppShell is imported eagerly, so a synchronous
 * renderToString resolves the whole page — there is no Suspense boundary left to
 * wait on, and no <Loader /> fallback can leak into the output. The one lazy route
 * (/portfolio-pdf-preview) is never pre-rendered.
 */
export const render = (url: string): string =>
  renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>
  );

export default render;
