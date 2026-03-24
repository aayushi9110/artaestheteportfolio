export type StoryType = 'interior' | 'fine-art';

export type Deliverable = {
  icon: string;
  text: string;
};

export type ProjectDetailMetric = {
  label: string;
  value: string;
};

export type Project = {
  storyType: StoryType;
  isSelectedForHome: boolean;
  homeVisibilityPriority: number;
  title: string;
  location: string;
  tagLabels: string[];
  heroImageUrl: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  overviewTitle: string;
  overviewTextPrimary: string;
  overviewTextSecondary: string;
  referenceImageUrls?: string[];
  galleryImageUrls: string[];
  galleryCaptions: string[];
  detailMetrics?: ProjectDetailMetric[];
};

const BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS = [
  '/images/Boconcept/office/OfficeBefore.png',
  '/images/Boconcept/office/boconcept-bright-office-view-1.png',
  '/images/Boconcept/office/boconcept-c-table-details.png',
  '/images/Boconcept/office/boconcept-desk-details.png',
  '/images/Boconcept/office/boconcept-office-details-cabinet.png',
  '/images/Boconcept/office/boconcept-office-sofabed-pull-2.png',
  '/images/Boconcept/office/boconcept-office-view-2.png'
];

const WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS = [
  '/images/WestElm/contemporaryLiving/westelm-project.png',
  '/images/WestElm/contemporaryLiving/WestElmPaloAltoEmpty.png',
  '/images/WestElm/contemporaryLiving/westelm-details.png',
  '/images/WestElm/contemporaryLiving/westelm-dining-1.png',
  '/images/WestElm/contemporaryLiving/westelm-dining-pa-phone.png',
  '/images/WestElm/contemporaryLiving/westelm-dining.png',
  '/images/WestElm/contemporaryLiving/westelm-project-details.png',
  '/images/WestElm/contemporaryLiving/westelm-project-living-room.png',
  '/images/WestElm/contemporaryLiving/westelm-project-living.png',
  '/images/WestElm/contemporaryLiving/westelm-project-perspective.png',
  '/images/WestElm/contemporaryLiving/westelm-sofa-detail.png'
];

const WESTELM_MID_CENTURY_MODERN_IMAGE_URLS = [
  '/images/WestElm/midCenturyModern/sanJoseBefore.png',
  '/images/WestElm/midCenturyModern/westelm-project-living-view-2.png',
  '/images/WestElm/midCenturyModern/westelm-dining-project-1-chandelier.png',
  '/images/WestElm/midCenturyModern/westelm-living-dining-project-1.png',
  '/images/WestElm/midCenturyModern/westelm-living-project.png',
];

const ROCHEBOBOIS_DINING_IMAGE_URLS = [
  '/images/Boconcept/office/rocheboboisDining/MadisonDiningflowy.png',
  '/images/Boconcept/office/rocheboboisDining/MadisonDiningBefore.png',
  '/images/Boconcept/office/rocheboboisDining/MadisonDining1After.png'
];

const CUPPERTINO_HOME_IMAGE_URLS = [
  '/images/WestElm/cuppertinoHome/CuppertinoSectional.png',
  '/images/WestElm/cuppertinoHome/CuppertinoEmptyview.png',
  '/images/WestElm/cuppertinoHome/CuppertinoAfterView.png',
  '/images/WestElm/cuppertinoHome/cuppertino-dining-view-1.png',
  '/images/WestElm/cuppertinoHome/cuppertino-dining-view-2.png',
  '/images/WestElm/cuppertinoHome/cuppertino-dining-zoom.png',
  '/images/WestElm/cuppertinoHome/CuppertinoLivingroom1.png',
  '/images/WestElm/cuppertinoHome/Cuppertinoview3.png'
];

const FOSTER_CITY_LIVING_DINING_IMAGE_URLS = [
  '/images/WestElm/fosterCityLivingDining/openLayPaloAltoViewHero.png',
  '/images/WestElm/fosterCityLivingDining/openLayoutBefore.png',
  '/images/WestElm/fosterCityLivingDining/openLayoutPaloAltoAfter.png',
  '/images/WestElm/fosterCityLivingDining/openLayPaloAltoDining.png',
  '/images/WestElm/fosterCityLivingDining/openLayPaloAltoview2.png'
];

