export type StoryType = 'interior' | 'fine-art';

export type Deliverable = {
  icon: string;
  text: string;
};

export type ProjectDetailMetric = {
  label: string;
  value: string;
};

export type GalleryItem = {
  url: string;
  caption: string;
};

export type Project = {
  storyType: StoryType;
  isSelectedForHome: boolean;
  isSelectedForPdf: boolean;
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
  galleryItems: GalleryItem[];
  detailMetrics?: ProjectDetailMetric[];
};

const BOCONCEPT_OFFICE_REFERENCE_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/Boconcept/office/OfficeBefore.png', caption: 'Guest bedroom before transformation' },
  { url: '/images/Boconcept/office/boconcept-bright-office-view-1.png', caption: 'Guest bedroom after transformation' },
  { url: '/images/Boconcept/office/boconcept-c-table-details.png', caption: 'Functional styling details' },
  { url: '/images/Boconcept/office/boconcept-desk-details.webp', caption: 'Desk and hidden storage details' },
  { url: '/images/Boconcept/office/boconcept-office-details-cabinet.png', caption: 'Bookcase and cabinet details' },
  { url: '/images/Boconcept/office/boconcept-office-sofabed-pull-2.png', caption: 'Sofabed pull-out detail' },
  { url: '/images/Boconcept/office/boconcept-office-view-2.png', caption: 'Office view with natural light' }
];

const WESTELM_CONTEMPORARY_LIVING_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/WestElm/contemporaryLiving/westelm-project.png', caption: 'Living and DiningSpace after transformation' },
  { url: '/images/WestElm/contemporaryLiving/WestElmPaloAltoEmpty.png', caption: 'Empty space before transformation' },
  { url: '/images/WestElm/contemporaryLiving/westelm-details.webp', caption: 'Beautiful details and material balance in the living room' },
  { url: '/images/WestElm/contemporaryLiving/westelm-dining-1.png', caption: 'Dining area with sculptural lighting and beautiful textures' },
  { url: '/images/WestElm/contemporaryLiving/westelm-dining-pa-phone.png', caption: 'Dining area' },
  { url: '/images/WestElm/contemporaryLiving/westelm-dining.png', caption: 'Dining area with natural light and organic textures' },
  { url: '/images/WestElm/contemporaryLiving/westelm-project-details.png', caption: 'Layered details' },
  { url: '/images/WestElm/contemporaryLiving/westelm-project-living-room.png', caption: 'Living room area for warm hosting and quiet evenings' },
  { url: '/images/WestElm/contemporaryLiving/westelm-project-living.png', caption: 'A modern, light filled space shaped by elegance' },
  { url: '/images/WestElm/contemporaryLiving/westelm-project-perspective.png', caption: 'Modern living softened by light, texture' },
  { url: '/images/WestElm/contemporaryLiving/westelm-sofa-detail.png', caption: 'A quiet statement piece' }
];

const WESTELM_MID_CENTURY_MODERN_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/WestElm/midCenturyModern/sanJoseBefore.png', caption: 'Space Before the transformation' },
  { url: '/images/WestElm/midCenturyModern/westelm-project-living-view-2.png', caption: 'A bright, breathable living room shaped by natural materials and understated design' },
  { url: '/images/WestElm/midCenturyModern/westelm-dining-project-1-chandelier.png', caption: 'A dining area with sculptural lighting and organic textures' },
  { url: '/images/WestElm/midCenturyModern/westelm-living-dining-project-1.png', caption: 'Warm woods, clean Nordic lines' },
  { url: '/images/WestElm/midCenturyModern/westelm-living-project.png', caption: 'Soft neutrals, modern Nordic warmth' },
];

const ROCHEBOBOIS_DINING_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/Boconcept/office/rocheboboisDining/MadisonDiningflowy.webp', caption: 'Dining Room before any interior upgrades' },
  { url: '/images/Boconcept/office/rocheboboisDining/MadisonDiningBefore.png', caption: 'Madison Dining Space after transformation' },
  { url: '/images/Boconcept/office/rocheboboisDining/MadisonDining1After.png', caption: 'Serenity and sculptural design details in the dining room' }
];

