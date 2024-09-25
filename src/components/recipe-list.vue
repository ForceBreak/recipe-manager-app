<template>
  <div>
    <recipeItem v-for="item in props.items" :key="item.id" :item="item" @remove="removeRecipe" />
  </div>
</template>

<script setup>
import recipeItem from '@/components/recipe-item.vue'
import { useGlobalStore } from '@/stores/global'
import { removeFile } from '@/helpers/global'

const globalStore = useGlobalStore()

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const removeRecipe = ({id, isFile}) => {
  if(isFile) removeFile({ id })
  globalStore.removeRecipe(id)
}
</script>

<style lang="scss" scoped></style>
