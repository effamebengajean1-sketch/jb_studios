export interface VideoItem {
  id: string
  title: string
  category: string
  thumbnail: string
  src: string
  platform: 'local'
}

export interface GalleryVideosData {
  title: string
  subtitle: string
  categories: string[]
  videos: VideoItem[]
  totalVideos: number
}

export const useGalleryVideosApi = () => {
  const { data, pending, error, refresh } = useAsyncData<GalleryVideosData>(
    'gallery-videos',
    async () => {
      const response = await $fetch('/api/gallery-videos')
      return response
    },
    {
      watch: [() => Date.now()],
    }
  )

  return {
    galleryVideosData: data,
    pending,
    error,
    refresh,
  }
}