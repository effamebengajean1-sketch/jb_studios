<!-- components/sections/ContactQuickBlock.vue -->
<template>
  <section class="py-section-padding-sm px-gutter bg-background">
    <div class="max-w-4xl mx-auto">
      <div
        class="
          relative overflow-hidden rounded-2xl
          bg-gradient-to-br from-surface-container-high to-surface-container-low
          p-8 md:p-12
          shadow-lg shadow-outline-variant/10
          border border-outline-variant/20
          animate-fade-in-up
        "
      >
        <div class="absolute inset-0 opacity-5 pointer-events-none">
          <span class="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-red/10 blur-2xl" />
          <span class="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-brand-red/10 blur-2xl" />
        </div>

        <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <!-- Texte -->
          <div class="space-y-6">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="w-6 h-px bg-brand-red animate-slide-in-left" />
                <span class="font-label-caps text-[9px] text-brand-red tracking-[0.3em] uppercase">
                  Contactez-nous
                </span>
              </div>
              <h2 class="font-headline-md text-headline-md text-on-background leading-tight">
                {{ title }}
              </h2>
            </div>
            <p class="text-on-surface-variant text-[15px] md:text-[17px] leading-relaxed">
              {{ subtitle }}
            </p>
            <div class="flex flex-wrap gap-4 pt-2">
              <!-- Bouton Devis -->
              <UiButton
                variant="primary"
                class="btn-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                @click="navigateTo('/devis')"
              >
                {{ primaryCta.label }}
              </UiButton>
              <!-- Bouton WhatsApp avec icône SVG -->
              <UiButton
                variant="whatsapp"
                class="btn-whatsapp transition-all duration-300 hover:scale-105 hover:shadow-lg"
                @click="openWhatsapp"
              >
                <template #icon>
                  <NuxtImg
                    src="/images/icones/WhatsApp.svg"
                    alt="WhatsApp"
                    width="20"
                    height="20"
                    class="mr-2 inline-block transition-transform duration-300 group-hover:rotate-12"
                  />
                </template>
                {{ whatsappCta.label }}
              </UiButton>
            </div>
          </div>

          <!-- Coordonnées -->
          <div class="space-y-5 text-on-surface-variant">
            <div
              v-if="phone"
              class="flex items-center gap-4 p-3 rounded-xl bg-surface-container/30 backdrop-blur-sm transition-all duration-300 hover:bg-surface-container/60 hover:shadow-md hover:-translate-y-0.5"
            >
              <Icon name="mdi:phone" class="text-brand-red text-2xl transition-transform duration-300 group-hover:scale-110" />
              <a :href="`tel:${phone}`" class="hover:text-brand-red transition-colors duration-300">
                {{ phone }}
              </a>
            </div>
            <div
              v-if="email"
              class="flex items-center gap-4 p-3 rounded-xl bg-surface-container/30 backdrop-blur-sm transition-all duration-300 hover:bg-surface-container/60 hover:shadow-md hover:-translate-y-0.5"
            >
              <Icon name="mdi:email" class="text-brand-red text-2xl transition-transform duration-300 group-hover:scale-110" />
              <a :href="`mailto:${email}`" class="hover:text-brand-red transition-colors duration-300">
                {{ email }}
              </a>
            </div>
            <div
              v-if="address"
              class="flex items-center gap-4 p-3 rounded-xl bg-surface-container/30 backdrop-blur-sm transition-all duration-300 hover:bg-surface-container/60 hover:shadow-md hover:-translate-y-0.5"
            >
              <Icon name="mdi:map-marker" class="text-brand-red text-2xl transition-transform duration-300 group-hover:scale-110" />
              <span>{{ address }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
import { computed } from 'vue'

export interface ContactData {
  title: string
  subtitle: string
  phone?: string
  email?: string
  address?: string
  primaryCta: { label: string; link: string }
  whatsappCta: { label: string; link: string }
}

const props = defineProps<ContactData>()

const encodedMessage = computed(() => {
  const message = `Bonjour JB STUDIO CAMEROUN, je souhaite en savoir plus sur vos prestations.`
  return encodeURIComponent(message)
})

const openWhatsapp = () => {
  if (import.meta.client && props.phone) {
    // Nettoie le numéro : retire le "+", les espaces, tirets, etc. — ne garde que les chiffres
    const cleanPhone = props.phone.replace(/[^0-9]/g, '')
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage.value}`, '_blank')
  }
}
</script>

<style scoped>
/* ===== Animation d'entrée globale ===== */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ===== Animation du trait séparateur ===== */
@keyframes slide-in-left {
  from {
    transform: scaleX(0);
    transform-origin: left;
  }
  to {
    transform: scaleX(1);
    transform-origin: left;
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

/* ===== Boutons personnalisés ===== */
.btn-white {
  background-color: white !important;
  color: black !important;
  border-color: white !important;
}
.btn-white:hover {
  background-color: rgba(255, 255, 255, 0.85) !important;
  color: black !important;
}

.btn-whatsapp {
  background-color: #25D366 !important;
  color: white !important;
  border-color: #25D366 !important;
}
.btn-whatsapp:hover {
  background-color: #1ebe5c !important;
  color: white !important;
}

/* ===== Transition des cartes de contact au chargement (avec décalage) ===== */
.contact-item {
  opacity: 0;
  animation: fade-in-up 0.5s ease-out both;
}

.contact-item:nth-child(1) { animation-delay: 0.1s; }
.contact-item:nth-child(2) { animation-delay: 0.2s; }
.contact-item:nth-child(3) { animation-delay: 0.3s; }
</style>
