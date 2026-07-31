<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="block text-sm font-medium text-ivory/80 mb-1.5">
      {{ label }}
      <span v-if="required" class="text-gold ml-1">*</span>
    </label>

    <!-- Textarea -->
    <template v-if="type === 'textarea'">
      <textarea
        :id="id"
        ref="inputRef"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :rows="rows"
        v-bind="$attrs"
        class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 transition-all"
        :class="[
          error ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]"
        @input="onInput"
        @blur="onBlur"
      />
    </template>

    <!-- Input standard -->
    <template v-else>
      <input
        :id="id"
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        v-bind="$attrs"
        class="w-full bg-navy/50 border rounded-lg px-4 py-3 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 transition-all"
        :class="[
          error ? 'border-red-500 focus:ring-red-500' : 'border-gold/30 focus:ring-gold focus:border-gold',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]"
        @input="onInput"
        @blur="onBlur"
      />
    </template>

    <!-- Message d'erreur -->
    <p v-if="error" class="mt-1 text-sm text-red-400">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  id?: string
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea'
  required?: boolean
  disabled?: boolean
  rows?: number
  error?: string
}>(), {
  type: 'text',
  rows: 4,
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur'): void
}>()

const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const onBlur = () => {
  emit('blur')
}

// Génère un ID unique si non fourni
const id = computed(() => props.id || `input-${Math.random().toString(36).substring(2, 11)}`)
</script>