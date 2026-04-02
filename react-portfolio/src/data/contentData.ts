export type MetricItem = {
  value: string;
  label: string;
};

export const CONTENT = {
  brand: {
    siteUrl: 'www.byaayushi.com',
    logoAlt: 'Art Aesthete logo',
  },
  home: {
    punchline: 'Your space, your story, beautifully told',
    heroTitleLines: ['Where Spaces', 'Become', 'Living Art'],
    heroDescription:
      'We design interiors that feel as extraordinary as the people who inhabit them. Every detail is intentional. Every room tells a story.',
    stats: [
      { value: '51+', label: 'Projects Completed' },
      { value: '30+', label: 'Spaces Styled' },
      { value: '55+', label: 'Art Pieces Commissioned' },
    ] as MetricItem[],
  },
  about: {
    kicker: 'My Story',
    heading: 'Built on beauty, driven by instinct',
    lead: 'Most spaces are filled. Few are felt.',
    storyParagraphs: [
      'Hi, I am Aayushi Shah. I set out to find rooms that felt honest - spaces that did not pretend to be something they were not.',
      'Most people decorate their homes. I believe you should curate them. A decorated room fills space. A curated one commands it.',
      'Art Aesthete exists for the homeowner who is done settling for fine and is ready for a space that actually moves them.',
    ],
  },
  pdf: {
    toolbarHint: 'Review this endpoint and click Generate PDF to download from browser.',
    fileName: 'Art-Aesthete-Portfolio-Top10.pdf',
    caseStudyLabelPrefix: 'Project',
    imageCaptions: {
      featured: 'Featured view',
      before: 'Before view',
      after: 'After view',
    },
  },
} as const;
