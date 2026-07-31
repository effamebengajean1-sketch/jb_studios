<template>
  <div class="w-full h-64 md:h-80 bg-surface-container-low flex items-center justify-center text-on-surface-variant">
    <div class="text-center">
      <span class="material-symbols-outlined text-6xl text-primary-container">location_on</span>
      <p class="mt-2">{{ address }}</p>
      <p class="text-sm">(Carte disponible avec une clé API)</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ address: String })
</script>