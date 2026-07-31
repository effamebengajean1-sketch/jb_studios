<!-- pages/services.vue -->
<template>
  <div class="bg-brand-black min-h-screen pt-32 pb-20 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- En-tête avec image de fond et effet parallaxe -->
      <div class="relative mb-16 -mt-32 pt-32 pb-16 px-6 overflow-hidden rounded-2xl">
        <!-- Image de fond -->
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style="background-image: url('/images/hero/photo1.jpg'); background-attachment: fixed;"
        ></div>

        <!-- Overlay sombre avec dégradé -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

        <!-- Overlay avec pattern subtil (effet de texture) -->
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 60%);"></div>

        <!-- Contenu -->
        <div class="relative z-10 text-center max-w-3xl mx-auto">
          <!-- Badge -->
          <div class="flex items-center justify-center gap-4 mb-4">
            <span class="w-12 h-px bg-red-500"></span>
            <span class="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
              Ce que nous faisons
            </span>
            <span class="w-12 h-px bg-red-500"></span>
          </div>

          <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-white mb-4 leading-none tracking-tight">
            Nos <span class="text-red-500">expertises</span>
          </h1>

          <p class="text-lg font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
            De l'événementiel intime à la production audiovisuelle professionnelle,
            <br class="hidden sm:block" />
            <span class="font-semibold text-white">chaque prestation est abordée avec la même exigence.</span>
          </p>
        </div>
      </div>

      <!-- Filtres par catégorie -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="category in categories"
          :key="category"
          class="px-5 py-2.5 text-sm font-semibold uppercase tracking-wide rounded-full transition-all duration-300"
          :class="activeCategory === category
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
            : 'border border-white/15 text-white/60 hover:text-white hover:border-white/40'"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <!-- Grille de services -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard
          v-for="service in filteredServices"
          :key="service.id"
          :service="service"
        />
      </div>

      <!-- Bloc sur-mesure -->
      <div class="mt-16 text-center border-t border-white/10 pt-12">
        <h2 class="font-headline-md text-headline-md text-white mb-3">
          Un besoin <span class="text-red-500">spécifique</span> ?
        </h2>
        <p class="text-white/60 font-body-md mb-6 max-w-lg mx-auto leading-relaxed">
          Chaque projet est unique. Parlons de vos besoins pour construire
          <span class="text-white font-semibold">une prestation sur-mesure.</span>
        </p>
        <NuxtLink
          to="/devis"
          class="inline-block bg-red-500 text-white px-8 py-4 font-label-caps text-label-caps tracking-[0.2em] hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
        >
          Discutons de votre projet
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { servicesList } from '~/data/services-data'

definePageMeta({ layout: 'default' })

const categories = ['Tous', 'Événementiel', 'Production', 'Communication']
const activeCategory = ref('Tous')

const filteredServices = computed(() => {
  if (activeCategory.value === 'Tous') return servicesList
  return servicesList.filter((s) => s.category === activeCategory.value)
})

useSeoMeta({
  title: 'Nos services — JB STUDIO CAMEROUN',
  description:
    'Découvrez toutes nos prestations : mariages, corporate, concerts, clips musicaux, drone, production publicitaire et bien plus.',
})
</script>

<style scoped>
/* Animation des filtres */
button {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Effet de parallaxe sur l'image de fond */
.bg-fixed {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}

/* Effet de glow sur le CTA */
a {
  position: relative;
  overflow: hidden;
}

a::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

a:hover::after {
  opacity: 1;
}

/* Animation d'entrée du contenu */
.relative.z-10 {
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>