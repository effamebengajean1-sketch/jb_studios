<template>
  <section
    class="relative overflow-hidden bg-primary-container text-on-primary-container py-section-padding-sm px-gutter text-center"
  >
    <!-- Icône décorative avec animation flottante -->
    <div class="absolute top-0 right-0 p-12 opacity-10 pointer-events-none animate-float">
      <span class="material-symbols-outlined text-[200px]" style="font-variation-settings: 'FILL' 1;">
        {{ icon || 'videocam' }}
      </span>
    </div>

    <div class="relative z-10 max-w-2xl mx-auto animate-fade-in-up">
      <h2 class="font-headline-lg-mobile text-headline-lg-mobile mb-6">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="font-body-md text-body-md mb-8 opacity-90 max-w-xs mx-auto animate-fade-in-up animation-delay-200">
        {{ subtitle }}
      </p>
      <!-- Le bouton a été supprimé -->
    </div>
  </section>
</template>

<script setup lang="ts">
export interface CtaData {
  title: string
  subtitle?: string
  icon?: string
}

defineProps<CtaData>()
</script>

<style scoped>
/* Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out both;
}

.animation-delay-200 {
  animation-delay: 200ms;
}
.animation-delay-400 {
  animation-delay: 400ms;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>