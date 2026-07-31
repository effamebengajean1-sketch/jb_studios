# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
Voici un README complet pour ton projet Nuxt 3, structuré et professionnel. Tu peux le copier-coller dans un fichier `README.md` à la racine de ton projet.

---

# JB_STUDIOS_FIRST_SHOT — Site vitrine

> Production audiovisuelle & photographie événementielle — Chaque instant mérite d’être raconté avec élégance.

---

## 📦 Présentation

**JB_STUDIOS_FIRST_SHOT** est un studio de production audiovisuelle et de photographie événementielle. Ce site vitrine a pour objectif de présenter les prestations, le portfolio et les témoignages du studio, tout en générant des demandes de devis qualifiées.

Le projet est développé avec **Nuxt 3**, **Vue 3**, **TypeScript**, **Tailwind CSS** et **GSAP** pour une expérience fluide, immersive et optimisée pour le SEO.

---

## 🧱 Stack technique

| Domaine | Technologies |
|---------|--------------|
| **Framework** | Nuxt 3.15+ / Vue 3.5+ |
| **Langage** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS 3.x |
| **UI / Icônes** | @nuxt/icon, Material Symbols |
| **Animations** | GSAP + ScrollTrigger |
| **Images** | @nuxt/image (optimisation automatique) |
| **Carrousel** | Embla Carousel (léger) |
| **Scroll / Utilitaires** | @vueuse/nuxt |
| **Polices** | Google Fonts (Bebas Neue, Playfair Display, Inter, Hanken Grotesk) |
| **Hébergement** | Vercel (preset Nitro) |
| **SEO** | useSeoMeta, sitemap, schema.org (intégration future) |
| **Formulaires** | Zod (validation client/serveur) |
| **Base de données** | (à définir : Supabase / Firebase) |
| **CMS** | Nuxt Content (Markdown) ou Sanity (option) |

---

## 📁 Structure du projet

```
jbstudios-site/
├── assets/
│   └── css/
│       └── main.css              # Styles globaux Tailwind
├── components/
│   ├── ui/                       # Composants atomiques (Module 2)
│   │   ├── UiButton.vue
│   │   ├── UiCard.vue
│   │   ├── UiInput.vue
│   │   └── UiBadge.vue
│   ├── layout/                   # Composants de structure (Module 3)
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   └── AppMobileMenu.vue
│   └── sections/                 # Sections réutilisables (Module 5)
│       ├── HeroHome.vue
│       ├── ServicesGrid.vue
│       ├── TrustBar.vue
│       ├── TestimonialsCarousel.vue
│       ├── GalleryPreview.vue
│       ├── CtaBanner.vue
│       └── ContactQuickBlock.vue
├── layouts/                      # Mises en page (Module 3)
│   ├── default.vue
│   └── legal.vue
├── pages/                        # Routes (Module 4)
│   ├── index.vue
│   ├── a-propos.vue
│   ├── services.vue
│   ├── galerie-photos.vue
│   ├── galerie-videos.vue
│   ├── portfolio/
│   │   ├── index.vue
│   │   └── [slug].vue
│   ├── tarifs.vue
│   ├── blog/
│   │   ├── index.vue
│   │   └── [slug].vue
│   ├── faq.vue
│   ├── avis.vue
│   ├── devis.vue
│   ├── mentions-legales.vue
│   └── confidentialite.vue
├── content/                      # Données statiques & contenu (Module 7)
│   └── site-config.ts
├── middleware/                   # Redirections (Module 4)
│   └── redirects.global.ts
├── plugins/                      # Plugins client
│   └── gsap.client.ts
├── public/                       # Fichiers statiques
│   ├── images/
│   ├── videos/
│   └── favicon.ico
├── server/                       # API Nitro (Module 8)
│   └── api/
│       └── devis.post.ts
├── types/                        # Types TypeScript partagés
├── .env                          # Variables d'environnement (non versionné)
├── .env.example                  # Exemple de variables
├── nuxt.config.ts
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 🎨 Design System

| Élément | Valeur |
|---------|--------|
| **Couleur de fond** | `#131313` (background) |
| **Texte principal** | `#e5e2e1` (on-background) |
| **Accent principal** | `#d91e1e` (primary-container) |
| **Typographie titres** | Bebas Neue (uppercase, tracking large) |
| **Typographie corps** | Hanken Grotesk (400, 300, 700) |
| **Style** | Cinématique / éditorial — noir profond, rouge accent, contrastes forts |

---

## 🚀 Installation et développement

