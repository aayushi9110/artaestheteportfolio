export type StoryType = 'interior' | 'fine-art';

export type Deliverable = {
  icon: string;
  text: string;
};

export type ProjectMetric = {
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
  deliverableItems: Deliverable[];
  referenceImageUrls?: string[];
  galleryImageUrls: string[];
  galleryCaptions: string[];
};

const projectMetrics = (entries: Array<[string, string]>): ProjectMetric[] =>
  entries.map(([label, value]) => ({ label, value }));

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

export const PROJECT_DETAIL_METRICS: Record<string, ProjectMetric[]> = {
  homeOffices: projectMetrics([
    ['Approx. investment', '$18,000-$28,000'],
    ['Affiliated company', 'BoConcept'],
    ['Style direction', 'Modern study with soft Scandinavian warmth'],
    ['Expected build timeline', '6-8 weeks'],
    ['Client meetings', '4 design reviews + 1 installation call'],
    ['Space scope', 'Home office + guest-ready storage wall'],
    ['Procurement model', 'Designer-led sourcing and vendor coordination'],
    ['Key focus', 'Productivity, hidden storage, dual-purpose use']
  ]),
  contemporaryLiving: projectMetrics([
    ['Approx. investment', '$32,000-$48,000'],
    ['Affiliated company', 'West Elm'],
    ['Style direction', 'Modern organic California contemporary'],
    ['Expected build timeline', '10-12 weeks'],
    ['Client meetings', '5 design reviews + 1 styling walkthrough'],
    ['Space scope', 'Open-plan living and dining'],
    ['Furniture lead time', '8-10 weeks'],
    ['Key focus', 'Open flow, layered neutrals, sculptural accents']
  ]),
  modernScandinavian: projectMetrics([
    ['Approx. investment', '$28,000-$42,000'],
    ['Affiliated company', 'West Elm'],
    ['Style direction', 'Warm Scandinavian minimalism'],
    ['Expected build timeline', '8-10 weeks'],
    ['Client meetings', '4 design reviews + procurement check-in'],
    ['Space scope', 'Combined living and dining room'],
    ['Procurement model', 'Curated sourcing with phased delivery'],
    ['Key focus', 'Light, warmth, and understated material contrast']
  ]),
  madisonDining: projectMetrics([
    ['Approx. investment', '$22,000-$36,000'],
    ['Affiliated company', 'BoConcept + Roche Bobois'],
    ['Style direction', 'Soft luxury dining'],
    ['Expected build timeline', '7-9 weeks'],
    ['Client meetings', '3 design reviews + 1 final styling session'],
    ['Space scope', 'Dedicated dining room'],
    ['Custom elements', 'Statement lighting and marble-led palette'],
    ['Key focus', 'Elegant entertaining with a sculptural city backdrop']
  ]),
  cuppertinoHome: projectMetrics([
    ['Approx. investment', '$36,000-$54,000'],
    ['Affiliated company', 'West Elm'],
    ['Style direction', 'Layered contemporary with Scandinavian notes'],
    ['Expected build timeline', '10-14 weeks'],
    ['Client meetings', '5 design reviews + installation planning'],
    ['Space scope', 'Family living room and dining room'],
    ['Procurement model', 'Full furniture, lighting, and accessories package'],
    ['Key focus', 'Warmth, family comfort, and personality-rich styling']
  ]),
  fosterCityLivingDining: projectMetrics([
    ['Approx. investment', '$30,000-$46,000'],
    ['Affiliated company', 'West Elm'],
    ['Style direction', 'Relaxed contemporary open-plan'],
    ['Expected build timeline', '9-11 weeks'],
    ['Client meetings', '4 design reviews + 1 install coordination call'],
    ['Space scope', 'Open-concept living and dining'],
    ['Project complexity', 'Medium - multi-zone layout balancing'],
    ['Key focus', 'Cohesion, circulation, and family-friendly elegance']
  ]),
  sanFranBedroom: projectMetrics([
    ['Approx. investment', '$14,000-$24,000'],
    ['Affiliated company', 'West Elm'],
    ['Style direction', 'Coastal luxury bedroom refresh'],
    ['Expected build timeline', '5-7 weeks'],
    ['Client meetings', '3 design reviews'],
    ['Space scope', 'Primary bedroom refresh'],
    ['Procurement model', 'Selective refresh with styling layer'],
    ['Key focus', 'Softness, light, and restorative comfort']
  ]),
  entryway: projectMetrics([
    ['Approx. investment', '$4,000-$9,000'],
    ['Affiliated company', 'West Elm'],
    ['Style direction', 'Warm California entry styling'],
    ['Expected build timeline', '2-4 weeks'],
    ['Client meetings', '2 design reviews'],
    ['Space scope', 'Entry vignette and first impression zone'],
    ['Procurement model', 'Quick-turn styling and accessory sourcing'],
    ['Key focus', 'Welcome moment, layering, and visual identity']
  ]),
  mumbaiBedroomOne: projectMetrics([
    ['Approx. investment', '$10,000-$18,000'],
    ['Affiliated company', 'Local procurement partners'],
    ['Style direction', 'Contemporary calm bedroom'],
    ['Expected build timeline', '6-8 weeks'],
    ['Client meetings', '4 design reviews'],
    ['Space scope', 'Bedroom concept + media wall styling'],
    ['Materials focus', 'Neutrals, upholstery, warm accent finishes'],
    ['Key focus', 'Restful luxury with daily functionality']
  ]),
  mumbaiBedroomTwo: projectMetrics([
    ['Approx. investment', '$9,000-$16,000'],
    ['Affiliated company', 'Local procurement partners'],
    ['Style direction', 'Soft contemporary bedroom'],
    ['Expected build timeline', '5-7 weeks'],
    ['Client meetings', '3 design reviews + curtain finish review'],
    ['Space scope', 'Compact bedroom refresh'],
    ['Materials focus', 'Layered drapery, tonal fabrics, warm wood'],
    ['Key focus', 'Comfort, intimacy, and light diffusion']
  ]),
  mumbaiBedroomThree: projectMetrics([
    ['Approx. investment', '$11,000-$19,000'],
    ['Affiliated company', 'Local procurement partners'],
    ['Style direction', 'Refined contemporary luxe bedroom'],
    ['Expected build timeline', '6-8 weeks'],
    ['Client meetings', '4 design reviews + final styling review'],
    ['Space scope', 'Bedroom concept with bespoke bedside styling'],
    ['Custom emphasis', 'Layered bedside detailing and tactile finishes'],
    ['Key focus', 'Quiet luxury through texture and rhythm']
  ])
};

