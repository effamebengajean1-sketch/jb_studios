// composables/useGalleryApi.ts
export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}

export interface GalleryData {
  title: string
  subtitle: string
  categories: string[]
  images: GalleryImage[]
  totalImages: number
  totalCategories: number
}

export const useGalleryApi = () => {
  const { data, pending, error, refresh } = useAsyncData<GalleryData>(
    'gallery-photos',
    async () => {
      // Ajouter un timestamp pour éviter le cache
      const response = await $fetch(`/api/gallery-photos?t=${Date.now()}`)
      return response
    },
    {
      watch: [() => Date.now()],
    }
  )

  return {
    galleryData: data,
    pending,
    error,
    refresh,
  }
}