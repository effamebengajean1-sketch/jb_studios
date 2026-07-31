<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        ref="lightboxRef"
        class="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        @click.self="close"
        @keydown.escape="close"
        @keydown.left="prevImage"
        @keydown.right="nextImage"
        tabindex="0"
      >
        <!-- Image container -->
        <div
          class="relative w-full max-w-7xl max-h-[95vh] flex items-center justify-center"
          @click="toggleZoom"
        >
          <NuxtImg
            :src="currentImage?.src"
            :alt="currentImage?.alt"
            class="object-contain transition-all duration-500 cursor-pointer select-none"
            :class="isZoomed ? 'max-w-[95vw] max-h-[95vh] scale-[1.5]' : 'max-w-full max-h-[85vh] scale-100'"
          />

          <!-- Zoom hint -->
          <div
            v-if="!isZoomed && images.length > 0"
            class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white/50 text-[10px] font-label-caps px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none"
          >
            Cliquer pour zoomer
          </div>
        </div>

        <!-- Image info -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p class="text-white font-serif text-lg">{{ currentImage?.alt }}</p>
          <span class="text-white/40 text-xs font-label-caps">{{ currentImage?.category }}</span>
        </div>

        <!-- Close button -->
        <button
          class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/90 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10"
          @click="close"
          aria-label="Fermer"
        >
          <!-- ✅ Correction : material-symbols:close → mdi:close -->
          <Icon name="mdi:close" class="text-2xl" />
        </button>

        <!-- Download button -->
        <button
          v-if="currentImage?.src"
          class="absolute top-4 right-16 w-10 h-10 flex items-center justify-center text-white/90 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10"
          @click="downloadImage"
          aria-label="Télécharger l'image"
        >
          <!-- ✅ Correction : material-symbols:download → mdi:download -->
          <Icon name="mdi:download" class="text-2xl" />
        </button>

        <!-- Previous button -->
        <button
          v-if="images.length > 1"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-110"
          @click="prevImage"
          aria-label="Précédent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Next button -->
        <button
          v-if="images.length > 1"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-110"
          @click="nextImage"
          aria-label="Suivant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Counter -->
        <div
          v-if="images.length > 1"
          class="absolute top-5 left-5 text-white/70 text-sm font-label-caps bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10"
        >
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>

        <!-- Progress dots -->
        <div v-if="images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <div
            v-for="(_, index) in images"
            :key="index"
            class="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
            :class="index === currentIndex ? 'w-8 bg-brand-red' : 'w-2 bg-white/30 hover:bg-white/50'"
            @click="goToImage(index)"
          />
        </div>

        <!-- Touch hint -->
        <div class="absolute top-1/2 left-3 -translate-y-1/2 text-white/20 text-xs font-label-caps pointer-events-none md:hidden">
          ← glisser →
        </div>
        <div class="absolute top-1/2 right-3 -translate-y-1/2 text-white/20 text-xs font-label-caps pointer-events-none md:hidden">
          ← glisser →
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { GalleryImage } from '~/composables/useGallery'

const props = defineProps<{
  isOpen: boolean
  images: GalleryImage[]
  initialIndex: number
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

const currentIndex = ref(props.initialIndex)
const lightboxRef = ref<HTMLElement | null>(null)
const isZoomed = ref(false)

const currentImage = computed(() => props.images[currentIndex.value] || null)

const nextImage = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
    isZoomed.value = false
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    isZoomed.value = false
  }
}

const goToImage = (index: number) => {
  currentIndex.value = index
  isZoomed.value = false
}

const close = () => {
  emit('update:isOpen', false)
  isZoomed.value = false
}

const toggleZoom = () => {
  isZoomed.value = !isZoomed.value
}

const downloadImage = async () => {
  if (!currentImage.value?.src) return

  try {
    const response = await fetch(currentImage.value.src)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = currentImage.value.alt || 'image'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch {
    window.open(currentImage.value.src, '_blank')
  }
}

// Scroll lock
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    currentIndex.value = props.initialIndex
    isZoomed.value = false
  } else {
    document.body.style.overflow = ''
  }
})

// Keyboard navigation
useEventListener('keydown', (e) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
})

// Touch swipe
let touchStartX = 0
let touchStartY = 0
let isSwiping = false

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX
  touchStartY = e.changedTouches[0].screenY
  isSwiping = true
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isSwiping) return
  const diffX = touchStartX - e.changedTouches[0].screenX
  const diffY = touchStartY - e.changedTouches[0].screenY

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
    if (diffX > 0) nextImage()
    else prevImage()
    isSwiping = false
  }
}

const handleTouchEnd = () => {
  isSwiping = false
}

onMounted(() => {
  if (lightboxRef.value) {
    lightboxRef.value.addEventListener('touchstart', handleTouchStart, { passive: true })
    lightboxRef.value.addEventListener('touchmove', handleTouchMove, { passive: true })
    lightboxRef.value.addEventListener('touchend', handleTouchEnd)
  }
})

onBeforeUnmount(() => {
  if (lightboxRef.value) {
    lightboxRef.value.removeEventListener('touchstart', handleTouchStart)
    lightboxRef.value.removeEventListener('touchmove', handleTouchMove)
    lightboxRef.value.removeEventListener('touchend', handleTouchEnd)
  }
})
</script>