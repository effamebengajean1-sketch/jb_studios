<template>
  <footer
    ref="footerRef"
    class="bg-black text-white border-t border-white/10 mt-auto overflow-hidden relative"
  >
    <!-- Ligne décorative animée -->
    <div class="absolute top-0 left-0 w-full h-px bg-white/10">
      <div ref="lineRef" class="h-full w-0 bg-[#D91E1E]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-16 relative">
      <!-- Grille principale -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Colonne 1 - Marque -->
        <div ref="col1" class="space-y-4">
          <div class="font-headline-md text-headline-md tracking-tighter text-white">
            JB STUDIO CAMEROUN
          </div>
          <p class="font-body-md text-body-md text-white max-w-xs leading-relaxed">
            Production audiovisuelle &amp; photographie événementielle.
            Chaque instant mérite d'être raconté avec élégance.
          </p>
          <div class="flex items-center gap-3">
            <span class="w-8 h-px bg-white/30"></span>
            <span class="text-[10px] font-label-caps text-white/50 tracking-[0.2em] uppercase">Since 2024</span>
          </div>
        </div>

        <!-- Colonne 2 - Navigation -->
        <div ref="col2" class="space-y-4">
          <h4 class="font-label-caps text-[10px] text-white/40 tracking-[0.3em] uppercase">
            Navigation
          </h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.label">
              <NuxtLink
                :to="link.url"
                class="font-body-md text-body-md text-white hover:text-[#D91E1E] transition-all duration-300 relative group inline-block"
              >
                {{ link.label }}
                <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D91E1E] transition-all duration-300 group-hover:w-full"></span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Colonne 3 - Contact (avec nuxt-icon) -->
        <div ref="col3" class="space-y-4">
          <h4 class="font-label-caps text-[10px] text-white/40 tracking-[0.3em] uppercase">
            Contact
          </h4>
          <ul class="space-y-4">
            <li>
              <a
                :href="`tel:${contact.phone}`"
                class="font-body-md text-body-md text-white hover:text-[#D91E1E] transition-all duration-300 flex items-center gap-3 group"
              >
                <Icon name="mdi:phone" class="text-white/40 group-hover:text-[#D91E1E] transition-colors duration-300 text-lg" />
                {{ contact.phone }}
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${contact.email}`"
                class="font-body-md text-body-md text-white hover:text-[#D91E1E] transition-all duration-300 flex items-center gap-3 group"
              >
                <Icon name="mdi:email" class="text-white/40 group-hover:text-[#D91E1E] transition-colors duration-300 text-lg" />
                {{ contact.email }}
              </a>
            </li>
            <li>
              <span class="font-body-md text-body-md text-white flex items-center gap-3">
                <Icon name="mdi:map-marker" class="text-white/40 text-lg" />
                {{ contact.address }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Colonne 4 - Réseaux sociaux -->
        <div ref="col4" class="space-y-4">
          <h4 class="font-label-caps text-[10px] text-white/40 tracking-[0.3em] uppercase">
            Suivez-nous
          </h4>
          <div class="flex flex-wrap gap-3">
            <a
              v-for="(item, platform) in socialLinks"
              :key="platform"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-[#D91E1E] rounded transition-all duration-300 hover:scale-110 hover:bg-[#D91E1E]/10 group"
              :aria-label="item.label"
            >
              <NuxtImg
                :src="`/images/icones/${item.icon}`"
                :alt="item.label"
                class="w-6 h-6 object-contain transition-all duration-300 group-hover:brightness-150"
              />
            </a>
          </div>
          <p class="text-xs text-white/30 font-body-md leading-relaxed">
            Suivez-nous pour découvrir nos dernières réalisations.
          </p>
        </div>
      </div>

      <!-- Bas de footer -->
      <div ref="bottomRef" class="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="font-label-caps text-[10px] text-white/30 tracking-[0.15em] text-center">
          © {{ new Date().getFullYear() }} JB STUDIO CAMEROUN. TOUS DROITS RÉSERVÉS.
        </p>
        <div class="flex items-center gap-6 flex-wrap justify-center">
          <NuxtLink
            to="/mentions-legales"
            class="font-label-caps text-[10px] text-white/30 hover:text-[#D91E1E] transition-colors duration-300 tracking-[0.15em] uppercase"
          >
            Mentions légales
          </NuxtLink>
          <NuxtLink
            to="/confidentialite"
            class="font-label-caps text-[10px] text-white/30 hover:text-[#D91E1E] transition-colors duration-300 tracking-[0.15em] uppercase"
          >
            Confidentialité
          </NuxtLink>
          <span class="text-white/20 text-[10px]">|</span>
          <span class="font-label-caps text-[10px] text-white/20 tracking-[0.15em]">
            Site réalisé par <span class="text-[#D91E1E]">Effario</span>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { siteConfig } from '~/data/site-config'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Navigation avec tous les liens du site
const quickLinks = [
  { label: 'Accueil', url: '/' },
  { label: 'Services', url: '/services' },
  { label: 'Galerie', url: '/galerie' },
  { label: 'Portfolio', url: '/portfolio' },
  { label: 'Tarifs', url: '/tarifs' },
  { label: 'À propos', url: '/a-propos' },
  { label: 'Devis', url: '/devis' },
]

const contact = siteConfig.contact

// Réseaux sociaux avec icônes SVG (inchangés)
const socialLinks = {
  instagram: {
    label: 'Instagram',
    url: 'https://www.instagram.com/jeanbruno00237?igsh=aHo0ZDQ4dmdpcGY5',
    icon: 'Instagram.svg'
  },
  facebook: {
    label: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61568133363249',
    icon: 'Facebook.svg'
  },
  youtube: {
    label: 'YouTube',
    url: 'https://youtube.com/jbstudios',
    icon: 'Youtube.svg'
  },
  tiktok: {
    label: 'TikTok',
    url: 'https://tiktok.com/@jbs.cameroun237',
    icon: 'Tik Tok.svg'
  },
  whatsapp: {
    label: 'WhatsApp',
    url: 'https://wa.me/2376XXXXXXXX',
    icon: 'WhatsApp.svg'
  },
}

// Références DOM
const footerRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
const col1 = ref<HTMLElement | null>(null)
const col2 = ref<HTMLElement | null>(null)
const col3 = ref<HTMLElement | null>(null)
const col4 = ref<HTMLElement | null>(null)
const bottomRef = ref<HTMLElement | null>(null)

// Animations GSAP
onMounted(() => {
  if (import.meta.server) return

  gsap.registerPlugin(ScrollTrigger)

  const ctx = gsap.context(() => {
    // Ligne décorative rouge
    if (lineRef.value) {
      gsap.to(lineRef.value, {
        width: '100%',
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: footerRef.value,
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
      })
    }

    // Colonnes
    const columns = [col1.value, col2.value, col3.value, col4.value].filter(Boolean)
    if (columns.length) {
      gsap.from(columns, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: footerRef.value,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }

    // Bas de footer
    if (bottomRef.value) {
      gsap.from(bottomRef.value, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.6,
        scrollTrigger: {
          trigger: bottomRef.value,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      })
    }
  })

  onUnmounted(() => ctx.revert())
})
</script>