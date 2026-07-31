<template>
  <div v-if="article" class="bg-background min-h-screen pt-32 pb-20 px-gutter">
    <div class="max-w-3xl mx-auto">
      <div class="mb-8">
        <NuxtLink to="/blog" class="text-on-surface-variant hover:text-brand-red transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined text-base">arrow_back</span>
          Retour au blog
        </NuxtLink>
      </div>

      <div class="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
        <NuxtImg
          :src="article.cover"
          :alt="article.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute top-4 left-4">
          <span class="inline-block px-3 py-1 text-[10px] font-label-caps tracking-widest bg-brand-red text-white rounded">
            {{ article.category }}
          </span>
        </div>
      </div>

      <div class="mb-8">
        <p class="text-sm text-on-surface-variant">
          {{ new Date(article.date).toLocaleDateString('fr-FR') }}
          <span v-if="article.readingTime"> · ⏱ {{ article.readingTime }} min de lecture</span>
        </p>
        <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-background mt-2">
          {{ article.title }}
        </h1>
      </div>

      <div class="prose prose-invert max-w-none">
        <ContentRenderer :value="article" />
      </div>

      <div class="mt-12 pt-8 border-t border-outline-variant/30">
        <p class="text-on-surface-variant mb-4">Un projet à réaliser ?</p>
        <UiButton variant="primary" @click="navigateTo('/devis')">
          Discutons de votre projet
        </UiButton>
      </div>
    </div>
  </div>

  <div v-else-if="pending" class="bg-background min-h-screen pt-32 pb-20 px-gutter flex items-center justify-center">
    <p class="text-on-surface-variant">Chargement...</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: article, pending } = await useAsyncData(`blog-${route.params.slug}`, async () => {
  const data = await queryContent('/blog')
    .where({ _path: { $eq: `/blog/${route.params.slug}` } })
    .findOne()
  
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Article non trouvé'
    })
  }
  
  return data
})

definePageMeta({ layout: 'default' })

useSeoMeta({
  title: article.value?.title || 'Article — JB STUDIO CAMEROUN',
  description: article.value?.title ? `Lisez l'article ${article.value.title}` : ''
})
</script>