const CUPPERTINO_HOME_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/WestElm/cuppertinoHome/CuppertinoSectional.png', caption: 'Warmth woven into modern clarity' },
  { url: '/images/WestElm/cuppertinoHome/CuppertinoEmptyview.png', caption: 'Space before the transformation' },
  { url: '/images/WestElm/cuppertinoHome/CuppertinoAfterView.png', caption: 'Space after the transformation' },
  { url: '/images/WestElm/cuppertinoHome/cuppertino-dining-view-1.png', caption: 'A tranquil dining haven where light, texture, and intention meet.' },
  { url: '/images/WestElm/cuppertinoHome/cuppertino-dining-view-2.png', caption: 'A Dining Space breathing quiet grace' },
  { url: '/images/WestElm/cuppertinoHome/cuppertino-dining-zoom.png', caption: 'The space flowing with quiet intention' },
  { url: '/images/WestElm/cuppertinoHome/CuppertinoLivingroom1.png', caption: 'Sunlit calm with layered warmth' },
  { url: '/images/WestElm/cuppertinoHome/Cuppertinoview3.png', caption: '' }
];

const FOSTER_CITY_LIVING_DINING_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/WestElm/fosterCityLivingDining/openLayPaloAltoViewHero.webp', caption: 'Space after the transformation' },
  { url: '/images/WestElm/fosterCityLivingDining/openLayoutBefore.png', caption: 'Space before the transformation' },
  { url: '/images/WestElm/fosterCityLivingDining/openLayoutPaloAltoAfter.png', caption: 'Soft edges meeting striking contrast' },
  { url: '/images/WestElm/fosterCityLivingDining/openLayPaloAltoDining.png', caption: 'Pure calm in connected space' },
  { url: '/images/WestElm/fosterCityLivingDining/openLayPaloAltoview2.png', caption: 'Spaces breathing in gentle harmony' }
];

const WESTELM_SAN_FRAN_GALLERY_ITEM: GalleryItem[] = [
  {
    url: '/images/WestElm/SanFran/sanFransicoBedviewHero.png',
    caption: 'Calm, coastal luxury shaped in softness.'
  },
  {
    url: '/images/WestElm/SanFran/sanFransicoBedroomBefore.png',
    caption: 'Space before the refresh'
  },
  {
    url: '/images/WestElm/SanFran/sanFransicoBedroomAfter.png',
    caption: 'Space after the refresh'
  }
];

const WESTELM_ENTRYWAY_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/WestElm/entryway/emptyCuppertinoEntryway.png', caption: 'Entryway before styling' },
  { url: '/images/WestElm/entryway/CuppertinoEntryway.png', caption: 'Entryway after styling' }
];

const MUMBAI_BEDROOM_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/mumbai/mumbaibefore.png', caption: 'Bedroom before the transformation' },
  { url: '/images/mumbai/bedroomMumbaiDetailhero.png', caption: 'Bedroom after transformation' },
  { url: '/images/mumbai/bedroomMumbaiDetailright.png', caption: 'Detail view with layered textures' },
  { url: '/images/mumbai/bedroomMumbai.png', caption: 'Bedroom full view' },
  { url: '/images/mumbai/mumbaiMedia.png', caption: 'Media wall styling detail' }
];

const MUMBAI_BEDROOM_TWO_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/mumbaibed2/mumbaiBed2.png', caption: 'Mumbai bedroom set 2 - full composition' },
  { url: '/images/mumbaibed2/mumbaiBed2curtaind.png', caption: 'Set 2 curtain and light detail' },
  { url: '/images/mumbaibed2/mumbaiBed2detail.webp', caption: 'Set 2 close-up detail' },
  { url: '/images/mumbaibed2/mumbaiDetailbed2.png', caption: 'Set 2 bed styling detail' }
];

