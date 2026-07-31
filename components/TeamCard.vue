<template>
  <div class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-brand-red/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/10">
    <div class="aspect-[4/3] overflow-hidden">
      <img
        :src="image"
        :alt="name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        @error="$event.target.src = '/images/placeholder-team.jpg'"
      />
    </div>
    <div class="p-5">
      <h3 class="font-serif text-lg text-white">{{ name }}</h3>
      <p class="text-brand-red text-xs font-label-caps tracking-widest uppercase mt-1">{{ role }}</p>
      <p class="text-white/60 text-sm mt-3 leading-relaxed">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  role: String,
  image: String,
  description: String
})
</script>