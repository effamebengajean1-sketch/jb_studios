// data/services-data.ts
export interface ServiceItem {
  id: number
  slug: string
  title: string
  category: 'Événementiel' | 'Production' | 'Communication'
  description: string
  images: string[]
  icon: string
}

export const servicesList: ServiceItem[] = [
  {
    id: 1,
    slug: 'mariages',
    title: 'Mariages',
    category: 'Événementiel',
    description: "Couverture photo et vidéo complète de votre journée, du matin des préparatifs aux premières danses. Un récit visuel élégant et intemporel.",
    images: ['/images/mariage/mariage1/photo1.jpeg',
      '/images/mariage/mariage1/photo2.jpeg',
      '/images/mariage/mariage1/photo5.jpeg',
      '/images/mariage/mariage1/photo6.jpeg',
    ],
    icon: 'material-symbols:favorite'
  },
  {
    id: 2,
    slug: 'anniversaires',
    title: 'Anniversaires',
    category: 'Événementiel',
    description: "Immortalisez vos célébrations familiales avec une couverture chaleureuse et spontanée, adaptée à l'ambiance de votre événement.",
    images: ['/images/ANNIVERSAIRE/ANNIVERSAIRE1/photo1.jpeg',
      '/images/ANNIVERSAIRE/ANNIVERSAIRE1/photo2.jpeg',],
    icon: 'material-symbols:cake'
  },
  {
    id: 3,
    slug: 'baptemes',
    title: 'Baptêmes',
    category: 'Événementiel',
    description: "Un accompagnement discret et bienveillant pour capturer l'émotion de ces moments intimes et familiaux.",
    images: [
      '/images/BAPTEME/bapteme1/photo1.jpeg',
      '/images/BAPTEME/bapteme1/photo2.jpeg',
      '/images/BAPTEME/bapteme1/photo3.jpeg',
      '/images/BAPTEME/bapteme1/photo4.jpeg',
    ],
    icon: 'material-symbols:church'
  },
  {
    id: 4,
    slug: 'conferences',
    title: 'Conférences',
    category: 'Événementiel',
    description: "Captation professionnelle d'interventions, panels et keynotes, avec restitution rapide pour vos supports de communication.",
    images: [
      '/images/CONFERENCE/conference-soutenace/photo1.jpeg',
      '/images/CONFERENCE/conference-soutenace/photo2.jpeg',
      '/images/CONFERENCE/conference-soutenace/photo3.jpeg',
      '/images/CONFERENCE/conference-soutenace/photo4.jpeg',
    ],
    icon: 'material-symbols:podium'
  },
  {
    id: 6,
    slug: 'concerts',
    title: 'Concerts',
    category: 'Événementiel',
    description: "Captation multi-caméra de vos performances live, avec montage dynamique pensé pour les réseaux sociaux et le streaming.",
    images: ['images/CONCERT/LA_VOIX_DE_L\'AME/photo1.jpeg',
            'images/CONCERT/LA_VOIX_DE_L\'AME/photo2.jpeg',
            'images/CONCERT/LA_VOIX_DE_L\'AME/photo4.jpeg',
            'images/CONCERT/LA_VOIX_DE_L\'AME/photo6.jpeg',
    ],
    icon: 'material-symbols:music-note'
  },
  {
    id: 7,
    slug: 'deuil',
    title: 'Cérémonies de deuil',
    category: 'Événementiel',
    description: "Une couverture discrète et respectueuse pour accompagner les familles dans ces moments de recueillement, avec la sensibilité que ces occasions exigent.",
    images: [
      '/images/CEREMONIE-FUNEBRE/ceremonie-deuil-biloa/photo1.jpeg',
      '/images/CEREMONIE-FUNEBRE/ceremonie-deuil-biloa/photo2.jpeg',
      '/images/CEREMONIE-FUNEBRE/ceremonie-deuil-biloa/photo3.jpeg',
      '/images/CEREMONIE-FUNEBRE/ceremonie-deuil-biloa/photo4.jpeg',
    ],
    icon: 'material-symbols:local-florist'
  },
  {
    id: 8,
    slug: 'clips-musicaux',
    title: 'Clips musicaux',
    category: 'Production',
    description: "Production complète de clips musicaux : concept créatif, tournage, étalonnage et montage pour donner vie à votre univers artistique.",
    images: ['/images/CLIP/photo1.png',],
    icon: 'material-symbols:movie'
  },
  {
    id: 9,
    slug: 'publicites',
    title: 'Publicités',
    category: 'Production',
    description: "Films publicitaires percutants pour vos campagnes, pensés pour convertir sur tous les formats — TV, web et réseaux sociaux.",
    images: [
      '/images/publicite/pubblicite-1/photo.jpg',
      '/images/publicite/pubblicite-1/photo1.jpg',
    ],
    icon: 'material-symbols:campaign'
  },
  {
    id: 10,
    slug: 'corporate',
    title: 'Corporate',
    category: 'Production',
    description: "Films institutionnels, présentations d'entreprise et contenus internes réalisés avec un standard de production premium.",
    images: [
      '/images/CORPORATE/coparate-fesea/photo1.jpeg',
      '/images/CORPORATE/coparate-fesea/photo2.jpeg',
      '/images/CORPORATE/coparate-fesea/photo3.jpeg',
      '/images/CORPORATE/coparate-fesea/photo4.jpeg',
    ],
    icon: 'material-symbols:business-center'
  },
  {
    id: 11,
    slug: 'drone',
    title: 'Drone',
    category: 'Production',
    description: "Prises de vue aériennes pour sublimer vos événements et projets avec des perspectives spectaculaires.",
    images: ['/images/drone/plan_drone1/photo1.jpeg',
              '/images/drone/plan_drone1/photo2.jpeg', ],
    icon: 'material-symbols:flight'
  },
  {
    id: 12,
    slug: 'location-materiel',
    title: 'Location de matériel',
    category: 'Communication',
    description: "Location de matériel audiovisuel professionnel (caméras, éclairage, son) pour vos propres productions.",
    images: ['/images/location/materiels/photo1.png',
      '/images/location/materiels/photo2.png',
      '/images/location/materiels/photo3.png',
      '/images/location/materiels/photo4.png',
    ],
    icon: 'material-symbols:videocam'
  },
  {
    id: 13,
    slug: 'reseaux-sociaux',
    title: 'Contenus réseaux sociaux',
    category: 'Communication',
    description: "Création de contenus courts et percutants, formatés pour Instagram, TikTok et vos autres canaux de communication digitale.",
    images: ['/images/reseaux-sociaux/photo1.png'],
    icon: 'material-symbols:share'
  },
  {
    id: 14,
    slug: 'shooting-studio',
    title: 'Shooting en studio',
    category: 'Production',
    description: "Séances photo en studio avec éclairage professionnel maîtrisé, pour portraits, packshots produits ou contenus de marque à l'esthétique soignée.",
    images: [
      '/images/shooting-studio/shooting1/photo1.jpeg',
      '/images/shooting-studio/shooting1/photo2.jpeg',
      '/images/shooting-studio/shooting1/photo3.jpeg',
    ],
    icon: 'material-symbols:photo-camera'
  },

  {
    id: 14,
    slug: 'ceremonie_rmo',
    title: 'ceremonie',
    category: 'Production',
    description: "Séances photo en studio avec éclairage professionnel maîtrisé, pour portraits, packshots produits ou contenus de marque à l'esthétique soignée.",
    images: [
      '/images/CEROMONIE_RDO/Dispes1/photo1.jpeg',
      '/images/CEROMONIE_RDO/Dispes1/photo1.jpeg',
    ],
    icon: 'material-symbols:photo-camera'
  }
]