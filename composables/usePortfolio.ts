// composables/usePortfolio.ts

export interface PortfolioProject {
  slug: string
  title: string
  category: string
  client: string
  date: string
  coverImage: string
  description: string
  services: string[]
  gallery: string[]
  testimonial?: {
    text: string
    author: string
  }
}

// Découvre automatiquement tous les fichiers data.ts dans data/[categorie]/[client]/
const modules = import.meta.glob('../data/**/data.ts', { eager: true }) as Record<string, { default: PortfolioProject }>

const allProjects: PortfolioProject[] = Object.values(modules).map((m) => m.default)

export const usePortfolio = () => {
  const getAllProjects = (): PortfolioProject[] => {
    return allProjects
  }

  const getProjectBySlug = (slug: string): PortfolioProject | undefined => {
    return allProjects.find((project) => project.slug === slug)
  }

  const getProjectsByCategory = (category: string): PortfolioProject[] => {
    if (category === 'Tous') return allProjects
    return allProjects.filter((project) => project.category === category)
  }

  const getCategories = (): string[] => {
    const categories = new Set(allProjects.map((p) => p.category))
    return ['Tous', ...Array.from(categories)]
  }

  return {
    getAllProjects,
    getProjectBySlug,
    getProjectsByCategory,
    getCategories
  }
}