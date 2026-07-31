<template>
  <section class="bg-background px-gutter py-section-padding-sm overflow-hidden">
    <div class="max-w-5xl mx-auto">
      <!-- Badge -->
      <div class="mb-6 md:mb-8">
        <span class="font-label-caps text-label-caps text-primary-container uppercase tracking-widest">
          {{ badge || 'ILS NOUS FONT CONFIANCE' }}
        </span>
      </div>

      <div class="relative">
        <!-- Conteneur du témoignage -->
        <div class="overflow-hidden rounded-2xl bg-surface-container-low/50 backdrop-blur-sm p-6 md:p-10 shadow-lg border border-white/5">
          <div
            v-for="(testimonial, idx) in testimonials"
            :key="testimonial.id"
            v-show="idx === currentIndex"
          >
            <!-- Citation -->
            <div class="relative">
              <div class="text-6xl md:text-8xl text-primary-container/20 font-serif leading-none mb-2 select-none">
                &ldquo;
              </div>
              <p class="font-body-lg text-body-lg text-on-background md:text-xl leading-relaxed italic pl-4 md:pl-8 border-l-2 border-primary-container/30">
                {{ testimonial.text }}
              </p>
            </div>

            <!-- Auteur -->
            <div class="flex items-center gap-4 mt-6 md:mt-8 pl-4 md:pl-8">
              <div class="w-10 h-[1px] bg-primary-container/60"></div>
              <div>
                <span class="font-label-caps text-label-caps text-on-background block">
                  {{ testimonial.author }}
                </span>
                <span v-if="testimonial.role" class="font-body-md text-sm text-on-surface-variant/70">
                  {{ testimonial.role }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Flèches de navigation -->
        <button
          v-if="testimonials.length > 1"
          class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
          @click="prev"
          aria-label="Témoignage précédent"
        >
          <Icon name="mdi:chevron-left" class="text-2xl md:text-3xl" />
        </button>
        <button
          v-if="testimonials.length > 1"
          class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
          @click="next"
          aria-label="Témoignage suivant"
        >
          <Icon name="mdi:chevron-right" class="text-2xl md:text-3xl" />
        </button>
      </div>

      <!-- Indicateurs (dots) -->
      <div class="flex gap-2 justify-center mt-6">
        <button
          v-for="(_, index) in testimonials"
          :key="index"
          class="h-[3px] rounded-full transition-all duration-300"
          :class="[
            currentIndex === index
              ? 'w-8 bg-white'
              : 'w-4 bg-white/30 hover:bg-white/50'
          ]"
          @click="goTo(index)"
          :aria-label="`Aller au témoignage ${index + 1}`"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface TestimonialItem {
  id: string | number
  text: string
  author: string
  role?: string
}

// ===== TÉMOIGNAGES PAR DÉFAUT (3 seulement) =====
const defaultTestimonials: TestimonialItem[] = [
  {
    id: 1,
    text: 'J\'ai eu confiance en JB Studio Cameroun et par la suite j\'ai été satisfaite du rendu final. Merci JBS Cameroun.',
    author: 'Catherine Biloa',
    role: 'Événementiel'
  },
  {
    id: 2,
    text: 'J\'ai beaucoup été marqué par les plans drones aussi. La PAD, good job 👍.',
    author: 'Parfait Bertrand',
    role: 'Corporate'
  },
  {
    id: 3,
    text: 'Ce que j\'aime c\'est que vous travaillez tous en équipe.',
    author: 'Colonel Bella',
    role: 'Production'
  }
]

const props = defineProps<{
  testimonials?: TestimonialItem[]
  badge?: string
}>()

const testimonials = computed(() => props.testimonials || defaultTestimonials)
const currentIndex = ref(0)

// ===== NAVIGATION =====
const prev = () => {
  if (testimonials.value.length === 0) return
  currentIndex.value = (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length
}

const next = () => {
  if (testimonials.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
}

const goTo = (index: number) => {
  if (index >= 0 && index < testimonials.value.length) {
    currentIndex.value = index
  }
}
</script>