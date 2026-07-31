<!-- components/ui/ImageCarousel.vue -->
<template>
  <div
    class="relative w-full h-full overflow-hidden"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <!-- Piste des slides -->
    <div
      class="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="w-full h-full flex-shrink-0"
      >
        <NuxtImg
          :src="image"
          :alt="alt"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>

    <!-- Barres de progression -->
    <div v-if="images.length > 1" class="absolute top-3 left-3 right-3 flex gap-1.5 z-20">
      <div
        v-for="(_, i) in images"
        :key="i"
        class="h-[2px] flex-1 bg-white/25 rounded-full overflow-hidden"
      >
        <div
          class="h-full bg-brand-red rounded-full"
          :style="{
            width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%',
            transition: i === currentIndex ? 'none' : 'width 0.3s ease'
          }"
        />
      </div>
    </div>

    <!-- Contenu superposé (titre, dégradé, CTA...) fourni par le parent -->
    <slot :current-index="currentIndex" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  images: string[]
  alt?: string
  intervalMs?: number
}>(), {
  alt: '',
  intervalMs: 4000
})

const currentIndex = ref(0)
const progress = ref(0)
const isPaused = ref(false)

let timer: ReturnType<typeof setInterval> | undefined
const tickMs = 30

const goToNext = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
  progress.value = 0
}

const start = () => {
  if (props.images.length <= 1) return
  timer = setInterval(() => {
    if (isPaused.value) return
    progress.value += (tickMs / props.intervalMs) * 100
    if (progress.value >= 100) goToNext()
  }, tickMs)
}

const pause = () => { isPaused.value = true }
const resume = () => { isPaused.value = false }

onMounted(start)
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>