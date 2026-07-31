<template>
  <div class="bg-background min-h-screen pt-32 pb-20 px-gutter">
    <div class="max-w-6xl mx-auto">
      <div class="mb-12 text-center">
        <span class="text-brand-red text-sm font-label-caps tracking-widest uppercase">Actualités</span>
        <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-background mt-2">
          Blog & <span class="text-brand-red">Conseils</span>
        </h1>
        <p class="text-on-surface-variant font-body-md mt-3 max-w-xl mx-auto">
          Retrouvez nos conseils, coulisses et tendances du monde audiovisuel
        </p>
      </div>

      <!-- Filtres par catégorie -->
      <div class="flex flex-wrap gap-2 justify-center mb-8">
        <button
          v-for="cat in categories"
          :key="cat"
          class="px-4 py-2 text-sm font-label-caps tracking-widest uppercase transition-all duration-300 rounded-full"
          :class="selectedCategory === cat
            ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
            : 'text-on-surface-variant hover:text-on-background border border-outline-variant/30'
          "
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Articles -->
      <div v-if="!pending" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="article in filteredArticles"
          :key="article._path"
          :to="article._path"
          class="group block bg-surface-container-low rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-500"
        >
          <div class="relative aspect-[16/9] overflow-hidden">
            <NuxtImg
              :src="article.cover"
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <span class="inline-block px-3 py-1 text-[10px] font-label-caps tracking-widest bg-brand-red text-white rounded">
                {{ article.category }}
              </span>
            </div>
          </div>
          <div class="p-4">
            <p class="text-xs text-on-surface-variant">{{ new Date(article.date).toLocaleDateString('fr-FR') }}</p>
            <h3 class="font-serif text-on-background text-lg group-hover:text-brand-red transition-colors">
              {{ article.title }}
            </h3>
            <p v-if="article.readingTime" class="text-xs text-on-surface-variant mt-1">
              ⏱ {{ article.readingTime }} min de lecture
            </p>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-on-surface-variant">Chargement des articles...</p>
      </div>

      <div v-if="!pending && filteredArticles.length === 0" class="text-center py-12">
        <p class="text-on-surface-variant">Aucun article dans cette catégorie.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { data: articles, pending } = await useAsyncData('blog', () => {
  return queryContent('/blog')
    .sort({ date: -1 })
    .find()
})

const categories = ['Tous', ...new Set(articles.value?.map(a => a.category) || [])]
const selectedCategory = ref('Tous')

const filteredArticles = computed(() => {
  if (!articles.value) return []
  if (selectedCategory.value === 'Tous') return articles.value
  return articles.value.filter(a => a.category === selectedCategory.value)
})

useSeoMeta({
  title: 'Blog — JB STUDIO CAMEROUN',
  description: 'Conseils, tendances et coulisses du monde de la production audiovisuelle.'
})
</script>