export const PROJECTS: Record<string, Project> = {
  // amber: {
  //   storyType: 'interior',
  //   isSelectedForHome: false,
  //   homeVisibilityPriority: 99,
  //   title: 'The Amber Salon',
  //   location: 'New York, NY - Virtual Design',
  //   tagLabels: ['Interior Design', 'Virtual Consultation', 'Living Room'],
  //   heroImageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1400&q=80',
  //   beforeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  //   afterImageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
  //   overviewTitle: 'A Manhattan apartment, transformed from sterile to soulful',
  //   overviewTextPrimary: 'Our client had lived in her West Village apartment for three years and still did not feel at home. The bones were beautiful - high ceilings, north-facing light - but the furniture was placeholder and the walls had never quite been decided. She came to Art Aesthete for a virtual redesign.',
  //   overviewTextSecondary: 'The challenge was warmth. Manhattan apartments can feel clinical if the materials do not work hard. We introduced amber plaster tones, layered natural textiles, and anchored the room with an oversized linen sofa and a commissioned oil painting from a Brooklyn artist.',
  //   deliverableItems: [
  //     { icon: '01', text: 'Moodboard & Concept Direction' },
  //     { icon: '02', text: 'Floor Plan & Furniture Layout' },
  //     { icon: '03', text: 'Full Furniture & Decor Selections' },
  //     { icon: '04', text: 'Custom Color Palette & Paint Guide' },
  //     { icon: '05', text: 'Shopping List with Direct Links' },
  //     { icon: '06', text: 'Room-by-Room Installation Guide' }
  //   ],
  //   galleryImageUrls: [
  //     'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
  //     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
  //     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80',
  //     'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80',
  //     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80'
  //   ],
  //   galleryCaptions: ['Living room - final install', 'Detail: linen sofa & throw', 'Art placement - north wall', 'Reading corner at dusk', 'Entryway styling']
  // },
  // terra: {
  //   storyType: 'interior',
  //   isSelectedForHome: true,
  //   homeVisibilityPriority: 4,
  //   title: 'Terracotta Living - Coastal Calm',
  //   location: 'Malibu, California - Virtual Design',
  //   tagLabels: ['Interior Design', 'Virtual Consultation', 'Living Room', 'Bedroom'],
  //   heroImageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80',
  //   beforeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  //   afterImageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  //   overviewTitle: 'A Malibu home asking to breathe with the landscape',
  //   overviewTextPrimary: 'A young family relocating from New York needed their Malibu rental to feel like a home - not a holiday house. The brief was warmth without weight, colour without clash, and furnishings that could live with sand and sun.',
  //   overviewTextSecondary: 'We built the palette around terracotta, warm white, and bleached oak. Every piece was chosen for ease and beauty equally - materials that would age gracefully, look effortless, and survive a Californian summer.',
  //   deliverableItems: [
  //     { icon: '01', text: 'Full Moodboard - Coastal Warmth Direction' },
  //     { icon: '02', text: 'Multi-Room Floor Plans' },
  //     { icon: '03', text: 'Furniture Selections - 3 Rooms' },
  //     { icon: '04', text: 'Color Palette & Paint Specs' },
  //     { icon: '05', text: 'Materials Guide - Textiles & Flooring' },
  //     { icon: '06', text: 'Full Installation & Styling Guide' }
  //   ],
  //   galleryImageUrls: [
  //     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
  //     'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
  //     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80',
  //     'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80',
  //     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80'
  //   ],
  //   galleryCaptions: ['Living room - final', 'Dining area styling', 'Art wall detail', 'Master bedroom', 'Outdoor living extension']
  // },
  // nordic: {
  //   storyType: 'interior',
  //   isSelectedForHome: false,
  //   homeVisibilityPriority: 99,
  //   title: 'Warm Nordic Study',
  //   location: 'Mayfair, London - In-Person',
  //   tagLabels: ['Interior Design', 'Home Office', 'In-Person'],
  //   heroImageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80',
  //   beforeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  //   afterImageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  //   overviewTitle: 'A Mayfair study redesigned around thought and stillness',
  //   overviewTextPrimary: 'A literary agent working from home needed a study that felt like a room worth working in. The original space was functional but uninspiring - flat colours, uninspired shelving, a desk facing a blank wall.',
  //   overviewTextSecondary: 'We rebuilt it with intention: smoked oak shelving, a bespoke reading chair in cognac leather, a textile print commission, and a palette that shifts from pale ash in the morning to amber warmth by evening.',
  //   deliverableItems: [
  //     { icon: '01', text: 'Moodboard - Warm Nordic Concept' },
  //     { icon: '02', text: 'Full Space Plan & Shelving Design' },
  //     { icon: '03', text: 'Bespoke Furniture Sourcing' },
  //     { icon: '04', text: 'Color & Material Palette' },
  //     { icon: '05', text: 'Art Commission Coordination' },
  //     { icon: '06', text: 'Installation Management' }
  //   ],
  //   referenceImageUrls: BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS,
  //   galleryImageUrls: [
  //     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80',
  //     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
  //     'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
  //     'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80',
  //     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80'
  //   ],
  //   galleryCaptions: ['Study - full view', 'Shelving detail', 'Reading corner', 'Desk at the window', 'Art placement']
  // },
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
    deliverableItems: [
      { icon: '01', text: 'Bespoke Furniture Sourcing' },
      { icon: '02', text: 'Moodboard' },
      { icon: '03', text: 'Full Space Plan' },
      { icon: '04', text: 'Color & Material Palette' },
      { icon: '05', text: 'Art Commission Coordination' },
      { icon: '06', text: 'Installation Management' }
    ],
    galleryImageUrls: BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS,
    galleryCaptions: [
      'Guest bedroom before transformation',
      'Guest bedroom after transformation',
      'Functional styling details',
      'Desk and hidden storage details',
      'Bookcase and cabinet details',
      'Sofabed pull-out detail',
      'Office view with natural light'
    ]
  },
  contemporaryLiving: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 3,
    title: 'Contemporary Living',
    location: 'Palo Alto, California - Open Concept Living Room Design',
    tagLabels: ['California Contemporary',' Open Concept Living',' Modern Living Room Design','Interior Design', 'Contemporary Home Styling','West Elm'],
    heroImageUrl: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS[2],
    beforeImageUrl: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS[1],
    afterImageUrl: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS[0],
    overviewTitle: 'A warm, modern sanctuary where natural light and organic textures shape effortless living.',
    overviewTextPrimary: 'This Modern Organic living space blends clean contemporary architecture with earthy warmth. Floor to ceiling windows, natural materials, and a soft neutral palette create an airy, grounded atmosphere. Plush seating, sculptural décor, and an open layout connect comfort with sophistication, making the space feel both inviting and refined.',
    overviewTextSecondary: 'A serene, light filled retreat designed for modern living with timeless ease.',
    deliverableItems: [
      { icon: '01', text: 'Moodboard - Warm Contemporary Concept' },
      { icon: '02', text: 'Space Planning - Open Concept Layout' },
      { icon: '03', text: 'Furniture Selection - Modern Organic Pieces' },
      { icon: '04', text: 'Color & Material Palette - Neutral, Earthy and Accent Tones' },
      { icon: '05', text: 'Lighting Design - Natural & Ambient' },
      { icon: '06', text: 'Styling & Accessories - Sculptural Décor' }
    ],
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
    ]
  },
  modernScandinavian: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 2,
    title: 'Modern Scandinavian Living & Dining',
    location: 'San Jose, California',
    tagLabels: ['Interior Design', 'Warm Scandinavian','Organic Contemporary', 'West Elm', 'Living', 'Dining'],
    heroImageUrl: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS[1],
    beforeImageUrl: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS[0],
    afterImageUrl: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS[3],
    overviewTitle: 'Modern Minimalist with Scandinavian Warmth',
    overviewTextPrimary: 'This Modern Minimalist living–dining space blends Scandinavian warmth with clean contemporary lines. Soft neutrals, natural wood, and airy sheer curtains create a calm, inviting atmosphere filled with natural light. The open layout connects the lounge and dining areas seamlessly, while organic textures, greenery, and sculptural lighting add depth and quiet sophistication..',
    overviewTextSecondary: 'A serene, balanced interior designed for modern living with understated elegance.',
    deliverableItems: [
      { icon: '01', text: 'Moodboard - Warm Scandinavian Concept' },
      { icon: '02', text: 'Space Planning - Open Concept Layout' },
      { icon: '03', text: 'Furniture Selection - Modern Organic Pieces' },
      { icon: '04', text: 'Color & Material Palette - Neutral, Sand and Wooden tones' },
      { icon: '05', text: 'Lighting Design - Natural & Ambient' },
      { icon: '06', text: 'Styling & Accessories - Sculptural Décor' }
    ],
    referenceImageUrls: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS,
    galleryImageUrls: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS,
    galleryCaptions: [
      'Space Before the transformation',
      'A bright, breathable living room shaped by natural materials and understated design',
      'A dining area with sculptural lighting and organic textures',
      'Warm woods, clean Nordic lines',
      'Soft neutrals, modern Nordic warmth'
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
    deliverableItems: [
      { icon: '01', text: 'Moodboard' },
      { icon: '02', text: 'Space Layout' },
      { icon: '03', text: 'Furniture Selection and Installation' },
      { icon: '04', text: 'Color & Material Palette' },
      { icon: '05', text: 'Lighting' },
      { icon: '06', text: 'Styling & Accessories' }
    ],
    referenceImageUrls: ROCHEBOBOIS_DINING_IMAGE_URLS,
    galleryImageUrls: ROCHEBOBOIS_DINING_IMAGE_URLS,
    galleryCaptions: [
      'Dining Room before any interior upgrades',
      'Madison Dining Space after transformation',
      'Serenity and sculptural design details in the dining room'
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
    deliverableItems: [
      { icon: '01', text: 'Moodboard' },
      { icon: '02', text: 'Space Layout' },
      { icon: '03', text: 'Furniture Selection and Installation' },
      { icon: '04', text: 'Color & Material Palette' },
      { icon: '05', text: 'Lighting' },
      { icon: '06', text: 'Styling & Accessories' }
    ],
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
    deliverableItems: [
      { icon: '01', text: 'Layout Planning' },
      { icon: '02', text: 'Furniture Selection' },
      { icon: '03', text: 'Lighting Design' },
      { icon: '04', text: 'Material Palette' },
      { icon: '05', text: 'Styling & Accessories' },
      { icon: '06', text: 'Final Installation' }
    ],
    referenceImageUrls: FOSTER_CITY_LIVING_DINING_IMAGE_URLS,
    galleryImageUrls: FOSTER_CITY_LIVING_DINING_IMAGE_URLS,
    galleryCaptions: [
      'Space after the transformation',
      'Space before the transformation',
      'Soft edges meeting striking contrast',
      'Pure calm in connected space',
      'Spaces breathing in gentle harmony'
    ]
  },
  sanFranBedroom: {
    storyType: 'interior',
    isSelectedForHome: false,
    homeVisibilityPriority: 99,
    title: 'San Francisco Bedroom Refresh',
    location: 'San Francisco, California - Bedroom Refresh',
    tagLabels: ['Interior Design','California style', 'West Elm', 'Bedroom'],
    heroImageUrl: WESTELM_SAN_FRAN_IMAGE_URLS[0],
    beforeImageUrl: WESTELM_SAN_FRAN_IMAGE_URLS[1],
    afterImageUrl: WESTELM_SAN_FRAN_IMAGE_URLS[2],
    overviewTitle: 'Calm, coastal luxury shaped in softness.',
    overviewTextPrimary: 'This bedroom is designed as a serene retreat, where soft tones, layered textures, and natural light create a sense of effortless calm. The upholstered headboard, warm wood accents, and sculptural décor bring depth without overwhelming the space. Floor‑to‑ceiling windows open to a breathtaking coastal view, allowing the room to feel expansive, grounded, and deeply restorative.',
    overviewTextSecondary: 'Every detail supports a feeling of quiet luxury and lived‑in ease.',
    deliverableItems: [
      { icon: '01', text: 'Moodboard' },
      { icon: '02', text: 'Furniture Selection and Refresh' },
      { icon: '03', text: 'Styling & Accessories' },
      { icon: '04', text: 'Material Palette' },
    ],
    referenceImageUrls: WESTELM_SAN_FRAN_IMAGE_URLS,
    galleryImageUrls: WESTELM_SAN_FRAN_IMAGE_URLS,
    galleryCaptions: [
      'Calm, coastal luxury shaped in softness.',
      'Space before the refresh',
      'Space after the refresh'
    ]
  },
  entryway: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 9,
    title: 'Welcoming Entryway',
    location: 'Anahiem, CA - Entryway Styling',
    tagLabels: ['Interior Design', 'California', 'West Elm', 'Entryway', 'Anaheim', ],
    heroImageUrl: WESTELM_ENTRYWAY_IMAGE_URLS[1],
    beforeImageUrl: WESTELM_ENTRYWAY_IMAGE_URLS[0],
    afterImageUrl: WESTELM_ENTRYWAY_IMAGE_URLS[1],
    overviewTitle: 'A warm welcome shaped with intention.',
    overviewTextPrimary: 'The deep green door adds a quiet richness, while the woven pendant, sculptural accents, and layered greenery bring warmth and personality. Every detail works together to create a calm, curated first impression that feels both modern and soulful.',
    overviewTextSecondary: 'Every detail works together to create a calm, curated first impression that feels both modern and soulful.',
    deliverableItems:[],
    referenceImageUrls: WESTELM_ENTRYWAY_IMAGE_URLS,
    galleryImageUrls: WESTELM_ENTRYWAY_IMAGE_URLS,
    galleryCaptions: [
      'Entryway before styling',
      'Entryway after styling'
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
    deliverableItems: [
      { icon: '01', text: 'Concept Moodboard & Visual Direction' },
      { icon: '02', text: 'Bedroom Layout Refinement' },
      { icon: '03', text: 'Furniture & Decor Selection' },
      { icon: '04', text: 'Textile and Material Palette' },
      { icon: '05', text: 'Lighting and Accent Styling' },
      { icon: '06', text: 'Final Styling Curation' }
    ],
    referenceImageUrls: MUMBAI_BEDROOM_IMAGE_URLS,
    galleryImageUrls: MUMBAI_BEDROOM_IMAGE_URLS,
    galleryCaptions: [
      'Bedroom before the transformation',
      'Bedroom after transformation',
      'Detail view with layered textures',
      'Bedroom full view',
      'Media wall styling detail'
    ]
  },
  mumbaiBedroomTwo: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 11,
    title: 'Compact Bedroom',
    location: 'Mumbai, India  (Project 2)',
    tagLabels: ['Interior Design', 'Bedroom', 'Mumbai', 'Contemporary', ],
    heroImageUrl: MUMBAI_BEDROOM_TWO_IMAGE_URLS[2],
    beforeImageUrl: MUMBAI_BEDROOM_TWO_IMAGE_URLS[0],
    afterImageUrl: MUMBAI_BEDROOM_TWO_IMAGE_URLS[0],
    overviewTitle: 'A light-filled bedroom with warm drapery and quiet detailing.',
    overviewTextPrimary: 'Project 2 explores a softer bedroom palette with layered fabrics, warm light filtering, and curated accents that add depth without visual noise.',
    overviewTextSecondary: 'The result is a serene, intimate space that feels composed, practical, and deeply comfortable.',
    deliverableItems: [
      { icon: '01', text: 'Concept Moodboard & Visual Direction' },
      { icon: '02', text: 'Bedroom Layout Refinement' },
      { icon: '03', text: 'Furniture & Decor Selection' },
      { icon: '04', text: 'Textile and Material Palette' },
      { icon: '05', text: 'Lighting and Accent Styling' },
      { icon: '06', text: 'Final Styling Curation' }
    ],
    referenceImageUrls: MUMBAI_BEDROOM_TWO_IMAGE_URLS,
    galleryImageUrls: MUMBAI_BEDROOM_TWO_IMAGE_URLS,
    galleryCaptions: [
      'Mumbai bedroom set 2 - full composition',
      'Set 2 curtain and light detail',
      'Set 2 close-up detail',
      'Set 2 bed styling detail'
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
    deliverableItems: [
      { icon: '01', text: 'Concept Moodboard & Visual Direction' },
      { icon: '02', text: 'Bedroom Layout Refinement' },
      { icon: '03', text: 'Furniture & Decor Selection' },
      { icon: '04', text: 'Textile and Material Palette' },
      { icon: '05', text: 'Lighting and Accent Styling' },
      { icon: '06', text: 'Final Styling Curation' }
    ],
    referenceImageUrls: MUMBAI_BEDROOM_THREE_IMAGE_URLS,
    galleryImageUrls: MUMBAI_BEDROOM_THREE_IMAGE_URLS,
    galleryCaptions: [
      'Mumbai bedroom set 3 - full composition',
      'Set 3 nightstand detail',
      'Set 3 texture detail',
      'Set 3 complete bedroom view'
    ]
  },
  // linen: {
  //   storyType: 'interior',
  //   isSelectedForHome: false,
  //   homeVisibilityPriority: 99,
  //   title: 'Linen & Oak',
  //   location: 'Paris, France - In-Person',
  //   tagLabels: ['Interior Design', 'Living Room', 'Dining', 'In-Person'],
  //   heroImageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80',
  //   beforeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  //   afterImageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  //   overviewTitle: 'A Parisian apartment returned to its quiet confidence',
  //   overviewTextPrimary: 'The apartment had good bones but an identity crisis - too modern for the Haussmann building, too sparse for the clients\' love of layered living. The result felt neither one thing nor another.',
  //   overviewTextSecondary: 'We anchored the space with aged oak, undyed linen, and an edited collection of European antiques. The rooms now feel collected over generations - not designed in an afternoon.',
  //   deliverableItems: [
  //     { icon: '01', text: 'Quiet European Luxury Concept Board' },
  //     { icon: '02', text: 'Open-Plan Floor Plan & Zoning' },
  //     { icon: '03', text: 'Furniture Mix - Antique + Contemporary' },
  //     { icon: '04', text: 'Custom Plaster Color Guide' },
  //     { icon: '05', text: 'Art Curation - Original Works' },
  //     { icon: '06', text: 'Installation Management' }
  //   ],
  //   galleryImageUrls: [
  //     'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80',
  //     'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
  //     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80',
  //     'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80',
  //     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80'
  //   ],
  //   galleryCaptions: ['Living room - morning light', 'Dining area', 'Bookcase wall', 'Master bedroom detail', 'Entrance hall']
  // },
  // sand: {
  //   storyType: 'interior',
  //   isSelectedForHome: false,
  //   homeVisibilityPriority: 99,
  //   title: 'The Sand Suite',
  //   location: 'Dubai, UAE - In-Person',
  //   tagLabels: ['Interior Design', 'Suite Design', 'Hospitality Residential'],
  //   heroImageUrl: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=1400&q=80',
  //   beforeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  //   afterImageUrl: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80',
  //   overviewTitle: 'A Dubai suite designed with calm, sand-toned luxury',
  //   overviewTextPrimary: 'The client wanted a suite that felt elevated yet restful - a space inspired by boutique hospitality but grounded enough for everyday living. The original layout felt disjointed and visually busy, with too many competing finishes.',
  //   overviewTextSecondary: 'We rebuilt the room around tonal harmony: soft plaster hues, sculptural lighting, warm stone accents, and tailored upholstery. The result is a balanced suite with quiet drama and clear material rhythm.',
  //   deliverableItems: [
  //     { icon: '01', text: 'Concept Board - Sand & Stone Palette' },
  //     { icon: '02', text: 'Suite Layout & Functional Zoning' },
  //     { icon: '03', text: 'Furniture, Lighting & Finish Specification' },
  //     { icon: '04', text: 'Built-In Joinery Direction' },
  //     { icon: '05', text: 'Styling & Art Placement Plan' },
  //     { icon: '06', text: 'Final Installation Walkthrough' }
  //   ],
  //   galleryImageUrls: [
  //     'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80',
  //     'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80',
  //     'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
  //     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80',
  //     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80'
  //   ],
  //   galleryCaptions: ['Suite - overall reveal', 'Bedroom corner', 'Seating zone detail', 'Material and lighting balance', 'Final styling pass']
  // },
  // coastal: {
  //   storyType: 'interior',
  //   isSelectedForHome: false,
  //   homeVisibilityPriority: 99,
  //   title: 'Coastal Calm Living Room',
  //   location: 'Sydney, Australia - Virtual Design',
  //   tagLabels: ['Interior Design', 'Virtual Consultation', 'Living Room'],
  //   heroImageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=80',
  //   beforeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  //   afterImageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  //   overviewTitle: 'A Sydney living room shaped around breeze, light, and daily ease',
  //   overviewTextPrimary: 'This apartment had an exceptional view but the interior was not supporting it. Heavy furniture blocked movement, and the layout made the room feel smaller than it was. The brief asked for a living space that felt open, calm, and naturally bright from morning to evening.',
  //   overviewTextSecondary: 'We rebalanced the room using a low-profile seating plan, pale timber accents, and soft-textured layers that reflect natural light. The final space feels airy and grounded at the same time, with a layout designed for both quiet mornings and family evenings.',
  //   deliverableItems: [
  //     { icon: '01', text: 'Light-Led Concept & Moodboard' },
  //     { icon: '02', text: 'Living Room Layout Replan' },
  //     { icon: '03', text: 'Furniture & Decor Selections' },
  //     { icon: '04', text: 'Color and Textile Palette' },
  //     { icon: '05', text: 'Shopping List with Direct Links' },
  //     { icon: '06', text: 'Styling & Placement Guide' }
  //   ],
  //   galleryImageUrls: [
  //     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80',
  //     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
  //     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80',
  //     'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
  //     'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=700&q=80'
  //   ],
  //   galleryCaptions: ['Living room - final reveal', 'Sofa and circulation detail', 'Natural timber accents', 'Layered textures at sunset', 'Styling and finish balance']
  // },
  // earth: {
  //   storyType: 'fine-art',
  //   isSelectedForHome: false,
  //   homeVisibilityPriority: 99,
  //   title: 'Earth Tones Series',
  //   location: 'Gallery Commission - New York',
  //   tagLabels: ['Fine Art', 'Oil on Linen', 'Commissioned'],
  //   heroImageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1400&q=80',
  //   beforeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  //   afterImageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
  //   overviewTitle: 'A series of five oils commissioned for a Chelsea loft',
  //   overviewTextPrimary: 'A collector approached Art Aesthete to commission an original series for their newly redesigned loft. The brief: warm, earthy, abstract - art that would anchor each room without dominating it.',
  //   overviewTextSecondary: 'We collaborated with painter Rosa Medina on a five-piece series in oil on Belgian linen, each work echoing the apartment palette to create one continuous visual thread.',
  //   deliverableItems: [
  //     { icon: '01', text: 'Artist Brief & Concept Development' },
  //     { icon: '02', text: 'Palette Alignment with Interior' },
  //     { icon: '03', text: 'Series of Original Oil Paintings' },
  //     { icon: '04', text: 'Framing & Hanging Coordination' },
  //     { icon: '05', text: 'Art Documentation Photography' },
  //     { icon: '06', text: 'Certificate of Authenticity' }
  //   ],
  //   galleryImageUrls: [
  //     'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=700&q=80',
  //     'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700&q=80',
  //     'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=700&q=80',
  //     'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=700&q=80',
  //     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80'
  //   ],
  //   galleryCaptions: ['Earth Tones I', 'Earth Tones II', 'Clay Forms companion', 'In situ - living room', 'Texture detail']
  // },
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
    deliverableItems: [
      { icon: '01', text: 'Artist Briefing & Scope Definition' },
      { icon: '02', text: 'Pigment & Material Palette Curation' },
      { icon: '03', text: 'Original Large-Format Commission' },
      { icon: '04', text: 'Framing, Glazing & Hanging' },
      { icon: '05', text: 'Art Documentation' },
      { icon: '06', text: 'Provenance & Certificate' }
    ],
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
    deliverableItems: [
      { icon: '01', text: 'Cer amicist Brief & Scale Reference' },
      { icon: '02', text: 'Glaze & Finish Curation' },
      { icon: '03', text: 'Series of Handmade Sculptural Vessels' },
      { icon: '04', text: 'Custom Plinths & Placement Design' },
      { icon: '05', text: 'Still Life Photography' }
    ],
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