const WESTELM_SAN_FRAN_IMAGE_URLS = [
  '/images/WestElm/SanFran/sanFransicoBedviewHero.png',
  '/images/WestElm/SanFran/sanFransicoBedroomBefore.png',
  '/images/WestElm/SanFran/sanFransicoBedroomAfter.png'
];

const WESTELM_ENTRYWAY_IMAGE_URLS = [
  '/images/WestElm/entryway/emptyCuppertinoEntryway.png',
  '/images/WestElm/entryway/CuppertinoEntryway.png'
];

const MUMBAI_BEDROOM_IMAGE_URLS = [
  '/images/mumbai/mumbaibefore.png',
  '/images/mumbai/bedroomMumbaiDetailhero.png',
  '/images/mumbai/bedroomMumbaiDetailright.png',
  '/images/mumbai/bedroomMumbai.png',
  '/images/mumbai/mumbaiMedia.png'
];

const MUMBAI_BEDROOM_TWO_IMAGE_URLS = [
  '/images/mumbaibed2/mumbaiBed2.png',
  '/images/mumbaibed2/mumbaiBed2curtaind.png',
  '/images/mumbaibed2/mumbaiBed2detail.png',
  '/images/mumbaibed2/mumbaiDetailbed2.png'
];

const MUMBAI_BEDROOM_THREE_IMAGE_URLS = [
  '/images/mumbaibed3/mumbaibed3.png',
  '/images/mumbaibed3/mumbaiBed3detailsnightstand.png',
  '/images/mumbaibed3/mumbaibed3nightstanddetail.png',
  '/images/mumbaibed3/mumbaiBed3whole.png'
];

