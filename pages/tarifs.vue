<template>
  <div class="bg-brand-black min-h-screen pt-32 pb-20 px-6 md:px-8 relative overflow-hidden">
    <!-- On garde le fond 100% black, pas de dégradé ni de cercles flous -->

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- En-tête -->
      <div class="mb-12 text-center animate-fade-up">
        <span class="text-brand-red text-sm font-sans uppercase tracking-[0.3em] font-semibold">
          Nos prestations
        </span>
        <h1 class="font-serif text-white text-3xl md:text-5xl mt-4 leading-tight drop-shadow-2xl">
          Tarifs, FAQ &amp; Témoignages
        </h1>
        <p class="text-white/70 font-body-md mt-4 mx-auto max-w-2xl leading-relaxed text-sm md:text-base">
          Découvrez nos formules, posez vos questions et lisez les témoignages de nos clients
        </p>
      </div>

      <!-- Onglets -->
      <div class="flex justify-center overflow-x-auto gap-2 pb-4 mb-10 scrollbar-thin relative">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          class="relative px-6 py-3 font-label-caps text-xs tracking-[0.2em] uppercase transition-all duration-500 rounded-full whitespace-nowrap
                 hover:text-white focus-visible:ring-2 focus-visible:ring-brand-red"
          :class="activeTab === tab.key
            ? 'text-white'
            : 'text-white/40 hover:text-white/80'
          "
        >
          {{ tab.label }}
          <!-- Indicateur coulissant -->
          <span
            class="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-brand-red to-gold transition-all duration-500"
            :class="activeTab === tab.key ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"
          ></span>
        </button>
      </div>

      <!-- Séparateur décoratif -->
      <div class="flex items-center justify-center gap-6 mb-12">
        <span class="w-20 h-px bg-gradient-to-r from-transparent to-brand-red/50"></span>
        <span class="text-[10px] font-label-caps tracking-[0.4em] text-white/30 uppercase">
          {{ activeTab === 'tarifs' ? 'Formules' : activeTab === 'faq' ? 'Questions' : 'Témoignages' }}
        </span>
        <span class="w-20 h-px bg-gradient-to-l from-transparent to-brand-red/50"></span>
      </div>

      <!-- Contenu avec animations groupées -->
      <TransitionGroup
        name="fade-stagger"
        tag="div"
        class="flex flex-col gap-6"
        :class="activeTab === 'tarifs' ? 'md:grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'max-w-2xl mx-auto'"
      >
        <!-- Tarifs -->
        <article
          v-if="activeTab === 'tarifs'"
          v-for="(formule, index) in formules"
          :key="formule.title"
          class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden
                 hover:border-gold/50 hover:bg-white/10 transition-all duration-500
                 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-red/20"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="p-6 md:p-8">
            <div class="flex items-start justify-between">
              <h3 class="font-serif text-2xl text-gold group-hover:text-brand-red transition-colors duration-300">
                {{ formule.title }}
              </h3>
              <span class="text-xs font-label-caps text-white/30 bg-white/5 px-3 py-1 rounded-full">
                Formule
              </span>
            </div>
            <p class="text-white/70 font-body-md text-sm leading-relaxed mt-3">{{ formule.description }}</p>
            <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p class="text-gold font-serif text-2xl tracking-tight">{{ formule.price }}</p>
              <button
                class="group-btn px-6 py-2.5 bg-gradient-to-r from-brand-red to-red-700 text-white text-sm font-label-caps tracking-widest uppercase rounded-full
                       hover:from-red-600 hover:to-brand-red-light transition-all duration-300
                       hover:scale-105 hover:shadow-lg hover:shadow-brand-red/40 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-brand-black"
                @click="navigateTo('/devis')"
              >
                Demander un devis
              </button>
            </div>
          </div>
        </article>

        <!-- FAQ -->
        <div v-if="activeTab === 'faq'" class="flex flex-col gap-4 w-full">
          <div
            v-for="(item, index) in faqItems"
            :key="index"
            class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                   hover:border-gold/40 hover:bg-white/10 transition-all duration-500
                   hover:-translate-y-1 hover:shadow-xl"
            :style="{ animationDelay: `${index * 120}ms` }"
          >
            <h3 class="text-white font-semibold text-lg group-hover:text-gold transition-colors duration-300">
              {{ item.question }}
            </h3>
            <p class="text-white/60 font-body-md text-sm leading-relaxed mt-2">{{ item.reponse }}</p>
          </div>
        </div>

        <!-- Témoignages -->
        <div v-if="activeTab === 'temoinages'" class="flex flex-col gap-4 w-full">
          <article
            v-for="(temoinage, index) in temoinages"
            :key="temoinage.nom"
            class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                   hover:border-gold/40 hover:bg-white/10 transition-all duration-500
                   hover:-translate-y-1 hover:shadow-xl"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-center gap-4 mb-3">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-brand-red to-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                <span class="text-white font-serif text-xl font-bold">{{ temoinage.nom.charAt(0) }}</span>
              </div>
              <div>
                <h4 class="text-white font-serif text-lg">{{ temoinage.nom }}</h4>
                <span class="text-white/40 text-xs font-label-caps tracking-widest">{{ temoinage.event }}</span>
              </div>
            </div>
            <p class="text-white/70 font-body-md text-sm leading-relaxed italic">“{{ temoinage.commentaire }}”</p>
          </article>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const activeTab = ref('tarifs')

