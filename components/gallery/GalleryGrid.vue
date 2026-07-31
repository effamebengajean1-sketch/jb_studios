<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[200px] lg:auto-rows-[300px]">
    <div
      v-for="image in images"
      :key="image.id"
      class="relative overflow-hidden cursor-pointer group"
      :class="{ 'col-span-2 row-span-2': image.id % 5 === 0, 'col-span-1 row-span-1': image.id % 5 !== 0 }"
      @click="$emit('image-click', image)"
    >
      <NuxtImg :src="image.src" :alt="image.alt" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div class="absolute bottom-4 left-4 right-4">
          <span class="inline-block px-3 py-1 text-[10px] font-label-caps tracking-widest bg-brand-red text-white rounded">{{ image.category }}</span>
          <p class="text-white font-serif text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{{ image.alt }}</p>
        </div>
      </div>
      <!-- ✅ Remplacement de l'icône material-symbols-outlined par Icon -->
      <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Icon name="mdi:magnify-plus" class="text-2xl text-white/70" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GalleryImage } from '~/composables/useGallery'
defineProps<{ images: GalleryImage[] }>()
defineEmits<{ (e: 'image-click', image: GalleryImage): void }>()
</script>