<template>
  <div class="bg-brand-black min-h-screen pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
    <!-- Effets de fond décoratifs -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none animate-pulse" style="animation-delay: 1s;"></div>

    <div class="max-w-4xl mx-auto relative z-10">
      <!-- HERO -->
      <section class="mb-16 text-center animate-fade-up">
        <span class="text-brand-red text-sm font-label-caps tracking-[0.3em] uppercase font-semibold inline-block mb-2">
          Notre histoire
        </span>
        <h1 class="font-serif text-4xl md:text-5xl text-white mt-2 leading-tight">
          L'art de raconter<br />
          <span class="text-brand-red relative">
            en images
            <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-red/30"></span>
          </span>
        </h1>
        <div class="w-16 h-px bg-brand-red mt-6 mx-auto"></div>
      </section>

      <!-- BIO FONDATEUR -->
      <section class="mb-16 group animate-fade-up" style="animation-delay: 0.1s;">
        <div class="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10 hover:border-brand-red/30 transition-all duration-500 hover:shadow-xl hover:shadow-brand-red/5">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <!-- Photo du fondateur -->
            <div class="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-brand-red/30 shadow-lg shadow-brand-red/10 group-hover:scale-105 transition-transform duration-500">
              <NuxtImg
                src="/images/abolam.jpg"
                alt="Jean Bruno Abolam Ella"
                class="w-full h-full object-cover"
                width="160"
                height="160"
                loading="lazy"
              />
            </div>
            <div class="flex-1 text-center md:text-left">
              <h2 class="font-serif text-2xl md:text-3xl text-white mb-4">Fondateur</h2>
              <p class="text-white/70 font-serif text-xl md:text-2xl font-medium text-brand-red/80 mb-4">
                Jean Bruno Abolam Ella
              </p>
              <p class="text-white/60 text-base leading-relaxed mb-3">
                Formé aux Ateliers Pratiques de Yaoundé en Montage Audiovisuel de 2024 à 2025,
                j'ai forgé mon regard et ma technique au contact du terrain.
              </p>
              <p class="text-white/60 text-base leading-relaxed mb-3">
                J'ai eu la chance de collaborer avec plusieurs entreprises sur des projets variés :
                événements, corporate, publicité et création de contenu.
              </p>
              <p class="text-white/60 text-base leading-relaxed">
                Aujourd'hui, je ne travaille pas seul.
                <strong class="text-white">JB STUDIO CAMEROUN</strong>, c'est toute une équipe de passionnés :
                Photographe · Vidéaste · Monteur · Designer · Concepteur Web · Secrétaire
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- MISSION -->
      <section class="mb-16 text-center animate-fade-up" style="animation-delay: 0.2s;">
        <h2 class="font-serif text-2xl md:text-3xl text-white mb-6">Notre mission</h2>
        <div class="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10 max-w-2xl mx-auto hover:border-brand-red/30 transition-all duration-500 hover:shadow-xl hover:shadow-brand-red/5">
          <p class="text-white/70 text-lg leading-relaxed">
            Offrir une expérience visuelle unique, en alliant expertise technique et sensibilité artistique.
            Chaque projet est pour nous l'opportunité de raconter une histoire à travers des images fortes,
            intemporelles et chargées d'émotion. Nous travaillons en étroite collaboration avec nos clients
            pour comprendre leurs besoins, leurs envies et leur univers.
          </p>
        </div>
      </section>

      <!-- VALEURS -->
      <section class="mb-16 animate-fade-up" style="animation-delay: 0.3s;">
        <h2 class="font-serif text-2xl md:text-3xl text-white mb-8 text-center">Nos valeurs</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="value in values"
            :key="value.label"
            class="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-brand-red/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/5"
          >
            <Icon :name="value.icon" class="text-4xl text-brand-red group-hover:scale-110 transition-transform duration-300" />
            <h3 class="font-serif text-xl text-white mt-3">{{ value.label }}</h3>
            <p class="text-white/60 text-sm mt-2 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </section>

      <!-- ÉQUIPE (3 membres avec la même image) -->
      <section class="mb-16 animate-fade-up" style="animation-delay: 0.4s;">
        <h2 class="font-serif text-2xl md:text-3xl text-white mb-8 text-center">Notre équipe</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Carte 1 : Abolam -->
          <div class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-brand-red/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/10">
            <div class="aspect-[4/3] overflow-hidden">
              <NuxtImg
                src="/images/abolam.jpg"
                alt="Abolam Ella Jean Bruno"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                width="400"
                height="300"
                loading="lazy"
              />
            </div>
            <div class="p-5">
              <h3 class="font-serif text-lg text-white">Abolam Ella Jean Bruno</h3>
              <p class="text-brand-red text-xs font-label-caps tracking-widest uppercase mt-1">Vidéaste · Photographe · Monteur</p>
              <p class="text-white/60 text-sm mt-3 leading-relaxed">Fondateur, il dirige les projets avec une exigence artistique et technique.</p>
            </div>
          </div>

          <!-- Carte 2 : Papa -->
          <div class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-brand-red/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/10">
            <div class="aspect-[4/3] overflow-hidden">
              <NuxtImg
                src="/images/papa.png"
                alt="Papa"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                width="400"
                height="300"
                loading="lazy"
              />
            </div>
            <div class="p-5">
              <h3 class="font-serif text-lg text-white">Papa</h3>
              <p class="text-brand-red text-xs font-label-caps tracking-widest uppercase mt-1">Vidéaste · Photographe</p>
              <p class="text-white/60 text-sm mt-3 leading-relaxed">Œil affûté et maîtrise des lumières, il apporte sa sensibilité à chaque prise de vue.</p>
            </div>
          </div>

          <!-- Carte 3 : Effa Mebenga -->
          <div class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-brand-red/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/10">
            <div class="aspect-[4/3] overflow-hidden">
              <NuxtImg
                src="/images/effa.png"
                alt="Effa Mebenga Jean"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                width="400"
                height="300"
                loading="lazy"
              />
            </div>
            <div class="p-5">
              <h3 class="font-serif text-lg text-white">Effa Mebenga Jean</h3>
              <p class="text-brand-red text-xs font-label-caps tracking-widest uppercase mt-1">Assistant · Infographiste</p>
              <p class="text-white/60 text-sm mt-3 leading-relaxed">Polyvalent, il assure le suivi logistique et la création graphique des supports.</p>
            </div>
          </div>
        </div>
        <p class="text-white/40 text-xs text-center mt-6 italic">
          Pour une vraie photo d'équipe, remplacez <strong>abolam.jpg</strong> par les vraies images dans <code>/public/images/</code>
        </p>
      </section>

      <!-- CTA FINAL -->
      <section class="text-center py-12 border-t border-white/10 animate-fade-up" style="animation-delay: 0.5s;">
        <p class="text-white/70 text-lg mb-6">
          Vous avez un projet en tête ? Parlons-en.
        </p>
        <UiButton
          variant="primary"
          size="lg"
          @click="navigateTo('/devis')"
          class="bg-white !text-brand-black border border-white shadow-lg shadow-white/20 hover:bg-white/90 hover:shadow-white/30 transition-all duration-300 hover:scale-105"
        >
          Discutons de votre projet
        </UiButton>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const values = [
  {
    icon: 'mdi:eye',
    label: 'Exigence',
    description: 'Chaque image est pensée, cadrée et retravaillée avec le plus grand soin.'
  },
  {
    icon: 'mdi:ear-hearing',
    label: 'Écoute',
    description: 'Votre histoire guide notre regard, nous nous adaptons à vos envies.'
  },
  {
    icon: 'mdi:verified',
    label: 'Fiabilité',
    description: 'Respect des délais, matériel de secours, ponctualité absolue.'
  },
  {
    icon: 'mdi:flower',
    label: 'Élégance',
    description: 'Une esthétique intemporelle qui traverse les modes et les années.'
  }
]

useSeoMeta({
  title: 'À propos — JB STUDIO CAMEROUN',
  description: 'Découvrez l\'histoire, la mission, les valeurs et l\'équipe de JB STUDIO CAMEROUN, studio de production audiovisuelle.',
})
</script>

<style scoped>
/* Animations d'entrée */
.animate-fade-up {
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Amélioration des transitions au survol */
.group {
  transition: all 0.3s ease;
}
</style>