const MUMBAI_BEDROOM_THREE_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/mumbaibed3/mumbaibed3.png', caption: 'Mumbai bedroom set 3 - full composition' },
  { url: '/images/mumbaibed3/mumbaibed3nightstanddetail.webp', caption: 'Set 3 texture detail' },
  { url: '/images/mumbaibed3/mumbaiBed3whole.png', caption: 'Set 3 complete bedroom view' }
];


const PAINTING_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/painting/padmavati.png', caption: 'Padmavati — original painting' },
  { url: '/images/painting/fireWithin.png', caption: 'Fire Within — original painting' },
  { url: '/images/painting/aWarrior.png', caption: 'A Warrior — original painting' },
  { url: '/images/painting/familyPortraitclient.png', caption: 'Family Portrait — in client\'s home' },
];

const CHARCOAL_ART_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/painting/aThinLine.webp', caption: 'A Thin Line — Conceptual Charcoal Art' },
  { url: '/images/painting/aThinLineclient.png', caption: 'A Thin Line — in client\'s home' },
];

const ORANGE_SERIES_ART_GALLERY_ITEM: GalleryItem[] = [
  { url: '/images/painting/orangeSeries.png', caption: 'Orange Series — studio view' },
  { url: '/images/painting/orangeSeriesMumbaihome.webp', caption: 'Orange Series — Mumbai home installation' },
];

