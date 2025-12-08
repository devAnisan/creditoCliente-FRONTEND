<script lang="ts" setup>
import type { LucideIcon } from 'lucide-vue-next'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['popup', 'listaUpd'])
const functionStatusPopUp = (condition: boolean) => {
  emit('popup', condition)
}

const funActualizar = () => {
  emit('listaUpd')
}

defineProps<{
  userCheck: LucideIcon
  message: string
  label: string
}>()
</script>
<template>
  <section class="box-popUpBackground">
    <section class="box-PopUp">
      <component :is="userCheck" />
      <span>{{ message }}</span>
      <input
        type="button"
        @click="(functionStatusPopUp(false), funActualizar())"
        class="btn-main"
        :value="label"
      />
    </section>
  </section>
</template>
