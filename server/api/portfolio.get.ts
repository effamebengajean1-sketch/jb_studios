import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.avif']
const EXCLUDED_FOLDERS = ['gallery', 'services', 'hero', 'logo', 'gallery-preview', 'icones', 'location', 'portfolio']

const EXCLUDED_FILES = ['map-placeholder.jpg', 'abolam.jpg', 'concert.jpg', 'corporate.jpg', 'hero-accueil.jpg', 'hero-poster.jpg']

async function getImagesInDir(dir: string, baseDir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const images: string[] = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isFile()) {
      const ext = entry.name.toLowerCase().slice(entry.name.lastIndexOf('.'))
      if (IMAGE_EXTENSIONS.includes(ext)) {
        const relativePath = fullPath.replace(baseDir, '').replace(/^\/+/, '')
        images.push(`/images/${encodeURIComponent(relativePath)}`)
      }
    }
  }

  return images.sort()
}

function groupImagesIntoProjects(images: string[]): Array<{ name: string; coverImage: string; images: string[] }> {
  const projectMap = new Map<string, string[]>()

  for (const image of images) {
    const basename = image.split('/').pop() ?? image
    const match = basename.match(/^(.+?)-cover\.\w+$/)
    if (match) {
      const projectName = match[1]
      if (!projectMap.has(projectName)) {
        projectMap.set(projectName, [])
      }
      projectMap.get(projectName)?.push(image)
    }
  }

  for (const image of images) {
    const basename = image.split('/').pop() ?? image
    const withoutExtension = basename.replace(/\.\w+$/, '')
    const match = withoutExtension.match(/^(.+?)-(\d+)$/)
    if (match) {
      const projectName = match[1]
      if (!projectMap.has(projectName)) {
        projectMap.set(projectName, [])
      }
      const projectImages = projectMap.get(projectName)
      if (projectImages && !projectImages.includes(image)) {
        projectImages.push(image)
      }
    }
  }

  const standaloneImages = images.filter(img => {
    const basename = img.split('/').pop() ?? img
    const withoutExtension = basename.replace(/\.\w+$/, '')
    if (withoutExtension.match(/^(.+?)-cover$/)) return false
    if (withoutExtension.match(/^(.+?)-(\d+)$/)) return false
    return true
  })

  for (const image of standaloneImages) {
    const basename = image.split('/').pop() ?? image
    const withoutExtension = basename.replace(/\.\w+$/, '')
    const match = withoutExtension.match(/^(.+?)$/)
    if (match) {
      const projectName = match[1]
      if (!projectMap.has(projectName)) {
        projectMap.set(projectName, [])
      }
      projectMap.get(projectName)?.push(image)
    }
  }

  const results: Array<{ name: string; coverImage: string; images: string[] }> = []

  for (const [projectName, projectImages] of projectMap) {
    const coverImage = projectImages.find(img => img.endsWith('-cover.jpg') || img.endsWith('-cover.webp')) ?? projectImages[0]
    results.push({ name: projectName, coverImage, images: projectImages.sort() })
  }

  results.sort((a, b) => a.name.localeCompare(b.name))

  return results
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
    const categories: Array<{
      id: string
      name: string
      slug: string
      clientCount: number
      projectCount: number
      totalImages: number
      coverImage: string
      projects: Array<{ name: string; coverImage: string; images: string[] }>
    }> = []

    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      if (EXCLUDED_FOLDERS.includes(entry.name)) continue

      const categoryPath = join(imagesDir, entry.name)
      const directImages = await getImagesInDir(categoryPath, imagesDir)
      const filteredImages = directImages.filter(img => {
        const basename = img.split('/').pop() ?? img
        return !EXCLUDED_FILES.includes(basename)
      })

const subDirs: string[] = []
       const subdirEntries = await readdir(categoryPath, { withFileTypes: true })
       for (const sub of subdirEntries) {
         if (sub.isDirectory()) {
           subDirs.push(sub.name)
         }
       }

      const subProjects: Array<{ name: string; coverImage: string; images: string[] }> = []
      let totalSubImages = 0

      for (const sub of subDirs) {
        const subPath = join(categoryPath, sub)
        const subImages = await getImagesInDir(subPath, imagesDir)
        if (subImages.length > 0) {
          const coverImage = subImages.find(img => img.endsWith('-cover.jpg') || img.endsWith('-cover.webp')) ?? subImages[0]
          subProjects.push({ name: sub, coverImage, images: subImages })
          totalSubImages += subImages.length
        }
      }

      subProjects.sort((a, b) => a.name.localeCompare(b.name))

      const directProjects = groupImagesIntoProjects(filteredImages)

      const allProjects = [...subProjects, ...directProjects]
      const totalImages = totalSubImages + filteredImages.length
      const coverImage = allProjects.length > 0 ? allProjects[0].coverImage : filteredImages[0] ?? ''
      const clientCount = subDirs.length

      categories.push({
        id: entry.name,
        name: formatCategoryName(entry.name),
        slug: entry.name,
        clientCount,
        projectCount: allProjects.length,
        totalImages,
        coverImage,
        projects: allProjects,
      })
    }

    categories.sort((a, b) => a.name.localeCompare(b.name))

    return {
      title: 'Portfolio',
      subtitle: 'Nos dernières réalisations',
      categories,
      totalCategories: categories.length,
      totalProjects: categories.reduce((sum, c) => sum + c.projectCount, 0),
      totalClients: categories.reduce((sum, c) => sum + c.clientCount, 0),
      totalImages: categories.reduce((sum, c) => sum + c.totalImages, 0),
    }
  } catch (error) {
    console.error('Erreur API portfolio:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du chargement du portfolio',
    })
  }
})