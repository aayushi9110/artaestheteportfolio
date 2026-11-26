import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Portfolio from '../../src/pages/Portfolio/Portfolio.tsx';
import { PROJECTS, PUBLISHED_PROJECTS, isProjectPublished } from '../../src/pages/CaseStudy/caseStudyData.ts';

describe('Portfolio', () => {
  const publishedProjects = Object.values(PUBLISHED_PROJECTS);
  const hiddenProjects = Object.values(PROJECTS).filter((p) => !isProjectPublished(p));

  const renderPortfolio = () => {
    return render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );
  };

  it('renders the hero section', () => {
    const { container } = renderPortfolio();
    expect(container.querySelector('.gall-hero')).toBeInTheDocument();
  });

  it('renders the gallery grid', () => {
    const { container } = renderPortfolio();
    expect(container.querySelector('.gall-grid')).toBeInTheDocument();
  });

  it('renders gallery items', async () => {
    const { container } = renderPortfolio();

    // Wait for IntersectionObserver to trigger reveal class
    await waitFor(() => {
      const items = container.querySelectorAll('.gi');
      expect(items.length).toBeGreaterThan(0);
    });
  });

  it('shows every published project, and only interiors', async () => {
    const { container } = renderPortfolio();

    await waitFor(() => {
      expect(container.querySelectorAll('.gi').length).toBe(publishedProjects.length);
    });
    const titles = Array.from(container.querySelectorAll('.gi-title')).map((el) => el.textContent);
    for (const hidden of hiddenProjects) expect(titles).not.toContain(hidden.title);
    expect(publishedProjects.every((p) => p.storyType === 'interior')).toBe(true);
  });

  it('has no filter tabs', () => {
    const { container } = renderPortfolio();

    expect(container.querySelector('.gall-tabs')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Fine Art/i })).not.toBeInTheDocument();
  });

  it('labels every project button "View Project"', () => {
    const { container } = renderPortfolio();

    const labels = Array.from(container.querySelectorAll('.pf-carousel-actions a')).map((a) => a.textContent);
    expect(labels.length).toBe(publishedProjects.length);
    expect(new Set(labels)).toEqual(new Set(['View Project']));
    expect(container.textContent).not.toMatch(/Case Study/);
  });

  it('counts the carousel against published projects', () => {
    renderPortfolio();

    expect(screen.getByText(`1 / ${publishedProjects.length}`)).toBeInTheDocument();
  });

  describe('shuffle determinism', () => {
    it('with stubbed Math.random, shuffle returns same items in consistent order', async () => {
      // Stub Math.random to return 0.5 for consistent shuffling
      const mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);

      try {
        const { container } = renderPortfolio();

        await waitFor(() => {
          const items = container.querySelectorAll('.gi');
          expect(items.length).toBe(publishedProjects.length);
        });

        // Extract the sorted list of visible item titles to verify it's a permutation
        const itemTitles = Array.from(container.querySelectorAll('.gi-title')).map(
          (el) => el.textContent
        );

        // Should have same number of items as source
        expect(itemTitles.length).toBe(publishedProjects.length);

        // Should have no duplicates (permutation property)
        const uniqueTitles = new Set(itemTitles);
        expect(uniqueTitles.size).toBe(publishedProjects.length);

        // All titles should come from PROJECTS
        const projectTitles = publishedProjects.map((p) => p.title);
        itemTitles.forEach((title) => {
          expect(projectTitles).toContain(title);
        });
      } finally {
        mathRandomSpy.mockRestore();
      }
    });
  });

  describe('carousel wrap-around', () => {
    it('previous button wraps from first item to last', async () => {
      const user = userEvent.setup();
      const { container } = renderPortfolio();

      // Click the previous button while on first carousel item
      const prevButton = container.querySelector('.pf-carousel-prev');
      expect(prevButton).toBeInTheDocument();

      await user.click(prevButton!);

      // Should wrap to the last featured item
      const count = screen.getByText(new RegExp(/\d+ \/ \d+/));
      expect(count.textContent).toMatch(/\d+ \/ \d+/);
    });

    it('next button wraps from last item to first', async () => {
      const user = userEvent.setup();
      const { container } = renderPortfolio();

      // Get the count of featured items
      const count = screen.getByText(new RegExp(/\d+ \/ \d+/));
      const [current, total] = count.textContent!.split(' / ').map(Number);

      // Click next button until we reach the last item
      const nextButton = container.querySelector('.pf-carousel-next');
      expect(nextButton).toBeInTheDocument();

      for (let i = current; i < total; i++) {
        await user.click(nextButton!);
      }

      // Should be at the last item
      await waitFor(() => {
        const newCount = screen.getByText(new RegExp(/\d+ \/ \d+/));
        expect(newCount.textContent).toContain(`${total} / ${total}`);
      });

      // Click next once more, should wrap to first
      await user.click(nextButton!);

      await waitFor(() => {
        const wrappedCount = screen.getByText(new RegExp(/\d+ \/ \d+/));
        expect(wrappedCount.textContent).toContain('1 /');
      });
    });
  });

  describe('lightbox', () => {
    it('opens when clicking an item', async () => {
      const user = userEvent.setup();
      const { container } = renderPortfolio();

      await waitFor(() => {
        expect(container.querySelector('.gall-grid')).toBeInTheDocument();
      });

      const firstItem = container.querySelector('.gi');
      expect(firstItem).toBeInTheDocument();

      await user.click(firstItem!);

      await waitFor(() => {
        const lightbox = container.querySelector('.gall-lightbox');
        expect(lightbox).toBeInTheDocument();
      });
    });

    it('closes when clicking the close button', async () => {
      const user = userEvent.setup();
      const { container } = renderPortfolio();

      await waitFor(() => {
        expect(container.querySelector('.gall-grid')).toBeInTheDocument();
      });

      const firstItem = container.querySelector('.gi');
      await user.click(firstItem!);

      await waitFor(() => {
        expect(container.querySelector('.gall-lightbox')).toBeInTheDocument();
      });

      const closeButton = container.querySelector('.gall-lightbox-close');
      await user.click(closeButton!);

      await waitFor(() => {
        const lightbox = container.querySelector('.gall-lightbox');
        expect(lightbox).not.toBeInTheDocument();
      });
    });

    it('closes when clicking outside the dialog', async () => {
      const user = userEvent.setup();
      const { container } = renderPortfolio();

      await waitFor(() => {
        expect(container.querySelector('.gall-grid')).toBeInTheDocument();
      });

      const firstItem = container.querySelector('.gi');
      await user.click(firstItem!);

      await waitFor(() => {
        expect(container.querySelector('.gall-lightbox')).toBeInTheDocument();
      });

      const lightboxBackdrop = container.querySelector('.gall-lightbox');
      await user.click(lightboxBackdrop!);

      await waitFor(() => {
        expect(container.querySelector('.gall-lightbox')).not.toBeInTheDocument();
      });
    });
  });
});