export const PROJECTS: Record<string, Project> = {
  homeOffices: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 1,
    title: 'Home Office',
    location: 'Menlo Park, California -The Modern Study - Virtual',
    tagLabels: ['Interior Design', 'Home Office Design', 'Workspace', 'Productivity Zone', 'Bo Concept'],
    heroImageUrl: BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS[3],
    beforeImageUrl: BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS[0],
    afterImageUrl: BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS[1],
    overviewTitle: 'A calm, modern home office designed for clarity, comfort, and effortless focus.',
    overviewTextPrimary: 'This home office concept is designed to feel like a sanctuary for focused work—a space where structure meets serenity. It supports the user’s professional needs while nurturing creativity and emotional balance, making it an ideal environment for remote work, study, or personal projects.',
    overviewTextSecondary: 'A flexible retreat that powers your work and pampers your guests.',
    galleryImageUrls: BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS,
    galleryCaptions: [
      'Guest bedroom before transformation',
      'Guest bedroom after transformation',
      'Functional styling details',
      'Desk and hidden storage details',
      'Bookcase and cabinet details',
      'Sofabed pull-out detail',
      'Office view with natural light'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$18,000 - $28,000' },
      { label: 'Timeline', value: '6 - 8 Weeks' },
      { label: 'Space Scope', value: 'Home office + guest storage wall' },
      { label: 'Floor Area', value: '' },
    ]
  },
  contemporaryLiving: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 3,
    title: 'Contemporary Living',
    location: 'Palo Alto, California - Open Concept Living Room Design',
    tagLabels: ['California Contemporary', ' Open Concept Living', ' Modern Living Room Design', 'Interior Design', 'Contemporary Home Styling', 'West Elm'],
    heroImageUrl: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS[2],
    beforeImageUrl: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS[1],
    afterImageUrl: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS[0],
    overviewTitle: 'A warm, modern sanctuary where natural light and organic textures shape effortless living.',
    overviewTextPrimary: 'This Modern Organic living space blends clean contemporary architecture with earthy warmth. Floor to ceiling windows, natural materials, and a soft neutral palette create an airy, grounded atmosphere. Plush seating, sculptural décor, and an open layout connect comfort with sophistication, making the space feel both inviting and refined.',
    overviewTextSecondary: 'A serene, light filled retreat designed for modern living with timeless ease.',
    referenceImageUrls: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS,
    galleryImageUrls: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS,
    galleryCaptions: [
      'Living and DiningSpace after transformation',
      'Empty space before transformation',
      'Beautiful details and material balance in the living room',
      'Dining area with sculptural lighting and beautiful textures',
      'Dining area',
      'Dining area with natural light and organic textures',
      'Layered details',
      'Living room area for warm hosting and quiet evenings',
      'A modern, light filled space shaped by elegance',
      'Modern living softened by light, texture',
      'A quiet statement piece'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$32,000 - $48,000' },
      { label: 'Timeline', value: '10 - 12 Weeks' },
      { label: 'Space Scope', value: 'Open-plan living and dining' },
      { label: 'Floor Area', value: '' },
    ]
  },
  modernScandinavian: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 2,
    title: 'Modern Scandinavian Living & Dining',
    location: 'San Jose, California',
    tagLabels: ['Interior Design', 'Warm Scandinavian', 'Organic Contemporary', 'West Elm', 'Living', 'Dining'],
    heroImageUrl: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS[1],
    beforeImageUrl: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS[0],
    afterImageUrl: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS[3],
    overviewTitle: 'Modern Minimalist with Scandinavian Warmth',
    overviewTextPrimary: 'This Modern Minimalist living–dining space blends Scandinavian warmth with clean contemporary lines. Soft neutrals, natural wood, and airy sheer curtains create a calm, inviting atmosphere filled with natural light. The open layout connects the lounge and dining areas seamlessly, while organic textures, greenery, and sculptural lighting add depth and quiet sophistication..',
    overviewTextSecondary: 'A serene, balanced interior designed for modern living with understated elegance.',
    referenceImageUrls: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS,
    galleryImageUrls: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS,
    galleryCaptions: [
      'Space Before the transformation',
      'A bright, breathable living room shaped by natural materials and understated design',
      'A dining area with sculptural lighting and organic textures',
      'Warm woods, clean Nordic lines',
      'Soft neutrals, modern Nordic warmth'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$28,000 - $42,000' },
      { label: 'Timeline', value: '8 - 10 Weeks' },
      { label: 'Space Scope', value: 'Combined living and dining room' },
      { label: 'Floor Area', value: '' },
    ]
  },
  madisonDining: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 6,
    title: 'Elevated Dining',
    location: 'Madison Ave NYC - Soft Luxury Dining.',
    tagLabels: ['Interior Design', 'Dining Room', 'BoConcept', 'Roche Bobois'],
    heroImageUrl: ROCHEBOBOIS_DINING_IMAGE_URLS[0],
    beforeImageUrl: ROCHEBOBOIS_DINING_IMAGE_URLS[1],
    afterImageUrl: ROCHEBOBOIS_DINING_IMAGE_URLS[2],
    overviewTitle: 'Modern luxury shaped by soft light, sculptural design, and the rhythm of New York City.',
    overviewTextPrimary: 'A modern dining space anchored by a marble table, soft neutrals, and sweeping city views. Light, texture, and curated details create a calm, elevated atmosphere perfect for everyday living and intimate gatherings.',
    overviewTextSecondary: '- A serene pause in the middle of New York’s endless motion.',
    referenceImageUrls: ROCHEBOBOIS_DINING_IMAGE_URLS,
    galleryImageUrls: ROCHEBOBOIS_DINING_IMAGE_URLS,
    galleryCaptions: [
      'Dining Room before any interior upgrades',
      'Madison Dining Space after transformation',
      'Serenity and sculptural design details in the dining room'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$22,000 - $36,000' },
      { label: 'Timeline', value: '7 - 9 Weeks' },
      { label: 'Space Scope', value: 'Dedicated dining room' },
      { label: 'Floor Area', value: '' },
    ]
  },
  cuppertinoHome: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 7,
    title: 'A warm fusion to reflect personal style',
    location: 'Mountain View, California - A warm fusion of contemporary styles for a family home',
    tagLabels: ['Interior Design', 'West Elm', 'Living Room', 'Dining Room'],
    heroImageUrl: CUPPERTINO_HOME_IMAGE_URLS[0],
    beforeImageUrl: CUPPERTINO_HOME_IMAGE_URLS[1],
    afterImageUrl: CUPPERTINO_HOME_IMAGE_URLS[2],
    overviewTitle: 'Layered Contemporary and Scandinavian Influences for a family home',
    overviewTextPrimary: 'Soft neutrals, warm woods, and curated textures create a space that feels both grounded and expressive. The mix of sculptural seating, modern artwork, and subtle vintage notes gives the room a layered personality — relaxed, inviting, and quietly sophisticated..',
    overviewTextSecondary: 'Warm, nostalgic, cozy, and timeless with a modern twist.',
    referenceImageUrls: CUPPERTINO_HOME_IMAGE_URLS,
    galleryImageUrls: CUPPERTINO_HOME_IMAGE_URLS,
    galleryCaptions: [
      'Warmth woven into modern clarity',
      'Space before the transformation',
      'Space after the transformation',
      'A tranquil dining haven where light, texture, and intention meet.',
      'A Dining Space breathing quiet grace',
      'The space flowing with quiet intention',
      'Sunlit calm with layered warmth'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$36,000 - $54,000' },
      { label: 'Timeline', value: '10 - 14 Weeks' },
      { label: 'Space Scope', value: 'Family living room and dining room' },
      { label: 'Floor Area', value: '' },
    ]
  },
  fosterCityLivingDining: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 8,
    title: 'Foster City Living- Dining',
    location: 'Foster City, California - An open-plan living and dining concept for a family home',
    tagLabels: ['Interior Design', 'West Elm', 'Open Layout', 'Living & Dining'],
    heroImageUrl: FOSTER_CITY_LIVING_DINING_IMAGE_URLS[0],
    beforeImageUrl: FOSTER_CITY_LIVING_DINING_IMAGE_URLS[1],
    afterImageUrl: FOSTER_CITY_LIVING_DINING_IMAGE_URLS[2],
    overviewTitle: 'Comfort woven through open space.',
    overviewTextPrimary: ' Thoughtful details — from the sculptural lighting to the layered textiles and greenery — give the home a calm, lived-in elegance without ever feeling crowded.',
    overviewTextSecondary: 'This room is a modern, open‑concept living space with a blend of soft contemporary comfort, natural materials, and subtle curated accents. It feels bright, relaxed, and thoughtfully connected to the dining area beyond.',
    referenceImageUrls: FOSTER_CITY_LIVING_DINING_IMAGE_URLS,
    galleryImageUrls: FOSTER_CITY_LIVING_DINING_IMAGE_URLS,
    galleryCaptions: [
      'Space after the transformation',
      'Space before the transformation',
      'Soft edges meeting striking contrast',
      'Pure calm in connected space',
      'Spaces breathing in gentle harmony'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$30,000 - $46,000' },
      { label: 'Timeline', value: '9 - 11 Weeks' },
      { label: 'Space Scope', value: 'Open-concept living and dining' },
      { label: 'Floor Area', value: '' },
    ]
  },
  sanFranBedroom: {
    storyType: 'interior',
    isSelectedForHome: false,
    homeVisibilityPriority: 99,
    title: 'San Francisco Bedroom Refresh',
    location: 'San Francisco, California - Bedroom Refresh',
    tagLabels: ['Interior Design', 'California style', 'West Elm', 'Bedroom'],
    heroImageUrl: WESTELM_SAN_FRAN_IMAGE_URLS[0],
    beforeImageUrl: WESTELM_SAN_FRAN_IMAGE_URLS[1],
    afterImageUrl: WESTELM_SAN_FRAN_IMAGE_URLS[2],
    overviewTitle: 'Calm, coastal luxury shaped in softness.',
    overviewTextPrimary: 'This bedroom is designed as a serene retreat, where soft tones, layered textures, and natural light create a sense of effortless calm. The upholstered headboard, warm wood accents, and sculptural décor bring depth without overwhelming the space. Floor‑to‑ceiling windows open to a breathtaking coastal view, allowing the room to feel expansive, grounded, and deeply restorative.',
    overviewTextSecondary: 'Every detail supports a feeling of quiet luxury and lived‑in ease.',
    referenceImageUrls: WESTELM_SAN_FRAN_IMAGE_URLS,
    galleryImageUrls: WESTELM_SAN_FRAN_IMAGE_URLS,
    galleryCaptions: [
      'Calm, coastal luxury shaped in softness.',
      'Space before the refresh',
      'Space after the refresh'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$14,000 - $24,000' },
      { label: 'Timeline', value: '5 - 7 Weeks' },
      { label: 'Space Scope', value: 'Primary bedroom refresh' },
      { label: 'Floor Area', value: '' },
    ]
  },
  entryway: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 9,
    title: 'Welcoming Entryway',
    location: 'Anahiem, CA - Entryway Styling',
    tagLabels: ['Interior Design', 'California', 'West Elm', 'Entryway', 'Anaheim',],
    heroImageUrl: WESTELM_ENTRYWAY_IMAGE_URLS[1],
    beforeImageUrl: WESTELM_ENTRYWAY_IMAGE_URLS[0],
    afterImageUrl: WESTELM_ENTRYWAY_IMAGE_URLS[1],
    overviewTitle: 'A warm welcome shaped with intention.',
    overviewTextPrimary: 'The deep green door adds a quiet richness, while the woven pendant, sculptural accents, and layered greenery bring warmth and personality. Every detail works together to create a calm, curated first impression that feels both modern and soulful.',
    overviewTextSecondary: 'Every detail works together to create a calm, curated first impression that feels both modern and soulful.',
    referenceImageUrls: WESTELM_ENTRYWAY_IMAGE_URLS,
    galleryImageUrls: WESTELM_ENTRYWAY_IMAGE_URLS,
    galleryCaptions: [
      'Entryway before styling',
      'Entryway after styling'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$4,000 - $9,000' },
      { label: 'Timeline', value: '2 - 4 Weeks' },
      { label: 'Space Scope', value: 'Entry vignette and first impression zone' },
      { label: 'Floor Area', value: '' },
    ]
  },
  mumbaiBedroomOne: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 10,
    title: 'Bedroom Retreat I',
    location: 'Mumbai, India ',
    tagLabels: ['Interior Design', 'Bedroom', 'Mumbai', 'Contemporary', 'Project 1'],
    heroImageUrl: MUMBAI_BEDROOM_IMAGE_URLS[1],
    beforeImageUrl: MUMBAI_BEDROOM_IMAGE_URLS[0],
    afterImageUrl: MUMBAI_BEDROOM_IMAGE_URLS[3],
    overviewTitle: 'A contemporary Mumbai bedroom with calm, layered restraint.',
    overviewTextPrimary: 'Project 1 focused on creating a clean and restful bedroom using a neutral base, gentle contrast, and tactile materials. The layout and visual balance were planned to support both comfort and everyday functionality.',
    overviewTextSecondary: 'Soft textures and warm details deliver a polished, welcoming retreat with a minimal contemporary feel.',
    referenceImageUrls: MUMBAI_BEDROOM_IMAGE_URLS,
    galleryImageUrls: MUMBAI_BEDROOM_IMAGE_URLS,
    galleryCaptions: [
      'Bedroom before the transformation',
      'Bedroom after transformation',
      'Detail view with layered textures',
      'Bedroom full view',
      'Media wall styling detail'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$10,000 - $18,000' },
      { label: 'Timeline', value: '6 - 8 Weeks' },
      { label: 'Space Scope', value: 'Bedroom + media wall styling' },
      { label: 'Floor Area', value: '' },
    ]
  },
  mumbaiBedroomTwo: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 11,
    title: 'Compact Bedroom',
    location: 'Mumbai, India  (Project 2)',
    tagLabels: ['Interior Design', 'Bedroom', 'Mumbai', 'Contemporary',],
    heroImageUrl: MUMBAI_BEDROOM_TWO_IMAGE_URLS[2],
    beforeImageUrl: MUMBAI_BEDROOM_TWO_IMAGE_URLS[0],
    afterImageUrl: MUMBAI_BEDROOM_TWO_IMAGE_URLS[0],
    overviewTitle: 'A light-filled bedroom with warm drapery and quiet detailing.',
    overviewTextPrimary: 'Project 2 explores a softer bedroom palette with layered fabrics, warm light filtering, and curated accents that add depth without visual noise.',
    overviewTextSecondary: 'The result is a serene, intimate space that feels composed, practical, and deeply comfortable.',
    referenceImageUrls: MUMBAI_BEDROOM_TWO_IMAGE_URLS,
    galleryImageUrls: MUMBAI_BEDROOM_TWO_IMAGE_URLS,
    galleryCaptions: [
      'Mumbai bedroom set 2 - full composition',
      'Set 2 curtain and light detail',
      'Set 2 close-up detail',
      'Set 2 bed styling detail'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$9,000 - $16,000' },
      { label: 'Timeline', value: '5 - 7 Weeks' },
      { label: 'Space Scope', value: 'Compact bedroom refresh' },
      { label: 'Floor Area', value: '' },
    ]
  },
  mumbaiBedroomThree: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 12,
    title: 'Luxe Bedroom',
    location: 'Mumbai, India ',
    tagLabels: ['Interior Design', 'Bedroom', 'Mumbai', 'Contemporary', 'Luxury'],
    heroImageUrl: MUMBAI_BEDROOM_THREE_IMAGE_URLS[1],
    beforeImageUrl: MUMBAI_BEDROOM_THREE_IMAGE_URLS[3],
    afterImageUrl: MUMBAI_BEDROOM_THREE_IMAGE_URLS[3],
    overviewTitle: 'A modern bedroom concept centered on texture and bedside detail.',
    overviewTextPrimary: 'Project 3 leans into refined detailing with carefully styled bedside elements, tonal layering, and a cohesive material story across the room.',
    overviewTextSecondary: 'The final design feels tailored and calm, with visual rhythm built through subtle contrast and texture.',
    referenceImageUrls: MUMBAI_BEDROOM_THREE_IMAGE_URLS,
    galleryImageUrls: MUMBAI_BEDROOM_THREE_IMAGE_URLS,
    galleryCaptions: [
      'Mumbai bedroom set 3 - full composition',
      'Set 3 nightstand detail',
      'Set 3 texture detail',
      'Set 3 complete bedroom view'
    ],
    detailMetrics: [
      { label: 'Approx Budget', value: '$11,000 - $19,000' },
      { label: 'Timeline', value: '6 - 8 Weeks' },
      { label: 'Space Scope', value: 'Bedroom with bespoke bedside styling' },
      { label: 'Floor Area', value: '' },
    ]
  },
  sienna: {
    storyType: 'fine-art',
    isSelectedForHome: false,
    homeVisibilityPriority: 99,
    title: 'Sienna Abstract',
    location: 'Mixed Media - London Commission',
    tagLabels: ['Fine Art', 'Mixed Media', 'Commission'],
    heroImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    overviewTitle: 'A large-format commission for a Mayfair dining room',
    overviewTextPrimary: 'The brief was simple and difficult in equal measure: a single artwork large enough to own the dining room wall, and personal enough to feel like it had always been there.',
    overviewTextSecondary: 'The final 200x140 mixed media work combines raw pigment, plaster, and drawn mark, resulting in something between painting and wall sculpture.',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700&q=80',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=700&q=80',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=700&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80'
    ],
    galleryCaptions: ['Sienna Abstract - full view', 'Pigment detail', 'In situ - dining room', 'Mark making detail', 'Final installation']
  },
  clay: {
    storyType: 'fine-art',
    isSelectedForHome: false,
    homeVisibilityPriority: 99,
    title: 'Clay Forms',
    location: 'Ceramic Sculpture - Brooklyn Studio',
    tagLabels: ['Fine Art', 'Ceramic', 'Sculptural'],
    heroImageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1400&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80',
    overviewTitle: 'A series of handmade ceramics placed across projects',
    overviewTextPrimary: 'Clay Forms began as a single commission - three sculptural vessels for a Brooklyn brownstone living room. The response led to a larger collaboration with ceramicist Yuki Nakamura.',
    overviewTextSecondary: 'Each piece is hand-formed and wood-fired, finished in ash glaze, terracotta slip, and raw clay. No two pieces are identical.',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=700&q=80',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=700&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80'
    ],
    galleryCaptions: ['Clay Forms - hero shot', 'Vessel detail', 'In situ - brownstone', 'Scale and placement', 'Series overview']
  }
};

export type ProjectDetailMetricDefinition = {
  outputLabel: string;
  aliases: string[];
  fallbackValue: string;
};

export const PROJECT_DETAIL_METRIC_DEFINITIONS: ProjectDetailMetricDefinition[] = [
  { outputLabel: 'Approx Budget', aliases: ['approx budget', 'budget'], fallbackValue: '$25K - $120K' },
  { outputLabel: 'Timeline', aliases: ['timeline'], fallbackValue: '6 - 14 Weeks' },
  { outputLabel: 'Space Scope', aliases: ['space scope', 'scope'], fallbackValue: 'Single Room to Full Home' },
  { outputLabel: 'Floor Area', aliases: ['floor area', 'area'], fallbackValue: '250 - 2,500 sq ft' },
];

export const PROJECT_DETAIL_METRICS: Record<string, ProjectDetailMetric[]> = Object.fromEntries(
  Object.entries(PROJECTS).map(([projectId, project]) => [
    projectId,
    project.detailMetrics ?? [],
  ])
);