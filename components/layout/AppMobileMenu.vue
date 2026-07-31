<template>
  <!-- ═══════════════════════════════════════
       OVERLAY MENU (téléporté dans <body>)
       ═══════════════════════════════════════ -->
  <Teleport to="body">
    <Transition
      appear
      @enter="onEnter"
      @leave="onLeave"
    >
      <div
        v-if="modelValue"
        ref="menuRef"
        class="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        @click.self="close"
      >
        <!-- Navigation -->
        <nav class="flex flex-col items-center space-y-5 text-white font-serif uppercase">
          <NuxtLink
            v-for="item in menuLinks"
            :key="item.label"
            :to="item.link"
            class="text-2xl md:text-3xl tracking-wider hover:text-[#D91E1E] transition-colors duration-300"
            @click="close"
          >
            {{ item.label }}
          </NuxtLink>

          <!-- ✅ Le bouton Devis a été supprimé pour éviter le doublon -->
        </nav>

        <!-- ═══════════════════════════════════════
             BOUTON FERMETURE (croix SVG)
             ═══════════════════════════════════════ -->
        <button
          class="absolute top-5 right-5 text-white p-2 hover:text-[#D91E1E] hover:rotate-90 transition-all duration-300"
          aria-label="Fermer le menu"
          @click="close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
import gsap from 'gsap'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const menuRef = ref<HTMLElement | null>(null)

const menuLinks = [
  { label: 'Accueil', link: '/' },
  { label: 'Services', link: '/services' },
  { label: 'Galerie', link: '/galerie' },
  { label: 'Portfolio', link: '/portfolio' },
  { label: 'Tarifs', link: '/tarifs' },
  { label: 'À propos', link: '/a-propos' },
  { label: 'Devis', link: '/devis' }, // ✅ Le lien reste dans la liste
]

/* ── Scroll lock (SSR-safe) ── */
let lock: ReturnType<typeof useScrollLock> | null = null

onMounted(() => {
  lock = useScrollLock(document.body)
})

watch(() => props.modelValue, (val) => {
  if (lock) lock.value = val
})

/* ── Animations GSAP via hooks Transition ── */
const onEnter = (el: Element, done: () => void) => {
  gsap.fromTo(el,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', onComplete: done }
  )
}

const onLeave = (el: Element, done: () => void) => {
  gsap.to(el, {
    opacity: 0,
    scale: 0.95,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: done
  })
}

/* ── Actions ── */
const close = () => emit('update:modelValue', false)
</script>