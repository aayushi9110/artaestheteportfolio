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
        prompt: 'What is the primary driver for this project? (Select all that apply)',
        selectionMode: 'multiple',
        allowComment: true,
        commentPlaceholder: 'Other (optional): add any specific driver not listed above.',
        options: [
          { title: 'Lack of functionality or flow in daily life.', description: 'Current layout does not support routines smoothly.' },
          { title: 'Outdated aesthetics that no longer reflect my style.', description: 'The current look feels disconnected from your taste.' },
          { title: 'Space feels cluttered, uninviting, or uncomfortable.', description: 'The room lacks comfort, order, or emotional warmth.' },
          { title: 'Preparing for a new life stage (family growth, empty nest).', description: 'Life changes require the space to adapt.' },
          { title: 'Other', description: 'Use the comment box if your driver is different.' }
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
        prompt: 'What is your desired timeline for completion?',
        selectionMode: 'single',
        allowComment: true,
        commentPlaceholder: 'Specific date (optional): holiday, move-in, event, or milestone.',
        options: [
          { title: 'As soon as possible (ready to start yesterday).', description: 'High urgency and immediate momentum.' },
          { title: 'Within 3-6 months.', description: 'Short-term execution window.' },
          { title: 'Within 6-12 months.', description: 'Moderate timeline with phased planning.' },
          { title: 'Tied to a specific date.', description: 'Driven by a fixed event or deadline.' }
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
      },
      {
        id: 7,
        prompt: 'How do you feel about existing pieces?',
        selectionMode: 'single',
        options: [
          { title: 'Fresh Start', description: 'A completely new look with no existing furniture required.' },
          { title: 'Selective Mix', description: 'Design around a few key heirlooms or art pieces.' },
          { title: 'Heavy Integration', description: 'Keep most current furniture and refresh around it.' }
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
        id: 8,
        prompt: 'What is the status of your art collection?',
        selectionMode: 'single',
        options: [
          { title: 'Established collection', description: 'Needs professional placement and lighting support.' },
          { title: 'Growing collection', description: 'Have a few pieces and want to acquire more.' },
          { title: 'Starting from scratch', description: 'Need guidance sourcing and selecting pieces.' }
        ]
      },
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
        prompt: 'How do you prefer to entertain?',
        selectionMode: 'single',
        options: [
          { title: 'Intimate', description: 'Seated dinners for 4-6 people.' },
          { title: 'Casual', description: 'Standing room, appetizers, and natural flow.' },
          { title: 'Large Scale', description: 'Parties of 15+ with flexible seating.' },
          { title: 'Rarely', description: 'Primarily for immediate household use.' }
        ]
      },
      {
        id: 12,
        prompt: 'Any specific lifestyle must-haves? (Select all that apply)',
        selectionMode: 'multiple',
        options: [
          { title: 'High-durability/stain-resistant fabrics', description: 'Kid and pet-friendly performance.' },
          { title: 'Dedicated home office or Zoom-ready background', description: 'Professional and camera-ready zones.' },
          { title: 'Advanced smart-home/AV integration', description: 'Seamless connected living experience.' },
          { title: 'Sustainable/eco-friendly material sourcing', description: 'Environmentally conscious choices.' }
        ]
      }
    ]
  },
  {
    id: 4,
    category: 'Budget & Expectations',
    subtext: 'Align investment philosophy and collaboration style from the start.',
    categoryCommentLabel: 'Comment (optional) - Budget & Process Clarifications',
    categoryCommentPlaceholder: 'Share budget guardrails, priorities, and how involved you want to be.',
    questions: [
      {
        id: 13,
        prompt: 'Which investment philosophy best describes you?',
        selectionMode: 'single',
        options: [
          { title: 'Investment-focused', description: 'Bespoke, luxurious, and long-term value.' },
          { title: 'Premium Quality', description: 'High-quality brands with selective custom elements.' },
          { title: 'Balanced Approach', description: 'Mix of high-impact splurges and smart saves.' },
          { title: 'Value-Conscious', description: 'Effective changes with strict cost focus.' }
        ]
      },
      {
        id: 14,
        prompt: 'How involved do you want to be in the design process?',
        selectionMode: 'single',
        options: [
          { title: 'The Collaborator', description: 'Review every sample and participate in each decision.' },
          { title: 'The Approver', description: 'Review 2-3 options and make the final call.' },
          { title: 'The Visionary', description: 'Trust the designer to deliver a complete concept.' }
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

export const CONTACT_FIELD_ERRORS: Record<'name' | 'email' | 'phone' | 'location', string> = {
  name: 'Please enter your full name (at least 2 characters).',
  email: 'Please enter a valid email address.',
  phone: 'Please enter a valid phone number.',
  location: 'Please enter your city or location.'
};
