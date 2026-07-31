<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
export type ButtonVariant = 'primary' | 'secondary' | 'whatsapp'
export type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  fullWidth?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false,
})

const baseClasses = 'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

const variantClasses = {
  primary: 'bg-gold text-navy hover:bg-gold/90 focus:ring-gold',
  secondary: 'bg-navy text-ivory hover:bg-navy/90 focus:ring-navy',
  whatsapp: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

const buttonClass = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.fullWidth ? 'w-full' : '',
  props.disabled ? 'opacity-50 cursor-not-allowed' : '',
].join(' '))
</script>