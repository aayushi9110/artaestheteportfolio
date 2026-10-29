import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Book from '../../src/pages/Book/Book.tsx';
import {
  BOOKING_CONTENT,
  BOOKING_FAQS,
  BOOKING_OPTION_STEPS,
  CONTACT_FIELDS,
  CONTACT_FIELD_ERRORS
} from '../../src/pages/Book/bookingData.ts';

const renderBook = (path = '/book') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Book />
    </MemoryRouter>
  );

const answerAllQuestionsInStep = async (user: ReturnType<typeof userEvent.setup>, step: typeof BOOKING_OPTION_STEPS[0]) => {
  // Get the active step element
  const activeStep = document.querySelector('.bk-form-step.on');
  if (!activeStep) return;

  // Find all question groups in the active step
  const questionGroups = activeStep.querySelectorAll('.bk-question-group');

  for (const group of questionGroups) {
    // Find the first option button in this question group that is not selected
    const optionButton = group.querySelector('button[aria-pressed="false"]') as HTMLButtonElement;
    if (optionButton) {
      await user.click(optionButton);
    }
  }
};

describe('Book - Rendering & Navigation', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('renders the intro heading with emphasis', () => {
    renderBook();
    expect(screen.getByText(BOOKING_CONTENT.introHeadingLead)).toBeInTheDocument();
    expect(screen.getByText(BOOKING_CONTENT.introHeadingEmphasis)).toBeInTheDocument();
  });

  it('renders the intro body', () => {
    renderBook();
    expect(screen.getByText(BOOKING_CONTENT.introBody)).toBeInTheDocument();
  });

  it('renders all FAQ questions from BOOKING_FAQS', () => {
    renderBook();
    BOOKING_FAQS.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
      expect(screen.getByText(faq.answer)).toBeInTheDocument();
    });
  });

  it('renders the first questionnaire step by default', () => {
    renderBook();
    const firstStep = BOOKING_OPTION_STEPS[0];
    expect(screen.getByText(firstStep.category)).toBeInTheDocument();
    expect(screen.getByText(firstStep.subtext)).toBeInTheDocument();
  });

  it('shows the section label', () => {
    renderBook();
    expect(screen.getByText(BOOKING_CONTENT.sectionLabel)).toBeInTheDocument();
  });
});

describe('Book - Trade Variant', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('shows trade end screen when audience=trade is in query string', async () => {
    renderBook('/book?audience=trade');
    await waitFor(() => {
      expect(screen.getByText("You're in the right place.")).toBeInTheDocument();
    });
  });

  it('does not show the questionnaire form on trade variant', async () => {
    renderBook('/book?audience=trade');
    await waitFor(() => {
      const firstStep = BOOKING_OPTION_STEPS[0];
      expect(screen.queryByText(firstStep.category)).not.toBeInTheDocument();
    });
  });

  it('shows book a call and email links on trade variant', async () => {
    renderBook('/book?audience=trade');
    await waitFor(() => {
      expect(screen.getByText(/Book a 20-min intro call/)).toBeInTheDocument();
      expect(screen.getByText(/Email me directly/)).toBeInTheDocument();
    });
  });
});

describe('Book - Questionnaire Navigation', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('disables Continue button when step is incomplete', () => {
    renderBook();
    const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
    const activeStepButton = continueButtons.find((btn) => {
      const step = btn.closest('.bk-form-step');
      return step && step.classList.contains('on');
    });
    expect(activeStepButton).toBeDisabled();
  });

  it('enables Continue button after selecting an option on a single-select question', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    const firstStep = BOOKING_OPTION_STEPS[0];
    await answerAllQuestionsInStep(user, firstStep);

    const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
    const activeStepButton = continueButtons.find((btn) => {
      const step = btn.closest('.bk-form-step');
      return step && step.classList.contains('on');
    });
    expect(activeStepButton).not.toBeDisabled();
  });

  it('advances to the next step when Continue is clicked after selection', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    const firstStep = BOOKING_OPTION_STEPS[0];
    await answerAllQuestionsInStep(user, firstStep);

    const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
    const activeStepButton = continueButtons.find((btn) => {
      const step = btn.closest('.bk-form-step');
      return step && step.classList.contains('on');
    });
    await user.click(activeStepButton!);

    await waitFor(() => {
      const secondStep = BOOKING_OPTION_STEPS[1];
      expect(screen.getByText(secondStep.category)).toBeInTheDocument();
    });
  });

  it('goes back to previous step when Back button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

    const firstStep = BOOKING_OPTION_STEPS[0];
    await answerAllQuestionsInStep(user, firstStep);

    const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
    const activeStepButton = continueButtons.find((btn) => {
      const step = btn.closest('.bk-form-step');
      return step && step.classList.contains('on');
    });
    await user.click(activeStepButton!);

    await waitFor(() => {
      const secondStep = BOOKING_OPTION_STEPS[1];
      expect(screen.getByText(secondStep.category)).toBeInTheDocument();
    });

    const backButtons = screen.getAllByRole('button', { name: /Back/ });
    const activeBackButton = backButtons.find((btn) => {
      const step = btn.closest('.bk-form-step');
      return step && step.classList.contains('on');
    });
    await user.click(activeBackButton!);

    await waitFor(() => {
      expect(screen.getByText(firstStep.category)).toBeInTheDocument();
    });
  });
});

