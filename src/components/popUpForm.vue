<template>
  <section class="box-popUpBackground">
    <section class="box-PopUp">
      <h1 class="text-2xl">{{ title }}</h1>
      <table>
        <tr class="p-2" v-for="field in formData" :key="field.model">
          <td> {{ field.label }}</td>
          <td>
            <input :placeholder="field.placeholder" :required="field.requied || false" v-model="form[field.model]" :maxlength="field.max || 30" :type="field.type || 'text'" class="border my-1 rounded-2xl p-1 ">
          </td>
        </tr>
      </table>
      <div class="flex ">
          <input type="button" value="Cancelar" class="btn-main">
          <input @click="printer()" type="button" value="Confirmar" class="btn-main">
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
  max?: string
  requied?: boolean
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
const printer = () => {
  console.log(form);

}
</script>
