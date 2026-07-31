<template>
  <section class="py-section-padding-sm px-gutter bg-surface-container-low overflow-hidden">
    <!-- ===== EN-TÊTE AVEC ANIMATION ===== -->
    <div
      class="flex flex-wrap items-center justify-between gap-4 mb-10 md:mb-12 animate-fade-in-up"
      style="animation-delay: 0.1s"
    >
      <div>
        <h2 class="font-headline-md text-headline-md text-on-background border-l-4 border-primary-container pl-4">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-on-surface-variant mt-2">
          {{ subtitle }}
        </p>
      </div>
      <!-- ===== LIEN "VOIR TOUT" EN BLANC ===== -->
      <NuxtLink
        to="/galerie"
        class="font-label-caps text-label-caps text-white hover:text-white/80 transition-colors duration-300 group relative flex items-center gap-2"
      >
        <span>Voir tout</span>
        <span class="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110">
          →
        </span>
        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
      </NuxtLink>
    </div>

    <!-- ===== GRILLE DES IMAGES ===== -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[260px]">
      <div
        v-for="(image, index) in images.slice(0, 6)"
        :key="image.id || index"
        class="relative overflow-hidden cursor-pointer group animate-fade-in-up"
        :style="{ animationDelay: `${0.2 + index * 0.08}s` }"
        :class="{
          'col-span-2 row-span-2': index === 0,
          'col-span-1 row-span-1': index !== 0,
          'md:col-span-1 md:row-span-1': index > 0 && index < 4,
          'hidden md:block': index >= 4
        }"
        @click="navigateTo('/galerie')"
      >
        <!-- Image -->
        <NuxtImg
          :src="image.src"
          :alt="image.alt"
          loading="lazy"
          class="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 will-change-transform"
        />
        <!-- Overlay sombre -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 ease-out"></div>
        <!-- Badge catégorie -->
        <div
          class="absolute bottom-4 left-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
        >
          <span class="font-label-caps text-[10px] text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm tracking-wider">
            {{ image.category }}
          </span>
        </div>
        <!-- ===== LOUPE DÉCORATIVE AVEC <Icon> ===== -->
        <div
          class="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out"
        >
          <Icon
            name="mdi:magnify-plus"
            class="text-2xl text-white/70"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'

export interface GalleryImage {
  id?: string | number
  src: string
  alt: string
  category: string
}

defineProps<{
  title: string
  subtitle?: string
  images: GalleryImage[]
}>()
</script>

<style scoped>
/* ===== ANIMATION D'ENTRÉE ===== */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ===== LIEN "VOIR TOUT" : soulignement blanc ===== */
.NuxtLink {
  text-decoration: none;
  position: relative;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    auto-rows: 140px;
  }
  .col-span-2.row-span-2 {
    grid-column: span 2;
    grid-row: span 2;
  }
}

@media (max-width: 480px) {
  .grid {
    gap: 6px;
    auto-rows: 120px;
  }
  .col-span-2.row-span-2 {
    grid-column: span 2;
    grid-row: span 1;
  }
}
</style>