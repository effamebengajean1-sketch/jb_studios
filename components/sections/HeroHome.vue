<template>
  <section
    class="relative min-h-screen w-full flex items-center justify-start overflow-hidden px-4 sm:px-6 md:px-gutter"
    role="banner"
    aria-label="Bannière principale"
  >
    <!-- ===== FOND ===== -->
    <div class="absolute inset-0 z-0">
      <!-- Dégradé dynamique -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#1a0a0a] to-transparent"></div>

      <!-- Image avec parallaxe -->
      <NuxtImg
        v-if="imageSrc"
        :src="imageSrc"
        :alt="imageAlt || title"
        class="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none will-change-transform"
        :class="isParallax ? 'animate-parallax' : ''"
        loading="eager"
        priority
        sizes="100vw"
        format="webp"
      />
    </div>

    <!-- ===== PARTICULES DÉCORATIVES ===== -->
    <div class="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        v-for="i in 20"
        :key="i"
        class="absolute w-1 h-1 bg-white/20 rounded-full animate-particle"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: (Math.random() * 10) + 's',
          animationDuration: (10 + Math.random() * 20) + 's',
          width: (Math.random() * 4 + 2) + 'px',
          height: (Math.random() * 4 + 2) + 'px',
        }"
      ></div>
    </div>

    <!-- ===== CONTENU PRINCIPAL ===== -->
    <div class="relative z-20 max-w-5xl w-full text-left py-20 md:py-32">
      <!-- Badge -->
      <div
        class="flex items-center gap-3 mb-4 md:mb-6 animate-fade-in-up"
        style="animation-delay: 0.1s"
      >
        <span class="w-10 md:w-16 h-px bg-brand-red animate-glow-pulse" aria-hidden="true"></span>
        <span class="font-label-caps text-[10px] md:text-[12px] text-brand-red tracking-[0.4em] uppercase animate-glow-pulse-slow">
          {{ badge || 'Studio de Production Haut de Gamme' }}
        </span>
      </div>

      <!-- ===== TITRE ===== -->
      <h1
        class="font-headline-lg-mobile text-[48px] sm:text-[56px] md:text-[72px] lg:text-[88px] text-on-background leading-[1.05] mb-4 md:mb-6 max-w-4xl animate-fade-in-up"
        style="animation-delay: 0.2s"
      >
        <span v-html="animatedTitle"></span>
      </h1>

      <!-- ===== SOUS-TITRE (préservé de la version originale) ===== -->
      <p
        v-if="subtitle"
        class="text-on-surface-variant font-body-lg text-[20px] md:text-[26px] max-w-2xl leading-relaxed animate-fade-in-up"
        style="animation-delay: 0.4s"
      >
        {{ subtitle }}
      </p>

      <!-- ===== DESCRIPTION ===== -->
      <div
        v-if="description"
        class="max-w-xl mt-4 text-on-surface-variant/80 font-body-md text-[16px] md:text-[18px] leading-relaxed animate-fade-in-up"
        style="animation-delay: 0.5s"
      >
        <p>{{ description }}</p>
      </div>
      <div
        v-else
        class="max-w-xl mt-4 text-on-surface-variant/60 font-body-md text-[16px] md:text-[18px] leading-relaxed animate-fade-in-up"
        style="animation-delay: 0.5s"
      >
        <p>
          De la photographie événementielle à la production audiovisuelle,
          nous donnons vie à vos histoires avec élégance et exigence.
        </p>
      </div>

      <!-- ===== BOUTONS ===== -->
      <div
        class="flex flex-wrap items-center gap-4 md:gap-6 mt-8 md:mt-10 animate-fade-in-up"
        style="animation-delay: 0.6s"
      >
        <!-- Bouton principal -->
        <UiButton
          variant="secondary"
          size="lg"
          @click="navigateTo(primaryCta.link)"
          class="
            !bg-white !text-brand-black hover:!bg-gray-100
            active:scale-95 transition-all duration-300 ease-out
            text-[13px] md:text-[15px] px-7 md:px-8 py-3.5 md:py-4
            tracking-[0.15em] rounded-none
            shadow-xl hover:shadow-2xl
            focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-black
            animate-pulse-glow
          "
        >
          {{ primaryCta.label }}
        </UiButton>

        <!-- Bouton secondaire -->
        <UiButton
          v-if="secondaryCta"
          variant="secondary"
          size="lg"
          @click="navigateTo(secondaryCta.link)"
          class="
            !border-2 !border-white !text-white
            hover:!bg-white hover:!text-brand-black
            active:scale-95 transition-all duration-300 ease-out
            text-[13px] md:text-[15px] px-7 md:px-8 py-3.5 md:py-4
            tracking-[0.15em] rounded-none
            focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-black
            animate-pulse-glow-slow
          "
        >
          {{ secondaryCta.label }}
        </UiButton>
      </div>
    </div>

    <!-- ===== INDICATEUR DE SCROLL ===== -->
    <div
      class="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow hidden sm:flex"
      aria-hidden="true"
    >
      <span class="font-label-caps text-[10px] text-on-surface-variant/40 tracking-[0.4em] uppercase animate-pulse-slow">
        Découvrir
      </span>
      <div class="w-8 h-12 border-2 border-brand-red/30 rounded-full flex items-start justify-center pt-3 animate-glow-pulse">
        <span class="block w-1.5 h-2.5 bg-brand-red rounded-full animate-scroll-indicator"></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
