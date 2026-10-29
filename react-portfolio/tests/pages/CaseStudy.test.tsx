import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CaseStudy from '../../src/pages/CaseStudy/CaseStudy.tsx';
import { PROJECTS } from '../../src/pages/CaseStudy/caseStudyData.ts';

describe('CaseStudy', () => {
  const renderCaseStudy = (
    id: string,
    showInteriorView = true,
    initialEntries?: string[]
  ) => {
    const entries = initialEntries || [`/interior-story/${id}`];
    return render(
      <MemoryRouter initialEntries={entries}>
        <Routes>
          <Route
            path="/interior-story/:id"
            element={<CaseStudy showInteriorView={showInteriorView} />}
          />
          <Route
            path="/fine-art-story/:id"
            element={<CaseStudy showInteriorView={false} />}
          />
        </Routes>
      </MemoryRouter>
    );
  };

  describe('basic rendering', () => {
    it('renders title for a known project id', async () => {
      renderCaseStudy('homeOffices');

      await waitFor(() => {
        expect(screen.getByText('Home Office')).toBeInTheDocument();
      });
    });

    it('renders location for a known project id', async () => {
      renderCaseStudy('homeOffices');

      await waitFor(() => {
        const location = PROJECTS['homeOffices'].location;
        expect(screen.getByText(location)).toBeInTheDocument();
      });
    });
  });

  describe('unknown id fallback', () => {
    it('falls back to homeOffices when id is unknown', async () => {
      renderCaseStudy('doesNotExist');

      await waitFor(() => {
        const homeOfficesTitle = PROJECTS['homeOffices'].title;
        expect(screen.getByText(homeOfficesTitle)).toBeInTheDocument();
      });
    });

    it('does not crash with unknown id', async () => {
      // Should render without throwing
      const { container } = renderCaseStudy('unknownProject123');

      await waitFor(() => {
        expect(container.querySelector('#pg-case-study')).toBeInTheDocument();
      });
    });
  });

  describe('showInteriorView prop', () => {
    it('shows before/after compare slider when showInteriorView is true (default)', async () => {
      const { container } = renderCaseStudy('homeOffices', true);

      await waitFor(() => {
        const compareSlider = container.querySelector('.cs-ba');
        expect(compareSlider).toBeInTheDocument();
      });
    });

    it('hides before/after compare slider when showInteriorView is false', async () => {
      const { container } = renderCaseStudy('orangeSeriesPainting', false);

      await waitFor(() => {
        const compareSlider = container.querySelector('.cs-ba');
        expect(compareSlider).not.toBeInTheDocument();
      });
    });

    it('shows location text only when showInteriorView is true', async () => {
      // With interior view (true)
      const { container: interiorContainer } = renderCaseStudy('homeOffices', true);

      await waitFor(() => {
        const location = interiorContainer.querySelector('.cs-loc');
        expect(location).toBeInTheDocument();
      });
    });

    it('hides location text when showInteriorView is false', async () => {
      const { container } = renderCaseStudy('orangeSeriesPainting', false);

      await waitFor(() => {
        const location = container.querySelector('.cs-loc');
        expect(location).not.toBeInTheDocument();
      });
    });
  });

  describe('gallery rendering', () => {
    it('renders one carousel slide per gallery item', async () => {
      const { container } = renderCaseStudy('homeOffices');

      await waitFor(() => {
        const project = PROJECTS['homeOffices'];
        const slides = container.querySelectorAll('.cs-carousel-slide');
        expect(slides.length).toBe(project.galleryItems.length);
      });
    });

    it('renders thumbnails for each gallery item', async () => {
      const { container } = renderCaseStudy('homeOffices');

      await waitFor(() => {
        const project = PROJECTS['homeOffices'];
        const thumbs = container.querySelectorAll('.cs-carousel-thumb');
        expect(thumbs.length).toBe(project.galleryItems.length);
      });
    });

    it('renders empty caption without crashing', async () => {
      // Use a project that may have empty captions (from caseStudyData)
      // cuppertinoHome has an empty caption in its gallery items
      const { container } = renderCaseStudy('cuppertinoHome');

      await waitFor(() => {
        const captionElement = container.querySelector('.cs-carousel-caption');
        expect(captionElement).toBeInTheDocument();
        // Should render safely; caption content depends on activeImageIndex
      });

      // Verify no error occurred during render
      expect(container.querySelector('#pg-case-study')).toBeInTheDocument();
    });
  });

  describe('compare slider', () => {
    it('compare position starts at 50', async () => {
      const { container } = renderCaseStudy('homeOffices');

      await waitFor(() => {
        expect(screen.getByText('Home Office')).toBeInTheDocument();
      });

      // Get the range input
      const rangeInput = container.querySelector(
        'input[type="range"]'
      ) as HTMLInputElement;
      expect(rangeInput?.value).toBe('50');
    });
  });

  describe('timers and cleanup', () => {
    it('component renders and cleans up without crashing', async () => {
      const { unmount } = renderCaseStudy('homeOffices', true);

      await waitFor(() => {
        expect(screen.getByText('Home Office')).toBeInTheDocument();
      });

      // Unmount should clean up all pending timers
      unmount();
    });
  });
});
