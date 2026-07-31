import type { Ref } from 'vue'

export interface GalleryImage {
  id: number | string
  src: string
  alt: string
  category: string
}

export interface VideoItem {
  id: number | string
  title: string
  category: string
  thumbnail: string
  embedUrl?: string
  src?: string
  platform: 'youtube' | 'vimeo' | 'local'
}

export function useGallery<T extends GalleryImage | VideoItem>(items: Ref<T[]>, categories: string[]) {
  const activeCategory = ref('Tous')
  const filteredItems = computed(() => {
    if (activeCategory.value === 'Tous') return items.value
    return items.value.filter((item) => item.category === activeCategory.value)
  })

  const setCategory = (category: string) => {
    activeCategory.value = category
  }

  return { activeCategory, filteredItems, setCategory, categories }
}