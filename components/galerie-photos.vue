<template>
  <div class="bg-brand-black min-h-screen pt-32 pb-20 px-6 md:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- En-tête -->
      <div class="mb-12 text-center">
        <div class="flex items-center justify-center gap-4 mb-4">
          <span class="w-12 h-px bg-red-500"></span>
          <span class="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Portfolio</span>
          <span class="w-12 h-px bg-red-500"></span>
        </div>
        <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-white mb-3 leading-none">
          Galerie <span class="text-red-500 relative">Photos</span>
        </h1>
        <p class="text-white/60 font-body-md max-w-xl mx-auto leading-relaxed">
          {{ galleryData?.subtitle || 'Chargement...' }}
        </p>
        <p v-if="galleryData?.totalImages" class="text-xs text-white/20 mt-2 tracking-[0.2em] uppercase">
          {{ galleryData.totalImages }} photos · {{ galleryData.totalCategories }} catégories
        </p>
      </div>

      <!-- Contenu -->
      <div v-if="!pending && galleryData">
        <GalleryFilters
          :categories="['Tous', ...galleryData.categories.filter(c => c !== 'Tous')]"
          :active-category="activeCategory"
          @update:category="setCategory"
        />
        <GalleryGrid :images="filteredImages" @image-click="openLightbox" />
        <GalleryLightbox
          v-model:is-open="lightboxOpen"
          :images="filteredImages"
          :initial-index="lightboxIndex"
        />
      </div>

      <!-- Chargement -->
      <div v-else-if="pending" class="text-center py-20">
        <p class="text-white/40">Chargement des images...</p>
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-400">❌ Erreur lors du chargement des images</p>
        <button
          @click="refresh"
          class="mt-4 px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors rounded"
        >
          Réessayer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGallery } from '~/composables/useGallery'
import { useGalleryApi } from '~/composables/useGalleryApi'

definePageMeta({ layout: 'default' })

// ✅ Utiliser l'API dynamique
const { galleryData, pending, error, refresh } = useGalleryApi()

// Logique de filtrage
const images = computed(() => galleryData.value?.images || [])
const categories = computed(() => galleryData.value?.categories || ['Tous'])

const { activeCategory, filteredItems: filteredImages, setCategory } = useGallery(images, categories)

// Lightbox
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (image: any) => {
  const index = filteredImages.value.findIndex((img) => img.id === image.id)
  lightboxIndex.value = index >= 0 ? index : 0
  lightboxOpen.value = true
}

useSeoMeta({
  title: 'Galerie Photos — JB STUDIO CAMEROUN',
  description: 'Découvrez notre galerie photo : mariages, concerts, corporate, portraits et événements.',
})
</script>