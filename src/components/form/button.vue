<template>
  <button
    @click="emit('click')"
    class="text-nowrap text-center"
    :class="[variants[props.variant], sizes[props.size], props.disabled && 'opacity-50']"
    :size="props.size"
    :disabled="props.disabled"
  >
    {{ props.text }}
  </button>
</template>

<script setup>
const variants = {
  default:
    'text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full',
  alternative:
    'font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100',
  dark: 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full',
  light:
    'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full',
  green:
    'text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full',
  red: 'text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full',
  yellow:
    'text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full',
  purple:
    'text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full'
}
const sizes = {
  xs: 'px-3 py-2 text-xs',
  sm: 'px-3 py-2 text-sm',
  base: 'px-5 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-base'
}

const props = defineProps({
  text: String,
  variant: {
    type: String,
    default: 'default',
    validator(value, props) {
      return [
        'default',
        'alternative',
        'dark',
        'light',
        'green',
        'red',
        'yellow',
        'purple'
      ].includes(value)
    }
  },
  size: {
    type: String,
    default: 'base',
    validator(value, props) {
      return ['xs', 'sm', 'base', 'lg', 'xl'].includes(value)
    }
  },
  disabled: Boolean
})
const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped></style>
