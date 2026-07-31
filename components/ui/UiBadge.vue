<template>
  <span
    class="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full"
    :class="variantClasses[variant]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
export type BadgeVariant = 'primary' | 'secondary' | 'gold' | 'outline'

const props = withDefaults(defineProps<{
  variant?: BadgeVariant
}>(), {
  variant: 'primary',
})

const variantClasses = {
  primary: 'bg-gold/20 text-gold',
  secondary: 'bg-navy/50 text-ivory',
  gold: 'bg-gold text-navy',
  outline: 'border border-gold/50 text-gold bg-transparent',
}
</script>