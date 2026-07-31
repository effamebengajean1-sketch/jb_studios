<!-- components/sections/ServicesGrid.vue -->
<template>
  <section class="bg-surface-container-lowest py-section-padding-sm px-gutter">
    <div class="mb-12">
      <h2 class="font-headline-md text-headline-md text-on-background border-l-4 border-primary-container pl-4">
        {{ title }}
      </h2>
    </div>

    <div class="grid grid-cols-1 gap-12">
      <!-- Premier service (grand, style maquette) -->
      <div
        v-if="services.length > 0"
        class="relative aspect-[4/5] overflow-hidden group cursor-pointer"
        @click="navigateTo('/galerie')"
      >
        <NuxtImg
          :src="services[0].image"
          :alt="services[0].title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div class="absolute bottom-6 left-6">
          <p class="font-label-caps text-label-caps text-primary-container mb-2">01</p>
          <h3 class="font-headline-md text-headline-md text-white">{{ services[0].title }}</h3>
        </div>
      </div>

      <!-- Deux services en bas (côte à côte) -->
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(service, index) in services.slice(1, 3)"
          :key="index"
          class="relative aspect-square overflow-hidden group cursor-pointer"
          @click="navigateTo('/galerie')"
        >
          <NuxtImg
            :src="service.image"
            :alt="service.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <h3 class="text-white font-label-caps text-[10px] tracking-widest uppercase">
              {{ service.title }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Bouton "Voir tous les services" -->
      <div class="text-center mt-8">
        <UiButton variant="primary" size="lg" @click="navigateTo('/services')">
          Voir tous nos services
        </UiButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'

export interface ServiceItem {
  title: string
  slug: string
  image: string
  description?: string
}

defineProps<{
  title: string
  services: ServiceItem[]
}>()
</script>