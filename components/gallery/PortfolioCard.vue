<!-- components/gallery/PortfolioCard.vue -->
<template>
  <NuxtLink
    :to="`/portfolio/${project.slug}`"
    class="group relative block overflow-hidden rounded aspect-[4/5]"
  >
    <ImageCarousel :images="cardImages" :alt="project.title" :interval-ms="4000">
      <div class="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent"></div>

      <div class="absolute bottom-0 left-0 right-0 p-6 z-10">
        <span class="text-brand-red text-xs font-sans uppercase tracking-widest">
          {{ project.category }}
        </span>
        <h3 class="font-serif text-white text-xl mt-1">
          {{ project.title }}
        </h3>
      </div>
    </ImageCarousel>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PortfolioProject } from '~/composables/usePortfolio'

const props = defineProps<{
  project: PortfolioProject
}>()

const cardImages = computed(() => {
  const images = [props.project.coverImage, ...(props.project.gallery || [])]
  return Array.from(new Set(images))
})
</script>