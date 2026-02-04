<script lang="ts" setup>
export interface Cliente {
  cedula: string
  nombre: string
  telefono: string
  apellido: string
  email: string
  direccion: string
}
const formFieldsAddCustomer = [
  {
    label: 'Cédula',
    model: 'cedula',
    placeholder: 'Ej: 601231234',
    type: 'text',
    max: 9,
    required: true,
  },
  { label: 'Nombre', model: 'nombre', placeholder: 'Ej: Daniel', required: true },
  { label: 'Apellido', model: 'apellido', placeholder: 'Ej: Mejía', required: false },
  {
    label: 'Número telefonico',
    model: 'telefono',
    placeholder: 'Ej: 20003000',
    type: 'text',
    max: 8,
    required: true,
  },
  {
    label: 'Correo eléctronico',
    model: 'email',
    placeholder: 'Ej: danielmejia@gmail.com',
    type: 'email',

    required: true,
  },
  { label: 'Dirección', model: 'direccion', placeholder: 'Ej: Provincia, Canton, Calle...' },
]
import TableClients from '@/components/TableClients.vue'
import popUpDetail from '@/components/popUpDetail.vue'
import popUpEdit from '@/components/popUpEdit.vue'
import popUp from '@/components/PopUp.vue'
import popUpForm from '@/components/popUpForm.vue'

import { obtenerClientes } from '@/services/clienteservices'
import { countCreditos, borrarCl, crearCl } from '@/composable/clientes'
import { onMounted, ref, watch } from 'vue'
import { Loader, UserCheck, UserRoundPlus } from 'lucide-vue-next'

const clientes = ref<Cliente[]>([])
const clientesOriginal = ref<Cliente[]>([])
const isFetching = ref(true)
const creditosPorCliente = ref<{ [key: string]: string }>({})
const id_borrar_question = ref()
const showPopUp = ref(false)
const showDetail = ref(false)
const idDetail = ref()
const showPopUpUpdate = ref(false)
const searchPerName = ref('')
const stateOfpopForm = ref(false)
const detailsCustomer = ref<Cliente>({
  cedula: '',
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  direccion: '',
})
const showEdit = ref(false)
const loadClientes = async () => {
  const data = await obtenerClientes()
  clientes.value = data
  clientesOriginal.value = data
  console.log(clientes.value)
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
      const data = await countCreditos(cliente.cedula)

      creditosPorCliente.value[cliente.cedula] = data.data || 0
    }
    isFetching.value = false
  },
  { immediate: true },
)

const searchID = (id: string) => {
  const clienteBuscado = clientes.value.find((c) => c.cedula === id)
  if (clienteBuscado) {
    detailsCustomer.value = clienteBuscado
  }
}

const deleteCl = async (cedula: string) => {
  try {
    const result = await borrarCl(cedula)
    if (result.error) {
      alert('Puede que no puedas borrar a este cliente por que tiene un credito activo.')
      return
    }

    clientes.value = clientes.value.filter((c) => c.cedula !== cedula)
  } catch (error) {
    console.error(`Error al borrar: ${error}`)
  }
}

const crearCliente = async (data: Cliente) => {
  try {
    const result = await crearCl(data)
    if (result.code == 'ER_WRONG_VALUE_COUNT_ON_ROW') {
      alert('Parece que algo salió mal, revisa bien los valores insertados en el formulario.')
    }
    stateOfpopForm.value = false
    loadClientes()
  } catch (error) {
    console.error(`Error al crear al cliente: ${error}`)
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
  <div class="flex-wrap">
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
  </div>

  <section v-if="stateOfpopForm">
    <popUpForm
      title="Crear usuario"
      v-on:submit="crearCliente"
      :form-data="formFieldsAddCustomer"
      @close="togglePopForm"
    />
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
