// data/site-config.ts
export const siteConfig = {
  // ===== INFORMATIONS DU STUDIO =====
  company: {
    name: "JB STUDIOS",
    founder: "ABOLAM JEAN BRUNO",
    legalName: "JB STUDIOS FIRST SHOT",
    description: "Studio de production audiovisuelle et photographie événementielle",
  },

  // ===== AGENCE DE DÉVELOPPEMENT =====
  agency: {
    name: "Effario",
    website: "https://effario.com",
    description: "Agence de développement web et stratégie digitale"
  },

  hero: {
    title: "LA VISION À L'ÉTAT PUR",
    subtitle: "Studio de production audiovisuelle haut de gamme",
    badge: "Studio de Production Haut de Gamme",
    imageSrc: "/images/hero-accueil.jpg",
    videoSrc: "/videos/showreel.mp4",
    posterImage: "/images/hero-poster.jpg",
    primaryCta: { label: "Demander un devis", link: "/devis" },
    secondaryCta: { label: "Voir le portfolio", link: "/portfolio" }
  },

  services: {
    title: "NOS EXPERTISES",
    services: [
      { title: "Mariages", slug: "mariages", image: "/images/mariage.jpg" },
      { title: "Corporate", slug: "corporate", image: "/images/corporate.jpg" },
      { title: "Concerts", slug: "concerts", image: "/images/concert.jpg" }
    ]
  },

  stats: [
    { value: "150+", label: "ÉVÉNEMENTS" },
    { value: "8", label: "ANNÉES D'EXPÉRIENCE" },
    { value: "95%", label: "CLIENTS SATISFAITS" },
    { value: "12", label: "PRESTATIONS" }
  ],

  // ===== VOS 3 TÉMOIGNAGES =====
  testimonials: [
    {
      id: 1,
      text: "J'ai eu confiance en JB Studio Cameroun et par la suite j'ai été satisfaite du rendu final. Merci JBS Cameroun.",
      author: "Catherine Biloa",
      role: "Événementiel"
    },
    {
      id: 2,
      text: "J'ai beaucoup été marqué par les plans drones aussi. La PAD, good job 👍.",
      author: "Parfait Bertrand",
      role: "Corporate"
    },
    {
      id: 3,
      text: "Ce que j'aime c'est que vous travaillez tous en équipe.",
      author: "Colonel Bella",
      role: "Production"
    }
  ],

  galleryPreview: {
    title: "DERNIÈRES RÉALISATIONS",
    subtitle: "Un aperçu de notre travail",
    images: [
      { id: 1, src: "/images/gallery-1.jpg", alt: "Mariage cinématographique", category: "Mariage" },
      { id: 2, src: "/images/gallery-2.jpg", alt: "Concert", category: "Concert" },
      { id: 3, src: "/images/gallery-3.jpg", alt: "Corporate", category: "Corporate" },
      { id: 4, src: "/images/gallery-4.jpg", alt: "Portrait", category: "Portrait" },
      { id: 5, src: "/images/gallery-5.jpg", alt: "Event", category: "Event" },
      { id: 6, src: "/images/gallery-6.jpg", alt: "Drone", category: "Drone" }
    ]
  },

  cta: {
    title: "PRÊT À MARQUER LES ESPRITS ?",
    subtitle: "Contactez-nous aujourd'hui pour donner vie à votre projet le plus ambitieux.",
    cta: { label: "CONTACT", link: "/contact" },
    icon: "videocam"
  },

  contact: {
    title: "Prêt à collaborer ?",
    subtitle: "Racontons votre histoire en images.",
    phone: "+237 656 18 46 12",
    email: "jbstudiocameroun@gmail.com",
    address: "Yaoundé, Cameroun",
    socials: {
      instagram: "https://www.instagram.com/jeanbruno00237",
      facebook: "https://www.facebook.com/profile.php?id=61568133363249",
      youtube: "https://www.youtube.com/@JBStudioCameroun-x6i",
      tiktok: "https://tiktok.com/@jbstudios"
    },
    whatsapp: {
      number: "237656184612",
      link: "https://wa.me/237656184612"
    },
    primaryCta: { label: "Demander un devis", link: "/devis" },
    whatsappCta: { label: "WhatsApp", link: "https://wa.me/237656184612" }
  },

  // ===== MENTIONS LÉGALES =====
  legal: {
    founder: "ABOLAM JEAN BRUNO",
    companyName: "JB STUDIOS FIRST SHOT",
    address: "Yaoundé, Cameroun",
    email: "jbstudiocameroun@gmail.com",
    phone: "+237 656 18 46 12"
  }
}