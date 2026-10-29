import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Book from '../../src/pages/Book/Book.tsx';
import { BOOKING_OPTION_STEPS, BOOKING_CONTENT } from '../../src/pages/Book/bookingData.ts';

const renderBook = (path = '/book') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Book />
    </MemoryRouter>
  );

const navigateToContactStep = async (user: ReturnType<typeof userEvent.setup>) => {
  // Navigate through all steps to reach contact form
  for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
    const step = BOOKING_OPTION_STEPS[i];
    const firstQuestion = step.questions[0];
    const optionButtons = screen.getAllByRole('button', {
      name: new RegExp(firstQuestion.options[0].title)
    });
    const optionButton = optionButtons.find((btn) => {
      const stepEl = btn.closest('.bk-form-step');
      return stepEl && stepEl.classList.contains('on');
    });
    if (optionButton) {
      await user.click(optionButton);
    }

    if (i < BOOKING_OPTION_STEPS.length - 1) {
      const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
      const activeStepButton = continueButtons.find((btn) => {
        const stepEl = btn.closest('.bk-form-step');
        return stepEl && stepEl.classList.contains('on');
      });
      if (activeStepButton) {
        await user.click(activeStepButton);
      }
    }
  }
};

describe('Book Validation - Required Fields', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('shows hint when required contact fields are empty', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    // Try to submit without filling fields
    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    expect(screen.getByText(BOOKING_CONTENT.contactHint)).toBeInTheDocument();
  });

  it('rejects empty name field', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    // Fill all fields except name
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    // Should still show hint because name is required
    expect(screen.getByText(BOOKING_CONTENT.contactHint)).toBeInTheDocument();
  });

  it('rejects empty email field', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    // Fill all fields except email
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    expect(screen.getByText(BOOKING_CONTENT.contactHint)).toBeInTheDocument();
  });

  it('rejects empty phone field', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    // Fill all fields except phone
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    expect(screen.getByText(BOOKING_CONTENT.contactHint)).toBeInTheDocument();
  });

  it('rejects empty location field', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    // Fill all fields except location
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    expect(screen.getByText(BOOKING_CONTENT.contactHint)).toBeInTheDocument();
  });
});

describe('Book Validation - Whitespace Handling', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('rejects whitespace-only name field', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    await user.type(screen.getByPlaceholderText('Jane Smith'), '   ');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    expect(screen.getByText(BOOKING_CONTENT.contactHint)).toBeInTheDocument();
  });

  it('rejects whitespace-only location field', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), '   ');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    expect(screen.getByText(BOOKING_CONTENT.contactHint)).toBeInTheDocument();
  });
});

describe('Book Validation - Email Validation', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  const invalidEmails = ['a', 'a@', 'a@b', 'a b@c.com', '@b.com', 'a@@b.com'];

  invalidEmails.forEach((invalidEmail) => {
    it(`rejects invalid email: ${invalidEmail}`, async () => {
      const user = userEvent.setup({ delay: null });
      renderBook();

      await navigateToContactStep(user);

      await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
      await user.type(screen.getByPlaceholderText('aayu@example.com'), invalidEmail);
      await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
      await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

      const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
      await user.click(submitButton);

      expect(screen.getByText(BOOKING_CONTENT.contactHint)).toBeInTheDocument();
    });
  });

  const validEmails = ['a@b.co', 'first.last+tag@sub.domain.com', 'test@example.com', 'user+tag@domain.co.uk'];

  validEmails.forEach((validEmail) => {
    it(`accepts valid email: ${validEmail}`, async () => {
      const user = userEvent.setup({ delay: null });
      const mockFetch = vi.fn(async () =>
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' }
        })
      );
      vi.stubGlobal('fetch', mockFetch);

      renderBook();

      await navigateToContactStep(user);

      await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
      await user.type(screen.getByPlaceholderText('aayu@example.com'), validEmail);
      await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
      await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

      const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });
    });
  });
});

describe('Book Validation - Phone Validation', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  const invalidPhones = ['abc', '12'];

  invalidPhones.forEach((invalidPhone) => {
    it(`rejects invalid phone: ${invalidPhone}`, async () => {
      const user = userEvent.setup({ delay: null });
      renderBook();

      await navigateToContactStep(user);

      await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
      await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
      await user.type(screen.getByPlaceholderText('+1 212 555 0182'), invalidPhone);
      await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

      const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
      await user.click(submitButton);

      expect(screen.getByText(BOOKING_CONTENT.contactHint)).toBeInTheDocument();
    });
  });

  const validPhones = ['+1 415 555 0123', '(415) 555-0123', '+1-415-555-0123', '4155550123', '415 555 0123', '+441234567890'];

  validPhones.forEach((validPhone) => {
    it(`accepts valid phone: ${validPhone}`, async () => {
      const user = userEvent.setup({ delay: null });
      const mockFetch = vi.fn(async () =>
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' }
        })
      );
      vi.stubGlobal('fetch', mockFetch);

      renderBook();

      await navigateToContactStep(user);

      await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
      await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
      await user.type(screen.getByPlaceholderText('+1 212 555 0182'), validPhone);
      await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

      const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });
    });
  });
});

