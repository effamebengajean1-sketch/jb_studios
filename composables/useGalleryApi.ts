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
      const response = await $fetch('/data/gallery-photos.json')
      return response as GalleryData
    }
  )

  return {
    galleryData: data,
    pending,
    error,
    refresh,
  }
}
