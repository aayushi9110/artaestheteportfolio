import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BOOKING_CONTENT,
  BOOKING_FAQS,
  BOOKING_OPTION_STEPS,
  CONTACT_FIELD_ERRORS,
  CONTACT_FIELDS,
  SOURCE_OPTIONS,
  type BookingQuestion,
  type BookingFormValues
} from './bookingData.ts';
import './Book.css';

const INITIAL_FORM_STATE: BookingFormValues = {
  budget: '',
  name: '',
  email: '',
  phone: '',
  location: '',
  details: '',
  source: ''
};

type BookingSubmissionPayload = {
  projectTypes: string[];
  spaces: string[];
  aesthetics: string[];
  budget: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  details: string;
  source: string;
  submittedAt: string;
  pagePath: string;
  pageUrl: string;
  timezone: string;
  userAgent: string;
};

type BookingApiResponse = {
  message?: string;
  error?: string;
};

const Book = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTradeEnd, setShowTradeEnd] = useState(false);
  const [isFormInteracting, setIsFormInteracting] = useState(false);
  const [questionSelections, setQuestionSelections] = useState<Record<number, number[]>>({});
  const [questionComments, setQuestionComments] = useState<Record<number, string>>({});
  const [categoryComments, setCategoryComments] = useState<Record<number, string>>({});
  const [contactTouched, setContactTouched] = useState<Record<'name' | 'email' | 'phone' | 'location', boolean>>({
    name: false,
    email: false,
    phone: false,
    location: false
  });

  const [form, setForm] = useState<BookingFormValues>(INITIAL_FORM_STATE);

  const toggleQuestionOption = (questionId: number, optionIndex: number, selectionMode: 'single' | 'multiple' = 'single') => {
    setQuestionSelections((prev) => {
      const currentSelections = prev[questionId] || [];
      const isAlreadySelected = currentSelections.includes(optionIndex);

      // Special logic: If first question and last option (trade)
      if (questionId === 1 && optionIndex === 6 && !isAlreadySelected) {
        setShowTradeEnd(true);
        return {
          ...prev,
          [questionId]: [optionIndex]
        };
      }

      if (selectionMode === 'single') {
        return {
          ...prev,
          [questionId]: isAlreadySelected ? [] : [optionIndex]
        };
      }

      return {
        ...prev,
        [questionId]: isAlreadySelected
          ? currentSelections.filter((item) => item !== optionIndex)
          : [...currentSelections, optionIndex]
      };
    });
  };

  const setQuestionComment = (questionId: number, value: string) => {
    setQuestionComments((prev) => ({ ...prev, [questionId]: value }));
  };

  const setCategoryComment = (stepId: number, value: string) => {
    setCategoryComments((prev) => ({ ...prev, [stepId]: value }));
  };

  const setFormField = <K extends keyof BookingFormValues>(field: K, value: BookingFormValues[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const getQuestionSelectionTitles = (question: BookingQuestion) => {
    return (questionSelections[question.id] || [])
      .map((optionIndex) => question.options[optionIndex]?.title)
      .filter((title): title is string => Boolean(title));
  };

  const isQuestionAnswered = (question: BookingQuestion) => getQuestionSelectionTitles(question).length > 0;

  const isStepComplete = (stepIndex: number) => {
    const stepConfig = BOOKING_OPTION_STEPS[stepIndex];
    if (!stepConfig) {
      return false;
    }

    return stepConfig.questions.every((question) => isQuestionAnswered(question));
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const isPhoneValid = /^[+]?[(]?[0-9\s().-]{7,}$/.test(form.phone.trim());
  const isContactStepComplete = form.name.trim().length > 1 && isEmailValid && isPhoneValid && form.location.trim().length > 1;
  const bookingApiUrl = import.meta.env.VITE_BOOKING_API_URL?.trim() || '';
  const bookingApiKey = import.meta.env.VITE_BOOKING_API_KEY?.trim() || '';
  const requestTimeoutMs = Number(import.meta.env.VITE_BOOKING_REQUEST_TIMEOUT_MS || '15000');
  const optionStepCount = BOOKING_OPTION_STEPS.length;
  const totalSteps = optionStepCount + 1;
  const isOnContactStep = step === optionStepCount;
  const hasQuestionnaireResponses =
    Object.keys(questionSelections).length > 0 ||
    Object.values(questionComments).some((value) => value.trim().length > 0) ||
    Object.values(categoryComments).some((value) => value.trim().length > 0) ||
    step > 0;
  const isQuestionnaireActive = isFormInteracting || hasQuestionnaireResponses || isOnContactStep;

  const getQuestionById = (questionId: number) => {
    for (const section of BOOKING_OPTION_STEPS) {
      const found = section.questions.find((question) => question.id === questionId);
      if (found) {
        return found;
      }
    }
    return null;
  };

  const getQuestionSelectionsById = (questionId: number) => {
    const question = getQuestionById(questionId);
    if (!question) {
      return [];
    }

    return getQuestionSelectionTitles(question);
  };

  const buildQuestionnaireSummary = () => {
    return BOOKING_OPTION_STEPS.map((section) => {
      const questionBlocks = section.questions.map((question) => {
        const selections = getQuestionSelectionTitles(question);
        const comment = (questionComments[question.id] || '').trim();

        const lines = [
          `Q${question.id}. ${question.prompt}`,
          `Selected: ${selections.length > 0 ? selections.join(', ') : 'Not answered'}`
        ];

        if (question.allowComment && comment) {
          lines.push(`Comment: ${comment}`);
        }

        return lines.join('\n');
      });

      const categoryComment = (categoryComments[section.id] || '').trim();
      if (categoryComment) {
        questionBlocks.push(`Category Comment: ${categoryComment}`);
      }

      return [`${section.category}`, ...questionBlocks].join('\n\n');
    }).join('\n\n--------------------\n\n');
  };

  const buildBookingPayload = (): BookingSubmissionPayload => ({
    projectTypes: getQuestionSelectionsById(1),
    spaces: getQuestionSelectionsById(3),
    aesthetics: getQuestionSelectionsById(5),
    budget: getQuestionSelectionsById(17).join(', '),
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    location: form.location.trim(),
    details: [buildQuestionnaireSummary(), form.details.trim()].filter(Boolean).join('\n\nAdditional Contact Notes:\n'),
    source: form.source,
    submittedAt: new Date().toISOString(),
    pagePath: window.location.pathname,
    pageUrl: window.location.href,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    userAgent: navigator.userAgent
  });

  const submitBookingForm = async () => {
    if (!bookingApiUrl) {
      throw new Error('Booking endpoint is not configured. Please set VITE_BOOKING_API_URL.');
    }

    const payload = buildBookingPayload();
    const timeout = Number.isFinite(requestTimeoutMs) && requestTimeoutMs > 0 ? requestTimeoutMs : 15000;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeout);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (bookingApiKey) {
      headers['x-api-key'] = bookingApiKey;
    }

    let response: Response;

    try {
      response = await fetch(bookingApiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('The request timed out. Please try again.');
      }
      throw error;
    } finally {
      window.clearTimeout(timeoutId);
    }

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = (await response.json()) as BookingApiResponse;
        errorMessage = errorData?.message || errorData?.error || errorMessage;
      } catch {
        const responseText = await response.text();
        if (responseText) {
          errorMessage = responseText;
        }
      }
      throw new Error(errorMessage);
    }
  };

  const markContactFieldTouched = (field: 'name' | 'email' | 'phone' | 'location') => {
    setContactTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getContactFieldError = (field: 'name' | 'email' | 'phone' | 'location') => {
    if (!contactTouched[field]) {
      return '';
    }

    if (field === 'name' && form.name.trim().length <= 1) {
      return CONTACT_FIELD_ERRORS.name;
    }

    if (field === 'email' && !isEmailValid) {
      return CONTACT_FIELD_ERRORS.email;
    }

    if (field === 'phone' && !isPhoneValid) {
      return CONTACT_FIELD_ERRORS.phone;
    }

    if (field === 'location' && form.location.trim().length <= 1) {
      return CONTACT_FIELD_ERRORS.location;
    }

    return '';
  };

  return (
    <div id="pg-book" className="pg on">
      <div className={`book-page ${isQuestionnaireActive ? 'questionnaire-active' : ''}`}>
        <div className="book-l">
          <div className="book-l-c">
            <span className="sec-label gold">{BOOKING_CONTENT.sectionLabel}</span>
            <h2>{BOOKING_CONTENT.introHeadingLead} <em>{BOOKING_CONTENT.introHeadingEmphasis}</em></h2>
            <p>{BOOKING_CONTENT.introBody}</p>
            <div className="book-faq">
              {BOOKING_FAQS.map((faq) => (
                <div className="bfaq-item" key={faq.question}>
                  <h5>{faq.question}</h5>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="book-r">
          {!submitted && !showTradeEnd && (
            <div className="bk-form-wrap">
              <form
                onFocusCapture={() => setIsFormInteracting(true)}
                onPointerDownCapture={() => setIsFormInteracting(true)}
                onBlurCapture={(event) => {
                  const nextFocusedElement = event.relatedTarget;
                  if (nextFocusedElement instanceof Node && event.currentTarget.contains(nextFocusedElement)) {
                    return;
                  }

                  if (!hasQuestionnaireResponses && !isOnContactStep) {
                    setIsFormInteracting(false);
                  }
                }}
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!isContactStepComplete) {
                    setContactTouched({ name: true, email: true, phone: true, location: true });
                    return;
                  }

                  setSubmitError('');
                  setIsSubmitting(true);

                  try {
                    await submitBookingForm();
                    setSubmitted(true);
                  } catch (error) {
                    const message = error instanceof Error ? error.message : 'Unable to send your enquiry right now.';
                    setSubmitError(message);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                noValidate
              >
                <div className="bk-prog">
                  {Array.from({ length: totalSteps }, (_, i) => i).map((i) => (
                    <div className="bk-prog-item" key={`prog-${i}`}>
                      <div key={`dot-${i}`} className={`bk-step-dot ${i === step ? 'act' : ''} ${i < step ? 'done' : ''}`}>{i + 1}</div>
                      {i < totalSteps - 1 && <div key={`line-${i}`} className={`bk-step-line ${i < step ? 'done' : ''}`}></div>}
                    </div>
                  ))}
                </div>

                {BOOKING_OPTION_STEPS.map((stepConfig, stepIndex) => (
                  <div className={`bk-form-step ${step === stepIndex ? 'on' : ''}`} key={stepConfig.id}>
                    <div className="bk-q">
                      {stepConfig.category}
                      <span className="bk-required-mark">{BOOKING_CONTENT.requiredMarker}</span>
                    </div>
                    <div className="bk-sub">{stepConfig.subtext}</div>
                    {stepConfig.questions.map((question) => (
                      <div className="bk-question-group" key={question.id}>
                        <p className="bk-question-title">
                          {question.id}. {question.prompt}
                        </p>
                        <div className="bk-opts">
                          {question.options.map((option, optionIndex) => (
                            <button
                              key={option.title}
                              type="button"
                              className={`bk-opt ${(questionSelections[question.id] || []).includes(optionIndex) ? 'sel' : ''}`}
                              onClick={() => toggleQuestionOption(question.id, optionIndex, question.selectionMode || 'single')}
                              aria-pressed={(questionSelections[question.id] || []).includes(optionIndex)}
                            >
                              <span className="opt-icon">{String(optionIndex + 1).padStart(2, '0')}</span>
                              <h4>{option.title}</h4>
                              <p>{option.description}</p>
                            </button>
                          ))}
                        </div>
                        {question.allowComment && (
                          <div className="bk-field bk-inline-comment">
                            <label>Optional detail</label>
                            <input
                              type="text"
                              placeholder={question.commentPlaceholder || 'Add details'}
                              value={questionComments[question.id] || ''}
                              onChange={(e) => setQuestionComment(question.id, e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    {stepConfig.categoryCommentLabel && (
                      <div className="bk-field bk-category-comment">
                        <label>{stepConfig.categoryCommentLabel}</label>
                        <textarea
                          rows={4}
                          placeholder={stepConfig.categoryCommentPlaceholder || 'Add context'}
                          value={categoryComments[stepConfig.id] || ''}
                          onChange={(e) => setCategoryComment(stepConfig.id, e.target.value)}
                        ></textarea>
                      </div>
                    )}
                    <div className="bk-nav">
                      {stepIndex > 0 ? (
                        <button className="bk-back-btn" type="button" onClick={() => setStep(stepIndex - 1)}>
                          <svg width="12" height="8" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5H2M2 5L6 1M2 5l4 4"/></svg> {BOOKING_CONTENT.backLabel}
                        </button>
                      ) : (
                        <div></div>
                      )}
                      <button className="btn-tr" type="button" onClick={() => setStep(stepIndex + 1)} disabled={!isStepComplete(stepIndex)}>
                        <span>{BOOKING_CONTENT.continueLabel}</span>
                      </button>
                    </div>
                  </div>
                ))}

                <div className={`bk-form-step ${isOnContactStep ? 'on' : ''}`}>
                  <div className="bk-q">How do we reach you?<span className="bk-required-mark">{BOOKING_CONTENT.requiredMarker}</span></div>
                  <div className="bk-sub">We'll send a personal reply — not a template, not a bot.</div>
                  {CONTACT_FIELDS.map((field) => (
                    <div className="bk-field" key={field.key}>
                      <label>{field.label}{field.required && <span className="bk-required-mark">{BOOKING_CONTENT.requiredMarker}</span>}</label>
                      {field.multiline ? (
                        <textarea
                          rows={4}
                          placeholder={field.placeholder}
                          value={form[field.key]}
                          onChange={(e) => setFormField(field.key, e.target.value)}
                        ></textarea>
                      ) : (
                        <input
                          type={field.type || 'text'}
                          placeholder={field.placeholder}
                          value={form[field.key]}
                          className={
                            (field.key === 'name' || field.key === 'email' || field.key === 'phone' || field.key === 'location') && getContactFieldError(field.key)
                              ? 'bk-input-invalid'
                              : ''
                          }
                          aria-invalid={
                            field.key === 'name' || field.key === 'email' || field.key === 'phone' || field.key === 'location'
                              ? Boolean(getContactFieldError(field.key))
                              : false
                          }
                          required={field.required}
                          onChange={(e) => setFormField(field.key, e.target.value)}
                          onBlur={() => {
                            if (field.key === 'name' || field.key === 'email' || field.key === 'phone' || field.key === 'location') {
                              markContactFieldTouched(field.key);
                            }
                          }}
                        />
                      )}
                      {(field.key === 'name' || field.key === 'email' || field.key === 'phone' || field.key === 'location') && getContactFieldError(field.key) && (
                        <p className="bk-field-error">{getContactFieldError(field.key)}</p>
                      )}
                    </div>
                  ))}
                  <div className="bk-field">
                    <label>How did you find us?</label>
                    <select value={form.source} onChange={(e) => setFormField('source', e.target.value)}>
                      <option value="">Select one</option>
                      {SOURCE_OPTIONS.map((sourceOption) => (
                        <option key={sourceOption} value={sourceOption}>{sourceOption}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bk-nav"><button className="bk-back-btn" type="button" onClick={() => setStep(optionStepCount - 1)}><svg width="12" height="8" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5H2M2 5L6 1M2 5l4 4"/></svg> {BOOKING_CONTENT.backLabel}</button><button className="btn-tr" type="submit" disabled={isSubmitting}><span>{isSubmitting ? 'Sending...' : BOOKING_CONTENT.submitLabel}</span></button></div>
                  {!isContactStepComplete && (
                    <p className="bk-form-hint">{BOOKING_CONTENT.contactHint}</p>
                  )}
                  {submitError && (
                    <div className="bk-submit-overlay" role="alert" aria-live="assertive">
                      <div className="bk-submit-error-panel">
                        <div className="bk-submit-error-icon" aria-hidden="true">
                          <svg width="30" height="30" viewBox="0 0 24 24" role="presentation" focusable="false">
                            <path d="M12 2 22 20H2L12 2Zm0 6.2a1 1 0 0 0-1 1v4.9a1 1 0 1 0 2 0V9.2a1 1 0 0 0-1-1Zm0 10a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z" fill="currentColor"/>
                          </svg>
                        </div>
                        <p className="bk-submit-error">{submitError}</p>
                        <button className="bk-submit-error-dismiss" type="button" onClick={() => setSubmitError(null)}>
                          Dismiss
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}
          {showTradeEnd && (
            <div className="trade-end-screen">
              <h2>You're in the right place.</h2>
              <p>The Trade Program is for architects, designers, and realtors furnishing on behalf of a client. White-label, co-branded, or quietly behind-the-scenes — six-week turnaround, 10–15% referral commission.<br/>Let's skip the quiz and just talk.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                <a className="btn-tr" href="https://calendly.com/your-calendly-link" target="_blank" rel="noopener noreferrer">Book a 20-min intro call →</a>
                <a className="btn-tr" href="mailto:your@email.com">Email me directly →</a>
              </div>
            </div>
          )}
          {submitted && (
            <div className="bk-success" style={{ display: 'block' }}>
              <div className="check">✓</div>
              <h3>{BOOKING_CONTENT.successHeadingLead}<br/><em>{BOOKING_CONTENT.successHeadingEmphasis}</em></h3>
              <p>{BOOKING_CONTENT.successBody}</p>
              <button className="btn-dk" onClick={() => navigate('/portfolio')}><span>{BOOKING_CONTENT.successCtaLabel}</span></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;