import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '../../src/components/Loader/Loader.tsx';

describe('Loader', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    const { container } = render(<Loader />);
    expect(container).toBeInTheDocument();
  });

  it('renders loader container with correct id', () => {
    render(<Loader />);
    const loader = document.getElementById('loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders logo text', () => {
    render(<Loader />);
    expect(screen.getByText('Art Aesthete')).toBeInTheDocument();
  });

  it('renders subtitle text', () => {
    render(<Loader />);
    expect(screen.getByText('Interior Design · Fine Art')).toBeInTheDocument();
  });

  it('renders progress bar', () => {
    render(<Loader />);
    const progressBar = document.querySelector('.ld-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders fill element inside progress bar', () => {
    render(<Loader />);
    const fill = document.querySelector('.ld-fill');
    expect(fill).toBeInTheDocument();
  });

  it('adds gone class after 2 seconds', () => {
    render(<Loader />);
    const loader = document.getElementById('loader');
    expect(loader).not.toHaveClass('gone');

    vi.advanceTimersByTime(2000);

    expect(loader).toHaveClass('gone');
  });

  it('does not add gone class before timeout', () => {
    render(<Loader />);
    const loader = document.getElementById('loader');
    expect(loader).not.toHaveClass('gone');

    vi.advanceTimersByTime(1000);

    expect(loader).not.toHaveClass('gone');
  });

  it('cleans up timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = render(<Loader />);
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('renders all required class names', () => {
    render(<Loader />);
    const logoDiv = document.querySelector('.ld-logo');
    const subDiv = document.querySelector('.ld-sub');
    const barDiv = document.querySelector('.ld-bar');
    const fillDiv = document.querySelector('.ld-fill');

    expect(logoDiv).toBeInTheDocument();
    expect(subDiv).toBeInTheDocument();
    expect(barDiv).toBeInTheDocument();
    expect(fillDiv).toBeInTheDocument();
  });
});
