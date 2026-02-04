<script lang="ts" setup>
import type { Cliente } from '@/views/PageClientes.vue'
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
      <span class="text-2xl">Detalles de {{ cliente?.nombre }}</span>
      <table class="**:p-1 **:border">
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Cédula:</td>
          <td>{{ cliente?.cedula }}</td>
        </tr>
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Nombre:</td>
          <td>{{ cliente?.nombre }}</td>
        </tr>
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Apellido:</td>
          <td>{{ cliente?.apellido }}</td>
        </tr>
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Número telefónico:</td>
          <td>{{ cliente?.telefono }}</td>
        </tr>
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Correo eléctronico:</td>
          <td>{{ cliente?.email }}</td>
        </tr>
        <tr class="odd:bg-blue-950 even:bg-blue-900">
          <td>Dirección:</td>
          <td>{{ cliente?.direccion }}</td>
        </tr>
      </table>
      <div>
        <input class="btn-main" type="button" value="Cerrar" />
      </div>
    </section>
  </section>
</template>
