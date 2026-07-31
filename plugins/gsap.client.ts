import { defineNuxtPlugin } from '#app'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  // Enregistrer le plugin ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  // Configuration globale
  gsap.config({
    force3D: true,
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})