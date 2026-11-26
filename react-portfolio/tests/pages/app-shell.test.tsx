/**
 * The real AppShell, at the URLs production actually serves. Amplify 301s every
 * pre-rendered route to its trailing-slash form, so shell decisions keyed on the
 * pathname must hold for both spellings.
 */
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AppShell from '../../src/AppShell.tsx';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppShell />
    </MemoryRouter>
  );

describe('AppShell bare PDF preview route', () => {
  it.each(['/portfolio-pdf-preview', '/portfolio-pdf-preview/'])(
    '%s renders without the site header (nav#nav) and footer',
    (path) => {
      const { container } = renderAt(path);

      expect(container.querySelector('nav#nav')).not.toBeInTheDocument();
      expect(container.querySelector('footer')).not.toBeInTheDocument();
    }
  );

  it('keeps the header and footer on ordinary routes, with or without a slash', () => {
    for (const path of ['/about', '/about/']) {
      const { container, unmount } = renderAt(path);
      expect(container.querySelector('nav#nav'), path).toBeInTheDocument();
      expect(container.querySelector('footer'), path).toBeInTheDocument();
      unmount();
    }
  });
});
