<!-- pages/portfolio/index.vue -->
<template>
  <div class="bg-brand-black min-h-screen pt-32 pb-20 px-6 md:px-8">
    <div class="max-w-7xl mx-auto">

      <!-- EN-TÊTE AVEC ANIMATION -->
      <div class="text-center mb-16 animate-fade-up">
        <span class="inline-block text-brand-red text-sm font-label-caps tracking-[0.3em] uppercase bg-brand-red/10 px-4 py-1.5 rounded-full mb-4">
          Nos réalisations
        </span>
        <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3 leading-tight">
          Portfolio
        </h1>
        <p class="text-white/60 font-body-md mt-4 max-w-xl mx-auto leading-relaxed">
          Découvrez nos projets phares en photo et vidéo événementielle
        </p>
        <div class="w-16 h-px bg-brand-red/50 mx-auto mt-6 animate-width"></div>
      </div>

      <!-- STATISTIQUES (calculées dynamiquement) -->
      <div v-if="stats" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 max-w-3xl mx-auto">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-500 hover:-translate-y-1 animate-fade-up"
          :style="{ animationDelay: `${0.1 + index * 0.1}s` }"
        >
          <p class="text-2xl md:text-3xl font-serif text-white">{{ stat.value }}</p>
          <p class="text-white/50 text-[10px] md:text-xs font-label-caps tracking-widest mt-1">{{ stat.label }}</p>
        </div>
      </div>

      <!-- GRILLE DES CATÉGORIES -->
      <div v-if="categories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(category, index) in categories"
          :key="category.slug"
          :to="`/portfolio/categorie/${category.slug}`"
          class="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-red/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/10 animate-fade-up"
          :style="{ animationDelay: `${0.2 + index * 0.1}s` }"
        >
          <!-- Image de couverture -->
          <div class="aspect-[16/9] overflow-hidden relative">
            <NuxtImg
              :src="category.coverImage || '/images/placeholder-category.jpg'"
              :alt="category.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <!-- Badge projets -->
            <div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white/70 text-[10px] px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
              <Icon name="mdi:image-multiple" class="text-xs" />
              {{ category.projectCount }} projet{{ category.projectCount > 1 ? 's' : '' }}
            </div>
          </div>

          <!-- Contenu texte -->
          <div class="p-5">
            <h3 class="font-serif text-xl text-white group-hover:text-brand-red transition-colors duration-300">
              {{ category.name }}
            </h3>
            <p v-if="category.description" class="text-white/50 text-sm mt-1 line-clamp-2">{{ category.description }}</p>
            <div class="flex items-center gap-2 mt-4 text-white/40 group-hover:text-brand-red transition-colors duration-300">
              <span class="text-xs font-label-caps tracking-widest">Explorer</span>
              <Icon name="mdi:arrow-right" class="text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- MESSAGE SI AUCUNE CATÉGORIE -->
      <div v-else-if="!pending" class="text-center py-20">
        <p class="text-white/50">Aucune catégorie disponible pour le moment.</p>
      </div>

      <!-- INDICATEUR DE CHARGEMENT -->
      <div v-if="pending" class="flex justify-center py-20">
        <div class="w-8 h-8 border-4 border-brand-red/30 border-t-brand-red rounded-full animate-spin"></div>
      </div>

      <!-- CTA FINAL -->
      <div class="text-center mt-16 pt-8 border-t border-white/10">
        <p class="text-white/60 text-sm mb-4">Vous avez un projet similaire ?</p>
        <NuxtLink
          to="/devis"
          class="inline-flex items-center gap-2 bg-brand-red hover:bg-red-600 text-white font-label-caps text-sm tracking-widest px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-1"
        >
          Demander un devis
          <Icon name="mdi:arrow-right" class="text-base transition-transform duration-300 group-hover:translate-x-1" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { portfolioData, pending, error } = usePortfolioApi()

// ⚠️ Filtre les catégories sans slug valide (évite les liens cassés du type /portfolio/categorie/)
const categories = computed(() =>
  (portfolioData.value?.categories ?? []).filter(c => !!c.slug)
)

// Statistiques calculées à partir des données
const stats = computed(() => {
  if (!portfolioData.value || categories.value.length === 0) return null
  const totalProjects = categories.value.reduce((acc, cat) => acc + (cat.projectCount || 0), 0)
  const totalClients = categories.value.reduce((acc, cat) => acc + (cat.clientCount || 0), 0)
  const totalImages = categories.value.reduce((acc, cat) => acc + (cat.totalImages || 0), 0)
  return [
    { label: 'Projets', value: totalProjects },
    { label: 'Clients', value: totalClients },
    { label: 'Photos', value: totalImages },
    { label: 'Catégories', value: categories.value.length },
  ]
})

definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Portfolio — JB STUDIO CAMEROUN',
  description: 'Découvrez nos réalisations : mariages, événements corporate, concerts et productions audiovisuelles.',
})
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
@keyframes expandWidth {
  0% { width: 0; }
  100% { width: 64px; }
}
.animate-width {
  animation: expandWidth 0.8s ease forwards;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}
</style>