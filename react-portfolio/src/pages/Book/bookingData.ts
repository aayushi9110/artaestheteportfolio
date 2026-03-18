export type BookingFormValues = {
  budget: string;
  name: string;
  email: string;
  location: string;
  details: string;
  source: string;
};

export type BookingOption = {
  title: string;
  description: string;
};

export type BookingOptionStep = {
  id: number;
  question: string;
  subtext: string;
  options: BookingOption[];
  isRequired?: boolean;
  showBudgetSelect?: boolean;
};

export type BookingFaqItem = {
  question: string;
  answer: string;
};

export type ContactField = {
  key: keyof Pick<BookingFormValues, 'name' | 'email' | 'location' | 'details'>;
  label: string;
  placeholder: string;
  type?: 'text' | 'email';
  required?: boolean;
  multiline?: boolean;
};

export const BOOKING_CONTENT = {
  sectionLabel: 'Book a Consultation',
  introHeadingLead: "Let's start with your",
  introHeadingEmphasis: 'story',
  introBody:
    "Tell us about your space, your vision, and what you're hoping to feel when you walk through the door. We'll take it from there.",
  continueLabel: 'Continue ->',
  backLabel: 'Back',
  submitLabel: 'Send My Enquiry ->',
  requiredMarker: '*',
  contactHint: 'Complete name, valid email, and location to continue.',
  successHeadingLead: "We've got your",
  successHeadingEmphasis: 'message',
  successBody:
    'Thank you for reaching out. A real person on our team will read your enquiry and reply within 24 hours. In the meantime, feel free to explore our work.',
  successCtaLabel: 'Explore Portfolio'
} as const;

export const BOOKING_FAQS: BookingFaqItem[] = [
  {
    question: 'How soon will I hear back?',
    answer: 'Within 24 hours on weekdays. I read every submission personally.'
  },
  {
    question: 'What does a consultation cost?',
    answer: 'Initial discovery calls are complimentary. Project quotes follow after our first conversation.'
  },
  {
    question: 'Can I book a virtual consult?',
    answer: 'Absolutely. I work with clients all across the States - location is never a barrier.'
  },
  {
    question: 'How long do projects take?',
    answer: 'Virtual E-Design: 2-4 weeks. Full interior design: 8-16 weeks depending on scope.'
  }
];

export const BOOKING_OPTION_STEPS: BookingOptionStep[] = [
  {
    id: 0,
    question: 'What kind of project are you looking for?',
    subtext: 'This helps us match you with the right designer and service.',
    isRequired: true,
    options: [
      { title: 'Interior Design', description: 'Full-service, in-person project for your home or commercial space.' },
      { title: 'Virtual Consultation', description: 'Online E-Design package - perfect for any location, any budget.' },
      { title: 'Fine Art Curation', description: 'Art sourcing, commissioning, and placement for your space.' },
      { title: "I'm not sure yet", description: "Tell us about your space and we'll recommend the right service." }
    ]
  },
  {
    id: 1,
    question: 'Tell us about your space',
    subtext: 'The more you share, the better we can prepare for our conversation.',
    isRequired: true,
    options: [
      { title: 'Living Room', description: 'The room everyone sees - and feels.' },
      { title: 'Bedroom', description: 'Where the day begins and ends.' },
      { title: 'Kitchen / Dining', description: 'The heart of the home.' },
      { title: 'Full Home / Commercial', description: 'A larger scope - multiple rooms or a workplace.' }
    ]
  },
  {
    id: 2,
    question: "What's your aesthetic direction?",
    subtext: "Don't overthink it - a gut feeling is enough.",
    isRequired: true,
    showBudgetSelect: true,
    options: [
      { title: 'Warm & Organic', description: 'Natural materials, earthy tones, textures that invite touch.' },
      { title: 'Sleek & Contemporary', description: 'Clean lines, considered restraint, modern confidence.' },
      { title: 'Classic & Timeless', description: 'Rich layers, antiques, a sense of history and belonging.' },
      { title: 'Eclectic & Personal', description: 'Collected over time, full of stories, nothing matching perfectly.' }
    ]
  }
];

export const BUDGET_OPTIONS = [
  "I'd prefer to discuss this",
  'Under GBP2,000 / USD2,500',
  'GBP2,000-GBP5,000 / USD2,500-USD6,500',
  'GBP5,000-GBP15,000 / USD6,500-USD20,000',
  'GBP15,000+ / USD20,000+'
] as const;

export const SOURCE_OPTIONS = [
  'Instagram',
  'Pinterest',
  'Google',
  'Friend or referral',
  'Press / Editorial',
  'Other'
] as const;

export const CONTACT_FIELDS: ContactField[] = [
  {
    key: 'name',
    label: 'Your Full Name',
    placeholder: 'Jane Smith',
    type: 'text',
    required: true
  },
  {
    key: 'email',
    label: 'Email Address',
    placeholder: 'aayu@example.com',
    type: 'email',
    required: true
  },
  {
    key: 'location',
    label: 'Location / City',
    placeholder: 'New York, London, Sydney...',
    type: 'text',
    required: true
  },
  {
    key: 'details',
    label: 'Tell us more (optional)',
    placeholder: "Any context you'd like to share - links, a feeling, your vibe. Anything helps.",
    multiline: true
  }
];

export const CONTACT_FIELD_ERRORS: Record<'name' | 'email' | 'location', string> = {
  name: 'Please enter your full name (at least 2 characters).',
  email: 'Please enter a valid email address.',
  location: 'Please enter your city or location.'
};
