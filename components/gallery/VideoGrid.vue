<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="video in videos" :key="video.id" class="group relative overflow-hidden rounded-lg cursor-pointer bg-surface-container-low hover:scale-[1.02] transition-all duration-500" @click="$emit('video-click', video)">
      <div class="relative aspect-video overflow-hidden">
        <NuxtImg
          v-if="video.thumbnail"
          :src="video.thumbnail"
          :alt="video.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width="500"
          height="281"
          quality="70"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-surface-container-high flex items-center justify-center">
          <div class="w-20 h-20 rounded-full bg-brand-red/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-brand-red/30">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all duration-500">
          <div class="w-16 h-16 rounded-full bg-brand-red/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-brand-red/30">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <span class="absolute top-3 left-3 px-3 py-1 text-[10px] font-label-caps tracking-widest bg-black/70 text-white rounded-full">{{ video.category }}</span>
      </div>
      <div class="p-4">
        <h3 class="font-serif text-on-background text-lg group-hover:text-brand-red transition-colors">{{ video.title }}</h3>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { VideoItem } from '~/composables/useGallery'
defineProps<{ videos: VideoItem[] }>()
defineEmits<{ (e: 'video-click', video: VideoItem): void }>()
</script>
