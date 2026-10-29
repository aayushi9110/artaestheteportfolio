import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Cursor from '../../src/components/Cursor/Cursor.tsx';

describe('Cursor', () => {
  let testButton: HTMLButtonElement;
  let testLink: HTMLAnchorElement;
  let testDataCursorElement: HTMLDivElement;

  beforeEach(() => {
    // Create test elements
    testButton = document.createElement('button');
    testButton.textContent = 'Test Button';
    document.body.appendChild(testButton);

    testLink = document.createElement('a');
    testLink.textContent = 'Test Link';
    testLink.href = '#';
    document.body.appendChild(testLink);

    testDataCursorElement = document.createElement('div');
    testDataCursorElement.textContent = 'Explore Element';
    testDataCursorElement.setAttribute('data-cursor', 'Explore');
    document.body.appendChild(testDataCursorElement);
  });

  afterEach(() => {
    document.body.removeChild(testButton);
    document.body.removeChild(testLink);
    document.body.removeChild(testDataCursorElement);
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<Cursor />);
    expect(container).toBeInTheDocument();
  });

  it('renders cursor circle element', () => {
    render(<Cursor />);
    const cursorElement = document.getElementById('cur');
    expect(cursorElement).toBeInTheDocument();
  });

  it('renders cursor ring element', () => {
    render(<Cursor />);
    const cursorRing = document.getElementById('cur-ring');
    expect(cursorRing).toBeInTheDocument();
  });

  describe('mouse position tracking', () => {
    it('updates cursor position on mousemove', () => {
      render(<Cursor />);
      const cursorElement = document.getElementById('cur');

      fireEvent.mouseMove(document, { clientX: 100, clientY: 200 });

      expect(cursorElement).toHaveStyle({ left: '100px', top: '200px' });
    });

    it('updates cursor ring position on mousemove', () => {
      render(<Cursor />);
      const cursorRing = document.getElementById('cur-ring');

      fireEvent.mouseMove(document, { clientX: 150, clientY: 250 });

      expect(cursorRing).toHaveStyle({ left: '150px', top: '250px' });
    });

    it('tracks multiple mouse movements', () => {
      render(<Cursor />);
      const cursorElement = document.getElementById('cur');

      fireEvent.mouseMove(document, { clientX: 10, clientY: 20 });
      expect(cursorElement).toHaveStyle({ left: '10px', top: '20px' });

      fireEvent.mouseMove(document, { clientX: 300, clientY: 400 });
      expect(cursorElement).toHaveStyle({ left: '300px', top: '400px' });
    });
  });

  describe('hover label based on data-cursor', () => {
    it('shows "View" label on plain button hover', () => {
      render(<Cursor />);
      fireEvent.mouseEnter(testButton, { bubbles: true, cancelable: true });
      const cursorText = document.getElementById('cur-txt');
      expect(cursorText).toBeInTheDocument();
      expect(cursorText).toHaveTextContent('View');
    });

    it('shows "View" label on plain link hover', () => {
      render(<Cursor />);
      fireEvent.mouseEnter(testLink, { bubbles: true, cancelable: true });
      const cursorText = document.getElementById('cur-txt');
      expect(cursorText).toBeInTheDocument();
      expect(cursorText).toHaveTextContent('View');
    });

    it('shows data-cursor attribute value on element hover', () => {
      render(<Cursor />);
      fireEvent.mouseEnter(testDataCursorElement, { bubbles: true, cancelable: true });
      const cursorText = document.getElementById('cur-txt');
      expect(cursorText).toBeInTheDocument();
      expect(cursorText).toHaveTextContent('Explore');
    });

    it('changes cursor size when hovering interactive elements', () => {
      render(<Cursor />);
      const cursorElement = document.getElementById('cur');

      // Initial state - small
      expect(cursorElement).toHaveStyle({ width: '10px', height: '10px' });

      fireEvent.mouseEnter(testButton, { bubbles: true, cancelable: true });

      // After hover - larger
      expect(cursorElement).toHaveStyle({ width: '20px', height: '20px' });
    });

    it('changes cursor color on hover', () => {
      render(<Cursor />);
      const cursorElement = document.getElementById('cur');

      fireEvent.mouseEnter(testButton, { bubbles: true, cancelable: true });

      const styles = window.getComputedStyle(cursorElement);
      expect(cursorElement).toHaveStyle({ background: 'var(--burnt)' });
    });

    it('changes cursor ring size on hover', () => {
      render(<Cursor />);
      const cursorRing = document.getElementById('cur-ring');

      // Initial state
      expect(cursorRing).toHaveStyle({ width: '34px', height: '34px' });

      fireEvent.mouseEnter(testButton, { bubbles: true, cancelable: true });

      // After hover - larger
      expect(cursorRing).toHaveStyle({ width: '60px', height: '60px' });
    });

    it('changes cursor border radius on hover', () => {
      render(<Cursor />);
      const cursorElement = document.getElementById('cur');

      // Initial - circular
      expect(cursorElement).toHaveStyle({ borderRadius: '50%' });

      fireEvent.mouseEnter(testButton, { bubbles: true, cancelable: true });

      // After hover - rounded square
      expect(cursorElement).toHaveStyle({ borderRadius: '4px' });
    });
  });

  describe('mouseleave behavior', () => {
    it('hides cursor text on mouseleave', () => {
      render(<Cursor />);

      fireEvent.mouseEnter(testButton, { bubbles: true, cancelable: true });
      let cursorText = document.getElementById('cur-txt');
      expect(cursorText).toBeInTheDocument();

      fireEvent.mouseLeave(testButton, { bubbles: true, cancelable: true });
      cursorText = document.getElementById('cur-txt');
      expect(cursorText).not.toBeInTheDocument();
    });

    it('resets cursor size on mouseleave', () => {
      render(<Cursor />);
      const cursorElement = document.getElementById('cur');

      fireEvent.mouseEnter(testButton, { bubbles: true, cancelable: true });
      expect(cursorElement).toHaveStyle({ width: '20px', height: '20px' });

      fireEvent.mouseLeave(testButton, { bubbles: true, cancelable: true });
      expect(cursorElement).toHaveStyle({ width: '10px', height: '10px' });
    });

    it('resets cursor ring size on mouseleave', () => {
      render(<Cursor />);
      const cursorRing = document.getElementById('cur-ring');

      fireEvent.mouseEnter(testButton, { bubbles: true, cancelable: true });
      expect(cursorRing).toHaveStyle({ width: '60px', height: '60px' });

      fireEvent.mouseLeave(testButton, { bubbles: true, cancelable: true });
      expect(cursorRing).toHaveStyle({ width: '34px', height: '34px' });
    });

    it('resets cursor color on mouseleave', () => {
      render(<Cursor />);
      const cursorElement = document.getElementById('cur');

      fireEvent.mouseEnter(testButton, { bubbles: true, cancelable: true });
      expect(cursorElement).toHaveStyle({ background: 'var(--burnt)' });

      fireEvent.mouseLeave(testButton, { bubbles: true, cancelable: true });
      expect(cursorElement).toHaveStyle({ background: 'var(--terra)' });
    });
  });

  describe('edge cases', () => {
    it('does not throw when mouseenter fires on document', () => {
      render(<Cursor />);
      expect(() => {
        fireEvent.mouseEnter(document, { bubbles: true, cancelable: true });
      }).not.toThrow();
    });

    it('does not throw when mouseenter fires on window', () => {
      render(<Cursor />);
      expect(() => {
        fireEvent.mouseEnter(window);
      }).not.toThrow();
    });

    it('handles nested interactive elements', () => {
      const nested = document.createElement('div');
      const nestedButton = document.createElement('button');
      nestedButton.textContent = 'Nested';
      nested.appendChild(nestedButton);
      document.body.appendChild(nested);

      render(<Cursor />);
      fireEvent.mouseEnter(nestedButton, { bubbles: true, cancelable: true });
      const cursorText = document.getElementById('cur-txt');
      expect(cursorText).toHaveTextContent('View');

      document.body.removeChild(nested);
    });
  });

  describe('event listener cleanup', () => {
    it('removes mousemove listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      const { unmount } = render(<Cursor />);
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it('removes mouseenter listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      const { unmount } = render(<Cursor />);
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseenter', expect.any(Function), true);
      removeEventListenerSpy.mockRestore();
    });

    it('removes mouseleave listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      const { unmount } = render(<Cursor />);
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function), true);
      removeEventListenerSpy.mockRestore();
    });
  });
});
