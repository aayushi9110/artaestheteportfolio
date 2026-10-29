import '@testing-library/jest-dom/vitest';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Test files run in parallel workers, so a worker can be starved while a lazy
// route chunk compiles. RTL's 1s default then fails a test that is merely slow.
// This is the single knob that keeps the suite deterministic under load.
configure({ asyncUtilTimeout: 8000 });

// jsdom ships no IntersectionObserver; every page uses one for scroll reveals.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// jsdom has no layout engine; components read these during scroll/resize handlers.
window.scrollTo = vi.fn() as typeof window.scrollTo;
Element.prototype.scrollIntoView = vi.fn();

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as typeof window.matchMedia;
}

afterEach(() => {
  cleanup();
});
