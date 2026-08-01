// scripts/generate-portfolio-data.cjs
// Génère public/data/portfolio.json au moment du build (npm run build)
// Évite de scanner le filesystem au runtime (impossible/fragile sur Vercel serverless)

const fs = require('fs')
const path = require('path')

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.avif']
const EXCLUDED_FOLDERS = ['gallery', 'services', 'hero', 'logo', 'gallery-preview', 'icones', 'location', 'portfolio']
const EXCLUDED_FILES = ['map-placeholder.jpg', 'abolam.jpg', 'concert.jpg', 'corporate.jpg', 'hero-accueil.jpg', 'hero-poster.jpg']

function getImagesInDir(dir, baseDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const images = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isFile()) {
      const ext = entry.name.toLowerCase().slice(entry.name.lastIndexOf('.'))
      if (IMAGE_EXTENSIONS.includes(ext)) {
        const relativePath = fullPath.replace(baseDir, '').replace(/^[/\\]+/, '').replace(/\\/g, '/')
        images.push(`/images/${encodeURIComponent(relativePath).replace(/%2F/g, '/')}`)
      }
    }
  }

  return images.sort()
}

function groupImagesIntoProjects(images) {
  const projectMap = new Map()

  for (const image of images) {
    const basename = image.split('/').pop() ?? image
    const match = decodeURIComponent(basename).match(/^(.+?)-cover\.\w+$/)
    if (match) {
      const projectName = match[1]
      if (!projectMap.has(projectName)) projectMap.set(projectName, [])
      projectMap.get(projectName).push(image)
    }
  }

  for (const image of images) {
    const basename = image.split('/').pop() ?? image
    const withoutExtension = decodeURIComponent(basename).replace(/\.\w+$/, '')
    const match = withoutExtension.match(/^(.+?)-(\d+)$/)
    if (match) {
      const projectName = match[1]
      if (!projectMap.has(projectName)) projectMap.set(projectName, [])
      const projectImages = projectMap.get(projectName)
      if (!projectImages.includes(image)) projectImages.push(image)
    }
  }

  const standaloneImages = images.filter(img => {
    const basename = decodeURIComponent(img.split('/').pop() ?? img)
    const withoutExtension = basename.replace(/\.\w+$/, '')
    if (withoutExtension.match(/^(.+?)-cover$/)) return false
    if (withoutExtension.match(/^(.+?)-(\d+)$/)) return false
    return true
  })

  for (const image of standaloneImages) {
    const basename = decodeURIComponent(image.split('/').pop() ?? image)
    const projectName = basename.replace(/\.\w+$/, '')
    if (!projectMap.has(projectName)) projectMap.set(projectName, [])
    projectMap.get(projectName).push(image)
  }

  const results = []
  for (const [projectName, projectImages] of projectMap) {
    const coverImage = projectImages.find(img => img.endsWith('-cover.jpg') || img.endsWith('-cover.webp')) ?? projectImages[0]
    results.push({ name: projectName, coverImage, images: projectImages.sort() })
  }

  results.sort((a, b) => a.name.localeCompare(b.name))
  return results
}

function formatCategoryName(name) {
  return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function generatePortfolioData() {
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  const entries = fs.readdirSync(imagesDir, { withFileTypes: true })
  const categories = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (EXCLUDED_FOLDERS.includes(entry.name)) continue

    const categoryPath = path.join(imagesDir, entry.name)
    const directImages = getImagesInDir(categoryPath, imagesDir)
    const filteredImages = directImages.filter(img => {
      const basename = img.split('/').pop() ?? img
      return !EXCLUDED_FILES.includes(basename)
    })

    const subDirs = []
    const subdirEntries = fs.readdirSync(categoryPath, { withFileTypes: true })
    for (const sub of subdirEntries) {
      if (sub.isDirectory()) subDirs.push(sub.name)
    }

    const subProjects = []
    let totalSubImages = 0

    for (const sub of subDirs) {
      const subPath = path.join(categoryPath, sub)
      const subImages = getImagesInDir(subPath, imagesDir)
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
    const coverImage = allProjects.length > 0 ? allProjects[0].coverImage : (filteredImages[0] ?? '')
    const clientCount = subDirs.length

    if (allProjects.length === 0) continue

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

  const result = {
    title: 'Portfolio',
    subtitle: 'Nos dernières réalisations',
    categories,
    totalCategories: categories.length,
    totalProjects: categories.reduce((sum, c) => sum + c.projectCount, 0),
    totalClients: categories.reduce((sum, c) => sum + c.clientCount, 0),
    totalImages: categories.reduce((sum, c) => sum + c.totalImages, 0),
  }

  const outDir = path.join(process.cwd(), 'public', 'data')
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'portfolio.json')
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8')

  console.log(`✅ portfolio.json généré : ${categories.length} catégories, ${result.totalProjects} projets, ${result.totalImages} photos`)
  console.log(`   → ${outPath}`)
}

generatePortfolioData()
