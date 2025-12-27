<template>
  <table class="table-fixed border-collapse mt-5">
    <thead>
      <tr>
        <th class="border p-2 border-t-background">ID</th>
        <th class="border p-2 border-t-background">Nombre</th>
        <th class="border p-2 border-t-background">Creditos Activos</th>
        <th class="border p-2 border-t-background">
          Ver detalles <br />
          del cliente
        </th>
        <th class="border p-2 border-t-background">
          Editar <br />
          datos
        </th>
        <th class="border-t border-r p-2 border-t-background">
          Eliminar <br />
          al cliente
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cliente in clientes" :key="cliente.id_cliente">
        <td class="border p-2">{{ cliente.id_cliente }}</td>
        <td class="border p-2">{{ cliente.nombre }}</td>
        <td class="border p-2">{{ creditosPorCliente[cliente.id_cliente] }}</td>
        <td class="p-2 items-center border-l border-b">
          <input
            class="p-1 w-20 m-1 bg-primary text-blue-50 font-bold rounded-2xl hover:bg-hoverpr hover:cursor-pointer"
            type="button"
            value="Detalles"
            @click="
              (showDetailPopUp(true),
              user(cliente.id_cliente),
              detallesdelcliente(cliente.id_cliente))
            "
          />
        </td>
        <td class="p-2 border-l items-center border-b">
          <input
            class="p-1 w-20 m-1 bg-primary text-blue-50 font-bold rounded-2xl hover:bg-hoverpr hover:cursor-pointer"
            type="button"
            value="Editar"
            @click="
              (showEdit(true), detallesdelcliente(cliente.id_cliente), user(cliente.id_cliente))
            "
          />
        </td>
        <td class="flex flex-col items-center border p-2">
          <input
            class="p-1 w-20 m-1 bg-rprimary text-blue-50 font-bold rounded-2xl hover:bg-rp hover:cursor-pointer"
            type="button"
            value="Eliminar"
            @click="(showPopUp(true), newValueDeleteQuestion(cliente.id_cliente))"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
interface cliente {
  id_cliente: number
  nombre: string
  telefono: string
  direccion: string
}
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

const detallesdelcliente = (id: number) => {
  emit('detallesdelcliente', id)
}

const user = (id: number) => {
  emit('user', id)
}

const showPopUp = (condition: boolean) => {
  emit('popUp', condition)
}

const newValueDeleteQuestion = (id: number) => {
  emit('newIdDeleteQuestion', id)
}

const showDetailPopUp = (cond: boolean) => {
  emit('showDetailsPopUp', cond)
}

defineProps<{
  clientes: Array<cliente>
  id_borrar_question: number
  creditosPorCliente: { [key: number]: number }
}>()
</script>
