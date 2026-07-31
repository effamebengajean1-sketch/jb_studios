<template>
  <div>
    <!-- HERO -->
    <HeroHome v-bind="siteConfig.hero" />

    <!-- ===== SÉPARATEUR ===== -->
    <div class="w-full h-px max-w-7xl mx-auto bg-gradient-to-r from-transparent via-brand-red/20 to-transparent"></div>

    <!-- ===== INTRO (alignée à gauche) ===== -->
    <section class="py-12 md:py-20 px-gutter">
      <div class="max-w-7xl mx-auto">
        <div class="max-w-3xl">
          <div class="flex items-center gap-3 mb-3">
            <span class="w-6 h-px bg-brand-red"></span>
            <span class="font-label-caps text-[9px] text-brand-red tracking-[0.3em] uppercase">Notre philosophie</span>
          </div>
          <h2 class="font-headline-md text-[26px] md:text-[32px] text-on-background mb-3">
            Raconter des histoires <span class="text-brand-red">en images</span>
          </h2>
          <p class="text-on-surface-variant text-[15px] md:text-[17px] max-w-2xl leading-relaxed">
            Depuis nos débuts, une conviction ne nous a jamais quittés : 
            une image bien racontée vaut plus que mille souvenirs flous.
          </p>
        </div>
      </div>
    </section>

    <!-- ===== TRUST BAR (STATISTIQUES) ===== -->
    <TrustBar :stats="siteConfig.stats" />

    <!-- ===== RUBAN DÉFILANT DES SERVICES ===== -->
    <section class="overflow-hidden bg-surface-container-low py-4 md:py-5 border-y border-outline-variant/20">
      <div class="relative overflow-hidden">
        <div class="flex whitespace-nowrap animate-scroll">
          <span
            v-for="(service, index) in servicesList"
            :key="index"
            class="inline-block text-base md:text-xl font-headline-lg-mobile text-on-background uppercase tracking-widest mx-6 md:mx-8"
          >
            {{ service }}
            <span class="text-brand-red mx-3 md:mx-4">✦</span>
          </span>
          <!-- Duplication pour l'effet infini -->
          <span
            v-for="(service, index) in servicesList"
            :key="'dup-' + index"
            class="inline-block text-base md:text-xl font-headline-lg-mobile text-on-background uppercase tracking-widest mx-6 md:mx-8"
          >
            {{ service }}
            <span class="text-brand-red mx-3 md:mx-4">✦</span>
          </span>
        </div>
      </div>
    </section>

    <!-- ===== SÉPARATEUR ===== -->
    <div class="w-12 h-px mx-auto bg-brand-red/30"></div>

    <!-- ===== SERVICES ===== -->
    <section class="py-12 md:py-20 px-gutter">
      <ServicesGrid
        :title="siteConfig.services.title"
        :services="siteConfig.services.services"
      />
    </section>

    <!-- ===== SÉPARATEUR ===== -->
    <div class="w-full h-px max-w-7xl mx-auto bg-gradient-to-r from-transparent via-brand-red/20 to-transparent"></div>

    <!-- ===== GALERIE ===== -->
    <section class="py-12 md:py-20 px-gutter">
      <GalleryPreview
        :title="siteConfig.galleryPreview.title"
        :subtitle="siteConfig.galleryPreview.subtitle"
        :images="siteConfig.galleryPreview.images"
      />
    </section>

    <!-- ===== SÉPARATEUR ===== -->
    <div class="w-12 h-px mx-auto bg-brand-red/30"></div>

    <!-- ===== TÉMOIGNAGES ===== -->
    <section class="py-12 md:py-20 px-gutter">
      <TestimonialsCarousel :testimonials="siteConfig.testimonials" />
    </section>

    <!-- ===== SÉPARATEUR ===== -->
    <div class="w-full h-px max-w-7xl mx-auto bg-gradient-to-r from-transparent via-brand-red/20 to-transparent"></div>

    <!-- ===== CTA ===== -->
    <section>
      <CtaBanner v-bind="siteConfig.cta" />
    </section>

    <!-- ===== CONTACT ===== -->
    <section class="py-12 md:py-20 px-gutter">
      <ContactQuickBlock v-bind="siteConfig.contact" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~/data/site-config'

definePageMeta({ layout: 'default' })

// Liste des services pour le ruban défilant
const servicesList = [
  'Mariages',
  'Anniversaires',
  'Baptêmes',
  'Conférences',
  'Séminaires',
  'Concerts',
  'Clips Musicaux',
  'Publicités',
  'Corporate',
  'Drone',
  'Location de Matériel',
  'Réseaux Sociaux'
]

useSeoMeta({
  title: 'JB STUDIO CAMEROUN — Production audiovisuelle & photographie événementielle',
  ogTitle: 'JB STUDIO CAMEROUN — Production audiovisuelle & photographie événementielle',
  description:
    'Studio de production audiovisuelle et photographie événementielle. Mariages, concerts, clips, corporate, drone.',
  ogDescription:
    'Studio de production audiovisuelle et photographie événementielle. Mariages, concerts, clips, corporate, drone.',
  ogImage: '/images/og-image.jpg',
})
</script>

<style scoped>
/* ===== ANIMATION DU RUBAN DÉFILANT ===== */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  display: flex;
  width: max-content;
  animation: scroll 25s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}
</style>