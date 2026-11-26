/**
 * `isPublished: false` hides a project without deleting it. Its pages are no longer
 * pre-rendered, so a visitor only reaches its old URLs through the SPA fallback,
 * and the real AppShell must send them to /portfolio rather than render the project
 * (or the homeOffices fallback CaseStudy uses for unknown ids).
 *
 * The flag is toggled at runtime on one real project so this keeps testing the
 * guard whatever the data says today.
 */
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import AppShell from '../../src/AppShell.tsx';
import { PROJECTS } from '../../src/pages/CaseStudy/caseStudyData.ts';

const HIDDEN_ID = 'orangeSeriesPainting';
const PUBLISHED_INTERIOR_ID = 'homeOffices';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppShell />
    </MemoryRouter>
  );

describe('unpublished projects', () => {
  let original: boolean | undefined;

  beforeEach(() => {
    original = PROJECTS[HIDDEN_ID].isPublished;
    PROJECTS[HIDDEN_ID].isPublished = false;
  });

  afterEach(() => {
    PROJECTS[HIDDEN_ID].isPublished = original;
  });

  it.each([
    `/fine-art-story/${HIDDEN_ID}`,
    `/interior-story/${HIDDEN_ID}`,
    `/case-study/${HIDDEN_ID}`,
    `/project/${HIDDEN_ID}`,
  ])('%s redirects to the portfolio', async (path) => {
    const { container } = renderAt(path);

    await waitFor(() => expect(container.querySelector('.gall-hero')).toBeInTheDocument());
    expect(container.querySelector('#pg-case-study')).not.toBeInTheDocument();
  });

  it('leaves published story pages alone', async () => {
    const { container } = renderAt(`/interior-story/${PUBLISHED_INTERIOR_ID}`);

    await waitFor(() => expect(container.querySelector('#pg-case-study')).toBeInTheDocument());
    expect(container.textContent).toContain(PROJECTS[PUBLISHED_INTERIOR_ID].title);
    expect(container.querySelector('.gall-hero')).not.toBeInTheDocument();
  });
});