export const PROJECTS: Record<string, Project> = {
  homeOffices: {
    storyType: 'interior',
    isSelectedForHome: true,
    isSelectedForPdf: true,
    homeVisibilityPriority: 8,
    title: 'Home Office',
    location: 'Menlo Park, California -The Modern Study - Virtual',
    tagLabels: ['Interior Design', 'Home Office Design', 'Workspace', 'Productivity Zone', 'Bo Concept'],
    heroImageUrl: BOCONCEPT_OFFICE_REFERENCE_GALLERY_ITEM[3].url,
    beforeImageUrl: BOCONCEPT_OFFICE_REFERENCE_GALLERY_ITEM[0].url,
    afterImageUrl: BOCONCEPT_OFFICE_REFERENCE_GALLERY_ITEM[1].url,
    overviewTitle: 'A calm, modern home office designed for clarity, comfort, and effortless focus.',
    overviewTextPrimary: 'This home office concept is designed to feel like a sanctuary for focused work-a space where structure meets serenity. It supports the user\'s professional needs while nurturing creativity and emotional balance, making it an ideal environment for remote work, study, or personal projects.',
    overviewTextSecondary: 'A flexible retreat that powers your work and pampers your guests.',
    galleryItems: BOCONCEPT_OFFICE_REFERENCE_GALLERY_ITEM,
    detailMetrics: [
      { label: 'Approx Budget', value: '$18,000 - $28,000' },
      { label: 'Timeline', value: '6 - 8 Weeks' },
      { label: 'Space Scope', value: 'Home office + guest storage wall' },
      { label: 'Floor Area', value: '300 sq ft' },
    ]
  },
  contemporaryLiving: {
    storyType: 'interior',
    isSelectedForHome: true,
    isSelectedForPdf: true,
    homeVisibilityPriority: 3,
    title: 'Contemporary Living',
    location: 'Palo Alto, California - Open Concept Living Room Design',
    tagLabels: ['California Contemporary', ' Open Concept Living', ' Modern Living Room Design', 'Interior Design', 'Contemporary Home Styling', 'West Elm'],
    heroImageUrl: WESTELM_CONTEMPORARY_LIVING_GALLERY_ITEM[2].url,
    beforeImageUrl: WESTELM_CONTEMPORARY_LIVING_GALLERY_ITEM[1].url,
    afterImageUrl: WESTELM_CONTEMPORARY_LIVING_GALLERY_ITEM[0].url,
    overviewTitle: 'A warm, modern sanctuary where natural light and organic textures shape effortless living.',
    overviewTextPrimary: 'This Modern Organic living space blends clean contemporary architecture with earthy warmth. Floor to ceiling windows, natural materials, and a soft neutral palette create an airy, grounded atmosphere. Plush seating, sculptural decor, and an open layout connect comfort with sophistication, making the space feel both inviting and refined.',
    overviewTextSecondary: 'A serene, light filled retreat designed for modern living with timeless ease.',
    galleryItems: WESTELM_CONTEMPORARY_LIVING_GALLERY_ITEM,
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
    isSelectedForPdf: false,
    homeVisibilityPriority: 9,
    title: 'Modern Scandinavian Living & Dining',
    location: 'San Jose, California',
    tagLabels: ['Interior Design', 'Warm Scandinavian', 'Organic Contemporary', 'West Elm', 'Living', 'Dining'],
    heroImageUrl: WESTELM_MID_CENTURY_MODERN_GALLERY_ITEM[1].url,
    beforeImageUrl: WESTELM_MID_CENTURY_MODERN_GALLERY_ITEM[0].url,
    afterImageUrl: WESTELM_MID_CENTURY_MODERN_GALLERY_ITEM[3].url,
    overviewTitle: 'Modern Minimalist with Scandinavian Warmth',
    overviewTextPrimary: 'This Modern Minimalist living-dining space blends Scandinavian warmth with clean contemporary lines. Soft neutrals, natural wood, and airy sheer curtains create a calm, inviting atmosphere filled with natural light. The open layout connects the lounge and dining areas seamlessly, while organic textures, greenery, and sculptural lighting add depth and quiet sophistication..',
    overviewTextSecondary: 'A serene, balanced interior designed for modern living with understated elegance.',
    galleryItems: WESTELM_MID_CENTURY_MODERN_GALLERY_ITEM,
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
    isSelectedForPdf: true,
    homeVisibilityPriority: 6,
    title: 'Elevated Dining',
    location: 'Madison Ave NYC - Soft Luxury Dining.',
    tagLabels: ['Interior Design', 'Dining Room', 'BoConcept', 'Roche Bobois'],
    heroImageUrl: ROCHEBOBOIS_DINING_GALLERY_ITEM[0].url,
    beforeImageUrl: ROCHEBOBOIS_DINING_GALLERY_ITEM[1].url,
    afterImageUrl: ROCHEBOBOIS_DINING_GALLERY_ITEM[2].url,
    overviewTitle: 'Modern luxury shaped by soft light, sculptural design, and the rhythm of New York City.',
    overviewTextPrimary: 'A modern dining space anchored by a marble table, soft neutrals, and sweeping city views. Light, texture, and curated details create a calm, elevated atmosphere perfect for everyday living and intimate gatherings.',
    overviewTextSecondary: '- A serene pause in the middle of New York\'s endless motion.',
    galleryItems: ROCHEBOBOIS_DINING_GALLERY_ITEM,
    detailMetrics: [
      { label: 'Approx Budget', value: '$22,000 - $36,000' },
      { label: 'Timeline', value: '7 - 9 Weeks' },
      { label: 'Space Scope', value: 'Dedicated dining room' },
      { label: 'Floor Area', value: '' },
    ]
  },
  cuppertinoHome: {
    storyType: 'interior',
    isSelectedForHome: false,
    isSelectedForPdf: true,
    homeVisibilityPriority: 99,
    title: 'A warm fusion to reflect personal style',
    location: 'Mountain View, California - A warm fusion of contemporary styles for a family home',
    tagLabels: ['Interior Design', 'West Elm', 'Living Room', 'Dining Room'],
    heroImageUrl: CUPPERTINO_HOME_GALLERY_ITEM[0].url,
    beforeImageUrl: CUPPERTINO_HOME_GALLERY_ITEM[1].url,
    afterImageUrl: CUPPERTINO_HOME_GALLERY_ITEM[2].url,
    overviewTitle: 'Layered Contemporary and Scandinavian Influences for a family home',
    overviewTextPrimary: 'Soft neutrals, warm woods, and curated textures create a space that feels both grounded and expressive. The mix of sculptural seating, modern artwork, and subtle vintage notes gives the room a layered personality - relaxed, inviting, and quietly sophisticated..',
    overviewTextSecondary: 'Warm, nostalgic, cozy, and timeless with a modern twist.',
    galleryItems: CUPPERTINO_HOME_GALLERY_ITEM,
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
    isSelectedForPdf: true,
    homeVisibilityPriority: 2,
    title: 'Foster City Living- Dining',
    location: 'Foster City, California - An open-plan living and dining concept for a family home',
    tagLabels: ['Interior Design', 'West Elm', 'Open Layout', 'Living & Dining'],
    heroImageUrl: FOSTER_CITY_LIVING_DINING_GALLERY_ITEM[0].url,
    beforeImageUrl: FOSTER_CITY_LIVING_DINING_GALLERY_ITEM[1].url,
    afterImageUrl: FOSTER_CITY_LIVING_DINING_GALLERY_ITEM[2].url,
    overviewTitle: 'Comfort woven through open space.',
    overviewTextPrimary: ' Thoughtful details - from the sculptural lighting to the layered textiles and greenery - give the home a calm, lived-in elegance without ever feeling crowded.',
    overviewTextSecondary: 'This room is a modern, open-concept living space with a blend of soft contemporary comfort, natural materials, and subtle curated accents. It feels bright, relaxed, and thoughtfully connected to the dining area beyond.',
    galleryItems: FOSTER_CITY_LIVING_DINING_GALLERY_ITEM,
    detailMetrics: [
      { label: 'Approx Budget', value: '$30,000 - $46,000' },
      { label: 'Timeline', value: '9 - 11 Weeks' },
      { label: 'Space Scope', value: 'Open-concept living and dining' },
      { label: 'Floor Area', value: '' },
    ]
  },
  sanFranBedroom: {
    storyType: 'interior',
    isSelectedForHome: true,
    isSelectedForPdf: true,
    homeVisibilityPriority: 11,
    title: 'San Francisco Bedroom Refresh',
    location: 'San Francisco, California - Bedroom Refresh',
    tagLabels: ['Interior Design', 'California style', 'West Elm', 'Bedroom'],
    heroImageUrl: WESTELM_SAN_FRAN_GALLERY_ITEM[0].url,
    beforeImageUrl: WESTELM_SAN_FRAN_GALLERY_ITEM[1].url,
    afterImageUrl: WESTELM_SAN_FRAN_GALLERY_ITEM[2].url,
    overviewTitle: 'Calm, coastal luxury shaped in softness.',
    overviewTextPrimary: 'This bedroom is designed as a serene retreat, where soft tones, layered textures, and natural light create a sense of effortless calm. The upholstered headboard, warm wood accents, and sculptural decor bring depth without overwhelming the space. Floor-to-ceiling windows open to a breathtaking coastal view, allowing the room to feel expansive, grounded, and deeply restorative.',
    overviewTextSecondary: 'Every detail supports a feeling of quiet luxury and lived-in ease.',
    galleryItems: WESTELM_SAN_FRAN_GALLERY_ITEM,
    detailMetrics: [
      { label: 'Approx Budget', value: '$14,000 - $24,000' },
      { label: 'Timeline', value: '5 - 7 Weeks' },
      { label: 'Space Scope', value: 'Primary bedroom refresh' },
      { label: 'Floor Area', value: '' },
    ]
  },
  entryway: {
    storyType: 'interior',
    isSelectedForHome: false,
    isSelectedForPdf: false,
    homeVisibilityPriority: 99,
    title: 'Welcoming Entryway',
    location: 'Anahiem, CA - Entryway Styling',
    tagLabels: ['Interior Design', 'California', 'West Elm', 'Entryway', 'Anaheim',],
    heroImageUrl: WESTELM_ENTRYWAY_GALLERY_ITEM[1].url,
    beforeImageUrl: WESTELM_ENTRYWAY_GALLERY_ITEM[0].url,
    afterImageUrl: WESTELM_ENTRYWAY_GALLERY_ITEM[1].url,
    overviewTitle: 'A warm welcome shaped with intention.',
    overviewTextPrimary: 'The deep green door adds a quiet richness, while the woven pendant, sculptural accents, and layered greenery bring warmth and personality. Every detail works together to create a calm, curated first impression that feels both modern and soulful.',
    overviewTextSecondary: 'Every detail works together to create a calm, curated first impression that feels both modern and soulful.',
    galleryItems: WESTELM_ENTRYWAY_GALLERY_ITEM,
    detailMetrics: [
      { label: 'Approx Budget', value: '$4,000 - $9,000' },
      { label: 'Timeline', value: '2 - 4 Weeks' },
      { label: 'Space Scope', value: 'Entry vignette and first impression zone' },
      { label: 'Floor Area', value: '' },
    ]
  },
  mumbaiBedroomOne: {
    storyType: 'interior',
    isSelectedForHome: false,
    isSelectedForPdf: true,
    homeVisibilityPriority: 99,
    title: 'Bedroom Retreat I',
    location: 'Mumbai, India ',
    tagLabels: ['Interior Design', 'Bedroom', 'Mumbai', 'Contemporary', 'Project 1'],
    heroImageUrl: MUMBAI_BEDROOM_GALLERY_ITEM[1].url,
    beforeImageUrl: MUMBAI_BEDROOM_GALLERY_ITEM[0].url,
    afterImageUrl: MUMBAI_BEDROOM_GALLERY_ITEM[3].url,
    overviewTitle: 'A contemporary Mumbai bedroom with calm, layered restraint.',
    overviewTextPrimary: 'Project 1 focused on creating a clean and restful bedroom using a neutral base, gentle contrast, and tactile materials. The layout and visual balance were planned to support both comfort and everyday functionality.',
    overviewTextSecondary: 'Soft textures and warm details deliver a polished, welcoming retreat with a minimal contemporary feel.',
    galleryItems: MUMBAI_BEDROOM_GALLERY_ITEM,
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
    isSelectedForPdf: false,
    homeVisibilityPriority: 8,
    title: 'Compact Bedroom',
    location: 'Mumbai, India  (Project 2)',
    tagLabels: ['Interior Design', 'Bedroom', 'Mumbai', 'Contemporary',],
    heroImageUrl: MUMBAI_BEDROOM_TWO_GALLERY_ITEM[2].url,
    beforeImageUrl: MUMBAI_BEDROOM_TWO_GALLERY_ITEM[0].url,
    afterImageUrl: MUMBAI_BEDROOM_TWO_GALLERY_ITEM[0].url,
    overviewTitle: 'A light-filled bedroom with warm drapery and quiet detailing.',
    overviewTextPrimary: 'Project 2 explores a softer bedroom palette with layered fabrics, warm light filtering, and curated accents that add depth without visual noise.',
    overviewTextSecondary: 'The result is a serene, intimate space that feels composed, practical, and deeply comfortable.',
    galleryItems: MUMBAI_BEDROOM_TWO_GALLERY_ITEM,
    detailMetrics: [
      { label: 'Approx Budget', value: '$9,000 - $16,000' },
      { label: 'Timeline', value: '5 - 7 Weeks' },
      { label: 'Space Scope', value: 'Compact bedroom refresh' },
      { label: 'Floor Area', value: '' },
    ]
  },
  mumbaiBedroomThree: {
    storyType: 'interior',
    isSelectedForHome: false,
    isSelectedForPdf: false,
    homeVisibilityPriority: 99,
    title: 'Luxe Bedroom',
    location: 'Mumbai, India ',
    tagLabels: ['Interior Design', 'Bedroom', 'Mumbai', 'Contemporary', 'Luxury'],
    heroImageUrl: MUMBAI_BEDROOM_THREE_GALLERY_ITEM[1].url,
    beforeImageUrl: MUMBAI_BEDROOM_THREE_GALLERY_ITEM[2].url,
    afterImageUrl: MUMBAI_BEDROOM_THREE_GALLERY_ITEM[2].url,
    overviewTitle: 'A modern bedroom concept centered on texture and bedside detail.',
    overviewTextPrimary: 'Project 3 leans into refined detailing with carefully styled bedside elements, tonal layering, and a cohesive material story across the room.',
    overviewTextSecondary: 'The final design feels tailored and calm, with visual rhythm built through subtle contrast and texture.',
    galleryItems: MUMBAI_BEDROOM_THREE_GALLERY_ITEM,
    detailMetrics: [
      { label: 'Approx Budget', value: '$11,000 - $19,000' },
      { label: 'Timeline', value: '6 - 8 Weeks' },
      { label: 'Space Scope', value: 'Bedroom with bespoke bedside styling' },
      { label: 'Floor Area', value: '' },
    ]
  },
  allpaintings: {
    storyType: 'fine-art',
    isSelectedForHome: false,
    isSelectedForPdf: false,
    homeVisibilityPriority: 99,
    title: 'Original Painting Collection',
    location: 'All',
    tagLabels: ['Fine Art', 'Original Paintings', 'Commission', 'Oil on Canvas', 'Mixed Media'],
    heroImageUrl: PAINTING_GALLERY_ITEM[0].url,
    beforeImageUrl: PAINTING_GALLERY_ITEM[0].url,
    afterImageUrl: PAINTING_GALLERY_ITEM[0].url,
    overviewTitle: 'Paintings rooted in emotion, mythology, and the quiet power of colour.',
    overviewTextPrimary: 'Each painting is an original work — commission or studio piece — drawing from personal iconography, cultural memory, and an instinctive relationship with colour. Figures, landscapes, and abstractions intersect across the series, bridging interior and emotional worlds.',
    overviewTextSecondary: 'Every canvas carries its own narrative. These works have been placed in private homes across India, the UK, and the United States.',
    galleryItems: PAINTING_GALLERY_ITEM,
  },
  thinlineCharcoal: {
    storyType: 'fine-art',
    isSelectedForHome: true,
    isSelectedForPdf: true,
    homeVisibilityPriority: 1,
    title: 'A Thin line',
    location: 'An Expo in Bandra, Mumbai',
    tagLabels: ['Fine Art', 'Charcoal', 'Original Painting', 'Conceptual'],
    heroImageUrl: CHARCOAL_ART_GALLERY_ITEM[0].url,
    beforeImageUrl: CHARCOAL_ART_GALLERY_ITEM[0].url,
    afterImageUrl: CHARCOAL_ART_GALLERY_ITEM[0].url,
    overviewTitle: 'Paintings rooted in emotion, mythology, and the quiet power of colour.',
    overviewTextPrimary: 'Each painting is an original work — commission or studio piece — drawing from personal iconography, cultural memory, and an instinctive relationship with colour. Figures, landscapes, and abstractions intersect across the series, bridging interior and emotional worlds.',
    overviewTextSecondary: 'Every canvas carries its own narrative. These works have been placed in private homes across India, the UK, and the United States.',
    galleryItems: CHARCOAL_ART_GALLERY_ITEM
  },
  orangeSeriesPainting: {
    storyType: 'fine-art',
    isSelectedForHome: true,
    isSelectedForPdf: true,
    homeVisibilityPriority: 12,
    title: 'The Oranges',
    location: 'Marine lines, Mumbai',
    tagLabels: ['Fine Art', 'Original Painting', 'Mixed media', 'Conceptual'],
    heroImageUrl: ORANGE_SERIES_ART_GALLERY_ITEM[1].url,
    beforeImageUrl: ORANGE_SERIES_ART_GALLERY_ITEM[0].url,
    afterImageUrl: ORANGE_SERIES_ART_GALLERY_ITEM[0].url,
    overviewTitle: 'Paintings rooted in emotion, mythology, and the quiet power of colour.',
    overviewTextPrimary: 'Each painting is an original work — commission or studio piece — drawing from personal iconography, cultural memory, and an instinctive relationship with colour. Figures, landscapes, and abstractions intersect across the series, bridging interior and emotional worlds.',
    overviewTextSecondary: 'Every canvas carries its own narrative. These works have been placed in private homes across India, the UK, and the United States.',
    galleryItems: ORANGE_SERIES_ART_GALLERY_ITEM
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

