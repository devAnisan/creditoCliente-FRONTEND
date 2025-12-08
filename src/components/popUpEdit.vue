<template>
  <section class="box-popUpBackground">
    <section class="box-PopUp">
      <h1>Editar al cliente</h1>
      <table>
        <tr>
          <td class="p-2">Nombre:</td>
          <td>
            <input
              class="border w-30 p-1 rounded-lg cursor-"
              type="text"
              name="nombre"
              v-model="copyCl.nombre"
            />
          </td>
        </tr>
        <tr>
          <td class="p-2">Cédula:</td>
          <td>
            <input
              disabled
              class="border w-30 p-1 rounded-lg cursor-not-allowed"
              type="text"
              name="cedula"
              :value="clientes?.id_cliente"
            />
          </td>
        </tr>

        <tr>
          <td class="p-2">Número telefonico:</td>
          <td>
            <input
              class="border w-30 p-1 rounded-lg"
              type="text"
              name="telefono"
              v-model="copyCl.telefono"
            />
          </td>
        </tr>

        <tr>
          <td class="p-2">Dirección:</td>
          <td>
            <input
              class="border w-30 p-1 rounded-lg"
              type="text"
              name="direccion"
              v-model="copyCl.direccion"
            />
          </td>
        </tr>
      </table>

      <div class="flex flex-row items-center">
        <input @click="closePopUp(false)" class="btn-main" type="button" value="Cancelar" />
        <input
          class="btn-main"
          type="button"
          value="Confirmar"
          @click="(updateCl(clientes?.id_cliente, copyCl), closePopUp(false), openPopUp(true))"
        />
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue'
import { actualizarcl } from '@/composable/clientes'
import type { Cliente } from '@/views/PageClientes.vue'
const updateCl = async (id: number, cl: Cliente) => {
  await actualizarcl(id, cl)
}

const props = defineProps<{
  clientes: Cliente
}>()
const copyCl = ref<Cliente>({ ...props.clientes })

const emit = defineEmits(['openPopUp', 'closePopUp'])
const closePopUp = (condition: boolean) => {
  emit('closePopUp', condition)
}
const openPopUp = (condition: boolean) => {
  emit('openPopUp', condition)
}
</script>
