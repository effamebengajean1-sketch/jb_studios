// server/api/gallery-photos.get.ts
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.avif']
const EXCLUDED_FOLDERS = ['gallery', 'services', 'portfolio', 'hero', 'logo', 'gallery-preview']

async function scanImages(dir: string, baseDir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const images: string[] = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      if (EXCLUDED_FOLDERS.includes(entry.name)) continue
      const subImages = await scanImages(fullPath, baseDir)
      images.push(...subImages)
    } else if (entry.isFile()) {
      const ext = entry.name.toLowerCase().slice(entry.name.lastIndexOf('.'))
      if (IMAGE_EXTENSIONS.includes(ext)) {
        // Chemin relatif depuis public/images/
        const relativePath = fullPath.replace(baseDir, '').replace(/^\/+/, '')
        // ✅ AJOUT : préfixer par /images/
        images.push(`/images/${encodeURIComponent(relativePath)}`)
      }
    }
  }

  return images
}

function formatCategoryName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

export default defineEventHandler(async () => {
  const imagesDir = join(process.cwd(), 'public', 'images')

  try {
    const entries = await readdir(imagesDir, { withFileTypes: true })
    const categories: string[] = []
    const imageMap: Record<string, string[]> = {}

    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      if (EXCLUDED_FOLDERS.includes(entry.name)) continue

      const category = entry.name
      const categoryPath = join(imagesDir, category)

      const images = await scanImages(categoryPath, imagesDir)

      if (images.length > 0) {
        categories.push(category)
        imageMap[category] = images
      }
    }

    categories.sort()

    const categoriesDisplay = ['Tous', ...categories.map(cat => formatCategoryName(cat))]

    const images: Array<{ id: string; src: string; alt: string; category: string }> = []

    for (const category of categories) {
      const displayName = formatCategoryName(category)
      const imagePaths = imageMap[category] || []

      imagePaths.forEach((src, index) => {
        images.push({
          id: `${category}-${index + 1}`,
          src,
          alt: `${displayName} - Photo ${index + 1}`,
          category: displayName,
        })
      })
    }

    return {
      title: 'Galerie Photos',
      subtitle: 'Découvrez notre travail à travers différentes catégories',
      categories: categoriesDisplay,
      images,
      totalImages: images.length,
      totalCategories: categories.length,
    }
  } catch (error) {
    console.error('Erreur API galerie:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du chargement de la galerie',
    })
  }
})