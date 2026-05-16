export type BookingFormValues = {
  budget: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  details: string;
  source: string;
};

export type BookingOption = {
  title: string;
  description: string;
};

export type BookingQuestion = {
  id: number;
  prompt: string;
  options: BookingOption[];
  selectionMode?: 'single' | 'multiple';
  allowComment?: boolean;
  commentPlaceholder?: string;
};

export type BookingOptionStep = {
  id: number;
  category: string;
  subtext: string;
  questions: BookingQuestion[];
  categoryCommentLabel?: string;
  categoryCommentPlaceholder?: string;
};

export type BookingFaqItem = {
  question: string;
  answer: string;
};

export type ContactField = {
  key: keyof Pick<BookingFormValues, 'name' | 'email' | 'phone' | 'location' | 'details'>;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel';
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
  contactHint: 'Complete name, valid email, phone number, and location to continue.',
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
    category: 'Project Overview & Goals',
    subtext: 'Tell us what is driving this project and what outcome you want to achieve.',
    questions: [
      {
        id: 1,
        prompt: 'What did you just move into - or what are you about to move into?',
        selectionMode: 'single',
        options: [
          { title: 'A studio', description: 'Compact single-space home.' },
          { title: 'A one-bedroom', description: 'One-bedroom apartment or condo.' },
          { title: 'A two-bedroom', description: 'Two-bedroom apartment or condo.' },
          { title: 'A three-bedroom or larger', description: 'Larger apartment, condo, or house.' },
          { title: 'A brownstone (full floor or more)', description: 'Townhouse or full-floor brownstone setup.' },
          { title: "I'm furnishing a pied-a-terre or second home", description: 'Part-time or secondary residence.' },
          { title: "I'm an interior designer / architect / realtor furnishing for a client", description: 'Trade or partner project for a client.' }
        ]
      },
      {
        id: 15,
        prompt: 'Roughly how big is the space?',
        selectionMode: 'single',
        options: [
          { title: 'Under 600 sq ft', description: 'Compact footprint.' },
          { title: '600-900 sq ft', description: 'Small-to-medium space.' },
          { title: '900-1,300 sq ft', description: 'Comfortable medium-size layout.' },
          { title: '1,300-2,000 sq ft', description: 'Large primary residence footprint.' },
          { title: 'Over 2,000 sq ft', description: 'Expansive multi-zone layout.' },
          { title: 'Not sure yet', description: 'No exact measurements available yet.' }
        ]
      },
      {
        id: 2,
        prompt: 'What is the vibe of your ultimate outcome?',
        selectionMode: 'single',
        options: [
          { title: 'The Sanctuary', description: 'A place to retreat and decompress.' },
          { title: 'The Hub', description: 'High-energy, social, and ready for guests.' },
          { title: 'The Showpiece', description: 'Visually stunning and ready for wow moments.' },
          { title: 'The Workhorse', description: 'Highly organized, durable, and practical for daily life.' }
        ]
      },
      {
        id: 16,
        prompt: "Be honest. What's the one thing you refuse to compromise on?",
        selectionMode: 'single',
        options: [
          { title: 'A great sofa', description: 'Comfort and quality seating is the top priority.' },
          { title: 'A beautiful bed', description: 'Sleep quality and a strong bedroom anchor come first.' },
          { title: 'Real art on the walls', description: 'Authentic art is non-negotiable.' },
          { title: "Lighting that doesn't feel like a rental", description: 'Layered, elevated lighting is essential.' },
          { title: "A dining table I'd actually host at", description: 'Hosting-ready dining matters most.' },
          { title: 'Hidden storage everywhere', description: 'Clean surfaces and concealed storage are critical.' }
        ]
      },
      {
        id: 3,
        prompt: 'Who primarily uses this space?',
        selectionMode: 'multiple',
        options: [
          { title: 'Mostly adults/professionals.', description: 'Adult-focused daily use.' },
          { title: 'Children (toddlers/school-age).', description: 'Designed around younger children.' },
          { title: 'Teens.', description: 'Teen-friendly use and needs.' },
          { title: 'Pets (dogs/cats).', description: 'Pet-friendly considerations are important.' },
          { title: 'Frequent guests/extended family.', description: 'Regular hosting and shared use.' }
        ]
      },
      {
        id: 4,
        prompt: 'When do you want it finished?',
        selectionMode: 'single',
        options: [
          { title: 'ASAP - within 6 weeks', description: 'Fast-track timeline with immediate start expectations.' },
          { title: 'Within the next 2 months', description: 'Near-term completion target.' },
          { title: 'Sometime in the next 3-6 months', description: 'Flexible medium-term window.' },
          { title: 'No rush, exploring options', description: 'Discovery-first pace without a hard deadline.' },
          { title: 'Already moved in, currently unhappy with how it looks', description: 'Needs a refresh after moving in.' }
        ]
      },
      {
        id: 17,
        prompt: 'What feels right for the furniture, lighting, art, and rugs?',
        selectionMode: 'single',
        options: [
          { title: 'Under $25K - I want to be smart about it', description: 'Cost-conscious with strong impact priorities.' },
          { title: '$25K-$50K', description: 'Balanced investment with flexibility.' },
          { title: '$50K-$100K', description: 'Premium scope with broader sourcing range.' },
          { title: '$100K-$200K', description: 'High-end furnishing and layered detailing.' },
          { title: '$200K+', description: 'Top-tier scope with full customization potential.' },
          { title: "Not sure yet - that's part of why I'm here", description: 'Open to guidance on realistic planning.' }
        ]
      }
    ]
  },
  {
    id: 1,
    category: 'Style & Aesthetic Preferences',
    subtext: 'Define your visual language, color preference, and approach to existing pieces.',
    categoryCommentLabel: 'Comment (optional) - Style Clarifications',
    categoryCommentPlaceholder: 'Clarify nuances, references, materials you love, or details to avoid.',
    questions: [
      {
        id: 5,
        prompt: 'Which aesthetic resonates most with your personal brand?',
        selectionMode: 'single',
        options: [
          { title: 'Classic & Timeless', description: 'Elegant, refined, subtle luxury.' },
          { title: 'Modern & Minimalist', description: 'Clean lines, natural materials, functional.' },
          { title: 'Eclectic & Collected', description: 'Curated mix of periods, textures, and stories.' },
          { title: 'Bold & Dramatic', description: 'Rich colors, striking contrasts, unique focal points.' }
        ]
      },
      {
        id: 6,
        prompt: 'Regarding color, are you typically:',
        selectionMode: 'single',
        options: [
          { title: 'Neutralist', description: 'Whites, creams, beiges, and greys.' },
          { title: 'Earthy', description: 'Terracotta, sage, ochre, and wood tones.' },
          { title: 'Moody', description: 'Navy, charcoal, forest green, and deep plums.' },
          { title: 'Vibrant', description: 'Jewel tones, pops of bright color, and high contrast.' }
        ]
      }
    ]
  },
  {
    id: 2,
    category: 'Art & Collections',
    subtext: 'Help us understand your current collection and desired art presence.',
    questions: [
      {
        id: 9,
        prompt: 'How should art function in your home?',
        selectionMode: 'single',
        options: [
          { title: 'The Focal Point', description: 'Large, bold statements that anchor the room.' },
          { title: 'The Gallery', description: 'Curated mix of smaller pieces and photography.' },
          { title: 'Subtle Texture', description: 'Art that blends softly for a calm mood.' }
        ]
      }
    ]
  },
  {
    id: 3,
    category: 'Functionality & Lifestyle',
    subtext: 'Prioritize daily performance, entertaining style, and must-have features.',
    questions: [
      {
        id: 10,
        prompt: 'What is your #1 functional pain point?',
        selectionMode: 'single',
        options: [
          { title: 'Storage', description: 'Need smarter storage and organization.' },
          { title: 'Lighting', description: 'Too dark or harsh, clinical lighting.' },
          { title: 'Technology', description: 'Need smart-home features without visible clutter.' },
          { title: 'Privacy', description: 'Need better acoustic or visual separation.' }
        ]
      },
      {
        id: 11,
        prompt: 'Anything you want me to know about the place, the people, or the project?',
        selectionMode: 'single',
        options: [
          { title: 'Intimate', description: 'Seated dinners for 4-6 people.' },
          { title: 'Casual', description: 'Standing room, appetizers, and natural flow.' },
          { title: 'Large Scale', description: 'Parties of 15+ with flexible seating.' },
          { title: 'Rarely', description: 'Primarily for immediate household use.' }
        ]
      }
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
    key: 'phone',
    label: 'Phone Number',
    placeholder: '+1 212 555 0182',
    type: 'tel',
    required: true
  },
  {
    key: 'location',
    label: 'Location / City',
    placeholder: 'New York, San Francisco, ...',
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

export const CONTACT_FIELD_ERRORS: Record<'name' | 'email' | 'phone' | 'location', string> = {
  name: 'Please enter your full name (at least 2 characters).',
  email: 'Please enter a valid email address.',
  phone: 'Please enter a valid phone number.',
  location: 'Please enter your city or location.'
};
