<template>
  <section class="box-popUpBackground">
    <section class="box-PopUp">
      <h1 class="text-2xl pb-1.5">Detalles sobre el credito #{{ credito.creditID }}</h1>
      <table class="**:p-1 **:border">
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Cliente:</td>
          <td>{{ credito.cedula }}</td>
        </tr>
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Monto del crédito:</td>
          <td>{{ credito.montoCredito }}</td>
        </tr>
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Fecha de inicio:</td>
          <td>{{ credito.fechaInicio.split('T')[0] }}</td>
        </tr>
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Plazos de meses:</td>
          <td>{{ credito.plazoMeses }}</td>
        </tr>
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Monto restante del crédito:</td>
          <td>{{ credito.montoRestante }}</td>
        </tr>
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Estado del crédito:</td>
          <td>{{ credito.estado }}</td>
        </tr>
      </table>
      <input class="btn-main" @click="close_" type="button" value="Cerrar" />
    </section>
  </section>
</template>

<script lang="ts" setup>
import type { Creditos_interface } from '@/views/pageCreditos.vue'
defineProps<{
  credito: Creditos_interface
}>()

// emits
const emit = defineEmits(['close'])
//function emit
const close_ = () => {
  emit('close', false)
}
</script>
