<template>
  <div class="flex flex-wrap gap-2 justify-center mb-8 md:mb-8">
    <div class="relative w-full md:w-auto md:hidden">
      <select
        :value="activeCategory"
        @change="$emit('update:category', ($event.target as HTMLSelectElement).value)"
        class="w-full appearance-none bg-surface-container-high text-on-background border border-outline-variant/30 rounded-full px-4 py-3 pr-10 text-sm font-label-caps tracking-widest uppercase focus:border-brand-red focus:outline-none"
      >
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <span class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
    <div class="hidden md:flex flex-wrap gap-2 justify-center flex-1">
      <button
        v-for="category in categories"
        :key="category"
        class="px-4 py-2 text-sm font-label-caps tracking-widest uppercase transition-all duration-300 rounded-full"
        :class="activeCategory === category
          ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
          : 'text-on-surface-variant hover:text-on-background border border-outline-variant/30 hover:border-brand-red/50'
        "
        @click="$emit('update:category', category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ categories: string[], activeCategory: string }>()
defineEmits<{ (e: 'update:category', category: string): void }>()
</script>