// middleware/redirects.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Redirections d'anciennes URLs vers les nouvelles
  const redirects: Record<string, string> = {
    '/nos-services': '/services',
    '/nos-realisations': '/portfolio',
    // Ajoute ici d'autres redirections si besoin après la mise en ligne
  }

  const redirectTarget = redirects[to.path]
  if (redirectTarget) {
    return navigateTo(redirectTarget, { redirectCode: 301 })
  }
})
