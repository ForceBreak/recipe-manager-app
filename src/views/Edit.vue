<template>
  <div>
    <addEditRecipe v-if="item" :item="item" edit/>
    <div v-else class="text-center">
      <p class="mt-3">Item not found.</p>
      <router-link to="/" class="inline-flex font-medium items-center text-blue-600 hover:underline">Go back home</router-link>
    </div>
  </div>
</template>

<script setup>
import addEditRecipe from '@/components/add-edit-recipe.vue'
import { useGlobalStore } from '@/stores/global'
import { useRoute } from 'vue-router'

const globalStore = useGlobalStore()
const route = useRoute()

const item = globalStore.recipies.find(elem => elem.id == route.params.id)
</script>
