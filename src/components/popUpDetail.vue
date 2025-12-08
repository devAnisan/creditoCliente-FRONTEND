<script lang="ts" setup>
import type { Cliente } from '@/views/PageClientes.vue'
import { defineProps, defineEmits } from 'vue'

defineProps<{
  cliente: Cliente
}>()

const emit = defineEmits(['changeDetail'])
const changeDetail = (condition: boolean) => {
  emit('changeDetail', condition)
}
</script>

<template>
  <section
    @click="changeDetail(false)"
    class="flex fixed inset-0 bg-black/40 items-center justify-center text-primarytext font-black"
  >
    <section class="box-PopUp">
      <table>
        <tr>
          <td class="p-2 font-semibold">Nombre:</td>
          <td class="p-2 text-primary">{{ cliente?.nombre }}</td>
        </tr>

        <tr>
          <td class="p-2 font-semibold">Cédula:</td>
          <td class="p-2 text-primary">{{ cliente?.id_cliente }}</td>
        </tr>

        <tr>
          <td class="p-2 font-semibold">Número telefónico:</td>
          <td class="p-2 text-primary">{{ cliente?.telefono }}</td>
        </tr>

        <tr>
          <td class="p-2 font-semibold">Dirección:</td>
          <td class="p-2 text-primary">{{ cliente?.direccion }}</td>
        </tr>
      </table>
    </section>
  </section>
</template>