### Prérequis
- Node.js 20.x ou supérieur
- npm ou yarn

### Commandes

```bash
# Cloner le projet
git clone <url-du-repo>
cd jbstudios-site

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version buildée
npm run preview

# Lancer les tests (ESLint)
npm run lint
```

---

## 🔧 Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Clés privées (côté serveur uniquement)
RESEND_API_KEY=sk_...
RECAPTCHA_SECRET=6L...

# Clés publiques (exposées au navigateur)
NUXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
NUXT_PUBLIC_GA_ID=G-...
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=6L...
```

Un fichier `.env.example` est fourni pour les nouveaux développeurs.

---

## 📦 Modules principaux

Le projet est découpé en **12 modules fonctionnels** :

| Module | Description |
|--------|-------------|
| **1. Fondations** | Configuration Nuxt, TypeScript, env, runtimeConfig |
| **2. UI Kit** | Composants atomiques (boutons, cartes, inputs, badges) |
| **3. Layouts** | Header, footer, menu mobile (GSAP), layouts default/legal |
| **4. Routing & Pages** | Routes statiques et dynamiques (portfolio/blog), middleware |
| **5. Sections** | Hero, services, témoignages, galerie, CTA, formulaire devis |
| **6. Galeries** | Grille masonry, lightbox, filtres, vidéos (à venir) |
| **7. Contenu dynamique** | Nuxt Content ou CMS (portfolio, blog, avis) |
| **8. Formulaires** | Devis multi-étapes, validation Zod |
| **9. État global** | Composables partagés (useGallery, useDevisForm, useModal) |
| **10. Animations** | GSAP, fade-in au scroll, transitions de page |
| **11. Intégrations** | Google Maps, WhatsApp, Instagram, YouTube/Vimeo |
| **12. SEO & Qualité** | Métadonnées, sitemap, schema.org, Lighthouse CI |

---

## 📱 Pages (routes)

| Route | Page | Layout |
|-------|------|--------|
| `/` | Accueil | default |
| `/a-propos` | À propos | default |
| `/services` | Services | default |
| `/galerie-photos` | Galerie Photos | default |
| `/galerie-videos` | Galerie Vidéos | default |
| `/portfolio` | Portfolio (liste) | default |
| `/portfolio/[slug]` | Portfolio (détail) | default |
| `/tarifs` | Tarifs indicatifs | default |
| `/blog` | Blog (liste) | default |
| `/blog/[slug]` | Blog (détail) | default |
| `/faq` | FAQ | default |
| `/avis` | Avis clients | default |
| `/devis` | Demande de devis | default |
| `/mentions-legales` | Mentions légales | legal |
| `/confidentialite` | Politique de confidentialité | legal |

---

## ⚡ Performances & Optimisation

- ✅ Images optimisées avec `@nuxt/image` (WebP/AVIF)
- ✅ Lazy loading des médias
- ✅ Code splitting automatique par page
- ✅ GSAP chargé uniquement côté client
- ✅ Vidéos hébergées sur Vimeo/YouTube (pas d’auto-hébergement)
- ✅ Objectif Core Web Vitals : LCP < 2.5s, CLS < 0.1

---

## 📊 SEO & Accessibilité

- ✅ `useSeoMeta()` par page
- ✅ Sitemap automatique (`@nuxtjs/sitemap`)
- ✅ Données structurées Schema.org (`nuxt-schema-org`)
- ✅ Balises `aria` et navigation clavier
- ✅ Respect des contrastes WCAG AA
- ✅ `prefers-reduced-motion` pour les animations

---

## 🔐 Sécurité

- ✅ HTTPS forcé
- ✅ Validation Zod côté client + serveur
- ✅ reCAPTCHA (ou honeypot) sur les formulaires
- ✅ Clés API séparées (public/privé)
- ✅ Conformité RGPD (mentions légales, politique de confidentialité)

---

## 🧪 Tests & Qualité

- ESLint + Prettier configurés
- Husky + lint-staged en pre-commit
- Lighthouse CI pour les performances

---

## 📝 Contributeurs

- **Effa** — Développement Fullstack
- **JB STUDIO CAMEROUN** — Direction artistique & contenu

---

## 📄 Licence

Tous droits réservés — JB_STUDIOS_FIRST_SHOT © 2024-2025

---

## 🔗 Liens utiles

- [Documentation Nuxt 3](https://nuxt.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP](https://gsap.com/docs)
- [Embla Carousel](https://www.embla-carousel.com/)

---

**Bon développement !** 🚀