describe('Book - Form Submission (Happy Path)', { timeout: 30000 }, () => {
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

  it('submits form with contact fields and shows success screen', async () => {
    const user = userEvent.setup({ delay: null });
    renderBook();

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

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(BOOKING_CONTENT.successHeadingLead)).toBeInTheDocument();
      expect(screen.getByText(BOOKING_CONTENT.successHeadingEmphasis)).toBeInTheDocument();
    });
  });

  it('calls fetch exactly once with correct URL and POST method', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.mocked(global.fetch);
    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/booking',
        expect.objectContaining({
          method: 'POST'
        })
      );
    });
  });

  it('includes content-type application/json header', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.mocked(global.fetch);
    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      expect(options.headers).toEqual(
        expect.objectContaining({
          'Content-Type': 'application/json'
        })
      );
    });
  });

  it('includes name and email in JSON body', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.mocked(global.fetch);
    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    const testName = 'Jane Doe';
    const testEmail = 'jane@example.com';

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), testName);
    await user.type(screen.getByPlaceholderText('aayu@example.com'), testEmail);
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      const body = JSON.parse(options.body as string);
      expect(body.name).toBe(testName);
      expect(body.email).toBe(testEmail);
    });
  });
});

describe('Book - API Configuration', { timeout: 30000 }, () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('shows error when VITE_BOOKING_API_URL is not configured', async () => {
    const user = userEvent.setup({ delay: null });
    vi.stubEnv('VITE_BOOKING_API_URL', '');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Booking endpoint is not configured. Please set VITE_BOOKING_API_URL.')).toBeInTheDocument();
    });
  });

  it('does not call fetch when VITE_BOOKING_API_URL is not configured', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);
    vi.stubEnv('VITE_BOOKING_API_URL', '');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });
});

describe('Book - API Key Header', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('includes x-api-key header when VITE_BOOKING_API_KEY is set', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.fn(async () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', mockFetch);
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', 'test-api-key');

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      expect(options.headers).toEqual(
        expect.objectContaining({
          'x-api-key': 'test-api-key'
        })
      );
    });
  });

  it('does not include x-api-key header when VITE_BOOKING_API_KEY is empty', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.fn(async () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', mockFetch);
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      const headers = options.headers as Record<string, string>;
      expect(headers['x-api-key']).toBeUndefined();
    });
  });
});

describe('Book - Server Error Handling', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('shows error message when server returns 500', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.fn(async () =>
      new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'content-type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Internal server error')).toBeInTheDocument();
    });
  });

  it('does not show success screen when server error occurs', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.fn(async () =>
      new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500,
        headers: { 'content-type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(BOOKING_CONTENT.successHeadingLead)).not.toBeInTheDocument();
    });
  });

  it('preserves form data after server error', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.fn(async () =>
      new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500,
        headers: { 'content-type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    const testName = 'Jane Doe';
    const testEmail = 'jane@example.com';
    await user.type(screen.getByPlaceholderText('Jane Smith'), testName);
    await user.type(screen.getByPlaceholderText('aayu@example.com'), testEmail);
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });

    // Verify form data is still there
    const nameInput = screen.getByDisplayValue(testName);
    const emailInput = screen.getByDisplayValue(testEmail);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
});

describe('Book - Network Failure Handling', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('shows error message when fetch rejects with network error', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.fn(async () => {
      throw new Error('Network error');
    });
    vi.stubGlobal('fetch', mockFetch);

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });
});

describe('Book - Timeout and Abort Handling', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('shows timeout error when fetch is aborted', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.fn(async () => {
      throw new DOMException('The operation was aborted.', 'AbortError');
    });
    vi.stubGlobal('fetch', mockFetch);

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('The request timed out. Please try again.')).toBeInTheDocument();
    });
  });

  it('passes AbortSignal to fetch', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.fn(async () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      const call = mockFetch.mock.calls[0];
      const options = call[1] as RequestInit;
      expect(options.signal).toBeInstanceOf(AbortSignal);
    });
  });
});

describe('Book - Double Submit Protection', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.stubEnv('VITE_BOOKING_API_URL', 'https://api.example.com/booking');
    vi.stubEnv('VITE_BOOKING_API_KEY', '');
    vi.stubEnv('VITE_BOOKING_REQUEST_TIMEOUT_MS', '15000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup({ delay: null });
    let resolveResponse: () => void;
    const responsePromise = new Promise<void>((resolve) => {
      resolveResponse = resolve;
    });

    const mockFetch = vi.fn(async () => {
      await responsePromise;
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    });
    vi.stubGlobal('fetch', mockFetch);

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Verify button text changes to "Sending..."
    expect(screen.getByText('Sending...')).toBeInTheDocument();

    resolveResponse!();

    await waitFor(() => {
      expect(screen.getByText(BOOKING_CONTENT.successHeadingLead)).toBeInTheDocument();
    });
  });

  it('only calls fetch once even if submit button is clicked rapidly', async () => {
    const user = userEvent.setup({ delay: null });
    const mockFetch = vi.fn(async () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    renderBook();

    // Navigate through all steps
    for (let i = 0; i < BOOKING_OPTION_STEPS.length; i++) {
      const step = BOOKING_OPTION_STEPS[i];
      const firstQuestion = step.questions[0];
      const optionButton = screen.getAllByRole('button', {
        name: new RegExp(firstQuestion.options[0].title)
      })[0];
      await user.click(optionButton);

      if (i < BOOKING_OPTION_STEPS.length - 1) {
        const continueButtons = screen.getAllByRole('button', { name: /Continue/ });
        const activeStepButton = continueButtons[continueButtons.length - 1];
        await user.click(activeStepButton);
      }
    }

    // Fill contact fields
    await user.type(screen.getByPlaceholderText('Jane Smith'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('aayu@example.com'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('+1 212 555 0182'), '+1 415 555 0123');
    await user.type(screen.getByPlaceholderText('New York, San Francisco, ...'), 'San Francisco');

    const submitButton = screen.getByRole('button', { name: /Send My Enquiry/ });
    // Click rapidly multiple times
    await user.click(submitButton);
    await user.click(submitButton);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });
});
