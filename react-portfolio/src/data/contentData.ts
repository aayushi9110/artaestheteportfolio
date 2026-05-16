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
    punchline: 'Editorial furnishing for your home',
    heroTitleLines: ['Plans. Pieces. Polish'],
    heroDescription:
      'Empty to Finished. In Six Weeks. A curated, editorial approach to furnishing your home.',
    stats: [
      { value: '51+', label: 'Projects Completed' },
      { value: '30+', label: 'Spaces Styled' },
      { value: '55+', label: 'Art Pieces Commissioned' },
    ] as MetricItem[],
  },
  about: {
    kicker: 'My Story',
    heading: 'Hi, I’m Aayushi.',
    lead: '',
    storyParagraphs: [`Most furniture in this city is bought on the wrong Saturday by the right people. I know — I sold it to them. For 7 years.
At Crate & Barrel, then West Elm, then BoConcept. From the floor, I watched a particular ritual repeat itself a thousand times: someone closes on their first apartment, spends Saturday in a daze, walks out with a sectional that looked right under fluorescent lights and depressing under their actual ones. Goes home. Scrolls Pinterest until 2 a.m. Starts again next weekend.
There's a better way to do this. I just hadn't seen anyone bother to build it.
So I did.
This studio furnishes newly-renovated condos, family homes, and apartments. Six to ten weeks, empty to finished. Flat fees, real trade discounts, and the same catalogs the AD-100 firms shop too — minus the nine-month timeline. The result is editorial. Magazine-good, but yours, not somebody else's.

If you just bought a place-
You're not going crazy. The Pinterest board, the rug you keep returning, the chairs that looked great until they arrived — that's the apartment fighting back. It's not a taste problem. It's a sequencing problem. You need someone who can hold the whole room in their head while you go back to your actual job. That's the job.

If you're a designer, architect, or realtor-
You know the moment. The renovation wraps, the client hugs you, then asks the question you dread: what now? You don't want to spend the next nine months furnishing for a 12% markup. I do. White-label, co-branded, or quietly behind the scenes — I make your finished project actually finish.

If the rooms in your head and the rooms in your apartment haven't met yet — let's introduce them.
— Aayushi`,
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
