<template>
  <table class="*:border **:p-2 table-fixed border-collapse mt-5">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Créditos</th>
        <th>
          Ver detalles <br />
          del cliente
        </th>
        <th class="">
          Editar <br />
          datos
        </th>
        <th class="">
          Eliminar <br />
          al cliente
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="odd:bg-gray-300 even:bg-gray-200"
        v-for="cliente in clientes"
        :key="cliente.cedula"
      >
        <td>{{ cliente.cedula }}</td>
        <td>{{ cliente.nombre }}</td>
        <td>{{ creditosPorCliente[cliente.cedula] }}</td>
        <td>
          <input
            class="p-1 w-20 m-1 bg-primary text-blue-50 font-bold rounded-2xl hover:bg-hoverpr hover:cursor-pointer"
            type="button"
            value="Detalles"
            @click="
              (showDetailPopUp(true), user(cliente.cedula), detallesdelcliente(cliente.cedula))
            "
          />
        </td>
        <td class="p-2 items-center">
          <input
            class="p-1 w-20 m-1 bg-primary text-blue-50 font-bold rounded-2xl hover:bg-hoverpr hover:cursor-pointer"
            type="button"
            value="Editar"
            @click="(showEdit(true), detallesdelcliente(cliente.cedula), user(cliente.cedula))"
          />
        </td>
        <td class="flex flex-col items-center p-2">
          <input
            class="w-20 m-1 bg-rprimary text-blue-50 font-bold rounded-2xl hover:bg-rp hover:cursor-pointer"
            type="button"
            value="Eliminar"
            @click="(showPopUp(true), newValueDeleteQuestion(cliente.cedula))"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type { Cliente } from '@/views/PageClientes.vue'
const emit = defineEmits([
  'detallesdelcliente',
  'user',
  'eliminar',
  'popUp',
  'newIdDeleteQuestion',
  'showDetailsPopUp',
  'showEdit',
])
const showEdit = (condition: boolean) => {
  emit('showEdit', condition)
}

const detallesdelcliente = (id: string) => {
  emit('detallesdelcliente', id)
}

const user = (id: string) => {
  emit('user', id)
}

const showPopUp = (condition: boolean) => {
  emit('popUp', condition)
}

const newValueDeleteQuestion = (id: string) => {
  emit('newIdDeleteQuestion', id)
}

const showDetailPopUp = (cond: boolean) => {
  emit('showDetailsPopUp', cond)
}

defineProps<{
  clientes: Array<Cliente>
  id_borrar_question: number
  creditosPorCliente: { [key: string]: string }
}>()
</script>
