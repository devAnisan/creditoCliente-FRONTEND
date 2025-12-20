<script lang="ts" setup>
export interface Cliente {
  id_cliente: number
  nombre: string
  telefono: string
  direccion: string
}
const formFieldsAddCustomer = [
  { label: 'Nombre', model: 'nombre', placeholder: 'Ejemplo: Xavier' },
  { label: 'Cédula', model: 'uid', placeholder: 'Ejemplo: 601230456' },
  { label: 'Número telefonico', model: 'tel', placeholder: 'Ejemplo: 61234567' },
  { label: 'Dirección', model: 'direccion', placeholder: 'Ejemplo: Provincia, Canton, Calle...' },
]
import TableClients from '@/components/TableClients.vue'
import popUpDetail from '@/components/popUpDetail.vue'
import popUpEdit from '@/components/popUpEdit.vue'
import popUp from '@/components/PopUp.vue'
import popUpForm from '@/components/popUpForm.vue'

import { obtenerClientes } from '@/services/clienteservices'
import { countCreditos, borrarCl } from '@/composable/clientes'
import { onMounted, ref, watch } from 'vue'
import { Loader, UserCheck, UserRoundPlus } from 'lucide-vue-next'

const clientes = ref<Cliente[]>([])
const clientesOriginal = ref<Cliente[]>([])
const isFetching = ref(true)
const creditosPorCliente = ref<{ [key: number]: number }>({})
const id_borrar_question = ref()
const showPopUp = ref(false)
const showDetail = ref(false)
const idDetail = ref()
const showPopUpUpdate = ref(false)
const searchPerName = ref('')
const stateOfpopForm = ref(false)
const detailsCustomer = ref<Cliente>({
  id_cliente: 0,
  nombre: '',
  telefono: '',
  direccion: '',
})
const showEdit = ref(false)
const loadClientes = async () => {
  const data = await obtenerClientes()
  clientes.value = data
  clientesOriginal.value = data
}
onMounted(async () => loadClientes())

watch(searchPerName, (name) => {
  if (!name) {
    clientes.value = clientesOriginal.value
    return
  }

  const filtro = clientesOriginal.value.filter((e) =>
    e.nombre.toLocaleLowerCase().includes(searchPerName.value.toLocaleLowerCase()),
  )
  clientes.value = filtro
})
watch(
  clientes,
  async (lista) => {
    if (lista.length === 0) return
    isFetching.value = true
    for (const cliente of lista) {
      const data = await countCreditos(cliente.id_cliente)

      creditosPorCliente.value[cliente.id_cliente] = data.data || 0
    }
    isFetching.value = false
  },
  { immediate: true },
)

const searchID = (id: number) => {
  const clienteBuscado = clientes.value.find((c) => c.id_cliente === id)
  if (clienteBuscado) {
    detailsCustomer.value = clienteBuscado
  }
}

const deleteCl = async (id_cliente: number) => {
  try {
    await borrarCl(id_cliente)
    clientes.value = clientes.value.filter((c) => c.id_cliente !== id_cliente)
  } catch (error) {
    console.error(`Error al borrar: ${error}`)
  }
}

const changeStatusShowEdit = (newState: boolean) => {
  showEdit.value = newState
}

const showPopUpedit = (newState: boolean) => {
  showPopUpUpdate.value = newState
}

const changeStatePopUp = (newState: boolean) => {
  showPopUp.value = newState
}
const newStateDeleteQuestion = (id: number) => {
  id_borrar_question.value = id
}

const changueShowDetail = (newState: boolean) => {
  showDetail.value = newState
}

const userIDforDetails = (id: number) => {
  idDetail.value = id
}
const togglePopForm = (newState: boolean) => {
  stateOfpopForm.value = newState
}
</script>

<template>
  <h1 class="font-title p-1 text-3xl text-center">Clientes</h1>
  <div class="flex p-1">
    <span class="m-1 flex justify-center items-center">Gestión de clientes</span>
    <input
      v-model="searchPerName"
      class="border-0 p-2 text-primarytext bg-background rounded-2xl ml-auto"
      placeholder="Buscar cliente"
      type="text"
    />
    <span class="flex justify-center items-center mx-3 p-3">
      <UserRoundPlus
        @click="togglePopForm(true)"
        class="text-background hover:scale-150 hover:cursor-pointer"
      />
    </span>
  </div>

  <section v-if="stateOfpopForm">
    <popUpForm title="Ingrese los datos del nuevo usuario" :form-data="formFieldsAddCustomer" />
  </section>

  <section v-if="showDetail">
    <popUpDetail
      @change-detail="changueShowDetail"
      :show-detail="showDetail"
      :cliente="detailsCustomer"
    />
  </section>
  <section v-if="showPopUpUpdate">
    <popUp
      :userCheck="UserCheck"
      :message="'Actualizado correctamente.'"
      :label="'Confirmar'"
      @popup="showPopUpedit"
      @lista-upd="loadClientes"
    />
  </section>
  <section v-if="showEdit">
    <popUpEdit
      @close-pop-up="changeStatusShowEdit"
      :show-detail="showEdit"
      :clientes="detailsCustomer"
      @open-pop-up="showPopUpedit"
    />
  </section>

  <section
    v-if="showPopUp"
    class="fixed inset-0 bg-black/40 flex justify-center items-center"
    @click="showPopUp = false"
  >
    <section
      class="flex bg-background justify-center items-center flex-col text-amber-50 p-6 rounded-lg w-96"
    >
      <h1 class="text-2xl text-center items-center">¿Esta seguro de borrar a este cliente?</h1>
      <div>
        <input
          class="btn-main"
          type="button"
          value="Si"
          @click="(deleteCl(id_borrar_question), (showPopUp = false))"
        />
        <input class="btn-main" type="button" value="No" @click="showPopUp = false" />
      </div>
    </section>
  </section>
  <section class="flex justify-center animate-spin mt-2" v-if="isFetching === true">
    <Loader />
  </section>
  <section v-if="isFetching === false" class="flex justify-center">
    <TableClients
      :clientes="clientes"
      :id_borrar_question="id_borrar_question"
      :creditos-por-cliente="creditosPorCliente"
      @popUp="changeStatePopUp"
      @eliminar="deleteCl"
      @new-id-delete-question="newStateDeleteQuestion"
      @show-details="changueShowDetail"
      @user="userIDforDetails"
      @show-details-pop-up="changueShowDetail"
      @detallesdelcliente="searchID"
      @show-edit="changeStatusShowEdit"
    />
  </section>
</template>
