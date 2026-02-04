<template>
  <section class="box-popUpBackground">
    <section class="box-PopUp">
      <h1 class="text-2xl">Editar el credito #{{ copyProps.creditID }}</h1>
      <p></p>
      <table class="**:p-1">
        <tr>
          <td>Cliente</td>
          <td>
            <input
              disabled="true"
              type="text"
              v-model="copyProps.cedula"
              class="border w-30 p-1 rounded-lg hover:cursor-no-drop bg-neutral-400"
            />
          </td>
        </tr>
        <tr>
          <td>Monto del crédito</td>
          <td>
            <input
              disabled="true"
              type="text"
              class="border w-30 p-1 rounded-lg hover:cursor-no-drop bg-neutral-400"
              v-model="copyProps.montoCredito"
            />
          </td>
        </tr>
        <tr>
          <td>Fecha de Inicio</td>
          <td>
            <input
              v-model="copyProps.fechaInicio.split('T')[0]"
              disabled
              type="text"
              class="border w-30 p-1 rounded-lg hover:cursor-no-drop bg-neutral-400"
            />
          </td>
        </tr>
        <tr>
          <td>Plazo de meses</td>
          <td>
            <input v-model="copyProps.plazoMeses" type="text" class="border w-30 p-1 rounded-lg" />
          </td>
        </tr>
        <tr>
          <td>Estado</td>
          <td>
            <select v-model="copyProps.estado" class="border w-30 p-1 rounded-lg">
              <option value="ACTIVO">Activo</option>
              <option value="MOROSO">Moroso</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Monto restante</td>
          <td>
            <input
              disabled="true"
              v-model="copyProps.montoRestante"
              type="text"
              class="border w-30 p-1 rounded-lg hover:cursor-no-drop bg-neutral-400"
            />
          </td>
        </tr>
      </table>
    </section>
  </section>
</template>

<script lang="ts" setup>
import type { Creditos_interface } from '@/views/pageCreditos.vue'
import { ref } from 'vue'
const props = defineProps<{
  credito: Creditos_interface
}>()

const copyProps = ref<Creditos_interface>({ ...props.credito })
</script>
