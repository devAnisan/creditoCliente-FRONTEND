<template>
  <section class="box-popUpBackground">
    <section class="box-PopUp">
      <h1 class="text-2xl">{{ title }}</h1>
      <form @submit.prevent="submitForm">
        <table>
          <tr class="p-2" v-for="field in formData" :key="field.model">
            <td>{{ field.label }}</td>
            <td>
              <input
                :placeholder="field.placeholder"
                :required="field.required ?? false"
                v-model="form[field.model]"
                :maxlength="field.max ?? 100"
                :type="field.type ?? 'text'"
                class="border my-1 rounded-2xl p-1"
              />
            </td>
          </tr>
        </table>
        <div class="flex">
          <input type="button" @click="closeForm" value="Cancelar" class="btn-main" />
          <input type="submit" v-on:click="print" value="Confirmar" class="btn-main" />
        </div>
      </form>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
type FormField = {
  label: string
  model: string
  type?: string
  placeholder?: string
  max?: number
  required?: boolean
}

const emit = defineEmits(['close', 'submit'])
const submitForm = () => {
  emit('submit', { ...form })
}
const closeForm = () => {
  emit('close', false)
}
const props = defineProps<{
  title: string
  formData: FormField[]
}>()

const form = reactive<Record<string, string>>({})
const print = () => {
  console.log(form)
}
watch(
  () => props.formData,
  () => {
    props.formData?.forEach((f) => {
      if (form[f.model] === undefined) form[f.model] = ''
    })
  },
  { immediate: true },
)
</script>
