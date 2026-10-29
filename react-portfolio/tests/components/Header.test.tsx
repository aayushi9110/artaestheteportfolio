import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../src/components/Header/Header.tsx';
import { NAV_PATHS } from '../routes.ts';

const renderAt = (path: string) => render(
  <MemoryRouter initialEntries={[path]}>
    <Header />
  </MemoryRouter>
);

describe('Header', () => {
  beforeEach(() => {
    window.scrollY = 0;
    window.innerWidth = 1200;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders a logo image with alt text', () => {
    renderAt('/');
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders primary nav links', () => {
    renderAt('/');
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('How We Work')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  describe('trailing-slash normalization', () => {
    it('treats /about/ identically to /about', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/about']}>
          <Header />
        </MemoryRouter>
      );
      const aboutLinkNoSlash = screen.getByText('About').closest('a');
      expect(aboutLinkNoSlash).toHaveClass('active');

      rerender(
        <MemoryRouter initialEntries={['/about/']}>
          <Header />
        </MemoryRouter>
      );
      const aboutLinkWithSlash = screen.getByText('About').closest('a');
      expect(aboutLinkWithSlash).toHaveClass('active');
    });

    it('normalizes // to /', () => {
      renderAt('//');
      const logo = screen.getByAltText('Logo').closest('a');
      expect(logo).toHaveClass('active');
    });
  });

  describe('active nav state', () => {
    it('marks Home active on /', () => {
      renderAt('/');
      const logo = screen.getByAltText('Logo').closest('a');
      expect(logo).toHaveClass('active');
    });

    it('marks Portfolio active on /portfolio', () => {
      renderAt('/portfolio');
      const portfolioLink = screen.getByText('Portfolio').closest('a');
      expect(portfolioLink).toHaveClass('active');
    });

    it('keeps Portfolio active on /interior-story/homeOffices', () => {
      renderAt('/interior-story/homeOffices');
      const portfolioLink = screen.getByText('Portfolio').closest('a');
      expect(portfolioLink).toHaveClass('active');
    });

    it('keeps Portfolio active on /fine-art-story/x', () => {
      renderAt('/fine-art-story/someProject');
      const portfolioLink = screen.getByText('Portfolio').closest('a');
      expect(portfolioLink).toHaveClass('active');
    });

    it('keeps Portfolio active on /case-study/x', () => {
      renderAt('/case-study/someProject');
      const portfolioLink = screen.getByText('Portfolio').closest('a');
      expect(portfolioLink).toHaveClass('active');
    });

    it('keeps Portfolio active on /project/x', () => {
      renderAt('/project/someProject');
      const portfolioLink = screen.getByText('Portfolio').closest('a');
      expect(portfolioLink).toHaveClass('active');
    });

    it('marks How We Work active on /process', () => {
      renderAt('/process');
      const processLink = screen.getByText('How We Work').closest('a');
      expect(processLink).toHaveClass('active');
    });

    it('marks About active on /about', () => {
      renderAt('/about');
      const aboutLink = screen.getByText('About').closest('a');
      expect(aboutLink).toHaveClass('active');
    });

    it('marks Trade Program active on /book with trade audience', () => {
      renderAt('/book?audience=trade');
      const tradeButton = screen.getByLabelText('Trade Program');
      expect(tradeButton).toHaveClass('active');
    });
  });

  describe('logo source switching', () => {
    it('uses dark logo on home page (/)', () => {
      renderAt('/');
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('src', '/images/logos/artAesthete.png?v=2');
    });

    it('uses light logo on sub-page not /process when not stuck', () => {
      renderAt('/about');
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('src', '/images/logos/artAesthetewh.png?v=2');
    });

    it('uses dark logo on /process even though it is a sub-page', () => {
      renderAt('/process');
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('src', '/images/logos/artAesthete.png?v=2');
    });

    it('uses dark logo on sub-page when stuck due to scroll', () => {
      renderAt('/about');
      window.scrollY = 100;
      act(() => {
        fireEvent.scroll(window);
      });
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('src', '/images/logos/artAesthete.png?v=2');
    });

    it('uses dark logo on /book even though it is not home', () => {
      renderAt('/book');
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('src', '/images/logos/artAesthete.png?v=2');
    });
  });

  describe('forced-stuck behavior', () => {
    it('forces stuck state on home page (/)', () => {
      renderAt('/');
      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('stuck');
    });

    it('forces stuck state on /book', () => {
      renderAt('/book');
      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('stuck');
    });

    it('does not force stuck on other sub-pages without scroll', () => {
      renderAt('/about');
      const nav = document.querySelector('nav');
      expect(nav).not.toHaveClass('stuck');
    });

    it('sets stuck state on scroll > 50px on non-forced pages', () => {
      renderAt('/about');
      let nav = document.querySelector('nav');
      expect(nav).not.toHaveClass('stuck');

      window.scrollY = 100;
      act(() => {
        fireEvent.scroll(window);
      });

      nav = document.querySelector('nav');
      expect(nav).toHaveClass('stuck');
    });

    it('clears stuck state when scroll < 50px', () => {
      renderAt('/about');
      window.scrollY = 100;
      act(() => {
        fireEvent.scroll(window);
      });

      let nav = document.querySelector('nav');
      expect(nav).toHaveClass('stuck');

      window.scrollY = 30;
      act(() => {
        fireEvent.scroll(window);
      });

      nav = document.querySelector('nav');
      expect(nav).not.toHaveClass('stuck');
    });
  });

  describe('narrow viewport behavior', () => {
    it('forces stuck state when viewport <= 1100px', () => {
      window.innerWidth = 1100;
      renderAt('/about');
      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('stuck');
    });

    it('forces stuck state when viewport < 1100px', () => {
      window.innerWidth = 1099;
      renderAt('/about');
      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('stuck');
    });

    it('updates stuck state on window resize', () => {
      window.innerWidth = 1200;
      renderAt('/about');
      let nav = document.querySelector('nav');
      expect(nav).not.toHaveClass('stuck');

      window.innerWidth = 1000;
      act(() => {
        fireEvent.resize(window);
      });

      nav = document.querySelector('nav');
      expect(nav).toHaveClass('stuck');
    });
  });

  describe('mobile menu', () => {
    beforeEach(() => {
      window.innerWidth = 1000; // narrow viewport to show mobile menu
    });

    it('renders hamburger button at narrow viewport', () => {
      renderAt('/');
      const hamButton = screen.getByLabelText('menu');
      expect(hamButton).toBeInTheDocument();
    });

    it('opens mobile menu when hamburger is clicked', async () => {
      renderAt('/');
      const hamButton = screen.getByLabelText('menu');
      fireEvent.click(hamButton);
      const mobNav = document.getElementById('mob-nav');
      expect(mobNav).toBeInTheDocument();
    });

    it('closes mobile menu when hamburger is clicked again', async () => {
      renderAt('/');
      const hamButton = screen.getByLabelText('menu');
      fireEvent.click(hamButton);
      let mobNav = document.getElementById('mob-nav');
      expect(mobNav).toBeInTheDocument();

      fireEvent.click(hamButton);
      mobNav = document.getElementById('mob-nav');
      expect(mobNav).not.toBeInTheDocument();
    });

    it('closes mobile menu when a link is clicked', async () => {
      renderAt('/portfolio');
      const hamButton = screen.getByLabelText('menu');
      fireEvent.click(hamButton);
      let mobNav = document.getElementById('mob-nav');
      expect(mobNav).toBeInTheDocument();

      const mobileNav = document.getElementById('mob-nav');
      const portfolioLinkInMobileNav = mobileNav?.querySelector('a[href="/portfolio"]') as HTMLAnchorElement;
      if (portfolioLinkInMobileNav) {
        fireEvent.click(portfolioLinkInMobileNav);
        mobNav = document.getElementById('mob-nav');
        expect(mobNav).not.toBeInTheDocument();
      }
    });

    it('renders all nav links in mobile menu', () => {
      renderAt('/');
      const hamButton = screen.getByLabelText('menu');
      fireEvent.click(hamButton);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getAllByText('Portfolio').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('How We Work').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('trade tooltip', () => {
    it('renders trade program button on /book', () => {
      renderAt('/book');
      const tradeButton = screen.getByLabelText('Trade Program');
      expect(tradeButton).toBeInTheDocument();
    });

    it('renders tooltip text on /book', () => {
      renderAt('/book');
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveTextContent(
        'For designers, architects, and realtors furnishing on behalf of a client.'
      );
    });

    it('does not render trade button on non-book pages', () => {
      renderAt('/about');
      const tradeButton = screen.queryByLabelText('Trade Program');
      expect(tradeButton).not.toBeInTheDocument();
    });
  });

  describe('event listener cleanup', () => {
    it('removes scroll listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderAt('/about');
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it('removes resize listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderAt('/about');
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it('does not attach listeners on forced-stuck pages', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      renderAt('/');
      // On home page, should not attach scroll/resize since shouldForceStuck is true
      const scrollCalls = addEventListenerSpy.mock.calls.filter(call => call[0] === 'scroll');
      const resizeCalls = addEventListenerSpy.mock.calls.filter(call => call[0] === 'resize');
      expect(scrollCalls.length).toBe(0);
      expect(resizeCalls.length).toBe(0);
      addEventListenerSpy.mockRestore();
    });
  });

  describe('nav classes', () => {
    it('adds subpage class on sub-pages', () => {
      renderAt('/about');
      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('subpage');
    });

    it('does not add subpage class on home page', () => {
      renderAt('/');
      const nav = document.querySelector('nav');
      expect(nav).not.toHaveClass('subpage');
    });

    it('adds process-page class on /process', () => {
      renderAt('/process');
      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('process-page');
    });

    it('adds service-page class on /service/* paths', () => {
      renderAt('/service/the-plan');
      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('service-page');
    });
  });
});
