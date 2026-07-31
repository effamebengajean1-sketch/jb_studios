<template>
  <Teleport to="body">
    <Transition enter-active-class="transition-opacity duration-300" leave-active-class="transition-opacity duration-300" enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div v-if="isOpen" class="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4" @click.self="close" @keydown.escape="close" tabindex="0">
        <div class="relative w-full max-w-5xl">
          <div class="relative aspect-video bg-black">
            <template v-if="isLocalVideo">
              <video
                :src="video?.src"
                class="w-full h-full"
                controls
                autoplay
              />
            </template>
            <template v-else>
              <iframe :src="video?.embedUrl" class="w-full h-full border-0" allowfullscreen allow="autoplay; encrypted-media; fullscreen" :title="video?.title" />
            </template>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <div>
              <h3 class="text-white font-serif text-xl">{{ video?.title }}</h3>
              <span class="text-white/50 text-sm font-label-caps">{{ video?.category }}</span>
            </div>
            <button class="text-white/90 hover:text-white w-11 h-11 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-110" @click="close" aria-label="Fermer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { VideoItem } from '~/composables/useGallery'
import { useEventListener } from '@vueuse/core'

const props = defineProps<{ isOpen: boolean; video: VideoItem | null }>()
const emit = defineEmits<{ (e: 'update:isOpen', value: boolean): void }>()

const isLocalVideo = computed(() => props.video?.platform === 'local')

const close = () => emit('update:isOpen', false)

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
})

useEventListener('keydown', (e) => {
  if (e.key === 'Escape' && props.isOpen) close()
})
</script>