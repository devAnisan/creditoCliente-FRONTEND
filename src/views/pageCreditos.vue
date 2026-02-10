<template>
  <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <h1 class="text-2xl font-semibold">Créditos</h1>

    <button class="btn-main w-full md:w-auto flex justify-center">
      <SquarePlus /> <span class="font-bold">Nuevo crédito</span>
    </button>
  </header>

  <!-- PopUs -->
  <section v-if="pp_detalles">
    <popUp_detalle_creditoVue :credito="creditoSelected" @close="pp_detalle_cl_op" />
  </section>
  <section v-if="pp_registro">
    <popUp_registro_pagoVue
      :credito="creditoSelected?.creditID"
      @update-table="updateStatus"
      @close="pp_registro_cl_op"
    />
  </section>

  <!-- Mobile -->
  <body class="text-sm md:text-lg">
    <div class="md:hidden">
      <div class="flex justify-center animate-spin mt-2" v-if="loading">
        <Loader />
      </div>

      <section
        v-else
        class="grid p-3 shadow-lg bg-white rounded-2xl my-3"
        v-for="val in creditos"
        :key="val.creditID"
      >
        <div class="flex justify-center flex-col">
          <h1 class="font-black">Credito #{{ val.creditID }}</h1>
          <p>Cédula: {{ val.cedula }}</p>
          <input
            type="button"
            value="Más detalles"
            @click="(pp_detalle_cl_op(true), actualiza_credito(val.creditID))"
            class="btn-main"
          />
        </div>
      </section>
    </div>
    <!-- Desktop -->
    <div class="hidden md:block">
      <section class="flex justify-center animate-spin mt-2" v-if="loading">
        <Loader />
      </section>
      <section v-else>
        <table class="my-2">
          <thead>
            <tr class="*:p-2 *:border">
              <td>Crédito</td>
              <td>Cliente</td>
              <td>Más detalles</td>
              <td>Registrar un pago</td>
            </tr>
          </thead>
          <tbody
            v-for="val in creditos"
            :key="val.creditID"
            class="odd:bg-gray-200 even:bg-gray-300"
          >
            <tr class="*:p-1 *:border">
              <td>{{ val.creditID }}</td>
              <td>{{ val.cedula }}</td>
              <td>
                <input
                  type="button"
                  value="Detalles"
                  @click="(pp_detalle_cl_op(true), actualiza_credito(val.creditID))"
                  class="btn-main-secondary"
                />
              </td>

              <td>
                <input
                  type="button"
                  @click="(pp_registro_cl_op(true), actualiza_credito(val.creditID))"
                  value="Registrar"
                  class="btn-main-secondary"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </body>
</template>

<script lang="ts" setup>
export interface Creditos_interface {
  creditID: number
  cedula: string
  montoCredito: number
  fechaInicio: string
  plazoMeses: number
  estado: string
  montoRestante: number
}

import { Loader } from 'lucide-vue-next'

// Funciones y estados de abrir y cerrar los popups
const creditoSelected = ref<Creditos_interface | null>(null)
const pp_detalles = ref(false)
const pp_registro = ref(false)

//funcion
const pp_detalle_cl_op = (status: boolean) => {
  pp_detalles.value = status
}
const pp_registro_cl_op = (status: boolean) => {
  pp_registro.value = status
}
//actual seleccion acerca de detalle de credito
const actualiza_credito = (posi: number) => {
  creditoSelected.value = creditos.value.find((c) => c.creditID === posi) || null
}
import popUp_detalle_creditoVue from '@/components/credito_popUp/popUp_detalle_credito.vue'
import popUp_registro_pagoVue from '@/components/credito_popUp/popUp_registro_pago.vue'
import { SquarePlus } from 'lucide-vue-next'
import { call_get_creditos } from '@/composable/creditos'
import { onMounted, ref, watchEffect } from 'vue'
const loading = ref(true)

const creditos = ref<Creditos_interface[]>([])
const get_creditos = async () => {
  const res = await call_get_creditos()
  creditos.value = res.data
}

const updateStatus = async () => {
  loading.value = true
  await get_creditos()
  loading.value = false
  pp_registro_cl_op(false)
}

onMounted(() => {
  get_creditos()
})

watchEffect(() => {
  if (creditos.value.length > 0) {
    loading.value = false
  }
})
</script>
