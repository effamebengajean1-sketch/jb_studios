import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
const EXCLUDED_FOLDERS = ['gallery', 'services', 'hero', 'logo', 'gallery-preview', 'icones', 'location', 'shooting-studio', 'portfolio']

async function scanVideos(dir: string, baseDir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const videos: string[] = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isFile()) {
      const ext = entry.name.toLowerCase().slice(entry.name.lastIndexOf('.'))
      if (VIDEO_EXTENSIONS.includes(ext)) {
        const relativePath = fullPath.replace(baseDir, '').replace(/^\/+/, '')
        videos.push(`/videos/${encodeURIComponent(relativePath)}`)
      }
    }
  }

  return videos.sort()
}

function formatVideoName(name: string): string {
  return name
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

export default defineEventHandler(async () => {
  const videosDir = join(process.cwd(), 'public', 'videos')
  const thumbnailsDir = join(process.cwd(), 'public', 'videos', 'thumbnails')

  try {
    const entries = await readdir(videosDir, { withFileTypes: true })
    const thumbnails = await readdir(thumbnailsDir).catch(() => [] as string[])
    const videos: Array<{ id: string; title: string; src: string; thumbnail: string; category: string; platform: 'local' }> = []

    for (const entry of entries) {
      if (!entry.isFile()) continue
      const ext = entry.name.toLowerCase().slice(entry.name.lastIndexOf('.'))
      if (!VIDEO_EXTENSIONS.includes(ext)) continue

      const src = `/videos/${entry.name}`
      const title = formatVideoName(entry.name)
      const category = 'Vidéo'
      const thumbName = entry.name.replace(/\.[^/.]+$/, '.jpg')
      const hasThumb = thumbnails.includes(thumbName)
      const thumbnail = hasThumb ? `/videos/thumbnails/${thumbName}` : ''

      videos.push({
        id: entry.name,
        title,
        src,
        thumbnail,
        category,
        platform: 'local',
      })
    }

    videos.sort((a, b) => a.title.localeCompare(b.title))

    return {
      title: 'Galerie Vidéos',
      subtitle: 'Découvrez nos réalisations en mouvement',
      categories: ['Tous'],
      videos,
      totalVideos: videos.length,
    }
  } catch (error) {
    console.error('Erreur API vidéos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du chargement de la galerie vidéo',
    })
  }
})