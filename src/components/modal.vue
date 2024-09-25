<template>
  <div>
    <TransitionRoot appear :show="props.isOpen" as="template">
      <Dialog as="div" @close="setIsOpen(false)" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-xs" />
        </TransitionChild>
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-4 md:py-9 md:px-10 text-left align-middle shadow-xl transition-all bg-white dark:bg-gray-900"
              >
                <div class="relative">
                  <DialogTitle
                    as="h3"
                    class="font-felixMedium text-gray-900 text-xl md:text-2.5xl leading-none dark:text-gray-25"
                  >
                    <slot name="title"></slot>
                  </DialogTitle>
                  <div class="mt-4">
                    <p class="text-base text-gray-500 font-inter dark:text-gray-400">
                      <slot name="sub-title"></slot>
                    </p>
                  </div>
                  <closeIcon
                    class="absolute top-1 right-0 cursor-pointer w-3 h-3"
                    @click="setIsOpen(false)"
                  />
                </div>

                <slot name="main"></slot>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { closeIcon } from '@/components/icons'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['setIsOpen'])

const setIsOpen = (value) => {
  emit('setIsOpen', value)
}
</script>

<style lang="scss" scoped></style>
