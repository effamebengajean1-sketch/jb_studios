<template>
  <header
    ref="headerRef"
    class="fixed top-0 w-full z-50 transition-all duration-500"
    :class="[
      isScrolled 
        ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
        : 'bg-black/60 backdrop-blur-sm border-b border-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-gutter flex justify-between items-center h-16 md:h-20">
      <!-- Logo -->
      <NuxtLink 
        to="/" 
        class="group flex flex-col items-start transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
        tabindex="0"
      >
        <div class="flex items-center gap-2">
          <NuxtImg
            src="/images/logo/log.jpeg"
            alt="JB STUDIO CAMEROUN"
            class="h-6 md:h-8 w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.3)]"
            priority
          />
        </div>
        <span class="text-[8px] font-label-caps tracking-[0.3em] text-white/30 group-hover:text-white/70 transition-colors duration-300 mt-0.5">
          JB STUDIO CAMEROUN
        </span>
      </NuxtLink>

      <!-- Navigation desktop -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.link"
          class="relative px-4 py-2 font-label-caps text-[11px] tracking-[0.15em] text-white/60 hover:text-white transition-all duration-300 rounded hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:ring-offset-2 focus:ring-offset-black"
          :class="{ 
            'text-white': route.path === item.link,
            'text-white/60': route.path !== item.link
          }"
          tabindex="0"
        >
          {{ item.label }}
          
          <span
            v-if="route.path === item.link"
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.6)]"
          ></span>
          
          <span
            v-else
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-400 rounded-full transition-all duration-300 group-hover:w-4"
          ></span>

          <span class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style="background: radial-gradient(circle at center, rgba(220,38,38,0.08) 0%, transparent 70%);"></span>
        </NuxtLink>

        <div class="w-px h-6 bg-white/10 mx-2"></div>

        <!-- Bouton DEVIS en noir -->
        <UiButton 
          variant="secondary" 
          size="sm" 
          @click="navigateTo('/devis')"
          class="ml-2 bg-black/80 border border-white/20 text-white hover:bg-white/10 transition-all duration-300 shadow-lg shadow-red-500/10 hover:shadow-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:ring-offset-2 focus:ring-offset-black"
        >
          <span class="flex items-center gap-2 group">
            DEVIS
            <Icon name="mdi:arrow-right" class="text-sm transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </UiButton>
      </nav>

      <!-- ═══════════════════════════════════════
           BOUTON MENU MOBILE (icône)
           ═══════════════════════════════════════ -->
      <button
        class="md:hidden relative w-10 h-10 flex items-center justify-center text-white focus:outline-none rounded-lg hover:bg-white/5 transition-colors group focus:ring-2 focus:ring-red-500/40 focus:ring-offset-2 focus:ring-offset-black"
        :aria-expanded="isMenuOpen"
        aria-label="Menu principal"
        @click="toggleMenu"
        tabindex="0"
      >
        <!-- Icône hamburger ou fermeture via @nuxt/icon -->
        <Icon 
          :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" 
          class="text-2xl transition-transform duration-300"
          :class="isMenuOpen ? 'rotate-90' : ''"
        />

        <!-- Effet de glow quand le menu est ouvert -->
        <span 
          v-if="isMenuOpen"
          class="absolute inset-0 rounded-lg border border-red-500/30 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.2)]"
        ></span>
      </button>
    </div>

    <!-- Menu mobile -->
    <AppMobileMenu v-model="isMenuOpen" />
  </header>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
import { useScroll } from '@vueuse/core'

const route = useRoute()
const headerRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)

// Détection du scroll
const { y } = useScroll(window)
watch(y, (newY) => {
  isScrolled.value = newY > 30
}, { immediate: true })

// Navigation items
const navItems = [
  { label: 'SERVICES', link: '/services' },
  { label: 'GALERIE', link: '/galerie' },
  { label: 'PORTFOLIO', link: '/portfolio' },
  { label: 'TARIFS', link: '/tarifs' },
  { label: 'À PROPOS', link: '/a-propos' },
]

// Gestion du menu mobile
const isMenuOpen = ref(false)
const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }

// Fermer le menu quand on change de page
watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>

<style scoped>
/* Effet de glow sur les liens au focus */
nav a:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.4), 0 0 15px rgba(220, 38, 38, 0.1);
}
</style>