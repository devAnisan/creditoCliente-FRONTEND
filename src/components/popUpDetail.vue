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
      <span>Detalles de {{ cliente?.nombre }}</span>
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
      <div>
        <input class="btn-main" type="button" value="Cerrar" />
      </div>
    </section>
  </section>
</template>
