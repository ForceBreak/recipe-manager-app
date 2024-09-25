<template>
  <div v-if="props.items.length">
    <item v-for="item in props.items" :key="item.id" :item="item" @remove="removeRecipe" />
  </div>
  <div v-else class="justify-center">No recepies added yet.</div>
</template>

<script setup>
import item from '@/components/recipe-item.vue'
import { useGlobalStore } from '@/stores/global'
import { removeFile } from '@/helpers/global'

const globalStore = useGlobalStore()

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const removeRecipe = (id) => {
  removeFile({ id })
  globalStore.removeRecipe()
}
</script>

<style lang="scss" scoped></style>
