<template>
  <div @click="file.click()">
    <input
      class="hidden"
      type="file"
      ref="file"
      @change="emitFileChange"
      accept="image/*"
    />
    <slot name="main" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])
const file = ref(null)

const emitFileChange = () => {
  if(file.value.files[0]) emit('update:modelValue', file.value.files[0])
}
</script>

<style scoped></style>
