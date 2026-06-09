export { PROJECTS } from '../pages/CaseStudy/caseStudyData.ts';
export type { Deliverable, Project, StoryType } from '../pages/CaseStudy/caseStudyData.ts';

export const RESOURCES = {
	home: {
		heroImageUrl: '/images/home/Heroimages/heroimagedetail.webp',
		studioImageUrl: '/images/home/Heroimages/heroStudioimage.webp',
		testimonialPlaceholderImageUrl: '/images/home/testimonials_placeholder.svg',
		brandLogos: [
			{ src: '/images/brandLogo/boconceptlogo.jpg', alt: 'Boconcept' },
			{ src: '/images/brandLogo/cb2logo.jpg', alt: 'CB2' },
			{ src: '/images/brandLogo/cratelogo.jpg', alt: 'Crate & Barrel' },
			{ src: '/images/brandLogo/dwrlogo.jpg', alt: 'Design Within Reach' },
			{ src: '/images/brandLogo/fermlivinglogo.jpg', alt: 'Ferm Living' },
			{ src: '/images/brandLogo/hermanmillerlogo.jpg', alt: 'Herman Miller' },
			{ src: '/images/brandLogo/lazzonilogo.jpg', alt: 'Lazzoni' },
			{ src: '/images/brandLogo/potterybarn Logo.jpg', alt: 'Pottery Barn' },
			{ src: '/images/brandLogo/rhLogo.jpg', alt: 'Restoration Hardware' },
			{ src: '/images/brandLogo/rocheboboisLogo.jpg', alt: 'Roche Bobois' },
			{ src: '/images/brandLogo/westelmLogo.jpg', alt: 'West Elm' },
		],
		testimonials: [
			{
				quote: "Aayushi helped us design our home — she gave us a place we finally feel like ourselves in. Every object chosen with care, every corner considered.",
				name: 'Patty K.',
				location: 'Madison, Manhattan',
				photoUrl: '/images/home/testimonials_placeholder.svg',
			},
			{
				quote: "The virtual consultation was shockingly thorough. Over a video call, Aayushi helped us designing our living room — and the actual result was even more beautiful than we imagined.",
				name: 'Kaninka Sinha.',
				location: 'Palo Alto, California',
				photoUrl: '/images/home/testimonials_placeholder.svg',
			},
			{
				quote: "Aayushi understood exactly what I couldn't articulate. The warmth, the textures, the light — it feels like the house has always been this way.",
				name: 'Lisa C.',
				location: 'San Franciso, California',
				photoUrl: '/images/home/testimonials_placeholder.svg',
			},
		],
	},
	about: {
		profileImageUrl: '/images/home/aboutAayushiPhotobnw.jpg',
	},
} as const;
