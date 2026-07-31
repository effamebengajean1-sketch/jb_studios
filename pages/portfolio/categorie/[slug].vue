<!-- pages/portfolio/categorie/[slug].vue -->
<template>
  <div v-if="category" class="bg-brand-black min-h-screen pt-32 pb-20 px-6 md:px-8">
    <div class="max-w-7xl mx-auto">

      <!-- Fil d'ariane -->
      <nav class="flex flex-wrap items-center gap-2 text-sm text-white/50 mb-8 font-sans animate-fade-up">
        <NuxtLink to="/portfolio" class="hover:text-brand-red transition-colors flex items-center gap-1">
          <Icon name="mdi:home" class="text-sm" />
          Portfolio
        </NuxtLink>
        <Icon name="mdi:chevron-right" class="text-xs text-white/20" />
        <span class="text-white/80 font-medium">{{ category.name }}</span>
      </nav>

      <!-- En-tête -->
      <div class="mb-10 animate-fade-up" style="animation-delay: 0.1s;">
        <h1 class="font-serif text-white text-4xl md:text-5xl leading-tight">
          {{ category.name }}
        </h1>
        <p class="text-white/60 font-sans mt-3 flex flex-wrap items-center gap-4">
          <span class="flex items-center gap-1">
            <Icon name="mdi:account-group" class="text-sm" />
            {{ category.clientCount }} client{{ category.clientCount > 1 ? 's' : '' }}
          </span>
          <span class="flex items-center gap-1">
            <Icon name="mdi:folder-open" class="text-sm" />
            {{ category.projectCount }} projet{{ category.projectCount > 1 ? 's' : '' }}
          </span>
          <span class="flex items-center gap-1">
            <Icon name="mdi:image-multiple" class="text-sm" />
            {{ category.totalImages }} photo{{ category.totalImages > 1 ? 's' : '' }}
          </span>
        </p>
      </div>

      <!-- Grille -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <NuxtLink
          v-for="(project, index) in category.projects"
          :key="project.name"
          :to="`/portfolio/categorie/${category.slug}/${getProjectSlug(category.slug, project.name)}`"
          class="group block bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-brand-red/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/10 cursor-pointer animate-fade-up"
          :style="{ animationDelay: `${0.1 + index * 0.1}s` }"
        >
            <NuxtImg
              :src="project.coverImage"
              :alt="project.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <span class="font-label-caps text-[10px] text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <Icon name="mdi:image" class="text-xs mr-1" />
                {{ project.images.length }} photo{{ project.images.length > 1 ? 's' : '' }}
              </span>
            </div>
            <div class="p-5">
            <h3 class="font-serif text-xl text-white group-hover:text-brand-red transition-colors duration-300">
              {{ project.name }}
            </h3>
            <span class="inline-flex items-center gap-1 font-label-caps text-xs tracking-widest text-white/40 group-hover:text-brand-red transition-colors duration-300 mt-2">
              Voir la galerie
              <Icon name="mdi:arrow-right" class="text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
          </NuxtLink>
      </div>

      <!-- Message si aucun projet -->
      <p v-if="category.projects.length === 0" class="text-white/50 text-center py-12 font-sans">
        Aucune réalisation dans cette catégorie pour le moment.
      </p>

      <!-- CTA -->
      <div class="flex flex-wrap items-center justify-center gap-4 mt-16 pt-8 border-t border-white/10 animate-fade-up" style="animation-delay: 0.3s;">
        <NuxtLink
          to="/portfolio"
          class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-label-caps text-sm tracking-widest px-6 py-3 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300"
        >
          <Icon name="mdi:arrow-left" class="text-sm" />
          Retour au portfolio
        </NuxtLink>
        <NuxtLink
          to="/devis"
          class="inline-flex items-center gap-2 bg-brand-red hover:bg-red-600 text-white font-label-caps text-sm tracking-widest px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-1"
        >
          Demander un devis
          <Icon name="mdi:arrow-right" class="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </NuxtLink>
      </div>

      </div>
  </div>

  <!-- État chargement / introuvable -->
  <div v-else-if="!pending" class="bg-brand-black min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
    <div class="text-center max-w-md mx-auto">
      <div class="text-6xl mb-4">🔍</div>
      <h2 class="text-white font-serif text-2xl mb-4">Catégorie introuvable</h2>
      <p class="text-white/50 font-sans mb-8">La catégorie que vous cherchez n'existe pas.</p>
      <NuxtLink to="/portfolio" class="inline-flex items-center gap-2 text-brand-red hover:text-red-400 transition-colors font-sans">
        <Icon name="mdi:arrow-left" class="text-sm" />
        Retour au portfolio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { slugify } from '~/composables/useSlug'
import { portfolioProjects } from '~/content/portfolio-data'

const route = useRoute()
const { portfolioData, pending } = usePortfolioApi()

// Catégorie — filtre les projets sans nom valide
const category = computed(() => {
  if (!portfolioData.value?.categories) return null
  const found = portfolioData.value.categories.find(c => c.slug === route.params.slug) ?? null
  if (!found) return null
  return { ...found, projects: found.projects.filter(p => !!p.name) }
})

// Trouver le slug portfolio-data.ts correspondant à une catégorie+nom d'API
function getProjectSlug(apiCategorySlug: string, apiProjectName: string): string {
  const categoryMatch = portfolioProjects.find(p => slugify(p.folder) === slugify(apiCategorySlug))
  if (categoryMatch) return categoryMatch.slug
  const projectMatch = portfolioProjects.find(p =>
    slugify(p.folder) === slugify(apiProjectName) ||
    apiProjectName.toLowerCase().includes(p.title.toLowerCase()) ||
    p.title.toLowerCase().includes(apiProjectName.toLowerCase())
  )
  return projectMatch?.slug ?? slugify(apiProjectName)
}

// Gestion 404
if (!category.value && !pending.value) {
  throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable' })
}

// SEO
watch(category, (newCategory) => {
  if (newCategory) {
    useSeoMeta({
      title: `${newCategory.name} — Portfolio — JB STUDIO CAMEROUN`,
      description: `Découvrez nos réalisations ${newCategory.name}.`,
    })
  }
}, { immediate: true })

definePageMeta({ layout: 'default' })
</script>

<style scoped>
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  opacity: 0;
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.group {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.group img {
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>