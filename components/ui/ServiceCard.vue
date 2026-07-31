<!-- components/ui/ServiceCard.vue -->
<template>
  <div class="group relative overflow-hidden rounded aspect-[3/4]">
    <ImageCarousel :images="service.images" :alt="service.title" :interval-ms="4000">
      <div class="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/40 to-transparent"></div>

      <div class="absolute inset-0 p-6 flex flex-col justify-end z-10">
        <Icon :name="service.icon" class="text-brand-red text-3xl mb-2" />
        <h3 class="font-serif text-white text-xl mb-2">
          {{ service.title }}
        </h3>
        <p class="text-white/70 font-sans text-sm leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300 overflow-hidden">
          {{ service.description }}
        </p>
        <NuxtLink
          to="/devis"
          class="mt-3 text-brand-red text-sm font-sans uppercase tracking-wide hover:text-white transition-colors"
        >
          Demander un devis →
        </NuxtLink>
      </div>
    </ImageCarousel>
  </div>
</template>

<script setup lang="ts">
import type { ServiceItem } from '~/data/services-data'

defineProps<{
  service: ServiceItem
}>()
</script>