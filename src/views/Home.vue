<template>
  <div class="flex flex-wrap md:flex-nowrap gap-8 pt-4">
    <div class="w-full md:w-1/3">
      <inputItem v-model="search" placeholder="Search recipe" />

      <div class="mt-4 bg-white p-1 rounded">
        <labelItem text="Level" id="level" />
        <checkboxItem
          v-for="item in Object.keys(levels)"
          :key="item"
          v-model="filters.levels"
          name="level"
          :item="item"
          class="mt-2 pl-3"
        />
      </div>
      <div class="mt-4 bg-white p-1 rounded">
        <labelItem text="Step" id="step" />
        <checkboxItem
          v-for="item in steps"
          :key="item"
          v-model="filters.steps"
          name="step"
          :item="item"
          class="mt-2 pl-3"
        />
      </div>
      <div class="mt-4 bg-white p-1 rounded">
        <labelItem text="Ingredients" id="ingredients" />
        <checkboxItem
          v-for="item in globalStore.ingredients"
          :key="item"
          v-model="filters.ingredients"
          name="ingredient"
          :item="item"
          class="mt-2 pl-3"
        />
      </div>
    </div>
    <div class="w-full md:w-2/3">
      <recipeList :items="items" class="flex flex-wrap gap-4" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import recipeList from '@/components/recipe-list.vue'
import { inputItem, labelItem, checkboxItem } from '@/components/form'
import { useGlobalStore } from '@/stores/global'
import { levels, steps } from '@/helpers/global'

const globalStore = useGlobalStore()

const search = ref('')
const filters = ref({
  levels: [],
  steps: [],
  ingredients: []
})
const items = computed(() => {
  return globalStore.recipies
    .filter((elem) => elem.title.toLowerCase().includes(search.value.toLowerCase()))
    .filter((elem) =>
      filters.value.levels.length ? filters.value.levels.includes(elem.level) : elem
    )
    .filter((elem) => (filters.value.steps.length ? filters.value.steps.includes(elem.step) : elem))
    .filter((elem) => {
      if (filters.value.ingredients.length) {
        return elem.ingredients.find((secondElement) =>
          filters.value.ingredients.some((firstElement) => firstElement === secondElement)
        )
      } else return elem
    })
})
</script>
