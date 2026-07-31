// content/portfolio-data.ts
export interface PortfolioProject {
  id: number
  slug: string
  title: string
  category: string
  client: string
  date: string
  coverImage: string
  description: string
  services: string[]
  gallery: string[]
  testimonial?: {
    text: string
    author: string
  }
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    slug: 'mariage-emma-julien',
    title: "Mariage d'Emma & Julien",
    category: 'Mariage',
    client: 'Emma & Julien',
    date: '2025',
    coverImage: '/images/portfolio/mariage-cover.jpg',
    description: "Une cérémonie intimiste célébrée à Yaoundé, capturée entre lumière naturelle et instants volés. Notre équipe a suivi les mariés du matin des préparatifs jusqu'aux premières danses, pour livrer un film et une galerie qui racontent l'émotion brute de cette journée.",
    services: ['Captation vidéo', 'Photographie', 'Montage cinématographique'],
    gallery: [
      '/images/portfolio/mariage-1.jpg',
      '/images/portfolio/mariage-2.jpg',
      '/images/portfolio/mariage-3.jpg',
    ],
    testimonial: {
      text: "L'équipe a su capturer des moments qu'on n'aurait jamais remarqués nous-mêmes. Le film nous a fait pleurer de joie en le revoyant.",
      author: 'Emma & Julien'
    }
  },
  {
    id: 2,
    slug: 'seminaire-corporate-2025',
    title: 'Séminaire annuel — Groupe Corporate',
    category: 'Corporate',
    client: 'Confidentiel',
    date: '2025',
    coverImage: '/images/portfolio/corporate-cover.jpg',
    description: "Couverture complète d'un séminaire d'entreprise sur deux jours : interviews des intervenants, captation des temps forts, et montage d'un film de synthèse diffusé en interne.",
    services: ['Captation vidéo', 'Interviews', 'Montage corporate'],
    gallery: [
      '/images/portfolio/corporate-1.jpg',
      '/images/portfolio/corporate-2.jpg',
      '/images/portfolio/corporate-3.jpg',
    ],
    testimonial: {
      text: "Un rendu professionnel qui a dépassé nos attentes, livré dans les délais malgré la contrainte de deux jours de tournage intensif.",
      author: 'Direction Communication'
    }
  },
  {
    id: 3,
    slug: 'concert-live-session',
    title: 'Concert — Live Session',
    category: 'Concert',
    client: 'Marc Anthony (artiste)',
    date: '2024',
    coverImage: '/images/portfolio/concert-cover.jpg',
    description: "Captation multi-caméra d'un concert live, avec montage dynamique synchronisé à la performance musicale pour une diffusion sur les réseaux sociaux de l'artiste.",
    services: ['Captation multi-caméra', 'Montage musical', 'Formats réseaux sociaux'],
    gallery: [
      '/images/portfolio/concert-1.jpg',
      '/images/portfolio/concert-2.jpg',
      '/images/portfolio/concert-3.jpg',
    ],
    testimonial: {
      text: "Plus qu'une prestation, une véritable collaboration artistique. Le résultat a largement dépassé nos attentes.",
      author: 'Marc Anthony'
    }
  }
]