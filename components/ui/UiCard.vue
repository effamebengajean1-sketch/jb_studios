<template>
  <div
    class="group bg-ivory/5 rounded-lg overflow-hidden hover:bg-ivory/10 transition-colors"
    :class="[hoverable ? 'hover:shadow-xl hover:scale-[1.02]' : '']"
  >
    <!-- Slot image -->
    <div v-if="$slots.image" class="overflow-hidden">
      <slot name="image" />
    </div>

    <!-- Contenu -->
    <div class="p-6">
      <!-- Badge optionnel -->
      <slot name="badge" />

      <!-- Titre -->
      <h3 v-if="title" class="font-serif text-xl text-gold mb-2">
        {{ title }}
      </h3>

      <!-- Sous-titre -->
      <p v-if="subtitle" class="text-sm text-ivory/60 mb-3">
        {{ subtitle }}
      </p>

      <!-- Description -->
      <p v-if="description" class="text-ivory/80 text-sm leading-relaxed">
        {{ description }}
      </p>

      <!-- Footer (CTA, boutons, etc.) -->
      <div v-if="$slots.footer" class="mt-4">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  subtitle?: string
  description?: string
  hoverable?: boolean
}>(), {
  hoverable: true,
})
</script>