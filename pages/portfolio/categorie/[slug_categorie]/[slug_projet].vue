<!-- pages/portfolio/categorie/[slug_categorie]/[slug_projet].vue -->
<template>
  <div v-if="project" class="bg-brand-black min-h-screen pt-32 pb-20 px-6 md:px-8">
    <div class="max-w-5xl mx-auto">

      <!-- Fil d'ariane -->
      <nav class="flex flex-wrap items-center gap-2 text-sm text-white/50 mb-8 font-sans animate-fade-up">
        <a href="/portfolio" class="hover:text-brand-red transition-colors flex items-center gap-1">
          <Icon name="mdi:home" class="text-sm" />
          Portfolio
        </a>
        <Icon name="mdi:chevron-right" class="text-xs text-white/20" />
        <a
          v-if="category"
          :href="`/portfolio/categorie/${categorySlug}`"
          class="hover:text-brand-red transition-colors flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 hover:bg-brand-red/10 border border-white/5 hover:border-brand-red/30"
        >
          <Icon name="mdi:folder" class="text-sm" />
          {{ category.name }}
        </a>
        <Icon name="mdi:chevron-right" class="text-xs text-white/20" />
        <span class="text-white/80 font-medium">{{ project.name }}</span>
      </nav>

      <!-- EN-TÊTE -->
      <div class="mb-10 animate-fade-up">
        <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          {{ project.name }}
        </h1>
        <div class="flex flex-wrap items-center gap-3 mt-4">
          <span class="text-sm text-white/40 font-label-caps tracking-widest">
            {{ category?.name || 'Projet' }}
          </span>
          <span v-if="projectDesc?.date" class="text-sm text-white/30">• {{ projectDesc.date }}</span>
        </div>
      </div>

      <!-- DESCRIPTION + TAGS -->
      <div v-if="projectDesc" class="mb-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8 hover:border-brand-red/30 transition-all duration-500">
        <p class="text-white/80 font-body-md text-base leading-relaxed mb-4">{{ projectDesc.description }}</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="service in projectDesc.services"
            :key="service"
            class="px-3 py-1 text-[10px] font-label-caps tracking-widest bg-brand-red/20 text-brand-red rounded-full border border-brand-red/10"
          >
            #{{ service }}
          </span>
        </div>
      </div>

      <!-- CARROUSEL PRINCIPAL -->
      <div v-if="project.images.length > 0" class="mb-10 group">
        <div class="relative aspect-video rounded-2xl overflow-hidden bg-white/5 shadow-2xl shadow-black/30">
          <NuxtImg
            :src="project.images[0]"
            :alt="project.name"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full border border-white/10">
            <Icon name="mdi:image" class="text-xs mr-1" /> 1 / {{ project.images.length }}
          </div>
          <button
            class="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 text-sm"
            @click="openImage(0)"
          >
            <Icon name="mdi:arrow-expand" class="text-base" /> Agrandir
          </button>
        </div>
      </div>

      <!-- GRILLE D'IMAGES -->
      <div v-if="project.images.length > 1" class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
        <div
          v-for="(image, index) in project.images.slice(1)"
          :key="index"
          class="relative aspect-[4/5] overflow-hidden rounded-xl cursor-pointer group/image"
          @click="openImage(index + 1)"
        >
          <NuxtImg
            :src="image"
            :alt="`${project.name} - photo ${index + 2}`"
            class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover/image:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/0 group-hover/image:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <Icon name="mdi:magnify-plus" class="text-3xl text-white/0 group-hover/image:text-white/80 transition-all duration-300" />
          </div>
          <div class="absolute bottom-2 right-2 bg-black/60 text-white/70 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
            {{ index + 2 }} / {{ project.images.length }}
          </div>
        </div>
      </div>

      <!-- LIGHTBOX -->
      <PortfolioLightbox
        v-if="lightboxOpen"
        v-model:is-open="lightboxOpen"
        :images="projectImages"
        :initial-index="lightboxIndex"
      />

      <!-- CTA FINAL -->
      <div class="text-center py-12 border-t border-white/10 mt-12">
        <p class="text-white/70 font-sans text-lg mb-6">
          Ce projet vous inspire ?<br />
          <span class="text-white/50 text-base">Parlons de votre prochaine réalisation.</span>
        </p>
        <button
          class="inline-flex items-center gap-2 bg-brand-red hover:bg-red-600 text-white font-label-caps text-sm tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-1"
          @click="goToDevis"
        >
          Demander un devis
          <Icon name="mdi:arrow-right" class="text-base transition-transform duration-300" />
        </button>
      </div>
    </div>
  </div>

  <!-- État chargement / introuvable -->
  <div v-else-if="!pending" class="bg-brand-black min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
    <div class="text-center max-w-md mx-auto">
      <div class="text-6xl mb-4">🔍</div>
      <h2 class="text-white font-serif text-2xl mb-4">Réalisation introuvable</h2>
      <p class="text-white/50 font-sans mb-8">La réalisation que vous cherchez n'existe pas.</p>
      <a
        :href="categorySlug ? `/portfolio/categorie/${categorySlug}` : '/portfolio'"
        class="inline-flex items-center gap-2 text-brand-red hover:text-red-400 transition-colors font-sans"
      >
        <Icon name="mdi:arrow-left" class="text-sm" />
        Retour à la catégorie
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave, navigateTo } from '#app'
import PortfolioLightbox from '~/components/gallery/GalleryLightbox.vue'
import { slugify } from '~/composables/useSlug'
import { portfolioProjects } from '~/content/portfolio-data'

