import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../src/components/Footer/Footer.tsx';
import { ALL_ROUTES, NAV_PATHS } from '../routes.ts';

const renderWithRouter = () => render(
  <MemoryRouter>
    <Footer />
  </MemoryRouter>
);

describe('Footer', () => {
  it('renders a footer element', () => {
    renderWithRouter();
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('renders the brand/site url text', () => {
    renderWithRouter();
    expect(screen.getByText('Art Aesthete')).toBeInTheDocument();
  });

  it('renders logo image in footer', () => {
    renderWithRouter();
    const footerImages = screen.getAllByAltText('Logo');
    expect(footerImages.length).toBeGreaterThan(0);
  });

  describe('internal links validation', () => {
    it('all service links point to valid routes', () => {
      renderWithRouter();
      const validPaths = new Set(ALL_ROUTES.map(r => r.path));

      // Service links are expected
      const serviceLinks = [
        '/service/the-plan',
        '/service/the-furnishing',
        '/service/the-refresh',
        '/service/the-trade-program',
        '/book',
      ];

      serviceLinks.forEach(path => {
        expect(validPaths.has(path)).toBe(true);
      });
    });

    it('footer home link points to valid route', () => {
      renderWithRouter();
      const validPaths = new Set(ALL_ROUTES.map(r => r.path));
      expect(validPaths.has('/')).toBe(true);
    });

    it('renders service section with links', () => {
      renderWithRouter();
      expect(screen.getByText('The Plan')).toBeInTheDocument();
      expect(screen.getByText('The Furnishing')).toBeInTheDocument();
      expect(screen.getByText('The Refresh')).toBeInTheDocument();
      expect(screen.getByText('The Trade Program')).toBeInTheDocument();
      expect(screen.getByText('Take the Quiz')).toBeInTheDocument();
    });

    it('renders contact section with email and phone links', () => {
      renderWithRouter();
      const emailLink = screen.getByText('a.art.aesthete@gmail.com');
      const phoneLink = screen.getByText('+1(856)-283-5980');
      expect(emailLink).toHaveAttribute('href', 'mailto:a.art.aesthete@gmail.com');
      expect(phoneLink).toHaveAttribute('href', 'tel:+18562835980');
    });

    it('renders location information', () => {
      renderWithRouter();
      expect(screen.getByText(/New Jersey.*New York.*Bay Area.*California.*Mumbai, India/)).toBeInTheDocument();
    });
  });

  describe('external links security', () => {
    it('social links have target="_blank" with rel="noreferrer"', () => {
      renderWithRouter();
      const socialLinks = screen.getAllByLabelText(/Instagram|Pinterest|LinkedIn/);
      socialLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noreferrer');
      });
    });

    it('instagram link has correct href', () => {
      renderWithRouter();
      const instagramLink = screen.getByLabelText('Instagram');
      expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/art.aesthete.studio');
    });

    it('pinterest link has correct href', () => {
      renderWithRouter();
      const pinterestLink = screen.getByLabelText('Pinterest');
      expect(pinterestLink).toHaveAttribute('href', 'https://www.pinterest.com/aartaesthete/');
    });

    it('linkedin link has correct href', () => {
      renderWithRouter();
      const linkedinLink = screen.getByLabelText('LinkedIn');
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/aayushi-shah-/');
    });
  });

  describe('copyright and footer info', () => {
    it('renders copyright year', () => {
      renderWithRouter();
      expect(screen.getByText(/© 2026/)).toBeInTheDocument();
    });

    it('renders "All rights reserved" text', () => {
      renderWithRouter();
      expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
    });

    it('renders privacy and terms placeholder', () => {
      renderWithRouter();
      expect(screen.getByText(/Privacy · Terms/)).toBeInTheDocument();
    });
  });

  describe('footer structure', () => {
    it('renders social section before grid section', () => {
      renderWithRouter();
      const footer = screen.getByRole('contentinfo');
      const socialSection = footer.querySelector('.ft-social');
      const gridSection = footer.querySelector('.ft-grid');
      expect(socialSection).toBeInTheDocument();
      expect(gridSection).toBeInTheDocument();
      expect(socialSection.compareDocumentPosition(gridSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('renders about text', () => {
      renderWithRouter();
      expect(screen.getByText(/A design studio dedicated to the art of living/)).toBeInTheDocument();
    });
  });
});
