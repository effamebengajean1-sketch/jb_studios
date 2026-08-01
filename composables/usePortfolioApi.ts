export interface PortfolioProject {
  name: string
  coverImage: string
  images: string[]
}

export interface PortfolioCategory {
  id: string
  name: string
  slug: string
  clientCount: number
  projectCount: number
  totalImages: number
  coverImage: string
  projects: PortfolioProject[]
}

export interface PortfolioData {
  title: string
  subtitle: string
  categories: PortfolioCategory[]
  totalCategories: number
  totalProjects: number
  totalClients: number
  totalImages: number
}

export const usePortfolioApi = () => {
  const { data, pending, error, refresh } = useAsyncData<PortfolioData>(
    'portfolio',
    async () => {
      const response = await $fetch('/data/portfolio.json')
      return response as PortfolioData
    }
  )

  return {
    portfolioData: data,
    pending,
    error,
    refresh,
  }
}