describe('Book Validation - Long Input Handling', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
    const mockFetch = vi.fn(async () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('handles very long input in details field without crashing', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    const longText = 'a'.repeat(5000);

    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');
    // 5000 simulated keystrokes would dominate the suite runtime; a single change
    // event exercises the same code path the component actually reacts to.
    fireEvent.change(screen.getByPlaceholderText(/Any context you'd like to share/), {
      target: { value: longText },
    });

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(vi.mocked(global.fetch)).toHaveBeenCalled();
    });
  });
});

describe('Book Validation - Unicode and Emoji Support', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
    const mockFetch = vi.fn(async () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('accepts unicode and emoji in name field', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.mocked(global.fetch);
    renderBook();

    await navigateToContactStep(user);

    const unicodeName = 'José García 🎨';

    await user.type(screen.getByPlaceholderText('Jane Smith'), unicodeName);
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      const body = JSON.parse(options.body as string);
      expect(body.name).toBe(unicodeName);
    });
  });

  it('preserves emoji in submitted payload', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.mocked(global.fetch);
    renderBook();

    await navigateToContactStep(user);

    const emojiName = 'Designer 🏠 Studio';

    await user.type(screen.getByPlaceholderText('Jane Smith'), emojiName);
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      const body = JSON.parse(options.body as string);
      expect(body.name).toContain('🏠');
    });
  });
});

describe('Book Validation - Whitespace Trimming in Payload', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
    const mockFetch = vi.fn(async () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('trims leading and trailing whitespace from name in payload', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.mocked(global.fetch);
    renderBook();

    await navigateToContactStep(user);

    await user.type(screen.getByPlaceholderText('Jane Smith'), '  Jane Doe  ');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      const body = JSON.parse(options.body as string);
      expect(body.name).toBe('Jane Doe');
    });
  });

  it('trims leading and trailing whitespace from email in payload', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.mocked(global.fetch);
    renderBook();

    await navigateToContactStep(user);

    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), '  test@example.com  ');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      const body = JSON.parse(options.body as string);
      expect(body.email).toBe('test@example.com');
    });
  });

  it('trims leading and trailing whitespace from phone in payload', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.mocked(global.fetch);
    renderBook();

    await navigateToContactStep(user);

    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '  +1 415 555 0123  ');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      const body = JSON.parse(options.body as string);
      expect(body.phone).toBe('+1 415 555 0123');
    });
  });

  it('trims leading and trailing whitespace from location in payload', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.mocked(global.fetch);
    renderBook();

    await navigateToContactStep(user);

    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), '  San Francisco  ');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      const body = JSON.parse(options.body as string);
      expect(body.location).toBe('San Francisco');
    });
  });
});

describe('Book Validation - Error Messages Display', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('shows name error message after touching the field with invalid input', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    const nameInput = screen.getByPlaceholderText('Jane Smith');
    await user.type(nameInput, 'a');
    await user.click(screen.getByRole('button', { name: /Send My Enquiry/ }));

    expect(screen.getByText('Please enter your full name (at least 2 characters).')).toBeInTheDocument();
  });

  it('shows email error message after invalid email input', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    const emailInput = screen.getByPlaceholderText('aayu@example.com');
    await user.type(emailInput, 'invalid-email');
    await user.click(screen.getByRole('button', { name: /Send My Enquiry/ }));

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('shows phone error message after invalid phone input', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    const phoneInput = screen.getByPlaceholderText('+1 212 555 0182');
    await user.type(phoneInput, '123');
    await user.click(screen.getByRole('button', { name: /Send My Enquiry/ }));

    expect(screen.getByText('Please enter a valid phone number.')).toBeInTheDocument();
  });

  it('shows location error message after invalid location input', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    await navigateToContactStep(user);

    const locationInput = screen.getByPlaceholderText('New York, San Francisco, ...');
    await user.type(locationInput, 'A');
    await user.click(screen.getByRole('button', { name: /Send My Enquiry/ }));

    expect(screen.getByText('Please enter your city or location.')).toBeInTheDocument();
  });
});
