<template>
  <div class="flex items-center">
    <input
      v-model="value"
      :id="props.item"
      type="checkbox"
      :name="props.name"
      :value="props.item"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
    />
    <label :for="props.item" class="ms-2 text-sm font-medium text-gray-900 cursor-pointer">
      {{ props.item }}
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: String,
  name: String,
  modelValue: [String, Array]
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
