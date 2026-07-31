// composables/useScrollReveal.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useScrollReveal = (selector: string, options: any = {}) => {
  if (import.meta.client) {
    onMounted(() => {
      const elements = document.querySelectorAll(selector)

      if (!elements.length) return

      const defaultOptions = {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        ...options,
      }

      gsap.fromTo(
        elements,
        { opacity: defaultOptions.opacity, y: defaultOptions.y },
        {
          opacity: 1,
          y: 0,
          duration: defaultOptions.duration,
          ease: defaultOptions.ease,
          stagger: defaultOptions.stagger,
          scrollTrigger: {
            trigger: elements[0],
            start: defaultOptions.scrollTrigger.start,
            toggleActions: defaultOptions.scrollTrigger.toggleActions,
          },
        }
      )
    })
  }
}