const tabs = [
  { key: 'tarifs', label: 'Tarifs' },
  { key: 'faq', label: 'FAQ' },
  { key: 'temoinages', label: 'Témoignages' },
]

const formules = [
  { title: 'Essentiel', description: 'Couverture photo basique pour petit événement', price: 'Sur devis' },
  { title: 'Confort', description: 'Photo + vidéo avec montage professionnel', price: 'Sur devis' },
  { title: 'Premium', description: 'Forfait complet avec drone, making-of et livret', price: 'Sur devis' },
]

const faqItems = [
  { question: 'Quels sont vos délais de livraison ?', reponse: 'Nous livrons les photos sous 2 à 4 semaines et les vidéos sous 4 à 6 semaines selon le projet.' },
  { question: 'Intervenez-vous dans toute la région ?', reponse: 'Oui, nous couvrons toute la région et pouvons nous déplacer partout au Cameroun sur demande.' },
  { question: 'Quel matériel utilisez-vous ?', reponse: 'Nous utilisons du matériel professionnel : caméras Sony, objectifs Zeiss, drones DJI, et équipement d\'éclairage complet.' },
]

const temoinages = [
  { nom: 'Catherine Biloa', event: 'Événementiel', commentaire: 'J\'ai eu confiance en JB Studio Cameroun et par la suite j\'ai été satisfaite du rendu final. Merci JBS Cameroun.' },
  { nom: 'Parfait Bertrand', event: 'Corporate', commentaire: 'J\'ai beaucoup été marqué par les plans drones aussi. La PAD, good job 👍.' },
  { nom: 'Colonel Bella', event: 'Production', commentaire: 'Ce que j\'aime c\'est que vous travaillez tous en équipe.' },
  { nom: 'Marie & Pierre', event: 'Mariage', commentaire: 'Une équipe exceptionnelle ! Les photos sont magnifiques et le montage vidéo est juste parfait.' },
  { nom: 'Sophie M.', event: 'Anniversaire', commentaire: 'Très professionnels, à l\'écoute et créatifs. Je recommande les yeux fermés.' },
]

useSeoMeta({
  title: 'Tarifs & Infos — JB STUDIO CAMEROUN',
  description: 'Découvrez nos formules, posez vos questions et lisez les témoignages.',
})
</script>

<style scoped>
/* Animations d’entrée */
.fade-stagger-enter-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.fade-stagger-leave-active {
  transition: all 0.3s ease;
}
.fade-stagger-enter-from,
.fade-stagger-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-stagger-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Délai d’animation via la propriété style définie dans le template */
.fade-stagger-enter-active > * {
  animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Personnalisation du scroll (optionnel) */
.scrollbar-thin::-webkit-scrollbar {
  height: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.2);
  border-radius: 8px;
}

/* Effet de lueur sur les boutons */
.group-btn {
  position: relative;
  overflow: hidden;
}
.group-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.15), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}
.group-btn:hover::after {
  transform: translateX(100%);
}

/* Amélioration du responsive */
@media (max-width: 768px) {
  .fade-stagger-enter-active > * {
    animation-duration: 0.6s;
  }
}
</style>