const route = useRoute()
const { portfolioData, pending, error } = usePortfolioApi()

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

// Slugs venant de la route à 3 segments
const categorySlug = decodeURIComponent((route.params.slug_categorie as string) ?? '')
const slugParam = decodeURIComponent((route.params.slug_projet as string) ?? '')

// Récupération de la catégorie
const category = computed(() => {
  if (!portfolioData.value?.categories) return null
  return portfolioData.value.categories.find(c => c.slug === categorySlug) ?? null
})

// Récupération du projet réel (données API), matché via portfolio-data.ts d'abord
const project = computed(() => {
  if (!category.value?.projects) return null
  const projDesc = portfolioProjects.find(p => p.slug === slugParam)
  if (projDesc) {
    return category.value.projects.find(p => slugify(p.name) === slugParam) ?? category.value.projects[0] ?? null
  }
  return category.value.projects.find(p => p.name && slugify(p.name) === slugParam) ?? null
})

// Description enrichie optionnelle (contenu éditorial statique)
const projectDesc = computed(() => {
  return portfolioProjects.find(p => p.slug === slugParam) ?? null
})

// Images pour la lightbox
const projectImages = computed(() => {
  if (!project.value?.images) return []
  return project.value.images.map((src, i) => ({
    id: i,
    src,
    alt: `${project.value?.name} - photo ${i + 1}`,
    category: category.value?.name ?? 'Portfolio',
  }))
})

const openImage = (index: number) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

const goToDevis = () => {
  navigateTo('/devis')
}

// Fermer la lightbox avant de quitter la page
onBeforeRouteLeave(() => {
  lightboxOpen.value = false
})

// SEO
watch(project, (newProject) => {
  if (newProject) {
    useSeoMeta({
      title: `${projectDesc.value?.title ?? newProject.name} — Portfolio — JB STUDIO CAMEROUN`,
      description: `Découvrez notre réalisation ${projectDesc.value?.title ?? newProject.name} dans la catégorie ${category.value?.name || ''}`,
    })
  }
}, { immediate: true })

definePageMeta({ layout: 'default' })
</script>

<style scoped>
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  opacity: 0;
  animation: fadeUp 0.6s ease forwards;
}
.group\/image {
  transition: box-shadow 0.3s ease;
}
.group\/image:hover {
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.15);
}
</style>