<template>
  <div
    class="relative w-full flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100"
  >
    <deleteIcon
      class="w-4 h-4 text-red-600 absolute right-2 top-2 cursor-pointer"
      @click="setIsOpen(true)"
    />
    <div
      class="h-full w-1/3 rounded-l-lg bg-center bg-no-repeat"
      :class="[props.item.image ? 'bg-cover' : 'bg-contain']"
      :style="[
        {
          backgroundImage: `url(${props.item.image ? props.item.image : noImgUrl})`
        }
      ]"
    ></div>
    <div class="grow flex flex-col justify-between p-4 leading-normal">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ props.item.title }}
      </h5>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="ingredient in props.item.ingredients"
          :key="ingredient"
          class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
        >
          {{ ingredient }}
        </span>
      </div>
      <p class="mt-2 font-bold text-gray-500 dark:text-gray-400">{{ props.item.step }}</p>
      <p class="mt-2 font-medium text-gray-700 dark:text-gray-400 flex gap-2 items-center">
        <span
          class="flex w-3 h-3 rounded-full"
          :style="{ background: levels[props.item.level] }"
        ></span>
        {{ props.item.level }}
      </p>

      <router-link
        :to="`/${props.item.id}`"
        class="mt-4 inline-flex font-medium items-center text-blue-600 hover:underline"
      >
        Edit recipe
        <editIcon class="w-3 h-3 ml-2" />
      </router-link>
    </div>

    <!-- Remove modal -->
    <modal :isOpen="isRemoveModal" @setIsOpen="setIsOpen($event)">
      <template v-slot:title>Are you sure?</template>
      <template v-slot:main>
        <div class="flex justify-end mt-12 md:mt-16 gap-3">
          <buttonItem text="Cancel" variant="light" @click="setIsOpen(false)" />
          <buttonItem text="Remove" variant="red" @click="emit('remove', props.item.id)" />
        </div>
      </template>
    </modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { deleteIcon, editIcon } from '@/components/icons'
import modal from '@/components/modal.vue'
import { buttonItem } from '@/components/form'
import noImgUrl from '@/assets/images/no-image.png'
import { levels } from '@/helpers/global'

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['remove'])

const isRemoveModal = ref(false)
const setIsOpen = (condition) => (isRemoveModal.value = condition)
</script>

<style lang="scss" scoped></style>