import { computed } from 'vue'

export interface HeroCta {
  label: string
  link: string
}

export interface HeroData {
  title: string
  subtitle?: string        // <-- Sous-titre bien présent !
  badge?: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  isParallax?: boolean
  primaryCta: HeroCta
  secondaryCta?: HeroCta
}

const props = defineProps<HeroData>()

// Effet "typewriter" sur le titre
const animatedTitle = computed(() => {
  const words = props.title.split(' ')
  return words
    .map((word, idx) => {
      const delay = 0.5 + idx * 0.15
      return `<span class="inline-block animate-char" style="animation-delay: ${delay}s">${word}</span>`
    })
    .join(' ')
})
</script>

<style scoped>
/* ===== ANIMATIONS DE BASE ===== */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ===== PARALLAXE ===== */
@keyframes parallax {
  0% {
    transform: scale(1) translateY(0);
  }
  100% {
    transform: scale(1.08) translateY(-30px);
  }
}

.animate-parallax {
  animation: parallax 20s ease-in-out infinite alternate;
}

/* ===== SCROLL INDICATOR ===== */
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(12px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2.8s ease-in-out infinite;
}

@keyframes scroll-indicator {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(16px);
    opacity: 0;
  }
}

.animate-scroll-indicator {
  animation: scroll-indicator 2s ease-in-out infinite;
}

/* ===== PARTICULES ===== */
@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-30px) translateX(20px) scale(1.2);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-60px) translateX(-10px) scale(0.8);
    opacity: 0.5;
  }
  75% {
    transform: translateY(-90px) translateX(30px) scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: translateY(-120px) translateX(0) scale(1);
    opacity: 0.2;
  }
}

.animate-particle {
  animation: float-particle 15s infinite alternate ease-in-out;
  will-change: transform, opacity;
}

/* ===== GLOW PULSE ===== */
@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
  }
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse-slow {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

.animate-glow-pulse-slow {
  animation: glow-pulse-slow 3s ease-in-out infinite;
}

/* ===== TYPEWRITER (caractères) ===== */
@keyframes char-appear {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-char {
  display: inline-block;
  animation: char-appear 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ===== PULSE SUR LES BOUTONS ===== */
@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.25);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2.5s ease-in-out infinite;
}

.animate-pulse-glow-slow {
  animation: pulse-glow 3.5s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.9;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 2.2s ease-in-out infinite;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .font-headline-lg-mobile {
    font-size: 36px !important;
  }
  .text-on-surface-variant.font-body-lg {
    font-size: 18px !important;
  }
}

@media (max-width: 480px) {
  .font-headline-lg-mobile {
    font-size: 28px !important;
    line-height: 1.1 !important;
  }
  .text-on-surface-variant.font-body-lg {
    font-size: 16px !important;
  }
  .animate-bounce-slow {
    display: none;
  }
}
</style>