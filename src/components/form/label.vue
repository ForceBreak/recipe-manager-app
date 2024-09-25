<template>
  <label :for="id" class="w-full block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">{{ text }}</label>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
})
</script>

<style lang="scss" scoped>

</style>