// scripts/generate-gallery-videos-data.cjs
// Génère public/data/gallery-videos.json au moment du build

const fs = require('fs')
const path = require('path')

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi']

function formatVideoName(name) {
  return name
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

function generateGalleryVideosData() {
  const videosDir = path.join(process.cwd(), 'public', 'videos')
  const thumbnailsDir = path.join(process.cwd(), 'public', 'videos', 'thumbnails')

  const entries = fs.readdirSync(videosDir, { withFileTypes: true })
  let thumbnails = []
  try {
    thumbnails = fs.readdirSync(thumbnailsDir)
  } catch {
    thumbnails = []
  }

  const videos = []

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

  const result = {
    title: 'Galerie Vidéos',
    subtitle: 'Découvrez nos réalisations en mouvement',
    categories: ['Tous'],
    videos,
    totalVideos: videos.length,
  }

  const outDir = path.join(process.cwd(), 'public', 'data')
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'gallery-videos.json')
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8')

  console.log(`✅ gallery-videos.json généré : ${videos.length} vidéos`)
}

generateGalleryVideosData()
