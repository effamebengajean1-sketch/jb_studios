<template>
  <section class="py-section-padding-sm px-gutter bg-surface-container-low">
    <div class="max-w-7xl mx-auto">
      <!-- En-tête -->
      <div class="mb-12 text-center">
        <span class="text-brand-red text-sm font-sans uppercase tracking-widest">
          Réalisations
        </span>
        <h2 class="font-headline-md text-headline-md text-on-background border-l-4 border-primary-container pl-4 mt-3">
          Portfolio
        </h2>
        <p v-if="subtitle" class="text-on-surface-variant mt-2">
          {{ subtitle }}
        </p>
      </div>

      <!-- Catégories -->
      <div v-for="category in categories" :key="category.slug" class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="font-headline-md text-headline-md text-on-background">
              {{ category.name }}
            </h3>
            <p class="text-on-surface-variant text-sm mt-1">
              {{ category.clientCount }} client{{ category.clientCount > 1 ? 's' : '' }} · {{ category.projectCount }} projet{{ category.projectCount > 1 ? 's' : '' }}
            </p>
          </div>
          <NuxtLink
            :to="`/portfolio/categorie/${category.slug}`"
            class="font-label-caps text-label-caps text-primary-container hover:text-primary transition-colors"
          >
            Voir la catégorie →
          </NuxtLink>
        </div>

        <!-- Grille de projets -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="project in category.projects"
            :key="project.name"
            class="group bg-ivory/5 rounded-lg overflow-hidden hover:bg-ivory/10 transition-colors hover:shadow-xl hover:scale-[1.02]"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
<NuxtImg
              v-if="project.coverImage"
              :src="project.coverImage"
              :alt="project.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              <div class="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="font-label-caps text-[10px] text-white bg-black/50 px-3 py-1">
                  {{ project.images.length }} photo{{ project.images.length > 1 ? 's' : '' }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <h4 class="font-serif text-xl text-gold mb-2">
                {{ project.name }}
              </h4>
              <NuxtLink
                :to="`/portfolio/${category.slug}/${project.name}`"
                class="inline-block font-label-caps text-label-caps text-primary-container hover:text-primary transition-colors"
              >
                Voir le projet →
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>

      <!-- Vide -->
      <p v-if="categories.length === 0" class="text-white/50 text-center py-12 font-sans">
        Aucune réalisation pour le moment.
      </p>

      <!-- CTA -->
      <div v-if="categories.length > 0" class="text-center mt-12 pt-8 border-t border-white/10">
        <NuxtLink
          to="/portfolio"
          class="inline-block bg-primary-container text-white px-6 py-3 rounded font-sans hover:bg-primary-container/80 transition-colors"
        >
          Voir tout le portfolio
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PortfolioCategory, PortfolioData } from '~/composables/usePortfolioApi'

defineProps<{
  title?: string
  subtitle?: string
  categories: PortfolioCategory[]
}>()
</script>