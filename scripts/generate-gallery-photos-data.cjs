// scripts/generate-gallery-photos-data.cjs
// Génère public/data/gallery-photos.json au moment du build

const fs = require('fs')
const path = require('path')

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.avif']
const EXCLUDED_FOLDERS = ['gallery', 'services', 'portfolio', 'hero', 'logo', 'gallery-preview']

function scanImages(dir, baseDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const images = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (EXCLUDED_FOLDERS.includes(entry.name)) continue
      images.push(...scanImages(fullPath, baseDir))
    } else if (entry.isFile()) {
      const ext = entry.name.toLowerCase().slice(entry.name.lastIndexOf('.'))
      if (IMAGE_EXTENSIONS.includes(ext)) {
        const relativePath = fullPath.replace(baseDir, '').replace(/^[/\\]+/, '').replace(/\\/g, '/')
        images.push(`/images/${encodeURIComponent(relativePath).replace(/%2F/g, '/')}`)
      }
    }
  }

  return images
}

function formatCategoryName(name) {
  return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function generateGalleryPhotosData() {
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  const entries = fs.readdirSync(imagesDir, { withFileTypes: true })
  const categories = []
  const imageMap = {}

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (EXCLUDED_FOLDERS.includes(entry.name)) continue

    const category = entry.name
    const categoryPath = path.join(imagesDir, category)
    const images = scanImages(categoryPath, imagesDir)
    if (images.length > 0) {
      categories.push(category)
      imageMap[category] = images
    }
  }

  categories.sort()
  const categoriesDisplay = ['Tous', ...categories.map(cat => formatCategoryName(cat))]
  const images = []

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

  const result = {
    title: 'Galerie Photos',
    subtitle: 'Découvrez notre travail à travers différentes catégories',
    categories: categoriesDisplay,
    images,
    totalImages: images.length,
    totalCategories: categories.length,
  }

  const outDir = path.join(process.cwd(), 'public', 'data')
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'gallery-photos.json')
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8')

  console.log(`✅ gallery-photos.json généré : ${categories.length} catégories, ${images.length} photos`)
}

generateGalleryPhotosData()
