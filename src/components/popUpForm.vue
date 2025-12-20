<template>
  <section class="box-popUpBackground">
    <section class="box-PopUp">
      <h1>{{ title }}</h1>
      <table>
        <tr  v-for="(field, index) in formData" :key="index">
          <td> {{ field.label }}</td>
          <td>
            <input type="text" required>
          </td>
        </tr>
      </table>
      <div class="flex ">
          <input type="button" value="Cancelar" class="btn-main">
          <input type="button" value="Confirmar" class="btn-main">
        </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
type FormField = {
  label: string
  model: string
  type?: string
  placeholder?: string
}
const props = defineProps<{
  title: string
  formData: FormField[]
}>()

const form = reactive<Record<string, string>>({})

watch(() => props.formData,
() => {
  props.formData?.forEach(f => {
    if (form[f.model] === undefined) form[f.model] = ""
  })
}, {immediate: true})
</script>
