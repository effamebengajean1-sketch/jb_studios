<template>
  <section class="py-section-padding-sm px-gutter bg-background border-y border-outline-variant/30 overflow-hidden">
    <div class="max-w-5xl mx-auto">
      <!-- ===== GRILLE DES STATISTIQUES ===== -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center relative">
        <!-- Séparateurs verticaux (uniquement sur desktop) -->
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="relative group py-4 px-2 rounded-xl transition-all duration-300 hover:bg-surface-container-low/30 hover:shadow-lg"
        >
          <!-- Séparateur entre les éléments (sauf le dernier) -->
          <div
            v-if="index < stats.length - 1"
            class="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-outline-variant/20"
          ></div>

          <div class="space-y-2">
            <!-- Icône décorative -->
            <div class="flex justify-center mb-1">
              <Icon
                :name="getIcon(stat.label)"
                class="text-2xl md:text-3xl text-primary-container/60 transition-colors duration-300 group-hover:text-primary-container"
              />
            </div>

            <!-- Valeur -->
            <p class="font-headline-md text-headline-md text-primary-container transition-colors duration-300 group-hover:text-primary">
              {{ stat.value }}
            </p>

            <!-- Label -->
            <p class="font-label-caps text-label-caps text-on-surface-variant/70 tracking-wider transition-colors duration-300 group-hover:text-on-surface-variant">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface StatItem {
  value: string | number
  label: string
}

defineProps<{
  stats: StatItem[]
}>()

// ===== ICÔNES PAR LABEL =====
const getIcon = (label: string): string => {
  const iconMap: Record<string, string> = {
    'ÉVÉNEMENTS': 'mdi:calendar-star',
    'ANNÉES D\'EXPÉRIENCE': 'mdi:clock-outline',
    'CLIENTS SATISFAITS': 'mdi:thumb-up-outline',
    'PRESTATIONS': 'mdi:briefcase-outline'
  }
  return iconMap[label] || 'mdi:star-outline'
}
</script>

<style scoped>
/* Pas de styles supplémentaires nécessaires, tout est géré par Tailwind */
</style>