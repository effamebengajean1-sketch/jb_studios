<template>
  <div class="max-w-3xl mx-auto px-4 py-24">
    <h1 class="font-display-impact text-5xl text-gold mb-3 tracking-wide">Demande de devis</h1>
    <p class="text-ivory/70 text-lg mb-10">
      Décrivez-nous votre projet en quelques clics, nous vous répondons sous 24-48h.
    </p>

    <!-- Message de statut -->
    <div v-if="statusMessage" class="p-4 rounded-lg mb-6 flex items-start gap-3" :class="statusClass">
      <span class="text-xl leading-none mt-0.5">{{ statusIcon }}</span>
      <span>{{ statusMessage }}</span>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
      <!-- Type d'événement + Date -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="relative">
          <label class="block text-sm font-medium text-ivory/80 mb-1.5">
            Type d'événement <span class="text-gold">*</span>
          </label>
          <input
            v-model="form.eventType"
            type="text"
            name="eventType"
            placeholder="Mariage, Anniversaire, Corporate..."
            list="event-types"
            class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 transition-all"
            :class="errors.eventType ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold'"
            required
            autocomplete="off"
            @input="onFieldInput('eventType')"
            @blur="onFieldBlur('eventType')"
          />
          <datalist id="event-types">
            <option v-for="type in eventTypes" :key="type" :value="type" />
          </datalist>
          <p v-if="errors.eventType" class="mt-1 text-sm text-red-400">{{ errors.eventType }}</p>
        </div>
        <div class="relative">
          <label class="block text-sm font-medium text-ivory/80 mb-1.5">
            Date prévue <span class="text-gold">*</span>
          </label>
          <input
            v-model="form.date"
            type="date"
            name="eventDate"
            :min="today"
            class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory focus:outline-none focus:ring-2 transition-all"
            :class="errors.date ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold'"
            required
            autocomplete="off"
            @input="onFieldInput('date')"
            @blur="onFieldBlur('date')"
          />
          <p v-if="errors.date" class="mt-1 text-sm text-red-400">{{ errors.date }}</p>
        </div>
      </div>

      <!-- Lieu -->
      <div class="relative">
        <label class="block text-sm font-medium text-ivory/80 mb-1.5">
          Lieu <span class="text-gold">*</span>
        </label>
        <input
          v-model="form.location"
          type="text"
          name="eventLocation"
          placeholder="Ville, région..."
          list="locations"
          class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 transition-all"
          :class="errors.location ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold'"
          required
          autocomplete="address-level2"
          @input="onFieldInput('location')"
          @blur="onFieldBlur('location')"
        />
        <datalist id="locations">
          <option value="Yaoundé" />
          <option value="Douala" />
          <option value="Bamenda" />
          <option value="Bafoussam" />
          <option value="Garoua" />
          <option value="Maroua" />
          <option value="Ngaoundéré" />
          <option value="Autre" />
        </datalist>
        <p v-if="errors.location" class="mt-1 text-sm text-red-400">{{ errors.location }}</p>
      </div>

      <!-- Budget + Nombre de personnes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="relative">
          <label class="block text-sm font-medium text-ivory/80 mb-1.5">
            Budget indicatif (FCFA)
          </label>
          <input
            v-model="form.budget"
            type="number"
            name="budget"
            placeholder="Votre budget estimé"
            min="0"
            step="1000"
            class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 transition-all"
            :class="errors.budget ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold'"
            autocomplete="off"
            @input="onFieldInput('budget')"
            @blur="onFieldBlur('budget')"
          />
          <p v-if="errors.budget" class="mt-1 text-sm text-red-400">{{ errors.budget }}</p>
        </div>
        <div class="relative">
          <label class="block text-sm font-medium text-ivory/80 mb-1.5">
            Nombre de personnes
          </label>
          <input
            v-model="form.guests"
            type="number"
            name="guests"
            placeholder="Environ..."
            min="1"
            class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 transition-all"
            :class="errors.guests ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold'"
            autocomplete="off"
            @input="onFieldInput('guests')"
            @blur="onFieldBlur('guests')"
          />
          <p v-if="errors.guests" class="mt-1 text-sm text-red-400">{{ errors.guests }}</p>
        </div>
      </div>

      <!-- Prestations -->
      <div class="relative">
        <label class="block text-sm font-medium text-ivory/80 mb-1.5">
          Prestations souhaitées <span class="text-gold">*</span>
        </label>
        <input
          v-model="form.services"
          type="text"
          name="services"
          placeholder="Photo, Vidéo, Drone..."
          list="services-list"
          class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 transition-all"
          :class="errors.services ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold'"
          required
          autocomplete="off"
          @input="onFieldInput('services')"
          @blur="onFieldBlur('services')"
        />
        <datalist id="services-list">
          <option v-for="svc in servicesList" :key="svc" :value="svc" />
        </datalist>
        <p v-if="errors.services" class="mt-1 text-sm text-red-400">{{ errors.services }}</p>
      </div>

      <!-- Coordonnées -->
      <div class="border-t border-gold/20 pt-6 mt-4">
        <h3 class="font-display-impact text-2xl text-gold mb-4 tracking-wide">Vos coordonnées</h3>

        <div class="relative mb-4">
          <label class="block text-sm font-medium text-ivory/80 mb-1.5">
            Nom complet <span class="text-gold">*</span>
          </label>
          <input
            v-model="form.fullName"
            type="text"
            name="fullName"
            placeholder="Votre nom"
            class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 transition-all"
            :class="errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold'"
            required
            autocomplete="name"
            @input="onFieldInput('fullName')"
            @blur="onFieldBlur('fullName')"
          />
          <p v-if="errors.fullName" class="mt-1 text-sm text-red-400">{{ errors.fullName }}</p>
        </div>

        <div class="relative mb-4">
          <label class="block text-sm font-medium text-ivory/80 mb-1.5">
            Email <span class="text-gold">*</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            name="email"
            placeholder="votre@email.com"
            class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 transition-all"
            :class="errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold'"
            required
            autocomplete="email"
            @input="onFieldInput('email')"
            @blur="onFieldBlur('email')"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-400">{{ errors.email }}</p>
        </div>

        <div class="relative mb-4">
          <label class="block text-sm font-medium text-ivory/80 mb-1.5">
            Téléphone <span class="text-gold">*</span>
          </label>
          <input
            v-model="form.phone"
            type="tel"
            name="phone"
            placeholder="+237 6XX XXX XXX"
            class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 transition-all"
            :class="errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold'"
            required
            autocomplete="tel"
            @input="onFieldInput('phone')"
            @blur="onFieldBlur('phone')"
          />
          <p v-if="errors.phone" class="mt-1 text-sm text-red-400">{{ errors.phone }}</p>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex flex-col sm:flex-row gap-4 pt-2">
        <button
          type="submit"
          class="flex-1 bg-brand-red hover:bg-brand-red-light text-white py-4 rounded-lg font-bold text-lg tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/30 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-brand-black"
          :disabled="!isFormValid || isSubmitting"
        >
          {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande' }}
        </button>
        <a
          :href="whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-green-600/30 text-center flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-brand-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Parler sur WhatsApp
        </a>
      </div>
    </form>

    <!-- Séparateur -->
    <div class="h-px bg-white/10 my-12"></div>

    <!-- Google Maps -->
    <div class="w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-700 relative bg-surface-container-low">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254772.50909580488!2d11.502073884345123!3d3.848685967855762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bc5649ffca0dd%3A0x1680d072e53ace2d!2sAwae!5e0!3m2!1sfr!2scm!4v1784805964215!5m2!1sfr!2scm"
        width="600"
        height="450"
        style="border:0; width:100%; height:100%;"
        allowfullscreen=""
        referrerpolicy="strict-origin-when-cross-origin"
        title="Carte de localisation de JB STUDIO CAMEROUN"
      />
      <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs font-label-caps px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
        📍 Awae, Yaoundé - Cameroun
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'

definePageMeta({ layout: 'default' })

interface DevisFormData {
  eventType: string
  date: string
  location: string
  budget: number | null
  guests: number | null
  services: string
  fullName: string
  email: string
  phone: string
}

const today = new Date().toISOString().split('T')[0]

const eventTypes = ['Mariage', 'Anniversaire', 'Baptême', 'Corporate', 'Concert', 'Événementiel', 'Production', 'Autre']

const servicesList = ['Photo', 'Vidéo', 'Drone', 'Montage', 'Making-of', 'Livret photo', 'Publicité', 'Clip musical', 'Corporate']

const whatsappPhone = '2376XXXXXXXX'

const encodedMessage = computed(() =>
  encodeURIComponent(`Bonjour JB STUDIO CAMEROUN, je souhaite obtenir un devis pour mon projet.`)
)

const whatsappLink = computed(() => `https://wa.me/${whatsappPhone}?text=${encodedMessage.value}`)

// État du formulaire
const form = reactive<DevisFormData>({
  eventType: '',
  date: '',
  location: '',
  budget: null,
  guests: null,
  services: '',
  fullName: '',
  email: '',
  phone: ''
})

const errors = reactive<Record<string, string>>({})
const touched = reactive<Record<string, boolean>>({})
const isSubmitting = ref(false)
const statusMessage = ref('')
const statusClass = ref('')

const statusIcon = computed(() => {
  if (statusClass.value.includes('green')) return '✅'
  if (statusClass.value.includes('red')) return '❌'
  return ''
})

// Validation Zod simplifiée (sans import Zod pour éviter les doublons)
const validateField = (field: keyof DevisFormData): string => {
  const value = form[field]
  switch (field) {
    case 'eventType':
      return value.trim().length >= 2 ? '' : "Le type d'événement est requis"
    case 'date':
      return value ? '' : 'La date est requise'
    case 'location':
      return value.trim().length >= 2 ? '' : 'Le lieu est requis'
    case 'services':
      return value.trim().length >= 3 ? '' : 'Décrivez les prestations souhaitées'
    case 'fullName':
      return value.trim().length >= 2 ? '' : 'Votre nom est requis'
    case 'email': {
      if (!value) return "L'email est requis"
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email invalide'
    }
    case 'phone': {
      if (!value) return "Le téléphone est requis"
      return value.replace(/\s/g, '').length >= 8 ? '' : 'Numéro de téléphone invalide'
    }
    case 'budget':
      return !value || value >= 0 ? '' : 'Le budget ne peut pas être négatif'
    case 'guests':
      return !value || value >= 1 ? '' : 'Minimum 1 personne'
    default:
      return ''
  }
}

const onFieldInput = (field: keyof DevisFormData) => {
  touched[field] = true
  errors[field] = validateField(field)
  validateForm()
}

const onFieldBlur = (field: keyof DevisFormData) => {
  touched[field] = true
  errors[field] = validateField(field)
  validateForm()
}

const validateForm = () => {
  Object.keys(form).forEach(key => {
    if (!touched[key]) return
    const err = validateField(key as keyof DevisFormData)
    if (err) errors[key] = err
    else delete errors[key]
  })
}

// État de validité du formulaire
const isFormValid = computed(() => {
  const requiredFields: (keyof DevisFormData)[] = ['eventType', 'date', 'location', 'services', 'fullName', 'email', 'phone']
  const hasEmpty = requiredFields.some(field => !form[field])
  const hasErrors = Object.keys(errors).length > 0
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const isPhoneValid = form.phone.replace(/\s/g, '').length >= 8
  return !hasEmpty && !hasErrors && isEmailValid && isPhoneValid
})

// Soumission
const handleSubmit = async () => {
  // Toucher tous les champs pour afficher les erreurs
  Object.keys(form).forEach(key => {
    touched[key as keyof DevisFormData] = true
  })

  const hasErrors = Object.keys(form).some(key => validateField(key as keyof DevisFormData))
  if (hasErrors) {
    statusMessage.value = 'Veuillez corriger les erreurs dans le formulaire.'
    statusClass.value = 'bg-red-900/30 text-red-400 border border-red-700'
    return
  }

  isSubmitting.value = true
  statusMessage.value = ''
  statusClass.value = ''

  try {
    await $fetch('/api/devis', {
      method: 'POST',
      body: form
    })

    statusMessage.value = '✅ Votre demande a été envoyée avec succès ! Nous vous répondrons sous 24-48h.'
    statusClass.value = 'bg-green-900/30 text-green-400 border border-green-700'

    Object.assign(form, {
      eventType: '',
      date: '',
      location: '',
      budget: null,
      guests: null,
      services: '',
      fullName: '',
      email: '',
      phone: ''
    })
    Object.keys(touched).forEach(key => delete touched[key])
    Object.keys(errors).forEach(key => delete errors[key])

  } catch (error) {
    statusMessage.value = '❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'
    statusClass.value = 'bg-red-900/30 text-red-400 border border-red-700'
  } finally {
    isSubmitting.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Demande de devis — JB STUDIO CAMEROUN',
  description: 'Demandez un devi personnalisé pour votre projet audiovisuel. Réponse sous 24-48h.'
})
</script>