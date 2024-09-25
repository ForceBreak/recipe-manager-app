<template>
  <select
    v-model="value"
    :name="props.id"
    :id="props.id"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
    :multiple="props.multiple"
  >
    <option v-for="item in props.items" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
  <span v-if="props.errors.length" class="text-red-600 text-xs mt-1 block">
    {{ props.errors[0].$message }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: String,
  modelValue: [String, Array],
  items: Array,
  multiple: Boolean,
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
