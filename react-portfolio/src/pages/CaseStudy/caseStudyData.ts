export type StoryType = 'interior' | 'fine-art';

export type Deliverable = {
  icon: string;
  text: string;
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

const BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS = [
  '/images/Boconcept/office/OfficeBefore.png',
  '/images/Boconcept/office/boconcept-bright-office-view-1.png',
  '/images/Boconcept/office/boconcept-c-table-details.png',
  '/images/Boconcept/office/boconcept-desk-details.png',
  '/images/Boconcept/office/boconcept-office-details-cabinet.png',
  '/images/Boconcept/office/boconcept-office-details-corner.png',
  '/images/Boconcept/office/boconcept-office-room.png',
  '/images/Boconcept/office/boconcept-office-sofabed-pull-2.png',
  '/images/Boconcept/office/boconcept-office-view-2.png'
];

const WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS = [
  '/images/WestElm/contemporaryLiving/westelm-details.png' ,
  '/images/WestElm/contemporaryLiving/westelm-dining-1.png',
  '/images/WestElm/contemporaryLiving/westelm-dining-pa-phone.png',
  '/images/WestElm/contemporaryLiving/westelm-dining.png',
  '/images/WestElm/contemporaryLiving/westelm-project-details.png',
  '/images/WestElm/contemporaryLiving/westelm-project-living-room.png',
  '/images/WestElm/contemporaryLiving/westelm-project-living.png',
  '/images/WestElm/contemporaryLiving/westelm-project-perspective.png',
  '/images/WestElm/contemporaryLiving/westelm-project.png',
  '/images/WestElm/contemporaryLiving/westelm-sofa-detail.png'
];

const WESTELM_MID_CENTURY_MODERN_IMAGE_URLS = [
  '/images/WestElm/midCenturyModern/westelm-living-dining-project-1.png',
  '/images/WestElm/midCenturyModern/westelm-dining-project-1-chandelier.png',
  '/images/WestElm/midCenturyModern/westelm-great-room.png',
  '/images/WestElm/midCenturyModern/westelm-project-living-view-2.png',
  '/images/WestElm/midCenturyModern/westelm-living-project-1.png',
  '/images/WestElm/midCenturyModern/westelm-living-project.png'  
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
    title: 'BoConcept Home Office Decor',
    location: 'San Jose, California - Home office of the dreams - Virtual',
    tagLabels: ['Interior Design', 'Office Design', 'Workspace', 'Bo Concept'],
    heroImageUrl: BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS[3],
    beforeImageUrl: BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS[0],
    afterImageUrl: BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS[1],
    overviewTitle: 'A placeholder office concept built from BoConcept reference imagery',
    overviewTextPrimary: 'This project entry is currently using placeholder copy while the final office case study details are being prepared. The image gallery is sourced from the BoConcept office reference set in the public images folder.',
    overviewTextSecondary: 'Use this record as the central place to replace placeholder text, tags, captions, and story content once the office project narrative and deliverables are confirmed.',
    deliverableItems: [
      { icon: '01', text: 'Placeholder deliverable one' },
      { icon: '02', text: 'Placeholder deliverable two' },
      { icon: '03', text: 'Placeholder deliverable three' },
      { icon: '04', text: 'Placeholder deliverable four' },
      { icon: '05', text: 'Placeholder deliverable five' },
      { icon: '06', text: 'Placeholder deliverable six' }
    ],
    galleryImageUrls: BOCONCEPT_OFFICE_REFERENCE_IMAGE_URLS,
    galleryCaptions: [
      'Office reference image 1',
      'Office reference image 2',
      'Office reference image 3',
      'Office reference image 4',
      'Office reference image 5',
      'Office reference image 6',
      'Office reference image 7',
      'Office reference image 8',
      'Office reference image 9'
    ]
  },
  contemporaryLiving: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 3,
    title: 'West Elm Contemporary Living',
    location: 'Placeholder Location - Interior Styling',
    tagLabels: ['Interior Design', 'Contemporary Living', 'West Elm'],
    heroImageUrl: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS[8],
    beforeImageUrl: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS[1],
    afterImageUrl: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS[8],
    overviewTitle: 'A contemporary living concept built from West Elm reference imagery',
    overviewTextPrimary: 'This project entry uses placeholder copy for now while the final West Elm contemporary living story is being assembled. All gallery imagery is sourced from the local contemporaryLiving folder.',
    overviewTextSecondary: 'Replace this text with the final concept summary, sourcing rationale, and room transformation notes once the project narrative is ready.',
    deliverableItems: [
      { icon: '01', text: 'Placeholder deliverable one' },
      { icon: '02', text: 'Placeholder deliverable two' },
      { icon: '03', text: 'Placeholder deliverable three' },
      { icon: '04', text: 'Placeholder deliverable four' },
      { icon: '05', text: 'Placeholder deliverable five' },
      { icon: '06', text: 'Placeholder deliverable six' }
    ],
    referenceImageUrls: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS,
    galleryImageUrls: WESTELM_CONTEMPORARY_LIVING_IMAGE_URLS,
    galleryCaptions: [
      'Contemporary living reference 1',
      'Contemporary living reference 2',
      'Contemporary living reference 3',
      'Contemporary living reference 4',
      'Contemporary living reference 5',
      'Contemporary living reference 6',
      'Contemporary living reference 7',
      'Contemporary living reference 8',
      'Contemporary living reference 9',
      'Contemporary living reference 10'
    ]
  },
  midCenturyModern: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 2,
    title: 'Mid-Century Modern',
    location: 'Placeholder Location - Interior Styling',
    tagLabels: ['Interior Design', 'Mid-Century Modern', 'West Elm', 'Living', 'Dining'],
    heroImageUrl: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS[0],
    beforeImageUrl: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS[0],
    afterImageUrl: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS[4],
    overviewTitle: 'A mid-century modern concept built from West Elm reference imagery',
    overviewTextPrimary: 'This project entry currently uses placeholder content while the final West Elm mid-century modern case study is being prepared. The gallery is driven by the local midCenturyModern image set.',
    overviewTextSecondary: 'Use this record to centralize the final transformation copy, deliverables, and caption details once the project is ready to publish.',
    deliverableItems: [
      { icon: '01', text: 'Placeholder deliverable one' },
      { icon: '02', text: 'Placeholder deliverable two' },
      { icon: '03', text: 'Placeholder deliverable three' },
      { icon: '04', text: 'Placeholder deliverable four' },
      { icon: '05', text: 'Placeholder deliverable five' },
      { icon: '06', text: 'Placeholder deliverable six' }
    ],
    referenceImageUrls: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS,
    galleryImageUrls: WESTELM_MID_CENTURY_MODERN_IMAGE_URLS,
    galleryCaptions: [
      'Mid-century modern reference 1',
      'Mid-century modern reference 2',
      'Mid-century modern reference 3',
      'Mid-century modern reference 4',
      'Mid-century modern reference 5',
      'Mid-century modern reference 6',
      'Mid-century modern reference 7'
    ]
  },
  rocheboboisDining: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 6,
    title: 'Roche Bobois Dining',
    location: 'Placeholder Location - Dining Styling',
    tagLabels: ['Interior Design', 'Dining Room', 'BoConcept', 'Roche Bobois'],
    heroImageUrl: ROCHEBOBOIS_DINING_IMAGE_URLS[0],
    beforeImageUrl: ROCHEBOBOIS_DINING_IMAGE_URLS[1],
    afterImageUrl: ROCHEBOBOIS_DINING_IMAGE_URLS[2],
    overviewTitle: 'A dining concept entry built from Roche Bobois references',
    overviewTextPrimary: 'This is a placeholder project record created from local Roche Bobois dining images. Replace this copy with the final concept story, scope details, and transformation narrative.',
    overviewTextSecondary: 'Use this entry to centralize final deliverables, captions, and before/after details once the project brief is approved.',
    deliverableItems: [
      { icon: '01', text: 'Placeholder deliverable one' },
      { icon: '02', text: 'Placeholder deliverable two' },
      { icon: '03', text: 'Placeholder deliverable three' },
      { icon: '04', text: 'Placeholder deliverable four' },
      { icon: '05', text: 'Placeholder deliverable five' },
      { icon: '06', text: 'Placeholder deliverable six' }
    ],
    referenceImageUrls: ROCHEBOBOIS_DINING_IMAGE_URLS,
    galleryImageUrls: ROCHEBOBOIS_DINING_IMAGE_URLS,
    galleryCaptions: [
      'Dining Room before any interior upgrades',
      'Roche Bobois dining reference 2',
      'Roche Bobois dining reference 3'
    ]
  },
  cuppertinoHome: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 7,
    title: 'Cuppertino Home',
    location: 'Placeholder Location - Home Styling',
    tagLabels: ['Interior Design', 'West Elm', 'Living Room', 'Dining Room'],
    heroImageUrl: CUPPERTINO_HOME_IMAGE_URLS[0],
    beforeImageUrl: CUPPERTINO_HOME_IMAGE_URLS[1],
    afterImageUrl: CUPPERTINO_HOME_IMAGE_URLS[2],
    overviewTitle: 'A Cuppertino home concept built from West Elm references',
    overviewTextPrimary: 'This placeholder entry is wired to the local cuppertinoHome folder to streamline case study setup. Replace this with the final client brief, style direction, and room-by-room design outcomes.',
    overviewTextSecondary: 'Update the deliverables, before/after rationale, and final captions when the narrative is ready for publishing.',
    deliverableItems: [
      { icon: '01', text: 'Placeholder deliverable one' },
      { icon: '02', text: 'Placeholder deliverable two' },
      { icon: '03', text: 'Placeholder deliverable three' },
      { icon: '04', text: 'Placeholder deliverable four' },
      { icon: '05', text: 'Placeholder deliverable five' },
      { icon: '06', text: 'Placeholder deliverable six' }
    ],
    referenceImageUrls: CUPPERTINO_HOME_IMAGE_URLS,
    galleryImageUrls: CUPPERTINO_HOME_IMAGE_URLS,
    galleryCaptions: [
      'Cuppertino home reference 1',
      'Cuppertino home reference 2',
      'Cuppertino home reference 3',
      'Cuppertino home reference 4',
      'Cuppertino home reference 5',
      'Cuppertino home reference 6',
      'Cuppertino home reference 7',
      'Cuppertino home reference 8'
    ]
  },
  fosterCityLivingDining: {
    storyType: 'interior',
    isSelectedForHome: true,
    homeVisibilityPriority: 8,
    title: 'Foster City Living Dining',
    location: 'Foster City, California - Open Layout Renovation',
    tagLabels: ['Interior Design', 'West Elm', 'Open Layout', 'Living & Dining'],
    heroImageUrl: FOSTER_CITY_LIVING_DINING_IMAGE_URLS[0],
    beforeImageUrl: FOSTER_CITY_LIVING_DINING_IMAGE_URLS[1],
    afterImageUrl: FOSTER_CITY_LIVING_DINING_IMAGE_URLS[2],
    overviewTitle: 'An open-plan living and dining concept for Foster City',
    overviewTextPrimary: 'This placeholder project is connected to the fosterCityLivingDining image set. Replace this text with the final transformation goals, zoning strategy, and material direction.',
    overviewTextSecondary: 'Use this object as the source of truth for final before/after framing, deliverables, and presentation captions.',
    deliverableItems: [
      { icon: '01', text: 'Placeholder deliverable one' },
      { icon: '02', text: 'Placeholder deliverable two' },
      { icon: '03', text: 'Placeholder deliverable three' },
      { icon: '04', text: 'Placeholder deliverable four' },
      { icon: '05', text: 'Placeholder deliverable five' },
      { icon: '06', text: 'Placeholder deliverable six' }
    ],
    referenceImageUrls: FOSTER_CITY_LIVING_DINING_IMAGE_URLS,
    galleryImageUrls: FOSTER_CITY_LIVING_DINING_IMAGE_URLS,
    galleryCaptions: [
      'Foster City reference 1',
      'Foster City reference 2',
      'Foster City reference 3',
      'Foster City reference 4',
      'Foster City reference 5'
    ]
  },
  sanFranBedroom: {
    storyType: 'interior',
    isSelectedForHome: false,
    homeVisibilityPriority: 99,
    title: 'San Francisco Bedroom Refresh',
    location: 'San Francisco, California - Bedroom Styling',
    tagLabels: ['Interior Design', 'West Elm', 'Bedroom'],
    heroImageUrl: WESTELM_SAN_FRAN_IMAGE_URLS[0],
    beforeImageUrl: WESTELM_SAN_FRAN_IMAGE_URLS[1],
    afterImageUrl: WESTELM_SAN_FRAN_IMAGE_URLS[2],
    overviewTitle: 'A bedroom concept entry built from San Francisco references',
    overviewTextPrimary: 'This placeholder project uses local SanFran imagery to establish the case study data structure. Replace with final copy once bedroom goals and styling notes are approved.',
    overviewTextSecondary: 'Keep this record as the single place to maintain deliverables, transformation notes, and final captions.',
    deliverableItems: [
      { icon: '01', text: 'Placeholder deliverable one' },
      { icon: '02', text: 'Placeholder deliverable two' },
      { icon: '03', text: 'Placeholder deliverable three' },
      { icon: '04', text: 'Placeholder deliverable four' },
      { icon: '05', text: 'Placeholder deliverable five' },
      { icon: '06', text: 'Placeholder deliverable six' }
    ],
    referenceImageUrls: WESTELM_SAN_FRAN_IMAGE_URLS,
    galleryImageUrls: WESTELM_SAN_FRAN_IMAGE_URLS,
    galleryCaptions: [
      'San Francisco bedroom reference 1',
      'San Francisco bedroom reference 2',
      'San Francisco bedroom reference 3'
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
    overviewTitle: 'An entryway concept built from local West Elm references',
    overviewTextPrimary: 'This placeholder case study tracks the new entryway project and uses images from the dedicated WestElm/entryway folder. Replace with final project narrative and client goals when ready.',
    overviewTextSecondary: 'Use this entry to maintain finalized before/after details, styling rationale, and project deliverables.',
    deliverableItems: [
      { icon: '01', text: 'Placeholder deliverable one' },
      { icon: '02', text: 'Placeholder deliverable two' },
      { icon: '03', text: 'Placeholder deliverable three' },
      { icon: '04', text: 'Placeholder deliverable four' },
      { icon: '05', text: 'Placeholder deliverable five' },
      { icon: '06', text: 'Placeholder deliverable six' }
    ],
    referenceImageUrls: WESTELM_ENTRYWAY_IMAGE_URLS,
    galleryImageUrls: WESTELM_ENTRYWAY_IMAGE_URLS,
    galleryCaptions: [
      'Entryway before styling',
      'Entryway after styling'
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