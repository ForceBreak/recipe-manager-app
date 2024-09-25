<template>
  <div class="min-h-screen flex flex-col flex-wrap">
    <header
      class="px-4 xl:px-28 py-4 md:py-5 flex justify-between items-center border-b border-gray-350 dark:border-gray-800 dark:bg-gray-900 w-full"
    >
      <router-link to="/" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
        Recipe manager
      </router-link>
      <div class="flex items-center gap-3">
        <router-link to="/add">
          <buttonItem text="Add" size="sm" />
        </router-link>
        <buttonItem
          v-if="globalStore.recipies.length"
          text="Clear all data"
          variant="red"
          size="sm"
          @click="setIsOpen(true)"
        />
      </div>
    </header>

    <RouterView class="grow w-full px-4 xl:px-28 bg-gray-50" />

    <!-- Remove modal -->
    <modal :isOpen="isRemoveModal" @setIsOpen="setIsOpen($event)">
      <template v-slot:title>Are you sure?</template>
      <template v-slot:main>
        <div class="flex justify-end mt-12 md:mt-16 gap-3">
          <buttonItem text="Cancel" variant="light" @click="setIsOpen(false)" />
          <buttonItem text="Remove all" variant="red" @click="removeAll" />
        </div>
      </template>
    </modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { buttonItem } from '@/components/form'
import modal from '@/components/modal.vue'
import { useGlobalStore } from '@/stores/global'
import { removeFile } from '@/helpers/global'

const globalStore = useGlobalStore()

const isRemoveModal = ref(false)
const setIsOpen = (condition) => (isRemoveModal.value = condition)
const removeAll = () => {
  const idList = this.recipies.map((elem) => elem.id)
  idList.forEach((elem) => {
    removeFile({ id: elem })
  })

  globalStore.removeAllRecipies()
  setIsOpen(false)
}
</script>

<style scoped></style>
