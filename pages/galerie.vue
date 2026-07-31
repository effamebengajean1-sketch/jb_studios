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
          Notre <span class="text-red-500 relative">Galerie</span>
        </h1>
        <p class="text-white/60 font-body-md max-w-xl mx-auto leading-relaxed">
          Découvrez nos réalisations photo et vidéo
        </p>
      </div>

      <!-- Onglets -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          @click="activeTab = 'photos'"
          class="px-6 py-3 font-label-caps tracking-widest uppercase transition-all duration-300 rounded-full"
          :class="activeTab === 'photos'
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
            : 'text-white/40 hover:text-white/80 border border-white/10 hover:border-white/30'
          "
        >
          Photos
        </button>
        <button
          @click="activeTab = 'videos'"
          class="px-6 py-3 font-label-caps tracking-widest uppercase transition-all duration-300 rounded-full"
          :class="activeTab === 'videos'
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
            : 'text-white/40 hover:text-white/80 border border-white/10 hover:border-white/30'
          "
        >
          Vidéos
        </button>
      </div>

      <!-- Séparateur -->
      <div class="flex items-center justify-center gap-4 mb-10">
        <span class="w-16 h-px bg-red-500/30"></span>
        <span class="text-[10px] font-label-caps tracking-[0.4em] text-white/20 uppercase">
          {{ activeTab === 'photos' ? 'Images' : 'Mouvement' }}
        </span>
        <span class="w-16 h-px bg-red-500/30"></span>
      </div>

      <!-- Contenu Photos -->
      <div v-if="activeTab === 'photos'">
        <div v-if="!photoPending && photoData">
          <GalleryFilters
            :categories="['Tous', ...photoData.categories.filter(c => c !== 'Tous')]"
            :active-category="activePhotoCategory"
            @update:category="setPhotoCategory"
          />
          <GalleryGrid :images="filteredPhotos" @image-click="openLightbox" />
          <GalleryLightbox
            v-model:is-open="lightboxOpen"
            :images="filteredPhotos"
            :initial-index="lightboxIndex"
          />
        </div>
        <div v-else-if="photoPending" class="text-center py-20">
          <p class="text-white/40">Chargement des photos...</p>
        </div>
        <div v-else-if="photoError" class="text-center py-20">
          <p class="text-red-400">❌ Erreur lors du chargement des photos</p>
        </div>
      </div>

      <!-- Contenu Vidéos (sans filtres) -->
      <div v-if="activeTab === 'videos'">
        <!-- ⚠️ Les boutons de catégorie ont été supprimés -->
        <VideoGrid :videos="videoItems" @video-click="openVideo" />
        <VideoPlayer v-model:is-open="playerOpen" :video="selectedVideo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGallery } from '~/composables/useGallery'
import { useGalleryApi } from '~/composables/useGalleryApi'
import { useGalleryVideosApi } from '~/composables/useGalleryVideosApi'
import { computed, ref } from 'vue'

definePageMeta({ layout: 'default' })

const activeTab = ref('photos')

// ============================================
// PHOTOS — via API dynamique
// ============================================
const { galleryData: photoData, pending: photoPending, error: photoError } = useGalleryApi()

const photoImages = computed(() => photoData.value?.images || [])
const photoCategories = computed(() => photoData.value?.categories || ['Tous'])

const {
  activeCategory: activePhotoCategory,
  filteredItems: filteredPhotos,
  setCategory: setPhotoCategory
} = useGallery(photoImages, photoCategories)

// ============================================
// VIDÉOS — via API dynamique (sans filtrage)
// ============================================
const { galleryVideosData: videoData, pending: videoPending } = useGalleryVideosApi()

// Liste complète des vidéos (sans filtre)
const videoItems = computed(() => videoData.value?.videos || [])

// ============================================
// LIGHTBOX PHOTOS
// ============================================
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (image: any) => {
  const index = filteredPhotos.value.findIndex((img) => img.id === image.id)
  lightboxIndex.value = index >= 0 ? index : 0
  lightboxOpen.value = true
}

// ============================================
// PLAYER VIDÉOS
// ============================================
const playerOpen = ref(false)
const selectedVideo = ref(null)

const openVideo = (video: any) => {
  selectedVideo.value = video
  playerOpen.value = true
}

useSeoMeta({
  title: 'Galerie — JB STUDIO CAMEROUN',
  description: 'Découvrez notre galerie photo et vidéo : mariages, concerts, corporate, clips et événements.'
})
</script>