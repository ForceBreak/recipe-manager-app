<template>
  <input
    v-model="value"
    type="text"
    :id="props.id"
    :placeholder="props.placeholder"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
  />
  <span v-if="props.errors.length" class="text-red-600 text-xs mt-1 block">
    {{ props.errors[0].$message }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: String,
  placeholder: String,
  modelValue: String,
  errors: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<style lang="scss" scoped></style>
