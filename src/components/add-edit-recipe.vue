<template>
  <div class="flex flex-wrap gap-4 mt-4 bg-white p-4 rounded shadow-lg">
    <div class="w-full">
      <labelItem text="Title" id="title" />
      <inputItem v-model="item.title" id="title" :errors="v$.title.$errors" />
    </div>

    <div class="w-full">
      <labelItem text="Ingredients" id="ingredients" />
      <selectItem
        v-model="item.ingredients"
        :items="globalStore.ingredients"
        multiple
        id="ingredients"
        :errors="v$.ingredients.$errors"
      />
    </div>

    <div class="w-full">
      <labelItem text="Add extra ingredient" id="extra" />
      <div class="flex items-center gap-4">
        <inputItem v-model="extraIngredient" id="extra" />
        <buttonItem text="Add" size="xs" variant="green" @click="addExtraIngredient" />
      </div>
    </div>

    <div class="w-full">
      <labelItem text="Cooking step" id="step" />
      <selectItem v-model="item.step" :items="steps" id="step" :errors="v$.step.$errors" />
    </div>

    <div class="w-full">
      <labelItem text="Level" id="level" />
      <selectItem
        v-model="item.level"
        :items="Object.keys(levels)"
        id="level"
        :errors="v$.level.$errors"
      />
    </div>

    <div class="w-full">
      <labelItem text="Add image" id="file" />
      <div class="flex flex-wrap items-center mt-2">
        <div
          :style="[
            {
              backgroundImage: `url(${item.image})`
            }
          ]"
          class="flex items-center justify-center rounded-full bg-cover bg-no-repeat mr-4 w-20 h-20 text-sm"
          :class="[
            !item.image
              ? 'border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
              : ''
          ]"
        ></div>
        <fileItem v-model="file" id="file">
          <template #main>
            <span
              class="font-interMedium text-sm text-gray-900 cursor-pointer dark:text-gray-25 text-left"
            >
              Upload image
            </span>
          </template>
        </fileItem>
      </div>
    </div>

    <div v-if="props.edit" class="w-full flex justify-end gap-3">
      <buttonItem text="Update" variant="green" :disabled="loading" @click="update" />
    </div>
    <div v-else class="w-full flex justify-end gap-3">
      <buttonItem text="Save" variant="green" :disabled="loading" @click="save" />
      <buttonItem text="Save and clear" :disabled="loading" @click="saveAndClear" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { inputItem, selectItem, buttonItem, labelItem, fileItem } from '@/components/form'
import { useGlobalStore } from '@/stores/global'
import { useToast } from 'vue-toastification'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import { levels, steps, uploadFile } from '@/helpers/global'

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  edit: Boolean
})

const globalStore = useGlobalStore()
const toast = useToast()

const extraIngredient = ref('')
const itemModel = {
  title: '',
  ingredients: [],
  step: '',
  level: '',
  image: ''
}
const item = props.edit ? ref({ ...props.item }) : ref({ ...itemModel })
const file = ref()
const loading = ref(false)

const rules = computed(() => {
  return {
    title: { required, maxLengthValue: maxLength(20) },
    ingredients: { required },
    step: { required },
    level: { required }
  }
})
let v$ = useVuelidate(rules, item.value)

const addExtraIngredient = () => {
  if (!extraIngredient.value.length) return
  if (globalStore.ingredients.includes(extraIngredient.value)) {
    toast.warning('Item is present in list')
    return
  }

  item.value.ingredients.push(extraIngredient.value)
  globalStore.addIngredient(extraIngredient.value)
  extraIngredient.value = ''
}
const save = async () => {
  loading.value = true
  try {
    const isValid = await v$.value.$validate()
    if (isValid) {
      const id = Math.random().toString(16).slice(2)

      if (file.value) item.value.image = await uploadFile({ id, file: file.value })

      globalStore.addRecipe({
        ...item.value,
        id
      })
      toast.success('Saved')

      return true
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
const saveAndClear = async () => {
  const isSaved = await save()
  if (isSaved) {
    item.value = { ...itemModel }
    v$ = useVuelidate(rules, item.value)
  }
}
const update = async () => {
  loading.value = true
  try {
    if (props.item.image != item.value.image) {
      item.value.image = await uploadFile({ id: props.item.id, file: file.value })
    }
    globalStore.updateRecipe(item.value)
    toast.success('Updated')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

watch(
  () => file.value,
  (file) => {
    if (file) item.value.image = URL.createObjectURL(file)
  }
)
</script>

<style lang="scss" scoped></style>
